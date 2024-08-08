export const maxDuration = 60;
import { fetchData } from "@/utils/paymentLogic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { query, evento } = req.body;
  console.log("query:", query);
  console.log("evento:", evento);
  try {
    const payment = await fetchData(query, evento);
    console.log("payment", payment);
    res.send({ payment, success: true });
  } catch (error: any) {
    console.log("ERROR:", error);
    res
      .status(500)
      .send({ error: "Error en el pago de sesión", success: false });
  }
}
