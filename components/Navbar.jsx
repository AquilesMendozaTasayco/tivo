"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UneteModal from "./UneteModal";
import { useLang } from "@/lang/LanguageContext";
import LanguageSwitcher from "@/lang/LanguageSwitcher";

export default function Navbar() {
  const { t } = useLang();
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

  const tNav = t.navbar;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent ? "bg-transparent shadow-none" : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-20 gap-3">

            {/* ── LOGO + TEXTO ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* CAMBIO: logo aumentado de w-11 h-11 (44px) a w-14 h-14 (56px) */}
              <div className="relative w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt={tNav.logo.nombre}
                  width={56}
                  height={56}
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    isTransparent ? "brightness-0 invert" : "brightness-100 invert-0"
                  }`}
                />
              </div>
              <div className="leading-tight hidden sm:block">
                <span
                  className={`block font-bold text-base lg:text-lg tracking-wide transition-colors duration-500 ${
                    isTransparent ? "text-white" : "text-[#0e4a6b]"
                  }`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {tNav.logo.nombre}
                </span>
                {/* CAMBIO: slogan visible desde sm (antes solo xl) */}
                <span
                  className={`block text-[9px] font-semibold tracking-widest uppercase transition-colors duration-500 whitespace-nowrap ${
                    isTransparent ? "text-white/70" : "text-[#1bb5e0]"
                  }`}
                >
                  {tNav.logo.slogan}
                </span>
              </div>
            </Link>

            {/* ── MENÚ DESKTOP ── */}
            <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-end">
              {/* Inicio */}
              <li>
                <Link
                  href="/"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.inicio}
                </Link>
              </li>

              {/* Dropdown Ventajas */}
              <li
                className="relative"
                onMouseEnter={() => setDropdownAbierto(true)}
                onMouseLeave={() => setDropdownAbierto(false)}
              >
                <button
                  className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.ventajas}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownAbierto ? "rotate-180" : ""}`}
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
                    {tNav.ventajas.map((v) => (
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

              {/* Servicios */}
              <li>
                <Link
                  href="/servicios"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.servicios}
                </Link>
              </li>

              {/* Nosotros */}
              <li>
                <Link
                  href="/nosotros"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.nosotros}
                </Link>
              </li>

              {/* Reservas */}
              <li>
                <Link
                  href="/reservas"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.reservas}
                </Link>
              </li>

              {/* Testimonios */}
              <li>
                <Link
                  href="/testimonios"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.testimonios}
                </Link>
              </li>

              {/* Cómo funciona */}
              <li>
                <Link
                  href="/como-funciona"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.comoFunciona}
                </Link>
              </li>

              {/* Contáctanos */}
              <li>
                <Link
                  href="/contactanos"
                  className={`px-2.5 py-2 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-white hover:bg-white/15"
                      : "text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb]"
                  }`}
                >
                  {tNav.menu.contactanos}
                </Link>
              </li>

              {/* SELECTOR DE IDIOMA */}
              <li className="ml-1.5">
                <LanguageSwitcher variant={isTransparent ? "light" : "dark"} />
              </li>

              {/* CTA Únete a TIVO */}
              <li>
                <button
                  onClick={abrirModal}
                  className={`ml-1.5 px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? "text-[#0e4a6b] bg-white hover:bg-white/90"
                      : "text-white bg-[#0e4a6b] hover:bg-[#0b3a56]"
                  }`}
                >
                  {tNav.cta}
                </button>
              </li>
            </ul>

            {/* ── MOBILE: SELECTOR + HAMBURGUESA ── */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher variant={isTransparent ? "light" : "dark"} compact />

              <button
                className={`p-2 rounded-lg transition-colors ${
                  isTransparent ? "text-white hover:bg-white/15" : "text-[#0e4a6b] hover:bg-[#e8f6fb]"
                }`}
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label={menuAbierto ? tNav.aria.cerrarMenu : tNav.aria.abrirMenu}
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
        </div>

        {/* ── MENÚ MOBILE ── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            menuAbierto ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-[#d4eef9] px-6 py-4 flex flex-col gap-1">
            <Link
              href="/"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.inicio}
            </Link>

            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
                onClick={() => setDropdownAbierto(!dropdownAbierto)}
              >
                {tNav.menu.ventajas}
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
                  {tNav.ventajas.map((v) => (
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

            {/* Servicios mobile */}
            <Link
              href="/servicios"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.servicios}
            </Link>

            <Link
              href="/nosotros"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.nosotros}
            </Link>

            <Link
              href="/reservas"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.reservas}
            </Link>

            <Link
              href="/testimonios"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.testimonios}
            </Link>

            <Link
              href="/como-funciona"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.comoFunciona}
            </Link>

            <Link
              href="/contactanos"
              className="px-3 py-3 text-sm font-medium text-[#2d3748] hover:text-[#0e4a6b] hover:bg-[#e8f6fb] rounded-lg transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              {tNav.menu.contactanos}
            </Link>

            <button
              onClick={abrirModal}
              className="mt-2 px-3 py-3 text-sm font-semibold text-white bg-[#0e4a6b] hover:bg-[#0b3a56] rounded-full text-center transition-all"
            >
              {tNav.cta}
            </button>
          </div>
        </div>
      </nav>

      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </>
  );
}