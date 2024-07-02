"use client";
import CardPsicologo from "@/components/CardPsicologo";
import Container from "@/components/Container";
import { fetchPsicologos } from "@/utils/clientSupabase";
import { Psicologo } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Profesionales() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  useEffect(() => {
    //a modo prueba, esto debe ser pasado por props
    fetchPsicologos().then((listadoPsicologos) => {
      setPsicologos(listadoPsicologos);
    });
  }, []);

  return (
    <Container className="grid grid-cols-4">
      {psicologos.map((psicologo) => (
        <CardPsicologo key={psicologo.id} psicologo={psicologo} />
      ))}
    </Container>
  );
}
