"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import UneteModal from "../UneteModal";
import { useLang } from "@/lang/LanguageContext";

// Datos NO traducibles de los slides (imágenes y acciones).
// Se combinan con los textos del idioma actual usando el `id`.
const SLIDES_CONFIG = [
  {
    id: "mock-1",
    imagen: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop",
    accion: "modal",
  },
  {
    id: "mock-2",
    imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&q=85&auto=format&fit=crop",
    accion: "link",
    href: "/seguridad",
  },
  {
    id: "mock-3",
    imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=85&auto=format&fit=crop",
    accion: "modal",
  },
];

export default function Hero() {
  const { t } = useLang();
  const tHero = t.hero;

  // Combinar config (imágenes/acciones) con textos del idioma actual
  const SLIDES_MOCK = SLIDES_CONFIG.map((cfg) => {
    const textos = tHero.slides.find((s) => s.id === cfg.id) || {};
    return { ...cfg, ...textos };
  });

  const [slides, setSlides] = useState([]);
  const [actual, setActual] = useState(0);
  const [animando, setAnimando] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    setSlides(SLIDES_MOCK);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tHero]); // ← se recarga si cambia el idioma

  const irA = useCallback((index) => {
    if (animando || index === actual || slides.length === 0) return;
    setAnimando(true);
    setTextVisible(false);
    setTimeout(() => {
      setActual(index);
      setTimeout(() => { setTextVisible(true); setAnimando(false); }, 100);
    }, 400);
  }, [animando, actual, slides.length]);

  const siguiente = useCallback(() => {
    if (slides.length === 0) return;
    irA((actual + 1) % slides.length);
  }, [actual, irA, slides.length]);

  const anterior = useCallback(() => {
    if (slides.length === 0) return;
    irA((actual - 1 + slides.length) % slides.length);
  }, [actual, irA, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(siguiente, 6000);
    return () => clearInterval(timer);
  }, [siguiente, slides.length]);

  if (loading) {
    return (
      <section
        className="relative w-full h-[100svh] min-h-[560px] flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
      >
        <div className="w-8 h-8 rounded-full border-4 border-[#4ac8e8] border-t-transparent animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section
        className="relative w-full h-[100svh] min-h-[560px] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8] animate-pulse" />
            {tHero.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 whitespace-pre-line" style={{ fontFamily: "Georgia, serif" }}>
            {tHero.tituloFallback}
          </h1>
          <p className="text-white/60 text-sm">{tHero.sinBanners}</p>
        </div>
      </section>
    );
  }

  const slideActual = slides[actual];

  return (
    <>
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden">

        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === actual ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.imagen}
              alt={slide.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#051e2e]/70 via-[#051e2e]/40 to-[#051e2e]/85 md:bg-gradient-to-r md:from-[#051e2e]/80 md:via-[#0e4a6b]/40 md:to-transparent" />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center pb-24 md:pb-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">
            <div className={`max-w-2xl transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

              <span className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
                </span>
                {tHero.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5" style={{ fontFamily: "Georgia, serif" }}>
                {slideActual.titulo}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {slideActual.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                {slideActual.cta && (
                  slideActual.accion === "modal" ? (
                    <button
                      onClick={() => setModalAbierto(true)}
                      className="group w-full sm:w-auto justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0e4a6b] hover:to-[#0f8cb8] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#1bb5e0]/30 hover:shadow-xl hover:shadow-[#1bb5e0]/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      {slideActual.cta}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={slideActual.href || "/"}
                      className="group w-full sm:w-auto justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0e4a6b] hover:to-[#0f8cb8] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#1bb5e0]/30 hover:shadow-xl hover:shadow-[#1bb5e0]/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      {slideActual.cta}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )
                )}

                <Link
                  href="/nosotros"
                  className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-sm font-semibold rounded-full border border-white/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center"
                >
                  {tHero.sobreNosotros}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={anterior}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-[#1bb5e0]/40 hover:border-[#4ac8e8]/60 transition-all duration-200 items-center justify-center"
          aria-label={tHero.aria.anterior}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={siguiente}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-[#1bb5e0]/40 hover:border-[#4ac8e8]/60 transition-all duration-200 items-center justify-center"
          aria-label={tHero.aria.siguiente}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
          <button
            onClick={anterior}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center active:bg-[#1bb5e0]/40 transition-colors"
            aria-label={tHero.aria.anterior}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => irA(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === actual ? "w-6 h-1.5 bg-[#4ac8e8]" : "w-1.5 h-1.5 bg-white/45"
                }`}
                aria-label={`${tHero.aria.irAslide} ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={siguiente}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center active:bg-[#1bb5e0]/40 transition-colors"
            aria-label={tHero.aria.siguiente}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              className={`transition-all duration-300 rounded-full ${
                i === actual ? "w-8 h-2 bg-[#4ac8e8] shadow-sm shadow-[#4ac8e8]" : "w-2 h-2 bg-white/45 hover:bg-white/70"
              }`}
              aria-label={`${tHero.aria.irAslide} ${i + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/15">
          <div
            key={actual}
            className="h-full bg-gradient-to-r from-[#1bb5e0] to-[#4ac8e8]"
            style={{ animation: "progress 6s linear forwards" }}
          />
        </div>

        <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
      </section>

      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </>
  );
}