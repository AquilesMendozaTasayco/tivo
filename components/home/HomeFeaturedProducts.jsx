"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pilares = [
  {
    icono: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    texto: "Salud del paciente primero",
  },
  {
    icono: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    texto: "Investigación continua",
  },
  {
    icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    texto: "Estándares éticos altos",
  },
  {
    icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    texto: "Medicina 100% natural",
  },
];

// Variantes reutilizables
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const pilarItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function SobreNosotros() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── IZQUIERDA: TEXTO ── */}
          <div className="flex flex-col gap-5">

            {/* Etiqueta */}
            <motion.span
              className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#f0f7f1] border border-[#c6e3cb] text-[#1a4a2e] text-xs font-semibold tracking-widest uppercase"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c5c]" />
              Quiénes somos
            </motion.span>

            {/* Título */}
            <motion.h2
              className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#1a2e1f] leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Devolvemos la salud{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#1a4a2e]">desde la naturaleza</span>
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-2.5 bg-[#a8d5a2]/40 -z-0 rounded"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              </span>
            </motion.h2>

            {/* Línea decorativa */}
            <motion.div
              className="flex items-center gap-2"
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-8 h-0.5 bg-[#1a4a2e]" />
              <div className="w-3 h-0.5 bg-[#4a8c5c]" />
              <div className="w-1.5 h-0.5 bg-[#a8d5a2]" />
            </motion.div>

            {/* Párrafo 1 */}
            <motion.p
              className="text-[#4a5a4e] text-sm md:text-base leading-relaxed"
              variants={fadeUp}
              custom={0.25}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <strong className="text-[#1a4a2e]">Campo María BioLab</strong> es una compañía biofarmacéutica
              especializada en medicamentos de origen natural. Nuestros extractos oleosos y aceites esenciales
              actúan sobre los diferentes sistemas del organismo — gastrointestinal, respiratorio, nervioso y más —
              sin los devastadores efectos secundarios de la farmacia convencional.
            </motion.p>

            {/* Párrafo 2 */}
            <motion.p
              className="text-[#4a5a4e] text-sm md:text-base leading-relaxed"
              variants={fadeUp}
              custom={0.32}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Innovamos constantemente gracias a nuestra obsesión por la investigación y nuestro
              compromiso con los más altos estándares éticos. Cada gota de nuestros productos es el resultado
              de ciencia aplicada a la tierra.
            </motion.p>

            {/* Pilares */}
            <motion.div
              className="grid grid-cols-2 gap-2.5 mt-1"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {pilares.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f8fdf8] border border-[#e2f0e4]"
                  variants={pilarItem}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1a4a2e]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1a4a2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={p.icono} />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-[#2d4a35] leading-tight">{p.texto}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-1"
              variants={fadeUp}
              custom={0.55}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/nosotros"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1a4a2e] hover:bg-[#153d25] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Conoce más sobre nosotros
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contactanos"
                className="text-sm font-medium text-[#1a4a2e] hover:text-[#153d25] underline underline-offset-4 transition-colors"
              >
                Contáctanos
              </Link>
            </motion.div>
          </div>

          {/* ── DERECHA: IMAGEN ── */}
          <div className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">

            {/* Marco decorativo trasero */}
            <motion.div
              className="absolute top-5 right-5 lg:right-0 w-full max-w-sm lg:max-w-none lg:w-[420px] h-[480px] xl:h-[540px] rounded-3xl border-2 border-[#a8d5a2] z-0"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Fondo color */}
            <motion.div
              className="absolute top-0 right-9 lg:right-4 w-full max-w-sm lg:max-w-none lg:w-[420px] h-[480px] xl:h-[540px] rounded-3xl bg-[#1a4a2e]/6 z-0"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Imagen principal */}
            <motion.div
              className="relative z-10 w-full max-w-sm lg:max-w-none lg:w-[420px] h-[480px] xl:h-[540px] rounded-3xl overflow-hidden shadow-2xl"
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <img
                src="https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=900&q=85&auto=format&fit=crop"
                alt="Plantas medicinales Campo María BioLab"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a4a2e]/30 via-transparent to-transparent" />
            </motion.div>

            {/* Badge inferior izquierdo */}
            <motion.div
              className="absolute bottom-8 -left-4 z-20 flex items-center gap-3 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 border border-[#e8f4ea]"
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: 10 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#1a4a2e] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#6b7c6e] font-medium">Calidad certificada</p>
                <p className="text-sm font-bold text-[#1a2e1f]">100% Natural</p>
              </div>
            </motion.div>

            {/* Badge superior izquierdo */}
            <motion.div
              className="absolute top-8 -left-4 z-20 flex items-center gap-3 bg-[#1a4a2e] rounded-2xl shadow-xl px-3.5 py-2.5"
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: -10 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/70 font-medium">Línea de productos</p>
                <p className="text-sm font-bold text-white">5 fitofármacos</p>
              </div>
            </motion.div>

            {/* Puntos decorativos */}
            <motion.div
              className="absolute -bottom-3 right-2 lg:-right-2 z-0 grid grid-cols-4 gap-1.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#a8d5a2]/60" />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}