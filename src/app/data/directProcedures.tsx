import { CIVIC_ENTITIES } from "./civicEntities";

export interface DirectProcedureItem {
  id: string;
  title: string;
  url: string;
  category?: string;
}

/**
 * Catálogo completo de trámites directos agrupados por subcategorías oficiales
 * Flujo directo: Subcategoría -> Título del trámite -> Clic -> Plataforma oficial
 */
export const OFFICIAL_PROCEDURES_BY_ENTITY: Record<string, DirectProcedureItem[]> = {
  SUNARP: [
    // ── 1. Información del Vehículo ──
    {
      id: "sunarp-consulta-vehicular",
      title: "Consulta Vehicular Gratuita (Placas y Datos)",
      url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-placas-duplicadas",
      title: "Placas Duplicadas y Tercera Placa",
      url: "https://www.placas.pe/",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-buscar-vin",
      title: "Buscar por VIN / Chasis",
      url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-consulta-serie-motor",
      title: "Consulta de Serie y Motor",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      category: "Información del Vehículo"
    },

    // ── 2. Propiedad y Legalidad ──
    {
      id: "sunarp-copia-literal",
      title: "Copia Literal y Partidas Registrales (SPRL)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Propiedad y Legalidad"
    },
    {
      id: "sunarp-siguelo-plus",
      title: "Síguelo Plus (Seguimiento de Títulos en Trámite)",
      url: "https://siguelo.sunarp.gob.pe/siguelo/",
      category: "Propiedad y Legalidad"
    },
    {
      id: "sunarp-garantia-mobiliaria",
      title: "Garantía Mobiliaria (RGM)",
      url: "https://rgm.sunarp.gob.pe/rgm/",
      category: "Propiedad y Legalidad"
    },
    {
      id: "sunarp-medidas-cautelares",
      title: "Medidas Cautelares y Gravámenes",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Propiedad y Legalidad"
    },

    // ── 3. Riesgos y Seguridad ──
    {
      id: "sunarp-alerta-registral",
      title: "Alerta Registral Gratuita (Anti-fraude)",
      url: "https://www.sunarp.gob.pe/alertaregistral/",
      category: "Riesgos y Seguridad"
    },
    {
      id: "sunarp-cambio-caracteristicas",
      title: "Cambio de Características (Motor y Color)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Riesgos y Seguridad"
    },
    {
      id: "sunarp-titulos-archivados",
      title: "Títulos Archivados y Anotaciones Registrales",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Riesgos y Seguridad"
    },

    // ── 4. Certificados y Predios ──
    {
      id: "sunarp-certificado-propiedad",
      title: "Certificado Positivo / Negativo de Propiedad",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Certificados y Predios"
    },
    {
      id: "sunarp-conoce-aqui",
      title: "Conoce Aquí (Lectura Gratuita de Partidas)",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      category: "Certificados y Predios"
    },
    {
      id: "sunarp-cri",
      title: "Certificado Registral Inmobiliario (CRI)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Certificados y Predios"
    },
    {
      id: "sunarp-vigencia-poder",
      title: "Certificado de Vigencia de Poder",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Certificados y Predios"
    },

    // ── 5. Trámites y Extras ──
    {
      id: "sunarp-cambiate-tive",
      title: "Cámbiate a la TIVE (Tarjeta Electrónica)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Trámites y Extras"
    },
    {
      id: "sunarp-descargar-tive",
      title: "Descarga de Tarjeta Vehicular Electrónica (TIVE)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      category: "Trámites y Extras"
    },
    {
      id: "sunarp-subastas",
      title: "Subastas Públicas y Remates SUNARP",
      url: "https://www.sunarp.gob.pe/",
      category: "Trámites y Extras"
    }
  ],

  RENIEC: [
    // ── 1. Identidad y DNI ──
    {
      id: "reniec-renovacion-dnie",
      title: "Renovación de DNI por Caducidad (DNIe / DNI Azul)",
      url: "https://www.reniec.gob.pe/portal/masServiciosLinea.htm",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-duplicado-web",
      title: "Duplicado de DNI vía Web (Pérdida o Robo)",
      url: "https://apps.reniec.gob.pe/duplicado/",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-dnie-menores",
      title: "DNI Electrónico para Menores de Edad",
      url: "https://www.reniec.gob.pe/",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-estado-tramite",
      title: "Consulta de Estado de Trámite de DNI",
      url: "https://serviciosweb.reniec.gob.pe/cet/consulta.do",
      category: "Identidad y DNI"
    },

    // ── 2. Registros y Actas Civiles ──
    {
      id: "reniec-actas-certificadas",
      title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
      url: "https://apps.reniec.gob.pe/actasConsulta/",
      category: "Registros y Actas Civiles"
    },
    {
      id: "reniec-rectificacion-domicilio",
      title: "Rectificación de Domicilio y Datos Personales",
      url: "https://apps.reniec.gob.pe/domicilio/",
      category: "Registros y Actas Civiles"
    },

    // ── 3. Constancias y Biometría ──
    {
      id: "reniec-certificado-c4",
      title: "Certificado de Inscripción C4",
      url: "https://apps.reniec.gob.pe/certc4/",
      category: "Constancias y Biometría"
    },
    {
      id: "reniec-biofacial-app",
      title: "Validación Biométrica DNI BioFacial",
      url: "https://www.gob.pe/12371-app-dni-biofacial",
      category: "Constancias y Biometría"
    },
    {
      id: "reniec-mejores-huellas",
      title: "Consulta de Mejores Huellas Registradas",
      url: "https://www.reniec.gob.pe/",
      category: "Constancias y Biometría"
    }
  ],

  SUNAT: [
    // ── 1. RUC y Clave SOL ──
    {
      id: "sunat-ruc-digital",
      title: "Inscripción y Activación al RUC Digital con DNI",
      url: "https://ww1.sunat.gob.pe/ol-ti-itinsruc/inscripcion/index.htm",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-consulta-ruc",
      title: "Consulta RUC Oficial (Personas y Empresas)",
      url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-clave-sol",
      title: "Generación y Recuperación de Clave SOL",
      url: "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-ficha-ruc",
      title: "Descarga de Ficha RUC Digital",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "RUC y Clave SOL"
    },

    // ── 2. Comprobantes de Pago ──
    {
      id: "sunat-recibos-honorarios",
      title: "Emisión de Recibos por Honorarios Electrónicos (RHE)",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-factura-boleta",
      title: "Factura y Boleta de Venta Electrónica (SEE-SOL)",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "Comprobantes de Pago"
    },

    // ── 3. Tributos, Deudas y Devoluciones ──
    {
      id: "sunat-deuda-tributaria",
      title: "Consulta de Deuda Tributaria y Coactiva",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "Tributos, Deudas y Devoluciones"
    },
    {
      id: "sunat-devolucion-renta",
      title: "Solicitud y Consulta de Devolución de Impuesto a la Renta",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "Tributos, Deudas y Devoluciones"
    },
    {
      id: "sunat-fraccionamiento",
      title: "Solicitud de Fraccionamiento Tributario Art. 36",
      url: "https://www.sunat.gob.pe/sol.html",
      category: "Tributos, Deudas y Devoluciones"
    }
  ],

  MIGRACIONES: [
    // ── 1. Pasaporte Electrónico ──
    {
      id: "migraciones-citas-pasaporte",
      title: "Citas para Pasaporte Electrónico Ordinario",
      url: "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/",
      category: "Pasaporte Electrónico"
    },
    {
      id: "migraciones-pasaporte-urgencia",
      title: "Pasaporte de Urgencia (Vuelos en 48 Horas)",
      url: "https://www.gob.pe/524-obtener-pasaporte-electronico-de-urgencia",
      category: "Pasaporte Electrónico"
    },

    // ── 2. Extranjería y Residencia ──
    {
      id: "migraciones-agencia-virtual",
      title: "Agencia Digital Migraciones",
      url: "https://agenciavirtual.migraciones.gob.pe/",
      category: "Extranjería y Residencia"
    },
    {
      id: "migraciones-carne-extranjeria",
      title: "Carné de Extranjería y CPP",
      url: "https://agenciavirtual.migraciones.gob.pe/",
      category: "Extranjería y Residencia"
    },
    {
      id: "migraciones-prorroga",
      title: "Prórroga de Permanencia o Residencia",
      url: "https://agenciavirtual.migraciones.gob.pe/",
      category: "Extranjería y Residencia"
    },

    // ── 3. Certificados de Viaje ──
    {
      id: "migraciones-certificado-movimiento",
      title: "Certificado de Movimiento Migratorio",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      category: "Certificados de Viaje"
    }
  ],

  BN: [
    // ── 1. Pagos del Estado ──
    {
      id: "bn-pagalo-pe",
      title: "Págalo.pe (Pago Digital de Tasas del Estado)",
      url: "https://www.pagalo.pe/",
      category: "Pagos del Estado"
    },

    // ── 2. Banca Digital y Cuentas ──
    {
      id: "bn-cuenta-dni",
      title: "Cuenta DNI (Activación y Saldo Digital)",
      url: "https://www.cuentadni.pe/",
      category: "Banca Digital y Cuentas"
    },
    {
      id: "bn-app-movil",
      title: "Banca Celular y App Móvil Banco de la Nación",
      url: "https://www.bn.com.pe/canales-atencion/banca-celular.asp",
      category: "Banca Digital y Cuentas"
    },

    // ── 3. Canales y Operaciones ──
    {
      id: "bn-agencias-cajeros",
      title: "Ubicación de Agencias y Cajeros MultiRed",
      url: "https://www.bn.com.pe/canales-atencion/agencia-lima-metropolitana.asp",
      category: "Canales y Operaciones"
    },
    {
      id: "bn-giros",
      title: "Consulta de Giros Nacionales e Internacionales",
      url: "https://www.bn.com.pe/",
      category: "Canales y Operaciones"
    }
  ],

  MTC: [
    // ── 1. Licencias y Brevetes ──
    {
      id: "mtc-record-conductor",
      title: "Récord del Conductor y Sistema de Puntos MTC",
      url: "https://recordconductor.mtc.gob.pe/",
      category: "Licencias y Brevetes"
    },
    {
      id: "mtc-licencia-electronica",
      title: "Emisión y Duplicado de Brevete Electrónico Oficial",
      url: "https://licencias.mtc.gob.pe/",
      category: "Licencias y Brevetes"
    },
    {
      id: "mtc-sistema-licencias",
      title: "Sistema de Emisión de Licencias de Conducir",
      url: "https://licencias.mtc.gob.pe/",
      category: "Licencias y Brevetes"
    },

    // ── 2. Vehículos e Inspección ──
    {
      id: "mtc-revision-tecnica",
      title: "Consulta de Inspección Técnica Vehicular (CITV)",
      url: "https://recitv.mtc.gob.pe/",
      category: "Vehículos e Inspección"
    },
    {
      id: "mtc-transporte-carga",
      title: "Consulta de Transporte de Pasajeros y Carga Pesada",
      url: "https://www.mtc.gob.pe/",
      category: "Vehículos e Inspección"
    }
  ],

  ESSALUD: [
    // ── 1. Acreditación y Citas ──
    {
      id: "essalud-acreditacion",
      title: "Acreditación y Vigencia de Seguro de Salud",
      url: "https://dondetetiendes.essalud.gob.pe/",
      category: "Acreditación y Citas"
    },
    {
      id: "essalud-citas-linea",
      title: "Solicitud de Citas Médicas en Línea",
      url: "https://apps.essalud.gob.pe/citas/",
      category: "Acreditación y Citas"
    },
    {
      id: "essalud-centro-asistencial",
      title: "Consulta de Centro Asistencial Asignado",
      url: "https://dondetetiendes.essalud.gob.pe/",
      category: "Acreditación y Citas"
    },

    // ── 2. Subsidios y Prestaciones ──
    {
      id: "essalud-subsidio-maternidad",
      title: "Subsidios por Lactancia y Maternidad (VIVA)",
      url: "https://viva.essalud.gob.pe/viva/login",
      category: "Subsidios y Prestaciones"
    }
  ],

  SIS: [
    // ── 1. Afiliación y Estado ──
    {
      id: "sis-consulta-afiliacion",
      title: "Consulta de Afiliación Gratuita al SIS",
      url: "https://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      category: "Afiliación y Estado"
    },
    {
      id: "sis-afiliacion-virtual",
      title: "Afiliación Virtual al SIS Para Todos",
      url: "https://afiliacion.sis.gob.pe/afiliacion/afiliacionVirtual.do",
      category: "Afiliación y Estado"
    },

    // ── 2. Cobertura y Medicamentos ──
    {
      id: "sis-cobertura",
      title: "Consulta de Cobertura y Medicamentos Gratuitos",
      url: "https://www.gob.pe/sis",
      category: "Cobertura y Medicamentos"
    }
  ],

  MINSA: [
    // ── 1. Salud Digital ──
    {
      id: "minsa-carnet-vacunacion",
      title: "Carnet Digital de Vacunación Oficial",
      url: "https://carnetvacunacion.minsa.gob.pe/",
      category: "Salud Digital"
    },
    {
      id: "minsa-telesalud",
      title: "Teleatiendo (Citas de Telemedicina y Orientación)",
      url: "https://teleatiendo.minsa.gob.pe/",
      category: "Salud Digital"
    },

    // ── 2. Establecimientos y Registros ──
    {
      id: "minsa-establecimientos",
      title: "Registro Nacional de Establecimientos de Salud (RENAES)",
      url: "http://renaes.minsa.gob.pe/",
      category: "Establecimientos y Registros"
    }
  ],

  SBS: [
    // ── 1. Historial Crediticio ──
    {
      id: "sbs-reporte-deudas",
      title: "Reporte de Deudas y Calificación Crediticia SBS",
      url: "https://servicios.sbs.gob.pe/reportedeudas/",
      category: "Historial Crediticio"
    },

    // ── 2. Pensiones y Seguros ──
    {
      id: "sbs-constancia-afiliacion-afp",
      title: "Consulta de Constancia de Afiliación AFP",
      url: "https://servicios.sbs.gob.pe/afiliados/",
      category: "Pensiones y Seguros"
    },
    {
      id: "sbs-herederos-seguros",
      title: "Consulta de Herederos Informados (Cuentas y Seguros)",
      url: "https://www.sbs.gob.pe/usuarios/informacion-para-herederos",
      category: "Pensiones y Seguros"
    }
  ],

  "PODER JUDICIAL": [
    // ── 1. Antecedentes y Certificados ──
    {
      id: "pj-antecedentes-penales",
      title: "Certificado Electrónico de Antecedentes Penales",
      url: "https://cape.pj.gob.pe/",
      category: "Antecedentes y Certificados"
    },

    // ── 2. Expedientes y Casillas ──
    {
      id: "pj-consulta-expedientes",
      title: "Consulta de Expedientes Judiciales (CEJ)",
      url: "https://cej.pj.gob.pe/cej/paginas/busquedaExpediente.html",
      category: "Expedientes y Casillas"
    },
    {
      id: "pj-mesa-partes",
      title: "Mesa de Partes Electrónica (MPE - SINOE)",
      url: "https://casillas.pj.gob.pe/sinoe/",
      category: "Expedientes y Casillas"
    },

    // ── 3. Deudores Alimentarios ──
    {
      id: "pj-redam-alimentos",
      title: "Registro de Deudores Alimentarios Morosos (REDAM)",
      url: "https://redam.pj.gob.pe/",
      category: "Deudores Alimentarios"
    }
  ],

  PNP: [
    // ── 1. Certificados y Denuncias ──
    {
      id: "pnp-antecedentes-policiales",
      title: "Certificado de Antecedentes Policiales Digital (CERAP)",
      url: "https://www.gob.pe/336-certificado-de-antecedentes-policiales-digital-cerap-digital",
      category: "Certificados y Denuncias"
    },
    {
      id: "pnp-denuncia-digital",
      title: "Denuncia Policial Digital por Pérdida de Documentos",
      url: "https://sistemas.policia.gob.pe/denunciadigital/",
      category: "Certificados y Denuncias"
    },

    // ── 2. Trámites Vehiculares ──
    {
      id: "pnp-lunas-polarizadas",
      title: "Autorización para el Uso de Lunas Oscurecidas / Polarizadas",
      url: "https://www.gob.pe/337-autorizacion-para-el-uso-de-lunas-oscurecidas-o-polarizadas",
      category: "Trámites Vehiculares"
    },
    {
      id: "pnp-dirove-peritaje",
      title: "Peritaje de Identificación Vehicular (DIROVE)",
      url: "https://www.policia.gob.pe/",
      category: "Trámites Vehiculares"
    }
  ],

  SUNEDU: [
    // ── 1. Grados y Títulos ──
    {
      id: "sunedu-consulta-titulos",
      title: "Constancia de Inscripción de Grados y Títulos",
      url: "https://enlinea.sunedu.gob.pe/",
      category: "Grados y Títulos"
    },
    {
      id: "sunedu-reconocimiento-extranjero",
      title: "Reconocimiento de Títulos Universitarios del Extranjero",
      url: "https://enlinea.sunedu.gob.pe/",
      category: "Grados y Títulos"
    },
    {
      id: "sunedu-verificacion-firma",
      title: "Verificación de Firma y Registro Universitario",
      url: "https://enlinea.sunedu.gob.pe/",
      category: "Grados y Títulos"
    }
  ],

  INDECOPI: [
    // ── 1. Marcas y Propiedad Intelectual ──
    {
      id: "indecopi-busca-marca",
      title: "Búsqueda y Registro de Marcas (Busca Tu Marca)",
      url: "https://servicios.indecopi.gob.pe/buscatumarca/",
      category: "Marcas y Propiedad Intelectual"
    },
    {
      id: "indecopi-derechos-autor",
      title: "Registro de Derechos de Autor y Obras",
      url: "https://enlinea.indecopi.gob.pe/",
      category: "Marcas y Propiedad Intelectual"
    },

    // ── 2. Protección al Consumidor ──
    {
      id: "indecopi-reclama-virtual",
      title: "Reclama Virtual (Defensa del Consumidor)",
      url: "https://enlinea.indecopi.gob.pe/reclamavirtual/",
      category: "Protección al Consumidor"
    },
    {
      id: "indecopi-gracias-no-insista",
      title: "Registro 'Gracias... No Insista' (Bloqueo de Spam Comercial)",
      url: "https://enlinea.indecopi.gob.pe/noinsista/",
      category: "Protección al Consumidor"
    }
  ],

  OSIPTEL: [
    // ── 1. Líneas y Equipos ──
    {
      id: "osiptel-checa-tu-linea",
      title: "Consulta 'Checa tu Línea' (Líneas Móviles a tu Nombre)",
      url: "https://checatuslineas.osiptel.gob.pe/",
      category: "Líneas y Equipos"
    },
    {
      id: "osiptel-consulta-imei",
      title: "Consulta de IMEI Bloqueado (Celulares Robados)",
      url: "https://www.osiptel.gob.pe/bloqueo-imei/",
      category: "Líneas y Equipos"
    },

    // ── 2. Reclamos y Telecomunicaciones ──
    {
      id: "osiptel-reclamos",
      title: "Guía de Reclamos por Telecomunicaciones e Internet",
      url: "https://www.osiptel.gob.pe/",
      category: "Reclamos y Telecomunicaciones"
    }
  ],

  MTPE: [
    // ── 1. Empleo y Certificados ──
    {
      id: "mtpe-cul-certijoven",
      title: "Certificado Único Laboral (Certijoven / Certiadulto)",
      url: "https://www.empleosperu.gob.pe/portal-mtpe/",
      category: "Empleo y Certificados"
    },
    {
      id: "mtpe-bolsa-empleo",
      title: "Bolsa de Trabajo Oficial 'Empleos Perú'",
      url: "https://www.empleosperu.gob.pe/",
      category: "Empleo y Certificados"
    },

    // ── 2. Derechos Laborales ──
    {
      id: "mtpe-asesoria-laboral",
      title: "Liquidación y Asesoría Laboral Gratuita",
      url: "https://www.gob.pe/mtpe",
      category: "Derechos Laborales"
    }
  ],

  ONP: [
    // ── 1. Aportes y Clave ──
    {
      id: "onp-estado-cuenta-aportes",
      title: "Consulta de Estado de Cuenta de Aportes ONP",
      url: "https://tuportal.onp.gob.pe/",
      category: "Aportes y Clave"
    },
    {
      id: "onp-clave-virtual",
      title: "Generación de Clave Virtual ONP",
      url: "https://tuportal.onp.gob.pe/generar-clave",
      category: "Aportes y Clave"
    },

    // ── 2. Jubilación y Pensiones ──
    {
      id: "onp-jubilacion",
      title: "Solicitud de Jubilación y Pensión D.L. 19990",
      url: "https://onpvirtual.pe/",
      category: "Jubilación y Pensiones"
    }
  ],

  SUNAFIL: [
    // ── 1. Denuncias Laborales ──
    {
      id: "sunafil-denuncia-virtual",
      title: "Denuncia Laboral Virtual por Incumplimiento",
      url: "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales/",
      category: "Denuncias Laborales"
    },

    // ── 2. Planilla y Beneficios ──
    {
      id: "sunafil-verifica-planilla",
      title: "Verifica si estás en Planilla (Chequea tu Contratista)",
      url: "https://aplicativosweb6.sunafil.gob.pe/si.verificacionPlanilla/inicio",
      category: "Planilla y Beneficios"
    },
    {
      id: "sunafil-calculadora-beneficios",
      title: "Calculadora de Beneficios Laborales (Gratificaciones / CTS)",
      url: "https://www.sunafil.gob.pe/",
      category: "Planilla y Beneficios"
    }
  ],

  SAT: [
    // ── 1. Papeletas y Tránsito ──
    {
      id: "sat-papeletas",
      title: "Consulta de Papeletas y Deuda de Tránsito SAT",
      url: "https://www.sat.gob.pe/Websitev9/TributosMultas/Vehicular/ConsultasPapeletas",
      category: "Papeletas y Tránsito"
    },
    {
      id: "sat-captura",
      title: "Consulta de Órdenes de Captura Vehicular por Deudas",
      url: "https://www.sat.gob.pe/",
      category: "Papeletas y Tránsito"
    },

    // ── 2. Impuestos Municipales ──
    {
      id: "sat-impuesto-vehicular",
      title: "Consulta y Pago de Impuesto Vehicular y Predial",
      url: "https://www.sat.gob.pe/",
      category: "Impuestos Municipales"
    }
  ],

  SUTRAN: [
    // ── 1. Fiscalización en Carreteras ──
    {
      id: "sutran-record-infracciones",
      title: "Récord de Infracciones y Fiscalización en Carreteras",
      url: "https://www.sutran.gob.pe/consultas/record-de-infracciones/",
      category: "Fiscalización en Carreteras"
    },
    {
      id: "sutran-estado-vias",
      title: "Mapa de Alerta del Estado de Vías Nacionales en Tiempo Real",
      url: "https://www.sutran.gob.pe/",
      category: "Fiscalización en Carreteras"
    }
  ],

  ATU: [
    // ── 1. Fiscalización de Transporte ──
    {
      id: "atu-fiscalizacion-vehicular",
      title: "Consulta de Fiscalización e Infracciones de Transporte ATU",
      url: "https://sistemas.atu.gob.pe/ConsultaVehiculo",
      category: "Fiscalización de Transporte"
    },
    {
      id: "atu-taxi-autorizado",
      title: "Registro y Credenciales de Taxi Autorizado en Lima y Callao",
      url: "https://sistemas.atu.gob.pe/",
      category: "Fiscalización de Transporte"
    }
  ],

  MINEDU: [
    // ── 1. Certificados y Logros ──
    {
      id: "minedu-certificado-estudios",
      title: "Solicitud y Emisión de Certificado Oficial de Estudios",
      url: "https://certificado.minedu.gob.pe/",
      category: "Certificados y Logros"
    },
    {
      id: "minedu-constancia-logros",
      title: "Constancia de Logros de Aprendizaje (CLA)",
      url: "https://constancia.minedu.gob.pe/",
      category: "Certificados y Logros"
    }
  ],

  PRONABEC: [
    // ── 1. Becas y Créditos ──
    {
      id: "pronabec-beca-18",
      title: "Postulación a Beca 18 y Crédito Educativo",
      url: "https://www.pronabec.gob.pe/beca-18/",
      category: "Becas y Créditos"
    },
    {
      id: "pronabec-mesa-partes",
      title: "Mesa de Partes y Trámites PRONABEC",
      url: "https://www.pronabec.gob.pe/",
      category: "Becas y Créditos"
    }
  ],

  OSINERGMIN: [
    // ── 1. Combustibles y Tarifas ──
    {
      id: "osinergmin-facilito",
      title: "Facilito (Consulta de Precios de Gasolina, Balón de Gas y GNV)",
      url: "https://www.facilito.gob.pe/",
      category: "Combustibles y Tarifas"
    },
    {
      id: "osinergmin-reclamos-luz",
      title: "Reclamos por Cortes de Luz y Facturación Eléctrica",
      url: "https://www.osinergmin.gob.pe/",
      category: "Combustibles y Tarifas"
    }
  ],

  SEDAPAL: [
    // ── 1. Agua y Facturación ──
    {
      id: "sedapal-aquafono",
      title: "Consulta de Recibo y Saldo de Agua en Línea (Aquafono)",
      url: "https://www.sedapal.com.pe/",
      category: "Agua y Facturación"
    },
    {
      id: "sedapal-cortes-programados",
      title: "Cortes Programados de Agua por Mantenimiento",
      url: "https://www.sedapal.com.pe/",
      category: "Agua y Facturación"
    }
  ],

  ONPE: [
    // ── 1. Procesos Electorales ──
    {
      id: "onpe-lugar-votacion",
      title: "Consulta de Local de Votación y Miembro de Mesa",
      url: "https://consultaelectoral.onpe.gob.pe/",
      category: "Procesos Electorales"
    },
    {
      id: "onpe-multas-electorales",
      title: "Consulta y Pago de Multas Electorales",
      url: "https://multas.jne.gob.pe/",
      category: "Procesos Electorales"
    }
  ],

  JNE: [
    // ── 1. Dispensas y Afiliaciones ──
    {
      id: "jne-dispensas-electorales",
      title: "Sistema de Dispensa y Justificación Electoral",
      url: "https://dispensavirtual.jne.gob.pe/",
      category: "Dispensas y Afiliaciones"
    },
    {
      id: "jne-afiliacion-politica",
      title: "Consulta de Afiliación a Partidos Políticos (ROP)",
      url: "https://sroppublico.jne.gob.pe/",
      category: "Dispensas y Afiliaciones"
    }
  ],

  INPE: [
    // ── 1. Certificados Judiciales ──
    {
      id: "inpe-antecedentes-judiciales",
      title: "Certificado Electrónico de Antecedentes Judiciales",
      url: "https://antjudicial.inpe.gob.pe/",
      category: "Certificados Judiciales"
    }
  ],

  MINJUSDH: [
    // ── 1. Asistencia Legal ──
    {
      id: "minjus-defensa-publica",
      title: "Solicitud de Asistencia Legal Gratuita (Defensa Pública)",
      url: "https://www.gob.pe/minjus",
      category: "Asistencia Legal"
    },
    {
      id: "minjus-conciliacion",
      title: "Centros de Conciliación Extrajudicial Gratuitos",
      url: "https://www.gob.pe/minjus",
      category: "Asistencia Legal"
    }
  ],

  INDECI: [
    // ── 1. Seguridad en Edificaciones ──
    {
      id: "indeci-itse",
      title: "Inspecciones Técnicas de Seguridad en Edificaciones (ITSE)",
      url: "https://www.gob.pe/indeci",
      category: "Seguridad en Edificaciones"
    }
  ],

  SUSALUD: [
    // ── 1. Derechos del Asegurado ──
    {
      id: "susalud-consulta-asegurado",
      title: "Consulta de Derechos del Asegurado en Salud",
      url: "https://app1.susalud.gob.pe/registro-afiliados/",
      category: "Derechos del Asegurado"
    },
    {
      id: "susalud-denuncias-clinicas",
      title: "Denuncia por Negación de Atención o Mala Praxis",
      url: "https://www.gob.pe/susalud",
      category: "Derechos del Asegurado"
    }
  ]
};

/**
 * Obtiene los trámites oficiales de una entidad con fallback dinámico
 */
export function getEntityOfficialProcedures(acronym: string): DirectProcedureItem[] {
  const norm = (acronym || "").toUpperCase().trim();
  
  if (OFFICIAL_PROCEDURES_BY_ENTITY[norm]) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[norm];
  }
  
  const key = Object.keys(OFFICIAL_PROCEDURES_BY_ENTITY).find(
    k => norm.includes(k) || k.includes(norm)
  );
  if (key) return OFFICIAL_PROCEDURES_BY_ENTITY[key];

  // Fallback desde catálogo de CIVIC_ENTITIES
  const civic = CIVIC_ENTITIES.find(
    e => e.acronym.toUpperCase() === norm || e.id.toUpperCase() === norm || (e.name && e.name.toUpperCase().includes(norm))
  );
  if (civic && civic.popularProcedures && civic.popularProcedures.length > 0) {
    return civic.popularProcedures.map((p, i) => ({
      id: `${civic.acronym.toLowerCase()}-proc-${i + 1}`,
      title: p.title,
      url: p.url || "https://www.gob.pe/",
      category: civic.category || "Trámites Oficiales"
    }));
  }

  return [
    {
      id: `${norm.toLowerCase()}-sede`,
      title: `Sede Digital Oficial de ${acronym}`,
      url: "https://www.gob.pe/",
      category: "Portal Oficial"
    }
  ];
}
