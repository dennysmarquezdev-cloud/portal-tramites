import rawCatalogoData from "../../data/catalogo.json";
import multiCatalogData from "../data/multi_entidades_catalogo.json";

export interface OfficialLinkItem {
  title: string;
  url: string;
  entidad?: string;
  costo?: string;
  badge?: string;
}

// Helper para normalizar texto eliminando tildes y diacríticos
function clean(str: string = ""): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Lista blanca de dominios y subdominios oficiales peruanos autorizados.
 * Solo los dominios pertenecientes a estas entidades son admitidos.
 */
const ALLOWED_GOV_DOMAINS = [
  "gob.pe",
  "sunat.gob.pe",
  "reniec.gob.pe",
  "mtc.gob.pe",
  "sunarp.gob.pe",
  "sat.gob.pe",
  "pj.gob.pe",
  "policia.gob.pe",
  "onp.gob.pe",
  "essalud.gob.pe",
  "sis.gob.pe",
  "sbs.gob.pe",
  "pagalo.pe",
  "empleosperu.gob.pe",
  "apeseg.org.pe",
  "asociacionafp.pe",
  "indecopi.gob.pe",
  "osiptel.gob.pe",
  "osinergmin.gob.pe",
  "sunass.gob.pe",
  "ositran.gob.pe",
  "onpe.gob.pe",
  "jne.gob.pe",
  "oefa.gob.pe",
  "senasa.gob.pe",
  "serfor.gob.pe",
  "indeci.gob.pe",
  "minedu.gob.pe",
  "sunedu.gob.pe",
  "sineace.gob.pe",
  "pronabec.gob.pe",
  "sedapal.com.pe",
  "sedapar.com.pe",
  "mpfn.gob.pe",
  "inpe.gob.pe",
  "defensoria.gob.pe",
  "minjus.gob.pe",
  "bn.com.pe",
  "smv.gob.pe",
  "atu.gob.pe",
  "sutran.gob.pe",
  "sunafil.gob.pe",
  "susalud.gob.pe"
];

/**
 * Valida y sanitiza cualquier URL para garantizar que apunte a un recurso
 * oficial, accesible y libre de parámetros de sesión volátiles (ej. ?exe= de SUNAT SOL).
 */
export function sanitizeAndValidateOfficialUrl(
  rawUrl: string, 
  defaultEntidad?: string
): { valid: boolean; url: string; entidad?: string } {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { valid: false, url: "" };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return { valid: false, url: "" };
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    // 1. Verificación de dominio contra la lista blanca oficial
    const isAllowed = ALLOWED_GOV_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return { valid: false, url: "" };
    }

    // 2. Canonicalización de SUNAT SOL (Evita el fallo por parámetros de sesión ?exe=)
    if (hostname.includes("sunat.gob.pe")) {
      if (hostname.includes("e-menu.sunat.gob.pe")) {
        return {
          valid: true,
          url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
          entidad: "SUNAT"
        };
      }
      if (hostname.includes("e-consultaruc.sunat.gob.pe")) {
        return {
          valid: true,
          url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
          entidad: "SUNAT"
        };
      }
    }

    // 3. Sanitización de URLs con parámetros de sesión residuales
    if (parsed.searchParams.has("exe") || parsed.search.includes("exe=") || parsed.search.includes("pestana=")) {
      parsed.search = "";
      parsed.hash = "";
    }

    // 4. Detección automática de entidad si no fue provista
    let detectedEntidad = defaultEntidad;
    if (!detectedEntidad) {
      if (hostname.includes("sunat")) detectedEntidad = "SUNAT";
      else if (hostname.includes("reniec")) detectedEntidad = "RENIEC";
      else if (hostname.includes("mtc") || hostname.includes("licencias") || hostname.includes("recitv")) detectedEntidad = "MTC";
      else if (hostname.includes("sunarp")) detectedEntidad = "SUNARP";
      else if (hostname.includes("sat.gob")) detectedEntidad = "SAT";
      else if (hostname.includes("pj.gob") || hostname.includes("cape.pj")) detectedEntidad = "Poder Judicial";
      else if (hostname.includes("policia") || hostname.includes("cerap")) detectedEntidad = "Policía Nacional";
      else if (hostname.includes("pagalo") || hostname.includes("bn.com")) detectedEntidad = "Banco de la Nación";
      else if (hostname.includes("onp")) detectedEntidad = "ONP";
      else if (hostname.includes("essalud")) detectedEntidad = "EsSalud";
      else if (hostname.includes("sis.gob")) detectedEntidad = "SIS";
      else if (hostname.includes("empleosperu") || hostname.includes("mtpe")) detectedEntidad = "MTPE";
      else if (hostname.includes("indecopi")) detectedEntidad = "INDECOPI";
      else if (hostname.includes("osiptel")) detectedEntidad = "OSIPTEL";
      else if (hostname.includes("osinergmin")) detectedEntidad = "OSINERGMIN";
      else if (hostname.includes("sunass")) detectedEntidad = "SUNASS";
      else if (hostname.includes("ositran")) detectedEntidad = "OSITRAN";
      else if (hostname.includes("onpe")) detectedEntidad = "ONPE";
      else if (hostname.includes("jne")) detectedEntidad = "JNE";
      else if (hostname.includes("oefa")) detectedEntidad = "OEFA";
      else if (hostname.includes("senasa")) detectedEntidad = "SENASA";
      else if (hostname.includes("serfor")) detectedEntidad = "SERFOR";
      else if (hostname.includes("indeci")) detectedEntidad = "INDECI";
      else if (hostname.includes("minedu")) detectedEntidad = "MINEDU";
      else if (hostname.includes("sunedu")) detectedEntidad = "SUNEDU";
      else if (hostname.includes("sineace")) detectedEntidad = "SINEACE";
      else if (hostname.includes("pronabec")) detectedEntidad = "PRONABEC";
      else if (hostname.includes("sedapal")) detectedEntidad = "SEDAPAL";
      else if (hostname.includes("sedapar")) detectedEntidad = "SEDAPAR";
      else if (hostname.includes("mpfn")) detectedEntidad = "MPFN";
      else if (hostname.includes("inpe")) detectedEntidad = "INPE";
      else if (hostname.includes("defensoria")) detectedEntidad = "DEFENSORIA";
      else if (hostname.includes("minjus")) detectedEntidad = "MINJUSDH";
      else detectedEntidad = "Gobierno del Perú";
    }

    return {
      valid: true,
      url: parsed.toString(),
      entidad: detectedEntidad
    };
  } catch {
    return { valid: false, url: "" };
  }
}

/**
 * Reconcilia y obtiene enlaces oficiales con 100% de concordancia semántica
 * respecto a la consulta del usuario y la respuesta generada por LOTA AI.
 */
export function getConcordantOfficialLinks(
  backendLinks: any[] | undefined,
  messageContent: string = "",
  userPrompt: string = ""
): OfficialLinkItem[] {
  const p = clean(userPrompt);
  const c = clean(messageContent);

  const titleMatch = messageContent.match(/^(?:#{1,3}\s*)?(?:Trámite:\s*|Guía oficial:\s*)?([^\n]+)/im);
  const responseTitle = titleMatch ? clean(titleMatch[1]) : "";
  const matchedLinks: OfficialLinkItem[] = [];

  // ══════════════════════════════════════════════════════════════════════
  // 0. COTEJO DIRECTO EN CATÁLOGO MULTI-ENTIDAD OFICIAL (3,033 TRÁMITES)
  // ══════════════════════════════════════════════════════════════════════
  for (const item of (multiCatalogData as any[])) {
    const itemTitle = clean(item.titulo_oficial || item.titulo || item.title || "");
    if (!itemTitle || itemTitle.length < 5) continue;

    // Detectar si el prompt o el título de la respuesta contiene el nombre oficial del trámite
    const isDirectMatch = (p.length > 6 && p.includes(itemTitle)) || 
      (responseTitle && (responseTitle.includes(itemTitle) || itemTitle.includes(responseTitle)));

    if (isDirectMatch) {
      const links: OfficialLinkItem[] = [];
      const itemEntidad = item.entidad || "Estado Peruano";

      if (item.action_url) {
        const sanitizedAction = sanitizeAndValidateOfficialUrl(item.action_url, itemEntidad);
        if (sanitizedAction.valid && sanitizedAction.url) {
          links.push({
            title: `${item.titulo_oficial || item.title} (Acceso Directo)`,
            url: sanitizedAction.url,
            entidad: itemEntidad,
            costo: item.costo,
            badge: "Acceso Directo"
          });
        }
      }
      const guideUrl = item.url || item.url_guia;
      if (guideUrl) {
        const sanitizedGuide = sanitizeAndValidateOfficialUrl(guideUrl, itemEntidad);
        if (sanitizedGuide.valid && sanitizedGuide.url) {
          links.push({
            title: `Guía Oficial Gob.pe: ${item.titulo_oficial || item.title}`,
            url: sanitizedGuide.url,
            entidad: itemEntidad,
            costo: item.costo,
            badge: "Guía Oficial"
          });
        }
      }
      if (links.length > 0) {
        return links.slice(0, 2);
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 1. SUNAT — TRÁMITES TRIBUTARIOS CON PRELACIÓN ESPECÍFICA
  // ══════════════════════════════════════════════════════════════════════

  // A. Ficha RUC (Consulta / Descarga / Impresión / Constancia) — Alta Prioridad sobre Inscripción
  if (
    p.includes("ficha ruc") || 
    p.includes("constancia ruc") ||
    p.includes("descargar ficha") ||
    p.includes("imprimir ficha") ||
    (p.includes("descargar") && p.includes("ruc")) ||
    responseTitle.includes("ficha ruc")
  ) {
    matchedLinks.push({
      title: "SUNAT Operaciones en Línea (Descarga de Ficha RUC)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Acceso SOL"
    });
    matchedLinks.push({
      title: "Guía Oficial Gob.pe: Obtener ficha RUC electrónica",
      url: "https://www.gob.pe/7475-obtener-ficha-ruc-electronica",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // B. Recibo por Honorarios Electrónico (RHE) / 4ta Categoría / Freelance
  if (
    p.includes("recibo") || 
    p.includes("honorario") || 
    p.includes("freelance") || 
    p.includes("independiente") ||
    p.includes("cuarta categoria") || 
    p.includes("rxh") ||
    responseTitle.includes("recibo por honorarios") ||
    responseTitle.includes("honorarios")
  ) {
    matchedLinks.push({
      title: "Emisión de Recibo por Honorarios Electrónico (SUNAT SOL)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Acceso Directo SOL"
    });
    matchedLinks.push({
      title: "Guía Oficial de Recibos por Honorarios (Gob.pe)",
      url: "https://www.gob.pe/1101-emitir-recibo-por-honorarios-electronico",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // C. Suspensión de Retenciones de 4ta Categoría (Formulario Virtual 1609)
  if (
    p.includes("1609") || 
    (p.includes("suspens") && (p.includes("retenci") || p.includes("cuarta") || p.includes("honorario"))) ||
    responseTitle.includes("1609") || 
    responseTitle.includes("suspension de retenciones")
  ) {
    matchedLinks.push({
      title: "Solicitud de Suspensión de Retenciones - Formulario Virtual 1609 (SOL)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Formulario 1609"
    });
    matchedLinks.push({
      title: "Guía Oficial de Suspensión de Retenciones 4ta Categoría",
      url: "https://www.gob.pe/1102-solicitar-la-suspension-de-retenciones-de-cuarta-categoria-formulario-n-1609",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // D. Clave SOL (Obtención o Recuperación)
  if (
    p.includes("clave sol") || 
    p.includes("recuperar clave") || 
    p.includes("generar clave sol") ||
    p.includes("olvide mi clave sol") ||
    responseTitle.includes("clave sol")
  ) {
    matchedLinks.push({
      title: "Obtención o Recuperación de Clave SOL en Línea",
      url: "https://orientacion.sunat.gob.pe/obtencion-de-la-clave-sol",
      entidad: "SUNAT",
      badge: "Trámite Virtual"
    });
    matchedLinks.push({
      title: "SUNAT Operaciones en Línea (Sistema SOL)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Acceso SOL"
    });
    return matchedLinks;
  }

  // E. Inscripción al RUC (Sacar RUC nuevo, RUC 10, RUC 20, abrir negocio/empresa)
  if (
    p.includes("inscribirme al ruc") ||
    p.includes("inscripcion al ruc") ||
    p.includes("inscribirse en el ruc") ||
    p.includes("sacar ruc") ||
    p.includes("abrir ruc") ||
    p.includes("crear ruc") ||
    p.includes("tramitar ruc") ||
    p.includes("ruc nuevo") ||
    p.includes("ruc 10") ||
    p.includes("ruc 20") ||
    (p.includes("ruc") && (p.includes("persona natural") || p.includes("empresa") || p.includes("negocio") || p.includes("bodega"))) ||
    responseTitle.includes("inscribirse en el ruc") ||
    responseTitle.includes("inscripcion al ruc")
  ) {
    matchedLinks.push({
      title: "Inscripción al RUC Digital con DNI (SUNAT)",
      url: "https://orientacion.sunat.gob.pe/inscribete-al-ruc-digital",
      entidad: "SUNAT",
      badge: "RUC Digital"
    });
    matchedLinks.push({
      title: "Guía Oficial Gob.pe: Inscribirse en el RUC",
      url: "https://www.gob.pe/338-inscribirse-en-el-ruc",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // F. Mesa de Partes Virtual SUNAT (MPV) — Exclusivo cuando el usuario requiere presentar documentos/escritos
  if (
    p.includes("mesa de partes") || 
    p.includes("mpv") || 
    p.includes("mesa virtual") || 
    p.includes("presentar escrito") || 
    p.includes("solicitud virtual") ||
    responseTitle.includes("mesa de partes")
  ) {
    matchedLinks.push({
      title: "Mesa de Partes Virtual SUNAT (MPV)",
      url: "https://mpv.sunat.gob.pe/",
      entidad: "SUNAT",
      badge: "Mesa Virtual"
    });
    matchedLinks.push({
      title: "Guía Oficial de Presentación de Documentos MPV-SUNAT",
      url: "https://www.gob.pe/1158-mesa-de-partes-virtual-de-sunat-mpv-sunat",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // G. Factura y Boleta Electrónica
  if (
    p.includes("factura") || 
    p.includes("boleta electr") || 
    p.includes("comprobante electr") ||
    responseTitle.includes("factura electronica") ||
    responseTitle.includes("boleta de venta")
  ) {
    matchedLinks.push({
      title: "Emisión de Factura y Boleta Electrónica (SUNAT SOL)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Acceso SOL"
    });
    matchedLinks.push({
      title: "Guía Oficial de Facturación Electrónica (Gob.pe)",
      url: "https://www.gob.pe/7309-emitir-factura-electronica-sistema-de-emision-electronica-sol",
      entidad: "SUNAT",
      badge: "Guía Oficial"
    });
    return matchedLinks;
  }

  // H. Consulta RUC / Estado de RUC (Activo / Habido / Proveedor)
  if (
    p.includes("consultar ruc") || 
    p.includes("consulta ruc") || 
    p.includes("buscar ruc") || 
    p.includes("verificar ruc") || 
    p.includes("estado del ruc") || 
    p.includes("condicion del ruc") || 
    p.includes("validar ruc") ||
    (p.includes("ruc") && (p.includes("activo") || p.includes("habido") || p.includes("proveedor") || p.includes("estado") || p.includes("validez"))) ||
    responseTitle.includes("consultar ruc") ||
    responseTitle.includes("consulta de ruc")
  ) {
    matchedLinks.push({
      title: "Consulta RUC en Línea (SUNAT)",
      url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
      entidad: "SUNAT",
      badge: "Consulta Pública"
    });
    matchedLinks.push({
      title: "Portal Institucional SUNAT",
      url: "https://www.sunat.gob.pe/",
      entidad: "SUNAT",
      badge: "Portal SUNAT"
    });
    return matchedLinks;
  }

  // H. Regímenes Tributarios (NRUS, RER, MYPE Tributario)
  if (
    p.includes("nrus") || 
    p.includes("rus") || 
    p.includes("mype tributario") || 
    p.includes("regimen especial") || 
    p.includes("rer") || 
    p.includes("regimen tributario")
  ) {
    matchedLinks.push({
      title: "Portal Emprender - Regímenes Tributarios SUNAT",
      url: "https://emprender.sunat.gob.pe/",
      entidad: "SUNAT",
      badge: "Guía Tributaria"
    });
    matchedLinks.push({
      title: "Declaración y Pago Mensual - Declara Fácil (SUNAT)",
      url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      entidad: "SUNAT",
      badge: "Declara Fácil"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 2. RENIEC — TRÁMITES DE IDENTIDAD
  // ══════════════════════════════════════════════════════════════════════

  // A. Renovación DNI / DNIe
  if (
    (p.includes("renov") && (p.includes("dni") || p.includes("dnie") || p.includes("caduc") || p.includes("venc"))) ||
    (p.includes("vencio") && p.includes("dni")) ||
    (p.includes("dnie") || (p.includes("dni") && (p.includes("electronico") || p.includes("cambiar") || p.includes("costo")))) ||
    responseTitle.includes("renovacion de dni") ||
    responseTitle.includes("renovar dni")
  ) {
    matchedLinks.push({
      title: "Plataforma de Renovación de DNI por Caducidad (RENIEC)",
      url: "https://apps.reniec.gob.pe/renovacionDni/",
      entidad: "RENIEC",
      badge: "Trámite Virtual"
    });
    matchedLinks.push({
      title: "Págalo.pe - Pago de Tasa de Renovación de DNI",
      url: "https://pagalo.pe/",
      entidad: "Banco de la Nación",
      badge: "Pago de Tasa"
    });
    return matchedLinks;
  }

  // B. Duplicado DNI / DNIe
  if (
    (p.includes("duplicado") && p.includes("dni")) ||
    ((p.includes("perdi") || p.includes("robo") || p.includes("extravio")) && p.includes("dni")) ||
    responseTitle.includes("duplicado de dni")
  ) {
    matchedLinks.push({
      title: "Solicitud de Duplicado de DNI en Línea (RENIEC)",
      url: "https://portaladminusuarios.reniec.gob.pe/duplicado/#!/index",
      entidad: "RENIEC",
      badge: "Trámite Virtual"
    });
    matchedLinks.push({
      title: "Págalo.pe - Pago de Tasa de Duplicado",
      url: "https://pagalo.pe/",
      entidad: "Banco de la Nación",
      badge: "Pago de Tasa"
    });
    return matchedLinks;
  }

  // C. Estado de Trámite DNI
  if (
    (p.includes("estado") && (p.includes("tramite") || p.includes("proceso")) && p.includes("dni")) ||
    p.includes("como va mi dni") || 
    p.includes("donde recojo mi dni") ||
    responseTitle.includes("estado de tramite de dni")
  ) {
    matchedLinks.push({
      title: "Consulta de Estado de Trámite de DNI en Línea",
      url: "https://serviciosportal.reniec.gob.pe/cet/",
      entidad: "RENIEC",
      badge: "Consulta en Línea"
    });
    return matchedLinks;
  }

  // D. Copias de Actas / Partidas de Nacimiento, Matrimonio o Defunción
  if (
    (p.includes("acta") || p.includes("partida")) && 
    (p.includes("nacimiento") || p.includes("matrimonio") || p.includes("defunci") || p.includes("casar"))
  ) {
    matchedLinks.push({
      title: "Copias Certificadas de Actas de Nacimiento, Matrimonio o Defunción",
      url: "https://apps.reniec.gob.pe/actascertificadas",
      entidad: "RENIEC",
      badge: "Emisión de Copia"
    });
    return matchedLinks;
  }

  // E. Certificado de Inscripción C4
  if (p.includes("c4") || p.includes("certificado de inscripci") || responseTitle.includes("c4")) {
    matchedLinks.push({
      title: "Obtención de Certificado de Inscripción C4 (RENIEC)",
      url: "https://apps.reniec.gob.pe/certins",
      entidad: "RENIEC",
      badge: "Emisión C4"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 3. MTC & SAT — LICENCIAS, RÉCORD Y TRÁNSITO
  // ══════════════════════════════════════════════════════════════════════

  // A. Récord del Conductor y Puntos MTC
  if (
    p.includes("record") || 
    p.includes("puntos") || 
    (p.includes("papeleta") && (p.includes("mtc") || p.includes("sutran") || p.includes("record"))) ||
    responseTitle.includes("record del conductor")
  ) {
    matchedLinks.push({
      title: "Consulta de Récord del Conductor y Sistema de Puntos (MTC)",
      url: "https://recordconductor.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Récord MTC"
    });
    matchedLinks.push({
      title: "Sistema de Licencias de Conducir Digital (MTC)",
      url: "https://licencias.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Brevete Digital"
    });
    return matchedLinks;
  }

  // B. Licencias de Conducir / Brevete
  if (
    p.includes("licencia") || 
    p.includes("brevete") || 
    p.includes("conducir") ||
    p.includes("touring") ||
    responseTitle.includes("licencia de conducir") ||
    responseTitle.includes("brevete")
  ) {
    matchedLinks.push({
      title: "Sistema de Licencias de Conducir Digital (MTC)",
      url: "https://licencias.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Brevete Digital"
    });
    matchedLinks.push({
      title: "Consulta de Récord del Conductor y Papeletas (MTC)",
      url: "https://recordconductor.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Récord MTC"
    });
    return matchedLinks;
  }

  // C. Papeletas de Tránsito (SAT Lima / SUTRAN)
  if (
    p.includes("papeleta") || 
    p.includes("sat") || 
    p.includes("infraccion de transito")
  ) {
    matchedLinks.push({
      title: "Consulta y Pago de Papeletas e Impuestos (SAT)",
      url: "https://www.sat.gob.pe/",
      entidad: "SAT",
      badge: "Consulta SAT"
    });
    matchedLinks.push({
      title: "Consulta de Récord y Sanciones MTC",
      url: "https://recordconductor.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Récord MTC"
    });
    return matchedLinks;
  }

  // D. SOAT y Revisión Técnica (CITV)
  if (p.includes("soat") || p.includes("revision tecnica") || p.includes("citv")) {
    matchedLinks.push({
      title: "Consulta de Inspección Técnica Vehicular CITV (MTC)",
      url: "https://recitv.mtc.gob.pe/",
      entidad: "MTC",
      badge: "Consulta CITV"
    });
    matchedLinks.push({
      title: "Consulta de SOAT Electrónico Vigente (APESEG)",
      url: "https://www.apeseg.org.pe/consultas-soat/",
      entidad: "APESEG / MTC",
      badge: "SOAT Digital"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 4. SUNARP — PROPIEDAD Y PUBLICIDAD REGISTRAL
  // ══════════════════════════════════════════════════════════════════════
  if (
    p.includes("copia literal") || 
    p.includes("partida registral") || 
    p.includes("sunarp") || 
    p.includes("vigencia de poder") ||
    p.includes("alerta registral") ||
    (p.includes("placa") && (p.includes("dueño") || p.includes("propiedad") || p.includes("vehiculo"))) ||
    responseTitle.includes("sunarp") ||
    responseTitle.includes("copia literal")
  ) {
    matchedLinks.push({
      title: "Servicio de Publicidad Registral en Línea SPRL (SUNARP)",
      url: "https://servicio.sunarp.gob.pe/visorsprl/",
      entidad: "SUNARP",
      badge: "Copia Literal"
    });
    matchedLinks.push({
      title: "Portal Institucional SUNARP en Línea",
      url: "https://www.sunarp.gob.pe/",
      entidad: "SUNARP",
      badge: "Portal SUNARP"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 5. MIGRACIONES — PASAPORTE ELECTRÓNICO Y EXTRANJERÍA
  // ══════════════════════════════════════════════════════════════════════
  if (
    p.includes("pasaporte") || 
    p.includes("migraciones") || 
    p.includes("movimiento migratorio") ||
    p.includes("carne de extranjeria") ||
    p.includes("residencia") ||
    responseTitle.includes("pasaporte")
  ) {
    matchedLinks.push({
      title: "Sistema de Citas para Pasaporte Electrónico (Migraciones)",
      url: "https://citaspasaporte.migraciones.gob.pe/",
      entidad: "Migraciones",
      badge: "Cita en Línea"
    });
    matchedLinks.push({
      title: "Págalo.pe - Pago de Tasa de Pasaporte Electrónico",
      url: "https://pagalo.pe/",
      entidad: "Banco de la Nación",
      badge: "Pago de Tasa"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 6. SIS & ESSALUD — SALUD PÚBLICA
  // ══════════════════════════════════════════════════════════════════════
  if (p.includes("sis") || p.includes("seguro integral") || responseTitle.includes("sis")) {
    matchedLinks.push({
      title: "Consulta de Asegurado y Estado de Afiliación SIS",
      url: "http://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      entidad: "SIS",
      badge: "Consulta SIS"
    });
    matchedLinks.push({
      title: "Afiliación Virtual al Seguro Integral de Salud (SIS)",
      url: "http://afiliacion.sis.gob.pe/sisAfiliacionVirtual",
      entidad: "SIS",
      badge: "Afiliación Virtual"
    });
    return matchedLinks;
  }

  if (p.includes("essalud") || p.includes("seguro social") || p.includes("donde me atiendo")) {
    matchedLinks.push({
      title: "Consulta de Acreditación y Centro Asistencial (EsSalud)",
      url: "https://portal.essalud.gob.pe/",
      entidad: "EsSalud",
      badge: "Dónde me atiendo"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 7. PENSIONES & LABORAL (AFP / ONP / CERTIFICADO ÚNICO LABORAL)
  // ══════════════════════════════════════════════════════════════════════
  if (p.includes("afp") || p.includes("habitat") || p.includes("integra") || p.includes("prima") || p.includes("profuturo")) {
    matchedLinks.push({
      title: "Consulta de Afiliados al Sistema Privado de Pensiones (SBS)",
      url: "https://www.sbs.gob.pe/usuarios/servicios-al-usuario/reporte-de-afiliacion-afp",
      entidad: "SBS / AFP",
      badge: "Consulta AFP"
    });
    matchedLinks.push({
      title: "Asociación de AFP del Perú",
      url: "https://www.asociacionafp.pe/",
      entidad: "Asociación AFP",
      badge: "Portal AFP"
    });
    return matchedLinks;
  }

  if (p.includes("onp") || p.includes("pensionista") || p.includes("ley 19990") || p.includes("jubilacion")) {
    matchedLinks.push({
      title: "Tu Pensión Digital - Consulta de Aportes y Pensiones ONP",
      url: "https://zonasegura.onp.gob.pe/",
      entidad: "ONP",
      badge: "Portal ONP"
    });
    matchedLinks.push({
      title: "Guía Oficial de Afiliación y Aportes ONP (Gob.pe)",
      url: "https://www.gob.pe/onp",
      entidad: "ONP",
      badge: "Guía ONP"
    });
    return matchedLinks;
  }

  if (
    p.includes("certijoven") || 
    p.includes("certiadulto") || 
    p.includes("certificado掲載 labor") || 
    p.includes("certificado unico laboral") || 
    p.includes("cul") || 
    p.includes("empleos peru") || 
    p.includes("antecedentes para trabajo")
  ) {
    matchedLinks.push({
      title: "Certificado Único Laboral - Empleos Perú (MTPE)",
      url: "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/",
      entidad: "MTPE",
      badge: "Certijoven / CUL"
    });
    matchedLinks.push({
      title: "Portal Emprender Empleos Perú - MTPE",
      url: "https://www.empleosperu.gob.pe/",
      entidad: "MTPE",
      badge: "Portal MTPE"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 8. CERTIFICADOS DE ANTECEDENTES (POLICIALES, PENALES, JUDICIALES)
  // ══════════════════════════════════════════════════════════════════════
  if (p.includes("antecedentes policiales") || p.includes("cerap")) {
    matchedLinks.push({
      title: "Certificado de Antecedentes Policiales Digital CERAP (PNP)",
      url: "https://sistemas.policia.gob.pe/cerapdigital/",
      entidad: "Policía Nacional",
      badge: "CERAP Digital"
    });
    matchedLinks.push({
      title: "Págalo.pe - Pago de Tasa de Antecedentes Policiales",
      url: "https://pagalo.pe/",
      entidad: "Banco de la Nación",
      badge: "Pago de Tasa"
    });
    return matchedLinks;
  }

  if (p.includes("antecedentes penales") || p.includes("poder judicial")) {
    matchedLinks.push({
      title: "Certificado Electrónico de Antecedentes Penales (Poder Judicial)",
      url: "https://cape.pj.gob.pe/",
      entidad: "Poder Judicial",
      badge: "Antecedentes Penales"
    });
    matchedLinks.push({
      title: "Págalo.pe - Pago de Tasa Judicial",
      url: "https://pagalo.pe/",
      entidad: "Banco de la Nación",
      badge: "Pago de Tasa"
    });
    return matchedLinks;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 9. PROCESAMIENTO Y VALIDACIÓN ESTRICTA DE ENLACES DEL BACKEND
  // ══════════════════════════════════════════════════════════════════════
  if (Array.isArray(backendLinks) && backendLinks.length > 0) {
    const valid: OfficialLinkItem[] = [];
    const seenUrls = new Set<string>();

    backendLinks.forEach(b => {
      const rawTitle = typeof b === 'object' ? (b.title || b.titulo || "Acceso Oficial") : String(b);
      const rawUrl = typeof b === 'object' ? (b.url_tramite || b.url || "") : String(b);
      const rawEntidad = typeof b === 'object' ? b.entidad : undefined;
      const costo = typeof b === 'object' ? b.costo : undefined;

      const sanitized = sanitizeAndValidateOfficialUrl(rawUrl, rawEntidad);
      if (sanitized.valid && sanitized.url && !seenUrls.has(sanitized.url)) {
        seenUrls.add(sanitized.url);
        valid.push({
          title: rawTitle,
          url: sanitized.url,
          entidad: sanitized.entidad,
          costo: costo,
          badge: sanitized.entidad || "Oficial Gob.pe"
        });
      }
    });

    if (valid.length > 0) {
      return valid.slice(0, 2);
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 10. RESPALDO CONTROLADO POR COINCIDENCIA EN CATÁLOGO
  // ══════════════════════════════════════════════════════════════════════
  const combinedText = `${p} ${c}`;
  const catalogoItems = rawCatalogoData as any[];
  
  for (const item of catalogoItems) {
    const rawTitle = item["Títítulo del Trámite"] || "";
    const title = clean(rawTitle);
    const rawUrl = item["URL Oficial"] || "";
    
    if (rawUrl && title.length > 3) {
      const words = title.split(/\s+/).filter((w: string) => w.length > 3);
      const matchCount = words.filter((w: string) => combinedText.includes(w)).length;
      
      // Exigir alta concordancia (al menos 3 palabras clave coincidentes)
      if (matchCount >= 3 || (words.length <= 2 && matchCount === words.length)) {
        const sanitized = sanitizeAndValidateOfficialUrl(rawUrl, item["Categoría"]);
        if (sanitized.valid && sanitized.url) {
          return [{
            title: rawTitle,
            url: sanitized.url,
            entidad: sanitized.entidad || "Gobierno del Perú",
            badge: "Trámite Oficial"
          }];
        }
      }
    }
  }

  // FAIL-SAFE: Si no hay enlace 100% oficial y verificado, devolver vacío
  // para que LOTA responda exclusivamente con la guía en texto.
  return [];
}

