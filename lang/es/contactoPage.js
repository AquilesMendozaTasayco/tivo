/**
 * Traducciones de ContactoPage (/contactanos) — ESPAÑOL
 */
const contactoPage = {
  hero: {
    title: "Contáctanos",
    breadcrumb: "Contáctanos",
  },

  // Columna izquierda
  columnaInfo: {
    badge: "Encuéntranos",
    titulo: "Estamos en Lima",
    mapaTitulo: "Ubicación TIVO - Lima, Perú",
    abrirMaps: "Abrir en Google Maps",
    siguenosEnRedes: "Síguenos en redes",
  },

  // Tarjetas de contacto
  cards: [
    {
      titulo: "Teléfono y WhatsApp",
      lineas: ["+51 900 241 682"],
    },
    {
      titulo: "Correo electrónico",
      lineas: ["contacto@tivo.pe"],
    },
    {
      titulo: "Ubicación",
      lineas: ["Lima, Perú"],
    },
    {
      titulo: "Horario de atención",
      lineas: ["Lun – Vie: 8:00am – 7:00pm", "Sáb: 9:00am – 2:00pm"],
    },
  ],

  // Columna derecha (formulario)
  formulario: {
    badge: "Escríbenos",
    tituloPre: "¿Listo para compartir",
    tituloSpan: "tu próximo viaje?",
    subtitulo: "Completa el formulario y te contactaremos por WhatsApp.",

    // Labels
    labels: {
      nombre: "Nombre completo",
      email: "Correo electrónico",
      telefono: "Teléfono",
      asunto: "Asunto",
      mensaje: "Mensaje",
    },

    // Placeholders
    placeholders: {
      nombre: "Tu nombre",
      email: "tu@correo.com",
      telefono: "+51 999 999 999",
      asuntoVacio: "Selecciona un asunto",
      mensaje: "Cuéntanos cómo podemos ayudarte...",
    },

    // Opciones del select de asunto
    asuntos: [
      { value: "usuario",    label: "Quiero usar la app TIVO" },
      { value: "conductor",  label: "Quiero ser conductor" },
      { value: "soporte",    label: "Soporte técnico" },
      { value: "alianza",    label: "Alianzas comerciales" },
      { value: "otro",       label: "Otro" },
    ],

    botonEnviar: "Enviar por WhatsApp",
    aviso: "Al enviar, se abrirá WhatsApp con tus datos listos para enviar.",
  },

  // Mensaje de WhatsApp construido
  whatsapp: {
    saludo: "¡Hola TIVO! Me pongo en contacto con ustedes.",
    misDatos: "Mis datos:",
    nombreLabel: "Nombre:",
    correoLabel: "Correo:",
    telefonoLabel: "Teléfono:",
    asuntoLabel: "Asunto:",
    mensajeLabel: "Mensaje:",
    despedida: "¡Espero su respuesta, gracias!",
  },
};

export default contactoPage;