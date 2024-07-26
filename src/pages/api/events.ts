import { getEvents } from "@/utils/calendar";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const eventos = await getEvents(req.query.idCalendario as string);
  if (!eventos) {
    res.send({ success: false });
    return;
  }
  res.send({ eventos, success: true });
}
