import React from "react";

export interface DirectProcedureItem {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  url: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  cost: string;
  timeEstimate: string;
  requirements: string[];
  bannerGradient: string;
  iconType: string;
  visualTag: string;
}

/**
 * Catálogo detallado de Trámites Oficiales Directos con imágenes representativas, costos y enlaces (.gob.pe)
 */
export const OFFICIAL_PROCEDURES_BY_ENTITY: Record<string, DirectProcedureItem[]> = {
  SUNARP: [
    {
      id: "sunarp-consulta-vehicular",
      title: "Consulta Vehicular Gratuita (Placas y Datos)",
      shortTitle: "Consulta Vehicular",
      description: "Verifica al instante marca, modelo, número de serie, motor, color y titular registrado de cualquier vehículo en el Perú.",
      url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
      isFeatured: true,
      featuredBadge: "⭐ Más Solicitado / 100% Gratuito",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato (Online 24/7)",
      requirements: ["Número de placa vehicular", "No requiere usuario ni contraseña"],
      bannerGradient: "linear-gradient(135deg, #064E3B 0%, #047857 100%)",
      iconType: "vehicle",
      visualTag: "Registro Vehicular"
    },
    {
      id: "sunarp-sprl-copia-literal",
      title: "Copia Literal y Certificados Registrales (SPRL)",
      shortTitle: "Copia Literal SPRL",
      description: "Descarga la partida registral completa de inmuebles, vehículos, personas jurídicas y testamentos con firma digital oficial.",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      isFeatured: false,
      cost: "Desde S/ 6.00 por hoja",
      timeEstimate: "Entrega inmediata en PDF",
      requirements: ["Número de partida registral o ficha", "Pago con tarjeta o Págalo.pe"],
      bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
      iconType: "deed",
      visualTag: "Inmuebles & Predios"
    },
    {
      id: "sunarp-alerta-registral",
      title: "Alerta Registral Gratuita",
      shortTitle: "Alerta Registral",
      description: "Servicio preventivo gratuito que te avisa por correo y SMS en tiempo real sobre cualquier trámite que se presente sobre tus propiedades.",
      url: "https://www.sunarp.gob.pe/alertaregistral/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Activación en 3 minutos",
      requirements: ["Número de DNI", "Partida de tu predio o vehículo"],
      bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
      iconType: "shield-alert",
      visualTag: "Protección Patrimonial"
    },
    {
      id: "sunarp-vigencia-poder",
      title: "Certificado de Vigencia de Poder",
      shortTitle: "Vigencia de Poder",
      description: "Acredita que las facultades legales otorgadas a un apoderado o gerente general se encuentran vigentes ante notarías y bancos.",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      isFeatured: false,
      cost: "S/ 34.00",
      timeEstimate: "3 a 24 horas",
      requirements: ["Número de partida de la empresa o poder", "Zona registral"],
      bannerGradient: "linear-gradient(135deg, #374151 0%, #1F2937 100%)",
      iconType: "legal",
      visualTag: "Poderes & Empresas"
    },
    {
      id: "sunarp-conoce-aqui",
      title: "Conoce Aquí (Visualización Gratuita de Partidas)",
      shortTitle: "Conoce Aquí",
      description: "Visualiza de forma gratuita por 30 minutos el contenido de partidas registrales sin costo alguno desde la web oficial de SUNARP.",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato (30 min lectura)",
      requirements: ["DNI y fecha de emisión", "Número de partida registral"],
      bannerGradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
      iconType: "document",
      visualTag: "Lectura Gratuita"
    }
  ],

  RENIEC: [
    {
      id: "reniec-renovacion-dnie",
      title: "Renovación de DNI por Caducidad (DNIe / DNI Azul)",
      shortTitle: "Renovación de DNI",
      description: "Actualiza tu documento de identidad con foto biométrica desde la app DNI BioFacial y selecciona la agencia de recojo.",
      url: "https://www.reniec.gob.pe/portal/masServiciosLinea.htm",
      isFeatured: true,
      featuredBadge: "⭐ Más Solicitado / Trámite Digital",
      cost: "S/ 30.00 (Azul) / S/ 41.00 (DNIe)",
      timeEstimate: "3 a 7 días hábiles",
      requirements: ["Pago previo de tasa (Págalo.pe)", "Foto tomada en app DNI BioFacial"],
      bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
      iconType: "id-card",
      visualTag: "Identidad Civil"
    },
    {
      id: "reniec-duplicado-web",
      title: "Duplicado de DNI vía Web",
      shortTitle: "Duplicado de DNI",
      description: "Solicita un duplicado exacto de tu DNI vigente por pérdida, robo o deterioro físico sin colas presenciales.",
      url: "https://apps.reniec.gob.pe/duplicado/",
      isFeatured: false,
      cost: "S/ 21.00 (Azul) / S/ 33.00 (DNIe)",
      timeEstimate: "3 a 5 días hábiles",
      requirements: ["DNI mayor de 17 años", "Pago de tasa en Págalo.pe (Cód. 00522 / 00523)"],
      bannerGradient: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
      iconType: "id-card",
      visualTag: "Robo o Pérdida"
    },
    {
      id: "reniec-actas-certificadas",
      title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
      shortTitle: "Actas y Partidas",
      description: "Descarga al instante actas oficiales registradas en RENIEC con código QR de verificación digital.",
      url: "https://apps.reniec.gob.pe/actasConsulta/",
      isFeatured: false,
      cost: "S/ 12.00",
      timeEstimate: "Descarga inmediata en PDF",
      requirements: ["Datos completos del titular", "Fecha aproximada del hecho"],
      bannerGradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
      iconType: "document",
      visualTag: "Estado Civil"
    },
    {
      id: "reniec-certificado-c4",
      title: "Certificado de Inscripción C4",
      shortTitle: "Certificado C4",
      description: "Constancia informativa oficial que valida tus datos de identidad para trámites bancarios, notariales o judiciales en caso de no portar DNI.",
      url: "https://apps.reniec.gob.pe/certc4/",
      isFeatured: false,
      cost: "S/ 4.50",
      timeEstimate: "Descarga inmediata",
      requirements: ["Número de DNI", "Pago de tasa en Págalo.pe (Cód. 02143)"],
      bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      iconType: "id-card",
      visualTag: "Constancia de Identidad"
    }
  ],

  SUNAT: [
    {
      id: "sunat-ruc-digital",
      title: "Inscripción y Activación al RUC Digital",
      shortTitle: "Inscripción RUC",
      description: "Obtén tu número de RUC para personas naturales con negocio o independientes en minutos con validación facial.",
      url: "https://ww1.sunat.gob.pe/ol-ti-itinsruc/inscripcion/index.htm",
      isFeatured: true,
      featuredBadge: "⭐ 100% Online / Sin Costo",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "10 minutos",
      requirements: ["DNI vigente", "Correo electrónico y número celular"],
      bannerGradient: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
      iconType: "receipt",
      visualTag: "Tributario & RUC"
    },
    {
      id: "sunat-clave-sol",
      title: "Generación y Recuperación de Clave SOL",
      shortTitle: "Clave SOL Online",
      description: "Crea o restablece tu clave secreta de acceso a SUNAT Operaciones en Línea mediante verificación biométrica con DNI.",
      url: "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "5 minutos",
      requirements: ["Número de DNI", "Validación biométrica o datos de DNI"],
      bannerGradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
      iconType: "legal",
      visualTag: "Acceso Seguro"
    },
    {
      id: "sunat-recibos-honorarios",
      title: "Emisión de Recibos por Honorarios Electrónicos",
      shortTitle: "Recibos por Honorarios",
      description: "Emite y envía recibos por honorarios profesionales (4ta categoría) a tus clientes sin costo y con validez legal tributaria.",
      url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jrcS00Alias",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["RUC activo con Clave SOL", "Datos del contratante"],
      bannerGradient: "linear-gradient(135deg, #134E48 0%, #0F766E 100%)",
      iconType: "receipt",
      visualTag: "Facturación Electrónica"
    },
    {
      id: "sunat-renta-anual",
      title: "Declaración Jurada Anual de Renta",
      shortTitle: "Declaración de Renta",
      description: "Presenta el Formulario Virtual de Renta y solicita la devolución de saldo a favor de impuestos pagados en exceso.",
      url: "https://renta.sunat.gob.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "15 a 30 minutos",
      requirements: ["RUC y Clave SOL", "Sustento de deducciones (hoteles, restaurantes, etc.)"],
      bannerGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      iconType: "receipt",
      visualTag: "Impuesto a la Renta"
    }
  ],

  MIGRACIONES: [
    {
      id: "migraciones-citas-pasaporte",
      title: "Citas para Pasaporte Electrónico Biométrico",
      shortTitle: "Citas de Pasaporte",
      description: "Reserva tu turno de atención presencial para emisión de pasaporte tras pagar la tasa arancelaria en Págalo.pe.",
      url: "https://citaspasaporte.migraciones.gob.pe/",
      isFeatured: true,
      featuredBadge: "⭐ Trámite Oficial / Cita en Línea",
      cost: "S/ 120.90 (Tasa Págalo.pe Cód. 01810)",
      timeEstimate: "Entrega el mismo día de la cita",
      requirements: ["DNI vigente y sin multas electorales", "Código de recibo de pago Págalo.pe"],
      bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)",
      iconType: "passport",
      visualTag: "Viajes Internacionales"
    },
    {
      id: "migraciones-movimiento",
      title: "Certificado de Movimiento Migratorio",
      shortTitle: "Movimiento Migratorio",
      description: "Reporte oficial con sello y firma digital que registra tus ingresos y salidas del territorio peruano.",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      isFeatured: false,
      cost: "S/ 20.30 (Cód. 07561)",
      timeEstimate: "Descarga inmediata en PDF",
      requirements: ["DNI o carné de extranjería", "Tasa pagada en Págalo.pe"],
      bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      iconType: "passport",
      visualTag: "Constancia Oficial"
    },
    {
      id: "migraciones-prorroga-residencia",
      title: "Prórroga de Residencia y Calidad Migratoria",
      shortTitle: "Prórroga de Residencia",
      description: "Extiende la vigencia de tu calidad migratoria como ciudadano extranjero de forma 100% digital en la agencia virtual.",
      url: "https://agenciavirtual.migraciones.gob.pe/",
      isFeatured: false,
      cost: "Según calidad migratoria",
      timeEstimate: "Evaluación en 30 días",
      requirements: ["Carné de extranjería vigente", "Contrato de trabajo o sustento económico"],
      bannerGradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
      iconType: "passport",
      visualTag: "Extranjería"
    }
  ],

  BN: [
    {
      id: "bn-pagalo-pe",
      title: "Pago de Tasas Oficiales en Págalo.pe",
      shortTitle: "Págalo.pe (Tasas)",
      description: "Plataforma digital del Banco de la Nación para pagar aranceles y tasas de RENIEC, MTC, Migraciones, PNP y PJ con tarjeta o Yape.",
      url: "https://pagalo.pe/",
      isFeatured: true,
      featuredBadge: "⭐ Plataforma Oficial de Pagos",
      cost: "Sin comisión adicional",
      timeEstimate: "Pago y constancia al instante",
      requirements: ["Cuenta registrada en Págalo.pe", "Tarjeta Débito/Crédito o Yape"],
      bannerGradient: "linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)",
      iconType: "wallet",
      visualTag: "Pasarela del Estado"
    },
    {
      id: "bn-cuenta-dni",
      title: "Activación y Consulta de Cuenta DNI",
      shortTitle: "Cuenta DNI",
      description: "Billetera digital del Banco de la Nación asociada a tu número de DNI para recepción segura de subsidios y transferencias.",
      url: "https://www.cuentadni.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "5 minutos",
      requirements: ["DNI físico", "Número celular propio"],
      bannerGradient: "linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)",
      iconType: "wallet",
      visualTag: "Banca Ciudadana"
    }
  ],

  MTC: [
    {
      id: "mtc-licencia-electronica",
      title: "Emisión y Revalidación de Licencia Electrónica (Brevete)",
      shortTitle: "Licencia de Conducir",
      description: "Tramita tu brevete digital con código QR con validez nacional e internacional y descárgalo en tu celular.",
      url: "https://licencias.mtc.gob.pe/",
      isFeatured: true,
      featuredBadge: "⭐ Brevete Digital Oficial",
      cost: "S/ 6.70 (Licencia electrónica)",
      timeEstimate: "Entrega el mismo día",
      requirements: ["Examen médico y de reglas aprobados", "Sin papeletas pendientes"],
      bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
      iconType: "vehicle",
      visualTag: "Tránsito & Conducción"
    },
    {
      id: "mtc-record-conductor",
      title: "Récord del Conductor y Sistema de Puntos",
      shortTitle: "Récord del Conductor",
      description: "Consulta de manera gratuita tu historial de papeletas, estado de puntos acumulados y sanciones firmes en el MTC.",
      url: "https://recordconductor.mtc.gob.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato (Online)",
      requirements: ["Número de DNI o licencia", "Sin costo ni registro"],
      bannerGradient: "linear-gradient(135deg, #134E48 0%, #0F766E 100%)",
      iconType: "vehicle",
      visualTag: "Historial de Puntos"
    }
  ],

  ESSALUD: [
    {
      id: "essalud-acreditacion",
      title: "Consulta de Acreditación y Vigencia de Seguro",
      shortTitle: "Vigencia de Seguro",
      description: "Verifica con tu DNI si tu seguro de EsSalud se encuentra activo y la fecha de cobertura otorgada por tu empleador.",
      url: "https://ww4.essalud.gob.pe:7777/acredita/",
      isFeatured: true,
      featuredBadge: "⭐ Verificación Instantánea",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["Número de DNI", "Sin clave"],
      bannerGradient: "linear-gradient(135deg, #0369A1 0%, #0284C7 100%)",
      iconType: "health",
      visualTag: "Seguro Social"
    },
    {
      id: "essalud-donde-me-atiendo",
      title: "¿Dónde me atiendo? (Centro Asistencial Asignado)",
      shortTitle: "Centro Asistencial",
      description: "Conoce el policlínico, hospital o posta médica de EsSalud que te corresponde de acuerdo a tu dirección domiciliaria.",
      url: "https://ww4.essalud.gob.pe:7777/acredita/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["DNI del asegurado"],
      bannerGradient: "linear-gradient(135deg, #075985 0%, #0284C7 100%)",
      iconType: "health",
      visualTag: "Red Médica"
    },
    {
      id: "essalud-subsidio-lactancia",
      title: "Subsidio por Lactancia y Maternidad",
      shortTitle: "Subsidio de Lactancia",
      description: "Tramita el cobro de S/ 820 por lactancia de recién nacido a través de la plataforma VIVA EsSalud.",
      url: "https://viva.essalud.gob.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Aprobación en 72 horas",
      requirements: ["Hijo recién nacido registrado en RENIEC", "Madre titular acreditada"],
      bannerGradient: "linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)",
      iconType: "health",
      visualTag: "Subsidios"
    }
  ],

  SIS: [
    {
      id: "sis-consulta-asegurado",
      title: "Consulta de Asegurado SIS en Línea",
      shortTitle: "Consulta Asegurado SIS",
      description: "Verifica con tu número de DNI si cuentas con seguro SIS Gratuito o Para Todos activo y tu centro de salud.",
      url: "http://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      isFeatured: true,
      featuredBadge: "⭐ Cobertura Integral del Estado",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["Número de DNI"],
      bannerGradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
      iconType: "health",
      visualTag: "Seguro Integral"
    },
    {
      id: "sis-afiliacion-virtual",
      title: "Afiliación Virtual al SIS Gratuito",
      shortTitle: "Afiliación al SIS",
      description: "Regístrate al Seguro Integral de Salud por internet si no cuentas con otro seguro médico privado o de EsSalud.",
      url: "https://afiliacion.sis.gob.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "24 a 48 horas",
      requirements: ["DNI vigente", "No contar con otro seguro activo"],
      bannerGradient: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)",
      iconType: "health",
      visualTag: "Inscripción en Línea"
    }
  ],

  SUNEDU: [
    {
      id: "sunedu-registro-grados",
      title: "Consulta del Registro Nacional de Grados y Títulos",
      shortTitle: "Consulta de Títulos",
      description: "Verifica si tu grado académico de bachiller, maestría, doctorado o título profesional universitario está inscrito oficialmente.",
      url: "https://enlinea.sunedu.gob.pe/",
      isFeatured: true,
      featuredBadge: "⭐ Verificación Oficial Inmediata",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["Número de DNI o nombres completos"],
      bannerGradient: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
      iconType: "education",
      visualTag: "Grados Universitarios"
    },
    {
      id: "sunedu-constancia-inscripcion",
      title: "Constancia de Inscripción de Grado o Título",
      shortTitle: "Constancia de Grado",
      description: "Descarga la constancia digital con firma y código de verificación oficial para convocatorias de trabajo o estudios.",
      url: "https://enlinea.sunedu.gob.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Descarga instantánea en PDF",
      requirements: ["DNI del graduado"],
      bannerGradient: "linear-gradient(135deg, #3730A3 0%, #4F46E5 100%)",
      iconType: "education",
      visualTag: "Certificación Digital"
    }
  ],

  INDECOPI: [
    {
      id: "indecopi-reclama-virtual",
      title: "Presentación de Reclamos en Reclama Virtual",
      shortTitle: "Reclama Virtual",
      description: "Inicia un proceso de conciliación y mediación gratuita ante cobros indebidos, mala atención o incumplimiento de garantías comerciales.",
      url: "https://enlinea.indecopi.gob.pe/reclamavirtual/",
      isFeatured: true,
      featuredBadge: "⭐ Defensa del Consumidor / Gratuito",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Respuesta en 15 días",
      requirements: ["Comprobante de compra o contrato", "RUC o razón social del proveedor"],
      bannerGradient: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
      iconType: "shield-alert",
      visualTag: "Consumo & Reclamos"
    },
    {
      id: "indecopi-registro-marcas",
      title: "Registro de Marcas y Nombres Comerciales",
      shortTitle: "Registro de Marcas",
      description: "Protege legalmente el nombre, logotipo o eslogan de tu emprendimiento o empresa ante INDECOPI por 10 años.",
      url: "https://servicios.indecopi.gob.pe/",
      isFeatured: false,
      cost: "S/ 534.99",
      timeEstimate: "Evaluación en 30 a 45 días",
      requirements: ["Búsqueda fonética previa", "Logotipo en alta resolución"],
      bannerGradient: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)",
      iconType: "legal",
      visualTag: "Propiedad Intelectual"
    }
  ],

  OSIPTEL: [
    {
      id: "osiptel-checa-tu-imei",
      title: "Checa tu IMEI (Consulta de Celular Robado o Bloqueado)",
      shortTitle: "Checa tu IMEI",
      description: "Verifica si un equipo celular está reportado por robo, hurto o pérdida ante los operadores móviles del Perú.",
      url: "https://www.osiptel.gob.pe/checatuimei/",
      isFeatured: true,
      featuredBadge: "⭐ Consulta Preventiva Gratuita",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["Código IMEI de 15 dígitos (*#06#)"],
      bannerGradient: "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
      iconType: "shield-alert",
      visualTag: "Seguridad Móvil"
    }
  ],

  "PODER JUDICIAL": [
    {
      id: "pj-antecedentes-penales",
      title: "Certificado de Antecedentes Penales Electrónico (PJ)",
      shortTitle: "Antecedentes Penales",
      description: "Tramita y descarga tu certificado oficial de antecedentes penales en minutos con código de verificación QR.",
      url: "https://cape.pj.gob.pe/cape/pages/terminos-uso.xhtml",
      isFeatured: true,
      featuredBadge: "⭐ Certificado Digital Oficial",
      cost: "S/ 52.80 (Tasa Págalo.pe)",
      timeEstimate: "Entrega en 10 minutos en PDF",
      requirements: ["DNI vigente", "Pago de tasa en Págalo.pe"],
      bannerGradient: "linear-gradient(135deg, #334155 0%, #475569 100%)",
      iconType: "legal",
      visualTag: "Justicia & Legal"
    },
    {
      id: "pj-cej-expedientes",
      title: "Consulta de Expedientes Judiciales (CEJ)",
      shortTitle: "Consulta de Expedientes",
      description: "Seguimiento en línea del estado procesal, resoluciones y notificaciones de juicios civiles, laborales y de familia.",
      url: "https://cej.pj.gob.pe/cej/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["Código de expediente judicial", "Distrito judicial"],
      bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      iconType: "legal",
      visualTag: "Expedientes en Línea"
    }
  ],

  PNP: [
    {
      id: "pnp-antecedentes-policiales",
      title: "Certificado de Antecedentes Policiales Digital (CERAP)",
      shortTitle: "Antecedentes Policiales",
      description: "Obtén tu certificado oficial de la PNP desde casa con firma electrónica y código QR para trámites de trabajo o estudios.",
      url: "https://sistemas.policia.gob.pe/cerapdigital/",
      isFeatured: true,
      featuredBadge: "⭐ Trámite 100% Digital",
      cost: "S/ 5.40 (Págalo.pe Cód. 08155)",
      timeEstimate: "15 minutos",
      requirements: ["DNI vigente", "Pago de tasa en Págalo.pe"],
      bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      iconType: "legal",
      visualTag: "Certificación Policial"
    },
    {
      id: "pnp-denuncia-digital",
      title: "Denuncia Policial Digital por Pérdida de Documentos",
      shortTitle: "Denuncia por Pérdida",
      description: "Emite tu copia certificada de denuncia policial digital por pérdida o extravío de DNI, pasaporte, facturas o placas.",
      url: "https://sistemas.policia.gob.pe/denunciadigital/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Descarga en 5 minutos",
      requirements: ["DNI vigente", "Detalle de los documentos perdidos"],
      bannerGradient: "linear-gradient(135deg, #1E293B 0%, #475569 100%)",
      iconType: "legal",
      visualTag: "Denuncia Digital"
    }
  ],

  MTPE: [
    {
      id: "mtpe-cul",
      title: "Certificado Único Laboral (CUL)",
      shortTitle: "Certificado Único Laboral",
      description: "Documento oficial gratuito expedido por el MTPE que reúne tus antecedentes penales, policiales, judiciales, identidad y experiencia formal.",
      url: "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/",
      isFeatured: true,
      featuredBadge: "⭐ 100% Gratuito / Antecedentes + CV",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Descarga inmediata en PDF",
      requirements: ["DNI vigente", "Cuenta en Empleos Perú"],
      bannerGradient: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
      iconType: "briefcase",
      visualTag: "Empleo Formal"
    }
  ],

  ONP: [
    {
      id: "onp-estado-cuenta",
      title: "Consulta de Estado de Cuenta y Aportes al SNP",
      shortTitle: "Aportes ONP (19990)",
      description: "Verifica cuántos años y meses de aportes tienes registrados formalmente en la ONP con tu clave virtual.",
      url: "https://onpvirtual.pe/",
      isFeatured: true,
      featuredBadge: "⭐ Consulta de Pensiones",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["DNI y clave virtual ONP"],
      bannerGradient: "linear-gradient(135deg, #C2410C 0%, #D97706 100%)",
      iconType: "wallet",
      visualTag: "Fondo Previsional"
    },
    {
      id: "onp-solicitud-jubilacion",
      title: "Solicitud de Pensión de Jubilación",
      shortTitle: "Trámite de Jubilación",
      description: "Inicia el trámite de jubilación para el régimen general (20 años de aportes) o pensión proporcional (10 a 15 años).",
      url: "https://onpvirtual.pe/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "30 a 90 días",
      requirements: ["Tener 65 años o más", "Sustento de aportes laborales"],
      bannerGradient: "linear-gradient(135deg, #9A3412 0%, #C2410C 100%)",
      iconType: "wallet",
      visualTag: "Jubilación"
    }
  ],

  SUNAFIL: [
    {
      id: "sunafil-verifica-tu-chamba",
      title: "Verifica si estás en Planilla (Verifica tu Chamba)",
      shortTitle: "Verifica tu Planilla",
      description: "Consulta anónimamente si tu empleador te registró formalmente en la planilla electrónica y si recibes tus beneficios laborales.",
      url: "https://aplicacionesweb6.sunafil.gob.pe/si.verificacionPlanilla/",
      isFeatured: true,
      featuredBadge: "⭐ Consulta 100% Confidencial",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      requirements: ["DNI y RUC de la empresa empleadora"],
      bannerGradient: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
      iconType: "briefcase",
      visualTag: "Derechos Laborales"
    },
    {
      id: "sunafil-denuncia-laboral",
      title: "Denuncia Laboral Virtual Confidencial",
      shortTitle: "Denuncia Laboral",
      description: "Reporta incumplimientos de sueldos, falta de pago de CTS, gratificaciones o despidos arbitrarios ante los inspectores de SUNAFIL.",
      url: "https://aplicacionesweb5.sunafil.gob.pe/si.denunciasVirtuales/",
      isFeatured: false,
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Asignación de inspector en 10 días",
      requirements: ["RUC del empleador", "Pruebas o boletas de pago"],
      bannerGradient: "linear-gradient(135deg, #9A3412 0%, #C2410C 100%)",
      iconType: "briefcase",
      visualTag: "Inspección de Trabajo"
    }
  ]
};

/**
 * Obtiene la lista completa y enriquecida de trámites de una entidad
 */
export function getEntityOfficialProcedures(acronym: string): DirectProcedureItem[] {
  const normAcro = (acronym || "").toUpperCase().trim();
  if (OFFICIAL_PROCEDURES_BY_ENTITY[normAcro]) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[normAcro];
  }

  // Fallback genérico para cualquier otra institución del estado
  return [
    {
      id: `${normAcro}-sede-digital`,
      title: `Sede Digital y Trámites Oficiales de ${normAcro}`,
      shortTitle: `Portal Oficial ${normAcro}`,
      description: `Acceso directo a la plataforma institucional oficial, mesa de partes digital y servicios al ciudadano de ${normAcro}.`,
      url: `https://www.gob.pe/${normAcro.toLowerCase()}`,
      isFeatured: true,
      featuredBadge: "⭐ Portal Oficial del Estado",
      cost: "Gratuito / Según TUPA",
      timeEstimate: "Online 24/7",
      requirements: ["DNI del titular", "Acceso vía web"],
      bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      iconType: "document",
      visualTag: "Sede Institucional"
    }
  ];
}

/**
 * Genera el icono monocromático estilo ChatGPT en trazo vectorial limpio (stroke fino, color currentColor).
 */
export function getTramiteChatGPTIcon(iconType: string, title?: string): React.ReactNode {
  const norm = (iconType || title || "").toLowerCase();

  // Vehicular / Autos / Brevetes
  if (norm.includes("vehicle") || norm.includes("vehicul") || norm.includes("placa") || norm.includes("conduc") || norm.includes("brevete")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0" />
        <path d="M7 7l2-4h6l2 4" />
      </svg>
    );
  }

  // DNI / Identidad / C4 / Tarjetas
  if (norm.includes("id-card") || norm.includes("dni") || norm.includes("identidad") || norm.includes("c4") || norm.includes("duplicado")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h2M15 12h2M7 16h10" />
      </svg>
    );
  }

  // Tributos / RUC / Recibos / Comprobantes
  if (norm.includes("receipt") || norm.includes("ruc") || norm.includes("tribut") || norm.includes("honorario") || norm.includes("renta")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l3-1.5 3 1.5 3-1.5 3 1.5 3-1.5 3 1.5V2l-3 1.5-3-1.5-3 1.5-3-1.5-3 1.5L4 2z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  // Pasaporte / Viajes
  if (norm.includes("passport") || norm.includes("viaje") || norm.includes("migratorio") || norm.includes("residencia")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="11" r="3.5" />
        <path d="M12 7.5v7M8.5 11h7" />
      </svg>
    );
  }

  // Salud / Seguros / EsSalud / SIS
  if (norm.includes("health") || norm.includes("salud") || norm.includes("seguro") || norm.includes("medico")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }

  // Predios / Inmuebles / Copia Literal
  if (norm.includes("deed") || norm.includes("inmueble") || norm.includes("predio") || norm.includes("copia literal") || norm.includes("propiedad")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M9 14h1M14 10h1M14 14h1M9 21v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
    );
  }

  // Pagos / Billetera / BN / Tasas
  if (norm.includes("wallet") || norm.includes("pago") || norm.includes("tasa") || norm.includes("banco") || norm.includes("deuda") || norm.includes("pension")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M16 14h2" />
      </svg>
    );
  }

  // Educación / Títulos / Grados
  if (norm.includes("education") || norm.includes("grado") || norm.includes("titulo") || norm.includes("estudio") || norm.includes("beca")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    );
  }

  // Legal / Antecedentes / Judicial / Penal / Policial
  if (norm.includes("legal") || norm.includes("antecedente") || norm.includes("penal") || norm.includes("policial") || norm.includes("poder")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10" />
        <path d="m16 16 6-6a2 2 0 0 0 0-2.83l-3.17-3.17a2 2 0 0 0-2.83 0L10 10" />
        <path d="m8 8 3-3" />
        <path d="m2 22 4-4" />
      </svg>
    );
  }

  // Reclamos / IMEI / Alerta
  if (norm.includes("shield-alert") || norm.includes("reclamo") || norm.includes("imei") || norm.includes("alerta")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }

  // Trabajo / Empleo / SUNAFIL / MTPE
  if (norm.includes("briefcase") || norm.includes("trabajo") || norm.includes("empleo") || norm.includes("planilla") || norm.includes("cul")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 12v.01" />
      </svg>
    );
  }

  // Default: Documento oficial
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
