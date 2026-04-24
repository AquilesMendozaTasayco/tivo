"use client";

import { Download, UserPlus, ArrowRight, Smartphone, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function UneteATivo() {
  return (
    <section id="registro" className="relative py-20 md:py-28 px-6 lg:px-10 bg-white overflow-hidden">

      {/* Decoración */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0e4a6b]/25"
          style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
        >

          {/* Orbes animados dentro del card */}
          <motion.div
            className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #1bb5e055 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #4ac8e844 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Patrón de líneas onduladas */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="uneteWaves" x="0" y="0" width="180" height="120" patternUnits="userSpaceOnUse">
                <path d="M0 60 Q 45 20, 90 60 T 180 60" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#uneteWaves)" />
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 p-10 md:p-14 lg:p-16 items-center">

            {/* Columna texto */}
            <div className="lg:col-span-3 text-center lg:text-left">

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
                </span>
                Únete a TIVO
              </motion.span>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Empieza a compartir<br />
                <span className="text-[#7fdcf2] italic">más que un viaje</span>
              </h2>

              {/* Descripción */}
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Descarga la app, crea tu perfil y comienza a moverte de una manera más segura, económica y cercana. Tu próximo viaje puede ser diferente.
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0e4a6b] text-sm font-bold rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Descargar app
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/30 hover:border-[#4ac8e8]/60 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <UserPlus className="w-4 h-4" />
                  Crear cuenta
                </a>
              </div>
            </div>

            {/* Columna imagen */}
            <div className="lg:col-span-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Glow detrás */}
                <div className="absolute inset-0 rounded-3xl bg-[#1bb5e0] blur-3xl opacity-40" />

                {/* Imagen */}
                <div className="relative w-60 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src="/img3.jpg"
                    alt="Persona feliz usando la app de TIVO"
                    className="w-full h-full object-cover"
                  />

                  {/* Degradado para integrar con la paleta */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(5,30,46,0.1) 0%, rgba(5,30,46,0.05) 50%, rgba(14,74,107,0.55) 100%)",
                    }}
                  />
                </div>

                {/* Badge flotante: app */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  animate={{ y: [0, -6, 0] }}
                  style={{ animation: undefined }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl shadow-[#051e2e]/40 px-3 py-2.5 flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1bb5e0] to-[#0f8cb8] flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">App TIVO</p>
                    <p className="text-[11px] text-[#4a6170]">Disponible ya</p>
                  </div>
                </motion.div>

                {/* Badge flotante: rating */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl shadow-[#051e2e]/40 px-3 py-2.5 flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#e8f6fb] flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#1bb5e0] fill-[#1bb5e0]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">+1,000</p>
                    <p className="text-[11px] text-[#4a6170]">Viajeros activos</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}