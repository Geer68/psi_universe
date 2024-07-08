import {
  insertNewClient,
  insertNewPayment,
  insertNewSesion,
  parseDateToTimestamp,
} from "./serverSupabase";
import { Cliente, Pago, PaymentURL, Sesion } from "./types";
import { getPaymentData } from "./mpLogic";

export async function fetchData(id: string, query: PaymentURL) {
  const payment = await getPaymentData(id);
  console.log(payment);
  if (payment) {
    console.log("Pago aprobado");
    console.log(query.psicologo!);
    preparePaymentDB(payment, query);
  }
  //aca se lo paso a otra funcion que dice, es valido o no
  return payment;
}

async function preparePaymentDB(paymentData: any, query: PaymentURL) {
  const client: Cliente = {
    nombre: query.nombre,
    apellido: query.apellido,
    email: query.email,
  };

  const idCliente = (await insertNewClient(client)) as string;

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

    const sesionPagada: Sesion = {
      idCliente: parseInt(idCliente),
      idPago: parseInt(idPago),
      idPsicologo: parseInt(query.psicologo!),
      sesion: parseDateToTimestamp(),
      link: null,
    };

    insertNewSesion(sesionPagada);
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    return true;
  }
  return false;
}
