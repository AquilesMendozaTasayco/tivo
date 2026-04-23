"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar, ArrowRight, Hash, Tag } from "lucide-react";

export default function Novedades() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const q = query(
          collection(db, "novedades"),
          where("active", "!=", false),
          orderBy("active"),
          orderBy("fecha", "desc")
        );
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error fetching novedades:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
        title="Novedades"
        breadcrumb="News & Trends"
      />

      <section className="bg-[#fcfcfc] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none select-none">
          <span className="text-[20vw] font-black absolute -left-20 top-20">DRIVE</span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">

          {/* Cabecera */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#1e3a8a]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1e3a8a]">
                Camanx Intelligence
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 md:text-6xl leading-[0.85]">
              Reportes de <br /> <span className="text-[#1e3a8a]">Vanguardia</span>
            </h2>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">No hay novedades disponibles</p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid gap-px bg-slate-200 border border-slate-200 shadow-2xl md:grid-cols-2 lg:grid-cols-3">
                {items.map((n, index) => (
                  <motion.article
                    key={n.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col bg-white transition-all duration-500 hover:z-10"
                  >
                    {/* Imagen */}
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={n.imagenPrincipal}
                        alt={n.titulo}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      />
                      <div className="absolute left-6 top-6 bg-slate-900 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {n.categoria}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col p-10">
                      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-[#1e3a8a]" />
                          {n.fecha}
                        </span>
                        <span className="flex items-center gap-2">
                          <Hash className="h-3 w-3 text-[#1e3a8a]" />
                          ID-{(n.id || "").toString().slice(-4).toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-xl font-black uppercase tracking-tighter leading-[1.1] text-slate-900 transition-colors group-hover:text-[#1e3a8a]">
                        <Link href={`/novedades/${n.slug}`}>{n.titulo}</Link>
                      </h3>

                      <p className="mt-5 line-clamp-2 text-xs leading-relaxed text-slate-500 font-medium">
                        {n.extracto}
                      </p>

                      <div className="mt-auto pt-10 flex items-center justify-between">
                        <Link
                          href={`/novedades/${n.slug}`}
                          className="group/btn inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900"
                        >
                          <span className="relative">
                            Ver Reporte
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1e3a8a] transition-all group-hover/btn:w-full" />
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                        </Link>

                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#1e3a8a] transition-colors">
                          <Tag className="h-3 w-3 text-slate-300 group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Actualización constante del ecosistema Camanx
                </p>
                <div className="flex gap-2">
                  <div className="h-1.5 w-8 bg-[#1e3a8a]" />
                  <div className="h-1.5 w-4 bg-slate-200" />
                  <div className="h-1.5 w-4 bg-slate-200" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}