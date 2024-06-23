import { listEvents } from "@/utils/calendar";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  //   const body = await req.body.json().then((data: Request) => data);
  //   console.log("body", body);
  console.log(listEvents());
  res.send({ success: true });
}
