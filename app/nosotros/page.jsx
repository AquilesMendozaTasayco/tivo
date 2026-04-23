import PageHero from "@/components/PageHero";
import SobreNosotrosInfo from "@/components/nosotros/About";
import MisionVision from "@/components/nosotros/MisionVision";
import NuestrosValores from "@/components/nosotros/WhyChooseUs";
import Objetivos from "@/components/nosotros/Objetivos";

export default function Nosotros() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85"
        title="Conoce a TIVO"
        breadcrumb="Nosotros"
      />
      <SobreNosotrosInfo />
      <MisionVision />
      <NuestrosValores />
      <Objetivos />
    </>
  );
}