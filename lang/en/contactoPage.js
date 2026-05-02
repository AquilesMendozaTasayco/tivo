/**
 * ContactoPage (/contactanos) translations — ENGLISH
 */
const contactoPage = {
  hero: {
    title: "Contact us",
    breadcrumb: "Contact",
  },

  columnaInfo: {
    badge: "Find us",
    titulo: "We're in Lima",
    mapaTitulo: "TIVO location - Lima, Peru",
    abrirMaps: "Open in Google Maps",
    siguenosEnRedes: "Follow us on social media",
  },

  cards: [
    {
      titulo: "Phone & WhatsApp",
      lineas: ["+51 900 241 682"],
    },
    {
      titulo: "Email",
      lineas: ["contacto@tivo.pe"],
    },
    {
      titulo: "Location",
      lineas: ["Lima, Peru"],
    },
    {
      titulo: "Business hours",
      lineas: ["Mon – Fri: 8:00am – 7:00pm", "Sat: 9:00am – 2:00pm"],
    },
  ],

  formulario: {
    badge: "Write to us",
    tituloPre: "Ready to share",
    tituloSpan: "your next ride?",
    subtitulo: "Fill out the form and we'll reach out via WhatsApp.",

    labels: {
      nombre: "Full name",
      email: "Email",
      telefono: "Phone",
      asunto: "Subject",
      mensaje: "Message",
    },

    placeholders: {
      nombre: "Your name",
      email: "you@email.com",
      telefono: "+51 999 999 999",
      asuntoVacio: "Select a subject",
      mensaje: "Tell us how we can help you...",
    },

    asuntos: [
      { value: "usuario",    label: "I want to use the TIVO app" },
      { value: "conductor",  label: "I want to be a driver" },
      { value: "soporte",    label: "Technical support" },
      { value: "alianza",    label: "Business partnerships" },
      { value: "otro",       label: "Other" },
    ],

    botonEnviar: "Send via WhatsApp",
    aviso: "On submit, WhatsApp will open with your details ready to send.",
  },

  whatsapp: {
    saludo: "Hi TIVO! I'm reaching out to you.",
    misDatos: "My details:",
    nombreLabel: "Name:",
    correoLabel: "Email:",
    telefonoLabel: "Phone:",
    asuntoLabel: "Subject:",
    mensajeLabel: "Message:",
    despedida: "Looking forward to your reply, thanks!",
  },
};

export default contactoPage;