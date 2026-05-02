"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket } from "lucide-react";
import { useLang } from "@/lang/LanguageContext";

export default function Objetivos() {
  const { t } = useLang();
  const tO = t.objetivos;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 lg:px-10 bg-white overflow-hidden relative">

      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-xs font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Target className="w-3 h-3" />
            {tO.badge}
          </motion.span>

          <motion.h2
            className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#0e2a3d] leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {tO.tituloPre}{" "}
            <span className="text-[#0e4a6b] italic">{tO.tituloDestacado}</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 h-0.5 bg-[#0e4a6b]" />
            <div className="w-3 h-0.5 bg-[#1bb5e0]" />
            <div className="w-1.5 h-0.5 bg-[#4ac8e8]" />
          </motion.div>
        </div>

        {/* Grid de objetivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CORTO PLAZO */}
          <motion.div
            className="relative bg-gradient-to-br from-[#f5fbfe] to-white rounded-3xl border border-[#d4eef9] p-8 flex flex-col gap-5 shadow-lg shadow-[#0e4a6b]/5 hover:shadow-xl hover:shadow-[#1bb5e0]/15 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30">
              <div className="absolute inset-0 rounded-2xl bg-[#1bb5e0] blur-md opacity-30" />
              <Target className="relative w-6 h-6 text-white" strokeWidth={1.8} />
            </div>

            <span className="text-xs font-bold text-[#1bb5e0] uppercase tracking-widest">
              {tO.cortoPlazo.etiqueta}
            </span>

            <h3 className="text-xl md:text-2xl font-bold text-[#0e2a3d] leading-snug" style={{ fontFamily: "Georgia, serif" }}>
              {tO.cortoPlazo.titulo}
            </h3>

            <p className="text-[#4a6170] text-sm md:text-base leading-relaxed">
              {tO.cortoPlazo.descripcion}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-[#1bb5e0]/40 via-[#4ac8e8]/20 to-transparent" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1bb5e0]" />
              <span className="text-xs text-[#4a6170] font-medium">{tO.cortoPlazo.pie}</span>
            </div>
          </motion.div>

          {/* LARGO PLAZO */}
          <motion.div
            className="relative rounded-3xl p-8 flex flex-col gap-5 shadow-xl shadow-[#0e4a6b]/15 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

            <div className="relative w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-[#7fdcf2]" strokeWidth={1.8} />
            </div>

            <span className="relative text-xs font-bold text-[#7fdcf2] uppercase tracking-widest">
              {tO.largoPlazo.etiqueta}
            </span>

            <h3 className="relative text-xl md:text-2xl font-bold text-white leading-snug" style={{ fontFamily: "Georgia, serif" }}>
              {tO.largoPlazo.titulo}
            </h3>

            <p className="relative text-white/75 text-sm md:text-base leading-relaxed">
              {tO.largoPlazo.descripcion}
            </p>

            <div className="relative w-full h-px bg-gradient-to-r from-[#4ac8e8]/40 via-[#1bb5e0]/20 to-transparent" />

            <div className="relative flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ac8e8]" />
              <span className="text-xs text-white/60 font-medium">{tO.largoPlazo.pie}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}