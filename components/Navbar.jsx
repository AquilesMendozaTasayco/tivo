"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UneteModal from "./UneteModal";

// ── Dropdown estático de Ventajas ─────────────────────────────
const ventajas = [
  { nombre: "Confianza y seguridad", href: "/seguridad" },
  { nombre: "Impacto y comunidad",   href: "/impacto" },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !scrolled && !menuAbierto;

  const abrirModal = () => {
    setModalAbierto(true);
    setMenuAbierto(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent ? "bg-transparent shadow-none" : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* ── LOGO + TEXTO ── */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="TIVO"
                  width={48}
                  height={48}
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    isTransparent
                      ? "brightness-0 invert"
                      : "brightness-100 invert-0"
                  }`}
                />
              </div>
              <div className="leading-tight">
                <span
                  className={`block font-bold text-lg tracking-wide transition-colors duration-500 ${
                    isTransparent ? "text-white" : "text-[#0e4a6b]"
                  }`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  TIVO
                </span>
                <span
                  className={`block text-[10px] font-semibold tracking-widest uppercase transition-colors duration-500 ${
                    isTransparent ? "text-white/70" : "text-[#1bb5e0]"
                  }`}
                >
                  Movilidad compartida
                </span>
              </div>
            </Link>

            {/* ── MENÚ DESKTOP ── */}
            <ul className="hidden lg:flex items-center gap-1">
              {/* Inicio */}
              <li>
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Inicio
                </Link>
              </li>

              {/* Dropdown Ventajas */}
              <li
                className="relative"
                onMouseEnter={() => setDropdownAbierto(true)}
                onMouseLeave={() => setDropdownAbierto(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Ventajas
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownAbierto ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-[#d4eef9] overflow-hidden transition-all duration-200 ${
                    dropdownAbierto
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="py-2">
                    {ventajas.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2d3748] hover:bg-[#e8f6fb] hover:text-[#0e4a6b] transition-colors duration-150"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
                        {v.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Nosotros */}
              <li>
                <Link
                  href="/nosotros"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Nosotros
                </Link>
              </li>

              {/* Reservas */}
              <li>
                <Link
                  href="/reservas"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Reservas
                </Link>
              </li>

              {/* Testimonios */}
              <li>
                <Link
                  href="/testimonios"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Testimonios
                </Link>
              </li>

              {/* Cómo funciona */}
              <li>
                <Link
                  href="/como-funciona"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Cómo funciona
                </Link>
              </li>

              {/* Contáctanos */}
              <li>
                <Link
                  href="/contactanos"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  Contáctanos
                </Link>
              </li>

              {/* CTA Únete a TIVO — abre modal */}
              <li>
                <button
                  onClick={abrirModal}
                  className={`ml-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isTransparent
                      ? "text-[#0e4a6b] bg-white hover:bg-white/90"
                      : "text-white bg-[#0e4a6b] hover:bg-[#0b3a56]"
                  }`}
                >
                  Únete a TIVO
                </button>
              </li>
            </ul>

            {/* ── BOTÓN HAMBURGUESA MOBILE ── */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isTransparent ? "text-white hover:bg-white/15" : "text-[#0e4a6b] hover:bg-[#e8f6fb]"
              }`}
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuAbierto ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── MENÚ MOBILE ── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            menuAbierto ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-[#d4eef9] px-6 py-4 flex flex-col gap-1">
            <Link
              href="/"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Inicio
            </Link>

            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
                onClick={() => setDropdownAbierto(!dropdownAbierto)}
              >
                Ventajas
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownAbierto ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownAbierto && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-[#1bb5e0] flex flex-col gap-1">
                  {ventajas.map((v) => (
                    <Link
                      key={v.href}
                      href={v.href}
                      className="px-3 py-2 text-sm text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-md transition-colors"
                      onClick={() => setMenuAbierto(false)}
                    >
                      {v.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/nosotros"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Nosotros
            </Link>

            <Link
              href="/reservas"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Reservas
            </Link>

            <Link
              href="/testimonios"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Testimonios
            </Link>

            <Link
              href="/como-funciona"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Cómo funciona
            </Link>

            <Link
              href="/contactanos"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Contáctanos
            </Link>

            <button
              onClick={abrirModal}
              className="mt-2 px-3 py-3 text-sm font-semibold text-white bg-[#0e4a6b] hover:bg-[#0b3a56] rounded-full text-center transition-all"
            >
              Únete a TIVO
            </button>
          </div>
        </div>
      </nav>

      {/* ── MODAL ÚNETE A TIVO ── */}
      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </>
  );
}