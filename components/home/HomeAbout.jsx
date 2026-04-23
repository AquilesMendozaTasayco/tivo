"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-10 px-6 lg:px-10 overflow-hidden">

      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=85&auto=format&fit=crop"
          alt="Fondo naturaleza"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-[#1a4a2e]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2e1a]/60 via-transparent to-[#0d2e1a]/30" />
      </div>

      {/* Patrón decorativo */}
      <div
        className="absolute inset-0 z-[1] opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #a8d5a2 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* IZQUIERDA — TEXTO */}
          <div className="flex flex-col gap-3 max-w-xl">

            <motion.span
              className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-semibold tracking-widest uppercase"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a8d5a2] animate-pulse" />
              Campo María BioLab
            </motion.span>

            <motion.h2
              className="text-xl md:text-2xl xl:text-3xl font-bold text-white leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              La naturaleza tiene{" "}
              <span className="text-[#a8d5a2]">la respuesta</span>{" "}
              que buscas
            </motion.h2>

            <motion.p
              className="text-white/75 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Nuestro equipo está listo para orientarte sobre cuál de nuestros
              fitofármacos se adapta mejor a tu necesidad. Contáctanos hoy y
              da el primer paso hacia una salud plena y natural.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {["Sin efectos secundarios", "Atención personalizada", "Envíos a todo el Perú"].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/85 bg-white/10 border border-white/20 rounded-full px-3 py-1"
                >
                  <svg className="w-3 h-3 text-[#a8d5a2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* DERECHA — BOTONES */}
          <motion.div
            className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contactanos"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-white hover:bg-[#f0f7f1] text-[#1a4a2e] text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Contáctanos ahora
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <a
              href="https://wa.me/51979650999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}