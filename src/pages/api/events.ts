import { getEvents } from "@/utils/calendar";
import { getPsicologo } from "@/utils/psicologo";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const eventos = await getEvents(req.query.idCalendario as string);
  if (!eventos) {
    res.send({ success: false });
    return;
  }
  res.send({ eventos, success: true });
}
