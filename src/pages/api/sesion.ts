import { fetchData } from "@/utils/paymentLogic";
import { PaymentURL } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { query, evento } = req.body;
  const id = query.collection_id;
  console.log("query", query);
  console.log("evento", evento);

  try {
    const payment = await fetchData(query, evento);
    res.send({ payment, success: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Error en el pago de sesión" });
  }
}
