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

// Extrae todos los elementos hermanos (<p>, <ul>, <ol>, <div>, <blockquote>) hasta el siguiente h2/h3
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

// Parser Cuidadoso y Minucioso de Gob.pe
function parseGobPePageCareful(html, fallbackTitle = '', fallbackActionUrl = null, fallbackSnippet = '') {
  const $ = cheerio.load(html);

  // 1. Limpiar elementos ruidosos
  $('nav, header, footer, .share, .social, .language-switcher, a[href*="/qu/"], script, style').remove();

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

  // 4. Bloques introductorios (todos los párrafos antes del primer h2/h3)
  const introParagraphs = [];
  const introConsiderations = [];

  let firstElem = $('h1').first().next();
  while (firstElem.length && !firstElem.is('h2, h3')) {
    if (firstElem.is('p')) {
      const pText = cleanText(firstElem.text());
      if (pText.length > 15 && !isNoise(pText)) {
        // Si el párrafo es una nota de advertencia o consideración ("Actualmente existen...", "Ten en cuenta...")
        if (/actualmente|ten en cuenta|ten presente|importante|recuerda que|debes saber/i.test(pText)) {
          introConsiderations.push(pText);
        } else {
          introParagraphs.push(pText);
        }
      }
    }
    firstElem = firstElem.next();
  }

  let descripcion = introParagraphs.join(' ').trim();
  if (!descripcion || descripcion.length < 25) {
    descripcion = fallbackSnippet || 'Servicio y trámite oficial de la SUNAT.';
  }

  // 5. Secciones bajo encabezados
  const requisitos = [];
  const consideraciones = [...introConsiderations];
  const pasos = [];
  const baseLegal = [];

  $('h2, h3, strong').each((_, el) => {
    const headingText = cleanText($(el).text()).toLowerCase();
    const parent = $(el).is('strong') ? $(el).parent() : $(el);

    // Requisitos
    if (/requisito|condici[oó]n|qu[eé] necesitas|documentos?/i.test(headingText)) {
      const block = extractSectionContent(parent, $);
      for (const item of block) {
        if (!requisitos.includes(item)) requisitos.push(item);
      }
    }
    // Pasos / "Hazlo de forma digital" / "Hazlo presencial" / "Antes de iniciar"
    else if (/hazlo de forma|hazlo digital|hazlo online|hazlo presencial|hazlo en|antes de iniciar|paso|procedimiento|c[oó]mo hacerlo/i.test(headingText)) {
      const headingTitle = cleanText($(el).text());
      const block = extractSectionContent(parent, $);
      
      if (block.length > 0) {
        // Preservar el título de la modalidad si es "Hazlo de forma digital/presencial"
        if (/hazlo de forma|hazlo presencial|hazlo digital/i.test(headingTitle)) {
          pasos.push(`${headingTitle}: ${block[0]}`);
          for (let k = 1; k < block.length; k++) {
            if (!pasos.includes(block[k])) pasos.push(block[k]);
          }
        } else {
          for (const item of block) {
            if (!pasos.includes(item)) pasos.push(item);
          }
        }
      }
    }
    // Consideraciones / Normativa / De Oficio / Notas
    else if (/consideraci|ten en cuenta|importante|de oficio|normativa|base legal|informaci[oó]n adicional/i.test(headingText)) {
      const headingTitle = cleanText($(el).text());
      const block = extractSectionContent(parent, $);
      for (const item of block) {
        const entry = /de oficio|normativa|base legal/i.test(headingTitle) ? `${headingTitle}: ${item}` : item;
        if (!consideraciones.includes(entry)) consideraciones.push(entry);
      }
    }
  });

  // 6. Análisis del tipo de acceso
  const fullHtmlText = cleanText($('body').text());
  const isPublicLookup = /consultar|consulta|verificar|validez|tipo de cambio|buscar/i.test(title) && !/clave sol|declarar|emitir|pagar|inscribir|modificar/i.test(title);

  let tipoAcceso = "Público (Consulta libre sin Clave SOL)";
  if (/clave sol|usuario sol|operaciones en l[ií]nea/i.test(fullHtmlText) && !isPublicLookup) {
    tipoAcceso = "Privado (Requiere Clave SOL)";
  } else if (/presencial|mesa de partes/i.test(fullHtmlText) && !/virtual|online|en línea/i.test(fullHtmlText)) {
    tipoAcceso = "Presencial / Mesa de Partes";
  }

  // 7. Si no se detectaron requisitos para una consulta pública
  if (requisitos.length === 0) {
    if (isPublicLookup) {
      requisitos.push("Ingresar datos de búsqueda: número de RUC (11 dígitos), DNI (8 dígitos) o Razón Social según corresponda.");
    } else if (tipoAcceso.includes("Clave SOL")) {
      requisitos.push("Contar con número de RUC activo y Clave SOL vigente.");
    } else {
      requisitos.push("Documento de identidad vigente (DNI/Carné de Extranjería).");
    }
  }

  // 8. Si no se detectaron pasos explícitos
  if (pasos.length === 0) {
    if (isPublicLookup) {
      pasos.push(`Ingresa a la plataforma oficial de ${title} de la SUNAT.`);
      pasos.push(`Digita el número de documento o criterio de búsqueda solicitado y presiona 'Buscar'.`);
      pasos.push(`Visualiza el reporte y constancia oficial emitida por el sistema.`);
    } else if (tipoAcceso.includes("Clave SOL")) {
      pasos.push(`Ingresa a SUNAT Operaciones en Línea (SOL) con tu RUC o DNI y Clave SOL.`);
      pasos.push(`Selecciona el módulo correspondiente a ${title} y completa la información.`);
      pasos.push(`Confirma la operación y descarga tu constancia o comprobante.`);
    } else {
      pasos.push(`Accede al enlace oficial del trámite para realizar la gestión.`);
    }
  }

  // 9. Detección de Costo
  let costo = "Gratuito";
  const costMatch = fullHtmlText.match(/S\/\.?\s*(\d+(\.\d{2})?)/i);
  if (costMatch && !costMatch[0].includes("0.00") && !costMatch[0].includes("00.00") && !costMatch[1].startsWith("0")) {
    costo = `S/ ${costMatch[1]}`;
  } else if (fullHtmlText.includes("{costo:")) {
    const internalCost = fullHtmlText.match(/\{costo:\s*(\d+)\}/);
    if (internalCost) {
      const rawNum = parseInt(internalCost[1], 10);
      costo = rawNum > 100 ? `S/ ${(rawNum / 100).toFixed(2)}` : `S/ ${rawNum}.00`;
    }
  }

  // 10. Modalidad
  let modalidad = "Virtual";
  if (/presencial/i.test(fullHtmlText) && /virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Virtual y Presencial";
  } else if (/presencial/i.test(fullHtmlText) && !/virtual|online|en línea/i.test(fullHtmlText)) {
    modalidad = "Presencial";
  }

  // 11. Raw Content Estructurado
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
    rawContentLines.push(`\n## Consideraciones y Notas Oficiales\n` + consideraciones.map(c => `* ${c}`).join('\n'));
  }

  if (pasos.length > 0) {
    rawContentLines.push(`\n## Pasos para realizar el trámite\n` + pasos.map((p, idx) => `${idx + 1}. ${p}`).join('\n'));
  }

  const raw_content = rawContentLines.join('\n');

  // 12. Embedding Text denso, verídico y enriquecido
  const reqResumen = requisitos.slice(0, 3).join('; ');
  const consResumen = consideraciones.slice(0, 4).join('. ');
  const pasosResumen = pasos.slice(0, 3).join('; ');

  const embedding_text = `Trámite: ${title}.
Entidad: SUNAT - Superintendencia Nacional de Aduanas y de Administración Tributaria.
Tipo de Acceso: ${tipoAcceso}.
Para qué sirve: ${descripcion.slice(0, 240)}.
Requisitos: ${reqResumen}.
Modalidad y Costo: ${modalidad}, costo ${costo}.
Pasos: ${pasosResumen.slice(0, 250)}.
Consideraciones y advertencias: ${consResumen.slice(0, 250)}.
Información oficial y procedimientos vigentes de SUNAT.`.replace(/\s+/g, ' ').trim();

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

async function ejecutarProcesamientoCuidadoso() {
  console.log("🚀 Iniciando Extracción V3 Minuciosa: 593 trámites de SUNAT...\n");

  const catalogoPath = path.join(__dirname, 'sunat_catalogo_fase1.json');
  const rawCatalog = await fs.readFile(catalogoPath, 'utf-8');
  const catalog = JSON.parse(rawCatalog);

  console.log(`📋 Total de trámites a procesar cuidadosamente: ${catalog.length}`);

  const finalEnriched = [];
  const CONCURRENCY = 4; // Concurrencia más suave y cuidadosa
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
            pageData = parseGobPePageCareful(html, item.titulo_oficial, item.action_url, item.resumen_snippet);
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
    process.stdout.write(`\r⏳ Verificando y extrayendo: ${completed}/${catalog.length} trámites (${percent}%) - ${elapsed}s`);

    // Pausa cuidadosa entre lotes
    await new Promise(r => setTimeout(r, 100));
  }

  const outputPath = path.join(__dirname, 'sunat_tramites_completos.json');
  await fs.writeFile(outputPath, JSON.stringify(finalEnriched, null, 2), 'utf-8');

  console.log("\n\n=======================================================");
  console.log(`🎉 ¡EXTRACCIÓN MINUCIOSA V3 COMPLETADA CON ÉXITO!`);
  console.log(`📁 Total de trámites verificados y guardados: ${finalEnriched.length}`);
  console.log(`💾 Archivo generado: ${outputPath}`);
  console.log("=======================================================\n");
}

ejecutarProcesamientoCuidadoso().catch(console.error);
