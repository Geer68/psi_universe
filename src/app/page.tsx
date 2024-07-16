import CardConFrase from "@/components/CardConFrase";
import ComoSeHace from "@/components/ComoSeHace";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import PorQueNosotros from "@/components/PorQueNosotros";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <CardConFrase />
      <PorQueNosotros />
      <ComoSeHace />
    </Container>
  );
}
