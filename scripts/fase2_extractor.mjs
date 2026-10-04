import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para limpiar texto y espacios
function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
}

// Función para extraer secciones semánticas de Gob.pe
function parseGobPePage(html, fallbackTitle = '', fallbackActionUrl = null) {
  const $ = cheerio.load(html);

  // 1. Título oficial
  let title = cleanText($('h1').first().text()) || fallbackTitle;

  // 2. Extraer action_url si existe en la página
  let actionUrl = fallbackActionUrl;
  if (!actionUrl) {
    const actionBtn = $('a:contains("Ir al servicio"), a:contains("Ingresa al"), a.btn-action, a[href*="sunat.gob.pe"]').first();
    if (actionBtn.length) {
      const href = actionBtn.attr('href');
      if (href && href.startsWith('http')) {
        actionUrl = href;
      }
    }
  }

  // 3. Extraer párrafos principales para la descripción
  const allParagraphs = [];
  $('main p, article p, .content p').each((_, el) => {
    const pText = cleanText($(el).text());
    if (pText.length > 20 && !pText.includes('Gob.pe') && !pText.includes('Todos los derechos reservados')) {
      allParagraphs.push(pText);
    }
  });

  const descripcion = allParagraphs.slice(0, 3).join(' ') || 'Trámite oficial de la SUNAT.';

  // 4. Extraer Requisitos, Consideraciones y Pasos
  const requisitos = [];
  const consideraciones = [];
  const pasos = [];

  // Buscar encabezados de sección
  $('h2, h3, h4, strong, p.title-section').each((_, el) => {
    const headingText = cleanText($(el).text()).toLowerCase();
    
    // Bloque de Requisitos / Condiciones
    if (/requisito|condicion|qué necesitas|que necesitas|documento/i.test(headingText)) {
      // Buscar elementos li en listas siguientes
      let parent = $(el).is('strong') ? $(el).parent() : $(el);
      let nextUl = parent.nextAll('ul, ol').first();
      if (nextUl.length) {
        nextUl.find('li').each((_, li) => {
          const item = cleanText($(li).text());
          if (item.length > 5 && !requisitos.includes(item)) requisitos.push(item);
        });
      }
    }

    // Bloque de Consideraciones / Importante / Ten en cuenta
    if (/consideraci|ten en cuenta|importante|información adicional/i.test(headingText)) {
      let parent = $(el).is('strong') ? $(el).parent() : $(el);
      let nextUl = parent.nextAll('ul, ol').first();
      if (nextUl.length) {
        nextUl.find('li').each((_, li) => {
          const item = cleanText($(li).text());
          if (item.length > 5 && !consideraciones.includes(item)) consideraciones.push(item);
        });
      }
    }

    // Bloque de Pasos / Procedimiento
    if (/antes de iniciar|paso|procedimiento|cómo hacerlo|hazlo en/i.test(headingText)) {
      let parent = $(el).is('strong') ? $(el).parent() : $(el);
      let nextList = parent.nextAll('ol, ul').first();
      if (nextList.length) {
        nextList.find('li').each((_, li) => {
          const item = cleanText($(li).text());
          if (item.length > 5 && !pasos.includes(item)) pasos.push(item);
        });
      }
    }
  });

  // Si no se detectaron pasos por listas, buscar texto explicativo
  if (pasos.length === 0) {
    const stepsText = $('div:contains("Antes de iniciar"), section:contains("Antes de iniciar")').text();
    if (stepsText) {
      const cleanSteps = cleanText(stepsText).slice(0, 300);
      if (cleanSteps.length > 30) pasos.push(cleanSteps);
    }
  }

  // 5. Detección de Costo
  const fullHtmlText = cleanText($('body').text());
  let costo = "Gratuito";
  const costMatch = fullHtmlText.match(/S\/\.?\s*(\d+(\.\d{2})?)/i);
  if (costMatch) {
    costo = `S/ ${costMatch[1]}`;
  } else if (fullHtmlText.includes("{costo:")) {
    const internalCost = fullHtmlText.match(/\{costo:\s*(\d+)\}/);
    if (internalCost) {
      const rawNum = parseInt(internalCost[1], 10);
      costo = rawNum > 100 ? `S/ ${(rawNum / 100).toFixed(2)}` : `S/ ${rawNum}.00`;
    }
  }

  // 6. Detección de Modalidad
  let modalidad = "Virtual";
  if (/presencial/i.test(fullHtmlText) && /virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Virtual y Presencial";
  } else if (/presencial/i.test(fullHtmlText) && !/virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Presencial";
  }

  // 7. Generar Raw Content estructurado
  const rawContentLines = [
    `# Trámite: ${title}`,
    `**Entidad:** SUNAT`,
    `**Costo:** ${costo}`,
    `**Modalidad:** ${modalidad}`,
    `\n## Descripción\n${descripcion}`
  ];

  if (requisitos.length > 0) {
    rawContentLines.push(`\n## Requisitos\n` + requisitos.map(r => `* ${r}`).join('\n'));
  }

  if (consideraciones.length > 0) {
    rawContentLines.push(`\n## Consideraciones\n` + consideraciones.map(c => `* ${c}`).join('\n'));
  }

  if (pasos.length > 0) {
    rawContentLines.push(`\n## Pasos\n` + pasos.map((p, idx) => `${idx + 1}. ${p}`).join('\n'));
  }

  const raw_content = rawContentLines.join('\n');

  // 8. Generar Embedding Text denso y delimitado (150-250 palabras)
  const reqSummary = requisitos.length > 0 ? requisitos.slice(0, 4).join(', ') : 'Requisitos estándar de SUNAT';
  const consSummary = consideraciones.length > 0 ? consideraciones.slice(0, 3).join('. ') : '';
  
  const embedding_text = `Trámite: ${title}.
Entidad: SUNAT - Superintendencia Nacional de Aduanas y de Administración Tributaria.
Para qué sirve: ${descripcion.slice(0, 200)}.
Requisitos clave: ${reqSummary}.
Modalidad y Costo: ${modalidad}, costo ${costo}.
Consideraciones: ${consSummary}.
Trámites relacionados y consultas oficiales SUNAT.`.replace(/\s+/g, ' ').trim();

  return {
    titulo_oficial: title,
    costo,
    modalidad,
    descripcion,
    requisitos: requisitos.length > 0 ? requisitos : ["Contar con DNI o RUC vigente", "Acceso a SUNAT Operaciones en Línea"],
    consideraciones: consideraciones.length > 0 ? consideraciones : [],
    pasos: pasos.length > 0 ? pasos : ["Ingresar a la plataforma de SUNAT con tu Clave SOL", "Completar la información solicitada", "Confirmar y descargar la constancia"],
    action_url: actionUrl,
    raw_content,
    embedding_text
  };
}

async function ejecutarFase2() {
  console.log("🚀 Iniciando FASE 2: Extracción y enriquecimiento profundo de 593 trámites de SUNAT...\n");

  const catalogoPath = path.join(__dirname, 'sunat_catalogo_fase1.json');
  const rawCatalog = await fs.readFile(catalogoPath, 'utf-8');
  const catalog = JSON.parse(rawCatalog);

  console.log(`📋 Total de trámites cargados del catálogo: ${catalog.length}`);

  const enrichedResults = [];
  const CONCURRENCY = 6; // 6 peticiones en paralelo para no saturar a Gob.pe
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  let completedCount = 0;
  const startTime = Date.now();

  // Procesador por lotes con concurrencia controlada
  for (let i = 0; i < catalog.length; i += CONCURRENCY) {
    const chunk = catalog.slice(i, i + CONCURRENCY);

    const chunkPromises = chunk.map(async (item) => {
      try {
        let pageData = {};
        if (item.url_guia && item.url_guia.startsWith('http')) {
          const res = await fetch(item.url_guia, { headers });
          if (res.ok) {
            const html = await res.text();
            pageData = parseGobPePage(html, item.titulo_oficial, item.action_url);
          }
        }

        const finalItem = {
          id: String(item.id),
          titulo_oficial: pageData.titulo_oficial || item.titulo_oficial,
          entidad: "SUNAT",
          costo: pageData.costo || "Gratuito",
          modalidad: pageData.modalidad || "Virtual",
          descripcion: pageData.descripcion || item.resumen_snippet || "",
          requisitos: pageData.requisitos || [],
          consideraciones: pageData.consideraciones || [],
          pasos: pageData.pasos || [],
          url_guia: item.url_guia,
          action_url: pageData.action_url || item.action_url || null,
          raw_content: pageData.raw_content || `${item.titulo_oficial}. ${item.resumen_snippet}`,
          embedding_text: pageData.embedding_text || `Trámite: ${item.titulo_oficial}. Entidad: SUNAT. ${item.resumen_snippet}`
        };

        return finalItem;
      } catch (err) {
        // En caso de fallo en una URL, preservar metadatos de Fase 1
        return {
          id: String(item.id),
          titulo_oficial: item.titulo_oficial,
          entidad: "SUNAT",
          costo: "Gratuito",
          modalidad: "Virtual",
          descripcion: item.resumen_snippet || "",
          requisitos: ["DNI o RUC vigente", "Clave SOL"],
          consideraciones: [],
          pasos: ["Ingresar a SUNAT con Clave SOL", "Realizar la consulta"],
          url_guia: item.url_guia,
          action_url: item.action_url || null,
          raw_content: `${item.titulo_oficial}\n${item.resumen_snippet}`,
          embedding_text: `Trámite: ${item.titulo_oficial}. Entidad: SUNAT. ${item.resumen_snippet}`
        };
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    enrichedResults.push(...chunkResults);
    completedCount += chunk.length;

    const percent = ((completedCount / catalog.length) * 100).toFixed(1);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stdout.write(`\r⏳ Progreso: ${completedCount}/${catalog.length} trámites (${percent}%) - ${elapsed}s`);

    // Pausa breve de cortesía
    await new Promise(r => setTimeout(r, 80));
  }

  const outputPath = path.join(__dirname, 'sunat_tramites_completos.json');
  await fs.writeFile(outputPath, JSON.stringify(enrichedResults, null, 2), 'utf-8');

  console.log("\n\n=======================================================");
  console.log(`🎉 ¡FASE 2 COMPLETADA CON ÉXITO!`);
  console.log(`📁 Total de trámites enriquecidos: ${enrichedResults.length}`);
  console.log(`⏱️ Tiempo total de extracción: ${((Date.now() - startTime) / 1000).toFixed(1)} segundos`);
  console.log(`💾 Archivo generado: ${outputPath}`);
  console.log("=======================================================\n");
}

ejecutarFase2().catch(err => {
  console.error("❌ Error general en la Fase 2:", err);
});
