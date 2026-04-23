"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  ImageIcon,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const items = [
  { label: "Banners", href: "/admin/banners", icon: ImageIcon },
];

// ── Toast compartido ─────────────────────────────────────────────
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

export default function Sidebar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Serás redirigido a la pantalla de acceso.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
      customClass: {
        popup:         "!rounded-2xl !shadow-2xl !border !border-[#d4eef9]",
        title:         "!text-[#0e2a3d] !font-bold",
        htmlContainer: "!text-[#4a6170] !text-sm",
        confirmButton: "!bg-gradient-to-r !from-[#0e4a6b] !to-[#1bb5e0] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-white hover:!opacity-90 !shadow-lg !shadow-[#0e4a6b]/25",
        cancelButton:  "!bg-[#f5fbfe] !rounded-xl !px-6 !py-2.5 !text-sm !font-semibold !text-[#4a6170] !border !border-[#cfe7f4]",
        icon:          "!border-[#bfdff1]",
        actions:       "!gap-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setLoggingOut(true);
      await signOut(auth);

      await Toast.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Hasta pronto.",
      });

      router.push("/admin/login");
    } catch {
      Toast.fire({ icon: "error", title: "Error al cerrar sesión" });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside
      className="sticky top-0 h-screen w-[270px] flex-shrink-0 flex flex-col border-r border-white/5 overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #051e2e 0%, #0e4a6b 100%)",
      }}
    >

      {/* Orbes decorativos */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#1bb5e0]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-[#4ac8e8]/20 blur-3xl pointer-events-none" />

      {/* Patrón líneas onduladas (rutas GPS sutiles) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="sidebarWaves" x="0" y="0" width="160" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0 60 Q 40 30, 80 60 T 160 60"
              stroke="#a2dcf0"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sidebarWaves)" />
      </svg>

      {/* ── LOGO ── */}
      <div className="relative px-6 pt-7 pb-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          {/* Logo con glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#1bb5e0] blur-md opacity-50" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#1bb5e0] to-[#0f8cb8] border border-[#7fdcf2]/60 flex items-center justify-center shadow-lg shadow-[#1bb5e0]/30">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <path d="M10 11 L30 11 M20 11 L20 31" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M13 28 Q20 33 27 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white text-base font-bold leading-tight tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
              TIVO
            </p>
            <p className="text-[#7fdcf2] text-[10px] font-semibold tracking-widest uppercase">
              Movilidad compartida
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8] animate-pulse" />
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Panel Administrativo
          </p>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="relative flex-1 px-4 py-6 flex flex-col gap-1.5">
        <p className="px-3 mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
          Gestión de contenido
        </p>

        {items.map((item, i) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon   = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-[#0f6998] to-[#0e4a6b] border border-[#4ac8e8]/30 shadow-lg shadow-[#1bb5e0]/15"
                    : "border border-transparent hover:bg-white/5 hover:border-white/8"
                }`}
              >
                {active && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4ac8e8]/10 to-transparent pointer-events-none" />
                )}

                <div className="flex items-center gap-3 relative">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    active ? "bg-[#4ac8e8]/25" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon className={`h-4 w-4 transition-colors ${
                      active ? "text-[#7fdcf2]" : "text-white/35 group-hover:text-white/70"
                    }`} />
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                    active ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}>
                    {item.label}
                  </span>
                </div>

                {active ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8] shadow-sm shadow-[#4ac8e8]" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* ── CERRAR SESIÓN ── */}
      <div className="relative px-4 pb-6 pt-4 border-t border-white/8">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:bg-red-500/10 hover:border-red-500/20 text-white/30 hover:text-red-400 transition-all duration-200 disabled:opacity-50"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/15 flex items-center justify-center transition-all">
            <LogOut className={`h-4 w-4 ${loggingOut ? "animate-pulse" : ""}`} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest">
            {loggingOut ? "Saliendo..." : "Cerrar sesión"}
          </span>
        </button>
      </div>
    </aside>
  );
}