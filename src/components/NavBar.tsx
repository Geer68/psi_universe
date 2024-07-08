import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50">
      <Container className="flex justify-between items-center py-3 px-4">
        <aside className="flex gap-4 items-center">
          <img src="/logoNegativo.png" alt="Logo" />
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
    </div>
  );
}
