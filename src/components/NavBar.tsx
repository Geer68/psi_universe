"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!pathname) return null;

  return (
    <nav className="sticky top-0 left-0 w-full backdrop-blur-md z-50 bg-gray-50/70">
      <Container>
        <div className="flex flex-wrap items-center justify-between py-3">
          <Link href={"/"} className="flex gap-4 items-center">
            <img
              src="/logoNegativo.png"
              alt="Logo"
              className="rounded-full h-12"
            />
            <p className="text-[#7643BE] font-bold text-2xl font-satoshi">
              psi•universe
            </p>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-custom-violetaPrimario/30 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center">
              <li className="w-full ">
                <Link
                  href={"/profesionales"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-custom-violetaPrimario md:p-0 "
                  onClick={toggleMenu}
                >
                  Profesionales
                </Link>
              </li>
              <li className="w-full ">
                <Link
                  href={"/consultas"}
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-custom-violetaPrimario md:p-0 border-t-2 border-custom-violetaPrimario/30"
                  onClick={toggleMenu}
                >
                  Consultas
                </Link>
              </li>
              <li>
                <Link
                  href={"/profesionales"}
                  className="hidden sm:block rounded-2xl px-6 text-white py-2 bg-custom-violetaFondoBTN font-semibold"
                >
                  Agendá
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}
