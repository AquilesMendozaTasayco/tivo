/**
 * PreguntasFrecuentesPage (/preguntas-frecuentes) translations — ENGLISH
 */
const preguntasFrecuentes = {
  hero: {
    title: "Frequently asked questions",
    breadcrumb: "FAQ",
  },

  header: {
    badge: "Got questions?",
    titulo: "We answer your questions",
    descripcion: "Find answers to the most common questions about TIVO. If you don't find what you're looking for, write to us.",
  },

  buscadorPlaceholder: "Search a question...",
  sinResultados: "We couldn't find questions matching your search.",

  categorias: [
    { id: "todas",     nombre: "All" },
    { id: "general",   nombre: "About TIVO" },
    { id: "reservas",  nombre: "Bookings" },
    { id: "seguridad", nombre: "Safety" },
    { id: "pagos",     nombre: "Payments" },
    { id: "app",       nombre: "App" },
  ],

  preguntas: [
    // ABOUT TIVO
    {
      categoria: "general",
      pregunta: "What is TIVO?",
      respuesta: "TIVO is a shared-mobility platform that connects people who want to move around in a safe, affordable and reliable way within Lima. We optimize urban trips by allowing users to share rides with previously verified people.",
    },
    {
      categoria: "general",
      pregunta: "In which cities does TIVO operate?",
      respuesta: "We currently operate in Lima, Peru. In the long term, we plan to expand the service to more districts and cities in the country.",
    },
    {
      categoria: "general",
      pregunta: "What makes TIVO different from other transport apps?",
      respuesta: "Our values: Trust, Safety, Innovation, Community and Accessibility. We don't just take you from point A to point B; we create an experience where every ride is an opportunity to connect, save money and feel safe. We share more than a ride.",
    },
    {
      categoria: "general",
      pregunta: "How old do I have to be to use TIVO?",
      respuesta: "The service is intended for people aged 18 or older, residing in urban areas of Lima.",
    },

    // BOOKINGS
    {
      categoria: "reservas",
      pregunta: "How can I book a ride?",
      respuesta: "You can book through three official channels: 1) The online form on our website, 2) WhatsApp at +51 900 241 682, or 3) A direct message to our official Facebook page. Choose the channel that works best for you.",
    },
    {
      categoria: "reservas",
      pregunta: "How far in advance should I book?",
      respuesta: "We recommend booking as far in advance as possible to ensure availability. For urgent cases, you can contact us directly via WhatsApp and an advisor will confirm immediate availability.",
    },
    {
      categoria: "reservas",
      pregunta: "Can I cancel or reschedule my booking?",
      respuesta: "Yes. You can request a cancellation or rescheduling by contacting +51 900 241 682. The earlier you let us know, the better we can help you. Specific conditions will be communicated by the TIVO advisor at the time of coordination.",
    },
    {
      categoria: "reservas",
      pregunta: "What are your business hours?",
      respuesta: "Monday to Friday from 8:00 a.m. to 7:00 p.m., and Saturdays from 9:00 a.m. to 2:00 p.m. Outside these hours you can leave a message and we'll respond at the start of the next shift.",
    },

    // SAFETY
    {
      categoria: "seguridad",
      pregunta: "How are users and drivers verified?",
      respuesta: "All users and drivers on TIVO go through an identity verification process. This is essential to maintain safety and trust within our community.",
    },
    {
      categoria: "seguridad",
      pregunta: "Can I choose who I ride with?",
      respuesta: "Yes. You can review profiles, ratings and comments before confirming a ride. Your peace of mind is part of the journey.",
    },
    {
      categoria: "seguridad",
      pregunta: "What do I do if I have a problem during the ride?",
      respuesta: "Contact us immediately at +51 900 241 682 via WhatsApp or call. We're here to support you and resolve any issue.",
    },

    // PAYMENTS
    {
      categoria: "pagos",
      pregunta: "What payment methods do you accept?",
      respuesta: "Available payment methods will be communicated by our advisor at the time of confirming your booking. To know the current methods, contact us at +51 900 241 682.",
    },
    {
      categoria: "pagos",
      pregunta: "How much does a ride cost?",
      respuesta: "The cost of each ride is communicated when coordinating the booking, before confirmation. The fare depends on the route, the time and the number of passengers.",
    },
    {
      categoria: "pagos",
      pregunta: "Does TIVO apply any platform fee?",
      respuesta: "Specific tariff conditions will be communicated by our team when coordinating the booking. If you have questions, write to us before confirming.",
    },

    // APP
    {
      categoria: "app",
      pregunta: "Does TIVO have a mobile app?",
      respuesta: "We're preparing the TIVO app. Meanwhile, you can coordinate your rides through our website, WhatsApp or Facebook. If you want us to notify you when the app is ready, write to us at +51 900 241 682.",
    },
    {
      categoria: "app",
      pregunta: "When will the app be available?",
      respuesta: "The app is under development. We will announce its launch through our official channels (website, WhatsApp and Facebook) when it's ready.",
    },
    {
      categoria: "app",
      pregunta: "Can I create an account now?",
      respuesta: "Account registration will be available when we officially launch the app. Meanwhile, you can access our services without creating an account, by contacting us via WhatsApp or the online form.",
    },
  ],

  ayuda: {
    titulo: "Didn't find your answer?",
    descripcion: "We're here to help. Message us on WhatsApp or email and an advisor will respond as soon as possible.",
    botonWhatsapp: "WhatsApp +51 900 241 682",
    botonEmail: "contacto@tivo.pe",
  },

  enlaces: {
    terminos: "Terms & conditions",
    privacidad: "Privacy policy",
    libro: "Complaints book",
  },
};

export default preguntasFrecuentes;