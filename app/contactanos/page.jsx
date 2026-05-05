"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLang } from "@/lang/LanguageContext";

const ICONOS_CARDS = [Phone, Mail, MapPin, Clock];

// ✅ Paths de iconos para redes (fallback)
const REDES_PATHS = {
  facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.751-.216-3.32-.216-3.384 0-5.699 2.064-5.699 5.844v2.372z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  tiktok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z",
  whatsapp: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FORM_INICIAL = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

export default function ContactoPage() {
  const { t } = useLang();
  const tCP = t.contactoPage;

  const [datosContacto, setDatosContacto] = useState(null);
  const [redesSociales, setRedesSociales] = useState({});
  const [loadingDatos, setLoadingDatos] = useState(true);
  const [form, setForm] = useState(FORM_INICIAL);

  const formRef = useRef(null);
  const cardsRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  // ✅ Cargar TODO desde Firebase
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // 📍 Contacto
        const contactoSnap = await getDocs(collection(db, "contacto"));
        if (contactoSnap.docs.length > 0) {
          setDatosContacto(contactoSnap.docs[0].data());
        }

        // 🌐 Redes Sociales
        const redesSnap = await getDocs(collection(db, "redesSociales"));
        if (redesSnap.docs.length > 0) {
          setRedesSociales(redesSnap.docs[0].data());
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoadingDatos(false);
      }
    };

    fetchDatos();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const construirMensajeWsp = () => {
    const w = tCP.whatsapp;
    const asuntoLabel = tCP.formulario.asuntos.find((a) => a.value === form.asunto)?.label || form.asunto;

    let mensaje = `${w.saludo}\n\n`;
    mensaje += `*${w.misDatos}*\n`;
    mensaje += `• *${w.nombreLabel}* ${form.nombre}\n`;
    mensaje += `• *${w.correoLabel}* ${form.email}\n`;

    if (form.telefono.trim()) {
      mensaje += `• *${w.telefonoLabel}* ${form.telefono}\n`;
    }
    if (form.asunto) {
      mensaje += `• *${w.asuntoLabel}* ${asuntoLabel}\n`;
    }

    mensaje += `\n*${w.mensajeLabel}*\n${form.mensaje}\n`;
    mensaje += `\n${w.despedida}`;

    return encodeURIComponent(mensaje);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Usa el teléfono de Firebase
    const telefonoWsp = datosContacto?.telefono || "51900241682";
    const url = `https://wa.me/${telefonoWsp.replace(/[^0-9]/g, "")}?text=${construirMensajeWsp()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setForm(FORM_INICIAL), 500);
  };

  return (
    <div className="bg-white">

      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title={tCP.hero.title}
        breadcrumb={tCP.hero.breadcrumb}
      />

      <section className="py-16 lg:py-24 px-6 lg:px-10 relative overflow-hidden">

        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* COLUMNA IZQUIERDA */}
          <motion.div
            ref={cardsRef}
            className="lg:col-span-2 flex flex-col gap-5"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
                {tCP.columnaInfo.badge}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                {tCP.columnaInfo.titulo}
              </h2>
            </div>

            {/* MAPA */}
            {!loadingDatos && datosContacto?.mapUrl ? (
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/8">
                <iframe
                  title={tCP.columnaInfo.mapaTitulo}
                  src={datosContacto.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="w-full h-64 rounded-2xl bg-[#f5fbfe] border border-[#d4eef9] flex items-center justify-center">
                <MapPin className="h-12 w-12 text-[#8fb0c0]" />
              </div>
            )}

            {/* BOTÓN MAPS */}
            {!loadingDatos && datosContacto?.direccion && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(datosContacto.direccion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white border border-[#d4eef9] hover:border-[#1bb5e0] hover:bg-[#f5fbfe] text-sm font-semibold text-[#0e4a6b] transition-all duration-200"
              >
                <MapPin className="w-4 h-4 text-[#1bb5e0]" />
                {tCP.columnaInfo.abrirMaps}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}

            {/* TARJETAS DE CONTACTO - Del Firebase */}
            <motion.div
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
            >
              {!loadingDatos && datosContacto && (
                <>
                  {/* Teléfono */}
                  <motion.div
                    className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-4 flex items-center gap-4"
                    variants={item}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                        <Phone className="w-5 h-5 text-white" strokeWidth={1.8} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                        {tCP.formulario.labels.telefono}
                      </p>
                      <a
                        href={`tel:${datosContacto.telefono}`}
                        className="text-sm text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors font-medium truncate"
                      >
                        {datosContacto.telefono}
                      </a>
                    </div>
                  </motion.div>

                  {/* Correo */}
                  <motion.div
                    className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-4 flex items-center gap-4"
                    variants={item}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                        <Mail className="w-5 h-5 text-white" strokeWidth={1.8} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                        {tCP.formulario.labels.email}
                      </p>
                      <a
                        href={`mailto:${datosContacto.correo}`}
                        className="text-sm text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors font-medium truncate"
                      >
                        {datosContacto.correo}
                      </a>
                    </div>
                  </motion.div>

                  {/* Dirección */}
                  {datosContacto.direccion && (
                    <motion.div
                      className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-4 flex items-center gap-4"
                      variants={item}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                          <MapPin className="w-5 h-5 text-white" strokeWidth={1.8} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                          Dirección
                        </p>
                        <p className="text-sm text-[#0e2a3d] font-medium">{datosContacto.direccion}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Horarios */}
                  {datosContacto.horarios && datosContacto.horarios.length > 0 && (
                    <motion.div
                      className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-4 flex items-start gap-4"
                      variants={item}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                          <Clock className="w-5 h-5 text-white" strokeWidth={1.8} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                          Horarios
                        </p>
                        <div className="space-y-1">
                          {datosContacto.horarios.map((h, i) => (
                            <div key={i}>
                              <p className="text-[10px] font-semibold text-[#4a6170]">{h.dia}</p>
                              <p className="text-sm font-medium text-[#0e2a3d]">{h.horario}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>

            {/* REDES SOCIALES - Del Firebase */}
            <div className="bg-gradient-to-br from-[#f5fbfe] to-[#e8f6fb] border border-[#d4eef9] rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                {tCP.columnaInfo.siguenosEnRedes}
              </p>
              <div className="flex items-center gap-3">
                {Object.entries(redesSociales).map(([key, red]) => {
                  // ✅ Si la red tiene href, mostrar botón
                  if (!red.href) return null;
                  
                  return (
                    <a
                      key={key}
                      href={red.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={red.nombre}
                      className="w-10 h-10 rounded-xl bg-white border border-[#d4eef9] hover:bg-gradient-to-br hover:from-[#0e4a6b] hover:to-[#1bb5e0] hover:border-transparent flex items-center justify-center text-[#4a6170] hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={red.path} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA - FORMULARIO */}
          <motion.div
            ref={formRef}
            className="lg:col-span-3 flex flex-col gap-6"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
                {tCP.formulario.badge}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                {tCP.formulario.tituloPre}{" "}
                <span className="text-[#0e4a6b] italic">{tCP.formulario.tituloSpan}</span>
              </h2>
              <p className="text-sm text-[#4a6170]">
                {tCP.formulario.subtitulo}
              </p>
            </div>

            <div className="relative bg-white rounded-3xl border border-[#d4eef9] shadow-xl shadow-[#0e4a6b]/10 p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0e4a6b] via-[#1bb5e0] to-[#4ac8e8]" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tCP.formulario.labels.nombre} <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder={tCP.formulario.placeholders.nombre}
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tCP.formulario.labels.email} <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={tCP.formulario.placeholders.email}
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tCP.formulario.labels.telefono}
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder={tCP.formulario.placeholders.telefono}
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      {tCP.formulario.labels.asunto} <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <select
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>{tCP.formulario.placeholders.asuntoVacio}</option>
                      {tCP.formulario.asuntos.map((op) => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    {tCP.formulario.labels.mensaje} <span className="text-[#1bb5e0]">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={tCP.formulario.placeholders.mensaje}
                    className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 mt-2 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-full shadow-lg shadow-[#25d366]/30 hover:shadow-xl hover:shadow-[#25d366]/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  {tCP.formulario.botonEnviar}
                </button>

                <p className="text-xs text-center text-[#8fb0c0]">
                  {tCP.formulario.aviso}
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}