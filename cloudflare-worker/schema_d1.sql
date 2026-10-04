-- ============================================================================
-- PROYECTO DE TESIS TECSUP: AhorraTiempo con LOTA AI
-- Base de Datos Serverless en Cloudflare D1 (SQLite Engine)
-- Archivo: schema_d1.sql
-- Descripción: Esquema DDL maestro para la creación de tablas, índices
--              y tabla virtual de búsqueda de texto completo (FTS5).
-- ============================================================================

-- 1. LIMPIEZA DE TABLAS PREVIAS (Para ejecuciones en limpio)
DROP TRIGGER IF EXISTS tramites_ai;
DROP TRIGGER IF EXISTS tramites_ad;
DROP TRIGGER IF EXISTS tramites_au;
DROP TABLE IF EXISTS tramites_fts;
DROP TABLE IF EXISTS tramites;

-- 2. TABLA PRINCIPAL: TRAMITES
-- Almacena el repositorio estructurado de procedimientos oficiales del Estado peruano (Gob.pe / SUNAT / RENIEC / etc.)
CREATE TABLE tramites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hash_id TEXT UNIQUE,                          -- Slug o hash identificador único
    titulo_oficial TEXT NOT NULL,                 -- Nombre oficial del trámite según Gob.pe
    entidad TEXT NOT NULL,                        -- Entidad del Estado (ej: SUNAT, RENIEC, MTC, etc.)
    category_id TEXT,                             -- Identificador de categoría (ej: emprender, conducir, etc.)
    url TEXT,                                     -- Enlace directo a la guía informativa en Gob.pe
    action_url TEXT,                              -- Enlace directo a la pasarela/formulario oficial en línea
    costo TEXT DEFAULT 'Gratuito',                -- Costo monetario oficial o indicación de gratuidad
    modalidad TEXT DEFAULT 'Virtual',             -- Modalidad de atención (Virtual / Presencial / Híbrida)
    url_fuente TEXT,                              -- Enlace a la fuente normativa o directiva institucional
    is_external INTEGER DEFAULT 0,                -- 1 si el trámite se realiza en portal externo, 0 si no
    is_top INTEGER DEFAULT 0,                     -- 1 si pertenece al catálogo de trámites más demandados
    texto_completo TEXT,                          -- Contenido procesado para generación de Embeddings
    raw_content TEXT,                             -- Documento técnico completo con descripción, requisitos y pasos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ÍNDICES DE RENDIMIENTO (Búsquedas relacionales rápidas en Cloudflare D1)
CREATE INDEX IF NOT EXISTS idx_tramites_entidad ON tramites(entidad);
CREATE INDEX IF NOT EXISTS idx_tramites_category ON tramites(category_id);
CREATE INDEX IF NOT EXISTS idx_tramites_is_top ON tramites(is_top);
CREATE INDEX IF NOT EXISTS idx_tramites_titulo ON tramites(titulo_oficial);

-- 4. TABLA VIRTUAL DE BÚSQUEDA DE TEXTO COMPLETO (FTS5)
-- Permite búsqueda léxica BM25 en milisegundos con soporte de prefijos y filtros por palabras clave
CREATE VIRTUAL TABLE tramites_fts USING fts5(
    titulo_oficial,
    raw_content,
    content='tramites',
    content_rowid='id'
);

-- 5. DISPARADORES (TRIGGERS) PARA SINCRONIZACIÓN AUTOMÁTICA DE FTS5
-- Trigger de Inserción: Mantiene actualizado el índice cuando se inserta un trámite
CREATE TRIGGER IF NOT EXISTS tramites_ai AFTER INSERT ON tramites BEGIN
  INSERT INTO tramites_fts(rowid, titulo_oficial, raw_content) 
  VALUES (new.id, new.titulo_oficial, new.raw_content);
END;

-- Trigger de Eliminación: Remueve el documento del índice FTS5 al eliminarse de la tabla principal
CREATE TRIGGER IF NOT EXISTS tramites_ad AFTER DELETE ON tramites BEGIN
  INSERT INTO tramites_fts(tramites_fts, rowid, titulo_oficial, raw_content) 
  VALUES('delete', old.id, old.titulo_oficial, old.raw_content);
END;

-- Trigger de Actualización: Actualiza el índice cuando se modifican campos de búsqueda
CREATE TRIGGER IF NOT EXISTS tramites_au AFTER UPDATE ON tramites BEGIN
  INSERT INTO tramites_fts(tramites_fts, rowid, titulo_oficial, raw_content) 
  VALUES('delete', old.id, old.titulo_oficial, old.raw_content);
  INSERT INTO tramites_fts(rowid, titulo_oficial, raw_content) 
  VALUES (new.id, new.titulo_oficial, new.raw_content);
END;

-- ============================================================================
-- COMANDOS ÚTILES PARA CLOUDFLARE WRANGLER CLI:
--
-- Crear base de datos remota:
--   npx wrangler d1 create ahorratiempo-db
--
-- Ejecutar este esquema localmente:
--   npx wrangler d1 execute ahorratiempo-db --local --file=./schema_d1.sql
--
-- Ejecutar este esquema en producción (Cloudflare Edge):
--   npx wrangler d1 execute ahorratiempo-db --remote --file=./schema_d1.sql
--
-- Reconstruir índice FTS5 manualmente tras una carga masiva:
--   INSERT INTO tramites_fts(tramites_fts) VALUES('rebuild');
-- ============================================================================
