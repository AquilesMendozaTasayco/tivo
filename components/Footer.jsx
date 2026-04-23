"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// ── SVGs inline de redes sociales (evita problemas de compatibilidad con lucide-react) ──
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Enlaces con rutas propias (no anclas) ──
const enlaces = {
  navegacion: [
    { nombre: "Inicio",        href: "/" },
    { nombre: "Nosotros",      href: "/nosotros" },
    { nombre: "Reservas",      href: "/reservas" },
    { nombre: "Cómo funciona", href: "/como-funciona" },
    { nombre: "Testimonios",   href: "/testimonios" },
    { nombre: "Contáctanos",   href: "/contactanos" },
  ],
  ventajas: [
    { nombre: "Confianza y seguridad", href: "/seguridad" },
    { nombre: "Impacto y comunidad",   href: "/impacto" },
  ],
};

const redes = [
  { icono: FacebookIcon,  href: "#", label: "Facebook" },
  { icono: InstagramIcon, href: "#", label: "Instagram" },
  { icono: TwitterIcon,   href: "#", label: "Twitter / X" },
  { icono: LinkedinIcon,  href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}
    >

      {/* Patrón de líneas onduladas */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="footerWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footerWaves)" />
      </svg>

      {/* Orbes decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1bb5e0]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#4ac8e8]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Columna marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit">
              {/* Logo desde /public/logo.png (igual que Navbar) */}
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="TIVO"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="leading-tight">
                <span
                  className="block font-bold text-xl text-white tracking-wide"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  TIVO
                </span>
                <span className="block text-[10px] font-semibold tracking-widest uppercase text-[#7fdcf2]">
                  Movilidad compartida
                </span>
              </div>
            </Link>

            <p
              className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "Compartimos más que un viaje"
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Una plataforma de movilidad compartida que conecta a personas que desean trasladarse de forma segura, económica y confiable.
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-3">
              {redes.map((r) => {
                const Icono = r.icono;
                return (
                  <a
                    key={r.label}
                    href={r.href}
                    aria-label={r.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icono className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna navegación */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {enlaces.navegacion.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/55 hover:text-[#7fdcf2] transition-colors">
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna descubre */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Descubre
            </h4>
            <ul className="flex flex-col gap-2.5">
              {enlaces.ventajas.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/55 hover:text-[#7fdcf2] transition-colors">
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna contacto */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Phone className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <a href="tel:+51900241682" className="hover:text-[#7fdcf2] transition-colors">
                  +51 900 241 682
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Mail className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <a href="mailto:contacto@tivo.pe" className="hover:text-[#7fdcf2] transition-colors">
                  contacto@tivo.pe
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-center">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} TIVO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}