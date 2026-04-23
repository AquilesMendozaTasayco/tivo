"use client";

import { Leaf, TrafficCone, Users2, Globe } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icono: TrafficCone,
    numero: "-40%",
    titulo: "Menos tráfico",
    descripcion: "Cada viaje compartido reduce autos en las calles y alivia la congestión urbana.",
  },
  {
    icono: Leaf,
    numero: "-2.5t",
    titulo: "Menos CO₂ al año",
    descripcion: "Compartir reduce emisiones y construye una ciudad más limpia para todos.",
  },
  {
    icono: Users2,
    numero: "+1k",
    titulo: "Conexiones reales",
    descripcion: "Personas que ya cambiaron su forma de moverse y conectaron con otros.",
  },
];

export default function Impacto() {
  return (
    <section
      id="impacto"
      className="relative py-20 md:py-28 px-6 lg:px-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
    >

      {/* Orbes decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

      {/* Patrón de líneas onduladas */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="impactoWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
            <path d="M0 110 Q 50 70, 100 110 T 200 110" stroke="#a2dcf0" strokeWidth="1.2" fill="none" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#impactoWaves)" />
      </svg>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase mb-5">
            <Globe className="w-3 h-3" />
            Impacto y comunidad
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            Juntos movemos<br />la ciudad de otra forma
          </h2>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">
            En TIVO creemos en una movilidad más humana, donde las personas son lo más importante. No solo compartes un viaje, construyes comunidad.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => {
            const Icono = s.icono;
            return (
              <motion.div
                key={s.titulo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-[#4ac8e8]/40 hover:bg-white/10 transition-all duration-300 h-full">

                  {/* Ícono */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1bb5e0] to-[#4ac8e8] flex items-center justify-center shadow-lg shadow-[#1bb5e0]/40 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-[#1bb5e0] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                    <Icono className="relative w-7 h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Número grande */}
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2 leading-none" style={{ fontFamily: "Georgia, serif" }}>
                    {s.numero}
                  </p>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-[#7fdcf2] mb-3" style={{ fontFamily: "Georgia, serif" }}>
                    {s.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-white/70 leading-relaxed">
                    {s.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Frase inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-[#7fdcf2] text-lg md:text-xl italic" style={{ fontFamily: "Georgia, serif" }}>
            "No solo compartes un viaje, construyes comunidad."
          </p>
        </motion.div>
      </div>
    </section>
  );
}