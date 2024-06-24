"use client";
import { useEffect, useState } from "react";
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
import { Psicologo } from "@/utils/supabaseLogic";
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

export default function ModalMercadoPago() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  useEffect(() => {
    //a modo prueba, esto debe ser pasado por props
    fetchPsicologos().then((listadoPsicologos) => {
      setPsicologos(listadoPsicologos);
    });
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger>Pagar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reserva de la sesión</AlertDialogTitle>

          <form action={pagar} className="grid grid-cols-1 gap-5">
            <Select name="psicologo" required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Psicólogo" />
              </SelectTrigger>
              <SelectContent>
                {psicologos.map((psicologo) => (
                  <SelectItem
                    key={psicologo.id}
                    value={psicologo.id.toString()}
                  >
                    {psicologo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>
              <span>Monto</span>
              <Input name="monto" type="number" />
            </Label>
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
