import { execSync } from 'child_process';

const rawContent = `
# Entidad: SUNAT
## Trámite: Consultar el estado del RUC

Si necesitas saber el estado de un número de Registro Único de Contribuyentes (RUC), para saber si está Activo o de Baja, puedes hacerlo a través de la web de la Sunat de forma gratuita.
El estado del RUC te indicará si la empresa o persona puede realizar sus actividades económicas de forma regular.

### Requisitos
- Solo necesitas conocer el número de RUC que deseas consultar (11 dígitos).
- También puedes buscar por Nombre/Razón Social o Documento de Identidad.

### Modalidad: Online
1. Ingresa a la plataforma e-Consulta RUC de la SUNAT (e-consultaruc.sunat.gob.pe).
2. Selecciona la opción de búsqueda: Por número de RUC, por Documento (DNI/CE) o por Nombre/Razón Social.
3. Ingresa los datos correspondientes.
4. Resuelve el Captcha si te lo pide.
5. Haz clic en "Buscar".
6. Podrás ver en la pantalla los detalles y el "Estado del Contribuyente" (Ej: ACTIVO).

### Costo
Este trámite es 100% gratuito.
`;

const insertTramite = "INSERT OR REPLACE INTO tramites (id, titulo_oficial, url, entidad, is_top, category_id, raw_content) VALUES ('ruc_consulta', 'Consultar el estado del RUC', 'https://e-consultaruc.sunat.gob.pe/', 'SUNAT', 1, 'emprender', '" + rawContent.replace(/'/g, "''").replace(/\n/g, "\\n") + "');";
const insertFts = "INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, raw_content) VALUES ('ruc_consulta', 'Consultar el estado del RUC', '" + rawContent.replace(/'/g, "''").replace(/\n/g, "\\n") + "');";

try {
  console.log("Inyectando a D1 local...");
  execSync('npx wrangler d1 execute ahorratiempo-db --local --command="' + insertTramite + '"');
  execSync('npx wrangler d1 execute ahorratiempo-db --local --command="' + insertFts + '"');
  console.log("¡Inyección exitosa!");
} catch (e) {
  console.error(e.toString());
}
