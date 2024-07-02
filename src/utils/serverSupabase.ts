import { createClient } from "@supabase/supabase-js";
import { Cliente, Pago, Psicologo, Sesion } from "./types";

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
      .single();

    if (existingData) {
      console.log("Cliente ya existe");
      return existingData.id;
    }

    const { data, error } = await supabase
      .from("Clientes")
      .upsert(cliente)
      .select("id");

    if (error) {
      console.error("Error al insertar el cliente:", error.message);
      return null;
    }

    if (data) {
      console.log("Cliente insertado exitosamente:", data);
      return data[0].id;
    }

    return null;
  } catch (error) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};

export const insertNewPayment = async (pago: Pago) => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("Pago")
      .select("id")
      .eq("idMP", pago.idMP)
      .single();

    if (existingData) {
      console.log("Pago ya existe");
      return existingData.id;
    }

    const { data, error } = await supabase
      .from("Pago")
      .insert(pago)
      .select("id");

    if (error) {
      console.error("Error al insertar el pago:", error.message);
      return null;
    }

    if (data) {
      console.log("Pago insertado exitosamente:", data);
      return data[0].id;
    }

    return null;
  } catch (error) {
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
      console.log("Listado de psicologos:", data);
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};

export const insertNewSesion = async (sesion: Sesion) => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("Sesiones")
      .insert(sesion)
      .select("id");

    if (existingData) {
      console.log("Sesion ya existe");
      return;
    }

    const { data, error } = await supabase.from("Sesiones").insert(sesion);

    if (error) {
      console.error("Error al insertar la sesion:", error.message);
      return null;
    }

    if (data) {
      console.log("Sesion insertada exitosamente:", data);
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};
