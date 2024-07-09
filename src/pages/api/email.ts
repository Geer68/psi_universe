import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  sendEmail(
    "Esto es una prueba",
    "Una prueba muy cachonda",
    "psi.universe.uy@gmail.com"
  );

  // res.send({ success: true, events, event });
  res.send({ test: true });
}
