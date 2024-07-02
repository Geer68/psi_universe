import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <Container className="flex justify-between items-center mt-5">
      <aside className="flex gap-4 items-center">
        <img src="/logoNegativo.png" alt="" />
        <p className="text-[#7643BE] font-bold text-2xl font-satoshi">
          psi•universe
        </p>
      </aside>
      <aside className="flex gap-4 items-center font-satoshi font-medium">
        <Link href={"/profesionales"}>Profesionales</Link>
        <Link href={"/faq"}>Consultas</Link>
        <Link href={"/profesionales"}>
          <Button className="rounded-2xl px-6 bg-[#4C1D95] font-semibold">
            Agendá
          </Button>
        </Link>
      </aside>
    </Container>
  );
}
