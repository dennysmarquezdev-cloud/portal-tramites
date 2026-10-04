async function testLiveApi() {
  console.log("🧪 Probando API de LOTA AI en Producción...");
  const WORKER_URL = 'https://ahorratiempo-scraper.ahorratiempo.workers.dev';

  const res = await fetch(`${WORKER_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: '¿Cómo obtengo mi pasaporte electrónico en Migraciones y cuál es el costo?' }],
      selectedEntity: 'MIGRACIONES'
    })
  });

  console.log(`📡 Status: ${res.status} ${res.statusText}`);
  const debugHeader = res.headers.get("X-Frutilota-Debug");
  if (debugHeader) {
    try {
      console.log("🧠 Debug:", JSON.parse(atob(debugHeader)));
    } catch(e) {}
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let receivedLinks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ") && line !== "data: [DONE]") {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.officialLinks) receivedLinks = data.officialLinks;
          if (data.response) fullText += data.response;
        } catch(e) {}
      }
    }
  }

  console.log("\n--- ENLACES OFICIALES VERIFICADOS RECIBIDOS ---");
  console.log(receivedLinks);
  console.log("\n--- RESPUESTA STREAMING DE LOTA AI ---");
  console.log(fullText.slice(0, 500) + "...\n");
}

testLiveApi().catch(console.error);
