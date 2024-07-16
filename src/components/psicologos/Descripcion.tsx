import { useState } from "react";

export default function Descripcion({
  descripcion,
  caracteres,
  className,
}: {
  descripcion: string;
  caracteres: number;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  if (!descripcion) {
    return <span>-</span>;
  }

  if (descripcion.length < caracteres) return <p>{descripcion}</p>;

  let descripcionBreve: string = "";

  if (descripcion[279] !== " ") descripcionBreve = descripcion.slice(0, 280);
  else descripcionBreve = descripcion.slice(0, 279);

  return (
    <div className={` ${className || "text-left text-lg text-[#282828]"}`}>
      {!isOpen ? (
        <p onClick={toggleOpen}>
          {descripcionBreve}...{" "}
          <span className="ml-2 font-semibold cursor-pointer">Mostrar más</span>
        </p>
      ) : (
        <p onClick={toggleOpen}>
          {descripcion}
          <span className="ml-2 font-semibold cursor-pointer">
            Mostrar menos
          </span>
        </p>
      )}
    </div>
  );
}
