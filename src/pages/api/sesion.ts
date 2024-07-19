import { fetchData } from "@/utils/paymentLogic";
import { PaymentURL } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const query = req.query as PaymentURL;

  try {
    const payment = await fetchData(id, query);
    res.send({ payment, success: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Error en el pago de sesión" });
  }
}
