import { listPsicologos } from "@/utils/psicologo";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const psicologos = await listPsicologos();
  res.send({ psicologos, success: true });
}
