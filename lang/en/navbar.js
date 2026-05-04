/**
 * ──────────────────────────────────────────────────────────────────────
 *  Navbar translations — ENGLISH
 * ──────────────────────────────────────────────────────────────────────
 *  IMPORTANT: this file MUST mirror the structure of /es/navbar.js
 *  If you add a key here, add it in Spanish too.
 * ──────────────────────────────────────────────────────────────────────
 */

const navbar = {
  // Logo
  logo: {
    nombre: "TIVO",
    slogan: "We share more than a ride",
  },

  // Menu links
  menu: {
    inicio: "Home",
    ventajas: "Benefits",
    servicios: "Services",
    nosotros: "About us",
    reservas: "Bookings",
    testimonios: "Testimonials",
    comoFunciona: "How it works",
    contactanos: "Contact",
  },

  // "Benefits" dropdown items
  ventajas: [
    { nombre: "Trust & safety",      href: "/seguridad" },
    { nombre: "Impact & community",  href: "/impacto" },
  ],

  // CTA button
  cta: "Join TIVO",

  // Accessibility
  aria: {
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
  },
};

export default navbar;