"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Filter, Inbox, Users, Gauge, Fuel, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
// Importamos la data local de carros
import { carros } from "@/data/carros"; 

export default function FlotaPage() {
  const [search, setSearch] = useState("");
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [page, setPage] = useState(1);

  // Obtener marcas únicas para el filtro
  const marcas = useMemo(() => {
    return Array.from(new Set(carros.map(c => c.marca)));
  }, []);

  const perPage = 6;

  // Filtrado de vehículos
  const filtered = useMemo(() => {
    return carros.filter((c) => {
      const matchesSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
      const matchesMarca = selectedMarca ? c.marca === selectedMarca : true;
      return matchesSearch && matchesMarca;
    });
  }, [search, selectedMarca]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-white">
      {/* Imagen de carro para el Hero */}
      <PageHero image="/flota/kia-sorento2.png" title="Nuestra Flota" breadcrumb="Vehículos" />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-16">
          
          {/* SIDEBAR TÉCNICO */}
          <aside className="mb-12 w-full flex-shrink-0 lg:mb-0 lg:w-[300px]">
            <div className="sticky top-28 space-y-10">
              
              {/* Buscador */}
              <div className="group relative">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block">Buscar Modelo</label>
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="EJ: KIA SORENTO..."
                  className="w-full border-b-2 border-slate-900 bg-transparent py-4 text-sm font-black uppercase tracking-tighter outline-none transition-all focus:border-[#1e3a8a]"
                />
                <Search className="absolute right-0 bottom-4 h-5 w-5 text-slate-900" />
              </div>

              {/* Filtro de Marcas */}
              <div className="border border-slate-100 bg-slate-50 p-8">
                <div className="mb-6 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#1e3a8a]" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                    Filtrar por Marca
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => { setSelectedMarca(null); setPage(1); }}
                    className={`w-full text-left py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all ${!selectedMarca ? 'bg-[#1e3a8a] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                  >
                    Todos los modelos
                  </button>
                  
                  {marcas.map((marca) => (
                    <button
                      key={marca}
                      onClick={() => { setSelectedMarca(marca); setPage(1); }}
                      className={`w-full text-left py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all ${selectedMarca === marca ? 'bg-[#1e3a8a] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                    >
                      {marca}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* GRILLA DE VEHÍCULOS */}
          <main className="flex-1">
            <div className="mb-12 flex flex-col justify-between gap-4 border-b border-slate-100 pb-8 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-6xl">
                  {selectedMarca || "Modelos"}
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-1 w-12 bg-[#1e3a8a]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]">
                    {filtered.length} Unidades Disponibles
                  </p>
                </div>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid gap-10 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {current.map((carro) => (
                    <motion.div
                      layout
                      key={carro.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Link
                        href={`/reservas/${carro.id}`}
                        className="group flex flex-col bg-white border border-slate-100 hover:border-slate-900 transition-all duration-500 hover:shadow-2xl"
                      >
                        {/* Imagen con badge de precio en SOLES */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 p-8">
                          <Image
                            src={carro.imagen}
                            alt={carro.nombre}
                            fill
                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-0 right-0 bg-slate-900 p-4 text-white">
                            <span className="block text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Día desde</span>
                            <span className="text-xl font-black leading-none text-nowrap">S/ {carro.precio}</span>
                          </div>
                        </div>

                        {/* Info Técnica */}
                        <div className="p-8">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]">
                            {carro.marca} • RENTALS
                          </span>
                          <h3 className="mt-2 text-2xl font-black uppercase tracking-tighter text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                            {carro.nombre}
                          </h3>
                          
                          <div className="mt-6 grid grid-cols-3 gap-4 border-y border-slate-50 py-4">
                            <div className="flex flex-col items-center gap-1">
                              <Users size={14} className="text-slate-300" />
                              <span className="text-[9px] font-black text-slate-900 uppercase">{carro.pasajeros} PAX</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 border-x border-slate-50">
                              <Gauge size={14} className="text-slate-300" />
                              <span className="text-[9px] font-black text-slate-900 uppercase">{carro.transmision}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <Fuel size={14} className="text-slate-300" />
                              <span className="text-[9px] font-black text-slate-900 uppercase">{carro.combustible}</span>
                            </div>
                          </div>

                          <div className="mt-8 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                               <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Disponible</span>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-[#1e3a8a]">
                               Reservar <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                             </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                <Inbox className="h-16 w-16 stroke-1 mb-4" />
                <p className="font-black uppercase tracking-widest text-xs italic">No se encontraron unidades</p>
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center border-t border-slate-100 pt-12">
                <nav className="flex gap-4">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-12 w-12 text-[10px] font-black transition-all border ${
                        page === i + 1 
                        ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                        : "bg-white text-slate-400 border-slate-200 hover:border-slate-900 hover:text-slate-900"
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}