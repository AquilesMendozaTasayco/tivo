"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomeCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const snap = await getDocs(query(collection(db, "productos"), where("active", "==", true)));
        setProductos(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <section ref={ref} id="productos" className="py-16 lg:py-24 px-6 lg:px-10 bg-[#f8fdf8]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center mb-12">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e9f5ec] border border-[#c6e3cb] text-[#1a4a2e] text-xs font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c5c]" />
            Nuestros productos
          </motion.span>
          <motion.h2
            className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#1a2e1f] leading-snug mb-3"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            Cinco fitofármacos,{" "}
            <span className="text-[#1a4a2e]">infinitos beneficios</span>
          </motion.h2>
          <motion.p
            className="text-[#4a5a4e] text-sm md:text-base max-w-xl"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}>
            Extractos oleosos 100% naturales, desarrollados con rigor científico para tratar las causas de las enfermedades, no solo sus síntomas.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-[#1a4a2e] border-t-transparent animate-spin" />
          </div>
        ) : productos.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl border border-[#e2f0e4] p-16 text-center flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 rounded-full bg-[#e9f5ec] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#4a8c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#4a5a4e] uppercase tracking-widest">No hay productos disponibles</p>
            <p className="text-xs text-[#9ab5a0]">Pronto tendremos novedades para ti.</p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {/* Primera fila: 3 primeros productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.slice(0, 3).map((p) => (
                <motion.div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e8f4ea] transition-shadow duration-300 flex flex-col" variants={cardVariants}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop"; }} />
                    <div className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-20" style={{ backgroundColor: p.color }} />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md" style={{ backgroundColor: p.color }}>{p.nombre}</div>
                  </div>
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>{p.subtitulo}</p>
                    <h3 className="text-lg font-bold text-[#1a2e1f] leading-tight" style={{ fontFamily: "Georgia, serif" }}>{p.nombre}</h3>
                    <p className="text-[#4a5a4e] text-sm leading-relaxed flex-1">{p.descripcionCorta}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(p.beneficiosPills || []).slice(0, 3).map((b, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full border"
                          style={{ color: p.color, backgroundColor: p.colorClaro, borderColor: p.colorClaro }}>{b}</span>
                      ))}
                    </div>
                    <Link href={`/productos/${p.slug}`}
                      className="group/btn mt-1 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                      style={{ backgroundColor: p.color }}>
                      Ver más información
                      <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Segunda fila: últimos 2 productos centrados */}
            {productos.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                {productos.slice(3).map((p) => (
              <motion.div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e8f4ea] transition-shadow duration-300 flex flex-col" variants={cardVariants}>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop"; }} />
                  <div className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-20" style={{ backgroundColor: p.color }} />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md" style={{ backgroundColor: p.color }}>{p.nombre}</div>
                </div>
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>{p.subtitulo}</p>
                  <h3 className="text-lg font-bold text-[#1a2e1f] leading-tight" style={{ fontFamily: "Georgia, serif" }}>{p.nombre}</h3>
                  <p className="text-[#4a5a4e] text-sm leading-relaxed flex-1">{p.descripcionCorta}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(p.beneficiosPills || []).slice(0, 3).map((b, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full border"
                        style={{ color: p.color, backgroundColor: p.colorClaro, borderColor: p.colorClaro }}>{b}</span>
                    ))}
                  </div>
                  <Link href={`/productos/${p.slug}`}
                    className="group/btn mt-1 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                    style={{ backgroundColor: p.color }}>
                    Ver más información
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}