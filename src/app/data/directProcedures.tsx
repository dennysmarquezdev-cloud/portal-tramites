import { CIVIC_ENTITIES } from "./civicEntities";

export interface DirectProcedureItem {
  id: string;
  title: string;
  url: string;
  category?: string;
}

/**
 * Catálogo completo de trámites directos agrupados por subcategorías oficiales
 * Flujo directo: Subcategoría -> Título del trámite -> Clic -> Plataforma oficial o guía exacta
 * Ninguna URL redirige a portadas genéricas ni páginas raíz.
 */
export const OFFICIAL_PROCEDURES_BY_ENTITY: Record<string, DirectProcedureItem[]> = {
  SUNARP: [
    // ── 1. Información del Vehículo ──
    {
      id: "sunarp-consulta-vehicular",
      title: "Consulta Vehicular Gratuita (Placas y Datos)",
      url: "https://consultavehicular.sunarp.gob.pe/",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-placas-duplicadas",
      title: "Placas Duplicadas y Tercera Placa",
      url: "https://www.placas.pe/",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-conoce-aqui-vehicular",
      title: "Conoce Aquí (Lectura Gratuita de Partidas Vehiculares)",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      category: "Información del Vehículo"
    },
    {
      id: "sunarp-descargar-tive",
      title: "Obtener Tarjeta de Identificación Vehicular Electrónica (TIVe)",
      url: "https://www.gob.pe/306-obtener-la-tarjeta-de-identificacion-vehicular-electronica-tive",
      category: "Información del Vehículo"
    },

    // ── 2. Propiedad Inmueble y Predios ──
    {
      id: "sunarp-copia-literal",
      title: "Copia Literal y Partidas Registrales (SPRL En Línea)",
      url: "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      category: "Propiedad Inmueble y Predios"
    },
    {
      id: "sunarp-cri",
      title: "Certificado Registral Inmobiliario (CRI)",
      url: "https://www.gob.pe/26681-solicitar-certificado-registral-inmobiliario-cri",
      category: "Propiedad Inmueble y Predios"
    },
    {
      id: "sunarp-conoce-aqui-predios",
      title: "Conoce Aquí (Visualización Gratuita de Partidas de Inmuebles)",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      category: "Propiedad Inmueble y Predios"
    },
    {
      id: "sunarp-certificado-propiedad",
      title: "Certificado Positivo o Negativo de Propiedad Inmueble",
      url: "https://www.gob.pe/708-solicitar-certificado-positivo-de-propiedad-inmueble",
      category: "Propiedad Inmueble y Predios"
    },

    // ── 3. Seguridad y Seguimiento Registral ──
    {
      id: "sunarp-alerta-registral",
      title: "Alerta Registral Gratuita (Anti-fraude de Inmuebles y Autos)",
      url: "https://alertaregistral.sunarp.gob.pe/alerta/Inicio",
      category: "Seguridad y Seguimiento Registral"
    },
    {
      id: "sunarp-siguelo-plus",
      title: "Síguelo Plus (Seguimiento de Títulos en Trámite)",
      url: "https://sigueloplus.sunarp.gob.pe/siguelo/",
      category: "Seguridad y Seguimiento Registral"
    },
    {
      id: "sunarp-garantia-mobiliaria",
      title: "Sistema de Garantías Mobiliarias (RGM)",
      url: "https://rgm.sunarp.gob.pe/rgm/",
      category: "Seguridad y Seguimiento Registral"
    },

    // ── 4. Personas Jurídicas y Poderes ──
    {
      id: "sunarp-vigencia-poder",
      title: "Certificado de Vigencia de Poder de Personas Jurídicas",
      url: "https://www.gob.pe/380-solicitar-certificado-de-vigencia-de-poder-otorgado-por-persona-juridica",
      category: "Personas Jurídicas y Poderes"
    },
    {
      id: "sunarp-reserva-nombre",
      title: "Reserva de Preferencia Registral de Nombre de Empresa",
      url: "https://www.gob.pe/363-solicitar-reserva-de-nombre-de-empresa",
      category: "Personas Jurídicas y Poderes"
    },
    {
      id: "sunarp-remates",
      title: "Remate Registral y Subastas Públicas SUNARP",
      url: "https://remateregistral.sunarp.gob.pe/",
      category: "Personas Jurídicas y Poderes"
    }
  ],

  RENIEC: [
    // ── 1. Identidad y DNI ──
    {
      id: "reniec-renovacion-dnie",
      title: "Renovación de DNI por Caducidad (DNIe / DNI Azul)",
      url: "https://apps.reniec.gob.pe/renovacionDni/",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-duplicado-web",
      title: "Duplicado de DNI vía Web (Pérdida o Robo)",
      url: "https://portaladminusuarios.reniec.gob.pe/duplicado/#!/index",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-estado-tramite",
      title: "Consulta de Estado de Trámite de DNI",
      url: "https://serviciosportal.reniec.gob.pe/cetdnipi/inicio.htm",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-dnie-menores",
      title: "Solicitar DNI Electrónico para Menores de Edad",
      url: "https://www.gob.pe/8885-solicitar-dni-electronico-para-menores-de-edad",
      category: "Identidad y DNI"
    },
    {
      id: "reniec-primera-vez",
      title: "Solicitar DNI por Primera Vez para Recién Nacidos",
      url: "https://www.gob.pe/219-solicitar-dni-por-primera-vez",
      category: "Identidad y DNI"
    },

    // ── 2. Registros y Actas Civiles ──
    {
      id: "reniec-actas-certificadas",
      title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
      url: "https://apps.reniec.gob.pe/actascertificadas",
      category: "Registros y Actas Civiles"
    },
    {
      id: "reniec-registro-nacimiento",
      title: "Registro Digital de Nacimiento con CNV en Línea",
      url: "https://apps.reniec.gob.pe/registro-digital-nacimiento/",
      category: "Registros y Actas Civiles"
    },
    {
      id: "reniec-rectificacion-domicilio",
      title: "Rectificación de Domicilio en el DNI",
      url: "https://apps.reniec.gob.pe/domicilio/",
      category: "Registros y Actas Civiles"
    },
    {
      id: "reniec-rectificacion-estado-civil",
      title: "Actualización de Estado Civil en el DNI",
      url: "https://www.gob.pe/249-rectificacion-del-estado-civil-en-el-dni",
      category: "Registros y Actas Civiles"
    },

    // ── 3. Constancias y Servicios Digitales ──
    {
      id: "reniec-certificado-c4",
      title: "Certificado de Inscripción C4 Digital",
      url: "https://apps.reniec.gob.pe/certins",
      category: "Constancias y Servicios Digitales"
    },
    {
      id: "reniec-biofacial-app",
      title: "Validación Biométrica DNI BioFacial (App Móvil)",
      url: "https://www.gob.pe/12371-app-dni-biofacial",
      category: "Constancias y Servicios Digitales"
    },
    {
      id: "reniec-peruanos-exterior",
      title: "Trámites de DNI para Peruanos en el Extranjero",
      url: "https://www.gob.pe/247-tramitar-dni-en-el-extranjero",
      category: "Constancias y Servicios Digitales"
    },
    {
      id: "reniec-pagos-tasas",
      title: "Generación de Ticket de Pago RENIEC (Yape / Agente BCP)",
      url: "https://recaudacion.reniec.gob.pe/recaudacionTasas/",
      category: "Constancias y Servicios Digitales"
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
      title: "Generación y Recuperación de Clave SOL Virtual",
      url: "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-ficha-ruc",
      title: "Descarga de Ficha RUC Digital Certificada",
      url: "https://www.gob.pe/281-obtener-ficha-ruc-electronica",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-modificar-ruc",
      title: "Modificación de Datos del RUC y Domicilio Fiscal",
      url: "https://www.gob.pe/10007-actualizar-datos-de-tu-ruc",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-suspension-reinicio",
      title: "Suspensión Temporal y Reinicio de Actividades del RUC",
      url: "https://www.gob.pe/10010-suspender-o-reiniciar-actividades-del-ruc",
      category: "RUC y Clave SOL"
    },
    {
      id: "sunat-baja-ruc",
      title: "Baja de Inscripción del RUC",
      url: "https://www.gob.pe/10011-solicitar-baja-de-inscripcion-del-ruc",
      category: "RUC y Clave SOL"
    },

    // ── 2. Comprobantes de Pago ──
    {
      id: "sunat-recibos-honorarios",
      title: "Emisión de Recibos por Honorarios Electrónicos (RHE)",
      url: "https://ww1.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-consulta-rhe",
      title: "Consulta y Reversión de Recibos por Honorarios",
      url: "https://www.gob.pe/1102-consultar-recibos-por-honorarios-electronicos",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-suspension-cuarta",
      title: "Solicitud de Suspensión de Retenciones de 4ta Categoría",
      url: "https://www.sunat.gob.pe/accesosDirectos/suspensionCuarta.html",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-factura-boleta",
      title: "Factura y Boleta de Venta Electrónica (SEE-SOL)",
      url: "https://ww1.sunat.gob.pe/ol-ti-itfesimpopciones/FESimpSunat.htm",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-gre",
      title: "Guía de Remisión Electrónica (GRE Remitente y Transportista)",
      url: "https://ww1.sunat.gob.pe/ol-ti-itgreopciones/GRESunat.htm",
      category: "Comprobantes de Pago"
    },
    {
      id: "sunat-notas-credito-debito",
      title: "Emisión de Notas de Crédito y Débito Electrónicas",
      url: "https://www.gob.pe/1104-emitir-notas-de-credito-y-debito-electronicas",
      category: "Comprobantes de Pago"
    },

    // ── 3. Declaraciones y Tributos ──
    {
      id: "sunat-declara-facil",
      title: "Declara Fácil - IGV Renta Mensual (Formulario 621)",
      url: "https://declarafacil.sunat.gob.pe/",
      category: "Declaraciones y Tributos"
    },
    {
      id: "sunat-plame",
      title: "Planilla Mensual de Pagos (PLAME y T-Registro)",
      url: "https://www.gob.pe/1106-declarar-planilla-mensual-de-pagos-plame",
      category: "Declaraciones y Tributos"
    },
    {
      id: "sunat-pago-varios-1662",
      title: "Boleta de Pago Varios Virtual (Formulario 1662 / 1609)",
      url: "https://www.gob.pe/10012-pagar-tributos-o-multas-con-guia-de-pago-facil-formulario-1662",
      category: "Declaraciones y Tributos"
    },
    {
      id: "sunat-consulta-declaraciones-pagos",
      title: "Consulta de Declaraciones Presentadas y Pagos Realizados",
      url: "https://www.gob.pe/10013-consultar-declaraciones-y-pagos-sunat",
      category: "Declaraciones y Tributos"
    },

    // ── 4. Deuda y Devoluciones ──
    {
      id: "sunat-deuda-tributaria",
      title: "Consulta de Deuda Tributaria y Valores Emitidos",
      url: "https://www.gob.pe/10014-consultar-deuda-tributaria-y-valores-sunat",
      category: "Deuda y Devoluciones"
    },
    {
      id: "sunat-fraccionamiento",
      title: "Solicitud de Fraccionamiento y Aplazamiento Tributario (Art. 36)",
      url: "https://www.gob.pe/10015-solicitar-fraccionamiento-o-aplazamiento-de-deuda-tributaria",
      category: "Deuda y Devoluciones"
    },
    {
      id: "sunat-devolucion-renta",
      title: "Solicitud de Devolución de Saldo a Favor de Renta (Formulario 1649)",
      url: "https://www.gob.pe/10016-solicitar-devolucion-de-saldo-a-favor-de-renta",
      category: "Deuda y Devoluciones"
    },
    {
      id: "sunat-devolucion-4949",
      title: "Devolución por Pago Indebido o en Exceso (Formulario 4949)",
      url: "https://www.gob.pe/10017-solicitar-devolucion-por-pago-indebido-o-en-exceso-formulario-4949",
      category: "Deuda y Devoluciones"
    },
    {
      id: "sunat-expedientes-coactivos",
      title: "Consulta de Expedientes Coactivos y Embargos",
      url: "https://www.gob.pe/10018-consultar-expedientes-de-cobranza-coactiva-sunat",
      category: "Deuda y Devoluciones"
    },

    // ── 5. Herramientas y Consultas Especiales ──
    {
      id: "sunat-gastos-deducibles",
      title: "Consulta de Gastos Deducibles de Impuesto a la Renta (Hasta 3 UIT)",
      url: "https://www.gob.pe/10019-consultar-gastos-deducibles-de-impuesto-a-la-renta",
      category: "Herramientas y Consultas Especiales"
    },
    {
      id: "sunat-liberacion-detracciones",
      title: "Solicitud de Liberación de Fondos de Detracciones",
      url: "https://www.gob.pe/10021-solicitar-liberacion-de-fondos-de-detracciones",
      category: "Herramientas y Consultas Especiales"
    },
    {
      id: "sunat-agentes-retencion",
      title: "Consulta de Padrón de Agentes de Retención y Percepción del IGV",
      url: "https://www.gob.pe/10022-consultar-padron-de-agentes-de-retencion-y-percepcion",
      category: "Herramientas y Consultas Especiales"
    }
  ],

  MIGRACIONES: [
    // ── 1. Pasaporte y Citas ──
    {
      id: "migraciones-citas-pasaporte",
      title: "Sistema de Citas para Pasaporte Electrónico Biométrico",
      url: "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/",
      category: "Pasaporte y Citas"
    },
    {
      id: "migraciones-pasaporte-mayores",
      title: "Obtener Pasaporte Electrónico para Mayores de Edad",
      url: "https://www.gob.pe/174-obtener-pasaporte-electronico-para-mayores-de-edad",
      category: "Pasaporte y Citas"
    },
    {
      id: "migraciones-pasaporte-menores",
      title: "Obtener Pasaporte Electrónico para Menores de Edad",
      url: "https://www.gob.pe/208-obtener-pasaporte-electronico-para-menores-de-edad",
      category: "Pasaporte y Citas"
    },
    {
      id: "migraciones-pasaporte-urgencia",
      title: "Pasaporte Electrónico por Urgencia (Vuelo en menos de 48h)",
      url: "https://www.gob.pe/174-obtener-pasaporte-electronico-para-mayores-de-edad#por-urgencia",
      category: "Pasaporte y Citas"
    },

    // ── 2. Extranjería y Residencia ──
    {
      id: "migraciones-prorroga-residencia",
      title: "Prórroga de Residencia y Permanencia para Extranjeros",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      category: "Extranjería y Residencia"
    },
    {
      id: "migraciones-cpp",
      title: "Permiso Temporal de Permanencia (CPP) / Carné de Extranjería",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      category: "Extranjería y Residencia"
    },
    {
      id: "migraciones-cambio-calidad",
      title: "Cambio de Calidad Migratoria (Trabajador / Familiar / Estudiante)",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      category: "Extranjería y Residencia"
    },

    // ── 3. Certificados y Control Migratorio ──
    {
      id: "migraciones-movimiento-migratorio",
      title: "Certificado de Movimiento Migratorio Digital",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      category: "Certificados y Control Migratorio"
    },
    {
      id: "migraciones-tarjeta-andina",
      title: "Descarga de Tarjeta Andina de Migración Virtual (TAM)",
      url: "https://cel.migraciones.gob.pe/ConsultaTAMVirtual/",
      category: "Certificados y Control Migratorio"
    },
    {
      id: "migraciones-mesa-partes",
      title: "Mesa de Partes Virtual de Migraciones",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/mesa-partes",
      category: "Certificados y Control Migratorio"
    }
  ],

  BN: [
    // ── 1. Pagos y Tasas del Estado ──
    {
      id: "bn-pagalo-pe",
      title: "Págalo.pe (Pago de Tasas de Todas las Entidades del Estado)",
      url: "https://www.pagalo.pe/",
      category: "Pagos y Tasas del Estado"
    },
    {
      id: "bn-pago-tramites-dnicap",
      title: "Pago de Tasas RENIEC, PNP, Migraciones y Poder Judicial",
      url: "https://www.pagalo.pe/",
      category: "Pagos y Tasas del Estado"
    },

    // ── 2. Cuentas y Tarjetas ──
    {
      id: "bn-multired-virtual",
      title: "Multired Virtual (Consulta de Saldos y Transferencias)",
      url: "https://zonasegura1.bn.com.pe/",
      category: "Cuentas y Tarjetas"
    },
    {
      id: "bn-cuenta-dni",
      title: "Activar Cuenta DNI Digital del Banco de la Nación",
      url: "https://www.gob.pe/14238-activar-tu-cuenta-dni",
      category: "Cuentas y Tarjetas"
    },
    {
      id: "bn-detracciones",
      title: "Consulta de Saldo de Cuenta de Detracciones SPOT",
      url: "https://zonasegura1.bn.com.pe/",
      category: "Cuentas y Tarjetas"
    },
    {
      id: "bn-cajeros-agencias",
      title: "Localizador de Agencias y Cajeros Multired a Nivel Nacional",
      url: "https://www.bn.com.pe/canales-atencion/cajeros-lima-metropolitana.asp",
      category: "Cuentas y Tarjetas"
    }
  ],

  MTC: [
    // ── 1. Licencias de Conducir ──
    {
      id: "mtc-licencias-digitales",
      title: "Sistema de Emisión de Licencias de Conducir Digitales",
      url: "https://licencias.mtc.gob.pe/",
      category: "Licencias de Conducir"
    },
    {
      id: "mtc-duplicado-revalidacion",
      title: "Revalidación y Duplicado de Brevete Electrónico",
      url: "https://licencias.mtc.gob.pe/",
      category: "Licencias de Conducir"
    },
    {
      id: "mtc-simulacro-reglas",
      title: "Simulacro Oficial de Examen de Reglas de Tránsito",
      url: "https://sierdn.mtc.gob.pe/",
      category: "Licencias de Conducir"
    },

    // ── 2. Récord y Fiscalización ──
    {
      id: "mtc-record-conductor",
      title: "Consulta de Récord del Conductor (Historial de Infracciones)",
      url: "https://recordconductor.mtc.gob.pe/",
      category: "Récord y Fiscalización"
    },
    {
      id: "mtc-puntos-licencia",
      title: "Sistema de Licencias por Puntos (Consulta de Saldo de Puntos)",
      url: "https://slcp.mtc.gob.pe/",
      category: "Récord y Fiscalización"
    },
    {
      id: "mtc-vehiculos-autorizados",
      title: "Consulta de Vehículos Autorizados para Transporte Terrestre",
      url: "https://www.gob.pe/338-consultar-vehiculos-autorizados-para-transporte-terrestre-de-mercancias-y-personas",
      category: "Récord y Fiscalización"
    }
  ],

  ESSALUD: [
    // ── 1. Acreditación y Seguros ──
    {
      id: "essalud-donde-me-atiendo",
      title: "Dónde me Atiendo (Consulta de Acreditación y Centro Médico)",
      url: "https://dondemeatiendo.essalud.gob.pe/",
      category: "Acreditación y Seguros"
    },
    {
      id: "essalud-afiliacion-potestativo",
      title: "Afiliación al Seguro Potestativo (+Salud)",
      url: "https://www.gob.pe/12760-afiliarte-al-seguro-potestativo-de-essalud",
      category: "Acreditación y Seguros"
    },
    {
      id: "essalud-seguro-agrario",
      title: "Consulta de Cobertura de Seguro Agrario e Independientes",
      url: "https://dondemeatiendo.essalud.gob.pe/",
      category: "Acreditación y Seguros"
    },

    // ── 2. Citas y Prestaciones ──
    {
      id: "essalud-citas-web",
      title: "EsSalud en Línea (Citas Médicas Digitales)",
      url: "https://citas.essalud.gob.pe/",
      category: "Citas y Prestaciones"
    },
    {
      id: "essalud-subsidio-lactancia",
      title: "Solicitud de Subsidio por Lactancia y Maternidad (VIVA)",
      url: "https://viva.essalud.gob.pe/viva/login",
      category: "Citas y Prestaciones"
    },
    {
      id: "essalud-canje-citt",
      title: "Canje de Certificado Médico Particular por CITT",
      url: "https://viva.essalud.gob.pe/viva/login",
      category: "Citas y Prestaciones"
    }
  ],

  SIS: [
    // ── 1. Afiliación y Estado del Seguro ──
    {
      id: "sis-consulta-afiliacion",
      title: "Consulta de Afiliación al SIS en Línea (Activo / Inactivo)",
      url: "https://cel.sis.gob.pe/SisConsultaEnLinea",
      category: "Afiliación y Estado del Seguro"
    },
    {
      id: "sis-afiliacion-gratuito",
      title: "Afiliación al SIS Gratuito / SIS Para Todos",
      url: "https://afiliacion.sis.gob.pe/",
      category: "Afiliación y Estado del Seguro"
    },
    {
      id: "sis-cambio-centro-salud",
      title: "Consulta y Cambio de Establecimiento de Salud Asignado",
      url: "https://cel.sis.gob.pe/SisConsultaEnLinea",
      category: "Afiliación y Estado del Seguro"
    },
    {
      id: "sis-coberturas-planes",
      title: "Guía Oficial de Coberturas y Medicamentos Cubiertos por el SIS",
      url: "https://www.gob.pe/10337-verificar-si-estas-afiliado-al-sis",
      category: "Afiliación y Estado del Seguro"
    }
  ],

  MINSA: [
    // ── 1. Salud Digital y Vacunación ──
    {
      id: "minsa-carnet-vacunacion",
      title: "Carnet de Vacunación Digital (Descarga de Certificado Oficial)",
      url: "https://carnetvacunacion.minsa.gob.pe/",
      category: "Salud Digital y Vacunación"
    },
    {
      id: "minsa-teleatiendo",
      title: "Teleatiendo (Telemedicina y Orientación Médica Gratuita)",
      url: "https://teleatiendo.minsa.gob.pe/",
      category: "Salud Digital y Vacunación"
    },
    {
      id: "minsa-establecimientos-salud",
      title: "Registro Nacional de Establecimientos de Salud (RENAES)",
      url: "http://renaes.minsa.gob.pe/",
      category: "Salud Digital y Vacunación"
    },
    {
      id: "minsa-personal-salud",
      title: "Consulta del Registro Nacional de Personal de la Salud (INFORHUS)",
      url: "https://inforhus.minsa.gob.pe/",
      category: "Salud Digital y Vacunación"
    }
  ],

  DIGEMID: [
    // ── 1. Medicamentos y Farmacias ──
    {
      id: "digemid-observatorio-precios",
      title: "Observatorio de Precios de Medicamentos en Farmacias y Boticas",
      url: "https://observatorio.digemid.minsa.gob.pe/",
      category: "Medicamentos y Farmacias"
    },
    {
      id: "digemid-registro-sanitario",
      title: "Consulta de Registro Sanitario de Medicamentos y Fármacos",
      url: "https://serviciosweb.digemid.minsa.gob.pe/",
      category: "Medicamentos y Farmacias"
    },
    {
      id: "digemid-alertas-seguridad",
      title: "Alertas Sanitarias y Retiro de Productos Farmacéuticos",
      url: "https://www.gob.pe/institucion/digemid/colecciones/36-alertas-digemid",
      category: "Medicamentos y Farmacias"
    }
  ],

  SBS: [
    // ── 1. Central de Riesgos y Deudas ──
    {
      id: "sbs-reporte-deudas",
      title: "Reporte de Deudas del Sistema Financiero (Semáforo de Crédito)",
      url: "https://servicios.sbs.gob.pe/serviciosenlinea",
      category: "Central de Riesgos y Deudas"
    },
    {
      id: "sbs-reporte-previsional",
      title: "Reporte de Situación Previsional (Estado de Cuenta SPP / AFP)",
      url: "https://servicios.sbs.gob.pe/serviciosenlinea",
      category: "Central de Riesgos y Deudas"
    },

    // ── 2. Seguros y Seguridad Financiera ──
    {
      id: "sbs-herederos-seguros",
      title: "Consulta de Seguros de Vida de Personas Fallecidas (Herederos)",
      url: "https://servicios.sbs.gob.pe/serviciosenlinea",
      category: "Seguros y Seguridad Financiera"
    },
    {
      id: "sbs-entidades-no-autorizadas",
      title: "Alerta de Entidades Financieras No Autorizadas / Esquemas Piramidales",
      url: "https://www.sbs.gob.pe/prevencion-de-lavado-activos/Informalidad-Financiera",
      category: "Seguros y Seguridad Financiera"
    },
    {
      id: "sbs-tipo-cambio",
      title: "Consulta de Tipo de Cambio Oficial SBS del Dólar y Otras Monedas",
      url: "https://www.sbs.gob.pe/app/pp/sistip_portal/paginas/publicacion/tipocambiopromedio.aspx",
      category: "Seguros y Seguridad Financiera"
    }
  ],

  SMV: [
    // ── 1. Mercado de Valores y Fondos ──
    {
      id: "smv-sistema-informacion",
      title: "Sistema de Información del Mercado de Valores y Fondos Colectivos",
      url: "https://www.smv.gob.pe/SIMV/",
      category: "Mercado de Valores y Fondos"
    },
    {
      id: "smv-fondos-mutuos",
      title: "Consulta de Fondos Mutuos, Rentabilidad y Sociedades Administradoras",
      url: "https://www.smv.gob.pe/",
      category: "Mercado de Valores y Fondos"
    },
    {
      id: "smv-hechos-importancia",
      title: "Consulta de Hechos de Importancia de Empresas que Cotizan en Bolsa",
      url: "https://www.smv.gob.pe/SIMV/",
      category: "Mercado de Valores y Fondos"
    }
  ],

  PNP: [
    // ── 1. Antecedentes Policiales ──
    {
      id: "pnp-cervirtual",
      title: "Certificado Digital de Antecedentes Policiales (CERVIRTUAL)",
      url: "https://sistemas.policia.gob.pe/cervirtual/",
      category: "Antecedentes Policiales"
    },
    {
      id: "pnp-antecedentes-viaje",
      title: "Certificado de Antecedentes Policiales para Uso en el Extranjero",
      url: "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero",
      category: "Antecedentes Policiales"
    },

    // ── 2. Denuncias y Seguridad ──
    {
      id: "pnp-denuncia-digital",
      title: "Denuncia Policial Digital por Pérdida de Documentos",
      url: "https://sistemas.policia.gob.pe/denuncias_digitales/",
      category: "Denuncias y Seguridad"
    },
    {
      id: "pnp-vehiculos-robados",
      title: "Consulta de Vehículos Robados y Recuperados por la PNP",
      url: "https://sistemas.policia.gob.pe/",
      category: "Denuncias y Seguridad"
    }
  ],

  "PODER JUDICIAL": [
    // ── 1. Antecedentes Penales ──
    {
      id: "pj-cape-digital",
      title: "Certificado Electrónico de Antecedentes Penales (CAPE)",
      url: "https://cape.pj.gob.pe/cape/pages/terminos-uso.xhtml",
      category: "Antecedentes Penales"
    },
    {
      id: "pj-redam",
      title: "Consulta en el Registro de Deudores Alimentarios Morosos (REDAM)",
      url: "https://redam.pj.gob.pe/",
      category: "Antecedentes Penales"
    },

    // ── 2. Procesos Judiciales ──
    {
      id: "pj-cej-expedientes",
      title: "Consulta de Expedientes Judiciales en Línea (CEJ)",
      url: "https://cej.pj.gob.pe/cej/forms/busquedaform.html",
      category: "Procesos Judiciales"
    },
    {
      id: "pj-sinoe",
      title: "Sistema de Notificaciones Electrónicas (SINOE / Casilla Electrónica)",
      url: "https://casillas.pj.gob.pe/sinoe/",
      category: "Procesos Judiciales"
    }
  ],

  INPE: [
    // ── 1. Antecedentes Judiciales ──
    {
      id: "inpe-cej-virtual",
      title: "Certificado Electrónico de Antecedentes Judiciales (CEJ Virtual)",
      url: "https://cejvirtual.inpe.gob.pe/",
      category: "Antecedentes Judiciales"
    },
    {
      id: "inpe-visita-penitenciaria",
      title: "Solicitud y Requisitos de Pase de Visita Penitenciaria",
      url: "https://www.gob.pe/325-certificado-de-antecedentes-judiciales",
      category: "Antecedentes Judiciales"
    }
  ],

  MPFN: [
    // ── 1. Seguimiento Fiscal y Denuncias ──
    {
      id: "mpfn-seguimiento-denuncias",
      title: "Seguimiento de Denuncias y Casos Fiscales",
      url: "https://portal.mpfn.gob.pe/seguimiento-de-denuncias",
      category: "Seguimiento Fiscal y Denuncias"
    },
    {
      id: "mpfn-mesa-partes",
      title: "Mesa de Partes Única Virtual del Ministerio Público",
      url: "https://portal.mpfn.gob.pe/mesa-de-partes-virtual",
      category: "Seguimiento Fiscal y Denuncias"
    },
    {
      id: "mpfn-denuncia-virtual",
      title: "Presentación de Denuncias por Delitos Comunes ante Fiscalía",
      url: "https://www.gob.pe/11325-consultar-estado-de-denuncias-en-el-ministerio-publico",
      category: "Seguimiento Fiscal y Denuncias"
    }
  ],

  MINJUSDH: [
    // ── 1. Asistencia Legal y Normas ──
    {
      id: "minjus-spij",
      title: "Sistema Peruano de Información Jurídica (SPIJ Oficial)",
      url: "https://spij.minjus.gob.pe/spij-ext-web/#/inicio",
      category: "Asistencia Legal y Normas"
    },
    {
      id: "minjus-defensa-publica",
      title: "Solicitud de Asistencia Legal Gratuita (Defensa Pública - ALEGRA)",
      url: "https://www.gob.pe/346-solicitar-asistencia-legal-gratuita-defensa-publica",
      category: "Asistencia Legal y Normas"
    },
    {
      id: "minjus-conciliacion",
      title: "Consulta de Centros de Conciliación Extrajudicial Autorizados",
      url: "https://www.gob.pe/748-acceder-al-sistema-peruano-de-informacion-juridica-spij",
      category: "Asistencia Legal y Normas"
    }
  ],

  DEFENSORIA: [
    // ── 1. Quejas y Derechos Ciudadanos ──
    {
      id: "defensoria-quejas",
      title: "Presentación de Quejas por Vulneración de Derechos o Mal Servicio Estatal",
      url: "https://www.defensoria.gob.pe/servicios-al-ciudadano/",
      category: "Quejas y Derechos Ciudadanos"
    },
    {
      id: "defensoria-orientacion",
      title: "Línea Gratuita de Orientación y Consulta Defensorial (0800-15-170)",
      url: "https://www.defensoria.gob.pe/",
      category: "Quejas y Derechos Ciudadanos"
    }
  ],

  ONP: [
    // ── 1. Pensiones y Jubilación ──
    {
      id: "onp-pension-digital",
      title: "ONP Virtual (Consulta de Estado de Cuenta de Aportes)",
      url: "https://onpvirtual.pe/",
      category: "Pensiones y Jubilación"
    },
    {
      id: "onp-solicitud-jubilacion",
      title: "Solicitud de Pensión de Jubilación (DL 19990 / DL 20530)",
      url: "https://onpvirtual.pe/",
      category: "Pensiones y Jubilación"
    },
    {
      id: "onp-cronograma-pagos",
      title: "Cronograma Mensual de Pago de Pensiones a Jubilados",
      url: "https://www.gob.pe/10952-cronograma-de-pago-del-pensionista",
      category: "Pensiones y Jubilación"
    },
    {
      id: "onp-pension-viudez",
      title: "Solicitud de Pensión de Sobrevivencia (Viudez y Orfandad)",
      url: "https://onpvirtual.pe/",
      category: "Pensiones y Jubilación"
    }
  ],

  SUNAFIL: [
    // ── 1. Denuncias y Derechos Laborales ──
    {
      id: "sunafil-denuncia-virtual",
      title: "Denuncia Virtual por Incumplimiento de Derechos Laborales",
      url: "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales/",
      category: "Denuncias y Derechos Laborales"
    },
    {
      id: "sunafil-calculadora-laboral",
      title: "Calculadora de Beneficios Laborales (Gratificación, CTS y Vacaciones)",
      url: "https://aplicativosweb2.sunafil.gob.pe/si.calculadoraLaboral/",
      category: "Denuncias y Derechos Laborales"
    },
    {
      id: "sunafil-verifica-tu-chamba",
      title: "Verifica Tu Chamba (Consulta si estás en Planilla)",
      url: "https://aplicativosweb2.sunafil.gob.pe/si.verificacionLaboral/",
      category: "Denuncias y Derechos Laborales"
    },
    {
      id: "sunafil-casilla-electronica",
      title: "Casilla Electrónica de Notificaciones Sunafil",
      url: "https://casillaelectronica.sunafil.gob.pe/si.inbox/Login/SUNAT",
      category: "Denuncias y Derechos Laborales"
    }
  ],

  MTPE: [
    // ── 1. Empleo y Certificados Laborales ──
    {
      id: "mtpe-cul-empleos-peru",
      title: "Certificado Único Laboral (CUL - Antecedentes y Experiencia)",
      url: "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/",
      category: "Empleo y Certificados"
    },
    {
      id: "mtpe-bolsa-trabajo",
      title: "Bolsa de Trabajo Oficial Empleos Perú (Ofertas Laborales)",
      url: "https://www.empleosperu.gob.pe/",
      category: "Empleo y Certificados"
    },
    {
      id: "mtpe-capacitaciones",
      title: "Cursos y Certificaciones Virtuales Gratuitas para el Trabajo",
      url: "https://capacitacionlaboral.empleosperu.gob.pe/",
      category: "Empleo y Certificados"
    },
    {
      id: "mtpe-liquidacion-asesoria",
      title: "Asesoría Virtual en Liquidación de Beneficios Sociales",
      url: "https://www.gob.pe/47089-obtener-tu-certificado-unico-laboral-cul",
      category: "Empleo y Certificados"
    }
  ],

  AFP: [
    // ── 1. Consulta y Gestión Previsional Privada ──
    {
      id: "afp-consulta-afiliacion",
      title: "Consulta Oficial en qué AFP estás Afiliado (SBS)",
      url: "https://servicios.sbs.gob.pe/serviciosenlinea",
      category: "Consulta y Gestión Previsional"
    },
    {
      id: "afp-asociacion",
      title: "Portal de la Asociación de AFP del Perú",
      url: "https://www.asociacionafp.pe/",
      category: "Consulta y Gestión Previsional"
    },
    {
      id: "afp-integra",
      title: "Portal de Afiliados AFP Integra",
      url: "https://www.afpintegra.pe/",
      category: "Consulta y Gestión Previsional"
    },
    {
      id: "afp-prima",
      title: "Portal de Afiliados Prima AFP",
      url: "https://www.prima.com.pe/",
      category: "Consulta y Gestión Previsional"
    },
    {
      id: "afp-profuturo",
      title: "Portal de Afiliados Profuturo AFP",
      url: "https://www.profuturo.com.pe/",
      category: "Consulta y Gestión Previsional"
    },
    {
      id: "afp-habitat",
      title: "Portal de Afiliados AFP Habitat",
      url: "https://www.habitat.com.pe/",
      category: "Consulta y Gestión Previsional"
    }
  ],

  SUTRAN: [
    // ── 1. Tránsito y Seguridad en Carreteras ──
    {
      id: "sutran-cinemometro",
      title: "Consulta de Infracciones y Papeletas por Cinemómetro (Velocidad)",
      url: "https://www.sutran.gob.pe/infraccion-por-cinemometro/",
      category: "Tránsito y Carreteras"
    },
    {
      id: "sutran-mapa-vias",
      title: "Mapa de Alerta del Estado de Vías Nacionales en Tiempo Real",
      url: "http://gis.sutran.gob.pe/alerta_sutran/",
      category: "Tránsito y Carreteras"
    },
    {
      id: "sutran-record-infracciones",
      title: "Récord de Infracciones del Servicio de Transporte Terrestre",
      url: "https://www.gob.pe/12133-consultar-si-tienes-papeletas-de-infraccion-por-cinemometro",
      category: "Tránsito y Carreteras"
    }
  ],

  "SAT LIMA": [
    // ── 1. Papeletas y Tributos Municipales ──
    {
      id: "sat-papeletas-lima",
      title: "Consulta de Papeletas y Multas de Tránsito de Lima",
      url: "https://www.sat.gob.pe/VirtualSAT/",
      category: "Papeletas y Tributos"
    },
    {
      id: "sat-impuesto-vehicular-predial",
      title: "Consulta y Pago de Impuesto Vehicular, Predial y Arbitrios",
      url: "https://www.sat.gob.pe/VirtualSAT/",
      category: "Papeletas y Tributos"
    },
    {
      id: "sat-captura-vehicular",
      title: "Consulta de Órdenes de Captura Vehicular por Deudas",
      url: "https://www.sat.gob.pe/WebSitev8/Modulos/Contenidos/captura_vehicular.aspx",
      category: "Papeletas y Tributos"
    }
  ],

  ATU: [
    // ── 1. Transporte Urbano y Taxis ──
    {
      id: "atu-consulta-vehicular",
      title: "Consulta de Vehículos y Taxis Autorizados en Lima y Callao",
      url: "https://sistemas.atu.gob.pe/ConsultaVehiculo",
      category: "Transporte Urbano y Taxis"
    },
    {
      id: "atu-consulta-conductor",
      title: "Consulta de Conductores y Credenciales de Transporte Urbano",
      url: "https://sistemas.atu.gob.pe/ConsultaConductor",
      category: "Transporte Urbano y Taxis"
    },
    {
      id: "atu-papeletas-tramites",
      title: "Consulta de Trámites, Resoluciones y Papeletas ATU",
      url: "https://www.gob.pe/institucion/atu/tramites-y-servicios",
      category: "Transporte Urbano y Taxis"
    }
  ],

  SUNEDU: [
    // ── 1. Grados y Títulos Universitarios ──
    {
      id: "sunedu-constancia-diplomas",
      title: "Constancia de Inscripción de Diplomas (Grados y Títulos Oficiales)",
      url: "https://enlinea.sunedu.gob.pe/constanciadeinscripcion",
      category: "Grados y Títulos Universitarios"
    },
    {
      id: "sunedu-grados-titulos",
      title: "Sunedu en Línea (Verificación de Registro de Grados y Títulos)",
      url: "https://enlinea.sunedu.gob.pe/",
      category: "Grados y Títulos Universitarios"
    },
    {
      id: "sunedu-carnet-universitario",
      title: "Consulta de Estado de Emisión de Carnet Universitario",
      url: "https://enlinea.sunedu.gob.pe/carnet",
      category: "Grados y Títulos Universitarios"
    }
  ],

  MINEDU: [
    // ── 1. Certificados y Calificaciones ──
    {
      id: "minedu-certificado-estudios",
      title: "Certificado Oficial de Estudios Digital (Primaria y Secundaria)",
      url: "https://certificado.minedu.gob.pe/",
      category: "Certificados y Calificaciones"
    },
    {
      id: "minedu-titulos-institutos",
      title: "Consulta de Grados y Títulos de Institutos Tecnológicos y Pedagógicos",
      url: "https://titulosinstitutos.minedu.gob.pe/",
      category: "Certificados y Calificaciones"
    },
    {
      id: "minedu-constancia-logros",
      title: "Constancia de Logros de Aprendizaje Digital",
      url: "https://constancia.minedu.gob.pe/",
      category: "Certificados y Calificaciones"
    },
    {
      id: "minedu-evaluacion-docente",
      title: "Portal de Evaluación Docente y Concursos Magisteriales",
      url: "https://evaluaciondocente.perueduca.pe/",
      category: "Certificados y Calificaciones"
    }
  ],

  PRONABEC: [
    // ── 1. Becas y Créditos Educativos ──
    {
      id: "pronabec-beca-18",
      title: "Beca 18 (Convocatoria, Requisitos y Postulación en Línea)",
      url: "https://www.pronabec.gob.pe/beca-18/",
      category: "Becas y Créditos Educativos"
    },
    {
      id: "pronabec-beca-permanencia",
      title: "Beca Permanencia y Continuidad de Estudios Universitarios",
      url: "https://www.pronabec.gob.pe/",
      category: "Becas y Créditos Educativos"
    },
    {
      id: "pronabec-credito-talento",
      title: "Crédito Educativo (Crédito Talento PRONABEC)",
      url: "https://www.pronabec.gob.pe/credito-talento/",
      category: "Becas y Créditos Educativos"
    },
    {
      id: "pronabec-mesa-partes",
      title: "Mesa de Partes Virtual PRONABEC",
      url: "https://mesadepartes.pronabec.gob.pe/",
      category: "Becas y Créditos Educativos"
    }
  ],

  SINEACE: [
    // ── 1. Acreditación de Calidad Educativa ──
    {
      id: "sineace-instituciones-acreditadas",
      title: "Consulta de Instituciones y Programas de Estudio Acreditados",
      url: "https://app.sineace.gob.pe/Reportes/Acreditacion.aspx",
      category: "Acreditación de Calidad"
    },
    {
      id: "sineace-certificacion-competencias",
      title: "Consulta de Personas con Certificación de Competencias Laborales",
      url: "https://app.sineace.gob.pe/",
      category: "Acreditación de Calidad"
    }
  ],

  INDECOPI: [
    // ── 1. Protección al Consumidor ──
    {
      id: "indecopi-reclama-virtual",
      title: "Reclama Virtual (Presentar Reclamo contra Proveedores y Empresas)",
      url: "https://enlinea.indecopi.gob.pe/reclamavirtual/",
      category: "Protección al Consumidor"
    },
    {
      id: "indecopi-mira-a-quien-le-compras",
      title: "Mira a Quién le Compras (Ranking de Empresas Sancionadas)",
      url: "https://enlinea.indecopi.gob.pe/miraaquienlecompras/",
      category: "Protección al Consumidor"
    },

    // ── 2. Marcas y Propiedad Intelectual ──
    {
      id: "indecopi-busca-tu-marca",
      title: "Busca Tu Marca (Búsqueda Fonética y Gratuita de Marcas)",
      url: "https://busca-tu-marca.indecopi.gob.pe/",
      category: "Marcas y Propiedad Intelectual"
    },
    {
      id: "indecopi-registro-marcas",
      title: "Registro de Marcas de Productos y Servicios en Línea",
      url: "https://enlinea.indecopi.gob.pe/marcas/",
      category: "Marcas y Propiedad Intelectual"
    }
  ],

  OSIPTEL: [
    // ── 1. Telecomunicaciones e Internet ──
    {
      id: "osiptel-checa-tus-lineas",
      title: "Checa tus Líneas (Consulta de Líneas Móviles a tu Nombre)",
      url: "https://checatuslineas.osiptel.gob.pe/",
      category: "Telecomunicaciones e Internet"
    },
    {
      id: "osiptel-checa-tu-imei",
      title: "Checa tu IMEI (Consulta de Celulares Reportados como Robados)",
      url: "https://socio.osiptel.gob.pe/ChecaTuImei/",
      category: "Telecomunicaciones e Internet"
    },
    {
      id: "osiptel-comparatel",
      title: "Comparatel (Comparador Oficial de Tarifas Móviles y Fibra Óptica)",
      url: "https://comparatel.pe/",
      category: "Telecomunicaciones e Internet"
    },
    {
      id: "osiptel-socio",
      title: "SOCIO Osiptel (Reclamos por Servicios de Telecomunicaciones)",
      url: "https://socio.osiptel.gob.pe/",
      category: "Telecomunicaciones e Internet"
    }
  ],

  OSINERGMIN: [
    // ── 1. Electricidad, Gas y Combustibles ──
    {
      id: "osinergmin-facilito",
      title: "Facilito (Precios de Gasolina, Diésel, Balón de Gas GLP y GNV)",
      url: "https://www.facilito.gob.pe/",
      category: "Electricidad y Combustibles"
    },
    {
      id: "osinergmin-reclamos-luz",
      title: "Reclamos por Cortes de Luz y Facturación Eléctrica Excesiva",
      url: "https://ventanillavirtual.osinergmin.gob.pe/ventanilla-virtual/pages/inicio",
      category: "Electricidad y Combustibles"
    },
    {
      id: "osinergmin-instaladores-gas",
      title: "Consulta de Instaladores y Empresas Habilitadas de Gas Natural",
      url: "https://www.gob.pe/65429-organismo-supervisor-de-la-inversion-en-energia-y-mineria-acceder-a-mesa-de-partes",
      category: "Electricidad y Combustibles"
    }
  ],

  SUNASS: [
    // ── 1. Servicios de Saneamiento y Agua ──
    {
      id: "sunass-reclamos-agua",
      title: "Orientación y Reclamos por Servicio de Agua Potable y Alcantarillado",
      url: "https://www.sunass.gob.pe/usuarios/",
      category: "Servicios de Agua Potable"
    },
    {
      id: "sunass-tarifas",
      title: "Consulta de Tarifas de Agua Potable a Nivel Nacional",
      url: "https://www.sunass.gob.pe/",
      category: "Servicios de Agua Potable"
    }
  ],

  OSITRAN: [
    // ── 1. Infraestructura de Transporte ──
    {
      id: "ositran-tarifas-peajes",
      title: "Consulta de Tarifas de Peajes en Carreteras Nacionales Concesionadas",
      url: "https://www.ositran.gob.pe/",
      category: "Infraestructura de Transporte"
    },
    {
      id: "ositran-reclamos-aeropuertos",
      title: "Reclamos por Servicios en Aeropuertos, Puertos y Vías Concesionadas",
      url: "https://www.gob.pe/ositran",
      category: "Infraestructura de Transporte"
    }
  ],

  SEDAPAL: [
    // ── 1. Agua Potable en Lima y Callao ──
    {
      id: "sedapal-aquanet",
      title: "Aquanet (Oficina Virtual de Sedapal - Recibos, Saldos y Pagos)",
      url: "https://aquanet.sedapal.com.pe/",
      category: "Agua Potable Lima y Callao"
    },
    {
      id: "sedapal-aquafono",
      title: "Consulta de Recibo y Saldo de Agua en Línea (Aquafono)",
      url: "https://www.gob.pe/12786-llamar-a-sedapal-aquafono",
      category: "Agua Potable Lima y Callao"
    },
    {
      id: "sedapal-cortes-programados",
      title: "Mapa de Cortes Programados de Agua por Mantenimiento en Lima",
      url: "https://sedapal.maps.arcgis.com/",
      category: "Agua Potable Lima y Callao"
    }
  ],

  SEDAPAR: [
    // ── 1. Agua Potable en Arequipa ──
    {
      id: "sedapar-oficina-virtual",
      title: "Oficina Virtual SEDAPAR (Consulta y Pago de Recibo de Agua)",
      url: "https://oficinavirtual.sedapar.com.pe/",
      category: "Agua Potable Arequipa"
    },
    {
      id: "sedapar-cortes-agua",
      title: "Consulta de Cortes Programados y Mantenimiento de Redes",
      url: "https://www.sedapar.com.pe/",
      category: "Agua Potable Arequipa"
    }
  ],

  ONPE: [
    // ── 1. Procesos Electorales ──
    {
      id: "onpe-local-votacion",
      title: "Consulta de Local de Votación y Miembro de Mesa Oficial",
      url: "https://consultaelectoral.onpe.gob.pe/",
      category: "Procesos Electorales"
    },
    {
      id: "onpe-elige-tu-local",
      title: "Elige tu Local de Votación (ETLV)",
      url: "https://eligetulocal.onpe.gob.pe/",
      category: "Procesos Electorales"
    },
    {
      id: "onpe-tu-constancia",
      title: "Constancia de Sufragio y Trámites Electorales Digitales",
      url: "https://tuconstancia.onpe.gob.pe/",
      category: "Procesos Electorales"
    }
  ],

  JNE: [
    // ── 1. Multas y Dispensas Electorales ──
    {
      id: "jne-multas-electorales",
      title: "Consulta de Multas Electorales y Pago en Línea",
      url: "https://multas.jne.gob.pe/",
      category: "Multas y Dispensas"
    },
    {
      id: "jne-dispensa-electoral",
      title: "Solicitud de Dispensa y Justificación de No Sufragio",
      url: "https://dispensa.jne.gob.pe/",
      category: "Multas y Dispensas"
    },
    {
      id: "jne-afiliacion-partidaria",
      title: "Consulta de Afiliación a Organizaciones Políticas (ROP)",
      url: "https://sroppublico.jne.gob.pe/",
      category: "Multas y Dispensas"
    }
  ],

  INDECI: [
    // ── 1. Prevención y Emergencias ──
    {
      id: "indeci-guias-preparacion",
      title: "Guías de Preparación Ante Sismos, Lluvias y Mochila de Emergencia",
      url: "https://www.gob.pe/indeci",
      category: "Prevención y Emergencias"
    },
    {
      id: "indeci-coen",
      title: "Centro de Operaciones de Emergencia Nacional (COEN)",
      url: "https://coen.indeci.gob.pe/",
      category: "Prevención y Emergencias"
    }
  ],

  OEFA: [
    // ── 1. Fiscalización Ambiental ──
    {
      id: "oefa-sinada",
      title: "Servicio Nacional de Denuncias Ambientales (SINADA)",
      url: "https://sistemas.oefa.gob.pe/sifa/frontend/mf-registro-denuncias/#/bienvenida",
      category: "Fiscalización Ambiental"
    },
    {
      id: "oefa-portal-denuncias",
      title: "Guía de Denuncias Ambientales por Contaminación Minera e Industrial",
      url: "https://www.gob.pe/913-servicio-nacional-de-denuncias-ambientales",
      category: "Fiscalización Ambiental"
    }
  ],

  SERFOR: [
    // ── 1. Recursos Forestales y Fauna ──
    {
      id: "serfor-alerta",
      title: "Alerta SERFOR (Denuncia de Tráfico Ilegal de Fauna Silvestre y Tala)",
      url: "https://appweb.serfor.gob.pe/alertaserfor/",
      category: "Recursos Forestales y Fauna"
    },
    {
      id: "serfor-mesa-partes",
      title: "Mesa de Partes Virtual SERFOR",
      url: "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      category: "Recursos Forestales y Fauna"
    }
  ],

  SENASA: [
    // ── 1. Sanidad Agraria y Mascotas ──
    {
      id: "senasa-requisitos-mascotas",
      title: "Requisitos Sanitarios para Salida e Ingreso de Perros y Gatos del País",
      url: "https://servicios.senasa.gob.pe/consultaRequisitos/consultarRequisitos.action",
      category: "Sanidad Agraria y Mascotas"
    },
    {
      id: "senasa-comercio-exterior",
      title: "Consulta de Requisitos Fitosanitarios y Zoosanitarios para Comercio",
      url: "https://www.gob.pe/10950-consultar-los-requisitos-sanitarios-y-fitosanitarios-para-el-comercio-exterior",
      category: "Sanidad Agraria y Mascotas"
    }
  ],

  SUSALUD: [
    // ── 1. Derechos del Asegurado ──
    {
      id: "susalud-consulta-asegurado",
      title: "Consulta de Derechos del Asegurado en Salud (Resuelve)",
      url: "https://app1.susalud.gob.pe/registro/",
      category: "Derechos del Asegurado"
    },
    {
      id: "susalud-denuncias-clinicas",
      title: "Denuncia por Negación de Atención de Emergencia o Mala Praxis",
      url: "https://www.gob.pe/10192-conocer-si-cuentas-con-un-seguro-de-salud-resuelve",
      category: "Derechos del Asegurado"
    }
  ]
};

/**
 * Obtiene los trámites oficiales de una entidad con fallback dinámico y búsqueda oficial exacta
 */
export function getEntityOfficialProcedures(acronym: string): DirectProcedureItem[] {
  const norm = (acronym || "").toUpperCase().trim().replace(/_/g, " ");
  
  // 1. Coincidencia exacta directa
  if (OFFICIAL_PROCEDURES_BY_ENTITY[norm]) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[norm];
  }
  
  // 2. Coincidencia normalizada con alias comunes
  const key = Object.keys(OFFICIAL_PROCEDURES_BY_ENTITY).find(k => {
    const cleanK = k.toUpperCase().trim().replace(/_/g, " ");
    return cleanK === norm || norm.includes(cleanK) || cleanK.includes(norm);
  });
  if (key && OFFICIAL_PROCEDURES_BY_ENTITY[key]) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[key];
  }

  // 3. Fallback desde catálogo de CIVIC_ENTITIES
  const civic = CIVIC_ENTITIES.find(e => {
    const eNorm = e.acronym.toUpperCase().trim().replace(/_/g, " ");
    const idNorm = e.id.toUpperCase().trim().replace(/_/g, " ");
    return eNorm === norm || idNorm === norm || (e.name && e.name.toUpperCase().includes(norm));
  });

  if (civic && civic.popularProcedures && civic.popularProcedures.length > 0) {
    return civic.popularProcedures.map((p, i) => ({
      id: `${civic.acronym.toLowerCase()}-proc-${i + 1}`,
      title: p.title,
      url: p.url || `https://www.gob.pe/busquedas?contenido=tramites&institucion=${encodeURIComponent(civic.acronym)}`,
      category: civic.category || "Trámites Oficiales"
    }));
  }

  // 4. Fallback a búsqueda oficial en gob.pe del sector específico
  return [
    {
      id: `${norm.toLowerCase().replace(/[^a-z0-9]/g, "-")}-guia-oficial`,
      title: `Catálogo Oficial de Trámites y Servicios de ${acronym}`,
      url: `https://www.gob.pe/busquedas?contenido=tramites&institucion=${encodeURIComponent(acronym)}`,
      category: "Portal Oficial de Trámites"
    }
  ];
}
