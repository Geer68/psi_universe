import { setEventBooked } from "@/utils/calendar";
import { GoogleEvent } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { evento } = req.body;

  if (!evento) {
    throw new Error("Error al bookear el evento");
  }

  const eventoSeleccionado: GoogleEvent = evento;

  try {
    await setEventBooked(eventoSeleccionado.calendarId, eventoSeleccionado.id!);
    res.send({ result: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
}
