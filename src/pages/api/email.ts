import {
  Event,
  getEventByID,
  getEvents,
  setEventBooked,
} from "@/utils/calendar";
import {
  getCookieEvento,
  getCookieQuery,
  getCookieSesion,
} from "@/utils/mpLogic";
import { getPsicologo } from "@/utils/psicologo";
import { sendEmail } from "@/utils/sendEmail";
import { PaymentURL, Sesion } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { evento, query, sesionPagada } = req.body;

  console.log("evento", evento);
  console.log("query", query);
  console.log("sesionPagada", sesionPagada);

  if (!evento || !query || !sesionPagada) {
    throw new Error("Error al evniar el correo");
  }

  const psicologo = await getPsicologo(query.psicologoId!);

  const asunto = `Sesión confirmada con ${psicologo?.nombre} ${psicologo?.apellido}`;
  const mensaje = `Hola ${query.nombre} ${query.apellido},\n\nTu sesión con ${psicologo?.nombre} ${psicologo?.apellido} ha sido confirmada para el día ${evento.start}.\n\nEl link para tu sesión es: ${evento.hangoutLink} \n\n¡Nos vemos pronto!`;

  sendEmail(asunto, mensaje, query.email);

  res.send({ test: true });
}
