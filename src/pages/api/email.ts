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

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

//será necesario enviar el pago?
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { evento, query, sesionPagada } = req.body;

  if (!evento || !query || !sesionPagada) {
    throw new Error("Error al evniar el correo");
  }

  try {
    await sendEMailCliente(evento, query, sesionPagada);
    await sendEMailPsicologo(evento, query, sesionPagada);
    res.send({ test: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
}

export async function sendEMailCliente(
  evento: Event,
  query: PaymentURL,
  sesionPagada: Sesion
) {
  const psicologo = await getPsicologo(query.psicologoId!);

  const asunto = `Sesión confirmada con ${psicologo?.nombre} ${psicologo?.apellido}`;
  const mensaje = `Hola ${query.nombre} ${query.apellido},\n\nTu sesión con ${psicologo?.nombre} ${psicologo?.apellido} ha sido confirmada para el día ${evento.start}.\n\nEl link para tu sesión es: ${evento.hangoutLink} \n\n¡Nos vemos pronto!`;

  sendEmail(asunto, mensaje, query.email);
}

export async function sendEMailPsicologo(
  evento: Event,
  query: PaymentURL,
  sesionPagada: Sesion
) {
  const psicologo = await getPsicologo(query.psicologoId!);

  const asunto = `Sesión confirmada con ${query.nombre} ${query.apellido}`;
  const mensaje = `Hola ${psicologo?.nombre},\n\nTu sesión con ${query.nombre} ${query.apellido} ha sido abonada para el día ${evento.start}.\n\nEl link para tu sesión es: ${evento.hangoutLink} \n\n¡Nos vemos pronto!`;

  sendEmail(asunto, mensaje, psicologo?.emailPersonal!);
}
