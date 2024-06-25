"use client";

import { Psicologo, listPsicologos } from "./serverSupabase";

export async function fetchPsicologos(): Promise<Psicologo[] | null> {
  try {
    const data: Psicologo[] = await listPsicologos();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
