type CardProps = {
  title: string;
  titleColor: string;
  body: React.ReactNode;
};

const cards: CardProps[] = [
  {
    title: "Encontrá tu psicólogo ideal",
    titleColor: "text-[#BE49D1]",
    body: (
      <>
        <b>Conéctate con el psicólogo perfecto</b> para tus necesidades y
        comienza tu camino hacia una vida más plena.
      </>
    ),
  },
  {
    title: "Agendá tu sesión en minutos",
    titleColor: "text-[#0067DD]",
    body: (
      <>
        <b>Elige el día, la hora y el profesional</b> que mejor se adapte a ti.
        ¡en solo unos pocos clics!
      </>
    ),
  },
  {
    title: "Comenzá tu terapia",
    titleColor: "text-custom-violetaPrimario",
    body: (
      <>
        <b>No esperes para sentirte mejor.</b> Tomá el control de tu salud y
        comenzá tu viaje hacia el crecimiento personal hoy mismo.
      </>
    ),
  },
];

export default function ComoSeHace() {
  return (
    <section className="mt-40 w-full">
      <h2 className="font-mort-modern text-center font-medium text-5xl w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 m-auto">
        Te mostramos cómo se hace...
      </h2>
      <div className="relative flex flex-col sm:flex-row items-center gap-10 md:gap-4 lg:gap-0 sm:items-start justify-between mx-0 xl:mx-20 mt-14">
        {cards.map((card, index) => (
          <CardAccion key={index} number={index + 1} {...card} />
        ))}
        <img
          alt="flecha"
          className="hidden absolute md:block top-4 left-[23%] xl:left-[20%] w-1/5 xl:w-auto"
          src="/img/comosehace/flecha1.svg"
        />
        <img
          alt="flecha"
          className="hidden absolute md:block top-2 xl:top-0 right-[23%] xl:right-[20%] w-1/5 xl:w-auto"
          src="/img/comosehace/flecha2.svg"
        />
      </div>
    </section>
  );
}

interface CardAccionProps extends CardProps {
  number: number;
}

function CardAccion({ number, titleColor, title, body }: CardAccionProps) {
  return (
    <div className="flex flex-col items-center w-72 text-center">
      <span className={`${titleColor} font-mort-modern font-medium text-6xl`}>
        0{number}
      </span>
      <span className="font-mort-modern font-medium text-3xl w-[90%]">
        {title}
      </span>
      <span className="text-black/70 mt-3">{body}</span>
    </div>
  );
}
