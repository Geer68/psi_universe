import { insertNewClient, insertNewPayment, insertNewSesion } from "./sesion";
import { Cliente, GoogleEvent, Pago, PaymentURL, Sesion } from "./types";
import { getCookieEvento, getPaymentData } from "./mpLogic";
import { formatToArgentinianTime } from "./dateFormater";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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

    const idCliente = await insertNewClient(client);
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

      const idPago = await insertNewPayment(pago);
      if (!idPago) {
        throw new Error("Error al insertar el pago");
      }

      const eventoJSON: GoogleEvent = JSON.parse(evento.value);

      const inicioSesion = formatToArgentinianTime(eventoJSON.start);

      const sesionPagada: Sesion = {
        idCliente: parseInt(idCliente),
        idPago: parseInt(idPago),
        idPsicologo: parseInt(query.psicologoId!),
        sesion: inicioSesion,
        link: eventoJSON.hangoutLink || "https://nohaylinkmalditogabi",
      };

      const idSesion = await insertNewSesion(sesionPagada);
      if (!idSesion) {
        throw new Error("Error al insertar la sesión");
      }

      sendPOSTEmail(eventoJSON, query, sesionPagada);
      sendPOSTCalendar(eventoJSON);
    }

    return true;
  } catch (error: any) {
    console.error("Error en preparePaymentDB:", error.message);
    throw error;
  }
}

export function sendPOSTEmail(
  eventoJSON: GoogleEvent,
  query: PaymentURL,
  sesionPagada: Sesion
) {
  fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ evento: eventoJSON, query, sesionPagada }),
  })
    .then((response) => response.json())
    // .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

export function sendPOSTCalendar(eventoJSON: GoogleEvent) {
  fetch("/api/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ evento: eventoJSON }),
  })
    .then((response) => response.json())
    // .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}
