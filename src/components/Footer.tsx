import Link from "next/link";
import Container from "./Container";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative flex flex-col align-middle justify-center h-64 sm:h-48 py-4 mb-10 mt-20">
      <Container className="grid grid-cols-1 gap-y-4 sm:flex justify-between w-[85%] my-4 ">
        <aside className="sm:w-1/2 flex flex-col gap-4 sm:gap-0 justify-between">
          <Link href={"/"} className="flex gap-4 items-center">
            <img src="/logoNegativo.png" alt="Logo" className="max-h-10" />
            <p className="text-[#7643BE] font-bold text-xl font-satoshi">
              psi•universe
            </p>
          </Link>
          <div className="text-custom-textClarito text-sm">
            <strong>© {currentYear} psi•universe</strong>. Todos los derechos
            reservados.
          </div>
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
      <Container className="py-8 mt-4 flex justify-center">
        <div className="text-sm">
          © {currentYear}. Orgullosamente{" "}
          <span className="font-medium text-custom-textClarito">
            diseñado y desarrollado
          </span>{" "}
          por <span className="text-pink-500 font-semibold">Aftercode.</span>
        </div>
      </Container>
    </footer>
  );
}
