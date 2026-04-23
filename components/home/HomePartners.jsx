"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomePartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar partners activos desde Firebase
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const q = query(
          collection(db, "partners"),
          where("active", "==", true),
          orderBy("order", "asc")
        );
        const querySnapshot = await getDocs(q);
        const partnersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPartners(partnersData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Duplicamos la lista para crear el efecto de loop infinito sin saltos
  const duplicatedPartners = [...partners, ...partners];

  if (loading) {
    return (
      <section className="w-full bg-white py-24 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-2">
              Confianza Industrial
            </span>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900 md:text-3xl">
              Empresas que confían en nosotros
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null; // No mostrar la sección si no hay partners
  }

  return (
    <section className="w-full bg-white py-24 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Título de Sección */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-2">
            Confianza Industrial
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900 md:text-3xl">
            Empresas que confían en nosotros
          </h2>
        </div>

        {/* Contenedor del Carrusel Infinito */}
        <div className="relative flex w-full">
          {/* Animación de Marquee con Framer Motion */}
          <motion.div
            className="flex gap-16 md:gap-24 items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedPartners.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex w-40 md:w-48 flex-shrink-0 items-center justify-center"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-20 md:h-24 w-auto object-contain opacity-70 transition-all duration-500 hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}