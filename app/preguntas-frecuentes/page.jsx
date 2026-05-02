"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { useLang } from "@/lang/LanguageContext";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Users,
  Shield,
  CreditCard,
  MapPin,
  Smartphone,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

// Iconos NO traducibles, mismo orden que las categorías
const ICONOS_CATEGORIAS = [HelpCircle, Users, MapPin, Shield, CreditCard, Smartphone];

export default function PreguntasFrecuentesPage() {
  const { t } = useLang();
  const tPF = t.preguntasFrecuentes;

  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [abierta, setAbierta] = useState(null);

  const preguntasFiltradas = tPF.preguntas.filter((p) => {
    const matchCategoria = categoriaActiva === "todas" || p.categoria === categoriaActiva;
    const matchBusqueda =
      busqueda === "" ||
      p.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <div className="bg-white">

      <PageHero
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=85&auto=format&fit=crop"
        title={tPF.hero.title}
        breadcrumb={tPF.hero.breadcrumb}
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
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
              <HelpCircle className="w-3 h-3" />
              {tPF.header.badge}
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0e2a3d] mb-3 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tPF.header.titulo}
            </h2>
            <p className="text-sm md:text-base text-[#4a6170] max-w-xl mx-auto">
              {tPF.header.descripcion}
            </p>
          </motion.div>

          {/* Buscador */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8fb0c0]" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder={tPF.buscadorPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tPF.categorias.map((cat, i) => {
              const Icono = ICONOS_CATEGORIAS[i];
              const activa = categoriaActiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activa
                      ? "bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] text-white shadow-md shadow-[#1bb5e0]/25"
                      : "bg-white border border-[#d4eef9] text-[#4a6170] hover:border-[#1bb5e0] hover:text-[#0e4a6b]"
                  }`}
                >
                  <Icono className="w-3.5 h-3.5" />
                  {cat.nombre}
                </button>
              );
            })}
          </div>

          {/* Resultados */}
          {preguntasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-10 h-10 text-[#cfe7f4] mx-auto mb-3" />
              <p className="text-sm text-[#8fb0c0]">{tPF.sinResultados}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {preguntasFiltradas.map((p, i) => {
                const idx = `${p.categoria}-${i}`;
                const estaAbierta = abierta === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      estaAbierta ? "border-[#1bb5e0] shadow-lg shadow-[#1bb5e0]/10" : "border-[#d4eef9]"
                    }`}
                  >
                    <button
                      onClick={() => setAbierta(estaAbierta ? null : idx)}
                      className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-[#f5fbfe] transition-colors"
                    >
                      <span className="text-sm md:text-base font-bold text-[#0e2a3d] flex-1" style={{ fontFamily: "Georgia, serif" }}>
                        {p.pregunta}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#1bb5e0] flex-shrink-0 transition-transform duration-300 ${
                          estaAbierta ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {estaAbierta && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-5 pb-5 pt-1 text-sm text-[#4a6170] leading-relaxed border-t border-[#e8f4fa]">
                            <p className="pt-4">{p.respuesta}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bloque de ayuda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 rounded-3xl overflow-hidden shadow-xl shadow-[#0e4a6b]/15"
            style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}
          >
            <div className="p-8 md:p-10 text-white text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mb-4">
                <MessageCircle className="w-5 h-5 text-[#7fdcf2]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {tPF.ayuda.titulo}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
                {tPF.ayuda.descripcion}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/51900241682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-full shadow-lg shadow-[#25d366]/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  {tPF.ayuda.botonWhatsapp}
                </a>
                <a
                  href="mailto:contacto@tivo.pe"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                  {tPF.ayuda.botonEmail}
                </a>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-[#e8f4fa] flex flex-wrap gap-3">
            <Link
              href="/terminos-y-condiciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPF.enlaces.terminos}
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/politica-de-privacidad"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPF.enlaces.privacidad}
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/libro-de-reclamaciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tPF.enlaces.libro}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}