import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalize(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

async function testScopedSearch() {
  console.log("==================================================================");
  console.log("🧪 TEST DE BÚSQUEDA NORMALIZADA Y CONTEXTUAL POR ENTIDAD");
  console.log("==================================================================\n");

  const catalogPath = path.join(__dirname, '..', 'src', 'app', 'data', 'multi_entidades_catalogo.json');
  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf-8'));

  const testQueries = [
    { entity: "RENIEC", query: "duplicado DNI" },
    { entity: "RENIEC", query: "renovacion dni caducidad" },
    { entity: "MIGRACIONES", query: "pasaporte electronico" },
    { entity: "SUNAT", query: "clave sol" },
    { entity: "SUNAT", query: "recibo por honorarios" },
    { entity: "SUNARP", query: "consulta vehicular" },
    { entity: "SUNARP", query: "copia literal" },
    { entity: "SBS", query: "reporte de deudas" },
    { entity: "ESSALUD", query: "acreditacion seguro" },
    { entity: "SIS", query: "afiliacion seguro" },
    { entity: "SUNAFIL", query: "denuncia laboral" },
    { entity: "ONP", query: "pension jubilacion" },
    { entity: "MTC", query: "licencia conducir brevete" },
    { entity: "MTC", query: "record conductor" },
    { entity: "SUNEDU", query: "grados titulos" },
    { entity: "PRONABEC", query: "beca 18" },
    { entity: "INDECOPI", query: "reclamos libro reclamaciones" },
    { entity: "OSIPTEL", query: "checa tu imei" },
    { entity: "OSINERGMIN", query: "facilito combustible gas" },
    { entity: "SEDAPAL", query: "recibo agua" },
    { entity: "PODER JUDICIAL", query: "antecedentes penales" },
    { entity: "PNP", query: "antecedentes policiales" },
    { entity: "ONPE", query: "miembro mesa" },
    { entity: "JNE", query: "multas electorales" },
    { entity: "INDECI", query: "mochila emergencia" },
    { entity: "OEFA", query: "denuncia ambiental" }
  ];

  let passed = 0;

  for (const t of testQueries) {
    const normEntity = normalize(t.entity);
    const qTokens = normalize(t.query).split(/\s+/);

    const matches = catalog.filter(item => {
      const matchEntity = normalize(item.entidad).includes(normEntity) || normalize(item.entidad_nombre || '').includes(normEntity);
      if (!matchEntity) return false;
      const fullText = normalize(`${item.titulo_oficial} ${item.descripcion} ${item.raw_content}`);
      return qTokens.every(tok => fullText.includes(tok));
    });

    const top = matches[0];
    console.log(`🔎 [${t.entity}] Query: "${t.query}"`);
    if (top) {
      console.log(`   ✅ Encontrado: "${top.titulo_oficial}"`);
      console.log(`   🔗 Enlace oficial: ${top.action_url || top.url}`);
      console.log(`   💰 Costo: ${top.costo} | Modalidad: ${top.modalidad}`);
      passed++;
    } else {
      console.log(`   ❌ No encontrado`);
    }
    console.log("------------------------------------------------------------------");
  }

  console.log(`\n📊 RESULTADO: ${passed}/${testQueries.length} pruebas superadas (${((passed / testQueries.length) * 100).toFixed(0)}% de precisión).`);
}

testScopedSearch().catch(console.error);
