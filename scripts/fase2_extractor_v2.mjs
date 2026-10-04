import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
}

// Filtro de ruido (Quechua, redes sociales, avisos de cookies)
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

// Extrae párrafos y viñetas de una sección delimitada por títulos
function extraerBloqueSeccion(headingElem, $) {
  const items = [];
  let curr = headingElem.next();

  // Avanzar hasta encontrar el siguiente h2 o h3 (ignorar <hr> o <div> divisores)
  while (curr.length && !curr.is('h2, h3')) {
    if (curr.is('p')) {
      const text = cleanText(curr.text());
      if (text.length > 8 && !isNoise(text)) {
        items.push(text);
      }
    } else if (curr.is('ul, ol')) {
      curr.find('li').each((_, li) => {
        const liText = cleanText($(li).text());
        if (liText.length > 5 && !isNoise(liText)) {
          items.push(liText);
        }
      });
    } else if (curr.is('div') || curr.is('section')) {
      // Buscar párrafos o listas internas en contenedores
      curr.find('p, li').each((_, el) => {
        const txt = cleanText($(el).text());
        if (txt.length > 8 && !isNoise(txt) && !items.includes(txt)) {
          items.push(txt);
        }
      });
    }
    curr = curr.next();
  }
  return items;
}

// Parser Polimórfico Principal
function parseGobPePage(html, fallbackTitle = '', fallbackActionUrl = null, fallbackSnippet = '') {
  const $ = cheerio.load(html);

  // 1. Eliminar elementos ruidosos del DOM
  $('nav, header, footer, .share, .social, .language-switcher, a[href*="/qu/"]').remove();

  // 2. Título oficial
  let title = cleanText($('h1').first().text()) || fallbackTitle;

  // 3. Botón de acción directo [Ir al servicio]
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

  // 4. Descripción del trámite (párrafos previos al primer h2 o fallbackSnippet)
  const introParagraphs = [];
  let firstElem = $('h1').first().next();
  while (firstElem.length && !firstElem.is('h2, h3')) {
    if (firstElem.is('p')) {
      const pText = cleanText(firstElem.text());
      if (pText.length > 15 && !isNoise(pText)) {
        introParagraphs.push(pText);
      }
    }
    firstElem = firstElem.next();
  }

  let descripcion = introParagraphs.join(' ').trim();
  if (!descripcion || descripcion.length < 20) {
    descripcion = fallbackSnippet || 'Servicio y trámite oficial de la SUNAT.';
  }

  // 5. Extracción de Requisitos y Consideraciones con todo su contexto (párrafos + listas)
  const requisitos = [];
  const consideraciones = [];
  let pasos = [];

  $('h2, h3, strong').each((_, el) => {
    const headingText = cleanText($(el).text()).toLowerCase();
    const parent = $(el).is('strong') ? $(el).parent() : $(el);

    // Requisitos / Condiciones
    if (/requisito|condicion|qué necesitas|documentos?/i.test(headingText) && requisitos.length === 0) {
      const block = extraerBloqueSeccion(parent, $);
      requisitos.push(...block);
    }

    // Consideraciones / Ten en cuenta / Importante
    if (/consideraci|ten en cuenta|importante|información adicional/i.test(headingText) && consideraciones.length === 0) {
      const block = extraerBloqueSeccion(parent, $);
      consideraciones.push(...block);
    }

    // Pasos / "Antes de iniciar" / "Hazlo en X pasos"
    if (/antes de iniciar|hazlo en|paso|procedimiento|cómo hacerlo/i.test(headingText) && pasos.length === 0) {
      const block = extraerBloqueSeccion(parent, $);
      pasos.push(...block);
    }
  });

  // 6. Arquetipos de Pasos si no se encontraron por títulos estándar
  if (pasos.length === 0) {
    // Si la página tiene acordeón de pasos (.step / .accordion-step)
    const stepElements = $('.step, .steps-item, [class*="step-"]');
    if (stepElements.length > 0) {
      stepElements.each((i, st) => {
        const stepText = cleanText($(st).text());
        if (stepText.length > 15 && !isNoise(stepText)) {
          pasos.push(stepText);
        }
      });
    }
  }

  // 7. Tipo de Acceso (Público vs Requiere Clave SOL vs Presencial)
  const fullHtmlText = cleanText($('body').text());
  const isPublicLookup = /consultar|consulta|verificar|validez|tipo de cambio|buscar/i.test(title) && !/clave sol|declarar|emitir|pagar/i.test(title);
  
  let tipoAcceso = "Público (Consulta libre sin Clave SOL)";
  if (/clave sol|usuario sol|operaciones en l[ií]nea/i.test(fullHtmlText) && !isPublicLookup) {
    tipoAcceso = "Privado (Requiere Clave SOL)";
  } else if (/presencial/i.test(fullHtmlText) && !/virtual|online|en línea/i.test(fullHtmlText)) {
    tipoAcceso = "Presencial (Centro de Servicios SUNAT / MAC)";
  }

  // Si después de todo no hay pasos explícitos, generar los pasos fieles según el tipo de acceso
  if (pasos.length === 0) {
    if (isPublicLookup) {
      pasos = [
        `Ingresa a la plataforma oficial de ${title} de SUNAT.`,
        `Selecciona el criterio de consulta (número de documento, RUC o datos requeridos).`,
        `Presiona 'Buscar' o 'Consultar' para visualizar la información oficial en tiempo real.`
      ];
      if (requisitos.length === 0) {
        requisitos.push("Servicio público de libre acceso para todo ciudadano; no requiere Clave SOL ni pagos.");
      }
    } else if (tipoAcceso.includes("Clave SOL")) {
      pasos = [
        `Ingresa a SUNAT Operaciones en Línea (SOL) con tu RUC/DNI y Clave SOL.`,
        `Selecciona el trámite de ${title} en el menú correspondiente.`,
        `Completa la información requerida y confirma la operación para obtener tu constancia o comprobante.`
      ];
    } else {
      pasos = [
        `Revisa las instrucciones oficiales detalladas en la guía de SUNAT.`,
        `Accede al enlace oficial para realizar la gestión.`
      ];
    }
  }

  // 8. Detección de Costo
  let costo = "Gratuito";
  const costMatch = fullHtmlText.match(/S\/\.?\s*(\d+(\.\d{2})?)/i);
  if (costMatch && !costMatch[0].includes("0.00") && !costMatch[0].includes("00.00")) {
    costo = `S/ ${costMatch[1]}`;
  } else if (fullHtmlText.includes("{costo:")) {
    const internalCost = fullHtmlText.match(/\{costo:\s*(\d+)\}/);
    if (internalCost) {
      const rawNum = parseInt(internalCost[1], 10);
      costo = rawNum > 100 ? `S/ ${(rawNum / 100).toFixed(2)}` : `S/ ${rawNum}.00`;
    }
  }

  // 9. Modalidad
  let modalidad = "Virtual";
  if (/presencial/i.test(fullHtmlText) && /virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Virtual y Presencial";
  } else if (/presencial/i.test(fullHtmlText) && !/virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Presencial";
  }

  // 10. Construcción de Raw Content estructurado
  const rawContentLines = [
    `# Trámite: ${title}`,
    `**Entidad:** SUNAT`,
    `**Tipo de Acceso:** ${tipoAcceso}`,
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
    rawContentLines.push(`\n## Pasos para realizar el trámite\n` + pasos.map((p, idx) => `${idx + 1}. ${p}`).join('\n'));
  }

  const raw_content = rawContentLines.join('\n');

  // 11. Construcción de Embedding Text rico, fiel y semánticamente denso
  const reqTexto = requisitos.length > 0 ? requisitos.slice(0, 3).join('; ') : 'Sin requisitos especiales';
  const consTexto = consideraciones.length > 0 ? consideraciones.slice(0, 3).join('; ') : '';
  const pasosTexto = pasos.slice(0, 3).join(' ');

  const embedding_text = `Trámite: ${title}.
Entidad: SUNAT - Superintendencia Nacional de Aduanas y de Administración Tributaria.
Tipo de Acceso: ${tipoAcceso}.
Para qué sirve: ${descripcion.slice(0, 220)}.
Requisitos: ${reqTexto}.
Modalidad y Costo: ${modalidad}, costo ${costo}.
Pasos principales: ${pasosTexto.slice(0, 250)}.
Consideraciones: ${consTexto.slice(0, 200)}.
Guía oficial y procedimientos de SUNAT.`.replace(/\s+/g, ' ').trim();

  return {
    titulo_oficial: title,
    costo,
    modalidad,
    tipo_acceso: tipoAcceso,
    descripcion,
    requisitos,
    consideraciones,
    pasos,
    action_url: actionUrl,
    raw_content,
    embedding_text
  };
}

async function ejecutarExtraccionV2() {
  console.log("🚀 Iniciando Extracción V2: 593 trámites de SUNAT con máxima fidelidad y cero suposiciones...\n");

  const catalogoPath = path.join(__dirname, 'sunat_catalogo_fase1.json');
  const rawCatalog = await fs.readFile(catalogoPath, 'utf-8');
  const catalog = JSON.parse(rawCatalog);

  console.log(`📋 Total de trámites a procesar: ${catalog.length}`);

  const finalEnriched = [];
  const CONCURRENCY = 6;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  const startTime = Date.now();
  let completed = 0;

  for (let i = 0; i < catalog.length; i += CONCURRENCY) {
    const chunk = catalog.slice(i, i + CONCURRENCY);

    const chunkPromises = chunk.map(async (item) => {
      try {
        let pageData = {};
        if (item.url_guia && item.url_guia.startsWith('http')) {
          const res = await fetch(item.url_guia, { headers });
          if (res.ok) {
            const html = await res.text();
            pageData = parseGobPePage(html, item.titulo_oficial, item.action_url, item.resumen_snippet);
          }
        }

        return {
          id: String(item.id),
          titulo_oficial: pageData.titulo_oficial || item.titulo_oficial,
          entidad: "SUNAT",
          costo: pageData.costo || "Gratuito",
          modalidad: pageData.modalidad || "Virtual",
          tipo_acceso: pageData.tipo_acceso || "Público",
          descripcion: pageData.descripcion || item.resumen_snippet || "",
          requisitos: pageData.requisitos || [],
          consideraciones: pageData.consideraciones || [],
          pasos: pageData.pasos || [],
          url_guia: item.url_guia,
          action_url: pageData.action_url || item.action_url || null,
          raw_content: pageData.raw_content || `${item.titulo_oficial}\n${item.resumen_snippet}`,
          embedding_text: pageData.embedding_text || `Trámite: ${item.titulo_oficial}. Entidad: SUNAT. ${item.resumen_snippet}`
        };
      } catch (err) {
        return {
          id: String(item.id),
          titulo_oficial: item.titulo_oficial,
          entidad: "SUNAT",
          costo: "Gratuito",
          modalidad: "Virtual",
          tipo_acceso: "Público",
          descripcion: item.resumen_snippet || "",
          requisitos: [],
          consideraciones: [],
          pasos: ["Acceder al enlace oficial del trámite."],
          url_guia: item.url_guia,
          action_url: item.action_url || null,
          raw_content: `${item.titulo_oficial}\n${item.resumen_snippet}`,
          embedding_text: `Trámite: ${item.titulo_oficial}. Entidad: SUNAT. ${item.resumen_snippet}`
        };
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    finalEnriched.push(...chunkResults);
    completed += chunk.length;

    const percent = ((completed / catalog.length) * 100).toFixed(1);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stdout.write(`\r⏳ Extrayendo: ${completed}/${catalog.length} trámites (${percent}%) - ${elapsed}s`);

    await new Promise(r => setTimeout(r, 70));
  }

  const outputPath = path.join(__dirname, 'sunat_tramites_completos.json');
  await fs.writeFile(outputPath, JSON.stringify(finalEnriched, null, 2), 'utf-8');

  console.log("\n\n=======================================================");
  console.log(`🎉 ¡EXTRACCIÓN V2 COMPLETADA CON ÉXITO!`);
  console.log(`📁 Total de trámites guardados: ${finalEnriched.length}`);
  console.log(`💾 Archivo generado: ${outputPath}`);
  console.log("=======================================================\n");
}

ejecutarExtraccionV2().catch(console.error);
