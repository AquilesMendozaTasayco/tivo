/**
 * ──────────────────────────────────────────────────────────────────────
 *  Traducciones del Navbar — ESPAÑOL
 * ──────────────────────────────────────────────────────────────────────
 *  IMPORTANTE: la estructura de este archivo debe ser IGUAL a /en/navbar.js
 *  Si agregas una clave acá, agrégala también en inglés.
 * ──────────────────────────────────────────────────────────────────────
 */

const navbar = {
  // Logo
  logo: {
    nombre: "TIVO",
    slogan: "Compartimos más que un viaje",
  },

  // Enlaces del menú
  menu: {
    inicio: "Inicio",
    ventajas: "Ventajas",
    nosotros: "Nosotros",
    reservas: "Reservas",
    testimonios: "Testimonios",
    comoFunciona: "Cómo funciona",
    contactanos: "Contáctanos",
  },

  // Items del dropdown "Ventajas"
  ventajas: [
    { nombre: "Confianza y seguridad", href: "/seguridad" },
    { nombre: "Impacto y comunidad",   href: "/impacto" },
  ],

  // Botón CTA
  cta: "Únete a TIVO",

  // Accesibilidad
  aria: {
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
  },
};

export default navbar;