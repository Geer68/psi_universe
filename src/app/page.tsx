import CardConFrase from "@/components/CardConFrase";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import ModalMercadoPago from "@/components/ModalMercadoPago";

export default function Home() {
  return (
    <Container className="grid grid-cols-1 gap-10">
      <HeroSection />
      <CardConFrase />
    </Container>
    // <div className="w-full flex justify-center m-20">
    //   <ModalMercadoPago />
    // </div>
  );
}
