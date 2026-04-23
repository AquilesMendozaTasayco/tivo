"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import {
  Car,
  FileCheck,
  ShieldCheck,
  MapPin,
  Gauge,
  Ban,
  User,
  ChevronRight,
  BadgeCheck,
  Banknote,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */
const vehiculoReqs = [
  {
    id: "anio",
    label: "Año Mínimo",
    icon: <CalendarCheck size={20} />,
    items: ["Desde 2015 en adelante"],
    nota: "Se evalúan excepciones si el auto está en excelente estado",
  },
  {
    id: "tipo",
    label: "Tipo de Vehículo",
    icon: <Car size={20} />,
    items: ["Sedán", "Hatchback", "SUV", "Pick-up"],
    nota: "No motos · No camiones",
  },
  {
    id: "estado",
    label: "Estado General",
    icon: <BadgeCheck size={20} />,
    items: [
      "Buen estado mecánico",
      "Sin fallas graves",
      "Interior limpio",
      "Pintura aceptable",
      "Sin choques estructurales",
    ],
  },
  {
    id: "docs",
    label: "Documentación al Día",
    icon: <FileCheck size={20} />,
    items: [
      "Tarjeta de propiedad",
      "SOAT vigente",
      "Revisión técnica vigente",
      "Sin papeletas graves",
    ],
  },
  {
    id: "km",
    label: "Kilometraje",
    icon: <Gauge size={20} />,
    items: ["Menor a 180,000 km"],
    nota: "Flexible según estado real del vehículo",
  },
  {
    id: "uso",
    label: "Uso Permitido",
    icon: <Ban size={20} />,
    items: ["Uso particular", "No taxis", "No colectivos", "No transporte público"],
  },
];

const propietarioReqs = [
  "Ser el dueño legal del vehículo",
  "DNI vigente",
  "Cuenta bancaria a su nombre",
  "Disponibilidad para entregar y recibir el vehículo",
  "Disposición para firmar contrato con CamanX",
];

const seguridad = [
  "Validación estricta de clientes",
  "Contrato de alquiler firmado",
  "Garantía económica por alquiler",
  "Revisión del vehículo antes y después",
  "GPS no obligatorio",
];

const ganancias = [
  { pct: "70%", desc: "para el dueño del auto" },
  { pct: "30%", desc: "para CamanX" },
];

const beneficios = [
  "Pagos quincenales o mensuales",
  "Sin costos ocultos",
  "Sin exclusividad forzada",
];

/* ─── HELPERS ───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ─── PAGE ───────────────────────────────────────────────── */
export default function AlquilerConNosotros() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
        title="Alquila con Nosotros"
        breadcrumb="Propietarios · Partners"
      />

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="bg-[#fcfcfc] py-24 relative overflow-hidden">
        {/* Decoración fondo */}
        <div className="pointer-events-none select-none absolute top-0 left-0 w-full h-full opacity-[0.018]">
          <span className="text-[18vw] font-black absolute -right-10 top-10 text-slate-900">EARN</span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#1e3a8a]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1e3a8a]">
              Propietarios
            </span>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
            <motion.div {...fadeUp(0.1)}>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-7xl leading-[0.85]">
                Tu auto<br />
                <span className="text-[#1e3a8a]">genera</span><br />
                ingresos
              </h2>
              <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-slate-500">
                Únete a la red de propietarios CamanX y convierte tu vehículo en una fuente de ingresos pasivos. Tú pones el auto, nosotros gestionamos todo.
              </p>
              <Link
                href="#requisitos"
                className="mt-10 inline-flex items-center gap-3 bg-[#1e3a8a] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-slate-900 hover:shadow-xl"
              >
                Ver Requisitos <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* GANANCIAS DESTACADO */}
<motion.div {...fadeUp(0.2)} className="bg-slate-900 p-10 shadow-2xl">
  <p className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
    ¿Por qué elegirnos?
  </p>

  <div className="bg-slate-800 p-10 border border-white/5">
    <h3 className="text-3xl font-black text-white uppercase tracking-wide">
      Somos tu mejor opción
    </h3>

    <p className="mt-4 text-sm text-slate-400 leading-relaxed">
      En <span className="font-bold text-white">CamanX</span>, ofrecemos alquiler de vehículos de gama media en Lima para uso particular y corporativo. 
      Garantizamos seguridad, comodidad y confianza en cada trayecto con una flota moderna en excelente estado.
    </p>

    <div className="mt-8">
      <a
        href="/contacto"
        className="inline-block bg-[#1e3a8a] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-700"
      >
        Envíanos un mensaje
      </a>
    </div>
  </div>
</motion.div>

          </div>
        </div>
      </section>

      {/* ── REQUISITOS DEL VEHÍCULO ──────────────────────── */}
      <section id="requisitos" className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#1e3a8a]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1e3a8a]">
                Vehículo
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 md:text-5xl leading-[0.9]">
              Requisitos del <span className="text-[#1e3a8a]">Vehículo</span>
            </h2>
          </motion.div>

          <div className="grid gap-px bg-slate-100 border border-slate-100 shadow-xl sm:grid-cols-2 lg:grid-cols-3">
            {vehiculoReqs.map((req, index) => (
              <motion.div
                key={req.id}
                {...fadeUp(index * 0.07)}
                className="group bg-white p-8 transition-all duration-500 hover:bg-slate-900"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#1e3a8a]/10 text-[#1e3a8a] transition-all group-hover:bg-[#1e3a8a] group-hover:text-white">
                    {req.icon}
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition-colors group-hover:text-white">
                    {req.label}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight size={12} className="mt-0.5 shrink-0 text-[#1e3a8a] transition-colors group-hover:text-blue-400" />
                      <span className="text-xs font-medium leading-relaxed text-slate-600 transition-colors group-hover:text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {req.nota && (
                  <p className="mt-4 border-t border-slate-100 pt-4 text-[9px] font-bold uppercase tracking-widest text-slate-400 italic transition-colors group-hover:border-white/10 group-hover:text-slate-500">
                    {req.nota}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOS COLUMNAS: PROPIETARIO + SEGURIDAD ────────── */}
      <section className="bg-[#fcfcfc] py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* PROPIETARIO */}
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center bg-[#1e3a8a] text-white">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Documentación</p>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                    Requisitos del <span className="text-[#1e3a8a]">Propietario</span>
                  </h3>
                </div>
              </div>
              <div className="border border-slate-100 bg-white shadow-lg">
                {propietarioReqs.map((req, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-8 py-5 transition-colors hover:bg-blue-50 ${i < propietarioReqs.length - 1 ? "border-b border-slate-50" : ""}`}
                  >
                    <div className="h-2 w-2 shrink-0 bg-[#1e3a8a]" />
                    <p className="text-sm font-medium text-slate-700">{req}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SEGURIDAD */}
            <motion.div {...fadeUp(0.1)}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center bg-slate-900 text-white">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Proceso</p>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                    Seguridad y <span className="text-[#1e3a8a]">Operación</span>
                  </h3>
                </div>
              </div>
              <div className="border border-slate-100 bg-white shadow-lg">
                {seguridad.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-8 py-5 transition-colors hover:bg-blue-50 ${i < seguridad.length - 1 ? "border-b border-slate-50" : ""}`}
                  >
                    <div className="h-2 w-2 shrink-0 bg-slate-900" />
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ZONA DE OPERACIÓN ────────────────────────────── */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/30">
              <MapPin size={28} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1e3a8a]">
              Cobertura Actual
            </p>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-7xl leading-[0.85]">
              Lima<br />
              <span className="text-[#1e3a8a]">Metropolitana</span>
            </h2>
            <p className="max-w-lg text-sm font-medium leading-relaxed text-slate-500">
              Operamos en aeropuertos, hoteles, empresas y clientes particulares dentro de Lima Metropolitana.
            </p>
            {/* TAGS */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {["Aeropuerto Jorge Chávez", "Hoteles Premium", "Empresas Corporativas", "Clientes Particulares"].map((tag, i) => (
                <span key={i} className="border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
              ¿Listo para empezar?
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl leading-[0.85]">
              Une tu vehículo<br />
              a la <span className="text-[#3b82f6]">red CamanX</span>
            </h2>
            <p className="max-w-md text-sm font-medium text-slate-400 leading-relaxed">
              Completa el formulario de postulación y un asesor se comunicará contigo en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 bg-[#1e3a8a] px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-600 hover:shadow-xl"
              >
                Postular mi Vehículo <ArrowRight size={14} />
              </Link>
              <Link
                href="/flota"
                className="inline-flex items-center gap-3 border border-white/10 bg-white/5 px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                Ver Flota Activa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}