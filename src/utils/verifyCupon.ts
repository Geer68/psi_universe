import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const getCuponByCode = async (code: string) => {
  try {
    const { data, error } = await supabase
      .from("Cupones")
      .select("*")
      .eq("code", code)
      .single();

    if (error) {
      console.error("Error al buscar cupón:", error.message);
      return null;
    }

    if (data) {
      if (data.usage_count >= data.max_usage) {
        return null;
      }
      return data;
    }

    return null;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    return null;
  }
};

export const incrementCuponUse = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Cupones")
      .update({ usage_count: { $inc: 1 } })
      .eq("id", id);

    if (error) {
      console.error("Error al buscar cupón:", error.message);
      return false;
    }

    if (data) {
      return true;
    }

    return false;
  } catch (error: any) {
    console.error("Error al ejecutar la operación:", error.message);
    return false;
  }
};
