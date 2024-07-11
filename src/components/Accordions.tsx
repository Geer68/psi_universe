import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ItemsAccordion } from "@/utils/types";

export default function Accordions({ items }: { items?: ItemsAccordion[] }) {
  return (
    <Accordion type="multiple" className="w-full gap-6 grid grid-cols-1">
      <AccordionItem
        value="item-1"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Son los psicólogos/as particulares estudiantes en formación o
          profesionales graduados/as?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Todos nuestros psicólogos{" "}
          <strong>son profesionales graduados y licenciados</strong>, con la
          formación y experiencia necesaria para brindar un servicio de calidad.
          Algunos pueden estar en formación continua para especializarse aún más
          en su campo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Es posible tener una conversación inicial con el psicólogo/a antes de
          reservar mi primera sesión?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Sí, ofrecemos una <strong>consulta inicial gratuita</strong> para que
          puedas conocer al psicólogo y discutir tus expectativas y necesidades
          antes de comprometerte a una terapia.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Con qué frecuencia debo asistir a las sesiones de terapia?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          La frecuencia de las sesiones varía según las necesidades
          individuales. Generalmente, se recomienda comenzar con sesiones
          <strong>semanales</strong> y ajustar según el progreso y la
          recomendación del terapeuta.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-4"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Qué pasa si no me siento cómodo con mi psicólogo?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Es importante que te sientas cómodo con tu terapeuta. Si no es así, te
          animamos a que lo discutas con él o ella. Si lo prefieres, podemos
          facilitarte un cambio para que encuentres un terapeuta con el que te
          sientas más a gusto.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-5"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Se mantienen en privado las conversaciones con un psicólogo?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Absolutamente. La <strong>confidencialidad</strong> es un pilar de
          nuestros servicios. Todas las conversaciones se mantienen en estricta
          privacidad, salvo en circunstancias excepcionales que la ley exija
          divulgar información.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-6"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Qué tipo de terapias ofrecen?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Ofrecemos una variedad de terapias adaptadas a las necesidades
          individuales de cada cliente. Para el apoyo académico y el estrés
          académico, ofrecemos terapias cognitivo-conductuales, terapia de
          aceptación y compromiso, terapia de manejo del estrés, entre otras.
          Estas terapias pueden ayudar a desarrollar habilidades de manejo del
          tiempo, técnicas de estudio, manejo del estrés y a mejorar la
          autoestima y la confianza en las habilidades académicas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-7"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Cómo puedo programar una cita?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Puedes programar una cita a través de nuestro sitio web. Nuestro
          equipo te asistirá para encontrar el horario que mejor se adapte a tus
          necesidades.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-8"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Cuál es la política de cancelación de citas?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Si necesitas cancelar o reprogramar tu cita, te pedimos que nos lo
          comuniques con <strong> al menos 24 horas de anticipación</strong>. De
          esta manera, podemos ofrecer tu horario a otro cliente que pueda
          necesitarlo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-9"
        className="rounded-3xl shadow-md min-h-20 p-2 px-6 border border-[#EADBFF] font-satoshi font-medium text-lg"
      >
        <AccordionTrigger className="hover:no-underline">
          ¿Cómo puedo prepararme para mi sesión de terapia?
        </AccordionTrigger>
        <AccordionContent className="font-normal text-base">
          Para prepararte para tu sesión de terapia, te sugerimos tener en mente
          los temas o preocupaciones que te gustaría discutir. También es útil
          estar en un lugar tranquilo y privado donde te sientas cómodo para
          hablar abiertamente.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
