DROP TABLE IF EXISTS tramites_fts;
DROP TABLE IF EXISTS tramites;

CREATE TABLE tramites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hash_id TEXT UNIQUE,
    titulo_oficial TEXT NOT NULL,
    entidad TEXT NOT NULL,
    category_id TEXT,
    url TEXT,
    is_external INTEGER DEFAULT 0,
    is_top INTEGER DEFAULT 0,
    raw_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIRTUAL TABLE tramites_fts USING fts5(
    titulo_oficial,
    raw_content,
    content='tramites',
    content_rowid='id'
);

INSERT INTO tramites (id, hash_id, titulo_oficial, url, entidad, is_top, category_id, raw_content)
VALUES (
    1,
    'ruc_consulta', 
    'Consultar el estado de mi RUC', 
    'https://e-consultaruc.sunat.gob.pe/', 
    'SUNAT', 
    1, 
    'emprender', 
    '
# Entidad: SUNAT
## Trámite: Consultar el estado de mi RUC

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
'
);

INSERT INTO tramites_fts (rowid, titulo_oficial, raw_content)
SELECT id, titulo_oficial, raw_content FROM tramites WHERE id = 1;
