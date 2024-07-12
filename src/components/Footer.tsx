import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="w-full relative flex align-middle justify-center h-40 mt-10">
      <Container className="grid grid-cols-1 sm:flex justify-between w-[85%] my-4">
        <aside className="sm:w-1/2 py-4 flex flex-col gap-4 sm:gap-0 justify-between">
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
          <div className="text-custom-textClarito flex flex-col justify-between">
            <p className="font-medium">Nuestras redes</p>
            <p>Instagram</p>
            <p>Instagram</p>
            <p>Instagram</p>
          </div>
        </aside>
      </Container>
    </footer>
  );
}
