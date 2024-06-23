import { Cliente } from "@/pages/CompraExitosa";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const insertNewClient = async (cliente: Cliente) => {
  const { data: existingData, error: existingError } = await supabase
    .from("Clientes")
    .select()
    .eq("email", cliente.email);

  if (existingData && existingData.length > 0) {
    console.log("Cliente ya existe");
    return existingData[0].id;
  }

  const { data, error } = await supabase
    .from("Clientes")
    .insert(cliente)
    .select();

  console.log("data", data);
  console.log("error", error);
};
