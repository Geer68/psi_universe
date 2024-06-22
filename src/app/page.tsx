import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TK });

export default function Home() {
  async function pagar(formData: FormData) {
    "use server";

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "donacion",
            title: formData.get("message") as string,
            quantity: 1,
            unit_price: Number(formData.get("monto")),
          },
        ],
      },
    });

    redirect(preference.init_point!);
  }

  return (
    <form action={pagar}>
      <Label>
        <span>Monto</span>
        <Input name="monto" type="number" />
      </Label>
      <Button type="submit">Pagar</Button>
    </form>
  );
}
