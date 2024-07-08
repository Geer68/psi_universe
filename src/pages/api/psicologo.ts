import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { getPsicologo } from "@/utils/psicologo";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const psicologo = await getPsicologo(req.query.id as string);
  if (!psicologo) {
    res.send({ success: false });
    return;
  }

  const events = await getEvents(psicologo.idCalendario);

  // res.send({ success: true, events, event });
  res.send({ psicologo, events, success: true });
}
