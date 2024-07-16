import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const events = await getEvents(
    "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com"
  );
  console.log(events);

  // res.send({ success: true, events, event });
  res.send({ events, success: true });
}
