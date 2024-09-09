"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pagar } from "@/utils/mpLogic";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GoogleEvent, Psicologo } from "@/utils/types";
import { extractDateTime } from "@/utils/dateFormater";
import { CustomAlert } from "./CustomAlert";
import { ArrowRight, SmilePlus } from "lucide-react";
import Container from "./Container";

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
  const [showAlert, setShowAlert] = useState(false);
  const [cupon, setCupon] = useState("");
  const [cuponMensaje, setCuponMensaje] = useState(
    "Si tenés un cupón, este es tu momento."
  );
  const [isProcessingCupon, setIsProcessingCupon] = useState(false);
  const [precioOriginal, setPrecioOriginal] = useState(psicologo.precioSesion); // Guardar el precio original

  const inicio = extractDateTime(eventoElegido?.start || "", true);
  const fin = extractDateTime(eventoElegido?.end || "", true);

  useEffect(() => {
    async function checkEventBooked(calendarId: string, id: string) {
      const eventoBooked = await fetch(
        `/api/eventBooked?calendarId=${calendarId}&eventId=${id}`
      ).then((res) => res.json());
      if (eventoBooked.booked) {
        setOpen(false);
        setShowAlert(true);
      }
    }
    if (eventoElegido) {
      checkEventBooked(eventoElegido.calendarId || "", eventoElegido.id || "");
    }
  }, [eventoElegido, setOpen]);

  const handleCuponChange = async (cuponValue: string) => {
    setCupon(cuponValue);
    setIsProcessingCupon(true);
    setCuponMensaje("Validando cupón...");

    if (cuponValue === "") {
      setCuponMensaje("Si tenés un cupón, este es tu momento.");
      setIsProcessingCupon(false);
      psicologo.precioSesion = precioOriginal;
      return;
    }

    try {
      const response = await fetch("/api/cupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cupon: cuponValue }),
      });

      const { cupon } = await response.json();

      if (cupon) {
        if (cupon.cupon_type === "percentage") {
          setCuponMensaje(`¡${cupon.value}% de descuento!`);
          psicologo.precioSesion = precioOriginal * (1 - cupon.value / 100);
        } else if (cupon.cupon_type === "amount") {
          psicologo.precioSesion = precioOriginal - cupon.value;
          setCuponMensaje(`¡$${cupon.value} de descuento!`);
        }
      } else {
        setCuponMensaje("Cupón inválido");
        psicologo.precioSesion = precioOriginal;
      }
    } catch (error) {
      console.error("Error al enviar el cupón:", error);
      setCuponMensaje("Error al procesar el cupón");
      psicologo.precioSesion = precioOriginal;
    } finally {
      setIsProcessingCupon(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (eventoElegido !== null) {
      const formData = new FormData(e.target as HTMLFormElement);
      pagar(psicologo, eventoElegido, formData);
    }
  };

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
          <AlertDialogHeader className="flex flex-row align-middle items-center gap-2">
            <SmilePlus />
            <aside className="flex flex-col">
              <AlertDialogTitle>
                Sesión con {psicologo.nombre + " " + psicologo.apellido}
              </AlertDialogTitle>
              <p className="text-sm text-gray-800 text-left">
                {inicio.date} De {inicio.time} a {fin.time}
              </p>
            </aside>
          </AlertDialogHeader>
          <Container>
            <AlertDialogDescription className="text-xs text-gray-800">
              Completá tus datos para confirmar tu sesión.
            </AlertDialogDescription>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 mt-4"
            >
              <div className="flex gap-4">
                <Label>
                  <span>Nombre</span>
                  <Input name="nombre" className="mt-2" type="text" required />
                </Label>
                <Label>
                  <span>Apellido</span>
                  <Input
                    name="apellido"
                    className="mt-2"
                    type="text"
                    required
                  />
                </Label>
              </div>
              <Label>
                <span>Email</span>
                <Input name="email" className="mt-2" type="email" required />
              </Label>
              <Label>
                <span>Cupón</span>
                <Input
                  name="cupon"
                  className="my-2"
                  type="text"
                  value={cupon}
                  onChange={(e) => handleCuponChange(e.target.value)}
                />
                <span className="text-xs text-gray-800">{cuponMensaje}</span>
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

              <div className="flex gap-2 items-center align-middle">
                <AlertDialogCancel className="w-1/2 m-0">
                  Cancelar
                </AlertDialogCancel>
                <Button
                  type="submit"
                  className="bg-custom-violetaFondoBTN w-1/2 hover:bg-[#391b67]"
                  disabled={isProcessingCupon} // El botón se deshabilita mientras se procesa el cupón
                >
                  Reservar
                  <ArrowRight className="ml-1" />
                </Button>
              </div>
            </form>
          </Container>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
