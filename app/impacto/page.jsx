"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import UneteModal from "@/components/UneteModal";
import { useLang } from "@/lang/LanguageContext";
import {
  Globe,
  Leaf,
  TrafficCone,
  Users2,
  Heart,
  Sparkles,
  ArrowRight,
  Car,
  MapPinned,
} from "lucide-react";

// Iconos de los pilares (no se traducen)
const ICONOS_PILARES = [TrafficCone, Leaf, Users2];

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

export default function ImpactoPage() {
  const { t } = useLang();
  const tIP = t.impactoPage;

  const [modalAbierto, setModalAbierto] = useState(false);

  const pilaresRef = useRef(null);
  const pilaresInView = useInView(pilaresRef, { once: true, margin: "-60px" });

  const razonesRef = useRef(null);
  const razonesInView = useInView(razonesRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title={tIP.hero.title}
        breadcrumb={tIP.hero.breadcrumb}
      />

      {/* ── INTRO ───────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <Globe className="w-3 h-3" />
              {tIP.intro.badge}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {tIP.intro.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tIP.intro.tituloSpan}</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              {tIP.intro.descripcion}
            </p>

            <p className="text-[#1bb5e0] text-base md:text-lg italic" style={{ fontFamily: "Georgia, serif" }}>
              {tIP.intro.fraseItalic}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PILARES (fondo oscuro) ──────────────────── */}
      <section
        ref={pilaresRef}
        className="relative py-20 md:py-28 px-6 lg:px-10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
      >

        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="impactoPageWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
              <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
              <path d="M0 110 Q 50 70, 100 110 T 200 110" stroke="#a2dcf0" strokeWidth="1.2" fill="none" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#impactoPageWaves)" />
        </svg>

        <div className="relative max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pilaresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
              </span>
              {tIP.pilares.badge}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {tIP.pilares.titulo}{" "}
              <span className="text-[#7fdcf2] italic">{tIP.pilares.tituloSpan}</span>
            </h2>

            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              {tIP.pilares.subtitulo}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate={pilaresInView ? "visible" : "hidden"}
          >
            {tIP.pilares.items.map((p, i) => {
              const Icono = ICONOS_PILARES[i];
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#4ac8e8]/40 hover:bg-white/10 transition-all duration-300 p-8 flex flex-col gap-5"
                >
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1bb5e0] to-[#4ac8e8] flex items-center justify-center shadow-lg shadow-[#1bb5e0]/30">
                    <Icono className="w-7 h-7 text-white" strokeWidth={1.7} />
                  </div>

                  <span className="text-[10px] font-bold text-[#7fdcf2] uppercase tracking-widest">
                    {p.punto}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {p.titulo}
                  </h3>

                  <div className="w-full h-px bg-gradient-to-r from-[#4ac8e8]/40 via-[#1bb5e0]/20 to-transparent" />

                  <p className="text-sm text-white/75 leading-relaxed flex-1">
                    {p.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={pilaresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-14"
          >
            <p className="text-[#7fdcf2] text-lg md:text-xl italic max-w-2xl mx-auto" style={{ fontFamily: "Georgia, serif" }}>
              &quot;{tIP.pilares.fraseFinal}&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ IMPORTA ──────────────────────────────── */}
      <section ref={razonesRef} className="py-16 lg:py-24 px-6 lg:px-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={razonesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto">

              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#e8f6fb] to-[#cfe7f4] opacity-60 blur-2xl pointer-events-none" />

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0e4a6b]/25 border-4 border-white">
                <img
                  src="/img1.jpg"
                  alt={tIP.razones.imagenAlt}
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,30,46,0.1) 0%, rgba(5,30,46,0.05) 50%, rgba(14,74,107,0.4) 100%)",
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={razonesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-3 py-2.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-[#e8f6fb] flex items-center justify-center">
                  <Car className="w-4 h-4 text-[#1bb5e0]" />
                </div>
                <span className="text-[11px] font-bold text-[#0e2a3d]">{tIP.razones.badges.menosAutos}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={razonesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute top-1/3 -right-5 bg-white rounded-xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-3 py-2.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-[#e8f6fb] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#1bb5e0] fill-[#1bb5e0]" />
                </div>
                <span className="text-[11px] font-bold text-[#0e2a3d]">{tIP.razones.badges.masConexion}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={razonesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-4 left-6 bg-white rounded-xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-3 py-2.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-[#e8f6fb] flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#1bb5e0]" />
                </div>
                <span className="text-[11px] font-bold text-[#0e2a3d]">{tIP.razones.badges.ciudadVerde}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={razonesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="absolute bottom-10 -right-4 bg-white rounded-xl shadow-xl shadow-[#0e4a6b]/15 border border-[#d4eef9] px-3 py-2.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-[#e8f6fb] flex items-center justify-center">
                  <Users2 className="w-4 h-4 text-[#1bb5e0]" />
                </div>
                <span className="text-[11px] font-bold text-[#0e2a3d]">{tIP.razones.badges.comunidad}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={razonesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <Sparkles className="w-3 h-3" />
              {tIP.razones.badge}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-5 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {tIP.razones.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tIP.razones.tituloSpan}</span>
            </h2>

            <p className="text-[#4a6170] text-base leading-relaxed mb-7">
              {tIP.razones.descripcion}
            </p>

            <div className="flex flex-col gap-3">
              {tIP.razones.items.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={razonesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#f5fbfe] border border-[#e8f6fb] hover:border-[#cfe7f4] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold" style={{ fontFamily: "Georgia, serif" }}>
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0e2a3d] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                      {r.titulo}
                    </h4>
                    <p className="text-xs text-[#4a6170] leading-relaxed">
                      {r.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
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
              <Users2 className="w-7 h-7 text-white" strokeWidth={1.6} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {tIP.cta.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tIP.cta.tituloSpan}</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg mb-8 max-w-xl mx-auto">
              {tIP.cta.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setModalAbierto(true)}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                {tIP.cta.botonPrimario}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/reservas"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#cfe7f4] hover:border-[#1bb5e0] text-[#0e4a6b] text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                <MapPinned className="w-4 h-4" />
                {tIP.cta.botonSecundario}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  );
}