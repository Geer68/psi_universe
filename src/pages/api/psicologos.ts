import { listPsicologos } from "@/utils/psicologo";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const psicologos = await listPsicologos();
  // const events = await getEvents(psicologo.idCalendario);

  // res.send({ success: true, events, event });
  // res.send({ psicologo, events, success: true });
  res.send({ psicologos, success: true });
}
