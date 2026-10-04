import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  const stringified = String(str).replace(/'/g, "''");
  return `'${stringified}'`;
}

async function generateMultiSql() {
  console.log("🚀 Generando DDL y sentencias SQL para Cloudflare D1 desde multi_entidades_catalogo.json...");

  const dataPath = path.join(__dirname, '..', 'src', 'app', 'data', 'multi_entidades_catalogo.json');
  let rawData;
  try {
    rawData = await fs.readFile(dataPath, 'utf-8');
  } catch (err) {
    console.error("❌ No se encontró multi_entidades_catalogo.json todavía. Asegúrate de correr el crawler primero.");
    return;
  }

  const tramites = JSON.parse(rawData);
  console.log(`📋 Total de trámites cargados: ${tramites.length}`);

  const sqlStatements = [];

  sqlStatements.push(`-- ============================================================================`);
  sqlStatements.push(`-- BASE DE DATOS MAESTRA: CATÁLOGO MULTI-ENTIDAD (26+ ENTIDADES NACIONALES)`);
  sqlStatements.push(`-- Plataforma: AhorraTiempo.pe con LOTA AI (Cloudflare D1 SQLite Engine)`);
  sqlStatements.push(`-- Total Registros: ${tramites.length}`);
  sqlStatements.push(`-- ============================================================================\n`);

  sqlStatements.push(`-- 1. Limpieza de datos anteriores`);
  sqlStatements.push(`DELETE FROM tramites;`);
  sqlStatements.push(`DELETE FROM sqlite_sequence WHERE name='tramites';`);
  sqlStatements.push(`\n-- 2. Inserción de procedimientos oficiales por entidad`);

  let autoId = 1;
  const entityCountMap = {};

  for (const t of tramites) {
    const hashId = escapeSql(t.hash_id || `${t.entidad?.toLowerCase() || 'entidad'}_${t.id || autoId}`);
    const titulo = escapeSql(t.titulo_oficial || t.title);
    const entidad = escapeSql(t.entidad || 'ESTADO_PERUANO');
    const categoryId = escapeSql(t.category || 'General');
    const url = escapeSql(t.url || t.url_guia || '');
    const actionUrl = escapeSql(t.action_url || t.url || '');
    const costo = escapeSql(t.costo || 'Gratuito');
    const modalidad = escapeSql(t.modalidad || 'En línea (Virtual)');
    const urlFuente = escapeSql(t.url || '');
    const isExternal = t.action_url && !t.action_url.includes('gob.pe') ? 1 : 0;
    const isTop = (autoId <= 30) ? 1 : 0;
    const textoCompleto = escapeSql(t.embedding_text || `${t.titulo_oficial}. ${t.descripcion}`);
    const rawContent = escapeSql(t.raw_content || `# ${t.titulo_oficial}\n${t.descripcion}`);

    sqlStatements.push(
      `INSERT INTO tramites (id, hash_id, titulo_oficial, entidad, category_id, url, action_url, costo, modalidad, url_fuente, is_external, is_top, texto_completo, raw_content) VALUES (${autoId}, ${hashId}, ${titulo}, ${entidad}, ${categoryId}, ${url}, ${actionUrl}, ${costo}, ${modalidad}, ${urlFuente}, ${isExternal}, ${isTop}, ${textoCompleto}, ${rawContent});`
    );

    entityCountMap[t.entidad] = (entityCountMap[t.entidad] || 0) + 1;
    autoId++;
  }

  // 3. Reconstruir índice FTS5
  sqlStatements.push(`\n-- 3. Reconstrucción del índice de búsqueda rápida FTS5`);
  sqlStatements.push(`INSERT INTO tramites_fts(tramites_fts) VALUES('rebuild');`);

  const sqlFilePath = path.join(__dirname, 'multi_entidades_d1.sql');
  await fs.writeFile(sqlFilePath, sqlStatements.join('\n'), 'utf-8');

  console.log(`\n==================================================================`);
  console.log(`✅ Archivo SQL generado exitosamente: ${sqlFilePath}`);
  console.log(`📊 Sentencias SQL generadas: ${sqlStatements.length}`);
  console.log(`==================================================================\n`);

  console.table(
    Object.entries(entityCountMap).map(([entidad, count]) => ({
      Entidad: entidad,
      Total_Trámites: count
    }))
  );
}

generateMultiSql().catch(console.error);
