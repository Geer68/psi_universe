import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  //   const body = await req.body.json().then((data: Request) => data);
  //   console.log("body", body);
  // const events = await getEvents(
  //   "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com"
  // );

  // const event = await getEventByID(
  //   "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com",
  //   "4c5qm4b9v158qkrvhu61t9vp1m_20240627T153000Z"
  // );
  // const eventTest = await setEventBooked(
  //   "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com",
  //   "4c5qm4b9v158qkrvhu61t9vp1m_20240627T153000Z"
  // );
  // if (events === null) {
  //   res.send({ success: false });
  //   return;
  // }

  sendEmail();

  // res.send({ success: true, events, event });
  res.send({ test: true });
}
