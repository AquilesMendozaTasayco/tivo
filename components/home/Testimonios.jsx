"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLang } from "@/lang/LanguageContext";

export default function Testimonios() {
  const { t } = useLang();
  const tT = t.testimonios;

  const [testimonios, setTestimonios] = useState([]);
  const [actual, setActual] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Cargar testimonios desde Firebase
  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, "testimonios"),
            orderBy("orden", "asc")
          )
        );
        const datos = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((t) => t.active !== false); // Solo activos

        setTestimonios(datos);
        setActual(0);
      } catch (error) {
        console.error("Error cargando testimonios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  // ✅ Auto-rotate cada 7 segundos
  useEffect(() => {
    if (testimonios.length <= 1) return;
    const timer = setInterval(() => {
      setActual((prev) => (prev + 1) % testimonios.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const anterior = () =>
    setActual((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const siguiente = () =>
    setActual((prev) => (prev + 1) % testimonios.length);

  return (
    <section
      id="testimonios"
      className="relative py-20 md:py-28 px-6 lg:px-10 bg-[#f5fbfe] overflow-hidden"
    >
      <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
            {tT.badge}
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-4 whitespace-pre-line"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {tT.titulo}
          </h2>
          <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
            {tT.subtitulo}
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#1bb5e0]" />
          </div>
        )}

        {/* SIN TESTIMONIOS */}
        {!loading && testimonios.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8fb0c0] text-sm">{tT.sinTestimonios}</p>
          </div>
        )}

        {/* CARRUSEL */}
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
                <Quote
                  className="absolute top-6 right-6 w-14 h-14 text-[#e8f6fb]"
                  fill="currentColor"
                />

                {/* ESTRELLAS */}
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

                {/* MENSAJE */}
                <p
                  className="text-lg md:text-xl text-[#0e2a3d] leading-relaxed mb-8 relative italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  &quot;{testimonios[actual].mensaje}&quot;
                </p>

                {/* USUARIO */}
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
                    <p
                      className="font-bold text-[#0e2a3d] text-base"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {testimonios[actual].nombre}
                    </p>
                    <p className="text-xs text-[#4a6170]">
                      {testimonios[actual].rol || tT.rolDefault}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CONTROLES */}
            {testimonios.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={anterior}
                  className="w-11 h-11 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] transition-all duration-200 flex items-center justify-center shadow-sm"
                  aria-label={tT.aria.anterior}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

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
                      aria-label={`${tT.aria.testimonio} ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={siguiente}
                  className="w-11 h-11 rounded-full bg-white border border-[#cfe7f4] text-[#0e4a6b] hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] transition-all duration-200 flex items-center justify-center shadow-sm"
                  aria-label={tT.aria.siguiente}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* BOTÓN VER MÁS */}
            <div className="flex justify-center mt-10">
              <Link
                href="/testimonios"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-[#0e4a6b] hover:bg-[#0b3a56] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              >
                {tT.verMas}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}