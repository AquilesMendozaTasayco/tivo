/**
 * Traducciones de PreguntasFrecuentesPage (/preguntas-frecuentes) — ESPAÑOL
 */
const preguntasFrecuentes = {
  hero: {
    title: "Preguntas frecuentes",
    breadcrumb: "Preguntas frecuentes",
  },

  header: {
    badge: "¿Tienes dudas?",
    titulo: "Resolvemos tus preguntas",
    descripcion: "Encuentra respuestas a las preguntas más comunes sobre TIVO. Si no encuentras lo que buscas, escríbenos.",
  },

  buscadorPlaceholder: "Busca una pregunta...",
  sinResultados: "No encontramos preguntas que coincidan con tu búsqueda.",

  // Categorías de filtro
  categorias: [
    { id: "todas",     nombre: "Todas" },
    { id: "general",   nombre: "Sobre TIVO" },
    { id: "reservas",  nombre: "Reservas" },
    { id: "seguridad", nombre: "Seguridad" },
    { id: "pagos",     nombre: "Pagos" },
    { id: "app",       nombre: "App" },
  ],

  // Las preguntas
  preguntas: [
    // SOBRE TIVO
    {
      categoria: "general",
      pregunta: "¿Qué es TIVO?",
      respuesta: "TIVO es una plataforma de movilidad compartida que conecta a personas que desean trasladarse de forma segura, económica y confiable dentro de Lima. Optimizamos los viajes urbanos permitiendo que los usuarios compartan trayectos con personas previamente verificadas.",
    },
    {
      categoria: "general",
      pregunta: "¿En qué ciudades opera TIVO?",
      respuesta: "Actualmente operamos en Lima, Perú. A largo plazo buscamos expandir el servicio a más distritos y ciudades del país.",
    },
    {
      categoria: "general",
      pregunta: "¿Qué hace diferente a TIVO de otras apps de transporte?",
      respuesta: "Nuestros valores: Confianza, Seguridad, Innovación, Comunidad y Accesibilidad. No solo te llevamos de un punto a otro; creamos una experiencia donde cada viaje es una oportunidad para conectar, ahorrar y sentirte seguro. Compartimos más que un viaje.",
    },
    {
      categoria: "general",
      pregunta: "¿Qué edad debo tener para usar TIVO?",
      respuesta: "El servicio está dirigido a personas mayores de 18 años, residentes en zonas urbanas de Lima.",
    },

    // RESERVAS
    {
      categoria: "reservas",
      pregunta: "¿Cómo puedo reservar un viaje?",
      respuesta: "Puedes reservar a través de tres canales oficiales: 1) Formulario online en nuestro sitio web, 2) WhatsApp al +51 900 241 682, o 3) Mensaje directo a nuestra página oficial de Facebook. Elige el canal que más te acomode.",
    },
    {
      categoria: "reservas",
      pregunta: "¿Con cuánta anticipación debo reservar?",
      respuesta: "Recomendamos reservar con la mayor antelación posible para asegurar disponibilidad. Para casos urgentes puedes contactarnos directamente por WhatsApp y un asesor te confirmará la disponibilidad inmediata.",
    },
    {
      categoria: "reservas",
      pregunta: "¿Puedo cancelar o reprogramar mi reserva?",
      respuesta: "Sí. Puedes solicitar la cancelación o reprogramación contactando al +51 900 241 682. Mientras antes nos avises, mejor podemos ayudarte. Las condiciones específicas serán informadas por el asesor TIVO al momento de coordinar.",
    },
    {
      categoria: "reservas",
      pregunta: "¿Cuál es el horario de atención?",
      respuesta: "Lunes a viernes de 8:00 a.m. a 7:00 p.m., y sábados de 9:00 a.m. a 2:00 p.m. Fuera de este horario puedes dejar tu mensaje y te responderemos al iniciar el siguiente turno.",
    },

    // SEGURIDAD
    {
      categoria: "seguridad",
      pregunta: "¿Cómo verifican a los usuarios y conductores?",
      respuesta: "Todos los usuarios y conductores en TIVO pasan por un proceso de verificación de identidad. Esto es indispensable para mantener la seguridad y confianza dentro de nuestra comunidad.",
    },
    {
      categoria: "seguridad",
      pregunta: "¿Puedo elegir con quién viajar?",
      respuesta: "Sí. Puedes revisar perfiles, calificaciones y comentarios antes de confirmar un viaje. Tu tranquilidad es parte del viaje.",
    },
    {
      categoria: "seguridad",
      pregunta: "¿Qué hago si tengo un problema durante el viaje?",
      respuesta: "Contáctanos inmediatamente al +51 900 241 682 por WhatsApp o llamada. Estamos para acompañarte y resolver cualquier inconveniente.",
    },

    // PAGOS
    {
      categoria: "pagos",
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta: "Los medios de pago disponibles serán informados por nuestro asesor al momento de confirmar tu reserva. Para conocer los métodos vigentes, contáctanos al +51 900 241 682.",
    },
    {
      categoria: "pagos",
      pregunta: "¿Cuánto cuesta un viaje?",
      respuesta: "El costo de cada viaje se comunica al momento de coordinar la reserva, antes de la confirmación. La tarifa depende de la ruta, el horario y el número de pasajeros.",
    },
    {
      categoria: "pagos",
      pregunta: "¿TIVO aplica algún cargo por usar la plataforma?",
      respuesta: "Las condiciones tarifarias específicas serán informadas por nuestro equipo al momento de coordinar la reserva. Si tienes dudas, escríbenos antes de confirmar.",
    },

    // APP
    {
      categoria: "app",
      pregunta: "¿TIVO tiene una aplicación móvil?",
      respuesta: "Estamos preparando la app de TIVO. Mientras tanto, puedes coordinar tus viajes a través de nuestro sitio web, WhatsApp o Facebook. Si quieres que te avisemos cuando la app esté lista, escríbenos al +51 900 241 682.",
    },
    {
      categoria: "app",
      pregunta: "¿Cuándo estará disponible la app?",
      respuesta: "La app está en desarrollo. Anunciaremos su lanzamiento a través de nuestros canales oficiales (sitio web, WhatsApp y Facebook) cuando esté lista.",
    },
    {
      categoria: "app",
      pregunta: "¿Puedo crear una cuenta ahora?",
      respuesta: "El registro de cuentas estará disponible cuando lancemos la app oficialmente. Mientras tanto, puedes acceder a nuestros servicios sin necesidad de crear una cuenta, contactándonos por WhatsApp o el formulario online.",
    },
  ],

  // Bloque "no encontraste tu respuesta"
  ayuda: {
    titulo: "¿No encontraste tu respuesta?",
    descripcion: "Estamos para ayudarte. Escríbenos por WhatsApp o correo y un asesor te responderá en el menor tiempo posible.",
    botonWhatsapp: "WhatsApp +51 900 241 682",
    botonEmail: "contacto@tivo.pe",
  },

  enlaces: {
    terminos: "Términos y condiciones",
    privacidad: "Política de privacidad",
    libro: "Libro de reclamaciones",
  },
};

export default preguntasFrecuentes;