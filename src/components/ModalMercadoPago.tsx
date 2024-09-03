"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pagar } from "@/utils/mpLogic";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GoogleEvent, Psicologo } from "@/utils/types";
import { extractDateTime } from "@/utils/dateFormater";
import { CustomAlert } from "./CustomAlert";

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
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar CustomAlert
  const inicio = extractDateTime(eventoElegido?.start || "", true);
  const fin = extractDateTime(eventoElegido?.end || "", true);

  useEffect(() => {
    async function checkEventBooked(calendarId: string, id: string) {
      const eventoBooked = await fetch(
        `/api/eventBooked?calendarId=${calendarId}&eventId=${id}`
      ).then((res) => res.json());
      if (eventoBooked.booked) {
        setOpen(false);
        setShowAlert(true); // Mostrar el alert en lugar de renderizarlo directamente
      }
    }
    if (eventoElegido) {
      checkEventBooked(eventoElegido.calendarId || "", eventoElegido.id || "");
    }
  }, [eventoElegido, setOpen]);

  return (
    <>
      <CustomAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="¡La sesión ha sido reservada!"
        description="La sesión que estás intentando reservar acaba de ser ocupada. Por favor, seleccioná una nueva para continuar con el proceso de reserva."
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reservá tu sesión</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <div className="pb-4">
              <p>
                <span className="text-gray-600">Psicólogo:</span>{" "}
                {psicologo.apellido}, {psicologo.nombre}
              </p>
              <p>
                <span className="text-gray-600">Día:</span> {inicio.date}
              </p>
              <p>
                <span className="text-gray-600">Hora:</span> {inicio.time} -{" "}
                {fin.time}
              </p>
            </div>
          </AlertDialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              if (eventoElegido !== null) {
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
            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">¡Importante!</span> Serás
                redirigido a Mercado Pago. Esperá a volver a la página para
                confirmar tu sesión.
              </div>
            </div>

            <Button
              type="submit"
              className="bg-custom-violetaFondoBTN hover:bg-[#391b67]"
            >
              Reservar
            </Button>
          </form>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
