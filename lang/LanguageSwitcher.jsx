"use client";

import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { useLang, IDIOMAS_DISPONIBLES } from "./LanguageContext";

/**
 * ──────────────────────────────────────────────────────────────────────
 *  LanguageSwitcher — Selector de idioma con banderas SVG
 * ──────────────────────────────────────────────────────────────────────
 *
 *  Props:
 *  - variant: "light" | "dark"
 *  - compact: boolean (true = solo bandera, false = bandera + código)
 * ──────────────────────────────────────────────────────────────────────
 */

// ── Bandera España (SVG inline, nítida en cualquier zoom) ──
const FlagES = (props) => (
  <svg viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="750" height="500" fill="#AA151B" />
    <rect width="750" height="250" y="125" fill="#F1BF00" />
  </svg>
);

// ── Bandera Reino Unido (SVG inline) ──
const FlagGB = (props) => (
  <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" {...props}>
    <clipPath id="gb-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="gb-clip2">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#gb-clip)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-clip2)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

// Mapa code → componente bandera
const banderas = {
  es: FlagES,
  en: FlagGB,
};

export default function LanguageSwitcher({ variant = "dark", compact = false }) {
  const { lang, setLang } = useLang();
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const idiomaActual = IDIOMAS_DISPONIBLES.find((i) => i.code === lang) || IDIOMAS_DISPONIBLES[0];
  const BanderaActual = banderas[idiomaActual.code];

  const estilosBoton =
    variant === "light"
      ? "text-white hover:bg-white/15 border-white/25"
      : "text-[#0e4a6b] hover:bg-[#e8f6fb] border-[#cfe7f4]";

  return (
    <div className="relative" ref={ref}>
      {/* Botón principal */}
      <button
        onClick={() => setAbierto(!abierto)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-semibold rounded-full border transition-all duration-200 ${estilosBoton}`}
        aria-label="Cambiar idioma"
      >
        {/* Bandera redonda */}
        <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
          <BanderaActual className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" />
        </span>

        {!compact && (
          <span className="uppercase tracking-wider text-[11px] font-bold">
            {idiomaActual.code}
          </span>
        )}

        <svg
          className={`w-3 h-3 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#d4eef9] overflow-hidden transition-all duration-200 z-50 ${
          abierto
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-1.5">
          {IDIOMAS_DISPONIBLES.map((idioma) => {
            const seleccionado = idioma.code === lang;
            const Bandera = banderas[idioma.code];
            return (
              <button
                key={idioma.code}
                onClick={() => {
                  setLang(idioma.code);
                  setAbierto(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                  seleccionado
                    ? "bg-[#e8f6fb] text-[#0e4a6b] font-semibold"
                    : "text-[#2d3748] hover:bg-[#f5fbfe] hover:text-[#0e4a6b]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                    <Bandera className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" />
                  </span>
                  <span>{idioma.nombre}</span>
                </span>
                {seleccionado && <Check className="w-4 h-4 text-[#1bb5e0]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}