"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProductoDetalle({ params }) {
  const { slug } = use(params);
  const [producto, setProducto] = useState(null);
  const [otros, setOtros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "productos", slug));
        if (!docSnap.exists()) { setLoading(false); return; }
        const data = { id: docSnap.id, ...docSnap.data() };
        setProducto(data);

        const snapOtros = await getDocs(query(collection(db, "productos"), where("active", "==", true)));
        setOtros(
          snapOtros.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((p) => p.slug !== slug)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .slice(0, 3)
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-4 border-[#1a4a2e] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!producto) notFound();

  return (
    <div className="bg-white">

      <section className="relative w-full h-[75vh] min-h-[560px] overflow-hidden -mt-[80px]">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${producto.imagenHero})` }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${producto.color}ee 0%, ${producto.color}99 40%, transparent 100%)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: `linear-gradient(to bottom, transparent, ${producto.colorClaro}, transparent)` }}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between pt-[160px] pb-16 px-6 lg:px-16 max-w-7xl mx-auto">
          <motion.nav className="flex items-center gap-2 text-xs font-medium" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Inicio</Link>
            <span className="text-white/40">/</span>
            <Link href="/#productos" className="text-white/60 hover:text-white transition-colors">Productos</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">{producto.nombre}</span>
          </motion.nav>

          <div className="flex flex-col gap-5 max-w-2xl">
            <motion.span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold tracking-widest uppercase backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: producto.colorClaro }} />
              {producto.subtitulo}
            </motion.span>
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none drop-shadow-xl" style={{ fontFamily: "Georgia, serif" }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              {producto.nombre}
            </motion.h1>
            <motion.p className="text-white/80 text-base md:text-lg leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
              {producto.tagline}
            </motion.p>
            <motion.div className="flex flex-wrap gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}>
              {(producto.beneficiosPills || []).map((b, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: `${producto.colorClaro}30`, color: "white" }}>{b}</span>
              ))}
            </motion.div>
            <motion.div className="flex flex-wrap gap-3 mt-1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}>
              <a href="https://wa.me/51979650999" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ color: producto.color }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedir por WhatsApp
              </a>
              <Link href="/#productos" className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/25 text-sm font-semibold rounded-full backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5">
                Ver todos los productos
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <motion.div className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-4 rounded-3xl opacity-10" style={{ backgroundColor: producto.color }} />
            <div className="absolute top-6 left-6 right-0 bottom-0 rounded-3xl border-2 opacity-25" style={{ borderColor: producto.color }} />
            <div className="relative z-10 w-full h-[400px] xl:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&auto=format&fit=crop"; }} />
              <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to top, ${producto.color}, transparent)` }} />
            </div>
            <div className="absolute bottom-8 left-4 z-20 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg" style={{ backgroundColor: producto.color }}>{producto.nombre}</div>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.span
              className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: producto.colorClaro, borderColor: producto.colorClaro, color: producto.color }}
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: producto.color }} />
              {producto.subtitulo}
            </motion.span>
            <motion.h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#1a2e1f] leading-snug" style={{ fontFamily: "Georgia, serif" }}
              variants={fadeUp} custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              {producto.tagline}
            </motion.h2>
            <motion.div className="flex items-center gap-2"
              variants={fadeUp} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <div className="w-8 h-0.5" style={{ backgroundColor: producto.color }} />
              <div className="w-3 h-0.5 opacity-60" style={{ backgroundColor: producto.color }} />
              <div className="w-1.5 h-0.5 opacity-30" style={{ backgroundColor: producto.color }} />
            </motion.div>
            <motion.p className="text-[#4a5a4e] text-sm md:text-base leading-relaxed"
              variants={fadeUp} custom={0.16} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              {producto.descripcionLarga}
            </motion.p>
            <motion.div className="flex flex-wrap gap-2"
              variants={fadeUp} custom={0.22} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              {(producto.beneficiosPills || []).map((b, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{ color: producto.color, backgroundColor: producto.colorClaro, borderColor: producto.colorClaro }}>{b}</span>
              ))}
            </motion.div>
            <motion.div className="flex flex-wrap gap-3 mt-1"
              variants={fadeUp} custom={0.28} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <a href="https://wa.me/51979650999" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: producto.color }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedir por WhatsApp
              </a>
              <Link href="/contactanos" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f8fdf8] hover:bg-[#f0f7f1] text-[#1a4a2e] border border-[#c6e3cb] text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Más información
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {(producto.imagenDetalle1 || producto.imagenDetalle2) && (
        <section className="py-12 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 md:gap-6">
            {producto.imagenDetalle1 && (
              <motion.div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-96"
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <img src={producto.imagenDetalle1} alt={`${producto.nombre} detalle 1`} className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85&auto=format&fit=crop"; }} />
                <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to top, ${producto.color}, transparent)` }} />
              </motion.div>
            )}
            {producto.imagenDetalle2 && (
              <motion.div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-96"
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <img src={producto.imagenDetalle2} alt={`${producto.nombre} detalle 2`} className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85&auto=format&fit=crop"; }} />
                <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to top, ${producto.color}, transparent)` }} />
              </motion.div>
            )}
          </div>
        </section>
      )}

      <section className="py-16 px-6 lg:px-10 bg-[#f8fdf8] border-y border-[#e2f0e4]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <motion.div className="text-center flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: producto.colorClaro, borderColor: producto.colorClaro, color: producto.color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: producto.color }} />
              Propiedades y usos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>
              ¿Para qué sirve {producto.nombre}?
            </h2>
          </motion.div>

          <div className={`grid gap-8 ${(producto.usoInterno || []).length > 0 && (producto.usoExterno || []).length > 0 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto w-full"}`}>
            {(producto.usoInterno || []).length > 0 && (
              <motion.div className="bg-white rounded-2xl border border-[#e2f0e4] p-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: producto.color }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Uso Interno</h3>
                </div>
                <motion.ul className="flex flex-col gap-2.5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                  {producto.usoInterno.map((uso, i) => (
                    <motion.li key={i} className="flex items-start gap-2.5 text-sm text-[#4a5a4e]" variants={listItem}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: producto.color }} />
                      {uso}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
            {(producto.usoExterno || []).length > 0 && (
              <motion.div className="bg-white rounded-2xl border border-[#e2f0e4] p-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: producto.color }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Uso Externo</h3>
                </div>
                <motion.ul className="flex flex-col gap-2.5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                  {producto.usoExterno.map((uso, i) => (
                    <motion.li key={i} className="flex items-start gap-2.5 text-sm text-[#4a5a4e]" variants={listItem}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: producto.color }} />
                      {uso}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f7f1] border border-[#c6e3cb] text-[#1a4a2e] text-xs font-semibold tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c5c]" />
                También te puede interesar
              </span>
              <h2 className="text-2xl font-bold text-[#1a2e1f]" style={{ fontFamily: "Georgia, serif" }}>Otros productos</h2>
            </div>
            {otros.length > 0 && (
              <Link href="/#productos" className="text-sm font-semibold text-[#1a4a2e] hover:text-[#153d25] underline underline-offset-4 transition-colors">Ver todos →</Link>
            )}
          </motion.div>

          {otros.length === 0 ? (
            <motion.div className="bg-[#f8fdf8] border border-[#e2f0e4] rounded-2xl p-12 text-center flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="w-12 h-12 rounded-full bg-[#e9f5ec] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4a8c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#4a5a4e] uppercase tracking-widest">No hay otros productos disponibles</p>
              <Link href="/#productos" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a4a2e] hover:bg-[#153d25] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Ver catálogo completo
              </Link>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              {otros.map((p) => (
                <motion.div key={p.id} className="group bg-white rounded-2xl border border-[#e8f4ea] hover:border-[#4a8c5c] hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop"; }} />
                    <div className="absolute inset-0 opacity-25" style={{ backgroundColor: p.color }} />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-bold" style={{ backgroundColor: p.color }}>{p.nombre}</div>
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>{p.subtitulo}</p>
                    <p className="text-sm text-[#4a5a4e] leading-relaxed flex-1">{p.descripcionCorta}</p>
                    <Link href={`/productos/${p.slug}`} className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: p.color }}>
                      Ver producto
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
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