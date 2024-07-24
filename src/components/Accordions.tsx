import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionProp = {
  title: React.ReactNode;
  body: React.ReactNode;
};

const cards: AccordionProp[] = [
  {
    title:
      "¿Son los psicólogos/as particulares estudiantes en formación o profesionales graduados/as?",
    body: (
      <>
        Todos nuestros psicólogos son{" "}
        <b className="text-custom-violetaPrimario ">
          profesionales graduados y licenciados
        </b>
        , con la formación y experiencia necesaria para brindar un servicio de
        calidad. Algunos pueden estar en formación continua para especializarse
        aún más en su campo.
      </>
    ),
  },
  {
    title:
      "¿Es posible tener una conversación inicial con el psicólogo/a antes de reservar mi primera sesión?",
    body: (
      <>
        Sí, ofrecemos una{" "}
        <b className="text-custom-violetaPrimario ">
          consulta inicial gratuita
        </b>{" "}
        para que puedas conocer al psicólogo y discutir tus expectativas y
        necesidades antes de comprometerte a una terapia.
      </>
    ),
  },
  {
    title: "¿Con qué frecuencia debo asistir a las sesiones de terapia?",
    body: (
      <>
        La frecuencia de las sesiones varía según las necesidades individuales.
        Generalmente,{" "}
        <b className="text-custom-violetaPrimario ">
          se recomienda comenzar con sesiones semanales y ajustar según el
          progreso
        </b>{" "}
        y la recomendación del terapeuta.
      </>
    ),
  },
  {
    title: "¿Qué pasa si no me siento cómodo con mi psicólogo?",
    body: (
      <>
        Es importante que te sientas cómodo con tu terapeuta. Si no es así, te
        animamos a que lo discutas con él o ella. Si lo prefieres, podemos
        facilitarte un cambio para que encuentres un terapeuta con el que te
        sientas más a gusto.
      </>
    ),
  },
  {
    title: "¿Se mantienen en privado las conversaciones con un psicólogo?",
    body: (
      <>
        Absolutamente.
        <b className="text-custom-violetaPrimario ">
          {" "}
          La confidencialidad es un pilar de nuestros servicios
        </b>
        . Todas las conversaciones se mantienen en estricta privacidad, salvo en
        circunstancias excepcionales que la ley exija divulgar información.
      </>
    ),
  },
  {
    title: "¿Qué tipo de terapias ofrecen?",
    body: (
      <>
        Ofrecemos una variedad de terapias adaptadas a las necesidades
        individuales de cada cliente. Para el apoyo{" "}
        <b>académico y el estrés académico</b>, ofrecemos terapias
        cognitivo-conductuales, terapia de aceptación y compromiso, terapia de
        manejo del estrés, entre otras. Estas terapias pueden ayudar a
        desarrollar habilidades de manejo del tiempo, técnicas de estudio,
        manejo del estrés y a mejorar la autoestima y la confianza en las
        habilidades académicas.
      </>
    ),
  },
  {
    title: "¿Cuál es la política de cancelación de citas?",
    body: (
      <>
        Si necesitas cancelar o reprogramar tu cita, te pedimos que nos lo
        comuniques con{" "}
        <b className="text-custom-violetaPrimario ">
          {" "}
          al menos 24 horas de anticipación
        </b>
        . De esta manera, podemos ofrecer tu horario a otro cliente que pueda
        necesitarlo. Acá deberia ir un correo o algo a notificar de la sesion
      </>
    ),
  },
  {
    title: "¿Cómo puedo prepararme para mi sesión de terapia?",
    body: (
      <>
        Para prepararte para tu sesión de terapia, te sugerimos tener en mente
        los temas o preocupaciones que te gustaría discutir. También es útil
        estar en un lugar tranquilo y privado donde te sientas cómodo para
        hablar abiertamente.
      </>
    ),
  },
];

export default function Accordions() {
  return (
    <Accordion type="multiple" className="w-full gap-6 grid grid-cols-1">
      {cards.map((card, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
        >
          <AccordionTrigger className="hover:no-underline">
            {card.title}
          </AccordionTrigger>
          <AccordionContent className="font-normal text-base">
            {card.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
