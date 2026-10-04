// Node 22 native fetch

const API_ENDPOINT = 'https://ahorratiempo-scraper.ahorratiempo.workers.dev/api/ai/chat';

const TEST_SCENARIOS = [
  {
    id: 1,
    category: 'Consultas Públicas de Libre Acceso (Sin Clave SOL)',
    query: '¿Cómo puedo consultar un número de RUC para saber si está activo y habido?',
    expectedType: 'Público',
    expectedKeywords: ['activo', 'habido', 'consultar', 'gratuito']
  },
  {
    id: 2,
    category: 'Trámites Transaccionales con Clave SOL (4ta Categoría)',
    query: '¿Cómo emitir un recibo por honorarios electrónico?',
    expectedType: 'Privado (Requiere Clave SOL)',
    expectedKeywords: ['clave sol', 'cuarta categoría', 'contado', 'crédito', 'xml', 'pdf']
  },
  {
    id: 3,
    category: 'Solicitudes y Formularios Específicos (Suspensión 4ta)',
    query: '¿Cómo solicitar la suspensión de retenciones de cuarta categoría con el Formulario 1609?',
    expectedType: 'Clave SOL',
    expectedKeywords: ['formulario', '1609', 'suspensión', 'retenciones']
  },
  {
    id: 4,
    category: 'Inscripción y Acceso Digital (Nuevos Contribuyentes)',
    query: '¿Cómo obtener mi Clave SOL por internet?',
    expectedType: 'Clave SOL / Identidad',
    expectedKeywords: ['dni', 'clave sol', 'app personas', 'virtual']
  },
  {
    id: 5,
    category: 'Preguntas Coloquiales con Jerga Ciudadana Peruana',
    query: 'Quiero chambear como freelance independiente y me piden recibo por honorarios, ¿qué necesito hacer primero?',
    expectedType: 'Orientación Integral',
    expectedKeywords: ['ruc', 'clave sol', 'cuarta categoría', 'emitir']
  }
];

async function runE2ETests() {
  console.log('========================================================================');
  console.log('🧪 INICIANDO BATERÍA DE PRUEBAS END-TO-END (E2E) - FRUTILOTA AI');
  console.log('========================================================================\n');

  const results = [];

  for (const scenario of TEST_SCENARIOS) {
    console.log(`------------------------------------------------------------------------`);
    console.log(`📌 ESCENARIO ${scenario.id}: ${scenario.category}`);
    console.log(`🗣️ Pregunta del Ciudadano: "${scenario.query}"`);

    const start = Date.now();
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: scenario.query }],
          selectedEntity: 'SUNAT'
        })
      });

      const elapsed = Date.now() - start;
      const rawText = await res.text();
      let responseBody = '';
      let officialLinks = [];

      const match = rawText.match(/data: (.*)/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]);
          responseBody = parsed.response || '';
          officialLinks = parsed.officialLinks || [];
        } catch (e) {
          responseBody = rawText;
        }
      } else {
        responseBody = rawText;
      }

      // Validaciones de Calidad
      const hasDescripcion = /descripci[oó]n/i.test(responseBody);
      const hasRequisitos = /requisito/i.test(responseBody);
      const hasConsideraciones = /consideraci[oó]n|importante|advertencia|nota/i.test(responseBody);
      const hasPasos = /paso/i.test(responseBody);
      const hasOfficialButtons = officialLinks.length > 0;
      const hasBrokenUrls = /http:\/\/localhost|undefined|null/i.test(responseBody);

      console.log(`⏱️ Tiempo de Respuesta: ${elapsed} ms`);
      console.log(`📊 Chequeos de Estructura:`);
      console.log(`   - ¿Tiene Descripción?: ${hasDescripcion ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   - ¿Tiene Requisitos?: ${hasRequisitos ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   - ¿Tiene Consideraciones / Notas?: ${hasConsideraciones ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   - ¿Tiene Pasos detallados?: ${hasPasos ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   - ¿Botones Oficiales Interactivos?: ${hasOfficialButtons ? `✅ SÍ (${officialLinks.length} botón/es)` : '❌ NO'}`);
      console.log(`   - ¿Cero URLs rotas en texto?: ${!hasBrokenUrls ? '✅ CUMPLE' : '❌ FALLÓ'}`);

      if (officialLinks.length > 0) {
        console.log(`🔘 Botones generados:`);
        officialLinks.forEach((link, idx) => {
          console.log(`     [${idx + 1}] ${link.title} ➔ ${link.url_tramite || link.url_referencia}`);
        });
      }

      console.log(`\n💬 Extracto de la Respuesta:\n${responseBody.slice(0, 320)}...\n`);

      results.push({
        id: scenario.id,
        category: scenario.category,
        query: scenario.query,
        elapsed,
        hasDescripcion,
        hasRequisitos,
        hasConsideraciones,
        hasPasos,
        buttonsCount: officialLinks.length,
        status: (hasDescripcion && hasRequisitos && hasPasos && hasOfficialButtons) ? 'APROBADO' : 'OBSERVADO'
      });
    } catch (err) {
      console.error(`❌ Error en Escenario ${scenario.id}:`, err.message);
      results.push({ id: scenario.id, status: 'ERROR', error: err.message });
    }
  }

  console.log('========================================================================');
  console.log('📋 TABLA RESUMEN DE RESULTADOS E2E');
  console.log('========================================================================');
  console.table(results);
}

runE2ETests().catch(console.error);
