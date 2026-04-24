"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
// ── FIREBASE: descomentar cuando se configure ─────────────────
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import UneteModal from "../UneteModal";

// ── SLIDES ESTÁTICOS DE PRUEBA ────────────────────────────────
// Cuando Firebase esté configurado, estos datos vendrán de la colección "banners".
// Mientras tanto, se usan estas imágenes reales de Unsplash (personas compartiendo viaje).
const SLIDES_MOCK = [
  {
    id: "mock-1",
    titulo: "Comparte el camino, conecta con personas",
    subtitulo:
      "En TIVO creamos una nueva forma de moverte por la ciudad, donde cada viaje es una oportunidad para conectar, ahorrar y sentirte seguro. Muévete mejor, acompañado.",
    imagen: "/img7.jpg",
    cta: "Únete a TIVO",
    accion: "modal", // abre el modal Únete a TIVO
  },
  {
    id: "mock-2",
    titulo: "Tu tranquilidad es parte del viaje",
    subtitulo:
      "Todos los usuarios en TIVO pasan por un proceso de verificación. Revisa perfiles, calificaciones y elige con quién viajar. Nos preocupamos por ti en cada trayecto.",
    imagen: "/img8.jpg",
    cta: "Conoce más",
    accion: "link",
    href: "/seguridad",
  },
  {
    id: "mock-3",
    titulo: "Juntos movemos la ciudad de otra forma",
    subtitulo:
      "Cada viaje compartido reduce autos en las calles, disminuye la contaminación y crea una ciudad más conectada. No solo compartes un viaje, construyes comunidad.",
    imagen: "/img9.jpg",
    cta: "Únete a TIVO",
    accion: "modal",
  },
];

export default function Hero() {
  const [slides,     setSlides]     = useState([]);
  const [actual,     setActual]     = useState(0);
  const [animando,   setAnimando]   = useState(false);
  const [textVisible,setTextVisible]= useState(true);
  const [loading,    setLoading]    = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        // ── FIREBASE: descomentar cuando se configure ─────────────
        // const snap = await getDocs(
        //   query(
        //     collection(db, "banners"),
        //     where("active", "==", true),
        //     orderBy("orden", "asc")
        //   )
        // );
        // const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // setSlides(data.length > 0 ? data : SLIDES_MOCK);

        // ── MOCK: usar datos estáticos mientras tanto ─────────────
        setSlides(SLIDES_MOCK);
      } catch (e) {
        console.error(e);
        // Fallback a mock si Firebase falla
        setSlides(SLIDES_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

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

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(siguiente, 6000);
    return () => clearInterval(timer);
  }, [siguiente, slides.length]);

  // ── Loading ─────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
      >
        <div className="w-8 h-8 rounded-full border-4 border-[#4ac8e8] border-t-transparent animate-spin" />
      </section>
    );
  }

  // ── Sin banners (por si el array queda vacío) ───────────────
  if (slides.length === 0) {
    return (
      <section
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%)" }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#1bb5e0]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#4ac8e8]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ac8e8] animate-pulse" />
            TIVO · Movilidad compartida
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Compartimos más<br />que un viaje
          </h1>
          <p className="text-white/60 text-sm">No hay banners activos.</p>
        </div>
      </section>
    );
  }

  const slideActual = slides[actual];

  return (
    <>
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

        {/* Slides de fondo */}
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
                // Fallback si la imagen no carga
                e.target.src = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop";
              }}
            />
            {/* Overlay lateral (para legibilidad del texto) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#051e2e]/80 via-[#0e4a6b]/40 to-transparent" />
            {/* Overlay inferior (para controles) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051e2e]/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Contenido central */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className={`max-w-2xl transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

              {/* Badge superior */}
              <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-semibold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ac8e8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ac8e8]"></span>
                </span>
                TIVO · Movilidad compartida
              </span>

              {/* Título dinámico */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
                {slideActual.titulo}
              </h1>

              {/* Subtítulo dinámico */}
              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                {slideActual.subtitulo}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {/* Botón principal: si es "modal" abre el modal, si es "link" navega */}
                {slideActual.cta && (
                  slideActual.accion === "modal" ? (
                    <button
                      onClick={() => setModalAbierto(true)}
                      className="group px-7 py-3.5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0e4a6b] hover:to-[#0f8cb8] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#1bb5e0]/30 hover:shadow-xl hover:shadow-[#1bb5e0]/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      {slideActual.cta}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={slideActual.href || "/"}
                      className="group px-7 py-3.5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0e4a6b] hover:to-[#0f8cb8] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#1bb5e0]/30 hover:shadow-xl hover:shadow-[#1bb5e0]/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      {slideActual.cta}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )
                )}

                {/* Botón secundario: siempre "Sobre nosotros" */}
                <Link
                  href="/nosotros"
                  className="px-7 py-3.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-sm font-semibold rounded-full border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sobre nosotros
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Flechas laterales */}
        <button
          onClick={() => irA((actual - 1 + slides.length) % slides.length)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-[#1bb5e0]/40 hover:border-[#4ac8e8]/60 transition-all duration-200 flex items-center justify-center"
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => irA((actual + 1) % slides.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-[#1bb5e0]/40 hover:border-[#4ac8e8]/60 transition-all duration-200 flex items-center justify-center"
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores (dots) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              className={`transition-all duration-300 rounded-full ${
                i === actual
                  ? "w-8 h-2 bg-[#4ac8e8] shadow-sm shadow-[#4ac8e8]"
                  : "w-2 h-2 bg-white/45 hover:bg-white/70"
              }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Barra de progreso inferior */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/15">
          <div
            key={actual}
            className="h-full bg-gradient-to-r from-[#1bb5e0] to-[#4ac8e8]"
            style={{ animation: "progress 6s linear forwards" }}
          />
        </div>

        <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
      </section>

      {/* Modal Únete a TIVO */}
      <UneteModal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </>
  );
}