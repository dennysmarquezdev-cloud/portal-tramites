async function reindexAll() {
  console.log("🚀 Sincronizando Cloudflare Vectorize con los 593 trámites de D1...\n");
  let offset = 0;
  const limit = 25;
  let totalProcessed = 0;

  while (true) {
    process.stdout.write(`⏳ Procesando lote offset ${offset}... `);
    try {
      const res = await fetch('https://ahorratiempo-scraper.ahorratiempo.workers.dev/api/admin/reindex-vectors', {
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
      totalProcessed += data.processed || 0;
      console.log(`✅ (+${data.processed} vectores | total: ${totalProcessed}/593)`);

      if (data.finished || data.processed === 0) {
        console.log("\n=======================================================");
        console.log(`🎉 ¡SINCRONIZACIÓN VECTORIAL COMPLETADA AL 100%!`);
        console.log(`🔢 Total de vectores generados en Vectorize: ${totalProcessed}`);
        console.log("=======================================================\n");
        break;
      }

      offset = data.nextOffset;
      await new Promise(r => setTimeout(r, 150));
    } catch (e) {
      console.log(`❌ Error de conexión: ${e.message}`);
      break;
    }
  }
}

reindexAll();
