import { checkEvent } from "@/utils/calendar";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const calendarId = req.query.calendarId as string;
  const eventId = req.query.eventId as string;

  const bookedEvent = await checkEvent(calendarId, eventId);
  if (bookedEvent) {
    res.send({ booked: true });
    return;
  }

  res.send({ booked: false });
}
