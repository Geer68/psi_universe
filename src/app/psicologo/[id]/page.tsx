"use client";

import Container from "@/components/Container";
import Calendar from "@/components/psicologos/Calendar";
import Descripcion from "@/components/psicologos/Descripcion";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleEvent, Psicologo } from "@/utils/types";
import { Download, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<Array<GoogleEvent> | null>(null);
  const [psicologo, setPsicologo] = useState<Psicologo | null>(null);

  useEffect(() => {
    async function fetchPsicologo() {
      const response = await fetch(`/api/psicologo?id=${params.id}`);
      const { psicologo }: { psicologo: Psicologo } = await response.json();
      setPsicologo(psicologo);
    }
    fetchPsicologo();
  }, [params.id]);

  useEffect(() => {
    async function fetchEvents(hangoutLink: string) {
      const { eventos }: { eventos: Array<GoogleEvent> } = await fetch(
        `/api/events?idCalendario=${hangoutLink}`
      ).then((res) => res.json());
      setEvents(eventos);
    }
    if (psicologo) {
      fetchEvents(psicologo.idCalendario);
    }
  }, [psicologo]);

  if (!psicologo) {
    return <SkeletonPage />;
  }

  return (
    <Container className="mt-10">
      <div className="w-full flex flex-wrap justify-center sm:justify-start text-center sm:text-left rounded-3xl shadow-md min-h-20 p-8 sm:px-16 py-10 gap-8 mb-5 ">
        <img
          src={psicologo.img || ""}
          className="w-48 sm:h-48 rounded-xl"
          alt="Foto de perfil"
        />
        <div className="flex-1 text-custom-violetaPrimario">
          <h1 className="text-4xl font-mort-modern font-medium">
            {psicologo.nombre} {psicologo.apellido}
          </h1>
          <h2 className="text-2xl font-satoshi">{psicologo.especialidad}</h2>
          <hr className="w-12 border-2 border-custom-violetaPrimario my-3 m-auto sm:ml-0" />
          <Descripcion descripcion={psicologo.descripcion} caracteres={280} />
          {/* <p className="text-lg text-[#282828]">{psicologo.descripcion}</p> */}
        </div>
        <div className="w-full lg:w-28 flex justify-center sm:items-end flex-row sm:justify-end lg:flex-col gap-3 text-custom-violetaPrimario font-medium">
          {psicologo.linkCV && (
            <a
              href={psicologo.linkCV}
              className="flex items-end gap-2"
              target="_blank"
            >
              <Download
                className="text-custom-violetaPrimario/90"
                strokeWidth="1"
              />
              <span>Curriculum</span>
            </a>
          )}
          {psicologo.linkedin && (
            <a
              href={psicologo.linkedin}
              className="flex items-end gap-2 "
              target="_blank"
            >
              <Linkedin
                className="text-custom-violetaPrimario/90"
                strokeWidth="1"
              />
              <span className="">Linkedin</span>
            </a>
          )}
        </div>
      </div>
      <div className="rounded-xl p-8 shadow-lg">
        {events ? (
          <Calendar events={events ?? []} psicologo={psicologo} />
        ) : (
          <Skeleton className="h-[40rem]" />
        )}
      </div>
    </Container>
  );
}

function SkeletonPage() {
  return (
    <Container className="mt-10">
      <div className="w-full rounded-3xl shadow-md min-h-20 px-16 py-10 gap-8 flex mb-5">
        <Skeleton className="w-48 h-52" />
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-6 w-1/3 mt-3" />
          <Skeleton className="w-12 my-3 h-2" />
          <Skeleton className="flex-1 w-3/4" />
        </div>
        <div className="w-28 flex justify-end flex-col gap-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      <div className="rounded-xl p-8 shadow-lg">
        <Skeleton className="h-[40rem]" />
      </div>
    </Container>
  );
}
