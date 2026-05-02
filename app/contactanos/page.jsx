"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

// ─── Animaciones ──────────────────────────────────────────────────────────────
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

// ─── Tarjetas de contacto (datos REALES del PDF de TIVO) ──────────────────────
const infoCards = [
  {
    titulo: "Teléfono y WhatsApp",
    lineas: ["+51 900 241 682"],
    href: ["https://wa.me/51900241682"],
    icono: Phone,
  },
  {
    titulo: "Correo electrónico",
    lineas: ["contacto@tivo.pe"],
    href: ["mailto:contacto@tivo.pe"],
    icono: Mail,
  },
  {
    titulo: "Ubicación",
    lineas: ["Lima, Perú"],
    href: ["https://maps.google.com/?q=Lima+Peru"],
    icono: MapPin,
  },
  {
    titulo: "Horario de atención",
    lineas: ["Lun – Vie: 8:00am – 7:00pm", "Sáb: 9:00am – 2:00pm"],
    href: [],
    icono: Clock,
  },
];

const FORM_INICIAL = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

// Etiquetas legibles para el asunto (para mostrar en el mensaje de WhatsApp)
const ASUNTOS_LABEL = {
  usuario: "Quiero usar la app TIVO",
  conductor: "Quiero ser conductor",
  soporte: "Soporte técnico",
  alianza: "Alianzas comerciales",
  otro: "Otro",
};

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ContactoPage() {
  const formRef   = useRef(null);
  const cardsRef  = useRef(null);
  const formInView  = useInView(formRef,  { once: true, margin: "-60px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState(FORM_INICIAL);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Construir mensaje de WhatsApp con los datos del formulario
  const construirMensajeWsp = () => {
    let mensaje = "¡Hola TIVO! Me pongo en contacto con ustedes.\n\n";
    mensaje += "*Mis datos:*\n";
    mensaje += `• *Nombre:* ${form.nombre}\n`;
    mensaje += `• *Correo:* ${form.email}\n`;

    if (form.telefono.trim()) {
      mensaje += `• *Teléfono:* ${form.telefono}\n`;
    }

    if (form.asunto) {
      mensaje += `• *Asunto:* ${ASUNTOS_LABEL[form.asunto] || form.asunto}\n`;
    }

    mensaje += `\n*Mensaje:*\n${form.mensaje}\n`;
    mensaje += "\n¡Espero su respuesta, gracias!";

    return encodeURIComponent(mensaje);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Abrir WhatsApp con el mensaje construido
    const url = `https://wa.me/51900241682?text=${construirMensajeWsp()}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // Resetear formulario tras un momento
    setTimeout(() => {
      setForm(FORM_INICIAL);
    }, 500);
  };

  // ─── SVGs de redes sociales (no dependen de lucide-react) ──────────────────
  const redes = [
    {
      nombre: "Facebook",
      href: "#",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      nombre: "Instagram",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
      nombre: "WhatsApp",
      href: "https://wa.me/51900241682",
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title="Contáctanos"
        breadcrumb="Contáctanos"
      />

      {/* SECCIÓN PRINCIPAL: MAPA + INFO (izq) + FORMULARIO (der) */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 relative overflow-hidden">

        {/* Decoración de fondo */}
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── COLUMNA IZQUIERDA: MAPA + TARJETAS (2/5) ── */}
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
                Encuéntranos
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                Estamos en Lima
              </h2>
            </div>

            {/* Mapa embed */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/8">
              <iframe
                title="Ubicación TIVO - Lima, Perú"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249823.1!2d-77.1!3d-12.046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452e4a!2sLima!5e0!3m2!1ses!2spe!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Tarjetas info — stack vertical */}
            <motion.div
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
            >
              {infoCards.map((card, i) => {
                const Icono = card.icono;
                return (
                  <motion.div
                    key={i}
                    className="group bg-white rounded-2xl border border-[#d4eef9] hover:border-[#1bb5e0] hover:shadow-lg hover:shadow-[#1bb5e0]/10 transition-all duration-300 p-4 flex items-center gap-4"
                    variants={item}
                  >
                    {/* Ícono con glow */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-[#1bb5e0] blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/25">
                        <Icono className="w-5 h-5 text-white" strokeWidth={1.8} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                        {card.titulo}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {card.lineas.map((linea, j) => (
                          card.href[j] ? (
                            <a
                              key={j}
                              href={card.href[j]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#0e2a3d] hover:text-[#1bb5e0] transition-colors font-medium truncate"
                            >
                              {linea}
                            </a>
                          ) : (
                            <span key={j} className="text-sm text-[#4a6170] font-medium">
                              {linea}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Card redes sociales */}
            <div className="bg-gradient-to-br from-[#f5fbfe] to-[#e8f6fb] border border-[#d4eef9] rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-[10px] font-bold text-[#0e4a6b] uppercase tracking-widest">
                Síguenos en redes
              </p>
              <div className="flex items-center gap-3">
                {redes.map((r) => (
                  <a
                    key={r.nombre}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.nombre}
                    className="w-10 h-10 rounded-xl bg-white border border-[#d4eef9] hover:bg-gradient-to-br hover:from-[#0e4a6b] hover:to-[#1bb5e0] hover:border-transparent flex items-center justify-center text-[#4a6170] hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={r.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── COLUMNA DERECHA: FORMULARIO (3/5) ── */}
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
                Escríbenos
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                ¿Listo para compartir{" "}
                <span className="text-[#0e4a6b] italic">tu próximo viaje?</span>
              </h2>
              <p className="text-sm text-[#4a6170]">
                Completa el formulario y te contactaremos por WhatsApp.
              </p>
            </div>

            {/* Card del formulario */}
            <div className="relative bg-white rounded-3xl border border-[#d4eef9] shadow-xl shadow-[#0e4a6b]/10 p-6 md:p-8 overflow-hidden">
              {/* Decoración superior */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0e4a6b] via-[#1bb5e0] to-[#4ac8e8]" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Fila 1: nombre + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      Nombre completo <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      Correo electrónico <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@correo.com"
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Fila 2: teléfono + asunto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                      Asunto <span className="text-[#1bb5e0]">*</span>
                    </label>
                    <select
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Selecciona un asunto</option>
                      <option value="usuario">Quiero usar la app TIVO</option>
                      <option value="conductor">Quiero ser conductor</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="alianza">Alianzas comerciales</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">
                    Mensaje <span className="text-[#1bb5e0]">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="px-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all resize-none"
                  />
                </div>

                {/* Botón WhatsApp (único botón de envío) */}
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 mt-2 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-full shadow-lg shadow-[#25d366]/30 hover:shadow-xl hover:shadow-[#25d366]/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar por WhatsApp
                </button>

                {/* Texto informativo */}
                <p className="text-xs text-center text-[#8fb0c0]">
                  Al enviar, se abrirá WhatsApp con tus datos listos para enviar.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}