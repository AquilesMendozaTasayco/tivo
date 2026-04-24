import Hero from "@/components/home/Hero";
import Reservas from "@/components/home/Reservas";
import ComoFunciona from "@/components/home/ComoFunciona";
import Seguridad from "@/components/home/Seguridad";
import Impacto from "@/components/home/Impacto";
import Testimonios from "@/components/home/Testimonios";
import UneteATivo from "@/components/home/UneteATivo";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Reservas /> */}
      <ComoFunciona />
      <Seguridad />
      <Impacto />
      <Testimonios />
      <UneteATivo />
    </>
  );
}