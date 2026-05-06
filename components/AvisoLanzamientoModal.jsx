"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Bell, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function AvisoLanzamientoModal({ abierto, onCerrar }) {
  const [correo, setCorreo] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setCorreo("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [abierto]);

  const swalBase = {
    confirmButtonColor: "#0e4a6b",
    customClass: {
      popup:         "!rounded-2xl !shadow-2xl !border !border-[#d4eef9]",
      title:         "!text-[#0e2a3d] !font-bold !text-xl",
      htmlContainer: "!text-[#4a6170] !text-sm",
      confirmButton: "!rounded-full !px-7 !text-sm !font-bold",
      icon:          "!border-none",
    },
    didOpen: () => {
      const container = document.querySelector(".swal2-container");
      if (container) container.style.zIndex = "9999";
    },
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Swal.fire({
        ...swalBase,
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor ingresa un correo electrónico válido.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    setCargando(true);
    try {
      const res = await fetch("/api/aviso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await res.json();

      if (res.ok) {
        onCerrar();
        Swal.fire({
          ...swalBase,
          icon: "success",
          title: "¡Listo! 🎉",
          html: `Te avisaremos a <b style="color:#0e4a6b">${correo}</b><br/>cuando TIVO esté disponible.`,
          confirmButtonText: "¡Genial!",
        });
      } else {
        throw new Error(data.error || "Error al registrar");
      }
    } catch {
      Swal.fire({
        ...swalBase,
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos registrar tu correo. Intenta de nuevo más tarde.",
        confirmButtonText: "Reintentar",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onCerrar();
  };

  return (
    <AnimatePresence>
      {abierto && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onCerrar}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-sm bg-white rounded-[20px] shadow-2xl shadow-[#0e4a6b]/20 overflow-hidden border border-[#d4eef9]">

              {/* ── HEADER ── */}
              <div
                className="relative px-7 pt-7 pb-11 text-center"
                style={{ background: "#0e4a6b" }}
              >
                {/* Botón cerrar */}
                <button
                  onClick={onCerrar}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Cerrar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] font-bold tracking-[3px] uppercase text-white/50 mb-2.5">
                  TIVO · Próximamente
                </p>
                <h2
                  className="text-[22px] font-bold text-white leading-snug"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Avísame del{" "}
                  <span className="italic text-[#7fdcf2]">lanzamiento</span>
                </h2>
              </div>

              {/* ── ÍCONO FLOTANTE ── */}
              <div className="flex justify-center -mt-6 relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl border border-[#d4eef9] shadow-lg shadow-[#0e4a6b]/15 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#0e4a6b]" />
                </div>
              </div>

              {/* ── BODY ── */}
              <div className="px-7 pt-5 pb-7 text-center">
                <p className="text-[#4a6170] text-sm leading-relaxed mb-5">
                  Ingresa tu correo y te notificamos cuando TIVO esté listo.{" "}
                  <span className="text-[#1bb5e0] font-medium">Sin spam</span>, solo el aviso que importa.
                </p>

                {/* Input */}
                <div className="relative mb-3">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail className="w-4 h-4 text-[#1bb5e0]" />
                  </div>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="tucorreo@ejemplo.com"
                    disabled={cargando}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d4eef9] bg-[#f5fbfe] text-[#0e2a3d] text-sm placeholder:text-[#9bb5c4] focus:outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all duration-200 disabled:opacity-60"
                  />
                </div>

                {/* Botón */}
                <button
                  onClick={handleSubmit}
                  disabled={cargando || !correo.trim()}
                  className="w-full py-3 rounded-xl bg-[#0e4a6b] hover:bg-[#0b3a56] active:scale-[0.98] text-white text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cargando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      Quiero que me avisen
                    </>
                  )}
                </button>

                <p className="text-[#9bb5c4] text-[11px] mt-4 leading-relaxed">
                  No compartimos tu correo con nadie.<br />
                  Solo recibirás el aviso del lanzamiento.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}