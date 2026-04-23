"use client";

import { MapPinned, UserCheck, Car } from "lucide-react";
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
          className="text-center max-w-2xl mx-auto mb-16"
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

        {/* Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">

          {/* Línea conectora (solo desktop) */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-px">
            <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#1bb5e0" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
            </svg>
          </div>

          {pasos.map((paso, i) => {
            const Icono = paso.icono;
            return (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl p-7 border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/5 hover:shadow-xl hover:shadow-[#1bb5e0]/15 hover:-translate-y-1 transition-all duration-300 h-full">

                  {/* Número grande */}
                  <span
                    className="absolute top-4 right-5 text-5xl font-bold text-[#e8f6fb] select-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {paso.numero}
                  </span>

                  {/* Ícono */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-[#1bb5e0] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                    <Icono className="relative w-7 h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Texto */}
                  <h3 className="text-xl font-bold text-[#0e2a3d] mb-3 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-[#4a6170] leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}