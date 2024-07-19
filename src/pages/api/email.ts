import { extractDateTime } from "@/utils/dateFormater";
import { getPsicologo } from "@/utils/psicologo";
import { sendEmail } from "@/utils/sendEmail";
import { GoogleEvent, PaymentURL } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { evento, query } = req.body;

  if (!evento || !query) {
    throw new Error("Error al enviar el correo");
  }

  try {
    await sendEMailCliente(evento, query);
    await sendEMailPsicologo(evento, query);
    res.send({ result: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
}

export async function sendEMailCliente(evento: GoogleEvent, query: PaymentURL) {
  const psicologo = await getPsicologo(query.psicologoId!);

  const asunto = `Confirmación de sesión con ${psicologo?.nombre} ${psicologo?.apellido}`;
  const mensaje = [
    `Hola ${query.nombre} ${query.apellido}`,
    `Te escribimos para confirmar que tu sesión con ${psicologo?.nombre} ${
      psicologo?.apellido
    } ha sido programada con éxito para el día ${
      extractDateTime(evento.start, true).date
    } a las ${extractDateTime(evento.start, true).time}.`,
    `Para unirte a la sesión, utiliza el siguiente enlace: ${evento.hangoutLink}`,
    `¡Esperamos que tengas una excelente sesión!`,
  ];
  sendEmail(asunto, mensaje, query.email);
}

export async function sendEMailPsicologo(
  evento: GoogleEvent,
  query: PaymentURL
) {
  const psicologo = await getPsicologo(query.psicologoId!);

  const asunto = `Confirmación de sesión con ${query.nombre} ${query.apellido}`;
  const mensaje = [
    `Hola ${psicologo?.nombre},`,
    `Queremos informarte que la sesión con ${query.nombre} ${
      query.apellido
    } ha sido abonada y confirmada para el día ${
      extractDateTime(evento.start, true).date
    } a las ${extractDateTime(evento.start, true).time}.`,
    `Para acceder a la sesión, utiliza el siguiente enlace: ${evento.hangoutLink}`,
    `¡Esperamos que sea una sesión productiva!`,
  ];

  sendEmail(asunto, mensaje, psicologo?.emailPersonal!);
}
