"use client";
import CardPsicologo from "@/components/CardPsicologo";
import Container from "@/components/Container";
import { listPsicologos } from "@/utils/psicologo";
import { Psicologo } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Profesionales() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  useEffect(() => {
    listPsicologos().then((listadoPsicologos) => {
      setPsicologos(listadoPsicologos || []);
    });
  }, []);

  return (
    <Container>
      <div className="mt-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-mort-modern">
          Te presentamos a{" "}
          <span className="text-custom-violetaPrimario font-mort-modern-condensed">
            nuestros profesionales
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-1 sm:gap-5 items-start">
        {psicologos.map((psicologo) => (
          <CardPsicologo key={psicologo.id} psicologo={psicologo} />
        ))}
      </div>
    </Container>
  );
}
