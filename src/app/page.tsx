import CardConFrase from "@/components/CardConFrase";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import PorQueNosotros from "@/components/PorQueNosotros";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <CardConFrase />
      <PorQueNosotros />
    </Container>
  );
}
