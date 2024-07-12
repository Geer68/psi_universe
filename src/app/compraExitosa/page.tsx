"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleEvent, PaymentURL, Psicologo } from "@/utils/types";
import Container from "@/components/Container";
import { getPsicologo } from "@/utils/psicologo";
import { getCookieEvento } from "@/utils/mpLogic";
import { extractDateTime } from "@/utils/dateFormater";

export default function CompraExitosa() {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<PaymentURL | null>(null);
  const [psicologo, setPsicologo] = useState<Psicologo | null>(null);
  const [evento, setEvento] = useState<GoogleEvent | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = Object.fromEntries(searchParams!.entries()) as PaymentURL;
        setQueryParams(query);

        const psico = await getPsicologo(query.psicologoId!);
        setPsicologo(psico);

        const fetchEvento = await getCookieEvento();
        if (!fetchEvento) {
          throw new Error("Error al obtener el evento");
        }
        const eventoJSON: GoogleEvent = JSON.parse(fetchEvento.value);
        setEvento(eventoJSON);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!queryParams) {
    return (
      <Container className="mt-20 flex flex-col items-center gap-5">
        <p>Verificando pago...</p>
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-20">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          ¡Gracias por reservar!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Tu número de orden es{" "}
          <strong className="font-medium text-gray-900 dark:text-white hover:underline">
            #{queryParams.collection_id}
          </strong>{" "}
          , actualmente está siendo procesado y en unos minutos recibirás un
          correo con los detalles necesarios para tu sesión.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          No dudes en escribirnos a psico@soporte.com ante cualquier
          inconveniente.
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
              {extractDateTime(evento?.start || "").date}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Hora
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {extractDateTime(evento?.start || "").time}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Sesión reservada con
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {psicologo?.nombre + " " + psicologo?.apellido}
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
        {/* <ul>
          {Object.entries(queryParams).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong>
              {value}
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
}
