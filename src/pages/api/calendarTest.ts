import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const mensaje = [
    "Hola Gabriel,",
    "Queremos informarte que la sesión con ger ger ha sido abonada y confirmada para el día 16/8/2024 a las 09:00.",
    "Para acceder a la sesión, utiliza el siguiente enlace: undefined",
    "¡Esperamos que sea una sesión productiva!",
    "`Saludos cordiales, El equipo de psiuniverse ;)",
  ];
  sendEmail("PSIUniverse Test", mensaje, "grperezdiez@gmail.com");
  res.send({ mensaje, success: true });
}
