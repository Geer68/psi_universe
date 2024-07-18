import { google } from "googleapis";
import { getAuth } from "./googleAuth";
import { Cliente, Pago, Sesion } from "./types";

// let sheets;
// if (typeof window === "undefined") {
//   sheets = google.sheets("v4");
// }
const SheetID = "1rh9idoALRzqV9Yktopfh2U16yoRLU1JCXCw7EyUUjw0";

export async function getSheetClientes() {
  // Obtain user credentials to use for the request
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SheetID,
    range: "Clientes!A:E",
  });

  console.log(res.data);
  return res.data;
}

export async function appendSheetClientes(
  id: string | number,
  cliente: Cliente
) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const dateNow = new Date().toISOString();

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SheetID,
    range: "Clientes!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, cliente.nombre, cliente.apellido, cliente.email, dateNow]],
    },
  });

  console.log(res.data);
  return res.data;
}

export async function getSheetPago() {
  // Obtain user credentials to use for the request
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SheetID,
    range: "Pago!A:E",
  });

  return res.data;
}

export async function appendSheetPago(id: string | number, pago: Pago) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

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

export async function getSheetPsicologos() {
  // Obtain user credentials to use for the request
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SheetID,
    range: "Psicologos!A:E",
  });

  console.log(res.data);
  return res.data;
}
export async function getSheetSesiones() {
  // Obtain user credentials to use for the request
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SheetID,
    range: "Sesiones!A:E",
  });

  console.log(res.data);
  return res.data;
}

export async function appendSheetSesiones(id: string | number, sesion: Sesion) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

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
