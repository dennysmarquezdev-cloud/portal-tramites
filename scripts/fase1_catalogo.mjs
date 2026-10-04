import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ejecutarFase1() {
  console.log("🚀 Iniciando FASE 1: Descarga del catálogo oficial de trámites de SUNAT...");
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json'
  };

  // 1. Obtener primera página para conocer total_count
  const initialUrl = 'https://www.gob.pe/busquedas.json?contenido=servicios&institucion[]=sunat&sheet=1';
  console.log(`📡 Consultando API de Gob.pe: ${initialUrl}`);
  
  const initRes = await fetch(initialUrl, { headers });
  if (!initRes.ok) {
    throw new Error(`Error en petición inicial: ${initRes.status} ${initRes.statusText}`);
  }
  
  const initData = await initRes.json();
  const totalCount = initData.data?.attributes?.total_count || 595;
  const itemsPerPage = initData.data?.attributes?.results?.length || 25;
  const totalSheets = Math.ceil(totalCount / itemsPerPage);

  console.log(`📊 Total de trámites oficiales de SUNAT detectados: ${totalCount}`);
  console.log(`📑 Total de páginas (sheets) a descargar: ${totalSheets}`);

  const catalog = [];
  const seenIds = new Set();

  for (let sheet = 1; sheet <= totalSheets; sheet++) {
    const pageUrl = `https://www.gob.pe/busquedas.json?contenido=servicios&institucion[]=sunat&sheet=${sheet}`;
    process.stdout.write(`⏳ Descargando página ${sheet}/${totalSheets}... `);

    try {
      const res = await fetch(pageUrl, { headers });
      if (!res.ok) {
        console.log(`❌ Error status ${res.status}`);
        continue;
      }

      const json = await res.json();
      const results = json.data?.attributes?.results || [];

      let addedCount = 0;
      for (const item of results) {
        if (item.id && !seenIds.has(String(item.id))) {
          seenIds.add(String(item.id));

          // Extraer URL relativa limpia del enlace
          let relativeUrl = '';
          if (item.url) {
            const matchHref = item.url.match(/href="([^"]+)"/);
            relativeUrl = matchHref ? matchHref[1] : '';
          }

          catalog.push({
            id: String(item.id),
            titulo_oficial: (item.name_with_parent || '').trim(),
            entidad: "SUNAT",
            url_guia: relativeUrl.startsWith('http') ? relativeUrl : `https://www.gob.pe${relativeUrl}`,
            action_url: item.action_url || null,
            resumen_snippet: (item.content || '').replace(/\s+/g, ' ').trim()
          });
          addedCount++;
        }
      }
      console.log(`✅ (+${addedCount} trámites)`);
      
      // Pequeña pausa de cortesía para el servidor
      await new Promise(r => setTimeout(r, 120));
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }

  const outputPath = path.join(__dirname, 'sunat_catalogo_fase1.json');
  await fs.writeFile(outputPath, JSON.stringify(catalog, null, 2), 'utf-8');

  console.log("\n=======================================================");
  console.log(`🎉 ¡FASE 1 COMPLETADA CON ÉXITO!`);
  console.log(`📁 Total de trámites únicos guardados: ${catalog.length}`);
  console.log(`💾 Archivo generado: ${outputPath}`);
  console.log("=======================================================\n");
}

ejecutarFase1().catch(err => {
  console.error("❌ Error general en la Fase 1:", err);
});
