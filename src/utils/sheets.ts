"use server";

import { google } from "googleapis";
import { formatToArgentinianTime } from "./dateFormater";
import { getAuth } from "./googleAuth";
import { Cliente, Pago, Sesion } from "./types";

const SheetID = process.env.NEXT_PUBLIC_CALENDAR_ID;

export async function getSheetClientes() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SheetID,
    range: "Clientes!A:E",
  });

  return res.data;
}

export async function appendSheetClientes(
  id: string | number,
  cliente: Cliente
) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const dateNow = formatToArgentinianTime(new Date().toISOString());
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

export async function appendSheetPago(id: string | number, pago: Pago) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const dateNow = formatToArgentinianTime(new Date().toISOString());
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Pago!A:H",
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
        ],
      ],
    },
  });
  return res.data;
}

export async function appendSheetSesiones(id: string | number, sesion: Sesion) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Sesiones!A:F",
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
