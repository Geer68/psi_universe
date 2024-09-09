export const maxDuration = 60;
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { formatToArgentinianTime } from "./dateFormater";
import { getPaymentData } from "./mpLogic";
import { insertNewClient, insertNewPayment, insertNewSesion } from "./sesion";
import { Cliente, GoogleEvent, Pago, PaymentURL, Sesion } from "./types";

export async function fetchData(query: PaymentURL, evento: RequestCookie) {
  try {
    const payment = await getPaymentData(query.collection_id);
    if (payment) {
      const succcess = await preparePaymentDB(payment, query, evento);
      return succcess;
    }
  } catch (error: any) {
    throw error;
  }
}

async function preparePaymentDB(
  paymentData: any,
  query: PaymentURL,
  evento: RequestCookie
) {
  try {
    const client: Cliente = {
      nombre: query.nombre,
      apellido: query.apellido,
      email: query.email,
    };
    console.log("client", client);

    const idCliente = await insertNewClient(client);
    console.log("idCliente", idCliente);
    if (!idCliente) {
      throw new Error("Error al insertar el cliente");
    }

    if (paymentData != null) {
      const pago: Pago = {
        idCliente: idCliente,
        idMP: paymentData?.idMP,
        recibido: paymentData?.recibido,
        comisiones: paymentData?.comisiones,
        neto: paymentData?.neto,
        fechaPago: paymentData?.fechaPago,
        payerMP: paymentData?.payerMP,
      };
      console.log("pago", pago);

      const idPago = await insertNewPayment(pago);
      console.log("idPago", idPago);
      if (!idPago) {
        throw new Error("Error al insertar el pago");
      }

      if (!evento || !evento.value) {
        throw new Error(
          "Evento is undefined or does not have a value property"
        );
      }

      const eventoJSON: GoogleEvent = JSON.parse(evento.value);
      console.log("eventoJSON", eventoJSON);

      const inicioSesion = formatToArgentinianTime(eventoJSON.start);
      console.log("inicioSesion", inicioSesion);

      const sesionPagada: Sesion = {
        idCliente: parseInt(idCliente),
        idPago: parseInt(idPago),
        idPsicologo: parseInt(query.psicologoId!),
        sesion: inicioSesion,
        link: eventoJSON.hangoutLink,
      };
      console.log("sesionPagada", sesionPagada);

      const idSesion = await insertNewSesion(sesionPagada);
      if (!idSesion) {
        throw new Error("Error al insertar la sesión");
      }

      const emailSuccess = await sendPOSTEmail(eventoJSON, query, sesionPagada);
      if (!emailSuccess) {
        throw new Error("Error al enviar el email");
      }

      const calendarSuccess = await sendPOSTCalendar(eventoJSON);
      if (!calendarSuccess) {
        throw new Error("Error al enviar el calendario");
      }
      return true;
    }
  } catch (error: any) {
    console.error("Error en preparePaymentDB:", error.message);
    throw error;
  }
}
export async function sendPOSTEmail(
  eventoJSON: GoogleEvent,
  query: PaymentURL,
  sesionPagada: Sesion
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ evento: eventoJSON, query, sesionPagada }),
      }
    );
    const result = await response.json();
    return result.result;
  } catch (error: any) {
    console.error("Error in sendPOSTEmail:", error.message);
    return false;
  }
}

export async function sendPOSTCalendar(eventoJSON: GoogleEvent) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/calendar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ evento: eventoJSON }),
      }
    );
    const result = await response.json();
    return result.result;
  } catch (error: any) {
    console.error("Error in sendPOSTCalendar:", error.message);
    return false;
  }
}
