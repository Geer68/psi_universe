"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pagar } from "@/utils/mpLogic";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GoogleEvent, Psicologo } from "@/utils/types";
import { extractDateTime } from "@/utils/dateFormater";

export default function ModalMercadoPago({
  open,
  setOpen,
  psicologo,
  eventoElegido,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  psicologo: Psicologo;
  eventoElegido: GoogleEvent | null;
}) {
  console.log("MP", eventoElegido);
  const inicio = extractDateTime(eventoElegido?.start || "", true);
  const fin = extractDateTime(eventoElegido?.end || "", true);

  // let dateSesion: Date;
  // console.log(eventoElegido?.start);
  // if (eventoElegido) {
  //   dateSesion = new Date(eventoElegido.start);
  //   console.log(dateSesion);
  // } else {
  //   dateSesion = new Date();
  // }
  // const formattedTime = dateSesion.toLocaleTimeString("es-ES", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Pagar</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reserva de la sesión</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="pb-4">
              <p>
                <span className="text-gray-500">Psicólogo</span>:{" "}
                {psicologo.apellido}, {psicologo.nombre}
              </p>
              <p>
                <span className="text-gray-500">Día</span>: {inicio.date}
              </p>
              <p>
                <span className="text-gray-500">Hora</span>: {inicio.time} -{" "}
                {fin.time}
              </p>
            </div>
          </AlertDialogDescription>
          <form
            action={(formData) => {
              if (eventoElegido !== null) {
                console.log("eventoElegido", eventoElegido);
                pagar(psicologo, eventoElegido, formData);
              }
            }}
            className="grid grid-cols-1 gap-5 "
          >
            <div className="flex gap-4">
              <Label>
                <span>Nombre</span>
                <Input name="nombre" type="text" />
              </Label>
              <Label>
                <span>Apellido</span>
                <Input name="apellido" type="text" />
              </Label>
            </div>
            <Label>
              <span>Email</span>
              <Input name="email" type="email" required />
            </Label>
            <Button
              type="submit"
              className="bg-custom-violetaFondoBTN hover:bg-[#391b67]"
            >
              Reservar
            </Button>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
