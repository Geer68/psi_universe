import { createClient } from "@supabase/supabase-js";
import { Psicologo } from "./types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const getPsicologo = async (
  psicologoId: string
): Promise<Psicologo | null> => {
  try {
    const { data, error } = await supabase
      .from("Psicologos")
      .select("*")
      .eq("id", psicologoId)
      .single();

    if (error) {
      console.error("Error al listar psicologos:", error.message);
      return null;
    }

    if (data) {
      return data;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};

export const listPsicologos = async (): Promise<Psicologo[] | null> => {
  try {
    const { data, error } = await supabase.from("Psicologos").select("*");

    if (error) {
      console.error("Error al listar psicologos:", error.message);
      return null;
    }

    if (data) {
      return data;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};
