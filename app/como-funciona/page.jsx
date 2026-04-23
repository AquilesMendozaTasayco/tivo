"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import UneteModal from "@/components/UneteModal";
import {
  MapPinned,
  UserCheck,
  Car,
  Search,
  ShieldCheck,
  Star,
  CreditCard,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ── Los 3 pasos principales (del documento oficial de TIVO) ──────────────
const pasos = [
  {
    numero: "01",
    icono: MapPinned,
    titulo: "Encuentra tu ruta",
    descripcion:
      "Ingresa a la app tu destino y descubre personas que van en la misma dirección que tú. Nuestra plataforma conecta usuarios con trayectos similares.",
    detalles: [
      "Ingresa tu punto de partida",
      "Indica tu destino final",
      "Selecciona el horario que prefieras",
      "Revisa las opciones disponibles",
    ],
  },
  {
    numero: "02",
    icono: UserCheck,
    titulo: "Conecta con usuarios verificados",
    descripcion:
      "Revisa perfiles, calificaciones y comentarios antes de elegir con quién compartir tu viaje. Todos los miembros pasan por verificación.",
    detalles: [
      "Perfiles verificados por el equipo TIVO",
      "Calificaciones y reseñas reales",
      "Historial de viajes disponible",
      "Elige con quién te sientas cómodo",
    ],
  },
  {
    numero: "03",
    icono: Car,
    titulo: "Comparte el viaje",
    descripcion:
      "Viaja acompañado, reduce costos y disfruta cada trayecto en buena compañía. Así de fácil, así de humano.",
    detalles: [
      "Reduce el costo del transporte",
      "Viaja acompañado con seguridad",
      "Califica tu experiencia al finalizar",
      "Construye una comunidad confiable",
    ],
  },
];

// ── Beneficios adicionales ──────────────────────────────────────────────
const beneficios = [
  {
    icono: ShieldCheck,
    titulo: "Seguridad garantizada",
    descripcion: "Todos los usuarios pasan por un proceso de verificación de identidad.",
  },
  {
    icono: Star,
    titulo: "Sistema de calificaciones",
    descripcion: "Construye tu reputación y elige con quién viajar según reseñas reales.",
  },
  {
    icono: CreditCard,
    titulo: "Ahorro en cada viaje",
    descripcion: "Compartir trayectos significa dividir costos y moverte de forma más económica.",
  },
  {
    icono: Smartphone,
    titulo: "Fácil desde tu móvil",
    descripcion: "Todo el proceso desde la app: buscar, conectar, calificar y volver a viajar.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ComoFuncionaPage() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const beneficiosRef = useRef(null);
  const beneficiosInView = useInView(beneficiosRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title="Cómo funciona TIVO"
        breadcrumb="Cómo funciona"
      />

      {/* ── SECCIÓN INTRO ──────────────────────────────────────────────── */}
      <section ref={headerRef} className="py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              Proceso simple en 3 pasos
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Moverte nunca{" "}
              <span className="text-[#0e4a6b] italic">fue tan simple</span>
            </h2>
            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
              Descubre lo fácil que es compartir un viaje con TIVO. Tres pasos para empezar a
              conectar con personas y transformar tu experiencia de movilidad urbana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PASOS DETALLADOS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-[#f5fbfe] relative overflow-hidden">

        {/* Decoración */}
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

        {/* Líneas onduladas decorativas */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="comoFuncionaPageWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
              <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#1bb5e0" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#comoFuncionaPageWaves)" />
        </svg>

        <div className="relative max-w-6xl mx-auto flex flex-col gap-8">
          {pasos.map((paso, i) => {
            const Icono = paso.icono;
            const esPar = i % 2 === 1;

            return (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${esPar ? "lg:grid-flow-dense" : ""}`}
              >
                {/* COLUMNA IZQUIERDA: texto */}
                <div className={esPar ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div
                      className="text-5xl md:text-6xl font-bold text-[#1bb5e0]/25 leading-none"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {paso.numero}
                    </div>
                    <div className="w-12 h-px bg-[#1bb5e0]" />
                    <span className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                      Paso {paso.numero}
                    </span>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold text-[#0e2a3d] mb-4 leading-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {paso.titulo}
                  </h3>

                  <p className="text-[#4a6170] text-base leading-relaxed mb-6">
                    {paso.descripcion}
                  </p>

                  {/* Lista de detalles */}
                  <ul className="flex flex-col gap-2.5">
                    {paso.detalles.map((detalle, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#4a6170]">{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COLUMNA DERECHA: card visual con ícono */}
                <div className={esPar ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="relative bg-white rounded-3xl border border-[#d4eef9] shadow-xl shadow-[#0e4a6b]/8 p-10 md:p-14 overflow-hidden">

                    {/* Número grande de fondo */}
                    <span
                      className="absolute top-2 right-4 text-[120px] font-bold text-[#e8f6fb] select-none leading-none pointer-events-none"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {paso.numero}
                    </span>

                    {/* Ícono central */}
                    <div className="relative flex items-center justify-center">
                      <div className="relative">
                        {/* Anillo decorativo */}
                        <div className="absolute -inset-6 rounded-full border-2 border-dashed border-[#cfe7f4] opacity-60" />
                        <div className="absolute -inset-12 rounded-full border border-[#e8f6fb] opacity-40" />

                        {/* Círculo con ícono */}
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-xl shadow-[#1bb5e0]/25">
                          <Icono className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── BENEFICIOS ADICIONALES ────────────────────────────────────── */}
      <section ref={beneficiosRef} className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={beneficiosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              Beneficios clave
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-4"
              style={{ fontFamily: "Georgia, serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={beneficiosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Más que una app{" "}
              <span className="text-[#0e4a6b] italic">de movilidad</span>
            </motion.h2>

            <motion.p
              className="text-[#4a6170] text-base md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={beneficiosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Todo lo que TIVO pone a tu disposición para que cada viaje sea mejor.
            </motion.p>
          </div>

          {/* Grid de beneficios */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {beneficios.map((b, i) => {
              const Icono = b.icono;
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  className="group bg-[#f5fbfe] rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:bg-white hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-6 flex flex-col gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20 group-hover:scale-105 transition-transform duration-300">
                    <Icono className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <h4
                    className="text-base font-bold text-[#0e2a3d]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {b.titulo}
                  </h4>
                  <p className="text-xs text-[#4a6170] leading-relaxed">
                    {b.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-[#f5fbfe]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#0e4a6b]/15 p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
          >
            {/* Decoración */}
            <div className="absolute top-[-30%] right-[-15%] w-80 h-80 rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-15%] w-64 h-64 rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
                </span>
                ¿Listo para empezar?
              </span>

              <h2
                className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Empieza a compartir{" "}
                <span className="text-[#7fdcf2] italic">más que un viaje</span>
              </h2>

              <p className="text-white/75 text-base md:text-lg max-w-xl">
                Crea tu perfil y comienza a moverte de una manera más segura, económica y cercana.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <button
                  onClick={() => setModalAbierto(true)}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0e4a6b] text-sm font-bold rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Únete a TIVO
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  href="/reservas"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/30 hover:border-[#4ac8e8]/60 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4" />
                  Buscar un viaje
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Únete a TIVO */}
      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  );
}