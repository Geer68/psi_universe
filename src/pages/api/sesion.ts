import { fetchData } from "@/utils/paymentLogic";
import { listPsicologos } from "@/utils/psicologo";
import { PaymentURL } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const query = req.query as PaymentURL;
  const payment = await fetchData(id, query);
  // const events = await getEvents(psicologo.idCalendario);

  // res.send({ success: true, events, event });
  // res.send({ psicologo, events, success: true });
  res.send({ payment, success: true });
}
