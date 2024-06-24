"use client";
import { getPaymentData } from "@/utils/mpLogic";
import { insertNewClient, insertNewPayment } from "@/utils/supabaseLogic";
import { Cliente, Pago, Sesion } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function parseDateToTimestamp(): number {
  const date = new Date();
  const timestamp = date.getTime();
  return timestamp;
}

export default function CompraExitosa() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<{ collection_id?: string }>(
    {}
  );
  const [client, setClient] = useState<Cliente | {}>({});

  async function fetchData(id: string) {
    const payment = await getPaymentData(id);
    return payment;
  }

  async function formatPago(client: Cliente, ordenMP: string) {
    const idCliente = (await insertNewClient(client)) as string;

    const payment = await fetchData(ordenMP);

    if (payment != null) {
      const pago: Pago = {
        idCliente: idCliente,
        idMP: payment?.idMP,
        recibido: payment?.recibido,
        comisiones: payment?.comisiones,
        neto: payment?.neto,
        fechaPago: payment?.fechaPago,
        payerMP: payment?.payerMP,
      };

      const idPago = await insertNewPayment(pago);

      const sesionPagada: Sesion = {
        idCliente: parseInt(idCliente),
        idPago: parseInt(idPago),
        idPsicologo: parseInt(queryParams.idPsicologo),
        sesion: parseDateToTimestamp(),
        linkSesion: null,
      };
    } else {
      //Si el numero de payment es invalido redirigir a la pagina de inicio
      router.push("/");
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
    setClient(client);

    const id = query.collection_id as string;
    formatPago(client, id);
  }, []);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Gracias por reservar!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Tu numero de orden es{" "}
          <strong className="font-medium text-gray-900 dark:text-white hover:underline">
            #{queryParams.collection_id}
          </strong>{" "}
          , actualmente esta siendo procesado y en unos minutos recibirás un
          correo con los detalles necesarios para tu sesión.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          No dudes en escribirnos a psico@soporte.com ante cualquier
          inconveniente
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Sesión para
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {queryParams.nombre} {queryParams.apellido}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Fecha de la sesión
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              14 May 2024
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Hora
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              18:00
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Sesión reservada con
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              Marcela Figueroa
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={"/"}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Volver al inicio
          </Link>
        </div>
        <ul>
          {Object.entries(queryParams).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
