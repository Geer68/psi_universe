import { getCuponByCode } from "@/utils/verifyCupon";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { cupon } = req.body;

  if (!cupon) {
    throw new Error("Error al verificar cupón");
  }

  try {
    res.send({ result: true, cupon: await getCuponByCode(cupon) });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "Error al verificar cupón" });
  }
}
