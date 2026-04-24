"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import UneteModal from "@/components/UneteModal";
import {
  ShieldCheck,
  UserCheck,
  Star,
  Lock,
  Eye,
  Phone,
  FileText,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// ── Features principales de seguridad ────────────────────────
const features = [
  {
    icono: UserCheck,
    titulo: "Usuarios verificados",
    descripcion:
      "Todos los miembros de TIVO pasan por un riguroso proceso de verificación de identidad antes de poder viajar.",
    items: [
      "Validación de documento de identidad",
      "Verificación de número telefónico",
      "Confirmación de correo electrónico",
      "Revisión manual del equipo TIVO",
    ],
  },
  {
    icono: Star,
    titulo: "Sistema de calificaciones",
    descripcion:
      "Revisa perfiles, comentarios y puntuaciones antes de elegir con quién viajar. Construye tu reputación viaje a viaje.",
    items: [
      "Calificación de 1 a 5 estrellas",
      "Comentarios de viajes anteriores",
      "Historial público de cada usuario",
      "Reseñas auténticas y verificadas",
    ],
  },
  {
    icono: Lock,
    titulo: "Protección de datos",
    descripcion:
      "Tu información personal está protegida con estándares de seguridad digital. Nosotros cuidamos lo que confías.",
    items: [
      "Conexiones encriptadas",
      "Datos personales resguardados",
      "Control sobre tu información",
      "Privacidad como prioridad",
    ],
  },
];

// ── Compromisos de TIVO contigo ──────────────────────────────
const compromisos = [
  { texto: "Verificamos a cada usuario antes de habilitar viajes" },
  { texto: "Respondemos a reportes con máxima prioridad" },
  { texto: "Capacitamos al equipo en protocolos de seguridad" },
  { texto: "Revisamos continuamente nuestros procesos de seguridad" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SeguridadPage() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });

  const compromisoRef = useRef(null);
  const compromisoInView = useInView(compromisoRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title="Confianza y seguridad"
        breadcrumb="Seguridad"
      />

      {/* ── SECCIÓN INTRO CON IMAGEN ─────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <ShieldCheck className="w-3 h-3" />
              Ventaja · Confianza y seguridad
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Tu tranquilidad es{" "}
              <span className="text-[#0e4a6b] italic">parte del viaje</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed mb-4">
              Sabemos que compartir un viaje es compartir tu espacio. Por eso, en TIVO todos los
              usuarios pasan por un proceso de verificación antes de poder participar en la plataforma.
            </p>

            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed mb-8">
              Además, puedes revisar calificaciones, comentarios y elegir siempre con quién viajar.
              Nos preocupamos por ti en cada trayecto.
            </p>

            <Link
              href="/como-funciona"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
              Conoce cómo funciona
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Imagen emotiva */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">

              {/* Resplandor decorativo detrás */}
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#e8f6fb] to-[#cfe7f4] opacity-60 blur-2xl pointer-events-none" />

              {/* Imagen */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0e4a6b]/25 border-4 border-white">
                <img
                  src="/img5.jpg"
                  alt="Persona viajando con tranquilidad"
                  className="w-full h-full object-cover"
                />

                {/* Degradado sutil para integrar con la paleta */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,30,46,0.1) 0%, rgba(5,30,46,0.05) 50%, rgba(14,74,107,0.35) 100%)",
                  }}
                />
              </div>

              {/* Badge flotante: Verificado */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-6 -left-6 bg-white rounded-2xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e8f6fb] flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#1bb5e0]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">Verificado</p>
                  <p className="text-[11px] text-[#4a6170]">Perfil aprobado</p>
                </div>
              </motion.div>

              {/* Badge flotante: Calificación */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-6 -right-6 bg-white rounded-2xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e8f6fb] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#1bb5e0] fill-[#1bb5e0]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">Calificación</p>
                  <p className="text-[11px] text-[#4a6170]">Reseñas reales</p>
                </div>
              </motion.div>

              {/* Badge flotante: Protegido */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-2xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e8f6fb] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#1bb5e0]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b]">Protegido</p>
                  <p className="text-[11px] text-[#4a6170]">Datos seguros</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES DETALLADAS ──────────────────────────────── */}
      <section ref={featuresRef} className="py-16 lg:py-20 px-6 lg:px-10 bg-[#f5fbfe] relative overflow-hidden">

        <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              Cómo te protegemos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Tres pilares de{" "}
              <span className="text-[#0e4a6b] italic">confianza</span>
            </h2>
            <p className="text-[#4a6170] text-base md:text-lg">
              Cada medida está pensada para que viajes con la tranquilidad que mereces.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((f, i) => {
              const Icono = f.icono;
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  className="group relative bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-xl hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-7 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20 group-hover:scale-105 transition-transform duration-300">
                    <Icono className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0e2a3d] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {f.titulo}
                  </h3>

                  <p className="text-sm text-[#4a6170] leading-relaxed">
                    {f.descripcion}
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-[#cfe7f4] via-[#e8f6fb] to-transparent" />

                  <ul className="flex flex-col gap-2">
                    {f.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#4a6170]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── NUESTRO COMPROMISO ──────────────────────────────── */}
      <section ref={compromisoRef} className="py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-5xl mx-auto">

          <motion.div
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/5"
            initial={{ opacity: 0, y: 30 }}
            animate={compromisoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Decoración */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
                  <Eye className="w-3 h-3" />
                  Nuestro compromiso
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-[#0e2a3d] mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  Contigo en cada viaje
                </h2>

                <p className="text-[#4a6170] text-sm md:text-base leading-relaxed">
                  La seguridad no es una función más: es el corazón de TIVO. Estos son los compromisos
                  que asumimos con cada persona que confía en nuestra plataforma.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {compromisos.map((c, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={compromisoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#f5fbfe] border border-[#e8f4fa]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#0e2a3d] font-medium">{c.texto}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-[#f5fbfe]">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1bb5e0]/20">
              <ShieldCheck className="w-7 h-7 text-white" strokeWidth={1.6} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Viaja con{" "}
              <span className="text-[#0e4a6b] italic">tranquilidad</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg mb-8 max-w-xl mx-auto">
              Súmate a la comunidad de personas que ya están moviéndose de forma más segura por Lima.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setModalAbierto(true)}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                Únete a TIVO
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/contactanos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#cfe7f4] hover:border-[#1bb5e0] text-[#0e4a6b] text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  );
}