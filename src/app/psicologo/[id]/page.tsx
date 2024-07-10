"use client";

import Container from "@/components/Container";
import Calendar from "@/components/psicologos/Calendar";
import { GoogleEvent, Psicologo } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<Array<GoogleEvent> | null>(null);
  const [psicologo, setPsicologo] = useState<Psicologo | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      const {
        psicologo,
        events,
      }: { psicologo: Psicologo; events: Array<GoogleEvent> } = await fetch(
        `/api/psicologo?id=${params.id}`
      ).then((res) => res.json());
      setEvents(events);
      setPsicologo(psicologo);
    }
    fetchEvents();
  }, [params.id]);

  return (
    <Container className="mt-20">
      <h1>Psicologo: {params.id}</h1>
      {events !== null && psicologo !== null && (
        <Calendar events={events} psicologo={psicologo} />
      )}
      <img src="/logoNegativo.png" alt="" />
    </Container>
  );
}
