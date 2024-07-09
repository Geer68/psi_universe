"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pagar } from "@/utils/mpLogic";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchPsicologos } from "@/utils/clientSupabase";
import { Psicologo } from "@/utils/types";
import { Event } from "@/utils/calendar";

export default function ModalMercadoPago({
  open,
  setOpen,
  psicologo,
  eventoElegido,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  psicologo: Psicologo;
  eventoElegido: Event;
}) {
  // const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  // useEffect(() => {
  //   //a modo prueba, esto debe ser pasado por props
  //   fetchPsicologos().then((listadoPsicologos) => {
  //     setPsicologos(listadoPsicologos);
  //   });
  // }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Pagar</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reserva de la sesión</AlertDialogTitle>

          <form
            action={(formData) => {
              pagar(psicologo, eventoElegido, formData);
            }}
            className="grid grid-cols-1 gap-5"
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
            <Button type="submit">Pagar</Button>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
