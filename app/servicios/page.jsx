"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import UneteModal from "@/components/UneteModal";
import { useLang } from "@/lang/LanguageContext";
import {
  Users,
  Repeat,
  Car,
  ShieldCheck,
  Star,
  Wallet,
  MapPin,
  Smartphone,
  Users2,
  Leaf,
  Heart,
  Sparkles,
  Check,
  ArrowRight,
  Compass,
} from "lucide-react";

// Map de íconos para resolver desde las traducciones
const ICONOS = {
  Users,
  Repeat,
  Car,
  ShieldCheck,
  Star,
  Wallet,
  MapPin,
  Smartphone,
  Users2,
  Leaf,
  Heart,
  Sparkles,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServiciosPage() {
  const { t } = useLang();
  const tSP = t.serviciosPage;

  const [modalAbierto, setModalAbierto] = useState(false);

  const serviciosRef = useRef(null);
  const serviciosInView = useInView(serviciosRef, { once: true, margin: "-60px" });

  const porQueRef = useRef(null);
  const porQueInView = useInView(porQueRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────── */}
<PageHero
  image="https://images.unsplash.com/photo-1535402181265-ea59cf18cb3e?w=1920&q=85&auto=format&fit=crop"
  title={tSP.hero.title}
  breadcrumb={tSP.hero.breadcrumb}
/>

      {/* ── INTRO ─────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <Compass className="w-3 h-3" />
              {tSP.intro.badge}
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tSP.intro.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tSP.intro.tituloSpan}</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              {tSP.intro.descripcion}
            </p>

            <p
              className="text-[#1bb5e0] text-base md:text-lg italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tSP.intro.fraseItalic}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS (3 cards) ─────────────────────────── */}
      <section ref={serviciosRef} className="py-16 lg:py-24 px-6 lg:px-10 bg-[#f5fbfe]">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={serviciosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <Sparkles className="w-3 h-3" />
              {tSP.servicios.badge}
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-4 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tSP.servicios.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tSP.servicios.tituloSpan}</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate={serviciosInView ? "visible" : "hidden"}
          >
            {tSP.servicios.items.map((s, i) => {
              const Icono = ICONOS[s.icono] || Users;
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  className="group relative bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-2xl hover:shadow-[#0e4a6b]/10 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Cabecera oscura con ícono */}
                  <div
                    className="relative px-7 py-10 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)",
                    }}
                  >
                    {/* Ondas decorativas */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <pattern
                          id={`waves-${i}`}
                          x="0"
                          y="0"
                          width="180"
                          height="120"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0 60 Q 45 25, 90 60 T 180 60"
                            stroke="#a2dcf0"
                            strokeWidth="1.2"
                            fill="none"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#waves-${i})`} />
                    </svg>

                    <div className="relative inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1bb5e0] to-[#4ac8e8] items-center justify-center shadow-lg shadow-[#1bb5e0]/40 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icono className="w-10 h-10 text-white" strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* Cuerpo */}
                  <div className="p-7 flex flex-col gap-5 flex-1">
                    <h3
                      className="text-xl md:text-2xl font-bold text-[#0e2a3d] leading-tight text-center"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {s.titulo}
                    </h3>

                    <p className="text-sm text-[#4a6170] leading-relaxed text-center">
                      {s.descripcion}
                    </p>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#cfe7f4] to-transparent" />

                    <ul className="flex flex-col gap-2.5">
                      {s.beneficios.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0e2a3d]">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f6fb] flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[#1bb5e0]" strokeWidth={3} />
                          </span>
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setModalAbierto(true)}
                      className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-bold rounded-full transition-all duration-200 group/btn"
                    >
                      {s.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── ¿POR QUÉ TIVO? (grid de features estilo QuickLlama) ───────── */}
      <section
        ref={porQueRef}
        className="relative py-20 md:py-28 px-6 lg:px-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)",
        }}
      >
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="serviciosWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
              <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1.2" fill="none" />
              <path d="M0 110 Q 50 70, 100 110 T 200 110" stroke="#a2dcf0" strokeWidth="1.2" fill="none" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#serviciosWaves)" />
        </svg>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={porQueInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
              </span>
              {tSP.porQue.badge}
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tSP.porQue.titulo}{" "}
              <span className="text-[#7fdcf2] italic">{tSP.porQue.tituloSpan}</span>
            </h2>

            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              {tSP.porQue.subtitulo}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
            variants={stagger}
            initial="hidden"
            animate={porQueInView ? "visible" : "hidden"}
          >
            {tSP.porQue.items.map((f, i) => {
              const Icono = ICONOS[f.icono] || Sparkles;
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#4ac8e8]/40 hover:bg-white/10 transition-all duration-300 p-5 md:p-6 text-center flex flex-col items-center gap-3"
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#1bb5e0] to-[#4ac8e8] flex items-center justify-center shadow-lg shadow-[#1bb5e0]/30 group-hover:scale-110 transition-transform duration-300">
                    <Icono className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.6} />
                  </div>

                  <h3
                    className="text-sm md:text-base font-bold text-white leading-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {f.titulo}
                  </h3>

                  <p className="text-xs md:text-[13px] text-white/70 leading-relaxed">
                    {f.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────── */}
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

            <h2
              className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-4 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tSP.cta.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tSP.cta.tituloSpan}</span>
            </h2>

            <p className="text-[#4a6170] text-base md:text-lg mb-8 max-w-xl mx-auto">
              {tSP.cta.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setModalAbierto(true)}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                {tSP.cta.botonPrimario}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/como-funciona"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#cfe7f4] hover:border-[#1bb5e0] text-[#0e4a6b] text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                {tSP.cta.botonSecundario}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  );
}