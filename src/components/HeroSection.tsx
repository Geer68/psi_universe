import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="relative flex flex-col gap-6 items-center justify-center w-full h-[60vh]">
      <img
        src="/hero_bg.svg"
        alt=""
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <section className="text-center text-[#373737]">
        <p className="text-6xl font-mort-modern">Encontrá tu</p>
        <p className="text-[#7643BE] text-7xl font-bold italic font-mort-modern-condensed">
          psicólogo ideal
        </p>
      </section>
      <div className="text-center w-3/4 md:w-1/2 lg:w-1/3 font-satoshi text-xl">
        <p className="text-[#666666]">
          Nos asociamos con los mejores profesionales para garantizarte la más
          alta calidad en atención.
        </p>
      </div>
      <Button className="bg-[#373737] rounded-2xl px-6 font-semibold font-satoshi ">
        Encontralo hoy
      </Button>
    </div>
  );
}
