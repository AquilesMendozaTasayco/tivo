"use client";

import { ShieldCheck, UserCheck, Star, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icono: UserCheck,
    titulo: "Usuarios verificados",
    descripcion: "Todos los miembros de TIVO pasan por un riguroso proceso de verificación de identidad.",
  },
  {
    icono: Star,
    titulo: "Sistema de calificaciones",
    descripcion: "Revisa perfiles, comentarios y puntuaciones antes de elegir con quién viajar.",
  },
  {
    icono: Lock,
    titulo: "Datos protegidos",
    descripcion: "Tu información personal está encriptada y protegida bajo los más altos estándares.",
  },
];

export default function Seguridad() {
  return (
    <section id="seguridad" className="relative py-20 md:py-28 px-6 lg:px-10 bg-white overflow-hidden">

      {/* Decoración lateral */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Columna izquierda: texto y features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5fbfe] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <ShieldCheck className="w-3 h-3" />
              Confianza y seguridad
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Tu tranquilidad es parte del viaje
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed mb-8">
              Sabemos que compartir un viaje es compartir tu espacio. Por eso, en TIVO todos los usuarios pasan por un proceso de verificación. Nos preocupamos por ti en cada trayecto.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4">
              {features.map((f, i) => {
                const Icono = f.icono;
                return (
                  <motion.div
                    key={f.titulo}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[#e8f6fb] hover:border-[#cfe7f4] hover:bg-[#f5fbfe] transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                      <Icono className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0e2a3d] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                        {f.titulo}
                      </h4>
                      <p className="text-xs text-[#4a6170] leading-relaxed">
                        {f.descripcion}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Columna derecha: ilustración visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">

              {/* Círculo decorativo grande */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0e4a6b] via-[#0f6998] to-[#1bb5e0] shadow-2xl shadow-[#1bb5e0]/30" />

              {/* Anillos decorativos */}
              <div className="absolute -inset-4 rounded-full border-2 border-[#cfe7f4] opacity-60" />
              <div className="absolute -inset-10 rounded-full border border-[#d4eef9] opacity-40" />

              {/* Ícono central escudo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl" />
                  <ShieldCheck className="relative w-32 h-32 text-white" strokeWidth={1.3} />
                </motion.div>
              </div>

              {/* Badges flotantes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-8 -left-4 bg-white rounded-2xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e8f6fb] flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#1bb5e0]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">Verificado</p>
                  <p className="text-[11px] text-[#4a6170]">Perfil aprobado</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-8 -right-4 bg-white rounded-2xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e8f6fb] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#1bb5e0] fill-[#1bb5e0]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">4.9 / 5.0</p>
                  <p className="text-[11px] text-[#4a6170]">Calificación</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}