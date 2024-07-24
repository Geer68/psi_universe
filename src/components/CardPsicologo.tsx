import { Psicologo } from "@/utils/types";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Descripcion from "./psicologos/Descripcion";

export default function CardPsicologo({ psicologo }: { psicologo: Psicologo }) {
  return (
    <Link href={`/psicologo/${psicologo.id}`} className="h-full">
      <div className=" w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border border-gray-300 md:max-w-sm rounded-t-xl">
        <div className="flex flex-wrap justify-center">
          <div className="flex justify-center w-full">
            <img
              alt={psicologo.nombre + " " + psicologo.apellido}
              src={psicologo.img}
              className="   rounded-full align-middle  border-gray-300  border-4  -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
            />
          </div>
        </div>
        <div className=" mt-20 text-center">
          <h3 className="mb-1 text-2xl font-semibold leading-normal font-mort-modern text-black ">
            Lic. {psicologo.nombre + " " + psicologo.apellido}
          </h3>
          <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
            <div className=" font-medium font-satoshi tracking-wide text-custom-violetaPrimario text-xl">
              Psi. {psicologo.especialidad}
            </div>
          </div>
        </div>
        <div className="pt-6 mx-4 mt-6 text-center border-t border-gray-200 ">
          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <p className="mb-4 font-normal font-satoshi leading-relaxed text-custom-textClarito">
                <Descripcion
                  descripcion={psicologo.descripcion}
                  caracteres={120}
                  className="text-custom-textClarito text-center"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <Button className="bg-custom-violetaPrimario rounded-xl hover:bg-custom-violetaFondoBTN">
            Ver disponibilidad
            <CalendarCheck2 className="ml-2" />
          </Button>
        </div>
        <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
          <div className="absolute flex -space-x-12 rounded-b-2xl">
            <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-violet-500/90 group-hover:bg-violet-700/90 z-10"></div>
            <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-violet-400/90 group-hover:bg-violet-600/90 z-20"></div>
            <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-violet-300/90 group-hover:bg-violet-500/90 z-30"></div>
            <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-violet-200/90 group-hover:bg-violet-400/90 z-40"></div>
            <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-violet-100/90 group-hover:bg-violet-300/90 z-50"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
