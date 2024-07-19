"use server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { Psicologo } from "./types";
import { GoogleEvent } from "./types";
import { cookies } from "next/headers";
import { extractDateTime } from "./dateFormater";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TK!,
});

export async function pagar(
  psicologo: Psicologo,
  eventoElegido: GoogleEvent,
  formData: FormData
) {
  const queryParams = new URLSearchParams();

  queryParams.append("psicologoId", psicologo.id.toString());
  queryParams.append("monto", psicologo.precioSesion.toString());
  console.log(eventoElegido);
  cookies().set("evento", JSON.stringify(eventoElegido), { httpOnly: true });

  formData.forEach((value, key) => {
    queryParams.append(key, value.toString());
  });

  const successUrl = `https://www.psiuniverse.com/verificarPago?${queryParams.toString()}`;

  // Dia y hora
  const inicio = extractDateTime(eventoElegido?.start || "");
  const fin = extractDateTime(eventoElegido?.end || "");

  const inicioSesion = `${inicio.date} - ${inicio.time} ${fin.time}`;

  const tituloMP = `
    Sesión - ${psicologo.nombre} ${psicologo.apellido} de ${inicioSesion}hs
  `;

  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: "sesion",
          title: tituloMP,
          quantity: 1,
          unit_price: psicologo.precioSesion,
        },
      ],
      auto_return: "approved",
      back_urls: {
        success: successUrl,
        failure: successUrl,
        pending: successUrl,
      },
      redirect_urls: {
        success: successUrl,
        failure: successUrl,
        pending: successUrl,
      },
    },
  });

  redirect(preference.init_point!);
}

const BASE_URL = "https://api.mercadopago.com/v1/payments";
const TOKEN = process.env.MP_ACCESS_TK!;

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

export async function getCookieEvento() {
  const evento = cookies().get("evento");
  return evento;
}

export async function getCookieSesion() {
  const sesion = cookies().get("sesion");
  return sesion;
}

export async function getCookieQuery() {
  const query = cookies().get("query");
  return query;
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
