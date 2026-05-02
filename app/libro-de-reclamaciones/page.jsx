"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { useLang } from "@/lang/LanguageContext";
import {
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  User,
  Mail,
  Phone,
  FileText,
  Send,
  Info,
} from "lucide-react";

const WHATSAPP_NUMERO = "51900241682";

const FORM_INICIAL = {
  tipoDocumento: "DNI",
  numeroDocumento: "",
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  direccion: "",
  esMenor: false,
  tipoBien: "servicio",
  monto: "",
  descripcion: "",
  tipoSolicitud: "reclamo",
  detalle: "",
  pedido: "",
};

export default function LibroReclamacionesPage() {
  const { t } = useLang();
  const tLR = t.libroReclamaciones;

  const [form, setForm] = useState(FORM_INICIAL);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const w = tLR.whatsapp;

    const fechaHoy = new Date().toLocaleDateString(tLR.locale, {
      year: "numeric", month: "long", day: "numeric"
    });

    const lineas = [
      w.encabezado,
      `${w.fechaLabel} ${fechaHoy}`,
      ``,
      w.seccion1Titulo,
      `${w.nombre} ${form.nombre} ${form.apellidos}`,
      `${w.documento} ${form.tipoDocumento} ${form.numeroDocumento}`,
      `${w.correo} ${form.email}`,
      `${w.telefono} ${form.telefono}`,
      `${w.direccion} ${form.direccion || "—"}`,
      form.esMenor ? w.avisoMenor : ``,
      ``,
      w.seccion2Titulo,
      `${w.tipo} ${form.tipoBien === "producto" ? w.tipoProducto : w.tipoServicio}`,
      `${w.montoReclamado} ${form.monto || "—"}`,
      `${w.descripcion} ${form.descripcion}`,
      ``,
      form.tipoSolicitud === "reclamo" ? w.seccion3TituloReclamo : w.seccion3TituloQueja,
      `${w.tipoLabel} ${form.tipoSolicitud === "reclamo" ? w.reclamoCompleto : w.quejaCompleta}`,
      ``,
      w.detalle,
      form.detalle,
      ``,
      w.pedido,
      form.pedido,
    ].filter(Boolean);

    const mensaje = encodeURIComponent(lineas.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setEnviado(true);
    setTimeout(() => {
      setForm(FORM_INICIAL);
      setEnviado(false);
    }, 4000);
  };

  return (
    <div className="bg-white">

      <PageHero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85&auto=format&fit=crop"
        title={tLR.hero.title}
        breadcrumb={tLR.hero.breadcrumb}
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
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
              <BookOpen className="w-3 h-3" />
              {tLR.header.badge}
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0e2a3d] mb-3 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tLR.header.titulo}
            </h2>
            <p className="text-sm md:text-base text-[#4a6170] leading-relaxed">
              {tLR.header.descripcion}
            </p>
          </motion.div>

          {/* Aviso reclamo vs queja */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-[#fff8e8] border border-[#f5d896] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#c89517] flex-shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-[#7a5a05]" style={{ fontFamily: "Georgia, serif" }}>
                  {tLR.reclamoVsQueja.reclamo.titulo}
                </h4>
              </div>
              <p className="text-xs text-[#7a5a05] leading-relaxed">
                {tLR.reclamoVsQueja.reclamo.descripcion}
              </p>
            </div>
            <div className="bg-[#f5fbfe] border border-[#cfe7f4] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-2">
                <Info className="w-5 h-5 text-[#1bb5e0] flex-shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-[#0e4a6b]" style={{ fontFamily: "Georgia, serif" }}>
                  {tLR.reclamoVsQueja.queja.titulo}
                </h4>
              </div>
              <p className="text-xs text-[#0e4a6b] leading-relaxed">
                {tLR.reclamoVsQueja.queja.descripcion}
              </p>
            </div>
          </div>

          {/* Mensaje éxito */}
          {enviado && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-[#e8f9ee] border border-[#7fd0a0] rounded-2xl p-5 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#1f8c4d] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#0d5a2f] mb-1">
                  {tLR.exito.titulo}
                </h4>
                <p className="text-xs text-[#0d5a2f] leading-relaxed">
                  {tLR.exito.descripcion}
                </p>
              </div>
            </motion.div>
          )}

          {/* FORMULARIO */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-[#d4eef9] shadow-xl shadow-[#0e4a6b]/10 overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-[#0e4a6b] via-[#1bb5e0] to-[#4ac8e8]" />

            <div className="p-6 md:p-8 flex flex-col gap-8">

              {/* SECCIÓN 1 */}
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#e8f4fa]">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                    {tLR.seccion1.titulo}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.tipoDocumento}
                    </label>
                    <select
                      name="tipoDocumento"
                      value={form.tipoDocumento}
                      onChange={handleChange}
                      required
                      className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all appearance-none cursor-pointer"
                    >
                      {tLR.seccion1.tiposDocumento.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.numeroDocumento}
                    </label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      value={form.numeroDocumento}
                      onChange={handleChange}
                      required
                      placeholder={tLR.seccion1.placeholders.numeroDocumento}
                      className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.nombre}
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder={tLR.seccion1.placeholders.nombre}
                      className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.apellidos}
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      value={form.apellidos}
                      onChange={handleChange}
                      required
                      placeholder={tLR.seccion1.placeholders.apellidos}
                      className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder={tLR.seccion1.placeholders.email}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion1.labels.telefono}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                      <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                        placeholder={tLR.seccion1.placeholders.telefono}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tLR.seccion1.labels.direccion}
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder={tLR.seccion1.placeholders.direccion}
                    className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="esMenor"
                    checked={form.esMenor}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-[#cfe7f4] text-[#1bb5e0] focus:ring-[#1bb5e0]/20"
                  />
                  <span className="text-xs text-[#4a6170] leading-relaxed">
                    {tLR.seccion1.checkboxMenor}
                  </span>
                </label>
              </div>

              {/* SECCIÓN 2 */}
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#e8f4fa]">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                    {tLR.seccion2.titulo}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion2.labels.tipo}
                    </label>
                    <div className="flex gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] cursor-pointer hover:border-[#1bb5e0] transition-colors">
                        <input
                          type="radio"
                          name="tipoBien"
                          value="servicio"
                          checked={form.tipoBien === "servicio"}
                          onChange={handleChange}
                          className="text-[#1bb5e0]"
                        />
                        <span>{tLR.seccion2.radioServicio}</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] cursor-pointer hover:border-[#1bb5e0] transition-colors">
                        <input
                          type="radio"
                          name="tipoBien"
                          value="producto"
                          checked={form.tipoBien === "producto"}
                          onChange={handleChange}
                          className="text-[#1bb5e0]"
                        />
                        <span>{tLR.seccion2.radioProducto}</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tLR.seccion2.labels.monto}
                    </label>
                    <input
                      type="text"
                      name="monto"
                      value={form.monto}
                      onChange={handleChange}
                      placeholder={tLR.seccion2.placeholders.monto}
                      className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tLR.seccion2.labels.descripcion}
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={tLR.seccion2.placeholders.descripcion}
                    className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all resize-none"
                  />
                </div>
              </div>

              {/* SECCIÓN 3 */}
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#e8f4fa]">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/20">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                    {tLR.seccion3.titulo}
                  </h3>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tLR.seccion3.labels.tipoSolicitud}
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] cursor-pointer hover:border-[#1bb5e0] transition-colors">
                      <input
                        type="radio"
                        name="tipoSolicitud"
                        value="reclamo"
                        checked={form.tipoSolicitud === "reclamo"}
                        onChange={handleChange}
                        className="text-[#1bb5e0]"
                      />
                      <span>{tLR.seccion3.radioReclamo}</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] cursor-pointer hover:border-[#1bb5e0] transition-colors">
                      <input
                        type="radio"
                        name="tipoSolicitud"
                        value="queja"
                        checked={form.tipoSolicitud === "queja"}
                        onChange={handleChange}
                        className="text-[#1bb5e0]"
                      />
                      <span>{tLR.seccion3.radioQueja}</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tLR.seccion3.labels.detalle}
                  </label>
                  <textarea
                    name="detalle"
                    value={form.detalle}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={tLR.seccion3.placeholders.detalle}
                    className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tLR.seccion3.labels.pedido}
                  </label>
                  <textarea
                    name="pedido"
                    value={form.pedido}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={tLR.seccion3.placeholders.pedido}
                    className="px-3 py-2.5 rounded-lg border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/15 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0b3a56] hover:to-[#0f8cb8] text-white text-sm font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#1bb5e0]/30"
              >
                <Send className="w-4 h-4" />
                {tLR.botonRegistrar}
              </button>

              <p className="text-[11px] text-[#8fb0c0] text-center leading-relaxed -mt-3">
                {tLR.disclaimerEnvio}
              </p>
            </div>
          </motion.form>

          {/* Información Indecopi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-[#f5fbfe] border border-[#d4eef9] rounded-2xl p-6 flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-[#1bb5e0] flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-[#4a6170] leading-relaxed">
              <p className="font-semibold text-[#0e2a3d] mb-1">{tLR.indecopi.titulo}</p>
              <p className="mb-2">
                {tLR.indecopi.parrafo1Pre}{" "}
                <strong>{tLR.indecopi.parrafo1Resaltado}</strong>{" "}
                {tLR.indecopi.parrafo1Post}
              </p>
              <p>
                {tLR.indecopi.parrafo2Pre}{" "}
                <strong>{tLR.indecopi.parrafo2Telefono}</strong>{" "}
                {tLR.indecopi.parrafo2Medio}{" "}
                <a href="https://www.gob.pe/indecopi" target="_blank" rel="noopener noreferrer" className="text-[#0e4a6b] font-semibold hover:underline">
                  {tLR.indecopi.parrafo2Web}
                </a>
                {tLR.indecopi.parrafo2Final}
              </p>
            </div>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-[#e8f4fa] flex flex-wrap gap-3">
            <Link
              href="/terminos-y-condiciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tLR.enlaces.terminos}
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/politica-de-privacidad"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tLR.enlaces.privacidad}
            </Link>
            <span className="text-[#cfe7f4]">·</span>
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a6b] hover:text-[#1bb5e0] transition-colors"
            >
              {tLR.enlaces.faq}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}