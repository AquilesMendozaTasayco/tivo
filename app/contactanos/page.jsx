"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLang } from "@/lang/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const tF = t.footer;

  // ── Estado para datos de Firebase ──
  const [datosContacto, setDatosContacto] = useState(null);
  const [redesSociales, setRedesSociales] = useState({});

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // 📍 Contacto (teléfono, correo, dirección)
        const contactoSnap = await getDocs(collection(db, "contacto"));
        if (contactoSnap.docs.length > 0) {
          setDatosContacto(contactoSnap.docs[0].data());
        }

        // 🌐 Redes sociales (con paths SVG y href)
        const redesSnap = await getDocs(collection(db, "redesSociales"));
        if (redesSnap.docs.length > 0) {
          setRedesSociales(redesSnap.docs[0].data());
        }
      } catch (error) {
        console.error("Error cargando datos del footer:", error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #051e2e 0%, #0e4a6b 100%)" }}
    >

      {/* Patrón de líneas onduladas */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="footerWaves" x="0" y="0" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 70 Q 50 30, 100 70 T 200 70" stroke="#a2dcf0" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footerWaves)" />
      </svg>

      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1bb5e0]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#4ac8e8]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Columna marca */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt={tF.logo.nombre}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="leading-tight">
                <span
                  className="block font-bold text-xl text-white tracking-wide"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {tF.logo.nombre}
                </span>
                <span className="block text-[10px] font-semibold tracking-widest uppercase text-[#7fdcf2]">
                  {tF.logo.slogan}
                </span>
              </div>
            </Link>

            <p
              className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &quot;{tF.fraseItalic}&quot;
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              {tF.descripcion}
            </p>

            {/* ── REDES SOCIALES desde Firebase ── */}
            <div className="flex items-center gap-3 flex-wrap">
              {Object.entries(redesSociales).map(([key, red]) => {
                if (!red?.href || !red?.path) return null;

                return (
                  <a
                    key={key}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.nombre || key}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={red.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna navegación */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tF.titulos.navegacion}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {tF.navegacion.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/55 hover:text-[#7fdcf2] transition-colors">
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna descubre */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tF.titulos.descubre}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {tF.ventajas.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/55 hover:text-[#7fdcf2] transition-colors">
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna servicio al cliente */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tF.titulos.servicio}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {tF.servicio.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/55 hover:text-[#7fdcf2] transition-colors">
                    {e.nombre}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/libro-de-reclamaciones"
              className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#7fdcf2]/40 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 text-[#7fdcf2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white">
                {tF.selloLibro}
              </span>
            </Link>
          </div>

          {/* ── COLUMNA CONTACTO desde Firebase ── */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tF.titulos.contacto}
            </h4>
            <ul className="flex flex-col gap-3">
              {/* Teléfono */}
              {datosContacto?.telefono && (
                <li className="flex items-start gap-2.5 text-sm text-white/55">
                  <Phone className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${datosContacto.telefono.replace(/\s/g, "")}`}
                    className="hover:text-[#7fdcf2] transition-colors"
                  >
                    {datosContacto.telefono}
                  </a>
                </li>
              )}

              {/* Correo */}
              {datosContacto?.correo && (
                <li className="flex items-start gap-2.5 text-sm text-white/55">
                  <Mail className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${datosContacto.correo}`}
                    className="hover:text-[#7fdcf2] transition-colors break-all"
                  >
                    {datosContacto.correo}
                  </a>
                </li>
              )}

              {/* Dirección */}
              {datosContacto?.direccion && (
                <li className="flex items-start gap-2.5 text-sm text-white/55">
                  <MapPin className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                  <span>{datosContacto.direccion}</span>
                </li>
              )}

              {/* Fallback mientras carga / si Firebase no responde */}
              {!datosContacto && (
                <li className="text-sm text-white/40 italic">
                  Cargando información...
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} TIVO. {tF.copyright}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40">
            <Link href="/terminos-y-condiciones" className="hover:text-[#7fdcf2] transition-colors">
              {tF.enlacesRapidos.terminos}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/politica-de-privacidad" className="hover:text-[#7fdcf2] transition-colors">
              {tF.enlacesRapidos.privacidad}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/preguntas-frecuentes" className="hover:text-[#7fdcf2] transition-colors">
              {tF.enlacesRapidos.faq}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}