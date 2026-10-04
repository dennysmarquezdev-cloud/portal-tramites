import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSql(str) {
  if (!str) return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

async function main() {
  console.log("🚀 Generando archivo SQL para Cloudflare D1 desde sunat_tramites_completos.json...");

  const dataPath = path.join(__dirname, 'sunat_tramites_completos.json');
  const rawData = await fs.readFile(dataPath, 'utf-8');
  const tramites = JSON.parse(rawData);

  console.log(`📋 Total de trámites a procesar: ${tramites.length}`);

  let sqlStatements = [];
  sqlStatements.push("-- Limpiar y resetear tablas de trámites");
  sqlStatements.push("DELETE FROM tramites;");
  sqlStatements.push("DELETE FROM sqlite_sequence WHERE name='tramites';");

  for (const t of tramites) {
    const id = parseInt(t.id, 10) || null;
    const idValue = id ? id : 'NULL';
    const titulo = escapeSql(t.titulo_oficial);
    const url = escapeSql(t.url_guia);
    const entidad = "'SUNAT'";
    const textoCompleto = escapeSql(t.embedding_text);
    const rawContent = escapeSql(t.raw_content);
    const costo = escapeSql(t.costo || 'Gratuito');
    const actionUrl = t.action_url ? escapeSql(t.action_url) : "NULL";

    sqlStatements.push(
      `INSERT INTO tramites (id, titulo_oficial, url, entidad, texto_completo, raw_content, costo, action_url) VALUES (${idValue}, ${titulo}, ${url}, ${entidad}, ${textoCompleto}, ${rawContent}, ${costo}, ${actionUrl});`
    );
  }

  // Reconstruir índice FTS5
  sqlStatements.push("\n-- Reconstruir índice de búsqueda rápida FTS5");
  sqlStatements.push("INSERT INTO tramites_fts(tramites_fts) VALUES('rebuild');");

  const sqlFilePath = path.join(__dirname, 'fase3_populate_d1.sql');
  await fs.writeFile(sqlFilePath, sqlStatements.join('\n'), 'utf-8');

  console.log(`✅ Archivo SQL generado exitosamente: ${sqlFilePath}`);
  console.log(`📊 Sentencias SQL generadas: ${sqlStatements.length}`);
}

main().catch(console.error);
