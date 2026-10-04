async function reindexAllVectors() {
  console.log("🚀 Iniciando Reindexación Semántica de Embeddings en Cloudflare Vectorize...\n");
  
  const WORKER_URL = 'https://ahorratiempo-scraper.ahorratiempo.workers.dev/api/admin/reindex-vectors';
  let offset = 0;
  const limit = 25;
  let totalProcessed = 0;
  const startTime = Date.now();

  while (true) {
    process.stdout.write(`⏳ Sincronizando lote offset ${offset} (límite ${limit})... `);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offset, limit })
      });

      if (!res.ok) {
        const err = await res.text();
        console.log(`❌ Error (${res.status}): ${err}`);
        break;
      }

      const data = await res.json();
      const count = data.processed || 0;
      totalProcessed += count;
      console.log(`✅ (+${count} vectores generados | Total: ${totalProcessed})`);

      if (data.finished || count === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log("\n==================================================================");
        console.log(`🎉 ¡SINCRONIZACIÓN VECTORIAL MULTI-ENTIDAD COMPLETADA AL 100%!`);
        console.log(`🔢 Gran Total de Vectores en Cloudflare Vectorize: ${totalProcessed}`);
        console.log(`⏱️ Tiempo total: ${elapsed}s`);
        console.log("==================================================================\n");
        break;
      }

      offset = data.nextOffset;
      // Pausa respetuosa para el servicio de inferencia de embeddings en GPU
      await new Promise(r => setTimeout(r, 180));
    } catch (e) {
      console.log(`❌ Error de conexión: ${e.message}`);
      break;
    }
  }
}

reindexAllVectors().catch(console.error);
