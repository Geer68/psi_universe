import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TK!,
});

export default async function POST(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const body = await request;
  // .json()
  // .then((data) => data as { data: { id: string } });
  // console.log("body", body);

  const xSignature = body.headers["x-signature"];
  const xRequestId = body.headers["x-request-id"]; // Assuming headers is an object containing request headers

  // Obtain Query params related to the request URL
  const urlParams = new URLSearchParams(body.url?.split("?")[1]);
  const dataID = urlParams.get("data.id");

  // Separating the x-signature into parts
  const parts = xSignature.split(",");

  // Initializing variables to store ts and hash
  let ts;
  let hash;

  // Iterate over the values to obtain ts and v1
  parts.forEach((part: any) => {
    // Split each part into key and value
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  // Obtain the secret key for the user/application from Mercadopago developers site
  const secret = process.env.MP_HMAC!;

  // Generate the manifest string
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  // Create an HMAC signature
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);

  // Obtain the hash result as a hexadecimal string
  const sha = hmac.digest("hex");

  if (sha === hash) {
    // HMAC verification passed
    console.log("HMAC verification passed");
  } else {
    // HMAC verification failed
    console.log("HMAC verification failed");
  }

  const id = body.query["data.id"];

  const payment = await new Payment(client).get({ id: id });

  if (payment.transaction_details !== undefined) {
    const compra = {
      id: payment.id,
      monto: payment.transaction_amount,
      montoNeto: payment.transaction_details.net_received_amount,
      status: payment.status,
    };
  }
  res.status(200).json({ succcess: true });
}
