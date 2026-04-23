"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({ image, title, breadcrumb }) {
  return (
    <section
      className="relative w-full h-[38vh] md:h-[48vh] overflow-hidden -mt-[80px]"
      style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}
    >

      {/* Imagen de fondo */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay azul */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#051e2e]/85 via-[#0e4a6b]/65 to-[#051e2e]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#051e2e]/60" />

      {/* Patrón de líneas onduladas (tipo rutas GPS) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="pageHeroWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pageHeroWaves)" />
      </svg>

      {/* Línea decorativa izquierda */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#4ac8e8] to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center text-white px-6 pt-[100px] md:pt-[110px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Etiqueta superior */}
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#7fdcf2] text-xs font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
            </span>
            TIVO · Movilidad compartida
          </motion.span>

          {/* Título */}
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {title}
          </h1>

          {/* Línea decorativa */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-8 h-0.5 bg-[#4ac8e8]" />
            <div className="w-3 h-0.5 bg-[#1bb5e0]" />
            <div className="w-1.5 h-0.5 bg-white/40" />
          </motion.div>

          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.nav
              className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase bg-white/8 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <Link href="/" className="text-white/60 hover:text-white transition-colors duration-200">
                Inicio
              </Link>
              <ChevronRight className="w-3 h-3 text-[#4ac8e8]" />
              <span className="text-[#7fdcf2]">{breadcrumb}</span>
            </motion.nav>
          )}
        </motion.div>
      </div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent opacity-[0.06]" />
    </section>
  );
}