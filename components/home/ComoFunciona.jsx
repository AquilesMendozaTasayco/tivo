"use client";

import { MapPinned, UserCheck, Car, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lang/LanguageContext";

const ICONOS = [MapPinned, UserCheck, Car];

export default function ComoFunciona() {
  const { t } = useLang();
  const tCF = t.comoFunciona;

  return (
    <section id="como-funciona" className="relative py-20 md:py-28 px-6 lg:px-10 bg-[#f5fbfe] overflow-hidden">

      {/* Decoración de fondo */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="comoFuncionaWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#1bb5e0" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#comoFuncionaWaves)" />
      </svg>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
            {tCF.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-4 whitespace-pre-line" style={{ fontFamily: "Georgia, serif" }}>
            {tCF.titulo}
          </h2>
          <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
            {tCF.subtitulo}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* Columna izquierda: imagen — FIX MÓVIL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0e4a6b]/20 border-4 border-white aspect-[4/3] lg:absolute lg:inset-0 lg:rounded-3xl">
              <img
                src="/img4.jpg"
                alt={tCF.imagenAlt}
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,30,46,0.15) 0%, rgba(5,30,46,0.05) 45%, rgba(14,74,107,0.7) 100%)",
                }}
              />

              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                {tCF.imagenBadge}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white text-lg md:text-xl italic leading-snug" style={{ fontFamily: "Georgia, serif" }}>
                  &quot;{tCF.imagenFrase}&quot;
                </p>
                <div className="mt-3 h-[2px] w-12 bg-[#7fdcf2]" />
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: pasos */}
          <div className="flex flex-col gap-5 relative">

            <div className="hidden lg:block absolute left-[34px] top-14 bottom-14 w-px">
              <svg className="w-2 h-full" preserveAspectRatio="none" viewBox="0 0 2 100">
                <path d="M1 0 L 1 100" stroke="#1bb5e0" strokeWidth="0.6" strokeDasharray="3 3" fill="none" />
              </svg>
            </div>

            {tCF.pasos.map((paso, i) => {
              const Icono = ICONOS[i];
              return (
                <motion.div
                  key={paso.numero}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative group"
                >
                  <div className="relative flex items-start gap-5 bg-white rounded-2xl p-6 border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/5 hover:shadow-xl hover:shadow-[#1bb5e0]/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="relative flex-shrink-0 w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30 z-10">
                      <div className="absolute inset-0 rounded-2xl bg-[#1bb5e0] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                      <Icono className="relative w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>

                    <div className="flex-1 min-w-0 relative">
                      <span
                        className="absolute top-[-8px] right-0 text-5xl font-bold text-[#e8f6fb] select-none leading-none"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {paso.numero}
                      </span>

                      <h3 className="text-lg md:text-xl font-bold text-[#0e2a3d] mb-2 leading-tight pr-12" style={{ fontFamily: "Georgia, serif" }}>
                        {paso.titulo}
                      </h3>
                      <p className="text-sm text-[#4a6170] leading-relaxed">
                        {paso.descripcion}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}