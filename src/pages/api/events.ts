import { getEvents } from "@/utils/calendar";
import { getPsicologo } from "@/utils/psicologo";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.query.idCalendario", req.query.idCalendario);
  const eventos = await getEvents(req.query.idCalendario as string);
  if (!eventos) {
    res.send({ success: false });
    return;
  }

  // res.send({ success: true, events, event });
  res.send({ eventos, success: true });
}
