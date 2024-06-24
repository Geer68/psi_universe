import { Cliente } from "@/pages/CompraExitosa";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const insertNewClient = async (
  cliente: Cliente
): Promise<string | null> => {
  try {
    // Buscar si el cliente ya existe por su email
    const { data: existingData, error: existingError } = await supabase
      .from("Clientes")
      .select("id")
      .eq("email", cliente.email)
      .single();

    if (existingData) {
      console.log("Cliente ya existe");
      return existingData.id; // Devolver el ID del cliente existente
    }

    // Insertar el nuevo cliente
    const { data, error } = await supabase
      .from("Clientes")
      .upsert(cliente)
      .select("id");

    if (error) {
      console.error("Error al insertar el cliente:", error.message);
      return null; // Manejar el error como sea necesario
    }

    if (data) {
      console.log("Cliente insertado exitosamente:", data);
      return data[0].id; // Devolver el ID del nuevo cliente insertado
    }

    return null; // Manejar caso inesperado sin data ni error
  } catch (error) {
    console.error("Error al ejecutar la operación:", error.message);
    return null; // Manejar el error general
  }
};
