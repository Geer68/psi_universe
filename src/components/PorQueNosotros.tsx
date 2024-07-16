import { ExternalLink } from "lucide-react";

type CardProps = {
  title: string;
  description: React.ReactNode;
  img: string;
  linkText: string;
  link: string;
};

const cards: CardProps[] = [
  {
    title: "¿Qué nos diferencia?",
    description: (
      <>
        <span>
          Te ofrecemos un <b>equipo multidisciplinario</b> para acompañarte.{" "}
          <b>Terapia a tu medida</b>, desde cualquier lugar y en tu horario.
        </span>{" "}
        <span>
          Tu <b>bienestar integral es nuestra prioridad</b>: promovemos tu salud
          física, mental y emocional.
        </span>
      </>
    ),
    img: "/img/whyus/card1.png",
    linkText: "Consultá nuestras opciones",
    link: "/consultas",
  },
  {
    title: "Disfrutá de la comodidad",
    description: (
      <span>
        Conectate <b>desde la comodidad de tu hogar</b> o cualquier lugar. Tu
        tiempo, tus reglas. <b>Elige tu el horario</b> que mejor se adapte a tu
        rutina y reprogramá citas con facilidad.
      </span>
    ),
    img: "/img/whyus/card2.png",
    linkText: "Mirá nuestros tips para una sesión",
    link: "/consultas",
  },
  {
    title: "Sos nuestro compromiso",
    description: (
      <>
        <span className="block">
          <b>Terapias diseñadas a medida</b> para atender tus necesidades
          especificas.
        </span>{" "}
        <span>
          Te ofrecemos un entorno donde expresarte{" "}
          <b>con libertad y sin prejuicios</b>. Queremos guiarte en{" "}
          <b>tu camino hacia una vida sana</b>.
        </span>
      </>
    ),
    img: "/img/whyus/card3.png",
    linkText: "Mirá todos nuestros tipos de terapia",
    link: "/consultas",
  },
  {
    title: "Texto FALTANTE",
    description: (
      <>
        <span className="block">
          Te ofrecemos un <b>equipo multidisciplinario</b> para acompañarte.
          <b>Terapia a tu medida</b>, desde cualquier lugar y en tu horario.
        </span>{" "}
        <span>
          Tu <b>bienestar integral es nuestra prioridad</b>: promovemos tu salud
          física, mental y emocional.
        </span>
      </>
    ),
    img: "/img/whyus/card4.png",
    linkText: "Mirá todos nuestros tipos de terapia",
    link: "/consultas",
  },
];

export default function PorQueNosotros() {
  return (
    <section className="mt-24 w-full">
      <h2 className="font-mort-modern font-medium text-4xl">
        ¿Por qué nosotros?
      </h2>
      <div className="flex flex-wrap w-full justify-between gap-5 mt-6">
        {cards.map((card, i) => (
          <CardCaracteristica key={i} {...card} />
        ))}
      </div>
    </section>
  );
}

function CardCaracteristica({
  title,
  description,
  img,
  linkText,
  link,
}: CardProps) {
  return (
    <div className="w-full flex flex-col xl:flex-row justify-between min-h-64 md:max-w-[48%] 2xl:flex-auto 2xl:max-w-[48%] rounded-2xl bg-white shadow-sm overflow-hidden border border-1 border-custom-violetaPrimario/10">
      <img
        alt="figura abstracta"
        src={img}
        className="mt-6 h-32 xl:h-full w-full xl:w-1/4 xl:-ml-2 object-contain xl:object-cover object-center xl:object-right"
      />
      <div className="flex-1 gap-6 flex flex-col items-start justify-between p-5 text-[#504136]">
        <div className="w-full">
          <span className="block font-satoshi font-medium text-2xl text-center xl:text-left text-custom-violetaPrimario">
            {title}
          </span>
          <p className="mt-3 flex flex-col gap-3 leading-6">{description}</p>
        </div>
        <a
          href={link}
          target="_blank"
          className="w-full justify-center xl:justify-start flex items-center gap-1 text-[#7643BE] font-bold text-md font-satoshi mt-4 pt-2 lg:p-0"
        >
          {linkText}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
