"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lang/LanguageContext";

// Los SVG paths de los íconos NO se traducen (son los mismos en todos los idiomas).
// Se mapean por orden a los 5 valores.
const ICONOS_PATHS = [
  // Confianza — apretón de manos
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  // Seguridad — escudo con check
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  // Innovación — rayo
  "M13 10V3L4 14h7v7l9-11h-7z",
  // Comunidad — personas conectadas
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  // Accesibilidad — globo / mundo
  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function NuestrosValores() {
  const { t } = useLang();
  const tNV = t.nuestrosValores;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-10 bg-[#f5fbfe] relative overflow-hidden">

      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="valoresWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#1bb5e0" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#valoresWaves)" />
      </svg>

      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">

        {/* ENCABEZADO */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-4">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-xs font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
            {tNV.badge}
          </motion.span>

          <motion.h2
            className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#0e2a3d] leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {tNV.tituloPre}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#0e4a6b]">{tNV.tituloDestacado}</span>
              <motion.span
                className="absolute bottom-1 left-0 w-full h-2.5 bg-[#4ac8e8]/45 -z-0 rounded"
                initial={{ scaleX: 0, originX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                aria-hidden="true"
              />
            </span>
          </motion.h2>

          <motion.p
            className="text-[#4a6170] text-sm md:text-base max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {tNV.subtitulo}
          </motion.p>
        </div>

        {/* GRID DE VALORES */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tNV.valores.map((v, i) => (
            <motion.div
              key={i}
              className="group relative bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-xl hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden"
              variants={cardItem}
            >
              <span
                className="absolute -top-3 -right-2 text-[80px] font-black text-[#0e4a6b]/5 select-none leading-none pointer-events-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {v.numero}
              </span>

              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-[#1bb5e0]/20">
                <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                <svg className="relative w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={ICONOS_PATHS[i]} />
                </svg>
              </div>

              <span className="text-xs font-bold text-[#4ac8e8] tracking-widest">{v.numero}</span>

              <h3
                className="text-base font-bold text-[#0e2a3d] leading-snug"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {v.titulo}
              </h3>

              <div className="w-8 h-0.5 bg-[#4ac8e8] rounded group-hover:w-full transition-all duration-500" />

              <p className="text-xs text-[#4a6170] leading-relaxed">
                {v.descripcion}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}