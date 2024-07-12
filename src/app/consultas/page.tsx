import Accordions from "@/components/Accordions";
import Container from "@/components/Container";
import { ItemsAccordion } from "@/utils/types";

// const items: ItemsAccordion[] = [
//   {
//     title:
//       "¿Son los psicólogos/as particulares estudiantes en formación o profesionales graduados/as?",
//     contentStart: "Todos nuestros psicólogos son ",
//     contentBold: "profesionales graduados y licenciados",
//     contentEnd:
//       ", con la formación y experiencia necesaria para brindar un servicio de calidad. Algunos pueden estar en formación continua para especializarse aún más en su campo.",
//   },
// ];

export default function Consultas() {
  return (
    <Container>
      <div className="flex justify-center">
        <p className="font-mort-modern text-4xl">Consultas frecuentes</p>
      </div>
      <div className="mt-20">
        <Accordions />
      </div>
    </Container>
  );
}
