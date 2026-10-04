import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENTITIES_DIR = path.join(__dirname, 'data_entities');

// Definición completa de las 26+ entidades agrupadas en las 10 categorías oficiales
export const TARGET_ENTITIES = [
  // ── Cat 1: Identidad, Trámites Civiles y Migración ──
  {
    id: "RENIEC",
    acronym: "RENIEC",
    name: "Registro Nacional de Identificación y Estado Civil",
    category: "Identidad, Trámites Civiles y Migración",
    slug: "reniec",
    queryType: "institucion"
  },
  {
    id: "MIGRACIONES",
    acronym: "MIGRACIONES",
    name: "Superintendencia Nacional de Migraciones",
    category: "Identidad, Trámites Civiles y Migración",
    slug: "migraciones",
    queryType: "institucion"
  },

  // ── Cat 2: Economía, Impuestos y Registros ──
  {
    id: "SUNAT",
    acronym: "SUNAT",
    name: "Superintendencia Nacional de Aduanas y de Administración Tributaria",
    category: "Economía, Impuestos y Registros",
    slug: "sunat",
    queryType: "institucion"
  },
  {
    id: "SUNARP",
    acronym: "SUNARP",
    name: "Superintendencia Nacional de los Registros Públicos",
    category: "Economía, Impuestos y Registros",
    slug: "sunarp",
    queryType: "institucion"
  },
  {
    id: "BN",
    acronym: "BN",
    name: "Banco de la Nación del Perú",
    category: "Economía, Impuestos y Registros",
    slug: "bn",
    queryType: "institucion"
  },
  {
    id: "SBS",
    acronym: "SBS",
    name: "Superintendencia de Banca, Seguros y AFP",
    category: "Economía, Impuestos y Registros",
    slug: "sbs",
    queryType: "institucion"
  },
  {
    id: "SMV",
    acronym: "SMV",
    name: "Superintendencia del Mercado de Valores",
    category: "Economía, Impuestos y Registros",
    slug: "smv",
    queryType: "institucion"
  },

  // ── Cat 3: Salud ──
  {
    id: "ESSALUD",
    acronym: "ESSALUD",
    name: "Seguro Social de Salud del Perú",
    category: "Salud",
    slug: "essalud",
    queryType: "institucion"
  },
  {
    id: "SIS",
    acronym: "SIS",
    name: "Seguro Integral de Salud",
    category: "Salud",
    slug: "sis",
    queryType: "institucion"
  },
  {
    id: "SUSALUD",
    acronym: "SUSALUD",
    name: "Superintendencia Nacional de Salud",
    category: "Salud",
    slug: "susalud",
    queryType: "institucion"
  },
  {
    id: "MINSA",
    acronym: "MINSA",
    name: "Ministerio de Salud",
    category: "Salud",
    slug: "minsa",
    queryType: "institucion",
    maxPages: 6 // Tomar las páginas principales de servicios generales
  },
  {
    id: "DIGEMID",
    acronym: "DIGEMID",
    name: "Dirección General de Medicamentos, Insumos y Drogas (MINSA)",
    category: "Salud",
    searchTerm: "digemid",
    queryType: "term"
  },

  // ── Cat 4: Trabajo y Pensiones ──
  {
    id: "ONP",
    acronym: "ONP",
    name: "Oficina de Normalización Previsional",
    category: "Trabajo y Pensiones",
    slug: "onp",
    queryType: "institucion"
  },
  {
    id: "SUNAFIL",
    acronym: "SUNAFIL",
    name: "Superintendencia Nacional de Fiscalización Laboral",
    category: "Trabajo y Pensiones",
    slug: "sunafil",
    queryType: "institucion"
  },
  {
    id: "MTPE",
    acronym: "MTPE",
    name: "Ministerio de Trabajo y Promoción del Empleo",
    category: "Trabajo y Pensiones",
    slug: "mtpe",
    queryType: "institucion"
  },

  // ── Cat 5: Transporte y Tránsito ──
  {
    id: "MTC",
    acronym: "MTC",
    name: "Ministerio de Transportes y Comunicaciones",
    category: "Transporte y Tránsito",
    slug: "mtc",
    queryType: "institucion",
    maxPages: 8
  },
  {
    id: "SUTRAN",
    acronym: "SUTRAN",
    name: "Superintendencia de Transporte Terrestre de Personas, Carga y Mercancías",
    category: "Transporte y Tránsito",
    slug: "sutran",
    queryType: "institucion"
  },
  {
    id: "ATU",
    acronym: "ATU",
    name: "Autoridad de Transporte Urbano para Lima y Callao",
    category: "Transporte y Tránsito",
    slug: "atu",
    queryType: "institucion"
  },
  {
    id: "SAT LIMA",
    acronym: "SAT LIMA",
    name: "Servicio de Administración Tributaria de Lima",
    category: "Transporte y Tránsito",
    searchTerm: "sat lima",
    queryType: "term",
    maxPages: 3
  },

  // ── Cat 6: Educación y Formación ──
  {
    id: "MINEDU",
    acronym: "MINEDU",
    name: "Ministerio de Educación",
    category: "Educación y Formación",
    slug: "minedu",
    queryType: "institucion",
    maxPages: 8
  },
  {
    id: "SUNEDU",
    acronym: "SUNEDU",
    name: "Superintendencia Nacional de Educación Superior Universitaria",
    category: "Educación y Formación",
    slug: "sunedu",
    queryType: "institucion"
  },
  {
    id: "SINEACE",
    acronym: "SINEACE",
    name: "Sistema Nacional de Evaluación, Acreditación y Certificación de la Calidad Educativa",
    category: "Educación y Formación",
    slug: "sineace",
    queryType: "institucion"
  },
  {
    id: "PRONABEC",
    acronym: "PRONABEC",
    name: "Programa Nacional de Becas y Crédito Educativo",
    category: "Educación y Formación",
    slug: "pronabec",
    queryType: "institucion"
  },

  // ── Cat 7: Consumo, Regulación y Servicios Públicos ──
  {
    id: "INDECOPI",
    acronym: "INDECOPI",
    name: "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual",
    category: "Consumo, Regulación y Servicios Públicos",
    slug: "indecopi",
    queryType: "institucion"
  },
  {
    id: "OSIPTEL",
    acronym: "OSIPTEL",
    name: "Organismo Supervisor de Inversión Privada en Telecomunicaciones",
    category: "Consumo, Regulación y Servicios Públicos",
    slug: "osiptel",
    queryType: "institucion"
  },
  {
    id: "OSINERGMIN",
    acronym: "OSINERGMIN",
    name: "Organismo Supervisor de la Inversión en Energía y Minería",
    category: "Consumo, Regulación y Servicios Públicos",
    slug: "osinergmin",
    queryType: "institucion"
  },
  {
    id: "SUNASS",
    acronym: "SUNASS",
    name: "Superintendencia Nacional de Servicios de Saneamiento",
    category: "Consumo, Regulación y Servicios Públicos",
    slug: "sunass",
    queryType: "institucion"
  },
  {
    id: "OSITRAN",
    acronym: "OSITRAN",
    name: "Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público",
    category: "Consumo, Regulación y Servicios Públicos",
    slug: "ositran",
    queryType: "institucion"
  },
  {
    id: "SEDAPAL",
    acronym: "SEDAPAL",
    name: "Servicio de Agua Potable y Alcantarillado de Lima",
    category: "Consumo, Regulación y Servicios Públicos",
    searchTerm: "sedapal",
    queryType: "term",
    maxPages: 3
  },

  // ── Cat 8: Justicia, Legalidad y Orden ──
  {
    id: "PODER JUDICIAL",
    acronym: "PODER JUDICIAL",
    name: "Poder Judicial del Perú",
    category: "Justicia, Legalidad y Orden",
    slug: "pj",
    queryType: "institucion"
  },
  {
    id: "MPFN",
    acronym: "MPFN",
    name: "Ministerio Público - Fiscalía de la Nación",
    category: "Justicia, Legalidad y Orden",
    slug: "mpfn",
    queryType: "institucion"
  },
  {
    id: "INPE",
    acronym: "INPE",
    name: "Instituto Nacional Penitenciario",
    category: "Justicia, Legalidad y Orden",
    slug: "inpe",
    queryType: "institucion"
  },
  {
    id: "DEFENSORIA",
    acronym: "DEFENSORIA",
    name: "Defensoría del Pueblo",
    category: "Justicia, Legalidad y Orden",
    slug: "defensoria",
    queryType: "institucion"
  },
  {
    id: "MINJUSDH",
    acronym: "MINJUSDH",
    name: "Ministerio de Justicia y Derechos Humanos",
    category: "Justicia, Legalidad y Orden",
    slug: "minjus",
    queryType: "institucion"
  },
  {
    id: "PNP",
    acronym: "PNP",
    name: "Policía Nacional del Perú",
    category: "Justicia, Legalidad y Orden",
    slug: "pnp",
    queryType: "institucion"
  },

  // ── Cat 9: Sistema Electoral ──
  {
    id: "ONPE",
    acronym: "ONPE",
    name: "Oficina Nacional de Procesos Electorales",
    category: "Sistema Electoral",
    slug: "onpe",
    queryType: "institucion"
  },
  {
    id: "JNE",
    acronym: "JNE",
    name: "Jurado Nacional de Elecciones",
    category: "Sistema Electoral",
    slug: "jne",
    queryType: "institucion"
  },

  // ── Cat 10: Recursos Naturales y Emergencias ──
  {
    id: "INDECI",
    acronym: "INDECI",
    name: "Instituto Nacional de Defensa Civil",
    category: "Recursos Naturales y Emergencias",
    slug: "indeci",
    queryType: "institucion"
  },
  {
    id: "OEFA",
    acronym: "OEFA",
    name: "Organismo de Evaluación y Fiscalización Ambiental",
    category: "Recursos Naturales y Emergencias",
    slug: "oefa",
    queryType: "institucion"
  },
  {
    id: "SERFOR",
    acronym: "SERFOR",
    name: "Servicio Nacional Forestal y de Fauna Silvestre",
    category: "Recursos Naturales y Emergencias",
    slug: "serfor",
    queryType: "institucion"
  },
  {
    id: "SENASA",
    acronym: "SENASA",
    name: "Servicio Nacional de Sanidad Agraria",
    category: "Recursos Naturales y Emergencias",
    slug: "senasa",
    queryType: "institucion"
  }
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/html'
};

function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
}

function isNoise(text) {
  if (!text) return true;
  const t = text.toLowerCase();
  return (
    t.includes('kay likapas quechua') ||
    t.includes('qillqasqa') ||
    t.includes('todos los derechos reservados') ||
    t.includes('términos y condiciones') ||
    t.includes('último cambio') ||
    t.includes('compartir en facebook') ||
    t.includes('imprimir')
  );
}

function extractSectionContent(headingElem, $) {
  const contents = [];
  let curr = headingElem.next();

  while (curr.length && !curr.is('h2, h3')) {
    if (curr.is('p')) {
      const text = cleanText(curr.text());
      if (text.length > 8 && !isNoise(text) && !contents.includes(text)) {
        contents.push(text);
      }
    } else if (curr.is('ul, ol')) {
      curr.find('li').each((_, li) => {
        const liText = cleanText($(li).text());
        if (liText.length > 5 && !isNoise(liText) && !contents.includes(liText)) {
          contents.push(liText);
        }
      });
    } else if (curr.is('div, section, article')) {
      curr.find('p, li').each((_, el) => {
        const txt = cleanText($(el).text());
        if (txt.length > 8 && !isNoise(txt) && !contents.includes(txt)) {
          contents.push(txt);
        }
      });
    }
    curr = curr.next();
  }
  return contents;
}

// Analizador avanzado de páginas de trámites de Gob.pe
function parseGobPeDetail(html, entityInfo, fallbackTitle = '', fallbackActionUrl = null, fallbackSnippet = '') {
  const $ = cheerio.load(html);

  // 1. Limpieza de elementos irrelevantes
  $('nav, header, footer, .share, .social, .language-switcher, a[href*="/qu/"], script, style').remove();

  // 2. Título oficial limpio
  let title = cleanText($('h1').first().text()) || fallbackTitle;

  // 3. Botón / Enlace oficial de acción directa
  let actionUrl = fallbackActionUrl;
  if (!actionUrl) {
    const actionBtn = $('a:contains("Ir al servicio"), a:contains("Ingresa al"), a:contains("Iniciar trámite"), a:contains("Acceder"), a.btn-action, a.btn-primary').first();
    if (actionBtn.length) {
      const href = actionBtn.attr('href');
      if (href && href.startsWith('http')) {
        actionUrl = href;
      }
    }
  }

  // 4. Descripción / Propósito inicial
  const introParagraphs = [];
  const introConsiderations = [];

  let firstElem = $('h1').first().next();
  while (firstElem.length && !firstElem.is('h2, h3')) {
    if (firstElem.is('p')) {
      const pText = cleanText(firstElem.text());
      if (pText.length > 15 && !isNoise(pText)) {
        if (/actualmente|ten en cuenta|ten presente|importante|recuerda que|debes saber/i.test(pText)) {
          introConsiderations.push(pText);
        } else {
          introParagraphs.push(pText);
        }
      }
    }
    firstElem = firstElem.next();
  }

  let summary = introParagraphs.join(' ').trim();
  if (!summary || summary.length < 20) {
    summary = fallbackSnippet || `Servicio y trámite oficial ofrecido por ${entityInfo.name} (${entityInfo.acronym}).`;
  }

  // 5. Secciones bajo encabezados
  const requirements = [];
  const considerations = [...introConsiderations];
  const steps = [];

  $('h2, h3, strong').each((_, el) => {
    const headingText = cleanText($(el).text()).toLowerCase();
    const parent = $(el).is('strong') ? $(el).parent() : $(el);

    if (/requisito|condici[oó]n|qu[eé] necesitas|documentos?|debes presentar/i.test(headingText)) {
      const block = extractSectionContent(parent, $);
      for (const item of block) {
        if (!requirements.includes(item)) requirements.push(item);
      }
    } else if (/hazlo de forma|hazlo digital|hazlo online|hazlo presencial|hazlo en|antes de iniciar|paso|procedimiento|c[oó]mo hacerlo/i.test(headingText)) {
      const headingTitle = cleanText($(el).text());
      const block = extractSectionContent(parent, $);
      if (block.length > 0) {
        if (/hazlo de forma|hazlo presencial|hazlo digital/i.test(headingTitle)) {
          steps.push(`${headingTitle}: ${block[0]}`);
          for (let k = 1; k < block.length; k++) {
            if (!steps.includes(block[k])) steps.push(block[k]);
          }
        } else {
          for (const item of block) {
            if (!steps.includes(item)) steps.push(item);
          }
        }
      }
    } else if (/consideraci|ten en cuenta|importante|normativa|base legal|informaci[oó]n adicional|plazo|vigencia/i.test(headingText)) {
      const headingTitle = cleanText($(el).text());
      const block = extractSectionContent(parent, $);
      for (const item of block) {
        const entry = /normativa|base legal/i.test(headingTitle) ? `${headingTitle}: ${item}` : item;
        if (!considerations.includes(entry)) considerations.push(entry);
      }
    }
  });

  const fullHtmlText = cleanText($('body').text());

  // 6. Detección de Costo
  let cost = "Gratuito";
  const costMatch = fullHtmlText.match(/S\/\.?\s*(\d+(\.\d{2})?)/i);
  if (costMatch && !costMatch[0].includes("0.00") && !costMatch[0].includes("00.00") && !costMatch[1].startsWith("0")) {
    cost = `S/ ${costMatch[1]}`;
  } else if (fullHtmlText.includes("{costo:")) {
    const internalCost = fullHtmlText.match(/\{costo:\s*(\d+)\}/);
    if (internalCost) {
      const rawNum = parseInt(internalCost[1], 10);
      cost = rawNum > 100 ? `S/ ${(rawNum / 100).toFixed(2)}` : `S/ ${rawNum}.00`;
    }
  }

  // 7. Modalidad
  let modality = "En línea (Virtual)";
  if (/presencial/i.test(fullHtmlText) && /virtual|online|en línea|digital/i.test(fullHtmlText)) {
    modality = "Mixto (En línea y Presencial)";
  } else if (/presencial/i.test(fullHtmlText) && !/virtual|online|en línea|digital/i.test(fullHtmlText)) {
    modality = "Presencial";
  }

  // 8. Público Objetivo
  let targetAudience = "Ciudadanos y Personas Naturales";
  if (/persona jur[ií]dica|empresa|mype|compañ[ií]a|negocio/i.test(fullHtmlText) && /persona natural|ciudadano/i.test(fullHtmlText)) {
    targetAudience = "Personas Naturales y Empresas";
  } else if (/persona jur[ií]dica|empresa|mype/i.test(fullHtmlText)) {
    targetAudience = "Empresas y Personas Jurídicas";
  } else if (/extranjero|calidad migratoria|pasaporte/i.test(fullHtmlText)) {
    targetAudience = "Ciudadanos, Residentes y Extranjeros";
  }

  // 9. Requisitos y Pasos por defecto si no están explícitos
  if (requirements.length === 0) {
    if (/consultar|consulta|verificar|buscar/i.test(title)) {
      requirements.push("Ingresar el documento de consulta (DNI, RUC, Placa o Código según corresponda).");
    } else {
      requirements.push("Documento Nacional de Identidad (DNI) o documento de identidad oficial vigente.");
    }
  }

  if (steps.length === 0) {
    steps.push(`Ingresar a la plataforma o portal oficial de ${entityInfo.acronym}.`);
    steps.push(`Completar el formulario con los datos solicitados.`);
    steps.push(`Obtener la constancia, comprobante o resultado del trámite.`);
  }

  // 10. Construcción de Markdown Estructurado (raw_content)
  const rawContentLines = [
    `# Trámite: ${title}`,
    `**Entidad:** ${entityInfo.name} (${entityInfo.acronym})`,
    `**Categoría:** ${entityInfo.category}`,
    `**Costo:** ${cost}`,
    `**Modalidad:** ${modality}`,
    `**Dirigido a:** ${targetAudience}`,
    `\n## Resumen del Trámite\n${summary}`
  ];

  if (requirements.length > 0) {
    rawContentLines.push(`\n## Requisitos Obligatorios\n` + requirements.map(r => `* ${r}`).join('\n'));
  }

  if (considerations.length > 0) {
    rawContentLines.push(`\n## Consideraciones y Notas Oficiales\n` + considerations.map(c => `* ${c}`).join('\n'));
  }

  if (steps.length > 0) {
    rawContentLines.push(`\n## Pasos para realizar el trámite\n` + steps.map((p, idx) => `${idx + 1}. ${p}`).join('\n'));
  }

  const raw_content = rawContentLines.join('\n');

  // 11. Texto para Embeddings Semánticos
  const reqResumen = requirements.slice(0, 3).join('; ');
  const pasosResumen = steps.slice(0, 3).join('; ');
  const consResumen = considerations.slice(0, 2).join('. ');

  const embedding_text = `Trámite: ${title}.
Entidad: ${entityInfo.acronym} - ${entityInfo.name}.
Categoría: ${entityInfo.category}.
Para qué sirve: ${summary.slice(0, 250)}.
Requisitos: ${reqResumen}.
Modalidad y Costo: ${modality}, costo ${cost}. Dirigido a ${targetAudience}.
Pasos: ${pasosResumen.slice(0, 220)}.
Consideraciones: ${consResumen.slice(0, 200)}.
Información oficial del Estado Peruano en AhorraTiempo.pe.`.replace(/\s+/g, ' ').trim();

  return {
    title,
    summary,
    requirements,
    considerations,
    steps,
    cost,
    modality,
    target_audience: targetAudience,
    action_url: actionUrl,
    raw_content,
    embedding_text
  };
}

// Descarga el listado de trámites para una entidad
async function fetchCatalogForEntity(entity) {
  let initialUrl = '';
  if (entity.queryType === 'institucion') {
    initialUrl = `https://www.gob.pe/busquedas.json?contenido=servicios&institucion[]=${entity.slug}&sheet=1`;
  } else {
    initialUrl = `https://www.gob.pe/busquedas.json?term=${encodeURIComponent(entity.searchTerm)}&contenido=servicios&sheet=1`;
  }

  try {
    const res = await fetch(initialUrl, { headers: HEADERS });
    if (!res.ok) {
      console.log(`❌ [${entity.acronym}] Error al obtener catálogo inicial: HTTP ${res.status}`);
      return [];
    }

    const json = await res.json();
    const totalCount = json.data?.attributes?.total_count || 0;
    const results = json.data?.attributes?.results || [];
    const itemsPerPage = results.length || 25;
    let totalSheets = Math.ceil(totalCount / itemsPerPage) || 1;

    if (entity.maxPages && totalSheets > entity.maxPages) {
      totalSheets = entity.maxPages;
    }

    console.log(`📌 [${entity.acronym}] ${totalCount} trámites detectados en ${totalSheets} páginas.`);

    const catalog = [];
    const seenIds = new Set();

    for (let sheet = 1; sheet <= totalSheets; sheet++) {
      let pageUrl = '';
      if (entity.queryType === 'institucion') {
        pageUrl = `https://www.gob.pe/busquedas.json?contenido=servicios&institucion[]=${entity.slug}&sheet=${sheet}`;
      } else {
        pageUrl = `https://www.gob.pe/busquedas.json?term=${encodeURIComponent(entity.searchTerm)}&contenido=servicios&sheet=${sheet}`;
      }

      try {
        const pageRes = await fetch(pageUrl, { headers: HEADERS });
        if (!pageRes.ok) continue;

        const pageJson = await pageRes.json();
        const pageResults = pageJson.data?.attributes?.results || [];

        for (const item of pageResults) {
          if (item.id && !seenIds.has(String(item.id))) {
            seenIds.add(String(item.id));

            let relativeUrl = '';
            if (item.url) {
              const matchHref = item.url.match(/href="([^"]+)"/);
              relativeUrl = matchHref ? matchHref[1] : '';
            }

            const guideUrl = relativeUrl.startsWith('http') ? relativeUrl : `https://www.gob.pe${relativeUrl}`;

            catalog.push({
              id: String(item.id),
              title: cleanText(item.name_with_parent || item.name || ''),
              entidad: entity.acronym,
              entidad_nombre: entity.name,
              category: entity.category,
              url: guideUrl,
              action_url: item.action_url || null,
              summary: cleanText(item.content || '')
            });
          }
        }
        await new Promise(r => setTimeout(r, 100));
      } catch (err) {
        console.log(`⚠️ Error en página ${sheet} de [${entity.acronym}]: ${err.message}`);
      }
    }

    return catalog;
  } catch (err) {
    console.log(`❌ Error al consultar entidad [${entity.acronym}]: ${err.message}`);
    return [];
  }
}

// Extrae los detalles de cada trámite para una entidad
async function processEntityProcedures(entity, catalog) {
  const entityFile = path.join(ENTITIES_DIR, `${entity.acronym.toLowerCase()}_tramites.json`);
  
  // Optimización para SUNAT si ya tenemos el dataset completo enriquecido
  if (entity.acronym === 'SUNAT') {
    const sunatPath = path.join(__dirname, 'sunat_tramites_completos.json');
    try {
      const sunatRaw = await fs.readFile(sunatPath, 'utf-8');
      const sunatData = JSON.parse(sunatRaw);
      if (sunatData && sunatData.length > 500) {
        console.log(`⚡ [SUNAT] Reutilizando dataset maestro enriquecido (${sunatData.length} trámites).`);
        const formattedSunat = sunatData.map(item => ({
          id: String(item.id),
          hash_id: `sunat_${item.id}`,
          titulo_oficial: item.titulo_oficial,
          entidad: "SUNAT",
          entidad_nombre: entity.name,
          category: entity.category,
          costo: item.costo || "Gratuito",
          modalidad: item.modalidad || "En línea (Virtual)",
          publico_objetivo: item.tipo_acceso?.includes("Clave SOL") ? "Contribuyentes y Empresas" : "Ciudadanos y Contribuyentes",
          descripcion: item.descripcion || "",
          requisitos: item.requisitos || [],
          consideraciones: item.consideraciones || [],
          pasos: item.pasos || [],
          url: item.url_guia || `https://www.gob.pe/${item.id}`,
          action_url: item.action_url || item.url_guia,
          raw_content: item.raw_content || `# Trámite: ${item.titulo_oficial}\n${item.descripcion}`,
          embedding_text: item.embedding_text || `Trámite: ${item.titulo_oficial}. Entidad: SUNAT.`
        }));
        await fs.writeFile(entityFile, JSON.stringify(formattedSunat, null, 2), 'utf-8');
        return formattedSunat;
      }
    } catch (e) {}
  }

  // Si ya fue procesado previamente, podemos cargarlo para acelerar
  try {
    const existing = await fs.readFile(entityFile, 'utf-8');
    const existingData = JSON.parse(existing);
    if (existingData && existingData.length >= catalog.length && catalog.length > 0) {
      console.log(`⚡ [${entity.acronym}] Ya procesado previamente (${existingData.length} trámites en caché).`);
      return existingData;
    }
  } catch (e) {
    // No existe en caché, continuar
  }

  console.log(`🚀 [${entity.acronym}] Extrayendo detalles para ${catalog.length} trámites...`);
  const detailedList = [];
  const CONCURRENCY = 4;

  for (let i = 0; i < catalog.length; i += CONCURRENCY) {
    const chunk = catalog.slice(i, i + CONCURRENCY);

    const chunkPromises = chunk.map(async (item) => {
      try {
        let parsed = null;
        if (item.url && item.url.startsWith('http') && item.url !== 'https://www.gob.pe') {
          const res = await fetch(item.url, { headers: HEADERS });
          if (res.ok) {
            const html = await res.text();
            parsed = parseGobPeDetail(html, entity, item.title, item.action_url, item.summary);
          }
        }

        if (!parsed) {
          parsed = {
            title: item.title,
            summary: item.summary || `Trámite oficial de ${entity.name}.`,
            requirements: ["Documento de identidad vigente (DNI/CE)."],
            considerations: [],
            steps: [`Acceder al portal oficial de ${entity.acronym}.`, "Completar la solicitud."],
            cost: "Gratuito",
            modality: "En línea (Virtual)",
            target_audience: "Ciudadanos",
            action_url: item.action_url || null,
            raw_content: `# Trámite: ${item.title}\n**Entidad:** ${entity.name}\n\n## Resumen\n${item.summary}`,
            embedding_text: `Trámite: ${item.title}. Entidad: ${entity.acronym}. ${item.summary}`
          };
        }

        return {
          id: item.id,
          hash_id: `${entity.acronym.toLowerCase()}_${item.id}`,
          titulo_oficial: parsed.title,
          entidad: entity.acronym,
          entidad_nombre: entity.name,
          category: entity.category,
          costo: parsed.cost,
          modalidad: parsed.modality,
          publico_objetivo: parsed.target_audience,
          descripcion: parsed.summary,
          requisitos: parsed.requirements,
          consideraciones: parsed.considerations,
          pasos: parsed.steps,
          url: item.url,
          action_url: parsed.action_url || item.action_url || item.url,
          raw_content: parsed.raw_content,
          embedding_text: parsed.embedding_text
        };
      } catch (err) {
        return {
          id: item.id,
          hash_id: `${entity.acronym.toLowerCase()}_${item.id}`,
          titulo_oficial: item.title,
          entidad: entity.acronym,
          entidad_nombre: entity.name,
          category: entity.category,
          costo: "Gratuito",
          modalidad: "En línea (Virtual)",
          publico_objetivo: "Ciudadanos",
          descripcion: item.summary,
          requisitos: ["Documento de identidad vigente (DNI)."],
          consideraciones: [],
          pasos: [`Ingresar a ${item.url}`],
          url: item.url,
          action_url: item.action_url || item.url,
          raw_content: `# Trámite: ${item.title}\n**Entidad:** ${entity.name}\n\n## Resumen\n${item.summary}`,
          embedding_text: `Trámite: ${item.title}. Entidad: ${entity.acronym}. ${item.summary}`
        };
      }
    });

    const results = await Promise.all(chunkPromises);
    detailedList.push(...results);
    await new Promise(r => setTimeout(r, 120));
  }

  // Guardar archivo por entidad
  await fs.writeFile(entityFile, JSON.stringify(detailedList, null, 2), 'utf-8');
  console.log(`✅ [${entity.acronym}] Guardados ${detailedList.length} trámites detallados.`);
  return detailedList;
}

// Función principal orquestadora
async function runMultiEntityScraper() {
  console.log("==================================================================");
  console.log("🇵🇪 CRAWLER MAESTRO: CATÁLOGO DE TRÁMITES DEL ESTADO PERUANO");
  console.log(`🎯 Total de Entidades Objetivo: ${TARGET_ENTITIES.length}`);
  console.log("==================================================================\n");

  await fs.mkdir(ENTITIES_DIR, { recursive: true });

  const allTramites = [];
  const entityStats = [];

  for (const entity of TARGET_ENTITIES) {
    console.log(`\n🔍 Procesando Entidad [${entity.acronym}] - ${entity.name}...`);
    const catalog = await fetchCatalogForEntity(entity);
    if (catalog.length === 0) {
      console.log(`⚠️ No se encontraron trámites automáticos para [${entity.acronym}].`);
      continue;
    }

    const detailed = await processEntityProcedures(entity, catalog);
    allTramites.push(...detailed);
    entityStats.push({
      entidad: entity.acronym,
      nombre: entity.name,
      categoria: entity.category,
      total_tramites: detailed.length
    });
  }

  // Guardar catálogo consolidado en src/app/data y en scripts
  const masterOutputPath = path.join(__dirname, 'multi_entidades_completas.json');
  const frontendOutputPath = path.join(__dirname, '..', 'src', 'app', 'data', 'multi_entidades_catalogo.json');

  await fs.writeFile(masterOutputPath, JSON.stringify(allTramites, null, 2), 'utf-8');
  await fs.writeFile(frontendOutputPath, JSON.stringify(allTramites, null, 2), 'utf-8');

  console.log("\n==================================================================");
  console.log("🎉 ¡EXTRACCIÓN MULTI-ENTIDAD COMPLETADA CON ÉXITO!");
  console.log(`📊 Gran Total de Trámites Extraídos: ${allTramites.length}`);
  console.log(`💾 Archivo Maestro: ${masterOutputPath}`);
  console.log(`💾 Archivo Frontend: ${frontendOutputPath}`);
  console.log("==================================================================\n");

  console.table(entityStats);
}

runMultiEntityScraper().catch(console.error);
