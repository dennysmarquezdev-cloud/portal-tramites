import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testSearch() {
  console.log("==================================================================");
  console.log("🧪 TEST DE BÚSQUEDA Y CALIDAD DE DATOS MULTI-ENTIDAD");
  console.log("==================================================================\n");

  const catalogPath = path.join(__dirname, '..', 'src', 'app', 'data', 'multi_entidades_catalogo.json');
  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf-8'));

  const testQueries = [
    { query: "duplicado de DNI", expectedEntity: "RENIEC" },
    { query: "pasaporte biometrico", expectedEntity: "MIGRACIONES" },
    { query: "clave sol", expectedEntity: "SUNAT" },
    { query: "consulta vehicular", expectedEntity: "SUNARP" },
    { query: "reporte de deudas", expectedEntity: "SBS" },
    { query: "donde me atiendo", expectedEntity: "ESSALUD" },
    { query: "afiliacion SIS", expectedEntity: "SIS" },
    { query: "denuncia laboral", expectedEntity: "SUNAFIL" },
    { query: "pension de jubilacion", expectedEntity: "ONP" },
    { query: "licencia de conducir", expectedEntity: "MTC" },
    { query: "record del conductor", expectedEntity: "MTC" },
    { query: "grados y titulos", expectedEntity: "SUNEDU" },
    { query: "beca 18", expectedEntity: "PRONABEC" },
    { query: "reclama virtual", expectedEntity: "INDECOPI" },
    { query: "checa tu imei", expectedEntity: "OSIPTEL" },
    { query: "balon de gas facilito", expectedEntity: "OSINERGMIN" },
    { query: "recibo de agua", expectedEntity: "SEDAPAL" },
    { query: "antecedentes penales", expectedEntity: "PODER JUDICIAL" },
    { query: "antecedentes policiales", expectedEntity: "PNP" },
    { query: "miembro de mesa", expectedEntity: "ONPE" },
    { query: "multas electorales", expectedEntity: "JNE" },
    { query: "mochila de emergencia", expectedEntity: "INDECI" },
    { query: "denuncia ambiental", expectedEntity: "OEFA" }
  ];

  let passed = 0;

  for (const t of testQueries) {
    const qTokens = t.query.toLowerCase().split(/\s+/);
    const matches = catalog.filter(item => {
      const fullText = `${item.titulo_oficial} ${item.descripcion} ${item.entidad}`.toLowerCase();
      return qTokens.every(tok => fullText.includes(tok));
    });

    const top = matches[0];
    const ok = top && (top.entidad.toUpperCase() === t.expectedEntity.toUpperCase() || top.entidad_nombre?.toUpperCase().includes(t.expectedEntity.toUpperCase()));

    console.log(`🔎 Query: "${t.query}" (Esperado: ${t.expectedEntity})`);
    if (top) {
      console.log(`   👉 Encontrado [${top.entidad}]: "${top.titulo_oficial}"`);
      console.log(`   🔗 Enlace oficial: ${top.action_url || top.url}`);
      console.log(`   💰 Costo: ${top.costo} | Modalidad: ${top.modalidad}`);
    } else {
      console.log(`   ❌ No se encontraron coincidencias exactas.`);
    }

    if (ok) passed++;
    console.log("------------------------------------------------------------------");
  }

  console.log(`\n📊 RESULTADO: ${passed}/${testQueries.length} pruebas superadas (${((passed / testQueries.length) * 100).toFixed(0)}% de precisión).`);
}

testSearch().catch(console.error);
