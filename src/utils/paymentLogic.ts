import {
  insertNewClient,
  insertNewPayment,
  insertNewSesion,
  parseDateToTimestamp,
} from "./sesion";
import { Cliente, GoogleEvent, Pago, PaymentURL, Sesion } from "./types";
import { getCookieEvento, getPaymentData } from "./mpLogic";

export async function fetchData(id: string, query: PaymentURL) {
  try {
    const payment = await getPaymentData(id);
    if (payment) {
      await preparePaymentDB(payment, query);
    }
    return payment;
  } catch (error: any) {
    throw error;
  }
}

async function preparePaymentDB(paymentData: any, query: PaymentURL) {
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

      const event = await getCookieEvento();
      if (!event) {
        throw new Error("Error al obtener el evento");
      }
      const eventoJSON: GoogleEvent = JSON.parse(event.value);

      const sesionPagada: Sesion = {
        idCliente: parseInt(idCliente),
        idPago: parseInt(idPago),
        idPsicologo: parseInt(query.psicologoId!),
        sesion: parseDateToTimestamp(),
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
