import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function splitSql() {
  const sqlPath = path.join(__dirname, 'multi_entidades_d1.sql');
  const chunksDir = path.join(__dirname, 'sql_chunks');
  await fs.mkdir(chunksDir, { recursive: true });

  const raw = await fs.readFile(sqlPath, 'utf-8');
  const lines = raw.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('--'));

  const CHUNK_SIZE = 150;
  let chunkIndex = 1;

  for (let i = 0; i < lines.length; i += CHUNK_SIZE) {
    const chunkLines = lines.slice(i, i + CHUNK_SIZE);
    const chunkFile = path.join(chunksDir, `chunk_${String(chunkIndex).padStart(3, '0')}.sql`);
    await fs.writeFile(chunkFile, chunkLines.join('\n'), 'utf-8');
    chunkIndex++;
  }

  console.log(`✅ SQL dividido en ${chunkIndex - 1} partes de ${CHUNK_SIZE} sentencias cada una en: ${chunksDir}`);
}

splitSql().catch(console.error);
