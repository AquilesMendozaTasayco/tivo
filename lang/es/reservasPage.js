/**
 * Traducciones de ReservasPage (/reservas) — ESPAÑOL
 */
const reservasPage = {
  hero: {
    title: "Reserva tu viaje",
    breadcrumb: "Reservas",
  },

  // Sección intro
  intro: {
    badge: "Reserva por WhatsApp",
    titulo: "Tu próximo viaje",
    tituloSpan: "a un clic de distancia",
    descripcion: "Completa el formulario con los detalles de tu viaje y te conectaremos directamente con un asesor TIVO por WhatsApp para confirmar tu reserva.",
  },

  // Formulario
  formulario: {
    titulo: "Detalles de tu reserva",
    subtituloPre: "Completa el formulario y continúa por WhatsApp al",

    labels: {
      nombre: "Nombre completo",
      telefono: "Teléfono",
      separadorViaje: "Detalles del viaje",
      desde: "Desde",
      hacia: "Hacia",
      fecha: "Fecha",
      hora: "Hora",
      pasajeros: "Pasajeros",
      notas: "Notas adicionales",
    },

    placeholders: {
      nombre: "Tu nombre",
      telefono: "+51 999 999 999",
      origen: "Punto de partida",
      destino: "Destino final",
      notas: "Equipaje, paradas adicionales, preferencias... (opcional)",
    },

    pasajerosOpciones: [
      { value: "1",  label: "1 persona" },
      { value: "2",  label: "2 personas" },
      { value: "3",  label: "3 personas" },
      { value: "4",  label: "4 personas" },
      { value: "5+", label: "5 o más" },
    ],

    botonContinuar: "Continuar por WhatsApp",
    disclaimer: "Al continuar se abrirá WhatsApp con tu información pre-cargada. Un asesor confirmará tu reserva.",
  },

  // Mensaje de WhatsApp construido
  whatsapp: {
    saludo: "¡Hola TIVO! Quiero reservar un viaje 🚗",
    nombreLabel: "Nombre:",
    telefonoLabel: "Teléfono:",
    detallesViaje: "📍 Detalles del viaje",
    desdeLabel: "Desde:",
    haciaLabel: "Hacia:",
    fechaLabel: "Fecha:",
    horaLabel: "Hora:",
    pasajerosLabel: "Pasajeros:",
    notasLabel: "📝 Notas adicionales:",
    despedida: "Gracias por la atención.",
    saludoDirecto: "¡Hola TIVO! Quiero reservar un viaje y necesito más información.",
  },

  // Card lateral WhatsApp directo
  whatsappDirecto: {
    titulo: "¿Prefieres escribirnos directamente?",
    descripcion: "Contáctanos por WhatsApp sin llenar el formulario.",
  },

  // Beneficios
  beneficios: {
    titulo: "¿Por qué reservar así?",
    items: [
      {
        titulo: "Atención inmediata",
        descripcion: "Respuesta rápida por nuestro equipo en horarios de atención.",
      },
      {
        titulo: "Reserva segura",
        descripcion: "Confirmación directa con un asesor TIVO verificado.",
      },
      {
        titulo: "Trato personalizado",
        descripcion: "Conversación directa para adaptar tu viaje a tus necesidades.",
      },
    ],
  },

  // Card de horario
  horario: {
    titulo: "Horario de atención",
    lineas: ["Lun – Vie: 8:00am – 7:00pm", "Sáb: 9:00am – 2:00pm"],
  },

  // Sección "Cómo funciona el proceso"
  proceso: {
    badge: "Proceso simple",
    titulo: "Reservar en 3 pasos",
    subtitulo: "Así de fácil es asegurar tu próximo viaje con TIVO.",
    pasos: [
      {
        numero: "01",
        titulo: "Completa el formulario",
        descripcion: "Ingresa tus datos y los detalles del viaje que necesitas.",
      },
      {
        numero: "02",
        titulo: "Continúa por WhatsApp",
        descripcion: "Tus datos se envían pre-cargados a nuestro equipo vía WhatsApp.",
      },
      {
        numero: "03",
        titulo: "Confirmación del viaje",
        descripcion: "Un asesor TIVO confirmará tu reserva y coordinará los detalles finales.",
      },
    ],
  },
};

export default reservasPage;