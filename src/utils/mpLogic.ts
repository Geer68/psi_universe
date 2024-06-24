import crypto from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TK!,
});

export function validateHMAC(body: any): boolean {
  const xSignature = body.headers["x-signature"];
  const xRequestId = body.headers["x-request-id"];
  const urlParams = new URLSearchParams(body.url?.split("?")[1]);
  const dataID = urlParams.get("data.id");

  const parts = xSignature.split(",");
  let ts;
  let hash;

  parts.forEach((part: any) => {
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

  const secret = process.env.MP_HMAC!;
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);
  const sha = hmac.digest("hex");

  return sha === hash;
}

const BASE_URL = "https://api.mercadopago.com/v1/payments";
const TOKEN = process.env.NEXT_PUBLIC_MP_ACCESS_TK!;

export async function getPaymentData(idBody: string) {
  const url = `${BASE_URL}/${idBody}?access_token=${TOKEN}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const payment = await response.json();

    if (payment.transaction_details !== undefined) {
      const pagoSesion = {
        idMP: payment.id,
        neto: payment.transaction_details.net_received_amount,
        recibido: payment.transaction_details.total_paid_amount,
        comisiones:
          payment.fee_details.length > 0 ? payment.fee_details[0].amount : 0,
        fechaPago: payment.date_approved,
        payerMP: payment.payer,
      };
      return pagoSesion;
    }
  } catch (error) {
    console.error(error);
  }
}
