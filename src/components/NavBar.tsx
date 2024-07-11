"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!pathname) return null;

  const isActive = (path: string) => pathname.includes(path);

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50">
      <Container>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between py-3">
          <Link href={"/"} className="flex gap-4 items-center">
            <img src="/logoNegativo.png" alt="Logo" />
            <p className="text-[#7643BE] font-bold text-2xl font-satoshi">
              psi•universe
            </p>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
              <li className="w-full ">
                <Link
                  href={"/profesionales"}
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-custom-violetaPrimario md:p-0 ${
                    isActive("/profesionales") && menuOpen
                      ? "bg-custom-violetaPrimario text-white"
                      : ""
                  }`}
                >
                  Profesionales
                </Link>
              </li>
              <li className="w-full ">
                <Link
                  href={"/consultas"}
                  className={`block w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-custom-violetaPrimario md:p-0 ${
                    isActive("/consultas") && menuOpen
                      ? "bg-custom-violetaPrimario text-white"
                      : ""
                  }`}
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
