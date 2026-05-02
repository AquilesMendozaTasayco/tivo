/**
 * LibroReclamacionesPage (/libro-de-reclamaciones) translations — ENGLISH
 *
 * Note: This is an Indecopi-mandated form for Peru. Even when shown in
 * English for foreign visitors, references to Peruvian laws (29571,
 * Indecopi) and the consumer rights process are kept intact.
 */
const libroReclamaciones = {
  hero: {
    title: "Complaints Book",
    breadcrumb: "Complaints Book",
  },

  header: {
    badge: "Compliant with Indecopi",
    titulo: "Register your complaint or grievance",
    descripcion: "If you have an issue with our service, fill out this form. TIVO will respond within 30 calendar days, as required by the Consumer Protection and Defense Code (Law No. 29571 of Peru).",
  },

  reclamoVsQueja: {
    reclamo: {
      titulo: "Complaint",
      descripcion: "Disagreement with the service received or with a transaction. For example: a ride that didn't happen, an incorrect charge.",
    },
    queja: {
      titulo: "Grievance",
      descripcion: "An expression of dissatisfaction regarding customer service. For example: delays, mistreatment by staff.",
    },
  },

  exito: {
    titulo: "Complaint registered",
    descripcion: "Your complaint has been sent to our team. We'll contact you within the next business days.",
  },

  seccion1: {
    titulo: "1. Consumer identification",
    labels: {
      tipoDocumento: "Document type *",
      numeroDocumento: "Document number *",
      nombre: "First name *",
      apellidos: "Last name *",
      email: "Email *",
      telefono: "Phone *",
      direccion: "Address",
    },
    placeholders: {
      numeroDocumento: "00000000",
      nombre: "Your first name",
      apellidos: "Your last name",
      email: "you@email.com",
      telefono: "+51 999 999 999",
      direccion: "St. / Ave., district, city",
    },
    tiposDocumento: [
      { value: "DNI",       label: "DNI" },
      { value: "CE",        label: "Foreigner ID Card" },
      { value: "Pasaporte", label: "Passport" },
      { value: "RUC",       label: "RUC (tax ID)" },
    ],
    checkboxMenor: "I am a parent or guardian and I'm submitting this complaint on behalf of a minor.",
  },

  seccion2: {
    titulo: "2. Identification of the contracted item",
    labels: {
      tipo: "Type *",
      monto: "Amount claimed (PEN)",
      descripcion: "Description of the service or product *",
    },
    placeholders: {
      monto: "0.00",
      descripcion: "Describe the contracted service or product (e.g. shared ride on 04/20/2026, route Miraflores - San Isidro)",
    },
    radioServicio: "Service",
    radioProducto: "Product",
  },

  seccion3: {
    titulo: "3. Complaint details",
    labels: {
      tipoSolicitud: "Request type *",
      detalle: "Details *",
      pedido: "Consumer's request *",
    },
    placeholders: {
      detalle: "Describe the facts behind your complaint or grievance with as much detail as possible (dates, places, people involved).",
      pedido: "Clearly state what you're requesting: refund, service rescheduling, formal apology, etc.",
    },
    radioReclamo: "Complaint",
    radioQueja: "Grievance",
  },

  botonRegistrar: "Register complaint",
  disclaimerEnvio: "On submit, your complaint will be registered and a copy will be sent to the TIVO team. We will respond within 30 calendar days as required by law.",

  indecopi: {
    titulo: "Important information",
    parrafo1Pre: "In accordance with the Consumer Protection and Defense Code (Law No. 29571 of Peru), TIVO is required to respond to your complaint within",
    parrafo1Resaltado: "30 calendar days",
    parrafo1Post: "from its reception.",
    parrafo2Pre: "If you need more information, you can also contact Indecopi at",
    parrafo2Telefono: "0-800-4-4040",
    parrafo2Medio: "(toll free) or visit",
    parrafo2Web: "www.gob.pe/indecopi",
    parrafo2Final: ".",
  },

  // WhatsApp message — kept partially in Spanish since it's a formal
  // record sent to the Peruvian team for legal/Indecopi purposes.
  whatsapp: {
    encabezado: "📕 *COMPLAINTS BOOK — TIVO*",
    fechaLabel: "Date:",
    seccion1Titulo: "*1. CONSUMER IDENTIFICATION*",
    nombre: "Name:",
    documento: "Document:",
    correo: "Email:",
    telefono: "Phone:",
    direccion: "Address:",
    avisoMenor: "⚠️ Parent/guardian of a minor",
    seccion2Titulo: "*2. CONTRACTED ITEM IDENTIFICATION*",
    tipo: "Type:",
    tipoProducto: "Product",
    tipoServicio: "Service",
    montoReclamado: "Amount claimed: PEN",
    descripcion: "Description:",
    seccion3TituloReclamo: "*3. COMPLAINT DETAILS*",
    seccion3TituloQueja: "*3. GRIEVANCE DETAILS*",
    tipoLabel: "Type:",
    reclamoCompleto: "Complaint (issue with the service)",
    quejaCompleta: "Grievance (customer service)",
    detalle: "Details:",
    pedido: "Request:",
  },

  enlaces: {
    terminos: "Terms & conditions",
    privacidad: "Privacy policy",
    faq: "Frequently asked questions",
  },

  locale: "en-US",
};

export default libroReclamaciones;