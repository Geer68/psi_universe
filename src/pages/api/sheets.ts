import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getAuth } from "../../utils/googleAuth";
import { Cliente, Pago, Sesion } from "../../utils/types";

const SheetID = "1rh9idoALRzqV9Yktopfh2U16yoRLU1JCXCw7EyUUjw0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { action, data } = req.body;

  try {
    const auth = await getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    let result;
    switch (action) {
      case "appendSheetClientes":
        result = await appendSheetClientes(sheets, data.id, data.cliente);
        break;
      case "appendSheetPago":
        result = await appendSheetPago(sheets, data.id, data.pago);
        break;
      case "appendSheetSesiones":
        result = await appendSheetSesiones(sheets, data.id, data.sesion);
        break;
      default:
        return res.status(400).json({ error: "Invalid action" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function appendSheetClientes(
  sheets: any,
  id: string | number,
  cliente: Cliente
) {
  const dateNow = new Date().toISOString();
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Clientes!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, cliente.nombre, cliente.apellido, cliente.email, dateNow]],
    },
  });
  return res.data;
}

async function appendSheetPago(sheets: any, id: string | number, pago: Pago) {
  const dateNow = new Date().toISOString();
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Pago!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          id,
          pago.idCliente,
          pago.idMP,
          dateNow,
          pago.recibido,
          pago.comisiones,
          pago.neto,
          pago.fechaPago,
          pago.payerMP,
        ],
      ],
    },
  });
  return res.data;
}

async function appendSheetSesiones(
  sheets: any,
  id: string | number,
  sesion: Sesion
) {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Sesiones!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          id,
          sesion.idPsicologo,
          sesion.idPago,
          sesion.idCliente,
          sesion.sesion,
          sesion.link,
        ],
      ],
    },
  });
  return res.data;
}
