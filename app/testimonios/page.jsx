"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { Quote, Star, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLang } from "@/lang/LanguageContext";

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
  const { t } = useLang();
  const tTP = t.testimoniosPage;

  const [testimonios, setTestimonios] = useState([]);
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
      } catch (error) {
        console.error("Error cargando testimonios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  return (
    <div className="bg-white">
      {/* HERO */}
      <PageHero
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop"
        title={tTP.hero.title}
        breadcrumb={tTP.hero.breadcrumb}
      />

      {/* INTRO */}
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
              {tTP.intro.badge}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e2a3d] mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tTP.intro.titulo}{" "}
              <span className="text-[#0e4a6b] italic">{tTP.intro.tituloSpan}</span>
            </h2>
            <p className="text-[#4a6170] text-base md:text-lg leading-relaxed">
              {tTP.intro.descripcion}
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-20 md:pb-28 px-6 lg:px-10 bg-[#f5fbfe] pt-8 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-[#d4eef9] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[#e8f6fb] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* LOADING */}
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#1bb5e0]" />
            </div>
          )}

          {/* SIN TESTIMONIOS */}
          {!loading && testimonios.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#8fb0c0] text-sm">{tTP.sinTestimonios}</p>
            </div>
          )}

          {/* GRID DE TESTIMONIOS */}
          {!loading && testimonios.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {testimonios.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardItem}
                  className="relative bg-white rounded-2xl shadow-md shadow-[#0e4a6b]/5 border border-[#d4eef9] p-6 md:p-7 flex flex-col gap-4 hover:shadow-xl hover:shadow-[#1bb5e0]/15 hover:border-[#1bb5e0] hover:-translate-y-1 transition-all duration-300"
                >
                  <Quote
                    className="absolute top-5 right-5 w-10 h-10 text-[#e8f6fb]"
                    fill="currentColor"
                  />

                  {/* ESTRELLAS */}
                  <div className="flex items-center gap-1 relative">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5)
                            ? "text-[#1bb5e0] fill-[#1bb5e0]"
                            : "text-[#cfe7f4]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* MENSAJE */}
                  <p
                    className="text-sm md:text-base text-[#0e2a3d] leading-relaxed italic flex-1 relative"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    &quot;{item.mensaje}&quot;
                  </p>

                  {/* SEPARADOR */}
                  <div className="w-full h-px bg-gradient-to-r from-[#cfe7f4] via-[#e8f6fb] to-transparent" />

                  {/* USUARIO */}
                  <div className="flex items-center gap-3">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nombre}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#cfe7f4]"
                      />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {item.nombre?.charAt(0) || "T"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p
                        className="font-bold text-[#0e2a3d] text-sm truncate"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {item.nombre}
                      </p>
                      <p className="text-xs text-[#4a6170] truncate">
                        {item.rol || tTP.rolDefault}
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