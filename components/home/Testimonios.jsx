"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// ── FIREBASE: descomentar cuando se configure ─────────────────
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── TESTIMONIOS ESTÁTICOS DE PRUEBA ───────────────────────────
// Cuando Firebase esté configurado, estos datos vendrán de la colección "testimonios".
// Textos reales extraídos del documento oficial de TIVO.
const TESTIMONIOS_MOCK = [
  {
    id: "mock-1",
    nombre: "María Fernández",
    rol: "Usuaria TIVO · Lima",
    mensaje:
      "Antes mi trayecto era aburrido y solitario. Hoy comparto el viaje con personas increíbles y hasta he hecho amistades.",
    rating: 5,
    foto: null,
  },
  {
    id: "mock-2",
    nombre: "Carlos Ramírez",
    rol: "Usuario TIVO · Lima",
    mensaje:
      "Gracias a TIVO, ahora gasto menos en transporte y me siento más tranquilo viajando acompañado.",
    rating: 5,
    foto: null,
  },
  {
    id: "mock-3",
    nombre: "Lucía Torres",
    rol: "Usuaria TIVO · Lima",
    mensaje:
      "La verificación de usuarios me dio mucha confianza. Ahora mi ruta diaria ya no se siente sola.",
    rating: 5,
    foto: null,
  },
];

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [actual, setActual] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        // ── FIREBASE: descomentar cuando se configure ─────────────
        // const snap = await getDocs(
        //   query(
        //     collection(db, "testimonios"),
        //     where("active", "==", true),
        //     orderBy("orden", "asc")
        //   )
        // );
        // const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // setTestimonios(data.length > 0 ? data : TESTIMONIOS_MOCK);

        // ── MOCK: usar datos estáticos mientras tanto ─────────────
        setTestimonios(TESTIMONIOS_MOCK);
      } catch (e) {
        console.error(e);
        setTestimonios(TESTIMONIOS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Auto-play cada 7 segundos
  useEffect(() => {
    if (testimonios.length <= 1) return;
    const timer = setInterval(() => {
      setActual((prev) => (prev + 1) % testimonios.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const anterior = () => setActual((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const siguiente = () => setActual((prev) => (prev + 1) % testimonios.length);

  return (
    <section id="testimonios" className="relative py-20 md:py-28 px-6 lg:px-10 bg-[#f5fbfe] overflow-hidden">

      {/* Decoración */}
      <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
            Historias reales
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Cada viaje tiene<br />una historia
          </h2>
          <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
            Miles de personas ya están cambiando su forma de moverse. Tú también puedes ser parte de esta comunidad.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-4 border-[#1bb5e0] border-t-transparent animate-spin" />
          </div>
        )}

        {/* Sin testimonios */}
        {!loading && testimonios.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8fb0c0] text-sm">Aún no hay testimonios publicados.</p>
          </div>
        )}

        {/* Carrusel */}
        {!loading && testimonios.length > 0 && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonios[actual].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-3xl shadow-xl shadow-[#0e4a6b]/10 border border-[#d4eef9] p-8 md:p-12 max-w-4xl mx-auto"
              >
                {/* Quote icon decorativo */}
                <Quote className="absolute top-6 right-6 w-14 h-14 text-[#e8f6fb]" fill="currentColor" />

                {/* Estrellas */}
                <div className="flex items-center gap-1 mb-5 relative">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (testimonios[actual].rating || 5)
                          ? "text-[#1bb5e0] fill-[#1bb5e0]"
                          : "text-[#cfe7f4]"
                      }`}
                    />
                  ))}
                </div>

                {/* Texto */}
                <p
                  className="text-lg md:text-xl text-[#0e2a3d] leading-relaxed mb-8 relative italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "{testimonios[actual].mensaje}"
                </p>

                {/* Autor */}
                <div className="flex items-center gap-4">
                  {testimonios[actual].foto ? (
                    <img
                      src={testimonios[actual].foto}
                      alt={testimonios[actual].nombre}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#cfe7f4]"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center text-white font-bold text-lg"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {testimonios[actual].nombre?.charAt(0) || "T"}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#0e2a3d] text-base" style={{ fontFamily: "Georgia, serif" }}>
                      {testimonios[actual].nombre}
                    </p>
                    <p className="text-xs text-[#4a6170]">
                      {testimonios[actual].rol || "Usuario TIVO"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            {testimonios.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={anterior}
                  className="w-11 h-11 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] transition-all duration-200 flex items-center justify-center shadow-sm"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2 px-3">
                  {testimonios.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActual(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === actual
                          ? "w-8 h-2 bg-[#1bb5e0]"
                          : "w-2 h-2 bg-[#cfe7f4] hover:bg-[#8fb0c0]"
                      }`}
                      aria-label={`Testimonio ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={siguiente}
                  className="w-11 h-11 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] transition-all duration-200 flex items-center justify-center shadow-sm"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Botón "Ver más testimonios" */}
            <div className="flex justify-center mt-10">
              <Link
                href="/testimonios"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              >
                Ver más testimonios
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}