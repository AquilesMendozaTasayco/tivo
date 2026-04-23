"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Mail, User, MessageSquare } from "lucide-react";

const FORM_INICIAL = { nombre: "", email: "", telefono: "", mensaje: "" };

export default function UneteModal({ abierto, onCerrar }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [abierto]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onCerrar(); };
    if (abierto) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [abierto, onCerrar]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Cuando tengas la API, descomenta:
      // await fetch("/api/unete", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      await new Promise((r) => setTimeout(r, 900));
      setEnviado(true);
      setTimeout(() => {
        setForm(FORM_INICIAL);
        setEnviado(false);
        onCerrar();
      }, 2200);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const mensajeWsp = encodeURIComponent(
    "Hola, me gustaría recibir más información sobre TIVO."
  );
  const whatsappURL = `https://wa.me/51900241682?text=${mensajeWsp}`;

  return (
    <AnimatePresence>
      {abierto && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCerrar}
            className="fixed inset-0 z-[100] bg-[#0e2a3d]/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-8 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-auto my-auto"
            >
              {/* Barra superior */}
              <div className="h-0.5 bg-[#0e4a6b]" />

              {/* Botón cerrar */}
              <button
                onClick={onCerrar}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#f5fbfe] text-[#4a6170] hover:text-[#0e4a6b] flex items-center justify-center transition-all duration-200 z-10"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header sobrio */}
              <div className="px-7 pt-7 pb-5 border-b border-[#e8f4fa]">
                <h2 className="text-xl font-bold text-[#0e2a3d] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  Únete a TIVO
                </h2>
                <p className="text-xs text-[#4a6170] mt-1">
                  Déjanos tus datos y nos pondremos en contacto contigo.
                </p>
              </div>

              {/* Contenido */}
              <div className="p-7">
                {!enviado ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Nombre */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        Nombre completo <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className="w-full pl-9 pr-3 py-2.5 rounded border border-[#cfe7f4] bg-white text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#0e4a6b] focus:ring-1 focus:ring-[#0e4a6b]/20 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        Correo electrónico <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@correo.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded border border-[#cfe7f4] bg-white text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#0e4a6b] focus:ring-1 focus:ring-[#0e4a6b]/20 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        Teléfono <span className="text-[#c0392b]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0]" />
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          required
                          placeholder="+51 999 999 999"
                          className="w-full pl-9 pr-3 py-2.5 rounded border border-[#cfe7f4] bg-white text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#0e4a6b] focus:ring-1 focus:ring-[#0e4a6b]/20 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Mensaje (opcional) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#0e4a6b] uppercase tracking-wider">
                        Mensaje
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#8fb0c0]" />
                        <textarea
                          name="mensaje"
                          value={form.mensaje}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Cuéntanos brevemente tu interés (opcional)"
                          className="w-full pl-9 pr-3 py-2.5 rounded border border-[#cfe7f4] bg-white text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#0e4a6b] focus:ring-1 focus:ring-[#0e4a6b]/20 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Botón enviar */}
                    <button
                      type="submit"
                      disabled={cargando}
                      className="flex items-center justify-center gap-2 w-full py-3 mt-1 bg-[#0e4a6b] hover:bg-[#0b3a56] disabled:opacity-60 text-white text-sm font-semibold rounded transition-colors duration-200"
                    >
                      {cargando ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar solicitud
                        </>
                      )}
                    </button>

                    {/* Separador */}
                    <div className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-[#e8f4fa]" />
                      <span className="text-[10px] font-semibold text-[#8fb0c0] uppercase tracking-widest">o</span>
                      <div className="flex-1 h-px bg-[#e8f4fa]" />
                    </div>

                    {/* Botón WhatsApp */}
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-[#cfe7f4] hover:border-[#0e4a6b] hover:bg-[#f5fbfe] text-[#0e4a6b] text-sm font-semibold rounded transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="#25d366" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Contactar por WhatsApp
                    </a>
                  </form>
                ) : (
                  /* Mensaje de éxito */
                  <div className="py-6 flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#f5fbfe] border border-[#cfe7f4] flex items-center justify-center">
                      <svg className="w-7 h-7 text-[#0e4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                      Solicitud enviada
                    </h3>
                    <p className="text-sm text-[#4a6170] max-w-xs">
                      Gracias por contactar a TIVO. Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}