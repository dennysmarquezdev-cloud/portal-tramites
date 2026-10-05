export interface CivicEntityInfo {
  id: string;
  acronym: string;
  name: string;
  category: string;
  categoryColor: string;
  categoryBgLight: string;
  categoryTextColor: string;
  description: string;
  color: string;
  bannerUrl?: string;
  logoUrl?: string;
  popularProcedures: {
    title: string;
    description: string;
    url?: string;
  }[];
}

export const CIVIC_ENTITIES: CivicEntityInfo[] = [
  // ── 1. Identidad, Trámites Civiles y Migración (Azul Cobalto) ──
  {
    id: "RENIEC",
    acronym: "RENIEC",
    name: "Registro Nacional de Identificación y Estado Civil",
    category: "Identidad, Trámites Civiles y Migración",
    categoryColor: "#1E40AF",
    categoryBgLight: "#EFF6FF",
    categoryTextColor: "#172554",
    description: "Aquí puedo orientarte con la emisión y renovación de DNI / DNIe, duplicados por pérdida o robo, actas oficiales de nacimiento, matrimonio o defunción y certificados C4.",
    color: "#1E40AF",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTAwMDI0LCJwdXIiOiJibG9iX2lkIn19--d3c75bd6a2e57cdd6c47c77ace7d54111dc81b37/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Logotipo%20RENIEC.png",
    popularProcedures: [
      {
        title: "Renovación de DNI por Caducidad (DNIe / DNI Azul)",
        description: "Renueva tu documento con foto desde la app DNI BioFacial y recógelo en agencia.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=RENIEC"
      },
      {
        title: "Duplicado de DNI vía Web",
        description: "Solicita un duplicado exacto de tu DNI vigente por robo o extravío.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=RENIEC"
      },
      {
        title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
        description: "Descarga actas digitales con código QR de verificación oficial.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=RENIEC"
      },
      {
        title: "Certificado de Inscripción C4",
        description: "Obtén la constancia informativa de tu identidad para trámites bancarios y notariales.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=RENIEC"
      }
    ]
  },
  {
    id: "MIGRACIONES",
    acronym: "MIGRACIONES",
    name: "Superintendencia Nacional de Migraciones",
    category: "Identidad, Trámites Civiles y Migración",
    categoryColor: "#1E40AF",
    categoryBgLight: "#EFF6FF",
    categoryTextColor: "#172554",
    description: "Aquí puedo orientarte con la obtención y citas de Pasaporte Electrónico Biométrico, trámites para ciudadanos extranjeros, prórrogas de residencia y certificado de movimiento migratorio.",
    color: "#1E40AF",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTUyNzAsInB1ciI6ImJsb2JfaWQifX0=--ba0cabc88fba34b64c2156339fc7e25bbfa72f7b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/LOGO-DE-MIGRACIONES-RGB.png",
    popularProcedures: [
      {
        title: "Citas para Pasaporte Electrónico Biométrico",
        description: "Reserva tu turno de atención tras pagar la tasa en Págalo.pe (código 01810).",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MIGRACIONES"
      },
      {
        title: "Certificado de Movimiento Migratorio",
        description: "Registro oficial de tus entradas y salidas del territorio peruano.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MIGRACIONES"
      },
      {
        title: "Prórroga de Permanencia o Residencia para Extranjeros",
        description: "Extiende la vigencia de estadía legal de forma 100% digital en la agencia virtual.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MIGRACIONES"
      }
    ]
  },

  // ── 2. Economía, Impuestos y Registros (Verde Esmeralda) ──
  {
    id: "SUNAT",
    acronym: "SUNAT",
    name: "Superintendencia Nacional de Aduanas y de Administración Tributaria",
    category: "Economía, Impuestos y Registros",
    categoryColor: "#047857",
    categoryBgLight: "#ECFDF5",
    categoryTextColor: "#064E3B",
    description: "Aquí puedo orientarte con la emisión y consulta de RUC, Clave SOL, recibos por honorarios electrónicos, comprobantes de pago y declaraciones tributarias.",
    color: "#047857",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
    popularProcedures: [
      {
        title: "Inscripción y Activación al RUC Digital",
        description: "Obtén tu RUC online con tu DNI y datos biométricos desde la app Personas o web oficial.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAT"
      },
      {
        title: "Generación y Recuperación de Clave SOL",
        description: "Crea tu contraseña de acceso a SUNAT Operaciones en Línea de forma 100% virtual.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAT"
      },
      {
        title: "Emisión de Recibos por Honorarios Electrónicos",
        description: "Emite comprobantes de 4ta categoría para trabajadores independientes sin costo.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAT"
      },
      {
        title: "Formulario 1609 (Tasa para Pasaporte y Trámites)",
        description: "Genera y paga constancias de tributos y tasas arancelarias.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAT"
      },
      {
        title: "Declaración Jurada Anual de Renta",
        description: "Guía paso a paso para presentar tu declaración de personas naturales o empresas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAT"
      }
    ]
  },
  {
    id: "SUNARP",
    acronym: "SUNARP",
    name: "Superintendencia Nacional de los Registros Públicos",
    category: "Economía, Impuestos y Registros",
    categoryColor: "#047857",
    categoryBgLight: "#ECFDF5",
    categoryTextColor: "#064E3B",
    description: "Aquí puedo orientarte con la consulta vehicular por placa, búsqueda de inmuebles y personas, copias literales de partidas, vigencia de poder y registro de empresas.",
    color: "#047857",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTMxMDgsInB1ciI6ImJsb2JfaWQifX0=--b7d54d20e9ca90018e72a7b24cdb42bda6c3026f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo-sunarp.png",
    popularProcedures: [
      {
        title: "Consulta Vehicular Gratuita (Placas y Datos)",
        description: "Verifica datos de un vehículo (marca, modelo, propietario) sin costo.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNARP"
      },
      {
        title: "Copia Literal y Certificados Registrales (SPRL)",
        description: "Descarga partidas registrales de predios, vehículos y personas jurídicas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNARP"
      },
      {
        title: "Alerta Registral Gratuita",
        description: "Recibe alertas por correo y SMS sobre cualquier movimiento en tus partidas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNARP"
      },
      {
        title: "Certificado de Vigencia de Poder",
        description: "Acredita facultades legales de representantes de empresas y apoderados.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNARP"
      }
    ]
  },
  {
    id: "SBS",
    acronym: "SBS",
    name: "Superintendencia de Banca, Seguros y AFP",
    category: "Economía, Impuestos y Registros",
    categoryColor: "#047857",
    categoryBgLight: "#ECFDF5",
    categoryTextColor: "#064E3B",
    description: "Aquí puedo orientarte con el reporte de deudas en la central de riesgos, historial crediticio gratuito y normativa previsional y bancaria.",
    color: "#047857",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
    popularProcedures: [
      {
        title: "Reporte de Deudas SBS Gratuito",
        description: "Consulta en línea tu calificación crediticia oficial y deudas registradas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SBS"
      },
      {
        title: "Consulta de Constancia de Afiliación AFP",
        description: "Verifica a qué administradora privada de fondos de pensiones perteneces.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SBS"
      }
    ]
  },
  {
    id: "BN",
    acronym: "BN",
    name: "Banco de la Nación del Perú",
    category: "Economía, Impuestos y Registros",
    categoryColor: "#047857",
    categoryBgLight: "#ECFDF5",
    categoryTextColor: "#064E3B",
    description: "Aquí puedo orientarte con el pago de tasas oficiales y aranceles en Págalo.pe, Cuenta DNI y giros bancarios nacionales.",
    color: "#047857",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
    popularProcedures: [
      {
        title: "Pago de Tasas Administrativas en Págalo.pe",
        description: "Paga tasas de RENIEC, MTC, Migraciones, Poder Judicial y PNP con tarjeta o Yape.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=BN"
      },
      {
        title: "Activación y Consulta de Cuenta DNI",
        description: "Billetera digital del Banco de la Nación para cobro de subsidios del Estado.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=BN"
      }
    ]
  },
  {
    id: "SMV",
    acronym: "SMV",
    name: "Superintendencia del Mercado de Valores",
    category: "Economía, Impuestos y Registros",
    categoryColor: "#047857",
    categoryBgLight: "#ECFDF5",
    categoryTextColor: "#064E3B",
    description: "Aquí puedo orientarte sobre la supervisión de fondos mutuos, mercado bursátil y empresas con oferta pública de valores.",
    color: "#047857",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTE0MzI1LCJwdXIiOiJibG9iX2lkIn19--e304b83d6073b962dde69879ad3194c38c68493d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo.png",
    popularProcedures: [
      {
        title: "Registro Público del Mercado de Valores",
        description: "Consulta de prospectos informativos y hechos de importancia de emisores.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SMV"
      }
    ]
  },

  // ── 3. Salud (Cian Médico) ──
  {
    id: "ESSALUD",
    acronym: "ESSALUD",
    name: "Seguro Social de Salud del Perú",
    category: "Salud",
    categoryColor: "#0284C7",
    categoryBgLight: "#F0F9FF",
    categoryTextColor: "#0C4A6E",
    description: "Aquí puedo orientarte con la acreditación de asegurados, consulta de centro asistencial asignado, subsidios de maternidad o lactancia y citas médicas.",
    color: "#0284C7",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjI4OSwicHVyIjoiYmxvYl9pZCJ9fQ==--870ca7e046354e769c8b91e9c70061374fd26123/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/essalud%20341x86%202019.png",
    popularProcedures: [
      {
        title: "Consulta de Acreditación y Vigencia de Seguro",
        description: "Revisa si tu seguro está activo y con cobertura vigente con tu DNI.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ESSALUD"
      },
      {
        title: "¿Dónde me atiendo? (Centro Asistencial)",
        description: "Conoce el policlínico u hospital de EsSalud que te corresponde según tu domicilio.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ESSALUD"
      },
      {
        title: "Subsidio por Lactancia y Maternidad",
        description: "Requisitos y trámite digital de pago de subsidio para madres trabajadoras.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ESSALUD"
      }
    ]
  },
  {
    id: "SIS",
    acronym: "SIS",
    name: "Seguro Integral de Salud",
    category: "Salud",
    categoryColor: "#0284C7",
    categoryBgLight: "#F0F9FF",
    categoryTextColor: "#0C4A6E",
    description: "Aquí puedo orientarte con la afiliación virtual al SIS Gratuito o Independiente, consulta de asegurado y cobertura médica del Estado.",
    color: "#0284C7",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Mjg0MjQwLCJwdXIiOiJibG9iX2lkIn19--2598cf604ffad987885ccc7c1850644694e676d2/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logoPNG35.png",
    popularProcedures: [
      {
        title: "Consulta de Asegurado SIS en Línea",
        description: "Verifica con tu DNI si cuentas con seguro SIS activo y en qué centro de salud.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SIS"
      },
      {
        title: "Afiliación Virtual al SIS Gratuito",
        description: "Inscríbete por internet si no cuentas con otro seguro de salud.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SIS"
      }
    ]
  },
  {
    id: "MINSA",
    acronym: "MINSA",
    name: "Ministerio de Salud",
    category: "Salud",
    categoryColor: "#0284C7",
    categoryBgLight: "#F0F9FF",
    categoryTextColor: "#0C4A6E",
    description: "Aquí puedo orientarte con el Carné de Vacunación Digital oficial, establecimientos de salud y programas de prevención.",
    color: "#0284C7",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
    popularProcedures: [
      {
        title: "Carné de Vacunación Digital",
        description: "Descarga tu constancia oficial con código QR con todas tus dosis registradas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MINSA"
      }
    ]
  },
  {
    id: "SUSALUD",
    acronym: "SUSALUD",
    name: "Superintendencia Nacional de Salud",
    category: "Salud",
    categoryColor: "#0284C7",
    categoryBgLight: "#F0F9FF",
    categoryTextColor: "#0C4A6E",
    description: "Aquí puedo orientarte sobre la protección de los derechos en salud, atención de reclamos y fiscalización de clínicas y hospitales.",
    color: "#0284C7",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTE3ODIsInB1ciI6ImJsb2JfaWQifX0=--9dff934b1f3307e7f63962607dfcaa85b89a412a/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo.png",
    popularProcedures: [
      {
        title: "Reclamo por Vulneración de Derechos en Salud",
        description: "Presenta denuncias contra centros de salud públicos y privados ante SUSALUD.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUSALUD"
      }
    ]
  },
  {
    id: "DIGEMID",
    acronym: "DIGEMID",
    name: "Dirección General de Medicamentos, Insumos y Drogas (MINSA)",
    category: "Salud",
    categoryColor: "#0284C7",
    categoryBgLight: "#F0F9FF",
    categoryTextColor: "#0C4A6E",
    description: "Aquí puedo orientarte sobre la regulación, registro sanitario y control de medicamentos, cosméticos, dispositivos médicos y farmacias en el Perú.",
    color: "#0284C7",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
    popularProcedures: [
      {
        title: "Consulta de Registro Sanitario de Medicamentos",
        description: "Verifica si un medicamento, producto biológico o genérico cuenta con autorización sanitaria vigente.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=DIGEMID"
      },
      {
        title: "Observatorio de Precios de Medicamentos",
        description: "Compara precios oficiales y disponibilidad de fármacos en boticas y farmacias autorizadas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=DIGEMID"
      }
    ]
  },

  // ── 4. Trabajo y Pensiones (Terracota Ejecutivo) ──
  {
    id: "ONP",
    acronym: "ONP",
    name: "Oficina de Normalización Previsional",
    category: "Trabajo y Pensiones",
    categoryColor: "#C2410C",
    categoryBgLight: "#FFF7ED",
    categoryTextColor: "#7C2D12",
    description: "Aquí puedo orientarte con el cálculo de pensión de jubilación, estado de aportes al Sistema Nacional de Pensiones (SNP DL 19990) y constancias de pago.",
    color: "#C2410C",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NjA4NTMyLCJwdXIiOiJibG9iX2lkIn19--b78f54082106811109db9f7375b4b93e5a87a705/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Logo_gob.png",
    popularProcedures: [
      {
        title: "Consulta de Estado de Cuenta y Aportes al SNP",
        description: "Verifica cuántos años de aportes tienes registrados en la ONP con tu clave virtual.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ONP"
      },
      {
        title: "Solicitud de Pensión de Jubilación (19990)",
        description: "Tramita tu jubilación con 20 años de aportes o pensión proporcional (10 a 15 años).",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ONP"
      }
    ]
  },
  {
    id: "SUNAFIL",
    acronym: "SUNAFIL",
    name: "Superintendencia Nacional de Fiscalización Laboral",
    category: "Trabajo y Pensiones",
    categoryColor: "#C2410C",
    categoryBgLight: "#FFF7ED",
    categoryTextColor: "#7C2D12",
    description: "Aquí puedo orientarte con la presentación de denuncias laborales virtuales confidenciales, verificación de inclusión en planilla y cálculo de beneficios.",
    color: "#C2410C",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQ1MDgsInB1ciI6ImJsb2JfaWQifX0=--da3eab854f9ab2302d77c5d98c679c410246ee37/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/LOGO_S_F.png",
    popularProcedures: [
      {
        title: "Denuncia Laboral Virtual Confidencial",
        description: "Reporta incumplimientos de sueldo, CTS, gratificación o despidos arbitrarios.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAFIL"
      },
      {
        title: "Verifica si estás en Planilla (Verifica tu Chamba)",
        description: "Consulta anónimamente si tu empleador te registró formalmente en la planilla electrónica.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNAFIL"
      }
    ]
  },
  {
    id: "MTPE",
    acronym: "MTPE",
    name: "Ministerio de Trabajo y Promoción del Empleo",
    category: "Trabajo y Pensiones",
    categoryColor: "#C2410C",
    categoryBgLight: "#FFF7ED",
    categoryTextColor: "#7C2D12",
    description: "Aquí puedo orientarte con el Certificado Único Laboral (Certijoven / Certiadulto), empleo formal y bolsa de trabajo nacional.",
    color: "#C2410C",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
    popularProcedures: [
      {
        title: "Certificado Único Laboral (CUL)",
        description: "Documento oficial gratuito que reúne antecedentes, identidad, formación y experiencia.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MTPE"
      }
    ]
  },
  {
    id: "AFP",
    acronym: "AFP",
    name: "Asociación de AFP / Sistema Privado de Pensiones",
    category: "Trabajo y Pensiones",
    categoryColor: "#C2410C",
    categoryBgLight: "#FFF7ED",
    categoryTextColor: "#7C2D12",
    description: "Aquí puedo orientarte con la consulta de fondos de pensiones privados, estado de cuenta individual y retiros autorizados.",
    color: "#C2410C",
    popularProcedures: [
      {
        title: "Consulta de Estado de Cuenta AFP",
        description: "Revisa tu fondo acumulado en Integra, Prima, Profuturo o Habitat.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=AFP"
      }
    ]
  },

  // ── 5. Transporte y Tránsito (Petróleo / Teal Puro) ──
  {
    id: "MTC",
    acronym: "MTC",
    name: "Ministerio de Transportes y Comunicaciones",
    category: "Transporte y Tránsito",
    categoryColor: "#0F766E",
    categoryBgLight: "#F0FDFA",
    categoryTextColor: "#134E48",
    description: "Aquí puedo orientarte con la obtención, revalidación y duplicado de Licencias de Conducir (Brevete A-I, A-II), récord del conductor y sistema de puntos.",
    color: "#0F766E",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
    popularProcedures: [
      {
        title: "Emisión y Revalidación de Licencia Electrónica (Brevete)",
        description: "Obtén tu licencia digital con código QR con validez nacional e internacional.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MTC"
      },
      {
        title: "Récord del Conductor y Sistema de Puntos",
        description: "Consulta tu historial de papeletas y puntos acumulados por infracciones.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MTC"
      },
      {
        title: "Simulacro Oficial de Examen de Reglas MTC",
        description: "Practica para tu examen de reglas de tránsito en línea.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MTC"
      }
    ]
  },
  {
    id: "SUTRAN",
    acronym: "SUTRAN",
    name: "Superintendencia de Transporte Terrestre de Personas, Carga y Mercancías",
    category: "Transporte y Tránsito",
    categoryColor: "#0F766E",
    categoryBgLight: "#F0FDFA",
    categoryTextColor: "#134E48",
    description: "Aquí puedo orientarte con la fiscalización del transporte terrestre nacional, verificación de papeletas viales e infracciones en carreteras.",
    color: "#0F766E",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTI0MDYsInB1ciI6ImJsb2JfaWQifX0=--e322b64911c42e8e695fa74e96516cff327f7507/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo_sutran20.png",
    popularProcedures: [
      {
        title: "Consulta de Récord de Infracciones SUTRAN",
        description: "Verifica papeletas pendientes en la red vial nacional por placa o DNI.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUTRAN"
      }
    ]
  },
  {
    id: "SAT LIMA",
    acronym: "SAT LIMA",
    name: "Servicio de Administración Tributaria de Lima",
    category: "Transporte y Tránsito",
    categoryColor: "#0F766E",
    categoryBgLight: "#F0FDFA",
    categoryTextColor: "#134E48",
    description: "Aquí puedo orientarte con la consulta y pago de papeletas de tránsito en Lima Metropolitana, impuesto vehicular, predial y alcabala.",
    color: "#0F766E",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/517/campaign_Medios_Digitales_-_remate_de_inmueble-v2s-04__2_.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTI4MDAwLCJwdXIiOiJibG9iX2lkIn19--d48025fe36e7f20d28bb6658ae408e0afa5a144f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logoSAT2023.png",
    popularProcedures: [
      {
        title: "Consulta de Papeletas de Tránsito por Placa o DNI",
        description: "Revisa infracciones pendientes y descuentos por pronto pago en Lima.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SAT%20LIMA"
      },
      {
        title: "Pago de Impuesto Vehicular y Predial",
        description: "Liquidación y pago en línea de tributos municipales de Lima.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SAT%20LIMA"
      }
    ]
  },
  {
    id: "ATU",
    acronym: "ATU",
    name: "Autoridad de Transporte Urbano para Lima y Callao",
    category: "Transporte y Tránsito",
    categoryColor: "#0F766E",
    categoryBgLight: "#F0FDFA",
    categoryTextColor: "#134E48",
    description: "Aquí puedo orientarte sobre la habilitación vehicular para taxis, transporte escolar, rutas y fiscalización de transporte público.",
    color: "#0F766E",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTE4NzcsInB1ciI6ImJsb2JfaWQifX0=--9a9890747e1f4d8d601f164756815e9571fb3005/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Logo-Atu-.png",
    popularProcedures: [
      {
        title: "Consulta de Tarjeta Única de Circulación (TUC)",
        description: "Verifica si un vehículo o taxi cuenta con autorización oficial vigente.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ATU"
      }
    ]
  },

  // ── 6. Educación y Formación (Índigo) ──
  {
    id: "SUNEDU",
    acronym: "SUNEDU",
    name: "Superintendencia Nacional de Educación Superior Universitaria",
    category: "Educación y Formación",
    categoryColor: "#4338CA",
    categoryBgLight: "#EEF2FF",
    categoryTextColor: "#312E81",
    description: "Aquí puedo orientarte con el Registro Nacional de Grados y Títulos, constancias de inscripción de diplomas y validación de títulos universitarios.",
    color: "#4338CA",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTcyMjIsInB1ciI6ImJsb2JfaWQifX0=--93d9f21d08eaea85158bcee9b14edeba5ed621b9/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo-superintendencia-nacional-de-educacion-superior-universitaria.png",
    popularProcedures: [
      {
        title: "Consulta en Línea del Registro de Grados y Títulos",
        description: "Verifica si tu grado de bachiller o título profesional está registrado ante SUNEDU.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNEDU"
      },
      {
        title: "Constancia de Inscripción de Grado o Título",
        description: "Descarga el certificado digital oficial para concursos públicos o empleos.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNEDU"
      }
    ]
  },
  {
    id: "MINEDU",
    acronym: "MINEDU",
    name: "Ministerio de Educación",
    category: "Educación y Formación",
    categoryColor: "#4338CA",
    categoryBgLight: "#EEF2FF",
    categoryTextColor: "#312E81",
    description: "Aquí puedo orientarte con la emisión de certificados oficiales de estudios escolares, convalidaciones educativas y escalafón magisterial.",
    color: "#4338CA",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
    popularProcedures: [
      {
        title: "Certificado Oficial de Estudios Escolares",
        description: "Solicita y descarga tu constancia de logros de aprendizaje de primaria y secundaria.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MINEDU"
      }
    ]
  },
  {
    id: "PRONABEC",
    acronym: "PRONABEC",
    name: "Programa Nacional de Becas y Crédito Educativo",
    category: "Educación y Formación",
    categoryColor: "#4338CA",
    categoryBgLight: "#EEF2FF",
    categoryTextColor: "#312E81",
    description: "Aquí puedo orientarte con las convocatorias, requisitos y postulaciones a Beca 18, Beca Permanencia y créditos educativos.",
    color: "#4338CA",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Mzc5MjMsInB1ciI6ImJsb2JfaWQifX0=--3a5eda6c95495edfea841c31d5c4835d079b2a53/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Pronabec-Logo-2020.png",
    popularProcedures: [
      {
        title: "Postulación y Requisitos a Beca 18",
        description: "Bases, cronogramas y simulación de puntajes para becas integrales de pregrado.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=PRONABEC"
      }
    ]
  },
  {
    id: "SINEACE",
    acronym: "SINEACE",
    name: "Sistema Nacional de Evaluación, Acreditación y Certificación de la Calidad Educativa",
    category: "Educación y Formación",
    categoryColor: "#4338CA",
    categoryBgLight: "#EEF2FF",
    categoryTextColor: "#312E81",
    description: "Aquí puedo orientarte con la acreditación de carreras universitarias e institutos, y certificación oficial de competencias laborales.",
    color: "#4338CA",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTMyNDksInB1ciI6ImJsb2JfaWQifX0=--c967628e3d0df6bcf5694743b541b4ba16f7462b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo%20grande%20%20fondo%20transparente.png",
    popularProcedures: [
      {
        title: "Consulta de Programas e Instituciones Acreditadas",
        description: "Verifica carreras universitarias e institutos con acreditación oficial de calidad.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SINEACE"
      },
      {
        title: "Instituciones y Carreras Acreditadas SINEACE",
        description: "Consulta si un programa universitario o instituto está acreditado.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SINEACE"
      }
    ]
  },

  // ── 7. Consumo, Regulación y Servicios (Púrpura) ──
  {
    id: "INDECOPI",
    acronym: "INDECOPI",
    name: "Instituto Nacional de Defensa de la Competencia y Protección de la Propiedad Intelectual",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte con la presentación de reclamos de consumo, Libro de Reclamaciones, registro de marcas y defensa del consumidor.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQxNTksInB1ciI6ImJsb2JfaWQifX0=--609354d1146d50637057b8571eefcf3794d35e60/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/layout_set_logo_Indecopi.png",
    popularProcedures: [
      {
        title: "Presentación de Reclamos en Reclama Virtual",
        description: "Inicia una mediación gratuita ante cobros indebidos, garantías o mal servicio.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=INDECOPI"
      },
      {
        title: "Registro de Marcas y Nombres Comerciales",
        description: "Protege el nombre o logo de tu emprendimiento o empresa ante INDECOPI.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=INDECOPI"
      }
    ]
  },
  {
    id: "OSIPTEL",
    acronym: "OSIPTEL",
    name: "Organismo Supervisor de Inversión Privada en Telecomunicaciones",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte con el bloqueo de celulares por IMEI (Checa tu IMEI), reclamos de telefonía móvil e internet y portabilidad numérica.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzEzNywicHVyIjoiYmxvYl9pZCJ9fQ==--28d213f8ba99764268128ecdef4133e501ac338b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo.png",
    popularProcedures: [
      {
        title: "Checa tu IMEI (Consulta de Celular Robado o Bloqueado)",
        description: "Verifica si un celular está reportado por robo o hurto ante los operadores.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=OSIPTEL"
      },
      {
        title: "Orientación y Reclamos ante Empresas Operadoras (SOCIO)",
        description: "Presenta y da seguimiento a reclamos por cobros indebidos o fallas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=OSIPTEL"
      }
    ]
  },
  {
    id: "OSINERGMIN",
    acronym: "OSINERGMIN",
    name: "Organismo Supervisor de la Inversión en Energía y Minería",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte sobre la supervisión del recibo de luz, tarifas eléctricas, balón de gas doméstico (Facilito) y suministro de gas natural.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzAxOTQyLCJwdXIiOiJibG9iX2lkIn19--395e4217d53490b00ceff80b20fc262d6c93d54f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo-gob.pe.png",
    popularProcedures: [
      {
        title: "Facilito Balón de Gas y Combustibles",
        description: "Encuentra los precios más económicos y distribuidores formales de GLP y gasolina.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=OSINERGMIN"
      }
    ]
  },
  {
    id: "SUNASS",
    acronym: "SUNASS",
    name: "Superintendencia Nacional de Servicios de Saneamiento",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte sobre la regulación y fiscalización del servicio de agua potable, reclamos contra empresas de saneamiento y cortes de agua.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTcxOTMsInB1ciI6ImJsb2JfaWQifX0=--8e2e7f6f975f16a60078543c7c7f4c346a44914f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo-sunass-1.png",
    popularProcedures: [
      {
        title: "Orientación y Reclamos por Servicio de Agua Potable",
        description: "Guía para denunciar cobros excesivos, falta de agua o cortes injustificados.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SUNASS"
      }
    ]
  },
  {
    id: "OSITRAN",
    acronym: "OSITRAN",
    name: "Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte sobre la supervisión de aeropuertos, puertos, carreteras concesionadas, Metro de Lima y derechos de los usuarios.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTY5MDY5LCJwdXIiOiJibG9iX2lkIn19--61f212e5ac8330cc94898a962de63a07f0fe99d2/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo%20Ositr%C3%A1n%2035%20x%20122%20px%20(1).png",
    popularProcedures: [
      {
        title: "Atención al Usuario y Reclamos de Infraestructura",
        description: "Reclamos sobre peajes, aeropuertos y carreteras concesionadas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=OSITRAN"
      }
    ]
  },
  {
    id: "SEDAPAL",
    acronym: "SEDAPAL",
    name: "Servicio de Agua Potable y Alcantarillado de Lima",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte con la consulta y pago de tu recibo de agua en Lima y Callao, reporte de fugas, cortes programados y cambio de titularidad.",
    color: "#7C3AED",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzcwNzEsInB1ciI6ImJsb2JfaWQifX0=--43de7dd307f8023f4ef156291b0f169b248c5c96/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Logo%20Sedapal_1.png",
    popularProcedures: [
      {
        title: "Consulta y Pago de Recibo SEDAPAL Virtual",
        description: "Revisa tu estado de cuenta y paga en línea con tu número de suministro.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SEDAPAL"
      }
    ]
  },
  {
    id: "SEDAPAR",
    acronym: "SEDAPAR",
    name: "Servicio de Agua Potable y Alcantarillado de Arequipa",
    category: "Consumo, Regulación y Servicios",
    categoryColor: "#7C3AED",
    categoryBgLight: "#FAF5FF",
    categoryTextColor: "#581C87",
    description: "Aquí puedo orientarte con trámites comerciales, recibo de agua potable y reportes técnicos en Arequipa.",
    color: "#7C3AED",
    popularProcedures: [
      {
        title: "Oficina Virtual SEDAPAR Arequipa",
        description: "Consulta de recibos y trámites de suministro de agua potable.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SEDAPAR"
      }
    ]
  },

  // ── 8. Justicia, Legalidad y Orden (Gris Pizarra) ──
  {
    id: "PODER JUDICIAL",
    acronym: "PODER JUDICIAL",
    name: "Poder Judicial del Perú",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte con el Certificado Electrónico de Antecedentes Penales, consulta de expedientes judiciales (CEJ) y casillas judiciales.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/013/754/campaign_MARAT%C3%93N-JUDICIAL-PAQTAYTA.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzQzMjQ0LCJwdXIiOiJibG9iX2lkIn19--844421bb26e2b3316a075f152c5b2fea925ff674/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/LOGO-PJ-TRANSPARENTE.png",
    popularProcedures: [
      {
        title: "Certificado de Antecedentes Penales Electrónico (PJ)",
        description: "Tramita y descarga tu constancia oficial de antecedentes en minutos.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=PODER%20JUDICIAL"
      },
      {
        title: "Consulta de Expedientes Judiciales (CEJ)",
        description: "Seguimiento online del estado de procesos judiciales civiles, laborales y de familia.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=PODER%20JUDICIAL"
      }
    ]
  },
  {
    id: "PNP",
    acronym: "PNP",
    name: "Policía Nacional del Perú",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte con el Certificado Digital de Antecedentes Policiales (CERAP), denuncias digitales por pérdida de documentos y citas de tránsito.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTUwNzkwLCJwdXIiOiJibG9iX2lkIn19--5ac6b312d7b0b5634a5f8ca09fe46826216e0eb5/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/EMBLEMA%20PNP.png",
    popularProcedures: [
      {
        title: "Certificado de Antecedentes Policiales Digital (CERAP)",
        description: "Obtén tu certificado oficial de la PNP desde casa con pago en Págalo.pe.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=PNP"
      },
      {
        title: "Denuncia Policial Digital por Pérdida de Documentos",
        description: "Constancia policial digital con firma electrónica válida para duplicados.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=PNP"
      }
    ]
  },
  {
    id: "INPE",
    acronym: "INPE",
    name: "Instituto Nacional Penitenciario",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte sobre el certificado de antecedentes judiciales y trámites penitenciarios oficiales.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTMyNzEsInB1ciI6ImJsb2JfaWQifX0=--8b73ac434cb4f7d1e6fa8f227ed121e42bf93061/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo_inpe_.png",
    popularProcedures: [
      {
        title: "Certificado de Antecedentes Judiciales",
        description: "Constancia oficial expedida por el INPE para trámites legales o de empleo.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=INPE"
      }
    ]
  },
  {
    id: "MINJUSDH",
    acronym: "MINJUSDH",
    name: "Ministerio de Justicia y Derechos Humanos",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte con la Defensa Pública Gratuita en alimentos, filiación o violencia familiar y centros de conciliación extrajudicial.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
    popularProcedures: [
      {
        title: "Defensa Pública y Asesoría Legal Gratuita",
        description: "Abogados de oficio del Estado para personas de bajos recursos económicos.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MINJUSDH"
      }
    ]
  },
  {
    id: "MPFN",
    acronym: "MPFN",
    name: "Ministerio Público - Fiscalía de la Nación",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte sobre la presentación de denuncias penales virtuales, consulta de carpetas fiscales y medicina legal.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjIxMzQ3LCJwdXIiOiJibG9iX2lkIn19--92ee043991e98ee3447f395fee7f182397900965/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Horizontal-escudo.png",
    popularProcedures: [
      {
        title: "Mesa de Partes Virtual y Denuncia Penal",
        description: "Presenta denuncias penales por delitos y adjunta pruebas digitales.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MPFN"
      },
      {
        title: "Consulta de Estado de Casos Fiscales",
        description: "Seguimiento del trámite e investigación preliminar en fiscalías.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=MPFN"
      }
    ]
  },
  {
    id: "DEFENSORIA",
    acronym: "DEFENSORIA",
    name: "Defensoría del Pueblo",
    category: "Justicia, Legalidad y Orden",
    categoryColor: "#475569",
    categoryBgLight: "#F1F5F9",
    categoryTextColor: "#0F172A",
    description: "Aquí puedo orientarte en la defensa de tus derechos constitucionales frente a la administración pública y servicios esenciales.",
    color: "#475569",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQ0NzksInB1ciI6ImJsb2JfaWQifX0=--54a64129672a5fa6bcedec892b9357312f824240/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Nuevo-Logo-DP-RGB1.png",
    popularProcedures: [
      {
        title: "Queja ante la Defensoría del Pueblo",
        description: "Presenta quejas por vulneración de derechos o mala atención del Estado.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=DEFENSORIA"
      }
    ]
  },

  // ── 9. Sistema Electoral (Rojo Cívico) ──
  {
    id: "ONPE",
    acronym: "ONPE",
    name: "Oficina Nacional de Procesos Electorales",
    category: "Sistema Electoral",
    categoryColor: "#DC2626",
    categoryBgLight: "#FEF2F2",
    categoryTextColor: "#7F1D1D",
    description: "Aquí puedo orientarte con la consulta de local de votación, miembros de mesa, capacitación electoral y resultados de comicios.",
    color: "#DC2626",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTc2NTY0LCJwdXIiOiJibG9iX2lkIn19--edd8e1d26fec2b04ef96f98d45df7908eb6d8add/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Recurso%201.png",
    popularProcedures: [
      {
        title: "Consulta de Local de Votación y Miembros de Mesa",
        description: "Ubica tu mesa de sufragio y verifica si eres miembro de mesa.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=ONPE"
      }
    ]
  },
  {
    id: "JNE",
    acronym: "JNE",
    name: "Jurado Nacional de Elecciones",
    category: "Sistema Electoral",
    categoryColor: "#DC2626",
    categoryBgLight: "#FEF2F2",
    categoryTextColor: "#7F1D1D",
    description: "Aquí puedo orientarte con la consulta y pago de multas electorales por omisión al sufragio o mesa, y trámite de dispensas.",
    color: "#DC2626",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NDg1OTE2LCJwdXIiOiJibG9iX2lkIn19--7307fd78a17ca41f8578ec33103a0ce9ae45beaa/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logo.png",
    popularProcedures: [
      {
        title: "Consulta de Multas Electorales y Dispensas",
        description: "Revisa si tienes multas pendientes y solicita justificación o dispensa online.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=JNE"
      }
    ]
  },

  // ── 10. Recursos Naturales y Emergencias (Verde Bosque) ──
  {
    id: "INDECI",
    acronym: "INDECI",
    name: "Instituto Nacional de Defensa Civil",
    category: "Recursos Naturales y Emergencias",
    categoryColor: "#15803D",
    categoryBgLight: "#F0FDF4",
    categoryTextColor: "#14532D",
    description: "Aquí puedo orientarte con los planes de emergencia familiar ante sismos, mochila de emergencia y medidas de prevención de Defensa Civil.",
    color: "#15803D",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTM1NDgsInB1ciI6ImJsb2JfaWQifX0=--4e757c628a79366e4cfac532d38251df1912605d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/LOGO-INDECI.png",
    popularProcedures: [
      {
        title: "Plan Familiar de Emergencia y Mochila para Desastres",
        description: "Guía oficial de preparación ante sismos, inundaciones y tsunamis.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=INDECI"
      }
    ]
  },
  {
    id: "OEFA",
    acronym: "OEFA",
    name: "Organismo de Evaluación y Fiscalización Ambiental",
    category: "Recursos Naturales y Emergencias",
    categoryColor: "#15803D",
    categoryBgLight: "#F0FDF4",
    categoryTextColor: "#14532D",
    description: "Aquí puedo orientarte con la presentación de denuncias ambientales por contaminación en el SINADA.",
    color: "#15803D",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NjI0MjgsInB1ciI6ImJsb2JfaWQifX0=--d48c5ebd3b298362cac67280a1da24587b74b703/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/nuevo-logo-oefa.jpg.png",
    popularProcedures: [
      {
        title: "Denuncia Ambiental SINADA",
        description: "Reporta incidentes de contaminación sonora, de aguas, aire o residuos tóxicos.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=OEFA"
      }
    ]
  },
  {
    id: "SERFOR",
    acronym: "SERFOR",
    name: "Servicio Nacional Forestal y de Fauna Silvestre",
    category: "Recursos Naturales y Emergencias",
    categoryColor: "#15803D",
    categoryBgLight: "#F0FDF4",
    categoryTextColor: "#14532D",
    description: "Aquí puedo orientarte con la gestión de recursos forestales, protección de fauna silvestre y denuncias por tráfico ilegal.",
    color: "#15803D",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTUyNjAsInB1ciI6ImJsb2JfaWQifX0=--10fc096849a87425b40e9fc79f73f8606715f8e8/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/logos-serfor-web-01.png",
    popularProcedures: [
      {
        title: "Alerta SERFOR - Reporte de Tráfico de Fauna Silvestre",
        description: "Canal oficial para denunciar tenencia o venta ilegal de animales silvestres.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SERFOR"
      }
    ]
  },
  {
    id: "SENASA",
    acronym: "SENASA",
    name: "Servicio Nacional de Sanidad Agraria del Perú",
    category: "Recursos Naturales y Emergencias",
    categoryColor: "#15803D",
    categoryBgLight: "#F0FDF4",
    categoryTextColor: "#14532D",
    description: "Aquí puedo orientarte con los permisos fitosanitarios y zoosanitarios para viajes de mascotas y exportación de productos agrícolas.",
    color: "#15803D",
    bannerUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
    logoUrl: "https://www.gob.pe/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQ1MDAsInB1ciI6ImJsb2JfaWQifX0=--d56e8d89845af7a460ccbe0d65ed319826301586/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/Sin%20ti%CC%81tulo-1-01%20(1).png",
    popularProcedures: [
      {
        title: "Certificado Sanitario para Viajes de Mascotas (Perros y Gatos)",
        description: "Requisitos de vacunas y emisión de certificado de exportación de mascotas.",
        url: "https://www.gob.pe/busquedas?contenido=tramites&institucion=SENASA"
      }
    ]
  }
];

export function findCivicEntity(acronymOrId: string = "SUNAT"): CivicEntityInfo {
  const clean = (acronymOrId || "").toUpperCase().trim();
  const match = CIVIC_ENTITIES.find(e => 
    e.acronym.toUpperCase() === clean || 
    e.id.toUpperCase() === clean ||
    e.name.toUpperCase().includes(clean)
  );
  return match || CIVIC_ENTITIES[0]; // default SUNAT
}

export function buildEntityWelcomeMessage(entity: CivicEntityInfo): string {
  return `¡Hola! Elegiste **${entity.acronym}** (${entity.name}).

${entity.description}

⚠️ **Ámbito de atención:** Por defecto, responderé únicamente sobre consultas y trámites de **${entity.acronym}**. Si realizas preguntas sobre otra entidad, podría cometer errores. Si deseas consultar otra entidad, puedes cambiarla en cualquier momento desde la pestaña del chat en la barra superior.

¿Qué trámite necesitas consultar hoy?`;
}

/**
 * Retorna ejemplos de preguntas naturales específicos para la entidad seleccionada al activar el micrófono.
 */
export function getEntityVoiceExample(acronymOrId: string = "SUNAT"): string {
  const norm = (acronymOrId || "").trim().toUpperCase();
  switch (norm) {
    case "RENIEC":
      return 'Ejemplo: "¿Cómo renuevo mi DNI vencido?" o "¿Cómo saco duplicado de DNI azul a electrónico?"';
    case "MIGRACIONES":
      return 'Ejemplo: "¿Cómo saco cita para pasaporte?" o "¿Cómo tramito prórroga de residencia?"';
    case "SUNAT":
      return 'Ejemplo: "¿Cómo activo mi RUC digital?" o "¿Cómo emito un recibo por honorarios?"';
    case "SUNARP":
      return 'Ejemplo: "¿Cómo hago consulta vehicular por placa?" o "¿Cómo saco copia literal de una partida?"';
    case "BN":
    case "BANCO DE LA NACIÓN":
    case "BANCO DE LA NACION":
      return 'Ejemplo: "¿Cómo pago tasas en Págalo.pe?" o "¿Cómo activo mi Cuenta DNI?"';
    case "SBS":
      return 'Ejemplo: "¿Cómo saco mi reporte de deudas gratis?" o "¿Cómo sé en qué AFP estoy?"';
    case "ESSALUD":
      return 'Ejemplo: "¿Cómo sé si mi seguro EsSalud está activo?" o "¿Dónde me toca atenderme?"';
    case "SIS":
      return 'Ejemplo: "¿Cómo saber si estoy afiliado al SIS gratuito con mi DNI?"';
    case "MINSA":
      return 'Ejemplo: "¿Cómo sacar cita médica en el Minsa?" o "¿Dónde consultar carné de vacunación?"';
    case "MTC":
      return 'Ejemplo: "¿Cómo renuevo mi brevete?" o "¿Cómo saco cita para examen de manejo?"';
    case "ATU":
      return 'Ejemplo: "¿Cómo sacar la tarjeta del Metropolitano o consultar rutas de transporte?"';
    case "SUTRAN":
      return 'Ejemplo: "¿Cómo verificar récord del conductor o papeletas de tránsito terrestre?"';
    case "MININTER":
    case "PNP":
      return 'Ejemplo: "¿Cómo sacar certificado de antecedentes policiales digital?"';
    case "MINJUSDH":
    case "PJ":
    case "PODER JUDICIAL":
      return 'Ejemplo: "¿Cómo tramito el certificado de antecedentes penales electrónico?"';
    case "MINEDU":
      return 'Ejemplo: "¿Cómo descargo mi certificado de estudios oficial con código QR?"';
    case "SUNEDU":
      return 'Ejemplo: "¿Cómo verificar si mi grado o título universitario está registrado?"';
    case "MTPE":
      return 'Ejemplo: "¿Cómo saco el Certificado Único Laboral (CERTIJOVEN / CERTIADULTO)?"';
    case "ONP":
      return 'Ejemplo: "¿Cómo consultar mis aportes pensionarios acumulados en la ONP?"';
    case "INDECOPI":
      return 'Ejemplo: "¿Cómo presentar un reclamo a una empresa o registrar mi marca?"';
    case "OSINERGMIN":
      return 'Ejemplo: "¿Cómo reclamar por exceso en mi recibo de luz o gas natural?"';
    case "OSIPTEL":
      return 'Ejemplo: "¿Cómo saber cuántas líneas telefónicas están a mi nombre?"';
    case "SEDAPAL":
    case "SEDAPAR":
      return 'Ejemplo: "¿Cómo consultar mi recibo de agua o reportar una avería en mi zona?"';
    case "SAT":
      return 'Ejemplo: "¿Cómo consultar papeletas por placa o pagar el impuesto vehicular?"';
    case "ONPE":
      return 'Ejemplo: "¿Dónde me toca votar y cómo saber si soy miembro de mesa?"';
    case "JNE":
      return 'Ejemplo: "¿Cómo consultar multas electorales o presentar una justificación?"';
    case "MIDIS":
      return 'Ejemplo: "¿Cómo saber si soy beneficiario de los programas Pensión 65 o Juntos?"';
    case "MEF":
      return 'Ejemplo: "¿Dónde consultar el Sistema Integrado de Administración Financiera (SIAF)?"';
    case "PRODUCE":
      return 'Ejemplo: "¿Cómo registrar una MYPE o tramitar una licencia de pesca artesanal?"';
    case "SENASA":
      return 'Ejemplo: "¿Cuáles son los requisitos de certificado sanitario para viajar con mascotas?"';
    default: {
      const entity = findCivicEntity(norm);
      if (entity && entity.popularProcedures && entity.popularProcedures.length > 0) {
        const p1 = entity.popularProcedures[0]?.title || "";
        const p2 = entity.popularProcedures[1]?.title || "";
        if (p1 && p2) {
          return `Ejemplo: "¿Cómo tramitar ${p1}?" o "${p2}"`;
        } else if (p1) {
          return `Ejemplo: "¿Cuáles son los requisitos para ${p1} en ${entity.acronym}?"`;
        }
      }
      return `Ejemplo: "¿Cómo realizo trámites oficiales y cuáles son los requisitos en ${acronymOrId || "el Estado"}?"`;
    }
  }
}

