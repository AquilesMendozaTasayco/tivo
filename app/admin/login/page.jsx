"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronRight, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

// ── Tema personalizado SweetAlert2 ──────────────────────────────
const swalTheme = {
  customClass: {
    popup:        "!rounded-2xl !shadow-2xl !border !border-[#d4eef9]",
    title:        "!text-[#0e2a3d] !font-bold",
    htmlContainer:"!text-[#4a6170] !text-sm",
    confirmButton:"!bg-gradient-to-r !from-[#0e4a6b] !to-[#1bb5e0] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold hover:!opacity-90 !shadow-lg !shadow-[#0e4a6b]/25",
    cancelButton: "!bg-[#f5fbfe] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-[#4a6170] !border !border-[#cfe7f4]",
    icon:         "!border-[#bfdff1]",
  },
  buttonsStyling: false,
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "!rounded-xl !shadow-xl !border !border-[#d4eef9] !text-sm",
    timerProgressBar: "!bg-[#1bb5e0]",
  },
});

export default function AdminLogin() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      await Toast.fire({
        icon: "success",
        title: "Acceso concedido",
        text: "Bienvenido al panel de TIVO.",
      });

      router.push("/admin/banners");
    } catch (err) {
      const msg =
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
          ? "Correo o contraseña incorrectos."
          : "Ocurrió un error. Intenta nuevamente.";

      Swal.fire({
        ...swalTheme,
        icon: "error",
        title: "Acceso denegado",
        text: msg,
        confirmButtonText: "Reintentar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">

      {/* ── PANEL IZQUIERDO ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)",
        }}
      >

        {/* Orbes animados */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[550px] h-[550px] rounded-full"
            style={{ background: "radial-gradient(circle, #1bb5e066 0%, transparent 70%)", top: "-15%", right: "-10%" }}
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 25, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, #4ac8e855 0%, transparent 70%)", bottom: "-8%", left: "-12%" }}
            animate={{ scale: [1, 1.25, 1], x: [0, 30, 0], y: [0, -25, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.div
            className="absolute w-[280px] h-[280px] rounded-full"
            style={{ background: "radial-gradient(circle, #7fdcf233 0%, transparent 70%)", top: "50%", right: "25%" }}
            animate={{ scale: [1, 1.35, 1], y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />
        </div>

        {/* Patrón de líneas onduladas (tipo rutas GPS) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="routeWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
              <path
                d="M0 70 Q 50 30, 100 70 T 200 70"
                stroke="#a2dcf0"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M0 110 Q 50 70, 100 110 T 200 110"
                stroke="#a2dcf0"
                strokeWidth="1.2"
                fill="none"
                opacity="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#routeWaves)" />
        </svg>

        {/* Curvas decorativas tipo GPS con puntos */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" preserveAspectRatio="none">
          <motion.path
            d="M 50 120 Q 200 200, 400 180 T 750 300"
            stroke="#4ac8e8"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={mounted ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 100 650 Q 300 500, 500 600 T 780 520"
            stroke="#7fdcf2"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={mounted ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          <circle cx="50" cy="120" r="4" fill="#4ac8e8" />
          <circle cx="750" cy="300" r="4" fill="#4ac8e8" />
          <circle cx="100" cy="650" r="4" fill="#7fdcf2" />
          <circle cx="780" cy="520" r="4" fill="#7fdcf2" />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-7 px-12 text-center">

          {/* Badge "Plataforma activa" */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
            </span>
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/70">
              Plataforma activa
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo TIVO — círculo celeste con glow */}
            <div className="relative mx-auto mb-6 w-fit">
              {/* Glow externo */}
              <div className="absolute inset-0 rounded-full bg-[#1bb5e0] blur-2xl opacity-50" />
              {/* Logo */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#1bb5e0] to-[#0f8cb8] border border-[#7fdcf2]/60 flex items-center justify-center shadow-2xl shadow-[#1bb5e0]/40">
                <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
                  <path
                    d="M10 11 L30 11 M20 11 L20 31"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 28 Q20 33 27 28"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
              TIVO
            </h1>
            <p className="text-[#7fdcf2] text-base italic mt-1" style={{ fontFamily: "Georgia, serif" }}>
              Compartimos más que un viaje
            </p>
            <p className="text-white/40 text-xs font-semibold tracking-[0.3em] uppercase mt-4">Panel Administrativo</p>
          </motion.div>

          <motion.div
            className="w-px h-14 bg-gradient-to-b from-transparent via-[#4ac8e8] to-transparent"
            initial={{ scaleY: 0 }}
            animate={mounted ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.div
            className="flex flex-col gap-4 text-left w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {["Gestión de reservas y rutas", "Control de usuarios verificados", "Acceso seguro y privado"].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8] flex-shrink-0 shadow-sm shadow-[#4ac8e8]" />
                <span className="text-white/55 text-xs font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 text-white/25 text-[10px] tracking-widest font-bold uppercase">
          © {new Date().getFullYear()} TIVO · Lima, Perú
        </div>
      </div>

      {/* ── PANEL DERECHO ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white relative">
        {/* Fondos difuminados */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />

        {/* Línea decorativa sutil arriba-derecha */}
        <svg className="absolute top-10 right-10 w-32 h-32 opacity-20 pointer-events-none" viewBox="0 0 100 100">
          <path d="M10 50 Q 30 20, 50 50 T 90 50" stroke="#1bb5e0" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
        </svg>

        <motion.div
          className="relative w-full max-w-sm flex flex-col gap-8"
          initial={{ opacity: 0, x: 30 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1bb5e0] to-[#0f8cb8] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <path d="M10 11 L30 11 M20 11 L20 31" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M13 28 Q20 33 27 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>TIVO</p>
              <p className="text-xs text-[#4a6170]">Panel Administrativo</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
              Bienvenido de vuelta
            </h2>
            <p className="text-sm text-[#4a6170]">Ingresa tus credenciales para acceder al panel.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">Correo electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors" />
                <input
                  type="email"
                  placeholder="admin@tivo.pe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0e4a6b] uppercase tracking-wider">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8fb0c0] hover:text-[#1bb5e0] transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#0e4a6b] to-[#0f6998] hover:from-[#0e4a6b] hover:to-[#1bb5e0] disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0e4a6b]/30 hover:shadow-xl hover:shadow-[#1bb5e0]/30 hover:-translate-y-0.5 transition-all duration-300 mt-1 overflow-hidden"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Ingresar al sistema
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-[#e8f4fa]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1bb5e0]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#8fb0c0]">
              Acceso seguro y encriptado
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
