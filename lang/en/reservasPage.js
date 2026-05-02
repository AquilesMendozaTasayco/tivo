/**
 * ReservasPage (/reservas) translations — ENGLISH
 */
const reservasPage = {
  hero: {
    title: "Book your ride",
    breadcrumb: "Bookings",
  },

  intro: {
    badge: "Book via WhatsApp",
    titulo: "Your next ride",
    tituloSpan: "one click away",
    descripcion: "Fill out the form with your trip details and we'll connect you directly with a TIVO advisor on WhatsApp to confirm your booking.",
  },

  formulario: {
    titulo: "Your booking details",
    subtituloPre: "Fill out the form and continue on WhatsApp at",

    labels: {
      nombre: "Full name",
      telefono: "Phone",
      separadorViaje: "Trip details",
      desde: "From",
      hacia: "To",
      fecha: "Date",
      hora: "Time",
      pasajeros: "Passengers",
      notas: "Additional notes",
    },

    placeholders: {
      nombre: "Your name",
      telefono: "+51 999 999 999",
      origen: "Starting point",
      destino: "Final destination",
      notas: "Luggage, extra stops, preferences... (optional)",
    },

    pasajerosOpciones: [
      { value: "1",  label: "1 person" },
      { value: "2",  label: "2 people" },
      { value: "3",  label: "3 people" },
      { value: "4",  label: "4 people" },
      { value: "5+", label: "5 or more" },
    ],

    botonContinuar: "Continue on WhatsApp",
    disclaimer: "On continue, WhatsApp will open with your info pre-filled. An advisor will confirm your booking.",
  },

  whatsapp: {
    saludo: "Hi TIVO! I want to book a ride 🚗",
    nombreLabel: "Name:",
    telefonoLabel: "Phone:",
    detallesViaje: "📍 Trip details",
    desdeLabel: "From:",
    haciaLabel: "To:",
    fechaLabel: "Date:",
    horaLabel: "Time:",
    pasajerosLabel: "Passengers:",
    notasLabel: "📝 Additional notes:",
    despedida: "Thanks for your help.",
    saludoDirecto: "Hi TIVO! I want to book a ride and need more information.",
  },

  whatsappDirecto: {
    titulo: "Prefer to message us directly?",
    descripcion: "Contact us on WhatsApp without filling out the form.",
  },

  beneficios: {
    titulo: "Why book this way?",
    items: [
      {
        titulo: "Immediate attention",
        descripcion: "Quick response from our team during business hours.",
      },
      {
        titulo: "Safe booking",
        descripcion: "Direct confirmation with a verified TIVO advisor.",
      },
      {
        titulo: "Personalized service",
        descripcion: "Direct conversation to adapt your ride to your needs.",
      },
    ],
  },

  horario: {
    titulo: "Business hours",
    lineas: ["Mon – Fri: 8:00am – 7:00pm", "Sat: 9:00am – 2:00pm"],
  },

  proceso: {
    badge: "Simple process",
    titulo: "Book in 3 steps",
    subtitulo: "That's how easy it is to secure your next ride with TIVO.",
    pasos: [
      {
        numero: "01",
        titulo: "Fill out the form",
        descripcion: "Enter your details and the info about the ride you need.",
      },
      {
        numero: "02",
        titulo: "Continue on WhatsApp",
        descripcion: "Your data is sent pre-filled to our team via WhatsApp.",
      },
      {
        numero: "03",
        titulo: "Ride confirmation",
        descripcion: "A TIVO advisor will confirm your booking and coordinate the final details.",
      },
    ],
  },
};

export default reservasPage;