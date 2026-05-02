"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/PageHero";
import { useLang } from "@/lang/LanguageContext";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  User,
  Phone,
  FileText,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

const WHATSAPP_NUMERO = "51900241682";

const FORM_INICIAL = {
  nombre: "",
  telefono: "",
  origen: "",
  destino: "",
  fecha: "",
  hora: "",
  pasajeros: "1",
  notas: "",
};

// Iconos de los beneficios y los pasos del proceso (no se traducen)
const ICONOS_BENEFICIOS = [Zap, Shield, Heart];
const ICONOS_PROCESO = [FileText, MessageCircle, CheckCircle2];

export default function ReservasPage() {
  const { t } = useLang();
  const tRP = t.reservasPage;

  const [form, setForm] = useState(FORM_INICIAL);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Construye el mensaje de WhatsApp con los textos del idioma actual
  const construirMensaje = () => {
    const w = tRP.whatsapp;
    const lineas = [
      w.saludo,
      "",
      `*${w.nombreLabel}* ${form.nombre || "—"}`,
      `*${w.telefonoLabel}* ${form.telefono || "—"}`,
      "",
      `*${w.detallesViaje}*`,
      `• *${w.desdeLabel}* ${form.origen || "—"}`,
      `• *${w.haciaLabel}* ${form.destino || "—"}`,
      `• *${w.fechaLabel}* ${form.fecha || "—"}`,
      `• *${w.horaLabel}* ${form.hora || "—"}`,
      `• *${w.pasajerosLabel}* ${form.pasajeros}`,
    ];

    if (form.notas.trim()) {
      lineas.push("", `*${w.notasLabel}*`, form.notas);
    }

    lineas.push("", w.despedida);
    return encodeURIComponent(lineas.join("\n"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = construirMensaje();
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const whatsappDirecto = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(tRP.whatsapp.saludoDirecto)}`;

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title={tRP.hero.title}
        breadcrumb={tRP.hero.breadcrumb}
      />

      {/* INTRO */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <MessageCircle className="w-3 h-3" />
              {tRP.intro.badge}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tRP.intro.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tRP.intro.tituloSpan}</span>
            </h2>
            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
              {tRP.intro.descripcion}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORMULARIO + LATERAL */}
      <section className="pb-16 lg:pb-20 px-6 lg:px-10 bg-white relative overflow-hidden">

        <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* FORMULARIO */}
          <motion.div
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-white rounded-3xl border border-[#d4eef9] shadow-xl shadow-[#0e4a6b]/10 overflow-hidden">

              <div className="h-1 bg-gradient-to-r from-[#0e4a6b] via-[#1bb5e0] to-[#4ac8e8]" />

              <div className="p-6 md:p-8">

                <div className="flex items-start gap-3 mb-6 pb-5 border-b border-[#e8f4fa]">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0e2a3d] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                      {tRP.formulario.titulo}
                    </h3>
                    <p className="text-xs text-[#4a6170] mt-0.5">
                      {tRP.formulario.subtituloPre} <strong>+51 900 241 682</strong>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Nombre + Teléfono */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.nombre} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder={tRP.formulario.placeholders.nombre}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.telefono} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          required
                          placeholder={tRP.formulario.placeholders.telefono}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Separador */}
                  <div className="flex items-center gap-3 mt-2 mb-1">
                    <div className="flex-1 h-px bg-[#e8f4fa]" />
                    <span className="text-[10px] font-bold text-[#8fb0c0] uppercase tracking-widest">
                      {tRP.formulario.labels.separadorViaje}
                    </span>
                    <div className="flex-1 h-px bg-[#e8f4fa]" />
                  </div>

                  {/* Origen + Destino */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.desde} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="text"
                          name="origen"
                          value={form.origen}
                          onChange={handleChange}
                          required
                          placeholder={tRP.formulario.placeholders.origen}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.hacia} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1bb5e0]" />
                        <input
                          type="text"
                          name="destino"
                          value={form.destino}
                          onChange={handleChange}
                          required
                          placeholder={tRP.formulario.placeholders.destino}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fecha + Hora + Pasajeros */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.fecha} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] pointer-events-none" />
                        <input
                          type="date"
                          name="fecha"
                          value={form.fecha}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.hora} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] pointer-events-none" />
                        <input
                          type="time"
                          name="hora"
                          value={form.hora}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        {tRP.formulario.labels.pasajeros} <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] pointer-events-none" />
                        <select
                          name="pasajeros"
                          value={form.pasajeros}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all appearance-none cursor-pointer"
                        >
                          {tRP.formulario.pasajerosOpciones.map((op) => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notas */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tRP.formulario.labels.notas}
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-[#8fb0c0]" />
                      <textarea
                        name="notas"
                        value={form.notas}
                        onChange={handleChange}
                        rows={3}
                        placeholder={tRP.formulario.placeholders.notas}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Botón WhatsApp */}
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 w-full py-3.5 mt-3 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#25d366]/30"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {tRP.formulario.botonContinuar}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-[11px] text-[#8fb0c0] text-center leading-relaxed">
                    {tRP.formulario.disclaimer}
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA LATERAL */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Card WhatsApp directo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#0e4a6b]/15 p-7 text-white" style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}>
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-[#1bb5e0]/25 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#7fdcf2]" />
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-tight mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    {tRP.whatsappDirecto.titulo}
                  </h3>
                  <p className="text-sm text-white/70">
                    {tRP.whatsappDirecto.descripcion}
                  </p>
                </div>

                <a
                  href={whatsappDirecto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#25d366]/30 mt-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  +51 900 241 682
                </a>
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-[#f5fbfe] rounded-3xl border border-[#d4eef9] p-6">
              <h4 className="text-xs font-bold text-[#0e4a6b] uppercase tracking-widest mb-4">
                {tRP.beneficios.titulo}
              </h4>
              <div className="flex flex-col gap-3.5">
                {tRP.beneficios.items.map((b, i) => {
                  const Icono = ICONOS_BENEFICIOS[i];
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#cfe7f4] flex items-center justify-center flex-shrink-0">
                        <Icono className="w-4 h-4 text-[#1bb5e0]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0e2a3d] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                          {b.titulo}
                        </p>
                        <p className="text-xs text-[#4a6170] mt-0.5 leading-relaxed">
                          {b.descripcion}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Horario */}
            <div className="bg-white border border-[#d4eef9] rounded-2xl p-5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1bb5e0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0e4a6b] uppercase tracking-widest mb-1">
                  {tRP.horario.titulo}
                </p>
                <p className="text-xs text-[#4a6170] leading-relaxed">
                  {tRP.horario.lineas.map((linea, i) => (
                    <span key={i}>
                      {linea}
                      {i < tRP.horario.lineas.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-[#f5fbfe]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              {tRP.proceso.badge}
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0e2a3d] mb-3 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tRP.proceso.titulo}
            </h2>
            <p className="text-[#4a6170] text-base">
              {tRP.proceso.subtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tRP.proceso.pasos.map((paso, i) => {
              const Icono = ICONOS_PROCESO[i];
              return (
                <motion.div
                  key={paso.numero}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative bg-white rounded-2xl border border-[#d4eef9] p-6 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:shadow-[#1bb5e0]/10 hover:border-[#1bb5e0] transition-all duration-300"
                >
                  <span
                    className="absolute top-3 right-4 text-4xl font-bold text-[#e8f6fb] select-none leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {paso.numero}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20">
                    <Icono className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-base font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                    {paso.titulo}
                  </h4>
                  <p className="text-xs text-[#4a6170] leading-relaxed">
                    {paso.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}