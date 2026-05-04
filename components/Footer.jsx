"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/lang/LanguageContext";

// ── SVGs inline de redes sociales ──
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.751-.216-3.32-.216-3.384 0-5.699 2.064-5.699 5.844v2.372z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
  </svg>
);

const WhatsappIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
  </svg>
);

// Las redes sociales no se traducen (solo el icono y el href)
const redes = [
  { icono: FacebookIcon,  href: "https://www.facebook.com/people/Tivo-Peru/100067848726887/", label: "Facebook" },
  { icono: InstagramIcon, href: "http://instagram.com/tivo_peru/", label: "Instagram" },
  { icono: WhatsappIcon,  href: "https://wa.me/51900241682", label: "WhatsApp" },
];

export default function Footer() {
  const { t } = useLang();
  const tF = t.footer;

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

            <div className="flex items-center gap-3">
              {redes.map((r) => {
                const Icono = r.icono;
                return (
                  <a
                    key={r.label}
                    href={r.href}
                    aria-label={r.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#1bb5e0] hover:text-white hover:border-[#1bb5e0] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icono className="w-4 h-4" />
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

          {/* Columna contacto */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tF.titulos.contacto}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Phone className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <a href="tel:+51900241682" className="hover:text-[#7fdcf2] transition-colors">
                  +51 900 241 682
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <Mail className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <a href="mailto:contacto@tivo.pe" className="hover:text-[#7fdcf2] transition-colors">
                  contacto@tivo.pe
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="w-4 h-4 text-[#1bb5e0] mt-0.5 flex-shrink-0" />
                <span>{tF.ubicacion}</span>
              </li>
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