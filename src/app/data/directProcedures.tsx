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
  requirements?: string[];
  bannerGradient: string;
  iconType: string;
  visualTag: string; // e.g. "INFORMACIÓN VEHICULAR", "ROBO O PÉRDIDA", "ESTADO CIVIL", "CONSTANCIA DE IDENTIDAD", etc.
}

export interface ProcedureCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  items: DirectProcedureItem[];
}

/**
 * Catálogo organizado por Categorías Temáticas para cada Entidad Pública (.gob.pe)
 */
export const OFFICIAL_CATEGORIZED_PROCEDURES: Record<string, ProcedureCategoryGroup[]> = {
  SUNARP: [
    {
      id: "sunarp-info-vehicular",
      title: "Información del Vehículo",
      subtitle: "Conoce datos básicos, origen, marca, modelo, año y características principales",
      icon: "car",
      items: [
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
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
          iconType: "vehicle",
          visualTag: "INFORMACIÓN VEHICULAR"
        },
        {
          id: "sunarp-placas-duplicadas",
          title: "Placas Duplicadas y Tercera Placa",
          shortTitle: "Placas Duplicadas",
          description: "Gestiona el duplicado oficial de placa de rodaje por deterioro, robo o pérdida ante la Asociación Automotriz y SUNARP.",
          url: "https://www.placas.pe/",
          cost: "S/ 114.40",
          timeEstimate: "2 a 3 días hábiles",
          requirements: ["Denuncia policial (en caso de pérdida)", "Tarjeta de propiedad o TIVE"],
          bannerGradient: "linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)",
          iconType: "id-card",
          visualTag: "PLACAS E IDENTIFICACIÓN"
        },
        {
          id: "sunarp-buscar-vin",
          title: "Buscar por VIN / Chasis",
          shortTitle: "Buscar por VIN",
          description: "Rastrea el historial de fábrica, país de ensamblaje y especificaciones técnicas mediante el código VIN del chasis.",
          url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["17 dígitos del VIN grabados en el chasis"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
          iconType: "search",
          visualTag: "CÓDIGO VIN / CHASIS"
        },
        {
          id: "sunarp-consulta-serie-motor",
          title: "Consulta de Serie y Motor",
          shortTitle: "Consulta Serie y Motor",
          description: "Valida que el número de serie y motor grabados físicamente coincidan con la base registral oficial de SUNARP.",
          url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (30 min lectura)",
          requirements: ["DNI y fecha de emisión", "Número de partida registral"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
          iconType: "tool",
          visualTag: "DATOS DE SERIE Y MOTOR"
        }
      ]
    },
    {
      id: "sunarp-propiedad-legalidad",
      title: "Propiedad y Legalidad",
      subtitle: "Partidas registrales, historial completo, títulos en trámite, garantías mobiliarias y medidas cautelares",
      icon: "scale",
      items: [
        {
          id: "sunarp-sprl-copia-literal",
          title: "Historial Completo / Copia Literal SPRL",
          shortTitle: "Copia Literal SPRL",
          description: "Descarga la partida registral completa de inmuebles, vehículos, personas jurídicas y testamentos con firma digital oficial.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "Desde S/ 6.00 por hoja",
          timeEstimate: "Entrega inmediata en PDF",
          requirements: ["Número de partida registral o ficha", "Pago con tarjeta o Págalo.pe"],
          bannerGradient: "linear-gradient(135deg, #312E81 0%, #4F46E5 100%)",
          iconType: "deed",
          visualTag: "PARTIDA REGISTRAL"
        },
        {
          id: "sunarp-siguelo-plus",
          title: "Síguelo Plus (Seguimiento de Títulos)",
          shortTitle: "Síguelo Plus",
          description: "Monitorea en tiempo real el estado de calificación de tu trámite, esquelas de liquidación o títulos archivados.",
          url: "https://siguelo.sunarp.gob.pe/siguelo/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de título y año", "Oficina registral"],
          bannerGradient: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
          iconType: "search",
          visualTag: "SEGUIMIENTO EN VIVO"
        },
        {
          id: "sunarp-garantia-mobiliaria",
          title: "Garantía Mobiliaria (RGM)",
          shortTitle: "Garantía Mobiliaria",
          description: "Consulta si un bien mueble o vehículo se encuentra prendado o afectado por deudas bancarias o crediticias.",
          url: "https://rgm.sunarp.gob.pe/rgm/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["DNI del deudor o placa vehicular"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "shield-alert",
          visualTag: "GARANTÍAS Y PRENDAS"
        },
        {
          id: "sunarp-medidas-cautelares",
          title: "Medidas Cautelares y Gravámenes",
          shortTitle: "Medidas Cautelares",
          description: "Revisa la existencia de embargos judiciales, órdenes de captura o medidas cautelares inscritas en Registros Públicos.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "Desde S/ 6.00",
          timeEstimate: "Entrega en PDF",
          requirements: ["Número de partida vehicular"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)",
          iconType: "legal",
          visualTag: "MEDIDAS CAUTELARES"
        }
      ]
    },
    {
      id: "sunarp-riesgos-modificaciones",
      title: "Riesgos del Vehículo y Modificaciones",
      subtitle: "Verificación de choques, uso, cambios de motor, color, modificaciones y alertas contra el fraude",
      icon: "alert-triangle",
      items: [
        {
          id: "sunarp-alerta-registral",
          title: "Alerta Registral Gratuita",
          shortTitle: "Alerta Registral",
          description: "Servicio preventivo gratuito que te avisa por correo y SMS en tiempo real sobre cualquier trámite presentado sobre tus bienes.",
          url: "https://www.sunarp.gob.pe/alertaregistral/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Activación en 3 minutos",
          requirements: ["Número de DNI", "Partida de tu predio o vehículo"],
          bannerGradient: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)",
          iconType: "shield-alert",
          visualTag: "PROTECCIÓN ANTI-FRAUDE"
        },
        {
          id: "sunarp-cambio-caracteristicas",
          title: "Cambio de Características (Motor y Color)",
          shortTitle: "Cambio de Color / Motor",
          description: "Inscripción oficial de modificaciones físicas, cambio de color, cambio de carrocería o reemplazo de motor.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "S/ 42.00 (Tasa registral)",
          timeEstimate: "3 a 7 días hábiles",
          requirements: ["Certificado de conformidad o peritaje", "Pago de tasa registral"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "tool",
          visualTag: "MODIFICACIONES TÉCNICAS"
        },
        {
          id: "sunarp-titulos-archivados",
          title: "Títulos Archivados y Anotaciones",
          shortTitle: "Títulos Archivados",
          description: "Consulta y solicita copias de los contratos y títulos históricos que dieron origen a la inscripción registral.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "Desde S/ 6.00 por hoja",
          timeEstimate: "24 a 48 horas",
          requirements: ["Número de título y año archivado"],
          bannerGradient: "linear-gradient(135deg, #374151 0%, #1F2937 100%)",
          iconType: "document",
          visualTag: "TÍTULOS ARCHIVADOS"
        },
        {
          id: "sunarp-verificacion-no-robo",
          title: "Verificación de No Robo / No Gravamen",
          shortTitle: "Verificación No Robo",
          description: "Comprueba que la unidad no posea requisitorias policiales ni orden de captura vigente inscrita.",
          url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #831843 0%, #BE185D 100%)",
          iconType: "shield-alert",
          visualTag: "ALERTAS DE ROBO"
        }
      ]
    },
    {
      id: "sunarp-multas-deudas",
      title: "Multas y Deudas (SAT, ATU, SUTRAN, MTC)",
      subtitle: "Consulta unificada de papeletas, deudas tributarias, fiscalización y multas de tránsito",
      icon: "receipt",
      items: [
        {
          id: "sunarp-sat-lima",
          title: "SAT Lima (Papeletas e Impuesto Vehicular)",
          shortTitle: "SAT Lima",
          description: "Consulta papeletas de tránsito, impuesto vehicular pendiente de pago y captura por deudas en Lima Metropolitana.",
          url: "https://www.sat.gob.pe/Websitev9/TributosMultas/Vehicular/ConsultasPapeletas",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de placa vehicular o DNI"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          iconType: "receipt",
          visualTag: "SAT LIMA & PAPELETAS"
        },
        {
          id: "sunarp-sutran",
          title: "SUTRAN (Fiscalización en Carreteras)",
          shortTitle: "SUTRAN Carreteras",
          description: "Verifica infracciones y actas de control impuestas en la red vial nacional y carreteras de todo el Perú.",
          url: "https://www.sutran.gob.pe/consultas/record-de-infracciones/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #B91C1C 0%, #EF4444 100%)",
          iconType: "receipt",
          visualTag: "SUTRAN CARRETERAS"
        },
        {
          id: "sunarp-atu",
          title: "ATU (Infracciones de Transporte Urbano)",
          shortTitle: "ATU Infracciones",
          description: "Consulta sanciones y fiscalización de vehículos de transporte público, taxi y movilidad escolar en Lima y Callao.",
          url: "https://sistemas.atu.gob.pe/ConsultaVehiculo",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
          iconType: "receipt",
          visualTag: "ATU TRANSPORTE"
        },
        {
          id: "sunarp-record-mtc",
          title: "Récord del Conductor MTC (Sistema de Puntos)",
          shortTitle: "Récord MTC",
          description: "Obtén la constancia oficial de puntos acumulados, sanciones firmes y récord limpio de manejo.",
          url: "https://recordconductor.mtc.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Descarga inmediata",
          requirements: ["Número de DNI o Licencia de Conducir"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #475569 100%)",
          iconType: "document",
          visualTag: "RÉCORD MTC"
        }
      ]
    },
    {
      id: "sunarp-alertas-seguridad",
      title: "Alertas y Seguridad (SOAT, Capturas, Lunas, Transporte)",
      subtitle: "SOAT vigente, requisitorias policiales, permiso de lunas y transporte formal",
      icon: "shield",
      items: [
        {
          id: "sunarp-soat-apeseg",
          title: "Consulta SOAT Vigente (APESEG)",
          shortTitle: "SOAT Electrónico",
          description: "Verifica de inmediato la vigencia, número de póliza y compañía aseguradora emisora del SOAT electrónico.",
          url: "https://www.apeseg.org.pe/consultas-soat/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de placa vehicular"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
          iconType: "shield-alert",
          visualTag: "SOAT ELECTRÓNICO"
        },
        {
          id: "sunarp-capturas-pnp",
          title: "Capturas y Requisitorias (PNP)",
          shortTitle: "Requisitorias PNP",
          description: "Consulta si la unidad vehicular tiene orden de captura policial activa por orden judicial o fiscal.",
          url: "https://www.policia.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)",
          iconType: "shield-alert",
          visualTag: "REQUISITORIAS PNP"
        },
        {
          id: "sunarp-lunas-polarizadas",
          title: "Permiso de Lunas Oscurecidas / Polarizadas",
          shortTitle: "Lunas Polarizadas",
          description: "Tramita o valida el certificado oficial de uso de lunas oscurecidas o polarizadas con vigencia indeterminada.",
          url: "https://www.gob.pe/337-autorizacion-para-el-uso-de-lunas-oscurecidas-o-polarizadas",
          cost: "S/ 337.90 (Tasa única)",
          timeEstimate: "3 a 5 días hábiles",
          requirements: ["SOAT vigente", "Revisión técnica", "DNI del propietario"],
          bannerGradient: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
          iconType: "vehicle",
          visualTag: "LUNAS POLARIZADAS"
        },
        {
          id: "sunarp-taxi-autorizado",
          title: "Registro de Taxis Autorizados (ATU)",
          shortTitle: "Taxi Autorizado",
          description: "Verifica si el vehículo cuenta con credencial formal y habilitación vehicular para servicio de taxi en Lima y Callao.",
          url: "https://sistemas.atu.gob.pe/ConsultaVehiculo",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
          iconType: "vehicle",
          visualTag: "TAXI AUTORIZADO"
        }
      ]
    },
    {
      id: "sunarp-estado-tecnico",
      title: "Estado Técnico (GNV INFOGAS, Revisión Técnica)",
      subtitle: "Inspecciones técnicas periódicas, conversiones a gas natural y certificaciones técnicas",
      icon: "tool",
      items: [
        {
          id: "sunarp-revision-tecnica",
          title: "Inspección Técnica Vehicular (CITV Oficial MTC)",
          shortTitle: "Revisión Técnica CITV",
          description: "Consulta la vigencia de la revisión técnica vehicular obligatoria y el centro de inspección técnica autorizado.",
          url: "https://recitv.mtc.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de placa vehicular"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "tool",
          visualTag: "REVISIÓN TÉCNICA CITV"
        },
        {
          id: "sunarp-gnv-infogas",
          title: "GNV / INFOGAS (Conversión y Chip)",
          shortTitle: "GNV INFOGAS",
          description: "Verifica el estado de habilitación del chip de gas natural vehicular, última certificación anual y prueba quinquenal.",
          url: "https://www.infogas.com.pe/consulta-de-vehiculos/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa"],
          bannerGradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
          iconType: "tool",
          visualTag: "GNV INFOGAS"
        }
      ]
    },
    {
      id: "sunarp-valor-precio",
      title: "Valor y Precio (Último Precio, APESEG, Mercado)",
      subtitle: "Valores referenciales, historial de siniestros y tasaciones oficiales",
      icon: "dollar-sign",
      items: [
        {
          id: "sunarp-valores-referenciales-mef",
          title: "Tabla de Valores Referenciales (MEF / SAT)",
          shortTitle: "Valor Referencial MEF",
          description: "Consulta la base imponible y tabla de depreciación oficial para el cálculo de impuestos y transferencias notariales.",
          url: "https://www.sat.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Año de fabricación", "Marca y modelo"],
          bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
          iconType: "receipt",
          visualTag: "VALOR REFERENCIAL MEF"
        },
        {
          id: "sunarp-historial-apeseg",
          title: "Historial de Siniestros y Choques (APESEG)",
          shortTitle: "Historial de Siniestros",
          description: "Consulta el registro de siniestralidad y reportes de accidentes de tránsito ante compañías de seguros.",
          url: "https://www.apeseg.org.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa vehicular"],
          bannerGradient: "linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)",
          iconType: "shield-alert",
          visualTag: "HISTORIAL APESEG"
        }
      ]
    },
    {
      id: "sunarp-tramites-extras",
      title: "Trámites y Extras (Cámbiate TIVE, Descargar TIVE, Foto PIT, Subastas)",
      subtitle: "Descarga de tarjeta electrónica TIVE, fotos de identificación y remates registrales",
      icon: "archive",
      items: [
        {
          id: "sunarp-cambiate-tive",
          title: "Cámbiate a la TIVE (Tarjeta Electrónica)",
          shortTitle: "Cámbiate a TIVE",
          description: "Migra tu antigua tarjeta física de plástico a la nueva Tarjeta de Identificación Vehicular Electrónica con código QR.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "S/ 42.00",
          timeEstimate: "3 días hábiles",
          requirements: ["DNI del propietario", "Tarjeta física anterior o denuncia"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
          iconType: "id-card",
          visualTag: "MIGRACIÓN TIVE"
        },
        {
          id: "sunarp-descargar-tive",
          title: "Descargar TIVE Oficial",
          shortTitle: "Descargar TIVE",
          description: "Descarga o reimprime tu TIVE digital vigente con validación de código de verificación oficial.",
          url: "https://serviciosweb.sunarp.gob.pe/sprl/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Descarga inmediata",
          requirements: ["Código de verificación TIVE", "Número de placa"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
          iconType: "document",
          visualTag: "DESCARGA TIVE"
        },
        {
          id: "sunarp-foto-pit",
          title: "Foto PIT e Identificación Vehicular",
          shortTitle: "Foto PIT DIROVE",
          description: "Solicita la imagen de peritaje de identificación vehicular (PIT) emitido por la DIROVE / PNP.",
          url: "https://www.policia.gob.pe/",
          cost: "S/ 152.50",
          timeEstimate: "2 a 4 días hábiles",
          requirements: ["Inspección física del vehículo", "Pago de tasa en Págalo.pe"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "vehicle",
          visualTag: "FOTO PIT DIROVE"
        },
        {
          id: "sunarp-subastas-remates",
          title: "Subastas Públicas y Remates SUNARP",
          shortTitle: "Subastas y Remates",
          description: "Conoce el calendario de remates y subastas públicas de inmuebles y vehículos a nivel nacional.",
          url: "https://www.sunarp.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Acceso 24/7",
          requirements: ["Bases de postor", "DNI vigente"],
          bannerGradient: "linear-gradient(135deg, #6B21A8 0%, #9333EA 100%)",
          iconType: "legal",
          visualTag: "SUBASTAS Y REMATES"
        }
      ]
    }
  ],

  RENIEC: [
    {
      id: "reniec-identidad",
      title: "Identidad y Documento Nacional",
      subtitle: "Emisión, renovación y duplicado de DNI azul y DNI electrónico",
      icon: "id-card",
      items: [
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
          visualTag: "IDENTIDAD CIVIL"
        },
        {
          id: "reniec-duplicado-web",
          title: "Duplicado de DNI vía Web",
          shortTitle: "Duplicado de DNI",
          description: "Solicita un duplicado exacto de tu DNI vigente por pérdida, robo o deterioro físico sin colas presenciales.",
          url: "https://apps.reniec.gob.pe/duplicado/",
          cost: "S/ 21.00 (Azul) / S/ 33.00 (DNIe)",
          timeEstimate: "3 a 5 días hábiles",
          requirements: ["DNI mayor de 17 años", "Pago de tasa en Págalo.pe (Cód. 00522 / 00523)"],
          bannerGradient: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
          iconType: "id-card",
          visualTag: "ROBO O PÉRDIDA"
        },
        {
          id: "reniec-rectificacion-domicilio",
          title: "Rectificación de Domicilio y Datos",
          shortTitle: "Cambio de Domicilio",
          description: "Actualiza tu dirección de residencia o rectifica tu grado de instrucción y estado civil en el padrón electoral.",
          url: "https://apps.reniec.gob.pe/domicilio/",
          cost: "S/ 22.00 (Azul) / S/ 34.00 (DNIe)",
          timeEstimate: "3 a 5 días hábiles",
          requirements: ["Recibo de servicio de luz o agua (PDF/JPG)", "DNI vigente"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "id-card",
          visualTag: "ACTUALIZACIÓN DE DATOS"
        },
        {
          id: "reniec-dnie-menores",
          title: "DNI Electrónico para Menores de Edad",
          shortTitle: "DNI Menores",
          description: "Obtén por primera vez o renueva el DNI electrónico para niños y adolescentes con presencia del padre o tutor.",
          url: "https://www.reniec.gob.pe/",
          cost: "S/ 16.00 (Amarillo) / S/ 41.00 (DNIe)",
          timeEstimate: "5 a 10 días hábiles",
          requirements: ["Acta de nacimiento", "Presencia de madre/padre con DNI"],
          bannerGradient: "linear-gradient(135deg, #6B21A8 0%, #9333EA 100%)",
          iconType: "id-card",
          visualTag: "PRIMER DNI"
        }
      ]
    },
    {
      id: "reniec-estado-civil",
      title: "Estado Civil y Actas",
      subtitle: "Copias certificadas y búsqueda de partidas de nacimiento, matrimonio y defunción",
      icon: "document",
      items: [
        {
          id: "reniec-actas-certificadas",
          title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
          shortTitle: "Actas y Partidas",
          description: "Descarga al instante actas oficiales registradas en RENIEC con código QR de verificación digital.",
          url: "https://apps.reniec.gob.pe/actasConsulta/",
          cost: "S/ 12.00",
          timeEstimate: "Descarga inmediata en PDF",
          requirements: ["Datos completos del titular", "Fecha aproximada del hecho"],
          bannerGradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
          iconType: "document",
          visualTag: "ESTADO CIVIL"
        },
        {
          id: "reniec-estado-tramite",
          title: "Consulta de Estado de Trámite de DNI",
          shortTitle: "Estado de Trámite DNI",
          description: "Revisa en tiempo real el porcentaje de avance de tu trámite de DNI y verifica si ya está listo para recojo en agencia.",
          url: "https://serviciosweb.reniec.gob.pe/cet/consulta.do",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de DNI o ficha registral"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
          iconType: "search",
          visualTag: "SEGUIMIENTO DNI"
        }
      ]
    },
    {
      id: "reniec-constancias",
      title: "Constancias y Certificaciones",
      subtitle: "Validaciones de identidad oficiales para bancos, notarías y procesos legales",
      icon: "shield",
      items: [
        {
          id: "reniec-certificado-c4",
          title: "Certificado de Inscripción C4",
          shortTitle: "Certificado C4",
          description: "Constancia informativa oficial que valida tus datos de identidad para trámites bancarios, notariales o judiciales.",
          url: "https://apps.reniec.gob.pe/certc4/",
          cost: "S/ 4.50",
          timeEstimate: "Descarga inmediata",
          requirements: ["Número de DNI", "Pago de tasa en Págalo.pe (Cód. 02143)"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "id-card",
          visualTag: "CONSTANCIA DE IDENTIDAD"
        },
        {
          id: "reniec-biofacial-app",
          title: "Validación Biométrica DNI BioFacial",
          shortTitle: "DNI BioFacial",
          description: "App móvil oficial de RENIEC para captura de fotografía con reconocimiento facial para renovación de DNI.",
          url: "https://www.gob.pe/12371-app-dni-biofacial",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato en App",
          requirements: ["Celular Android/iOS con cámara", "Buena iluminación"],
          bannerGradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
          iconType: "shield-alert",
          visualTag: "APP BIOMÉTRICA"
        }
      ]
    }
  ],

  SUNAT: [
    {
      id: "sunat-ruc-registro",
      title: "RUC y Registro Tributario",
      subtitle: "Inscripción, reactivación y actualización de datos de contribuyentes",
      icon: "receipt",
      items: [
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
          visualTag: "TRIBUTARIO & RUC"
        },
        {
          id: "sunat-consulta-ruc",
          title: "Consulta RUC Oficial (Personas y Empresas)",
          shortTitle: "Consulta RUC",
          description: "Verifica la condición de habido, estado activo, domicilio fiscal y actividades económicas de cualquier empresa o profesional.",
          url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de RUC, DNI o Razón Social"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          iconType: "search",
          visualTag: "CONSULTA PÚBLICA"
        },
        {
          id: "sunat-ficha-ruc",
          title: "Descarga de Ficha RUC Digital",
          shortTitle: "Ficha RUC",
          description: "Descarga tu constancia de RUC actualizada en formato PDF con código de verificación electrónica para trámites bancarios.",
          url: "https://www.sunat.gob.pe/sol.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Descarga inmediata",
          requirements: ["Clave SOL activa", "Número de RUC"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "document",
          visualTag: "CONSTANCIA RUC"
        }
      ]
    },
    {
      id: "sunat-clave-sol-comprobantes",
      title: "Clave SOL y Facturación Electrónica",
      subtitle: "Acceso seguro a operaciones en línea y emisión de comprobantes de pago",
      icon: "key",
      items: [
        {
          id: "sunat-clave-sol",
          title: "Generación y Recuperación de Clave SOL",
          shortTitle: "Clave SOL Online",
          description: "Crea o restablece tu clave secreta de acceso a SUNAT Operaciones en Línea mediante verificación biométrica con DNI.",
          url: "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "5 minutos",
          requirements: ["DNI y fecha de emisión", "Correo electrónico"],
          bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
          iconType: "shield-alert",
          visualTag: "ACCESO DIGITAL"
        },
        {
          id: "sunat-recibos-honorarios",
          title: "Emisión de Recibos por Honorarios Electrónicos",
          shortTitle: "Recibos por Honorarios",
          description: "Emite y anula recibos por honorarios electrónicos de 4ta categoría con retención automática del 8% de impuesto.",
          url: "https://www.sunat.gob.pe/sol.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["RUC y Clave SOL", "Datos del cliente"],
          bannerGradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
          iconType: "receipt",
          visualTag: "EMISIÓN ELECTRÓNICA"
        },
        {
          id: "sunat-factura-boleta",
          title: "Factura y Boleta de Venta Electrónica (SEE-SOL)",
          shortTitle: "Factura y Boleta",
          description: "Emite facturas y boletas de venta electrónicas desde el portal web oficial de SUNAT para microempresas.",
          url: "https://www.sunat.gob.pe/sol.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Clave SOL activa", "Régimen tributario habilitado"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "receipt",
          visualTag: "COMPROBANTES"
        }
      ]
    },
    {
      id: "sunat-deudas-devoluciones",
      title: "Deudas, Declaraciones y Devoluciones",
      subtitle: "Consulta de deuda tributaria, saldos a favor y devoluciones de oficio",
      icon: "dollar-sign",
      items: [
        {
          id: "sunat-deuda-tributaria",
          title: "Consulta de Deuda Tributaria y Coactiva",
          shortTitle: "Consulta de Deudas",
          description: "Revisa valores pendientes, órdenes de pago, resoluciones de determinación y expedientes coactivos.",
          url: "https://www.sunat.gob.pe/sol.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Clave SOL y RUC"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)",
          iconType: "receipt",
          visualTag: "DEUDA COACTIVA"
        },
        {
          id: "sunat-devolucion-renta",
          title: "Solicitud y Consulta de Devolución de Renta",
          shortTitle: "Devolución de Renta",
          description: "Consulta el estado de tu devolución de oficio o de parte por gastos deducibles de 4ta y 5ta categoría (CCI bancario).",
          url: "https://www.sunat.gob.pe/sol.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "30 a 45 días hábiles",
          requirements: ["Código de Cuenta Interbancario (CCI) registrado", "Clave SOL"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
          iconType: "dollar-sign",
          visualTag: "SALDOS A FAVOR"
        }
      ]
    }
  ],

  MIGRACIONES: [
    {
      id: "migraciones-pasaporte",
      title: "Pasaporte Electrónico",
      subtitle: "Citas, renovación y expedición de pasaporte biométrico ordinario y de urgencia",
      icon: "id-card",
      items: [
        {
          id: "migraciones-citas-pasaporte",
          title: "Citas para Pasaporte Electrónico Ordinario",
          shortTitle: "Cita Pasaporte",
          description: "Reserva tu turno de atención en la sede de Migraciones más cercana para tramitar o renovar tu pasaporte biométrico con 10 años de vigencia.",
          url: "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/",
          isFeatured: true,
          featuredBadge: "⭐ Citas Diarias Disponibles",
          cost: "S/ 120.90",
          timeEstimate: "Entrega el mismo día de la cita",
          requirements: ["Pago previo en Págalo.pe (Cód. 01810)", "DNI vigente sin multas electorales"],
          bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
          iconType: "id-card",
          visualTag: "PASAPORTE BIOMÉTRICO"
        },
        {
          id: "migraciones-pasaporte-urgencia",
          title: "Pasaporte de Urgencia (Vuelos en 48 Horas)",
          shortTitle: "Pasaporte de Urgencia",
          description: "Atención preferencial sin cita previa si tienes un vuelo internacional programado en las próximas 48 horas.",
          url: "https://www.gob.pe/524-obtener-pasaporte-electronico-de-urgencia",
          cost: "S/ 120.90",
          timeEstimate: "2 a 4 horas (en sede o aeropuerto)",
          requirements: ["Boleto aéreo o tarjeta de embarque", "DNI y pago de tasa Cód. 01810"],
          bannerGradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
          iconType: "shield-alert",
          visualTag: "VIAJES DE URGENCIA"
        }
      ]
    },
    {
      id: "migraciones-movimiento-extranjeria",
      title: "Movimiento Migratorio y Extranjería",
      subtitle: "Certificado de entradas y salidas del país, prórrogas y carné de extranjería",
      icon: "document",
      items: [
        {
          id: "migraciones-certificado-movimiento",
          title: "Certificado de Movimiento Migratorio",
          shortTitle: "Movimiento Migratorio",
          description: "Obtén la constancia oficial de todas tus entradas y salidas del territorio peruano con código QR para visas.",
          url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
          cost: "S/ 20.30",
          timeEstimate: "Descarga inmediata en PDF",
          requirements: ["Pago de tasa en Págalo.pe (Cód. 00675)", "DNI vigente"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "document",
          visualTag: "HISTORIAL DE VIAJES"
        },
        {
          id: "migraciones-agencia-virtual",
          title: "Agencia Digital Migraciones",
          shortTitle: "Agencia Digital",
          description: "Plataforma para prórrogas de residencia, cambio de calidad migratoria, permiso de trabajo y trámites de extranjería.",
          url: "https://agenciavirtual.migraciones.gob.pe/",
          cost: "Gratuito (Acceso al portal)",
          timeEstimate: "Online 24/7",
          requirements: ["DNI, Carné de Extranjería o CPP"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "globe",
          visualTag: "SEDE ELECTRÓNICA"
        }
      ]
    }
  ],

  BN: [
    {
      id: "bn-pagalo-tasas",
      title: "Págalo.pe y Tasas del Estado",
      subtitle: "Pago digital de tributos y tasas de más de 30 entidades públicas sin hacer colas",
      icon: "receipt",
      items: [
        {
          id: "bn-pagalo-pe",
          title: "Págalo.pe (Pago Digital de Tasas)",
          shortTitle: "Págalo.pe",
          description: "Paga al instante con tarjeta de crédito/débito tasas de RENIEC, Poder Judicial, PNP, Migraciones, MTC, Minjus y más.",
          url: "https://www.pagalo.pe/",
          isFeatured: true,
          featuredBadge: "⭐ Plataforma Oficial de Pagos",
          cost: "Gratuito (Sin comisiones)",
          timeEstimate: "Comprobante en 1 minuto",
          requirements: ["Tarjeta Visa, Mastercard o Yape", "Registro con correo"],
          bannerGradient: "linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)",
          iconType: "receipt",
          visualTag: "PAGO DE TASAS"
        },
        {
          id: "bn-agencias-cajeros",
          title: "Ubicación de Agencias, Agentes y Cajeros MultiRed",
          shortTitle: "Red de Agencias",
          description: "Encuentra la agencia bancaria, agente corresponsal o cajero MultiRed más cercano con horarios de atención.",
          url: "https://www.bn.com.pe/canales-atencion/agencia-lima-metropolitana.asp",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Ubicación o distrito"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #475569 100%)",
          iconType: "search",
          visualTag: "RED MULTIRED"
        }
      ]
    },
    {
      id: "bn-cuentas-subsidios",
      title: "Cuentas Digitales y Subsidios",
      subtitle: "Cuenta DNI, consulta de bonos y giros nacionales",
      icon: "dollar-sign",
      items: [
        {
          id: "bn-cuenta-dni",
          title: "Cuenta DNI (Activación y Saldo)",
          shortTitle: "Cuenta DNI",
          description: "Consulta o activa tu cuenta bancaria digital 100% gratuita vinculada a tu DNI para recepción de bonos y transferencias.",
          url: "https://www.cuentadni.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["DNI vigente", "Celular propio"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #EF4444 100%)",
          iconType: "dollar-sign",
          visualTag: "BANCA DIGITAL"
        },
        {
          id: "bn-app-movil",
          title: "App Banco de la Nación Móvil",
          shortTitle: "App BN Móvil",
          description: "Realiza transferencias interbancarias inmediatas, pago de servicios básicos y recargas sin costo adicional.",
          url: "https://www.bn.com.pe/canales-atencion/banca-celular.asp",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Disponible 24/7",
          requirements: ["Tarjeta Débito MultiRed activa"],
          bannerGradient: "linear-gradient(135deg, #374151 0%, #1F2937 100%)",
          iconType: "shield-alert",
          visualTag: "BANCA MÓVIL"
        }
      ]
    }
  ],

  MTC: [
    {
      id: "mtc-licencias-record",
      title: "Licencias de Conducir y Récord de Manejo",
      subtitle: "Trámite de brevete, récord de conductor y sistema de puntos acumulados",
      icon: "vehicle",
      items: [
        {
          id: "mtc-record-conductor",
          title: "Récord del Conductor y Sistema de Puntos",
          shortTitle: "Récord del Conductor",
          description: "Verifica el historial completo de papeletas, infracciones firmes, puntos y estado de vigencia de tu brevete.",
          url: "https://recordconductor.mtc.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ 100% Gratuito / Inmediato",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de DNI o Licencia de Conducir"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
          iconType: "document",
          visualTag: "PUNTOS Y PAPELETAS"
        },
        {
          id: "mtc-licencia-electronica",
          title: "Emisión y Duplicado de Licencia Electrónica",
          shortTitle: "Brevete Electrónico",
          description: "Obtén tu brevete digital oficial con código QR en tu celular para conducir en todo el territorio nacional.",
          url: "https://licencias.mtc.gob.pe/",
          cost: "S/ 6.70",
          timeEstimate: "Entrega en 24 a 48 horas",
          requirements: ["Examen médico aprobado", "Casilla electrónica MTC"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          iconType: "id-card",
          visualTag: "BREVETE DIGITAL"
        }
      ]
    },
    {
      id: "mtc-inspecciones-transporte",
      title: "Inspecciones Técnicas y Transporte",
      subtitle: "Centros de revisión técnica, terminales terrestres y transportes autorizados",
      icon: "tool",
      items: [
        {
          id: "mtc-revision-tecnica",
          title: "Consulta de Revisiones Técnicas (CITV)",
          shortTitle: "Revisión Técnica",
          description: "Consulta el certificado de inspección técnica vehicular y la fecha exacta de vencimiento.",
          url: "https://recitv.mtc.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de placa vehicular"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "tool",
          visualTag: "CITV OFICIAL"
        },
        {
          id: "mtc-transporte-carga-pasajeros",
          title: "Consulta de Transporte de Pasajeros y Carga",
          shortTitle: "Transporte Interprovincial",
          description: "Verifica si una empresa de buses o camiones de carga pesada cuenta con autorización de ruta nacional.",
          url: "https://www.mtc.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["RUC de la empresa o placa del bus"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "vehicle",
          visualTag: "RUTAS NACIONALES"
        }
      ]
    }
  ],

  ESSALUD: [
    {
      id: "essalud-aseguramiento-citas",
      title: "Aseguramiento, Vigencia y Citas Médicas",
      subtitle: "Acreditación de cobertura médica, centro asistencial asignado y citas web",
      icon: "shield",
      items: [
        {
          id: "essalud-acreditacion",
          title: "Acreditación y Vigencia de Seguro de Salud",
          shortTitle: "Vigencia EsSalud",
          description: "Comprueba si tu seguro social está activo, el centro asistencial donde te corresponde atenderte y periodo de carencia.",
          url: "https://dondetetiendes.essalud.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ Verificación Inmediata",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de DNI del asegurado"],
          bannerGradient: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
          iconType: "shield-alert",
          visualTag: "COBERTURA MÉDICA"
        },
        {
          id: "essalud-citas-linea",
          title: "Solicitud de Citas Médicas en Línea",
          shortTitle: "Citas EsSalud",
          description: "Genera citas virtuales o presenciales para medicina general y especialidades en tu policlínico u hospital de referencia.",
          url: "https://apps.essalud.gob.pe/citas/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Sujeto a disponibilidad médica",
          requirements: ["DNI del asegurado", "Seguro activo"],
          bannerGradient: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
          iconType: "document",
          visualTag: "CITAS EN LÍNEA"
        },
        {
          id: "essalud-subsidio-maternidad",
          title: "Subsidios por Maternidad y Lactancia",
          shortTitle: "Subsidio de Lactancia",
          description: "Tramita el subsidio económico por lactancia (S/ 820.00) y maternidad para aseguradas titulares.",
          url: "https://viva.essalud.gob.pe/viva/login",
          cost: "Gratuito (Cobro de subsidio)",
          timeEstimate: "7 a 15 días hábiles",
          requirements: ["Hijo nacido vivo", "Madre con vínculo laboral activo"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
          iconType: "dollar-sign",
          visualTag: "PRESTACIONES ECONÓMICAS"
        }
      ]
    }
  ],

  SIS: [
    {
      id: "sis-afiliacion-cobertura",
      title: "Afiliación y Cobertura Gratuita",
      subtitle: "Consulta de estado de afiliación y cobertura integral de salud",
      icon: "shield",
      items: [
        {
          id: "sis-consulta-afiliacion",
          title: "Consulta de Afiliación Gratuita al SIS",
          shortTitle: "Consulta Afiliación SIS",
          description: "Verifica si estás activo en el Seguro Integral de Salud (SIS Gratuito, SIS Para Todos o SIS Independiente).",
          url: "https://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
          isFeatured: true,
          featuredBadge: "⭐ Cobertura Universal",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["DNI o nombres completos"],
          bannerGradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
          iconType: "shield-alert",
          visualTag: "SIS GRATUITO"
        },
        {
          id: "sis-afiliacion-virtual",
          title: "Afiliación Virtual al SIS Para Todos",
          shortTitle: "Afiliarse al SIS",
          description: "Solicita tu afiliación al SIS desde tu celular si no cuentas con ningún otro seguro de salud privado o EsSalud.",
          url: "https://afiliacion.sis.gob.pe/afiliacion/afiliacionVirtual.do",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "24 a 48 horas",
          requirements: ["DNI vigente", "No tener otro seguro activo"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
          iconType: "id-card",
          visualTag: "REGISTRO EN LÍNEA"
        }
      ]
    }
  ],

  "PODER JUDICIAL": [
    {
      id: "pj-certificados-antecedentes",
      title: "Antecedentes y Certificados Judiciales",
      subtitle: "Certificado electrónico de antecedentes penales y seguimiento de expedientes",
      icon: "legal",
      items: [
        {
          id: "pj-antecedentes-penales",
          title: "Certificado Electrónico de Antecedentes Penales",
          shortTitle: "Antecedentes Penales",
          description: "Descarga al instante tu certificado oficial de antecedentes penales en formato PDF con firma digital y código de verificación.",
          url: "https://cape.pj.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ Entrega Inmediata",
          cost: "S/ 52.80",
          timeEstimate: "Inmediato en PDF",
          requirements: ["DNI vigente", "Pago previo en Págalo.pe (Cód. 00121)"],
          bannerGradient: "linear-gradient(135deg, #4B5563 0%, #1F2937 100%)",
          iconType: "legal",
          visualTag: "ANTECEDENTES PENALES"
        },
        {
          id: "pj-consulta-expedientes",
          title: "Consulta de Expedientes Judiciales (CEJ)",
          shortTitle: "Expedientes CEJ",
          description: "Revisa resoluciones, decretos y resoluciones de procesos civiles, laborales o de familia en cortes de todo el país.",
          url: "https://cej.pj.gob.pe/cej/paginas/busquedaExpediente.html",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de expediente o código de corte"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "search",
          visualTag: "SEGUIMIENTO JUDICIAL"
        },
        {
          id: "pj-redam-alimentos",
          title: "Registro de Deudores Alimentarios Morosos (REDAM)",
          shortTitle: "Consulta REDAM",
          description: "Verifica si una persona se encuentra inscrita en el registro de deudores morosos de pensiones de alimentos.",
          url: "https://redam.pj.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["Número de DNI"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)",
          iconType: "shield-alert",
          visualTag: "PENSIÓN ALIMENTOS"
        }
      ]
    }
  ],

  PNP: [
    {
      id: "pnp-certificados-denuncias",
      title: "Antecedentes Policiales y Denuncias",
      subtitle: "Certificado digital de antecedentes policiales y denuncias por pérdida de documentos",
      icon: "shield",
      items: [
        {
          id: "pnp-antecedentes-policiales",
          title: "Certificado de Antecedentes Policiales Digital (CERAP)",
          shortTitle: "Antecedentes Policiales",
          description: "Emisión de certificado oficial de antecedentes policiales para trámites laborales, estudios o viajes al exterior.",
          url: "https://www.gob.pe/336-certificado-de-antecedentes-policiales-digital-cerap-digital",
          isFeatured: true,
          featuredBadge: "⭐ Trámite 100% Digital",
          cost: "S/ 8.50 (Uso Nacional) / S/ 133.30 (Exterior)",
          timeEstimate: "Descarga inmediata en PDF",
          requirements: ["Pago en Págalo.pe (Cód. 08155)", "DNI vigente"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
          iconType: "shield-alert",
          visualTag: "ANTECEDENTES PNP"
        },
        {
          id: "pnp-denuncia-digital",
          title: "Denuncia Policial Digital por Pérdida de Documentos",
          shortTitle: "Denuncia Digital",
          description: "Genera gratis tu constancia oficial por pérdida de DNI, pasaporte, tarjetas bancarias, placas o documentos de propiedad.",
          url: "https://sistemas.policia.gob.pe/denunciadigital/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato con valor legal",
          requirements: ["DNI vigente", "Datos exactos de lo extraviado"],
          bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
          iconType: "document",
          visualTag: "PÉRDIDA DOCUMENTOS"
        }
      ]
    }
  ],

  SUNEDU: [
    {
      id: "sunedu-grados-titulos",
      title: "Grados, Títulos y Registro Nacional",
      subtitle: "Verificación de títulos universitarios, constancias de inscripción y carné universitario",
      icon: "document",
      items: [
        {
          id: "sunedu-consulta-titulos",
          title: "Constancia de Inscripción de Grados y Títulos",
          shortTitle: "Verificación de Títulos",
          description: "Consulta y descarga la constancia oficial que acredita tu grado de bachiller, título profesional, maestría o doctorado.",
          url: "https://enlinea.sunedu.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ 100% Gratuito / Inmediato",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de DNI o nombres completos"],
          bannerGradient: "linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)",
          iconType: "document",
          visualTag: "GRADOS & TÍTULOS"
        },
        {
          id: "sunedu-reconocimiento-extranjero",
          title: "Reconocimiento de Grados del Extranjero",
          shortTitle: "Grados del Extranjero",
          description: "Solicita el reconocimiento oficial de diplomas universitarios emitidos por casas de estudio del exterior.",
          url: "https://enlinea.sunedu.gob.pe/",
          cost: "S/ 325.10 (Tasa SUNEDU)",
          timeEstimate: "30 días hábiles",
          requirements: ["Diploma apostillado", "Traducción oficial"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "globe",
          visualTag: "TÍTULOS EXTERIOR"
        }
      ]
    }
  ],

  INDECOPI: [
    {
      id: "indecopi-marcas-consumidor",
      title: "Marcas, Propiedad Intelectual y Reclamos",
      subtitle: "Búsqueda y registro de marcas comerciales, derechos de autor y libro de reclamaciones",
      icon: "shield",
      items: [
        {
          id: "indecopi-busca-marca",
          title: "Búsqueda y Registro de Marcas Comerciales (Busca Tu Marca)",
          shortTitle: "Registro de Marcas",
          description: "Verifica si el nombre de tu empresa, producto o logotipo ya está registrado y solicita tu marca protegida por 10 años.",
          url: "https://servicios.indecopi.gob.pe/buscatumarca/",
          isFeatured: true,
          featuredBadge: "⭐ Protege tu Negocio",
          cost: "Búsqueda Gratis / Registro S/ 534.99",
          timeEstimate: "Búsqueda Inmediata",
          requirements: ["Nombre o logotipo de la marca"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
          iconType: "search",
          visualTag: "MARCAS Y PATENTES"
        },
        {
          id: "indecopi-reclama-virtual",
          title: "Reclama Virtual (Defensa del Consumidor)",
          shortTitle: "Reclama Virtual",
          description: "Presenta denuncias o solicitudes de mediación gratuita contra empresas por cobros indebidos, estafas o mal servicio.",
          url: "https://enlinea.indecopi.gob.pe/reclamavirtual/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Audiencia en 15 días",
          requirements: ["Comprobante de compra o contrato", "DNI"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          iconType: "shield-alert",
          visualTag: "DEFENSA CONSUMIDOR"
        }
      ]
    }
  ],

  OSIPTEL: [
    {
      id: "osiptel-telecomunicaciones",
      title: "Telecomunicaciones y Líneas Móviles",
      subtitle: "Verificación de líneas telefónicas a tu nombre, bloqueo de IMEI y reclamos de internet",
      icon: "phone",
      items: [
        {
          id: "osiptel-checa-tu-linea",
          title: "Consulta 'Checa tu Línea' (Líneas Móviles a tu Nombre)",
          shortTitle: "Checa tu Línea",
          description: "Verifica cuántas líneas de celular prepago o postpago figuran registradas bajo tu número de DNI en todas las operadoras.",
          url: "https://checatuslineas.osiptel.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ Anti-suplantación de Identidad",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["Número de DNI"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
          iconType: "shield-alert",
          visualTag: "LÍNEAS MÓVILES"
        },
        {
          id: "osiptel-consulta-imei",
          title: "Consulta de IMEI Bloqueado (Celulares Robados)",
          shortTitle: "Checa tu IMEI",
          description: "Verifica si un equipo celular comprado de segunda mano está reportado como robado, perdido o clonado.",
          url: "https://www.osiptel.gob.pe/bloqueo-imei/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato",
          requirements: ["15 dígitos del código IMEI (*#06#)"],
          bannerGradient: "linear-gradient(135deg, #B91C1C 0%, #EF4444 100%)",
          iconType: "search",
          visualTag: "IMEI / CELULARES"
        }
      ]
    }
  ],

  MTPE: [
    {
      id: "mtpe-empleo-certificados",
      title: "Empleo y Certificado Único Laboral",
      subtitle: "Certijoven, Certiadulto y bolsa de trabajo oficial 'Empleos Perú'",
      icon: "briefcase",
      items: [
        {
          id: "mtpe-cul-certijoven",
          title: "Certificado Único Laboral (Certijoven / Certiadulto)",
          shortTitle: "Certificado Único Laboral",
          description: "Documento oficial gratuito que unifica antecedentes policiales, penales, judiciales, experiencia laboral formal y estudios.",
          url: "https://www.empleosperu.gob.pe/portal-mtpe/",
          isFeatured: true,
          featuredBadge: "⭐ Todo en 1 / 100% Gratuito",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Descarga inmediata en PDF",
          requirements: ["DNI vigente", "Cuenta en Empleos Perú"],
          bannerGradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)",
          iconType: "document",
          visualTag: "HISTORIAL LABORAL"
        },
        {
          id: "mtpe-bolsa-empleo",
          title: "Bolsa de Trabajo Oficial 'Empleos Perú'",
          shortTitle: "Empleos Perú",
          description: "Postula a vacantes de trabajo formales en empresas privadas e instituciones públicas a nivel nacional.",
          url: "https://www.empleosperu.gob.pe/",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Acceso 24/7",
          requirements: ["Registro de CV y DNI"],
          bannerGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
          iconType: "briefcase",
          visualTag: "BOLSA DE TRABAJO"
        }
      ]
    }
  ],

  ONP: [
    {
      id: "onp-pensiones-aportes",
      title: "Pensiones y Aportes Previsionales",
      subtitle: "Consulta de aportes al D.L. 19990, estado de pensiones y pagos mensuales",
      icon: "dollar-sign",
      items: [
        {
          id: "onp-estado-cuenta-aportes",
          title: "Consulta de Estado de Cuenta de Aportes ONP",
          shortTitle: "Aportes ONP",
          description: "Revisa todos los años y meses de aportes registrados en el Sistema Nacional de Pensiones (D.L. 19990).",
          url: "https://tuportal.onp.gob.pe/",
          isFeatured: true,
          featuredBadge: "⭐ Tu Zona Segura ONP",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["DNI y clave virtual ONP"],
          bannerGradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          iconType: "document",
          visualTag: "PENSIONES D.L. 19990"
        },
        {
          id: "onp-clave-virtual",
          title: "Generación de Clave Virtual ONP",
          shortTitle: "Clave Virtual ONP",
          description: "Genera tu clave digital de acceso a tu estado de cuenta previsional con validación de biometría facial.",
          url: "https://tuportal.onp.gob.pe/generar-clave",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "5 minutos",
          requirements: ["DNI vigente", "Correo electrónico"],
          bannerGradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
          iconType: "shield-alert",
          visualTag: "ACCESO DIGITAL"
        }
      ]
    }
  ],

  SUNAFIL: [
    {
      id: "sunafil-denuncias-derechos",
      title: "Fiscalización y Derechos Laborales",
      subtitle: "Denuncia laboral virtual por falta de pago, despido arbitrario y 'Chequea tu Contratista'",
      icon: "legal",
      items: [
        {
          id: "sunafil-denuncia-virtual",
          title: "Denuncia Laboral Virtual por Incumplimiento",
          shortTitle: "Denuncia Laboral",
          description: "Denuncia de forma reservada o anónima la falta de pago de sueldos, CTS, gratificaciones o despidos arbitrarios.",
          url: "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales/",
          isFeatured: true,
          featuredBadge: "⭐ Reserva de Identidad Garantizada",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inspección en 10 a 30 días",
          requirements: ["RUC de la empresa empleadora", "Contrato o boletas de pago"],
          bannerGradient: "linear-gradient(135deg, #991B1B 0%, #EF4444 100%)",
          iconType: "legal",
          visualTag: "DENUNCIA LABORAL"
        },
        {
          id: "sunafil-verifica-planilla",
          title: "Verifica si estás en Planilla ('Chequea tu Contratista')",
          shortTitle: "Verificar Planilla",
          description: "Consulta en tiempo real si tu empleador te ha registrado formalmente en la planilla electrónica T-Registro de SUNAT.",
          url: "https://aplicativosweb6.sunafil.gob.pe/si.verificacionPlanilla/inicio",
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          requirements: ["DNI del trabajador", "RUC de la empresa"],
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "search",
          visualTag: "PLANILLA ELECTRÓNICA"
        }
      ]
    }
  ]
};

/**
 * Función auxiliar para obtener las categorías completas de una entidad
 */
export function getEntityCategoryGroups(acronym: string): ProcedureCategoryGroup[] {
  const norm = (acronym || "").toUpperCase().trim();
  if (OFFICIAL_CATEGORIZED_PROCEDURES[norm]) {
    return OFFICIAL_CATEGORIZED_PROCEDURES[norm];
  }
  // Búsqueda aproximada
  const key = Object.keys(OFFICIAL_CATEGORIZED_PROCEDURES).find(
    k => norm.includes(k) || k.includes(norm)
  );
  if (key) return OFFICIAL_CATEGORIZED_PROCEDURES[key];

  // Fallback por defecto si la entidad no tiene catálogo personalizado
  return [
    {
      id: `${norm.toLowerCase()}-oficiales`,
      title: "Trámites y Servicios Oficiales",
      subtitle: `Accesos directos a las plataformas y sedes digitales de ${acronym}`,
      items: [
        {
          id: `${norm.toLowerCase()}-sede-oficial`,
          title: `Sede Digital Oficial de ${acronym}`,
          shortTitle: "Sede Digital",
          description: `Ingresa directamente al portal oficial del Estado peruano para realizar trámites y consultas de ${acronym}.`,
          url: `https://www.gob.pe/`,
          cost: "Gratuito (S/ 0.00)",
          timeEstimate: "Inmediato (Online 24/7)",
          bannerGradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          iconType: "globe",
          visualTag: "PORTAL OFICIAL"
        }
      ]
    }
  ];
}

/**
 * Función compatible para aplanar todos los trámites de una entidad
 */
export function getEntityOfficialProcedures(acronym: string): DirectProcedureItem[] {
  const groups = getEntityCategoryGroups(acronym);
  const all: DirectProcedureItem[] = [];
  groups.forEach(g => {
    all.push(...g.items);
  });
  return all;
}

/**
 * Helper para renderizar iconos SVG monocromáticos estilo ChatGPT
 */
export function getTramiteChatGPTIcon(iconType: string, _title?: string) {
  switch (iconType) {
    case "vehicle":
    case "car":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      );
    case "id-card":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <circle cx="8" cy="10" r="2"/>
          <line x1="14" y1="9" x2="18" y2="9"/>
          <line x1="14" y1="13" x2="18" y2="13"/>
          <line x1="6" y1="16" x2="18" y2="16"/>
        </svg>
      );
    case "receipt":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
          <line x1="8" y1="8" x2="16" y2="8"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
          <line x1="8" y1="16" x2="13" y2="16"/>
        </svg>
      );
    case "deed":
    case "document":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      );
    case "shield-alert":
    case "shield":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      );
    case "legal":
    case "scale":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
          <path d="M7 21h10"/>
          <path d="M12 3v18"/>
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
        </svg>
      );
    case "tool":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      );
    case "dollar-sign":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
    case "briefcase":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      );
    case "search":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      );
    case "phone":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      );
    case "globe":
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
  }
}
