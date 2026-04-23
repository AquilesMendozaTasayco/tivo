"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MisionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 px-6 lg:px-10 overflow-hidden">

      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
          alt="Ciudad de noche"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop";
          }}
        />
        {/* Degradado azul oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#051e2e]/92 via-[#0e4a6b]/88 to-[#0f6998]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051e2e]/60 via-transparent to-[#051e2e]/40" />
      </div>

      {/* Patrón decorativo: líneas onduladas */}
      <svg className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="mvWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
            <path d="M0 110 Q 50 70, 100 110 T 200 110" stroke="#a2dcf0" strokeWidth="1.2" fill="none" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mvWaves)" />
      </svg>

      {/* Orbes decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/15 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/10 blur-3xl pointer-events-none z-[1]" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12">

        {/* ENCABEZADO */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#7fdcf2] text-xs font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
            </span>
            Nuestra esencia
          </motion.span>

          <motion.h2
            className="text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Lo que nos{" "}
            <span className="text-[#7fdcf2] italic">mueve y nos guía</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 h-0.5 bg-[#4ac8e8]" />
            <div className="w-3 h-0.5 bg-[#1bb5e0]" />
            <div className="w-1.5 h-0.5 bg-white/40" />
          </motion.div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {/* CARD MISIÓN */}
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-white/15 backdrop-blur-md bg-white/8 p-8 flex flex-col gap-5 group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Brillo de esquina */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#4ac8e8]/15 rounded-full blur-2xl -translate-x-8 -translate-y-8 pointer-events-none" />

            {/* Icono — Ruta / destino */}
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#7fdcf2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"
                />
              </svg>
            </div>

            {/* Etiqueta */}
            <span className="text-xs font-bold text-[#7fdcf2] uppercase tracking-widest">
              Misión
            </span>

            {/* Título */}
            <h3
              className="text-xl md:text-2xl font-bold text-white leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Movilidad segura, accesible y confiable
            </h3>

            {/* Texto — EXACTO del PDF */}
            <p className="text-white/75 text-sm md:text-base leading-relaxed flex-1">
              Ofrecer movilidad compartida segura, accesible y confiable mediante una plataforma
              tecnológica que conecta usuarios verificados y conductores, mejorando la experiencia
              de transporte urbano.
            </p>

            {/* Línea decorativa inferior */}
            <div className="w-full h-px bg-gradient-to-r from-[#4ac8e8]/40 via-[#1bb5e0]/20 to-transparent" />

            {/* Pie */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ac8e8]" />
              <span className="text-xs text-white/50 font-medium">TIVO · Movilidad compartida</span>
            </div>
          </motion.div>

          {/* CARD VISIÓN */}
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-white/15 backdrop-blur-md bg-white/8 p-8 flex flex-col gap-5 group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Brillo de esquina */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1bb5e0]/20 rounded-full blur-2xl translate-x-8 translate-y-8 pointer-events-none" />

            {/* Icono — Ojo / visión */}
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#7fdcf2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>

            {/* Etiqueta */}
            <span className="text-xs font-bold text-[#7fdcf2] uppercase tracking-widest">
              Visión
            </span>

            {/* Título */}
            <h3
              className="text-xl md:text-2xl font-bold text-white leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ser la plataforma líder en Lima
            </h3>

            {/* Texto — EXACTO del PDF */}
            <p className="text-white/75 text-sm md:text-base leading-relaxed flex-1">
              Ser la plataforma líder de movilidad compartida en Lima, reconocida por su seguridad,
              innovación y enfoque humano.
            </p>

            {/* Línea decorativa inferior */}
            <div className="w-full h-px bg-gradient-to-r from-[#4ac8e8]/40 via-[#1bb5e0]/20 to-transparent" />

            {/* Pie */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ac8e8]" />
              <span className="text-xs text-white/50 font-medium">TIVO · Movilidad compartida</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}