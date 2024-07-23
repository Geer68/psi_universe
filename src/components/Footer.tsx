import Link from "next/link";
import Container from "./Container";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full relative flex align-middle justify-center h-64 sm:h-48 py-4 my-10">
      <Container className="grid grid-cols-1 gap-y-4 sm:flex justify-between w-[85%] my-4 ">
        <aside className="sm:w-1/2 flex flex-col gap-4 sm:gap-0 justify-between">
          <Link href={"/"} className="flex gap-4 items-center">
            <img src="/logoNegativo.png" alt="Logo" className="max-h-10" />
            <p className="text-[#7643BE] font-bold text-xl font-satoshi">
              psi•universe
            </p>
          </Link>
          <p className="text-custom-textClarito text-sm">
            <strong>© 2024 psi•universe</strong>. Todos los derechos reservados
          </p>
        </aside>
        <aside className="flex sm:w-1/2 justify-between sm:justify-end gap-8">
          <div className="text-custom-textClarito flex flex-col justify-between">
            <p className="font-medium">Links</p>
            <Link href={"/profesionales"}>Profesionales</Link>
            <Link href={"/consultas"}>Consultas</Link>
            <Link href={"/profesionales"}>Agendá</Link>
          </div>
          <div className="text-custom-textClarito flex flex-col gap-2 justify-start">
            <p className="font-medium">Nuestras redes</p>
            <a href="https://www.instagram.com/psiuniverse/" className="flex">
              <Instagram className="mr-2" strokeWidth="1.7" />
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/psiuniverse/"
              className="flex"
            >
              <Linkedin className="mr-2" strokeWidth="1.5" />
              Linkedin
            </a>
          </div>
        </aside>
      </Container>
    </footer>
  );
}
