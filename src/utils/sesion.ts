import { createClient } from "@supabase/supabase-js";
import { Cliente, Pago, Sesion } from "./types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const insertNewClient = async (
  cliente: Cliente
): Promise<string | null> => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("Clientes")
      .select("id")
      .eq("email", cliente.email)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      throw new Error(`${existingError.message}`);
    }

    if (existingData) {
      return existingData.id;
    }

    const { data, error } = await supabase
      .from("Clientes")
      .upsert(cliente)
      .select("id");

    if (error) {
      throw new Error(`Error al insertar el cliente: ${error.message}`);
    }

    if (data) {
      return data[0].id;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    throw error;
  }
};

export const insertNewPayment = async (pago: Pago): Promise<string | null> => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("Pago")
      .select("id")
      .eq("idMP", pago.idMP)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      throw new Error(`${existingError.message}`);
    }

    if (existingData) {
      return existingData.id;
    }

    const { data, error } = await supabase
      .from("Pago")
      .insert(pago)
      .select("id");

    if (error) {
      throw new Error(`Error al insertar el pago: ${error.message}`);
    }

    if (data) {
      return data[0].id;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    throw error;
  }
};

export const insertNewSesion = async (
  sesion: Sesion
): Promise<string | null> => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("Sesiones")
      .select("id")
      .eq("idCliente", sesion.idCliente)
      .eq("idPago", sesion.idPago)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      throw new Error(`${existingError.message}`);
    }

    if (existingData) {
      return existingData.id;
    }

    const { data, error } = await supabase
      .from("Sesiones")
      .insert(sesion)
      .select("id");

    if (error) {
      throw new Error(`Error al insertar la sesión: ${error.message}`);
    }

    if (data) {
      return data[0].id;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    throw error;
  }
};

export function parseDateToTimestamp(): string {
  const date = new Date();
  const timestamp = date.toLocaleString("es-AR");
  return timestamp;
}