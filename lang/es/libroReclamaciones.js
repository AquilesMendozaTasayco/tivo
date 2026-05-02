/**
 * Traducciones de LibroReclamacionesPage (/libro-de-reclamaciones) — ESPAÑOL
 */
const libroReclamaciones = {
  hero: {
    title: "Libro de Reclamaciones",
    breadcrumb: "Libro de Reclamaciones",
  },

  // Encabezado
  header: {
    badge: "Conforme a Indecopi",
    titulo: "Registra tu reclamo o queja",
    descripcion: "Si tienes una disconformidad con nuestro servicio, completa este formulario. TIVO te responderá dentro de los 30 días calendario, conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571).",
  },

  // Cards reclamo vs queja
  reclamoVsQueja: {
    reclamo: {
      titulo: "Reclamo",
      descripcion: "Disconformidad con el servicio recibido o con un consumo realizado. Por ejemplo: un viaje no efectuado, un cobro incorrecto.",
    },
    queja: {
      titulo: "Queja",
      descripcion: "Manifestación de malestar respecto a la atención al público. Por ejemplo: demora, mal trato del personal.",
    },
  },

  // Mensaje de éxito
  exito: {
    titulo: "Reclamación registrada",
    descripcion: "Tu reclamación ha sido enviada a nuestro equipo. Te contactaremos en los próximos días hábiles.",
  },

  // SECCIÓN 1: Identificación del consumidor
  seccion1: {
    titulo: "1. Identificación del consumidor",
    labels: {
      tipoDocumento: "Tipo de documento *",
      numeroDocumento: "Número de documento *",
      nombre: "Nombres *",
      apellidos: "Apellidos *",
      email: "Correo electrónico *",
      telefono: "Teléfono *",
      direccion: "Domicilio",
    },
    placeholders: {
      numeroDocumento: "00000000",
      nombre: "Tus nombres",
      apellidos: "Tus apellidos",
      email: "tu@correo.com",
      telefono: "+51 999 999 999",
      direccion: "Av. / Jr. / Calle, distrito, ciudad",
    },
    tiposDocumento: [
      { value: "DNI",       label: "DNI" },
      { value: "CE",        label: "Carné de Extranjería" },
      { value: "Pasaporte", label: "Pasaporte" },
      { value: "RUC",       label: "RUC" },
    ],
    checkboxMenor: "Soy padre, madre o tutor y presento esta reclamación en representación de un menor de edad.",
  },

  // SECCIÓN 2: Bien contratado
  seccion2: {
    titulo: "2. Identificación del bien contratado",
    labels: {
      tipo: "Tipo *",
      monto: "Monto reclamado (S/)",
      descripcion: "Descripción del servicio o producto *",
    },
    placeholders: {
      monto: "0.00",
      descripcion: "Describe el servicio o producto contratado (ej. viaje compartido del 20/04/2026, ruta Miraflores - San Isidro)",
    },
    radioServicio: "Servicio",
    radioProducto: "Producto",
  },

  // SECCIÓN 3: Detalle
  seccion3: {
    titulo: "3. Detalle de la reclamación",
    labels: {
      tipoSolicitud: "Tipo de solicitud *",
      detalle: "Detalle *",
      pedido: "Pedido del consumidor *",
    },
    placeholders: {
      detalle: "Describe los hechos que motivan tu reclamación o queja con la mayor precisión posible (fechas, lugares, personas involucradas).",
      pedido: "Indica claramente qué solicitas: devolución del monto, reprogramación del servicio, disculpa formal, etc.",
    },
    radioReclamo: "Reclamo",
    radioQueja: "Queja",
  },

  // Botón
  botonRegistrar: "Registrar reclamación",
  disclaimerEnvio: "Al enviar, tu reclamación será registrada y se enviará una copia al equipo TIVO. Te responderemos dentro de los 30 días calendario conforme a Ley.",

  // Información Indecopi
  indecopi: {
    titulo: "Información importante",
    parrafo1Pre: "Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), TIVO está obligado a responder tu reclamación dentro de los",
    parrafo1Resaltado: "30 días calendario",
    parrafo1Post: "contados desde su recepción.",
    parrafo2Pre: "Si necesitas más información, también puedes comunicarte con Indecopi al",
    parrafo2Telefono: "0-800-4-4040",
    parrafo2Medio: "(línea gratuita) o ingresar a",
    parrafo2Web: "www.gob.pe/indecopi",
    parrafo2Final: ".",
  },

  // Mensaje de WhatsApp
  whatsapp: {
    encabezado: "📕 *LIBRO DE RECLAMACIONES — TIVO*",
    fechaLabel: "Fecha:",
    seccion1Titulo: "*1. IDENTIFICACIÓN DEL CONSUMIDOR*",
    nombre: "Nombre:",
    documento: "Documento:",
    correo: "Correo:",
    telefono: "Teléfono:",
    direccion: "Dirección:",
    avisoMenor: "⚠️ Padre/madre/tutor de menor de edad",
    seccion2Titulo: "*2. IDENTIFICACIÓN DEL BIEN CONTRATADO*",
    tipo: "Tipo:",
    tipoProducto: "Producto",
    tipoServicio: "Servicio",
    montoReclamado: "Monto reclamado: S/",
    descripcion: "Descripción:",
    seccion3TituloReclamo: "*3. DETALLE DE LA RECLAMACIÓN*",
    seccion3TituloQueja: "*3. DETALLE DE LA QUEJA*",
    tipoLabel: "Tipo:",
    reclamoCompleto: "Reclamo (disconformidad con el servicio)",
    quejaCompleta: "Queja (atención al cliente)",
    detalle: "Detalle:",
    pedido: "Pedido:",
  },

  // Enlaces relacionados
  enlaces: {
    terminos: "Términos y condiciones",
    privacidad: "Política de privacidad",
    faq: "Preguntas frecuentes",
  },

  locale: "es-PE",
};

export default libroReclamaciones;