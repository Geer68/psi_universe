"use server";
// import crypto from "crypto";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { Psicologo } from "./types";
import { Event } from "./calendar";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TK!,
});

export async function pagar(
  psicologo: Psicologo,
  eventoElegido: Event,
  formData: FormData
) {
  const queryParams = new URLSearchParams();
  queryParams.append("psicologoId", psicologo.id.toString());
  queryParams.append("monto", psicologo.precioSesion.toString());
  formData.forEach((value, key) => {
    queryParams.append(key, value.toString());
  });

  const successUrl = `http://localhost:3000/verificarPago?${queryParams.toString()}`;

  const dateSesion = new Date(eventoElegido.start);
  console.log(eventoElegido);
  console.log(dateSesion);
  const inicioSesion = dateSesion.toLocaleTimeString([], {
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  });

  const tituloMP = `
    Sesión - ${psicologo.nombre} ${
    psicologo.apellido
  } - ${dateSesion.getDay()}/${dateSesion.getMonth()} ${inicioSesion}hs
  `;

  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: "donacion",
          title: tituloMP,
          quantity: 1,
          unit_price: psicologo.precioSesion,
        },
      ],
      auto_return: "approved",
      back_urls: {
        success: successUrl,
        failure: "https://www.youtube.com/",
        pending: "http://localhost:3000/pending",
      },
      redirect_urls: {
        success: successUrl,
        failure: "https://www.youtube.com/",
        pending: "http://localhost:3000/pending",
      },
    },
  });

  redirect(preference.init_point!);
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
      throw new Error(`${response.status} - ${response.statusText}`);
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
    } else {
      throw new Error("Payment transaction details are missing");
    }
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

// export async function validateHMAC(body: any): Promise<boolean> {
//   const xSignature = body.headers["x-signature"];
//   const xRequestId = body.headers["x-request-id"];
//   const urlParams = new URLSearchParams(body.url?.split("?")[1]);
//   const dataID = urlParams.get("data.id");

//   const parts = xSignature.split(",");
//   let ts;
//   let hash;

//   parts.forEach((part) => {
//     // Split each part into key and value
//     const [key, value] = part.split("=");
//     if (key && value) {
//       const trimmedKey = key.trim();
//       const trimmedValue = value.trim();
//       if (trimmedKey === "ts") {
//         ts = trimmedValue;
//       } else if (trimmedKey === "v1") {
//         hash = trimmedValue;
//       }
//     }
//   });

//   const secret = process.env.MP_HMAC!;
//   const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

//   const hmac = crypto.createHmac("sha256", secret);
//   hmac.update(manifest);
//   const sha = hmac.digest("hex");

//   return sha === hash;
// }
