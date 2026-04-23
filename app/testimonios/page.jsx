"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
// ── FIREBASE: descomentar cuando se configure ─────────────────
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import { Quote, Star } from "lucide-react";

// ── TESTIMONIOS ESTÁTICOS DE PRUEBA ───────────────────────────
// Cuando Firebase esté configurado, estos datos vendrán de la colección "testimonios".
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
  {
    id: "mock-4",
    nombre: "Andrés Morales",
    rol: "Conductor TIVO · Lima",
    mensaje:
      "Compartir mi auto con TIVO me ayuda a cubrir el costo del combustible y además conozco personas nuevas en cada viaje.",
    rating: 5,
    foto: null,
  },
  {
    id: "mock-5",
    nombre: "Sofía Delgado",
    rol: "Usuaria TIVO · Lima",
    mensaje:
      "El sistema de calificaciones es excelente. Puedo elegir con quién viajar y eso me da mucha seguridad.",
    rating: 5,
    foto: null,
  },
  {
    id: "mock-6",
    nombre: "Jorge Mendoza",
    rol: "Usuario TIVO · Lima",
    mensaje:
      "Más que una app de movilidad, TIVO es una comunidad. Los viajes son ahora parte de mi día favorita.",
    rating: 4,
    foto: null,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TestimoniosPage() {
  const [testimonios, setTestimonios] = useState([]);
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

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title="Historias reales"
        breadcrumb="Testimonios"
      />

      {/* SECCIÓN INTRO */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f6fb] border border-[#cfe7f4] text-[#0e4a6b] text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bb5e0]" />
              Testimonios de la comunidad
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Cada viaje tiene{" "}
              <span className="text-[#0e4a6b] italic">una historia</span>
            </h2>
            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
              Miles de personas ya están cambiando su forma de moverse en Lima. Estas son algunas de las
              experiencias reales de nuestra comunidad TIVO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID DE TESTIMONIOS */}
      <section className="pb-20 md:pb-28 px-6 lg:px-10 bg-[#f5fbfe] pt-8 relative overflow-hidden">

        {/* Decoración */}
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">

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

          {/* Grid */}
          {!loading && testimonios.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {testimonios.map((t) => (
                <motion.div
                  key={t.id}
                  variants={cardItem}
                  className="relative bg-white rounded-2xl shadow-md shadow-[#0e4a6b]/5 border border-[#d4eef9] p-6 md:p-7 flex flex-col gap-4 hover:shadow-xl hover:shadow-[#1bb5e0]/15 hover:border-[#1bb5e0] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Quote decorativo */}
                  <Quote className="absolute top-5 right-5 w-10 h-10 text-[#e8f6fb]" fill="currentColor" />

                  {/* Estrellas */}
                  <div className="flex items-center gap-1 relative">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (t.rating || 5)
                            ? "text-[#1bb5e0] fill-[#1bb5e0]"
                            : "text-[#cfe7f4]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Mensaje */}
                  <p
                    className="text-sm md:text-base text-[#0e2a3d] leading-relaxed italic flex-1 relative"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    "{t.mensaje}"
                  </p>

                  {/* Línea separadora */}
                  <div className="w-full h-px bg-gradient-to-r from-[#cfe7f4] via-[#e8f6fb] to-transparent" />

                  {/* Autor */}
                  <div className="flex items-center gap-3">
                    {t.foto ? (
                      <img
                        src={t.foto}
                        alt={t.nombre}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#cfe7f4]"
                      />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {t.nombre?.charAt(0) || "T"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p
                        className="font-bold text-[#0e2a3d] text-sm truncate"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {t.nombre}
                      </p>
                      <p className="text-xs text-[#4a6170] truncate">
                        {t.rol || "Usuario TIVO"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}