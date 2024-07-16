import { getEventByID, getEvents, setEventBooked } from "@/utils/calendar";
import { appendSheetClientes, getSheetClientes } from "@/utils/sheets";
import { Cliente } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// Same as above interface but all properties are optional

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const cliente: Cliente = {
    nombre: "Juan",
    apellido: "Perez",
    email: "jperez@gmail.com",
  };
  const data = await appendSheetClientes(1, cliente);

  // res.send({ success: true, events, event });
  res.send({ data, success: true });
}
