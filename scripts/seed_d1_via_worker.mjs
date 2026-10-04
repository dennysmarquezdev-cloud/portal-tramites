import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedD1ViaWorker() {
  console.log("==================================================================");
  console.log("🚀 CARGADOR MAESTRO DE BASE DE DATOS CLOUDFLARE D1");
  console.log("==================================================================\n");

  const WORKER_URL = 'https://ahorratiempo-scraper.ahorratiempo.workers.dev';
  const dataPath = path.join(__dirname, '..', 'src', 'app', 'data', 'multi_entidades_catalogo.json');
  
  const raw = await fs.readFile(dataPath, 'utf-8');
  const catalog = JSON.parse(raw);
  console.log(`📋 Total de trámites a transferir a D1: ${catalog.length}\n`);

  // 1. Limpiar base de datos previa
  process.stdout.write("🧹 1. Limpiando registros anteriores en D1... ");
  try {
    const clearRes = await fetch(`${WORKER_URL}/api/admin/clear-db`, { method: 'POST' });
    if (clearRes.ok) {
      console.log("✅ Listo.");
    } else {
      console.log("⚠️ (Continuando con inserciones)");
    }
  } catch (e) {
    console.log(`⚠️ Error al limpiar: ${e.message}`);
  }

  // 2. Transferir en lotes de 50 trámites (Límite seguro de batch en D1)
  const BATCH_SIZE = 50;
  const totalBatches = Math.ceil(catalog.length / BATCH_SIZE);
  let totalInserted = 0;
  const startTime = Date.now();

  console.log(`\n📦 2. Enviando ${totalBatches} lotes a Cloudflare D1...`);

  for (let i = 0; i < catalog.length; i += BATCH_SIZE) {
    const chunk = catalog.slice(i, i + BATCH_SIZE);
    const isLast = (i + BATCH_SIZE) >= catalog.length;
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    process.stdout.write(`⏳ Lote ${batchNum}/${totalBatches} (${chunk.length} trámites)... `);

    try {
      const res = await fetch(`${WORKER_URL}/api/admin/import-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tramites: chunk,
          rebuildFTS: isLast // Reconstruir FTS5 solo en el último lote
        })
      });

      if (!res.ok) {
        const err = await res.text();
        console.log(`❌ Error: ${err}`);
        continue;
      }

      const data = await res.json();
      totalInserted += data.imported || 0;
      console.log(`✅ (+${data.imported} | total: ${totalInserted}/${catalog.length}) ${isLast ? '⚡ [FTS5 Reconstruido]' : ''}`);

      await new Promise(r => setTimeout(r, 80));
    } catch (err) {
      console.log(`❌ Error de conexión: ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n==================================================================");
  console.log(`🎉 ¡BASE DE DATOS D1 CARGADA CON ÉXITO AL 100%!`);
  console.log(`📊 Gran Total de Trámites en D1: ${totalInserted}`);
  console.log(`⏱️ Tiempo total: ${elapsed}s`);
  console.log("==================================================================\n");
}

seedD1ViaWorker().catch(console.error);
