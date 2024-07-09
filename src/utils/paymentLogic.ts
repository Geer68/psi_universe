import {
  insertNewClient,
  insertNewPayment,
  insertNewSesion,
  parseDateToTimestamp,
} from "./sesion";
import { Cliente, Pago, PaymentURL, Sesion } from "./types";
import { getPaymentData } from "./mpLogic";

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

      const sesionPagada: Sesion = {
        idCliente: parseInt(idCliente),
        idPago: parseInt(idPago),
        idPsicologo: parseInt(query.psicologoId!),
        sesion: parseDateToTimestamp(),
        link: null,
      };

      const idSesion = await insertNewSesion(sesionPagada);
      if (!idSesion) {
        throw new Error("Error al insertar la sesión");
      }

      return true;
    }

    return false;
  } catch (error: any) {
    console.error("Error en preparePaymentDB:", error.message);
    throw error; // Propaga el error para ser manejado por el llamador
  }
}
