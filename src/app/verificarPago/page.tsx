"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPaymentData } from "@/utils/mpLogic";
import { Cliente, Pago, PaymentURL, Sesion } from "@/utils/types";
import {
  insertNewClient,
  insertNewPayment,
  insertNewSesion,
} from "@/utils/serverSupabase";

function parseDateToTimestamp(): string {
  const timestamp = new Date().toISOString();
  return timestamp;
}

const VerificarPago = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<PaymentURL>();

  //obtengo la data del pago y digo, es valido o no
  async function fetchData(id: string, client: Cliente, idPsicologo: string) {
    const payment = await getPaymentData(id);
    console.log(payment);
    if (payment) {
      console.log("Pago aprobado");
      console.log(idPsicologo);
      preparePaymentDB(payment, client, idPsicologo);
    }
    //aca se lo paso a otra funcion que dice, es valido o no
    return payment;
  }

  async function preparePaymentDB(
    paymentData: any,
    client: Cliente,
    idPsicologo: string
  ) {
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
        idPsicologo: parseInt(idPsicologo),
        sesion: parseDateToTimestamp(),
        link: null,
      };

      insertNewSesion(sesionPagada);
    }
  }

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    setQueryParams(query);

    const client: Cliente = {
      nombre: query.nombre,
      apellido: query.apellido,
      email: query.email,
    };

    const paymentData = fetchData(
      query.collection_id!,
      client,
      query.psicologo!
    );
    //si es valido lo ingreso en la base de datos
    //redirect a la pagina de compra exitosa
  }, []);

  return <div>Verificando pago...</div>;
};

export default VerificarPago;
