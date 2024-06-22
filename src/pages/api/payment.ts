import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TK });

export default async function POST(request: NextRequest) {
  const body = await request;
  console.log("body", body);
  // .json()
  // .then((data) => data as { data: { id: string } });

  // const payment = await new Payment(client).get({ id: body.data.id });

  // console.log("HOLA");
  // console.log("payment", payment);

  return Response.json({ succcess: true });
}
