"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Reservas() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pasajeros, setPasajeros] = useState("1");

  const handleBuscar = (e) => {
    e.preventDefault();
    // Aquí luego conectas con tu lógica de búsqueda o Firestore
    console.log({ origen, destino, fecha, hora, pasajeros });
  };

  return (
    <section className="relative -mt-20 z-20 px-6 lg:px-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-3xl shadow-2xl shadow-[#0e4a6b]/15 border border-[#d4eef9] overflow-hidden"
        >
          {/* Decoración superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0e4a6b] via-[#1bb5e0] to-[#4ac8e8]" />

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0e4a6b] to-[#1bb5e0] flex items-center justify-center shadow-md shadow-[#1bb5e0]/30">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#0e2a3d]" style={{ fontFamily: "Georgia, serif" }}>
                  Encuentra tu próximo viaje
                </h2>
                <p className="text-xs text-[#4a6170]">Busca y comparte rutas con personas verificadas</p>
              </div>
            </div>

            <form onSubmit={handleBuscar} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Origen */}
              <div className="lg:col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b] mb-1.5">Desde</label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors" />
                  <input
                    type="text"
                    placeholder="Origen"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                  />
                </div>
              </div>

              {/* Destino */}
              <div className="lg:col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b] mb-1.5">Hacia</label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors" />
                  <input
                    type="text"
                    placeholder="Destino"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] placeholder-[#8fb0c0] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                  />
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b] mb-1.5">Fecha</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors pointer-events-none" />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                  />
                </div>
              </div>

              {/* Hora */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0e4a6b] mb-1.5">Hora</label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8fb0c0] group-focus-within:text-[#1bb5e0] transition-colors pointer-events-none" />
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-[#cfe7f4] bg-[#f5fbfe] text-sm text-[#0e2a3d] outline-none focus:border-[#1bb5e0] focus:ring-2 focus:ring-[#1bb5e0]/20 transition-all"
                  />
                </div>
              </div>

              {/* Botón buscar */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-[#0e4a6b] to-[#1bb5e0] hover:from-[#0e4a6b] hover:to-[#0f8cb8] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#1bb5e0]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Buscar viaje
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            {/* Pasajeros - extra row */}
            <div className="flex items-center gap-2 mt-4 text-xs text-[#4a6170]">
              <Users className="w-3.5 h-3.5 text-[#1bb5e0]" />
              <span className="font-medium">Pasajeros:</span>
              <select
                value={pasajeros}
                onChange={(e) => setPasajeros(e.target.value)}
                className="bg-transparent font-semibold text-[#0e4a6b] outline-none cursor-pointer"
              >
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}