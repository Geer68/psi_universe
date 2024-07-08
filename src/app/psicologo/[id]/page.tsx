"use client";

import Container from "@/components/Container";
import Calendar from "@/components/psicologos/Calendar";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<Array<Object> | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      const { events } = await fetch("/api/calendarTest").then((res) =>
        res.json()
      );
      setEvents(events);
    }
    fetchEvents();
  }, []);

  return (
    <Container className="mt-20">
      <h1>Psicologo: {params.id}</h1>
      {events !== null && <Calendar events={events} />}
      <img src="/logoNegativo.png" alt="" />
    </Container>
  );
}
