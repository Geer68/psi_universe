import Accordions from "@/components/Accordions";
import Container from "@/components/Container";

export default function Consultas() {
  return (
    <Container>
      <div className="flex justify-center mt-16">
        <p className="font-mort-modern text-4xl">Consultas frecuentes</p>
      </div>
      <div className="mt-20">
        <Accordions />
      </div>
    </Container>
  );
}
