"use client";

import { Psicologo, listPsicologos } from "./supabaseLogic";

export async function fetchPsicologos(): Promise<Psicologo[]> {
  try {
    const data: Psicologo[] = await listPsicologos();
    return data;
  } catch (error) {
    console.error(error);
  }
}
