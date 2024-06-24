import { MercadoPagoConfig } from "mercadopago";

import { NextApiRequest, NextApiResponse } from "next";
import { validateHMAC } from "@/utils/mpLogic";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TK!,
});

export default async function POST(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const body = await request;

  const isValidHMAC = validateHMAC(body);
  if (await isValidHMAC) {
    const id = body.body.data.id as string;
    console.log("HMAC verification passed");
    res.status(200).json({ succcess: true });
  } else {
    console.error("HMAC verification failed");
    res.status(400).json({ succcess: false });
    // redirect("http://localhost:3000/");
  }
}
