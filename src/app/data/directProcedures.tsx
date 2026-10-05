import React from "react";

export interface DirectProcedureItem {
  id: string;
  title: string;
  url: string;
  illustrationType: string;
  tag: string;
  cost: string;
  timeEstimate: string;
  gradient: string;
}

/**
 * Catálogo directo de trámites oficiales por Entidad (.gob.pe)
 * Diseñado con tarjetas visuales: Imagen representativa + Título + Enlace oficial 1-clic
 */
export const OFFICIAL_PROCEDURES_BY_ENTITY: Record<string, DirectProcedureItem[]> = {
  SUNARP: [
    {
      id: "sunarp-consulta-vehicular",
      title: "Consulta Vehicular Gratuita (Placas y Datos)",
      url: "https://www.sunarp.gob.pe/ConsultaVehicular/",
      illustrationType: "vehicle-plate",
      tag: "Registro Vehicular",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
    },
    {
      id: "sunarp-placas-duplicadas",
      title: "Placas Duplicadas y Tercera Placa",
      url: "https://www.placas.pe/",
      illustrationType: "vehicle-plate",
      tag: "Placas Oficiales",
      cost: "S/ 114.40",
      timeEstimate: "2 a 3 días",
      gradient: "linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)"
    },
    {
      id: "sunarp-copia-literal",
      title: "Copia Literal y Partidas Registrales (SPRL)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      illustrationType: "legal-deed",
      tag: "Inmuebles & Predios",
      cost: "Desde S/ 6.00",
      timeEstimate: "Entrega Inmediata",
      gradient: "linear-gradient(135deg, #312E81 0%, #4F46E5 100%)"
    },
    {
      id: "sunarp-alerta-registral",
      title: "Alerta Registral Gratuita (Anti-fraude)",
      url: "https://www.sunarp.gob.pe/alertaregistral/",
      illustrationType: "shield-lock",
      tag: "Protección Patrimonial",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Activación en 3 min",
      gradient: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)"
    },
    {
      id: "sunarp-siguelo-plus",
      title: "Síguelo Plus (Seguimiento de Títulos en Trámite)",
      url: "https://siguelo.sunarp.gob.pe/siguelo/",
      illustrationType: "legal-deed",
      tag: "Seguimiento en Vivo",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)"
    },
    {
      id: "sunarp-vigencia-poder",
      title: "Certificado de Vigencia de Poder",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      illustrationType: "legal-deed",
      tag: "Poderes & Empresas",
      cost: "S/ 34.00",
      timeEstimate: "3 a 24 horas",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    },
    {
      id: "sunarp-conoce-aqui",
      title: "Conoce Aquí (Lectura Gratuita de Partidas)",
      url: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
      illustrationType: "legal-deed",
      tag: "Visualización Libre",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)"
    },
    {
      id: "sunarp-descargar-tive",
      title: "Descarga de Tarjeta Vehicular Electrónica (TIVE)",
      url: "https://serviciosweb.sunarp.gob.pe/sprl/",
      illustrationType: "vehicle-plate",
      tag: "TIVE Digital",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Descarga Inmediata",
      gradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)"
    }
  ],

  RENIEC: [
    {
      id: "reniec-renovacion-dnie",
      title: "Renovación de DNI por Caducidad (DNIe / DNI Azul)",
      url: "https://www.reniec.gob.pe/portal/masServiciosLinea.htm",
      illustrationType: "dni-card",
      tag: "Identidad Civil",
      cost: "S/ 30.00 / S/ 41.00",
      timeEstimate: "3 a 7 días hábiles",
      gradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)"
    },
    {
      id: "reniec-duplicado-web",
      title: "Duplicado de DNI vía Web (Pérdida o Robo)",
      url: "https://apps.reniec.gob.pe/duplicado/",
      illustrationType: "dni-card",
      tag: "Robo o Pérdida",
      cost: "S/ 21.00 / S/ 33.00",
      timeEstimate: "3 a 5 días hábiles",
      gradient: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"
    },
    {
      id: "reniec-actas-certificadas",
      title: "Copia Certificada de Actas (Nacimiento, Matrimonio, Defunción)",
      url: "https://apps.reniec.gob.pe/actasConsulta/",
      illustrationType: "legal-deed",
      tag: "Estado Civil",
      cost: "S/ 12.00",
      timeEstimate: "Descarga Inmediata en PDF",
      gradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)"
    },
    {
      id: "reniec-certificado-c4",
      title: "Certificado de Inscripción C4",
      url: "https://apps.reniec.gob.pe/certc4/",
      illustrationType: "dni-card",
      tag: "Constancia de Identidad",
      cost: "S/ 4.50",
      timeEstimate: "Descarga Inmediata",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    },
    {
      id: "reniec-estado-tramite",
      title: "Consulta de Estado de Trámite de DNI",
      url: "https://serviciosweb.reniec.gob.pe/cet/consulta.do",
      illustrationType: "dni-card",
      tag: "Seguimiento DNI",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #047857 0%, #059669 100%)"
    },
    {
      id: "reniec-rectificacion-domicilio",
      title: "Rectificación de Domicilio y Datos Personales",
      url: "https://apps.reniec.gob.pe/domicilio/",
      illustrationType: "dni-card",
      tag: "Actualización de Datos",
      cost: "S/ 22.00 / S/ 34.00",
      timeEstimate: "3 a 5 días hábiles",
      gradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)"
    }
  ],

  SUNAT: [
    {
      id: "sunat-ruc-digital",
      title: "Inscripción y Activación al RUC Digital con DNI",
      url: "https://ww1.sunat.gob.pe/ol-ti-itinsruc/inscripcion/index.htm",
      illustrationType: "sunat-tax",
      tag: "Tributario & RUC",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "10 minutos",
      gradient: "linear-gradient(135deg, #065F46 0%, #059669 100%)"
    },
    {
      id: "sunat-clave-sol",
      title: "Generación y Recuperación de Clave SOL",
      url: "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      illustrationType: "sunat-tax",
      tag: "Acceso Digital",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "5 minutos",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
    },
    {
      id: "sunat-consulta-ruc",
      title: "Consulta RUC Oficial (Personas y Empresas)",
      url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
      illustrationType: "sunat-tax",
      tag: "Consulta Pública",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)"
    },
    {
      id: "sunat-recibos-honorarios",
      title: "Emisión de Recibos por Honorarios Electrónicos",
      url: "https://www.sunat.gob.pe/sol.html",
      illustrationType: "sunat-tax",
      tag: "Emisión Electrónica",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)"
    },
    {
      id: "sunat-deuda-tributaria",
      title: "Consulta de Deuda Tributaria y Fraccionamientos",
      url: "https://www.sunat.gob.pe/sol.html",
      illustrationType: "sunat-tax",
      tag: "Estado Tributario",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)"
    },
    {
      id: "sunat-devolucion-renta",
      title: "Solicitud de Devolución de Impuesto a la Renta",
      url: "https://www.sunat.gob.pe/sol.html",
      illustrationType: "sunat-tax",
      tag: "Saldos a Favor",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "30 a 45 días",
      gradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)"
    }
  ],

  MIGRACIONES: [
    {
      id: "migraciones-citas-pasaporte",
      title: "Citas para Pasaporte Electrónico Ordinario",
      url: "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/",
      illustrationType: "passport-peru",
      tag: "Pasaporte Biométrico",
      cost: "S/ 120.90",
      timeEstimate: "Mismo día de la cita",
      gradient: "linear-gradient(135deg, #881337 0%, #BE123C 100%)"
    },
    {
      id: "migraciones-pasaporte-urgencia",
      title: "Pasaporte de Urgencia (Vuelos en 48 Horas)",
      url: "https://www.gob.pe/524-obtener-pasaporte-electronico-de-urgencia",
      illustrationType: "passport-peru",
      tag: "Viajes de Urgencia",
      cost: "S/ 120.90",
      timeEstimate: "2 a 4 horas",
      gradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"
    },
    {
      id: "migraciones-certificado-movimiento",
      title: "Certificado de Movimiento Migratorio",
      url: "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      illustrationType: "passport-peru",
      tag: "Historial de Viajes",
      cost: "S/ 20.30",
      timeEstimate: "Descarga Inmediata",
      gradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)"
    },
    {
      id: "migraciones-agencia-virtual",
      title: "Agencia Digital Migraciones (Extranjería)",
      url: "https://agenciavirtual.migraciones.gob.pe/",
      illustrationType: "passport-peru",
      tag: "Sede Electrónica",
      cost: "Gratuito (Acceso)",
      timeEstimate: "Online 24/7",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    }
  ],

  BN: [
    {
      id: "bn-pagalo-pe",
      title: "Págalo.pe (Pago Digital de Tasas del Estado)",
      url: "https://www.pagalo.pe/",
      illustrationType: "bank-card",
      tag: "Pago de Tasas",
      cost: "Gratuito (Sin comisión)",
      timeEstimate: "Comprobante en 1 min",
      gradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)"
    },
    {
      id: "bn-cuenta-dni",
      title: "Cuenta DNI (Activación y Saldo Digital)",
      url: "https://www.cuentadni.pe/",
      illustrationType: "bank-card",
      tag: "Banca Digital",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #B91C1C 0%, #EF4444 100%)"
    },
    {
      id: "bn-agencias-cajeros",
      title: "Ubicación de Agencias y Cajeros MultiRed",
      url: "https://www.bn.com.pe/canales-atencion/agencia-lima-metropolitana.asp",
      illustrationType: "bank-card",
      tag: "Red MultiRed",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #1E293B 0%, #475569 100%)"
    },
    {
      id: "bn-app-movil",
      title: "Banca Celular y App Móvil Banco de la Nación",
      url: "https://www.bn.com.pe/canales-atencion/banca-celular.asp",
      illustrationType: "bank-card",
      tag: "Banca Móvil",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Disponible 24/7",
      gradient: "linear-gradient(135deg, #374151 0%, #1F2937 100%)"
    }
  ],

  MTC: [
    {
      id: "mtc-record-conductor",
      title: "Récord del Conductor y Sistema de Puntos MTC",
      url: "https://recordconductor.mtc.gob.pe/",
      illustrationType: "driver-license",
      tag: "Puntos & Papeletas",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #065F46 0%, #047857 100%)"
    },
    {
      id: "mtc-licencia-electronica",
      title: "Emisión de Brevete Electrónico Oficial",
      url: "https://licencias.mtc.gob.pe/",
      illustrationType: "driver-license",
      tag: "Brevete Digital",
      cost: "S/ 6.70",
      timeEstimate: "24 a 48 horas",
      gradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)"
    },
    {
      id: "mtc-revision-tecnica",
      title: "Consulta de Inspección Técnica Vehicular (CITV)",
      url: "https://recitv.mtc.gob.pe/",
      illustrationType: "vehicle-plate",
      tag: "Revisión Técnica",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)"
    },
    {
      id: "mtc-transporte-carga-pasajeros",
      title: "Consulta de Transporte de Pasajeros y Carga",
      url: "https://www.mtc.gob.pe/",
      illustrationType: "driver-license",
      tag: "Rutas Nacionales",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    }
  ],

  ESSALUD: [
    {
      id: "essalud-acreditacion",
      title: "Acreditación y Vigencia de Seguro de Salud",
      url: "https://dondetetiendes.essalud.gob.pe/",
      illustrationType: "health-shield",
      tag: "Cobertura Médica",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)"
    },
    {
      id: "essalud-citas-linea",
      title: "Solicitud de Citas Médicas en Línea",
      url: "https://apps.essalud.gob.pe/citas/",
      illustrationType: "health-shield",
      tag: "Citas en Línea",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Sujeto a cita",
      gradient: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)"
    },
    {
      id: "essalud-subsidio-maternidad",
      title: "Subsidios por Lactancia y Maternidad",
      url: "https://viva.essalud.gob.pe/viva/login",
      illustrationType: "health-shield",
      tag: "Subsidios EsSalud",
      cost: "Gratuito (Cobro S/ 820)",
      timeEstimate: "7 a 15 días",
      gradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)"
    }
  ],

  SIS: [
    {
      id: "sis-consulta-afiliacion",
      title: "Consulta de Afiliación Gratuita al SIS",
      url: "https://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      illustrationType: "health-shield",
      tag: "SIS Gratuito",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #047857 0%, #059669 100%)"
    },
    {
      id: "sis-afiliacion-virtual",
      title: "Afiliación Virtual al SIS Para Todos",
      url: "https://afiliacion.sis.gob.pe/afiliacion/afiliacionVirtual.do",
      illustrationType: "health-shield",
      tag: "Registro en Línea",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "24 a 48 horas",
      gradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)"
    }
  ],

  "PODER JUDICIAL": [
    {
      id: "pj-antecedentes-penales",
      title: "Certificado Electrónico de Antecedentes Penales",
      url: "https://cape.pj.gob.pe/",
      illustrationType: "judicial-scale",
      tag: "Antecedentes Penales",
      cost: "S/ 52.80",
      timeEstimate: "Inmediato en PDF",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    },
    {
      id: "pj-consulta-expedientes",
      title: "Consulta de Expedientes Judiciales (CEJ)",
      url: "https://cej.pj.gob.pe/cej/paginas/busquedaExpediente.html",
      illustrationType: "judicial-scale",
      tag: "Seguimiento Judicial",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #374151 0%, #1F2937 100%)"
    },
    {
      id: "pj-redam-alimentos",
      title: "Registro de Deudores Alimentarios Morosos (REDAM)",
      url: "https://redam.pj.gob.pe/",
      illustrationType: "judicial-scale",
      tag: "Pensión Alimentos",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)"
    }
  ],

  PNP: [
    {
      id: "pnp-antecedentes-policiales",
      title: "Certificado de Antecedentes Policiales Digital (CERAP)",
      url: "https://www.gob.pe/336-certificado-de-antecedentes-policiales-digital-cerap-digital",
      illustrationType: "police-star",
      tag: "Antecedentes PNP",
      cost: "S/ 8.50",
      timeEstimate: "Descarga Inmediata",
      gradient: "linear-gradient(135deg, #065F46 0%, #047857 100%)"
    },
    {
      id: "pnp-denuncia-digital",
      title: "Denuncia Policial Digital por Pérdida de Documentos",
      url: "https://sistemas.policia.gob.pe/denunciadigital/",
      illustrationType: "police-star",
      tag: "Pérdida Documentos",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato con valor legal",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)"
    }
  ],

  SUNEDU: [
    {
      id: "sunedu-consulta-titulos",
      title: "Constancia de Inscripción de Grados y Títulos",
      url: "https://enlinea.sunedu.gob.pe/",
      illustrationType: "academic-degree",
      tag: "Grados & Títulos",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)"
    },
    {
      id: "sunedu-reconocimiento-extranjero",
      title: "Reconocimiento de Títulos Universitarios del Extranjero",
      url: "https://enlinea.sunedu.gob.pe/",
      illustrationType: "academic-degree",
      tag: "Títulos Exterior",
      cost: "S/ 325.10",
      timeEstimate: "30 días hábiles",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    }
  ],

  INDECOPI: [
    {
      id: "indecopi-busca-marca",
      title: "Búsqueda y Registro de Marcas (Busca Tu Marca)",
      url: "https://servicios.indecopi.gob.pe/buscatumarca/",
      illustrationType: "trademark-shield",
      tag: "Marcas y Patentes",
      cost: "Búsqueda Gratis",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #0F766E 0%, #0D9488 100%)"
    },
    {
      id: "indecopi-reclama-virtual",
      title: "Reclama Virtual (Defensa del Consumidor)",
      url: "https://enlinea.indecopi.gob.pe/reclamavirtual/",
      illustrationType: "trademark-shield",
      tag: "Reclamos Consumidor",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "15 días hábiles",
      gradient: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)"
    }
  ],

  OSIPTEL: [
    {
      id: "osiptel-checa-tu-linea",
      title: "Consulta 'Checa tu Línea' (Líneas Móviles a tu Nombre)",
      url: "https://checatuslineas.osiptel.gob.pe/",
      illustrationType: "telecom-mobile",
      tag: "Líneas Móviles",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"
    },
    {
      id: "osiptel-consulta-imei",
      title: "Consulta de IMEI Bloqueado (Celulares Robados)",
      url: "https://www.osiptel.gob.pe/bloqueo-imei/",
      illustrationType: "telecom-mobile",
      tag: "IMEI Celulares",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #991B1B 0%, #EF4444 100%)"
    }
  ],

  MTPE: [
    {
      id: "mtpe-cul-certijoven",
      title: "Certificado Único Laboral (Certijoven / Certiadulto)",
      url: "https://www.empleosperu.gob.pe/portal-mtpe/",
      illustrationType: "job-briefcase",
      tag: "Historial Laboral",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Descarga Inmediata",
      gradient: "linear-gradient(135deg, #047857 0%, #0F766E 100%)"
    },
    {
      id: "mtpe-bolsa-empleo",
      title: "Bolsa de Trabajo Oficial 'Empleos Perú'",
      url: "https://www.empleosperu.gob.pe/",
      illustrationType: "job-briefcase",
      tag: "Bolsa de Empleo",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Acceso 24/7",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)"
    }
  ],

  ONP: [
    {
      id: "onp-estado-cuenta-aportes",
      title: "Consulta de Estado de Cuenta de Aportes ONP",
      url: "https://tuportal.onp.gob.pe/",
      illustrationType: "pension-safe",
      tag: "Pensiones D.L. 19990",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)"
    },
    {
      id: "onp-clave-virtual",
      title: "Generación de Clave Virtual ONP",
      url: "https://tuportal.onp.gob.pe/generar-clave",
      illustrationType: "pension-safe",
      tag: "Clave Virtual",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "5 minutos",
      gradient: "linear-gradient(135deg, #065F46 0%, #10B981 100%)"
    }
  ],

  SUNAFIL: [
    {
      id: "sunafil-denuncia-virtual",
      title: "Denuncia Laboral Virtual por Incumplimiento",
      url: "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales/",
      illustrationType: "labor-stamp",
      tag: "Denuncia Laboral",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inspección Laboral",
      gradient: "linear-gradient(135deg, #881337 0%, #9F1239 100%)"
    },
    {
      id: "sunafil-verifica-planilla",
      title: "Verifica si estás en Planilla (Chequea tu Contratista)",
      url: "https://aplicativosweb6.sunafil.gob.pe/si.verificacionPlanilla/inicio",
      illustrationType: "labor-stamp",
      tag: "Planilla Electrónica",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato 24/7",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    }
  ]
};

/**
 * Retorna los trámites directos de una entidad
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

  return [
    {
      id: `${norm.toLowerCase()}-sede`,
      title: `Sede Digital Oficial de ${acronym}`,
      url: "https://www.gob.pe/",
      illustrationType: "legal-deed",
      tag: "Portal Oficial",
      cost: "Gratuito (S/ 0.00)",
      timeEstimate: "Inmediato",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
    }
  ];
}

/**
 * Renderiza la ilustración SVG representativa y nítida de cada trámite
 */
export function renderProcedureIllustration(illustrationType: string) {
  switch (illustrationType) {
    case "dni-card":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="dniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#dniGrad)" />
          {/* Tarjeta DNI Mockup */}
          <g transform="translate(40, 18)">
            <rect x="0" y="0" width="200" height="104" rx="10" fill="#FFFFFF" fillOpacity="0.94" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            {/* Cabecera DNI */}
            <rect x="0" y="0" width="200" height="24" rx="10" fill="#0284C7" />
            <rect x="0" y="14" width="200" height="10" fill="#0284C7" />
            <text x="10" y="16" fill="#FFFFFF" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="800" letterSpacing="0.5">REPÚBLICA DEL PERÚ</text>
            <text x="160" y="16" fill="#FDE047" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900">DNIe</text>
            {/* Foto de Identidad */}
            <rect x="12" y="32" width="46" height="58" rx="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="35" cy="50" r="13" fill="#94A3B8" />
            <path d="M18 84 C18 70, 52 70, 52 84 Z" fill="#94A3B8" />
            {/* Chip de Seguridad Dorado */}
            <rect x="68" y="34" width="26" height="20" rx="3" fill="url(#chipGrad)" stroke="#A16207" strokeWidth="0.8" />
            <line x1="68" y1="44" x2="94" y2="44" stroke="#A16207" strokeWidth="0.8" />
            <line x1="81" y1="34" x2="81" y2="54" stroke="#A16207" strokeWidth="0.8" />
            {/* Líneas de Datos del Titular */}
            <rect x="102" y="36" width="86" height="6" rx="2" fill="#0284C7" fillOpacity="0.8" />
            <rect x="68" y="62" width="120" height="5" rx="2" fill="#64748B" fillOpacity="0.5" />
            <rect x="68" y="72" width="100" height="5" rx="2" fill="#64748B" fillOpacity="0.5" />
            <rect x="68" y="82" width="80" height="5" rx="2" fill="#64748B" fillOpacity="0.5" />
            {/* Huella Digital */}
            <circle cx="178" cy="74" r="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        </svg>
      );

    case "vehicle-plate":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#carGrad)" />
          {/* Silueta Vehículo Frontal */}
          <g transform="translate(65, 10)">
            {/* Carrocería */}
            <path d="M25 55 L40 22 Q45 16 55 16 L95 16 Q105 16 110 22 L125 55 Q135 60 135 72 L135 88 Q135 94 125 94 L25 94 Q15 94 15 88 L15 72 Q15 60 25 55 Z" fill="#0F172A" fillOpacity="0.7" stroke="#10B981" strokeWidth="1.5" />
            {/* Parabrisas */}
            <path d="M42 24 L52 20 L98 20 L108 24 L120 52 L30 52 Z" fill="#38BDF8" fillOpacity="0.6" />
            {/* Faros */}
            <circle cx="30" cy="68" r="8" fill="#FDE047" />
            <circle cx="120" cy="68" r="8" fill="#FDE047" />
            {/* Placa Peruana Oficial */}
            <g transform="translate(35, 62)">
              <rect x="0" y="0" width="80" height="38" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <rect x="0" y="0" width="80" height="8" rx="3" fill="#D97706" />
              <text x="28" y="7" fill="#FFFFFF" fontSize="6.5" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="0.5">PERU</text>
              <text x="10" y="27" fill="#0F172A" fontSize="15" fontFamily="monospace" fontWeight="900" letterSpacing="2">ABC-123</text>
            </g>
          </g>
          {/* Lupa de Consulta */}
          <circle cx="215" cy="55" r="22" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="230" y1="70" x2="248" y2="88" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M208 55 L213 60 L223 50" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "sunat-tax":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="taxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#taxGrad)" />
          {/* Documento SUNAT */}
          <g transform="translate(60, 16)">
            <rect x="0" y="0" width="160" height="108" rx="8" fill="#FFFFFF" fillOpacity="0.95" stroke="#A7F3D0" strokeWidth="1.5" />
            {/* Header SUNAT Azul */}
            <rect x="0" y="0" width="160" height="26" rx="8" fill="#1E40AF" />
            <rect x="0" y="18" width="160" height="8" fill="#1E40AF" />
            <text x="12" y="17" fill="#FFFFFF" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="900">SUNAT</text>
            <text x="60" y="17" fill="#93C5FD" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="700">RUC & CLAVE SOL</text>
            {/* Badge RUC */}
            <rect x="12" y="34" width="136" height="22" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
            <text x="20" y="49" fill="#065F46" fontSize="11" fontFamily="monospace" fontWeight="900">RUC: 10458923011</text>
            {/* Líneas de Declaración */}
            <rect x="12" y="64" width="90" height="6" rx="2" fill="#94A3B8" fillOpacity="0.6" />
            <rect x="12" y="76" width="110" height="6" rx="2" fill="#94A3B8" fillOpacity="0.6" />
            <rect x="12" y="88" width="70" height="6" rx="2" fill="#94A3B8" fillOpacity="0.6" />
            {/* Sello de Aprobado */}
            <circle cx="132" cy="82" r="16" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
            <path d="M124 82 L129 87 L140 76" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case "passport-peru":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="passGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881337" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#passGrad)" />
          {/* Libreta Pasaporte Peruano Guinda */}
          <g transform="translate(85, 14)">
            <rect x="0" y="0" width="110" height="112" rx="8" fill="#4C0519" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="8" y1="0" x2="8" y2="112" stroke="#FDA4AF" strokeWidth="1" strokeOpacity="0.4" />
            <text x="22" y="24" fill="#FDE047" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="0.8">COMUNIDAD ANDINA</text>
            <text x="24" y="36" fill="#FDE047" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="0.5">REPÚBLICA DEL PERÚ</text>
            {/* Escudo Nacional Dorado */}
            <circle cx="58" cy="62" r="16" fill="none" stroke="#FDE047" strokeWidth="1.5" />
            <path d="M50 56 L66 56 L66 68 Q58 74 50 68 Z" fill="#FDE047" fillOpacity="0.4" stroke="#FDE047" strokeWidth="1" />
            <text x="32" y="92" fill="#FDE047" fontSize="9.5" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="1.2">PASAPORTE</text>
            {/* Símbolo Biométrico */}
            <rect x="48" y="98" width="20" height="8" rx="2" fill="none" stroke="#FDE047" strokeWidth="1" />
            <circle cx="58" cy="102" r="2.5" fill="#FDE047" />
          </g>
          {/* Avión Despegando */}
          <path d="M210 30 L230 45 L220 50 L205 45 Z M220 50 L225 60 L218 60 Z" fill="#FFFFFF" fillOpacity="0.9" />
        </svg>
      );

    case "legal-deed":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="deedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#deedGrad)" />
          {/* Partida Registral Documento */}
          <g transform="translate(75, 14)">
            <rect x="0" y="0" width="130" height="112" rx="6" fill="#FFFFFF" fillOpacity="0.95" stroke="#C7D2FE" strokeWidth="1.5" />
            {/* Cabecera */}
            <rect x="15" y="12" width="100" height="8" rx="2" fill="#4338CA" />
            <rect x="25" y="24" width="80" height="5" rx="2" fill="#6366F1" />
            {/* Líneas de Texto Notarial */}
            <line x1="15" y1="38" x2="115" y2="38" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="48" x2="115" y2="48" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="58" x2="95" y2="58" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="68" x2="110" y2="68" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="78" x2="85" y2="78" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Sello de Cera Dorado / Firma Digital */}
            <circle cx="95" cy="94" r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <path d="M88 94 L93 99 L102 90" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Cinta Registral Azul */}
            <path d="M20 0 L20 22 L25 18 L30 22 L30 0 Z" fill="#2563EB" />
          </g>
        </svg>
      );

    case "bank-card":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="bnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#bnGrad)" />
          {/* Tarjeta Bancaria MultiRed */}
          <g transform="translate(55, 18)">
            <rect x="0" y="0" width="170" height="104" rx="10" fill="#1F2937" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="14" y="24" fill="#FFFFFF" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="900">BANCO DE LA NACIÓN</text>
            <rect x="14" y="38" width="28" height="20" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
            {/* Ondas Contactless */}
            <path d="M54 44 Q58 48 54 52 M58 40 Q64 48 58 56" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <text x="14" y="80" fill="#E5E7EB" fontSize="13" fontFamily="monospace" fontWeight="700" letterSpacing="2">•••• •••• •••• 4021</text>
            <rect x="110" y="70" width="46" height="22" rx="4" fill="#DC2626" />
            <text x="115" y="85" fill="#FFFFFF" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900">PÁGALO.PE</text>
          </g>
        </svg>
      );

    case "driver-license":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="mtcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#mtcGrad)" />
          {/* Brevete Digital MTC */}
          <g transform="translate(50, 18)">
            <rect x="0" y="0" width="180" height="104" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#6EE7B7" strokeWidth="1.5" />
            <rect x="0" y="0" width="180" height="22" rx="10" fill="#047857" />
            <rect x="0" y="12" width="180" height="10" fill="#047857" />
            <text x="12" y="16" fill="#FFFFFF" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="800">MTC • LICENCIA DE CONDUCIR</text>
            <rect x="12" y="32" width="44" height="56" rx="6" fill="#CBD5E1" />
            <circle cx="34" cy="50" r="12" fill="#64748B" />
            <path d="M18 84 C18 72, 50 72, 50 84 Z" fill="#64748B" />
            {/* Volante y Récord 0 Puntos */}
            <circle cx="85" cy="50" r="16" fill="none" stroke="#047857" strokeWidth="2.5" />
            <circle cx="85" cy="50" r="4" fill="#047857" />
            <line x1="85" y1="34" x2="85" y2="46" stroke="#047857" strokeWidth="2" />
            <line x1="71" y1="58" x2="81" y2="52" stroke="#047857" strokeWidth="2" />
            <line x1="99" y1="58" x2="89" y2="52" stroke="#047857" strokeWidth="2" />
            {/* Badge Récord Limpio */}
            <rect x="110" y="36" width="60" height="26" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
            <text x="116" y="52" fill="#065F46" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="900">0 PUNTOS</text>
            <rect x="66" y="76" width="104" height="14" rx="4" fill="#F1F5F9" />
            <text x="72" y="86" fill="#334155" fontSize="7.5" fontFamily="system-ui, sans-serif" fontWeight="700">CLASE A - CATEGORÍA I</text>
          </g>
        </svg>
      );

    case "health-shield":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#medGrad)" />
          {/* Escudo Médico de Salud */}
          <g transform="translate(95, 14)">
            <path d="M45 10 L80 22 C80 65, 45 92, 45 92 C45 92, 10 65, 10 22 Z" fill="#FFFFFF" fillOpacity="0.95" stroke="#BAE6FD" strokeWidth="2" />
            {/* Cruz Médica Roja */}
            <rect x="37" y="30" width="16" height="42" rx="3" fill="#EF4444" />
            <rect x="24" y="43" width="42" height="16" rx="3" fill="#EF4444" />
          </g>
          {/* Latido Cardíaco */}
          <path d="M20 70 L60 70 L70 50 L80 90 L90 60 L100 75 L110 70 L130 70" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M150 70 L170 70 L180 50 L190 90 L200 60 L210 75 L220 70 L260 70" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "judicial-scale":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="pjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#pjGrad)" />
          {/* Balanza de la Justicia */}
          <g transform="translate(95, 18)">
            {/* Pilar Central */}
            <rect x="42" y="15" width="6" height="85" rx="3" fill="#FDE047" />
            <rect x="25" y="95" width="40" height="10" rx="3" fill="#E2E8F0" />
            {/* Brazo Balanza */}
            <line x1="5" y1="28" x2="85" y2="28" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
            <circle cx="45" cy="28" r="6" fill="#CA8A04" />
            {/* Platillo Izquierdo */}
            <line x1="12" y1="28" x2="0" y2="55" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="12" y1="28" x2="24" y2="55" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M-5 55 Q12 70 29 55 Z" fill="#FDE047" />
            {/* Platillo Derecho */}
            <line x1="78" y1="28" x2="66" y2="55" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="78" y1="28" x2="90" y2="55" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M61 55 Q78 70 95 55 Z" fill="#FDE047" />
          </g>
          <rect x="195" y="42" width="65" height="55" rx="6" fill="#FFFFFF" fillOpacity="0.9" />
          <text x="202" y="62" fill="#0F172A" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900">CERTIFICADO</text>
          <text x="202" y="74" fill="#15803D" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="800">PENAL DIGITAL</text>
          <circle cx="240" cy="82" r="8" fill="#15803D" />
          <path d="M236 82 L239 85 L245 79" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "police-star":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="pnpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#pnpGrad)" />
          {/* Placa Estrella PNP */}
          <g transform="translate(100, 16)">
            {/* Estrella Dorada de 6 Puntas */}
            <polygon points="40,5 50,28 75,30 55,48 60,72 40,58 20,72 25,48 5,30 30,28" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <circle cx="40" cy="40" r="16" fill="#065F46" stroke="#FDE047" strokeWidth="2" />
            <text x="28" y="44" fill="#FFFFFF" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900">PNP</text>
            {/* Cinta Perú */}
            <rect x="18" y="78" width="44" height="26" rx="4" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
            <rect x="18" y="78" width="14" height="26" fill="#DC2626" />
            <rect x="48" y="78" width="14" height="26" fill="#DC2626" />
            <text x="24" y="94" fill="#0F172A" fontSize="7.5" fontFamily="system-ui, sans-serif" fontWeight="900">CERAP</text>
          </g>
        </svg>
      );

    case "academic-degree":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="suneduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#suneduGrad)" />
          {/* Birrete y Diploma Universitario */}
          <g transform="translate(70, 18)">
            {/* Birrete */}
            <polygon points="65,10 125,28 65,46 5,28" fill="#1F2937" stroke="#374151" strokeWidth="1.5" />
            <rect x="35" y="38" width="60" height="22" rx="4" fill="#111827" />
            {/* Borla Dorada */}
            <circle cx="65" cy="28" r="3" fill="#FDE047" />
            <line x1="65" y1="28" x2="20" y2="44" stroke="#FDE047" strokeWidth="2" />
            <circle cx="20" cy="46" r="4" fill="#FDE047" />
            {/* Diploma Enrollado */}
            <g transform="translate(50, 68)">
              <rect x="0" y="0" width="70" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
              <rect x="30" y="0" width="12" height="26" fill="#DC2626" />
              <text x="12" y="16" fill="#92400E" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="800">TÍTULO OFICIAL</text>
            </g>
          </g>
        </svg>
      );

    case "trademark-shield":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="indecopiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#indecopiGrad)" />
          {/* Escudo Marca Registrada */}
          <g transform="translate(95, 14)">
            <path d="M45 8 L85 22 C85 68, 45 95, 45 95 C45 95, 5 68, 5 22 Z" fill="#FFFFFF" fillOpacity="0.95" stroke="#99F6E4" strokeWidth="2" />
            {/* Símbolo ® */}
            <circle cx="45" cy="48" r="22" fill="#0F766E" />
            <text x="36" y="57" fill="#FFFFFF" fontSize="24" fontFamily="system-ui, sans-serif" fontWeight="900">R</text>
          </g>
        </svg>
      );

    case "telecom-mobile":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="osiptelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#osiptelGrad)" />
          {/* Smartphone con Chips */}
          <g transform="translate(100, 12)">
            <rect x="0" y="0" width="80" height="116" rx="12" fill="#0F172A" stroke="#93C5FD" strokeWidth="2" />
            <rect x="6" y="10" width="68" height="96" rx="6" fill="#1E293B" />
            {/* SIM Card */}
            <rect x="18" y="24" width="44" height="40" rx="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
            <text x="24" y="48" fill="#0F172A" fontSize="9" fontFamily="monospace" fontWeight="900">SIM 4G</text>
            {/* Señal de Antena */}
            <line x1="24" y1="90" x2="24" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <line x1="32" y1="86" x2="32" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="82" x2="40" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="78" x2="48" y2="94" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "job-briefcase":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="mtpeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#mtpeGrad)" />
          {/* Maletín Ejecutivo de Trabajo */}
          <g transform="translate(85, 20)">
            <rect x="0" y="24" width="110" height="74" rx="8" fill="#1F2937" stroke="#34D399" strokeWidth="1.5" />
            {/* Asa */}
            <path d="M35 24 L35 12 Q35 6 45 6 L65 6 Q75 6 75 12 L75 24" fill="none" stroke="#FDE047" strokeWidth="4" />
            {/* Broche Dorado */}
            <rect x="45" y="44" width="20" height="16" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
            {/* Documento CUL Saliendo */}
            <rect x="15" y="-6" width="80" height="28" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <text x="24" y="8" fill="#047857" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="900">CERTIFICADO CUL</text>
          </g>
        </svg>
      );

    case "pension-safe":
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="onpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#onpGrad)" />
          {/* Caja Fuerte / Aportes ONP */}
          <g transform="translate(90, 16)">
            <rect x="0" y="0" width="100" height="106" rx="10" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
            {/* Rueda de Bóveda */}
            <circle cx="50" cy="53" r="28" fill="#334155" stroke="#FDE047" strokeWidth="3" />
            <circle cx="50" cy="53" r="10" fill="#FDE047" />
            <line x1="50" y1="25" x2="50" y2="81" stroke="#FDE047" strokeWidth="3" />
            <line x1="22" y1="53" x2="78" y2="53" stroke="#FDE047" strokeWidth="3" />
            {/* Monedas de Oro */}
            <circle cx="15" cy="90" r="10" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="85" cy="90" r="10" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case "labor-stamp":
    default:
      return (
        <svg viewBox="0 0 280 140" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="sunafilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881337" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" fill="url(#sunafilGrad)" />
          {/* Tabla de Inspección con Sello */}
          <g transform="translate(85, 12)">
            <rect x="0" y="10" width="110" height="114" rx="8" fill="#FFFFFF" fillOpacity="0.95" stroke="#FDA4AF" strokeWidth="1.5" />
            {/* Clip Superior */}
            <rect x="35" y="2" width="40" height="16" rx="4" fill="#4B5563" />
            <circle cx="55" cy="10" r="3" fill="#E5E7EB" />
            {/* Sello de Denuncia / Inspección */}
            <rect x="15" y="30" width="80" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="22" y="47" fill="#DC2626" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900">INSPECCIÓN</text>
            <line x1="15" y1="70" x2="95" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="82" x2="85" y2="82" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="94" x2="70" y2="94" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}
