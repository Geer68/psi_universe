import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

import { NextApiRequest, NextApiResponse } from "next";
import { getPaymentData, validateHMAC } from "@/utils/mpLogic";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TK!,
});

export default async function POST(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const body = await request;

  const isValidHMAC = validateHMAC(body);
  if (isValidHMAC) {
    const id = body.body.data.id as string;
    console.log("id", id);
    // getPaymentData(id);
    console.log("HMAC verification passed");
  } else {
    console.log("HMAC verification failed");
  }
  res.status(200).json({ succcess: true });
}
