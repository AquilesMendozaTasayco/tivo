"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SobreNosotrosInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── IZQUIERDA: IMAGEN ── */}
          <div className="relative flex items-center justify-center">

            {/* Fondo color */}
            <motion.div
              className="absolute top-0 w-[90%] h-[480px] xl:h-[540px] rounded-3xl bg-[#0e4a6b]/8 z-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Marco decorativo */}
            <motion.div
              className="absolute top-5 left-[5%] w-[90%] h-[480px] xl:h-[540px] rounded-3xl border-2 border-[#4ac8e8] z-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Imagen principal */}
            <motion.div
              className="relative z-10 w-[85%] h-[480px] xl:h-[540px] rounded-3xl overflow-hidden shadow-2xl"
              variants={fadeRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85&auto=format&fit=crop"
                alt="TIVO Movilidad Compartida"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e4a6b]/40 via-transparent to-transparent" />
            </motion.div>

            {/* Badge superior derecho */}
            <motion.div
              className="absolute top-6 right-0 z-20 flex items-center gap-3 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 border border-[#d4eef9]"
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center flex-shrink-0">
                {/* Ícono pin de ubicación */}
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#4a6170] font-medium">Operamos en</p>
                <p className="text-sm font-bold text-[#0e2a3d]">Lima, Perú</p>
              </div>
            </motion.div>

            {/* Badge inferior derecho */}
            <motion.div
              className="absolute bottom-6 right-0 z-20 flex items-center gap-3 bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] rounded-2xl shadow-xl shadow-[#1bb5e0]/30 px-3.5 py-2.5"
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                {/* Ícono de personas conectadas */}
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/70 font-medium">Nuestra esencia</p>
                <p className="text-xs font-bold text-white leading-tight">Movilidad humana</p>
              </div>
            </motion.div>

            {/* Puntos decorativos */}
            <motion.div
              className="absolute -bottom-3 left-[5%] z-0 grid grid-cols-4 gap-1.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8]/60" />
              ))}
            </motion.div>
          </div>

          {/* ── DERECHA: TEXTO ── */}
          <div className="flex flex-col gap-5">

            <motion.span
              className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-xs font-semibold tracking-widest uppercase"
              variants={fadeUp} custom={0}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              Quiénes somos
            </motion.span>

            <motion.h2
              className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#0e2a3d] leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
              variants={fadeUp} custom={0.08}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              Compartimos{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0e4a6b]">más que un viaje</span>
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-2.5 bg-[#4ac8e8]/40 -z-0 rounded"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  aria-hidden="true"
                />
              </span>
            </motion.h2>

            <motion.div
              className="flex items-center gap-2"
              variants={fadeUp} custom={0.14}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-8 h-0.5 bg-[#0e4a6b]" />
              <div className="w-3 h-0.5 bg-[#1bb5e0]" />
              <div className="w-1.5 h-0.5 bg-[#4ac8e8]" />
            </motion.div>

            <motion.p
              className="text-[#4a6170] text-sm md:text-base leading-relaxed"
              variants={fadeUp} custom={0.18}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              Somos <strong className="text-[#0e4a6b]">TIVO</strong>, una plataforma de movilidad compartida
              que conecta a personas que desean trasladarse de forma segura, económica y confiable dentro de la ciudad.
            </motion.p>

            <motion.p
              className="text-[#4a6170] text-sm md:text-base leading-relaxed"
              variants={fadeUp} custom={0.24}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              Nuestra propuesta busca optimizar los viajes urbanos, permitiendo que los usuarios compartan
              trayectos con personas previamente verificadas, promoviendo así una experiencia de transporte
              más accesible, segura y humana.
            </motion.p>

            <motion.p
              className="text-[#4a6170] text-sm md:text-base leading-relaxed"
              variants={fadeUp} custom={0.30}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
            >
              En TIVO creemos que la movilidad no solo consiste en llegar a un destino, sino en conectar
              personas y compartir más que un viaje.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}