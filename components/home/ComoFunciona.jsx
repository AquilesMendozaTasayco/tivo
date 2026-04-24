"use client";

import { MapPinned, UserCheck, Car, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pasos = [
  {
    numero: "01",
    icono: MapPinned,
    titulo: "Encuentra tu ruta",
    descripcion: "Ingresa tu destino y descubre personas que van en la misma dirección que tú.",
  },
  {
    numero: "02",
    icono: UserCheck,
    titulo: "Conecta con usuarios verificados",
    descripcion: "Revisa perfiles, calificaciones y elige con quién quieres compartir tu viaje.",
  },
  {
    numero: "03",
    icono: Car,
    titulo: "Comparte el viaje",
    descripcion: "Viaja acompañado, reduce costos y disfruta cada trayecto en buena compañía.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28 px-6 lg:px-10 bg-[#f5fbfe] overflow-hidden">

      {/* Decoración de fondo */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      {/* Línea decorativa tipo ruta */}
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
            Cómo funciona
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Moverte nunca<br />fue tan simple
          </h2>
          <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
            Así de fácil. Así de humano. Tres pasos para empezar a compartir más que un viaje.
          </p>
        </motion.div>

        {/* Layout 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* Columna izquierda: imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[520px] lg:min-h-0"
          >
            <div className="relative lg:absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-[#0e4a6b]/20 border-4 border-white min-h-[520px] lg:min-h-full">
              <img
                src="/img4.jpg"
                alt="Amigos felices compartiendo un viaje"
                className="w-full h-full object-cover"
              />

              {/* Degradado integrador */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,30,46,0.15) 0%, rgba(5,30,46,0.05) 45%, rgba(14,74,107,0.7) 100%)",
                }}
              />

              {/* Badge flotante arriba */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                Tu próximo viaje
              </div>

              {/* Frase abajo sobre la imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p
                  className="text-white text-lg md:text-xl italic leading-snug"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "Cada trayecto, una nueva historia por compartir."
                </p>
                <div className="mt-3 h-[2px] w-12 bg-[#7fdcf2]" />
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: pasos apilados */}
          <div className="flex flex-col gap-5 relative">

            {/* Línea vertical conectora (desktop) */}
            <div className="hidden lg:block absolute left-[34px] top-14 bottom-14 w-px">
              <svg className="w-2 h-full" preserveAspectRatio="none" viewBox="0 0 2 100">
                <path d="M1 0 L 1 100" stroke="#1bb5e0" strokeWidth="0.6" strokeDasharray="3 3" fill="none" />
              </svg>
            </div>

            {pasos.map((paso, i) => {
              const Icono = paso.icono;
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

                    {/* Ícono */}
                    <div className="relative flex-shrink-0 w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30 z-10">
                      <div className="absolute inset-0 rounded-2xl bg-[#1bb5e0] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                      <Icono className="relative w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0 relative">
                      {/* Número decorativo */}
                      <span
                        className="absolute top-[-8px] right-0 text-5xl font-bold text-[#e8f6fb] select-none leading-none"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {paso.numero}
                      </span>

                      <h3
                        className="text-lg md:text-xl font-bold text-[#0e2a3d] mb-2 leading-tight pr-12"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
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