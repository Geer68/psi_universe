"use client";
import CardPsicologo from "@/components/CardPsicologo";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
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
        <h1 className="text-4xl md:text-5xl font-mort-modern">
          Te presentamos a{" "}
          <span className="text-custom-violetaPrimario font-mort-modern-condensed">
            nuestros profesionales
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 gap-y-20 mt-24 items-start">
        {psicologos.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonPage key={index} />
            ))
          : psicologos.map((psicologo) => (
              <CardPsicologo key={psicologo.id} psicologo={psicologo} />
            ))}
      </div>
    </Container>
  );
}

function SkeletonPage() {
  return (
    <Container className="mx-auto">
      <div className="w-full rounded-3xl shadow-md min-h-20 px-16 py-10 gap-8 flex flex-col items-center mb-5">
        <Skeleton className="h-48 w-48 rounded-full" />
        {/* <Skeleton className="w-48 h-52" /> */}
        <div className="w-[95%] flex justify-end flex-col gap-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </Container>
  );
}
