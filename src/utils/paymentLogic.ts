import {
  insertNewClient,
  insertNewPayment,
  insertNewSesion,
  parseDateToTimestamp,
} from "./sesion";
import { Cliente, Pago, PaymentURL, Sesion } from "./types";
import { getCookieEvento, getPaymentData } from "./mpLogic";
import { Event } from "./calendar";

export async function fetchData(id: string, query: PaymentURL, evento: Event) {
  try {
    const payment = await getPaymentData(id);
    if (payment) {
      await preparePaymentDB(payment, query, evento);
    }
    return payment;
  } catch (error: any) {
    throw error;
  }
}

async function preparePaymentDB(
  paymentData: any,
  query: PaymentURL,
  evento: Event
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

      const event = await getCookieEvento();
      if (!event) {
        throw new Error("Error al obtener el evento");
      }
      const eventoJSON: Event = JSON.parse(event.value);
      const evento = eventoJSON;

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

      fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ evento: eventoJSON, query, sesionPagada }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    }

    // fetch("/api/email", { method: "POST" });
    // enviarCorreoCliente(pago, query, eventoJSON);
    return true;
  } catch (error: any) {
    console.error("Error en preparePaymentDB:", error.message);
    throw error; // Propaga el error para ser manejado por el llamador
  }
}
