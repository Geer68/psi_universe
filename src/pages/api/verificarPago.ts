// pages/api/verificarPago.ts

import { getPaymentData } from "@/utils/mpLogic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const paymentData = await getPaymentData(id as string);

    if (paymentData.status === "approved") {
      // Realiza la inserción en la base de datos si es necesario
      // const insertResult = await insertPaymentData(paymentData);

      res.status(200).json({ success: true, ...paymentData });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
