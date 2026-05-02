"use client";

import PageHero from "@/components/PageHero";
import SobreNosotrosInfo from "@/components/nosotros/About";
import MisionVision from "@/components/nosotros/MisionVision";
import NuestrosValores from "@/components/nosotros/WhyChooseUs";
import Objetivos from "@/components/nosotros/Objetivos";
import { useLang } from "@/lang/LanguageContext";

export default function Nosotros() {
  const { t } = useLang();
  // Reusamos las claves del componente `sobreNosotros` para el PageHero
  const tHero = t.sobreNosotros.pageHero;

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85"
        title={tHero.title}
        breadcrumb={tHero.breadcrumb}
      />
      <SobreNosotrosInfo />
      <MisionVision />
      <NuestrosValores />
      <Objetivos />
    </>
  );
}