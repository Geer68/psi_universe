import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TK,
});

export default function Home() {
  async function pagar(formData: FormData) {
    "use server";

    const queryParams = new URLSearchParams();
    formData.forEach((value, key) => {
      queryParams.append(key, value.toString());
    });

    const successUrl = `http://localhost:3000/compraExitosa?${queryParams.toString()}`;

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
        auto_return: "approved",
        back_urls: {
          success: successUrl,
          failure: "https://www.youtube.com/",
          pending: "http://localhost:3000/pending",
        },
        redirect_urls: {
          success: successUrl,
          failure: "https://www.youtube.com/",
          pending: "http://localhost:3000/pending",
        },
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
      <div className="flex">
        <Label>
          <span>Nombre</span>
          <Input name="nombre" type="text" />
        </Label>
        <Label>
          <span>Apellido</span>
          <Input name="apellido" type="text" />
        </Label>
      </div>
      <Label>
        <span>Email</span>
        <Input name="email" type="email" />
      </Label>
      <Button type="submit">Pagar</Button>
    </form>
  );
}
