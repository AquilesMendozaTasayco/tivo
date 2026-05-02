"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { useLang } from "@/lang/LanguageContext";
import {
  ShieldCheck,
  Database,
  Lock,
  UserCheck,
  AlertCircle,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

// Iconos NO traducibles (mismo orden que los principios)
const ICONOS_PRINCIPIOS = [Database, Lock, UserCheck];

export default function PoliticaPrivacidadPage() {
  const { t } = useLang();
  const tPP = t.politicaPrivacidad;

  return (
    <div className="bg-white">

      <PageHero
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=85&auto=format&fit=crop"
        title={tPP.hero.title}
        breadcrumb={tPP.hero.breadcrumb}
      />

      <section className="py-16 lg:py-20 px-6 lg:px-10 relative overflow-hidden">

        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
              <ShieldCheck className="w-3 h-3" />
              {tPP.header.badge}
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0e2a3d] mb-3 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tPP.header.titulo}
            </h2>
            <p className="text-sm text-[#4a6170]">
              {tPP.header.ultimaActualizacion}{" "}
              {new Date().toLocaleDateString(tPP.locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </motion.div>

          {/* Principios visuales */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
            {tPP.principios.map((p, i) => {
              const Icono = ICONOS_PRINCIPIOS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#f5fbfe] border border-[#d4eef9] rounded-2xl p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center mb-3 shadow-md shadow-[#1bb5e0]/20">
                    <Icono className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-sm font-bold text-[#0e2a3d] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    {p.titulo}
                  </h4>
                  <p className="text-xs text-[#4a6170] leading-relaxed">
                    {p.texto}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col gap-8">
            {tPP.secciones.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="scroll-mt-24"
              >
                <h3
                  className="text-lg md:text-xl font-bold text-[#0e2a3d] mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.titulo}
                </h3>
                <div className="flex flex-col gap-3 text-sm md:text-base text-[#4a6170] leading-relaxed">
                  {s.contenido.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                {s.lista && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {s.lista.map((it, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm md:text-base text-[#4a6170] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1bb5e0] flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.contenidoExtra && (
                  <div className="mt-3 flex flex-col gap-3 text-sm md:text-base text-[#4a6170] leading-relaxed">
                    {s.contenidoExtra.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}

                {s.nota && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-[#8fb0c0] italic">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{s.nota}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 rounded-3xl overflow-hidden shadow-xl shadow-[#0e4a6b]/15"
            style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}
          >
            <div className="p-8 md:p-10 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {tPP.contacto.titulo}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xl">
                {tPP.contacto.descripcion}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:contacto@tivo.pe?subject=${encodeURIComponent(tPP.contacto.asuntoEmail)}`}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0e4a6b] text-sm font-bold rounded-full hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  contacto@tivo.pe
                </a>
                <a
                  href="https://wa.me/51900241682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  +51 900 241 682
                </a>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-[#e8f4fa] flex flex-wrap gap-3">
            <Link
              href="/terminos-y-condiciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPP.enlaces.terminos}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/libro-de-reclamaciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPP.enlaces.libro}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPP.enlaces.faq}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}