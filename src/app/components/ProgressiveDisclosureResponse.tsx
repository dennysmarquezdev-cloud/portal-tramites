import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  SparkleRegular, 
  WarningRegular, 
  ArrowClockwiseRegular, 
  ArrowRightRegular,
  CheckmarkCircleRegular,
  GlobeRegular,
  ShieldCheckmarkRegular,
  BuildingRegular,
  InfoRegular,
  DocumentCheckmarkRegular
} from '@fluentui/react-icons';
import { haptic } from '../utils/haptics';

/**
 * Estructura de datos parseada para respuestas estructuradas de trámites
 */
interface ParsedTramiteResponse {
  isStructured: boolean;
  title: string;
  meta: {
    costo: string | null;
    modalidad: string | null;
    acceso: string | null;
    entidad: string | null;
  };
  description: string;
  requirements: string[];
  steps: string[];
  notes: string[];
  followUps: string[];
}

/**
 * Limpia y normaliza el texto eliminando artefactos internos, fichas de metadatos y extrayendo sugerencias.
 */
function sanitizeContent(rawMarkdown: string): { cleanText: string; followUps: string[] } {
  if (!rawMarkdown) return { cleanText: '', followUps: [] };

  // 1. Limpiar etiquetas internas de RAG y recuperación de contexto
  let text = rawMarkdown
    .replace(/\[CONTEXTO RECUPERADO[^\]]*\]:\s*/gi, "")
    .replace(/\[CONTEXTO DE APOYO[^\]]*\]:\s*/gi, "")
    .replace(/\[INFORMACION D1 LOCAL[^\]]*\]:\s*/gi, "")
    .replace(/\[INFORMACIÓN EXA AI[^\]]*\]:\s*/gi, "")
    .trim();

  // 2. Extraer Consultas Sugeridas del final si existen
  const followUps: string[] = [];
  const followUpRegex = /(?:###\s*(?:preguntas sugeridas|consultas frecuentes|también puedes preguntar|consultas relacionadas)|(?:preguntas sugeridas|consultas frecuentes|también puedes consultar):)[\s\S]*$/i;
  const followUpMatch = text.match(followUpRegex);
  
  if (followUpMatch) {
    const followUpChunk = followUpMatch[0];
    text = text.replace(followUpChunk, '').trim();

    const lines = followUpChunk.split('\n');
    lines.forEach(line => {
      const cleaned = line
        .replace(/^[-*•\d+.)\s]+/, '')
        .replace(/[*_#`~]/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FAFF}]|[\u{200D}]/gu, '')
        .trim();
      if (cleaned.length > 5 && cleaned.endsWith('?')) {
        followUps.push(cleaned);
      }
    });
  }

  // 3. Limpiar emojis redundantes de los encabezados markdown
  text = text.replace(/^(#{1,6}\s*)([^\n]+)$/gm, (match, hashes, title) => {
    const cleanedTitle = title
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FAFF}]|[\u{200D}]/gu, '')
      .replace(/^[\s\-•·–—:►▶▸→✓✔✅📋📑💡🚀📌🔍⚠️❓]+/, '')
      .trim();
    return `${hashes} ${cleanedTitle}`;
  });

  // 4. ELIMINAR LÍNEAS DE METADATOS REPETITIVOS (TÍTULO:, ENTIDAD:, CATEGORÍA:, MODALIDAD:, DIRIGIDO A:, COSTO:, TIPO DE ACCESO:, etc.)
  const metadataRegex = /^\s*(?:[-*•·–—]\s*)?(?:\*\*|__)?(?:título|titulo|entidad|categoría|categoria|modalidad|dirigido(?:\s*a)?|costo|precio|tasa|tipo\s*de\s*acceso|acceso|estado|tiempo\s*de\s*atención|tiempo\s*de\s*atencion|duración|duracion|plazo|institución|institucion)(?:\*\*|__)?\s*:\s*[^\n]*$/gim;
  text = text.replace(metadataRegex, "");

  // 5. Normalizar encabezados genéricos innecesarios como "## Resumen del Trámite"
  text = text.replace(/^#{1,4}\s*(?:Resumen del Trámite|Resumen|Ficha del Trámite|Ficha Técnica|Información General)\s*$/gim, "");

  // 6. Eliminar repetición inmediata de título consecutivo al inicio
  const earlyLines = text.split('\n');
  if (earlyLines.length >= 2) {
    const line0 = earlyLines[0].replace(/^[#\s*•·–—:]+/, '').replace(/[*_#`~:]/g, '').trim().toLowerCase();
    const line1 = earlyLines[1].replace(/^[#\s*•·–—:]+/, '').replace(/[*_#`~:]/g, '').trim().toLowerCase();
    if (line0 && line1 && (line0 === line1 || (line0.length > 5 && line1.length > 5 && (line0.includes(line1) || line1.includes(line0))))) {
      earlyLines.splice(1, 1);
      text = earlyLines.join('\n');
    }
  }

  // 7. Limpiar líneas vacías consecutivas
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  return { cleanText: text, followUps: followUps.slice(0, 3) };
}

/**
 * Elimina cualquier repetición del título principal al inicio de la descripción o párrafos.
 */
function stripDuplicateTitle(bodyText: string, mainTitle: string): string {
  if (!bodyText) return '';
  if (!mainTitle) return bodyText.trim();

  let cleaned = bodyText.trim();
  const normalizedTitle = mainTitle.trim().toLowerCase();

  // 1. Quitar coincidencia exacta con o sin formato markdown
  const escapedTitle = mainTitle.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactRegex = new RegExp(`^\\s*(?:#{1,4}\\s*)?(?:\\*\\*|__)?(?:Trámite:\\s*)?${escapedTitle}(?:\\*\\*|__)?(?::|\\.)?\\s*\\n*`, 'i');
  cleaned = cleaned.replace(exactRegex, '').trim();

  // 2. Comprobar la primera línea si aún es idéntica o contiene el título
  const lines = cleaned.split('\n');
  if (lines.length > 0) {
    const firstLineClean = lines[0]
      .replace(/^[#\s*•·–—:]+/, '')
      .replace(/[*_#`~:]/g, '')
      .trim()
      .toLowerCase();

    if (
      firstLineClean === normalizedTitle ||
      firstLineClean === `trámite: ${normalizedTitle}` ||
      firstLineClean === `tramite: ${normalizedTitle}` ||
      firstLineClean === `guía oficial: ${normalizedTitle}` ||
      firstLineClean === `guia oficial: ${normalizedTitle}` ||
      (firstLineClean.length > 4 && normalizedTitle.length > 4 && (firstLineClean === normalizedTitle || normalizedTitle.startsWith(firstLineClean) || firstLineClean.startsWith(normalizedTitle)))
    ) {
      lines.shift();
      cleaned = lines.join('\n').trim();
    }
  }

  return cleaned;
}

/**
 * Parsea el texto del trámite en secciones limpias y escaneables en menos de 5 segundos.
 */
function parseStructuredTramite(text: string, followUps: string[]): ParsedTramiteResponse {
  if (!text) {
    return {
      isStructured: false,
      title: "",
      meta: { costo: null, modalidad: null, acceso: null, entidad: null },
      description: "",
      requirements: [],
      steps: [],
      notes: [],
      followUps
    };
  }

  // 1. Título del trámite
  const titleMatch = text.match(/^(?:#{1,3}\s*)?(?:Trámite:\s*|Guía oficial:\s*)?([^\n]+)/im);
  let title = "";
  if (titleMatch && (text.includes("Requisitos") || text.includes("requisito") || text.includes("Pasos") || text.includes("paso") || text.includes("Procedimiento") || text.includes("modalidad"))) {
    title = titleMatch[1].replace(/^[#\s*]+/, '').replace(/[*_#`]/g, '').trim();
    if (title.toLowerCase().startsWith("trámite:") || title.toLowerCase().startsWith("tramite:")) {
      title = title.substring(title.indexOf(":") + 1).trim();
    }
  }

  // 2. Extraer Metadata (Costo, Modalidad, Acceso, Entidad)
  const meta = {
    costo: null as string | null,
    modalidad: null as string | null,
    acceso: null as string | null,
    entidad: null as string | null
  };

  // Costo
  if (/costo\s*[:\s*]\s*([^\n,.]+)|costo\s*\*\*([^\*]+)\*\*|gratuito|gratis|s\/\s*[\d.]+/i.test(text)) {
    const cMatch = text.match(/costo\s*\*\*([^\*]+)\*\*|costo\s*[:\s*]\s*([^\n,.]+)/i);
    if (cMatch) {
      meta.costo = (cMatch[1] || cMatch[2] || "").trim();
    } else if (/gratuito|gratis/i.test(text)) {
      meta.costo = "Gratuito";
    }
  }

  // Modalidad
  if (/modalidad\s*[:\s*]\s*([^\n,.]+)|modalidad\s*\*\*([^\*]+)\*\*|virtual|presencial/i.test(text)) {
    const mMatch = text.match(/modalidad\s*\*\*([^\*]+)\*\*|modalidad\s*[:\s*]\s*([^\n,.]+)/i);
    if (mMatch) {
      meta.modalidad = (mMatch[1] || mMatch[2] || "").trim();
    } else if (/virtual|en línea|en linea/i.test(text)) {
      meta.modalidad = "Virtual";
    } else if (/presencial/i.test(text)) {
      meta.modalidad = "Presencial";
    }
  }

  // Acceso
  if (/tipo de acceso\s*\*\*([^\*]+)\*\*|acceso\s*[:\s*]\s*([^\n,.]+)|sin clave sol|requiere clave sol|consulta libre/i.test(text)) {
    const aMatch = text.match(/tipo de acceso\s*\*\*([^\*]+)\*\*|acceso\s*[:\s*]\s*([^\n,.]+)/i);
    if (aMatch) {
      meta.acceso = (aMatch[1] || aMatch[2] || "").trim();
    } else if (/sin clave sol|consulta libre/i.test(text)) {
      meta.acceso = "Sin Clave SOL";
    } else if (/requiere clave sol|con clave sol/i.test(text)) {
      meta.acceso = "Requiere Clave SOL";
    }
  }

  // Entidad
  if (/brindado por(?:\s*la)?\s*\*\*([^\*,\n]+)\*\*|entidad\s*[:\s*]\s*([^\n,.]+)|(SUNAT|RENIEC|MTC|SUNARP|EsSalud|Migraciones|SIS|Banco de la Nación)/i.test(text)) {
    const eMatch = text.match(/brindado por(?:\s*la)?\s*\*\*([^\*,\n]+)\*\*|entidad\s*[:\s*]\s*([^\n,.]+)/i);
    if (eMatch) {
      meta.entidad = (eMatch[1] || eMatch[2] || "").replace(/\(.*\)/, '').trim();
    } else {
      const knownEntity = text.match(/\b(SUNAT|RENIEC|MTC|SUNARP|EsSalud|Migraciones|SIS|Banco de la Nación)\b/i);
      if (knownEntity) meta.entidad = knownEntity[1].toUpperCase();
    }
  }

  // 3. Extraer Introducción y Explicación directa
  let introParagraph = "";
  const firstSubHeaderIndex = text.search(/\n#{2,4}\s+/i);
  if (firstSubHeaderIndex !== -1) {
    const preHeader = text.substring(0, firstSubHeaderIndex);
    introParagraph = preHeader.replace(/^#{1,3}\s+[^\n]+\n*/, '').trim();
  } else {
    const nonListLines = text.split('\n').filter(l => !l.startsWith('#') && !l.startsWith('*') && !l.startsWith('-') && !l.match(/^\d+\./));
    introParagraph = nonListLines.join('\n\n').trim();
  }

  introParagraph = introParagraph
    .replace(/^\s*(?:[-*•·–—]\s*)?(?:\*\*|__)?(?:título|titulo|entidad|categoría|categoria|modalidad|dirigido(?:\s*a)?|costo|precio|tasa|tipo\s*de\s*acceso|acceso|estado)(?:\*\*|__)?\s*:\s*[^\n]*$/gim, "")
    .replace(/^#{1,4}\s*(?:Resumen del Trámite|Resumen)\s*$/gim, "")
    .trim();

  let descriptionBody = "";
  const descMatch = text.match(/(?:#{2,4}\s*(?:Descripción|¿Qué es\?|Acerca del trámite|Explicación|Resumen(?: del Trámite)?))[\s\S]*?(?=(?:#{2,4}|\n#{1,3}|$))/i);
  if (descMatch) {
    descriptionBody = descMatch[0]
      .replace(/^#{2,4}\s*[^\n]+\n*/i, '')
      .trim();
  }

  // Integrar la descripción de forma natural
  let description = "";
  if (introParagraph) {
    description = introParagraph;
    if (descriptionBody && !introParagraph.includes(descriptionBody) && descriptionBody !== introParagraph) {
      description += `\n\n${descriptionBody}`;
    }
  } else {
    description = descriptionBody;
  }

  // LIMPIEZA CRUCIAL: Eliminar cualquier repetición del título dentro de la descripción
  if (title) {
    description = stripDuplicateTitle(description, title);
  }

  // 4. Extraer Requisitos
  const requirements: string[] = [];
  const reqMatch = text.match(/(?:#{2,4}\s*(?:Requisitos(?:\s*Obligatorios)?|¿Qué necesitas\?|Documentos|Condiciones))[\s\S]*?(?=(?:#{2,4}|\n#{1,3}|$))/i);
  if (reqMatch) {
    const reqLines = reqMatch[0].split('\n');
    reqLines.forEach(line => {
      const cleaned = line
        .replace(/^[-*•\d+.)\s]+/, '')
        .replace(/[*_#`~]/g, '')
        .trim();
      if (cleaned && !cleaned.toLowerCase().startsWith("requisito") && cleaned.length > 2) {
        requirements.push(cleaned);
      }
    });
  }

  // 5. Extraer Pasos
  const steps: string[] = [];
  const stepsMatch = text.match(/(?:#{2,4}\s*(?:Pasos(?:\s*para realizar el trámite)?|¿Cómo realizarlo\?|Procedimiento|Paso a paso))[\s\S]*?(?=(?:#{2,4}|\n#{1,3}|$))/i);
  if (stepsMatch) {
    const stepLines = stepsMatch[0].split('\n');
    stepLines.forEach(line => {
      const cleaned = line
        .replace(/^[-*•\d+.)\s]+/, '')
        .replace(/[*_#`~]/g, '')
        .trim();
      if (cleaned && !cleaned.toLowerCase().startsWith("pasos para") && cleaned.length > 3) {
        steps.push(cleaned);
      }
    });
  }

  // 6. Extraer Consideraciones y Notas Importantes (Limpio de repeticiones)
  const notes: string[] = [];
  const notesMatch = text.match(/(?:#{2,4}\s*(?:Consideraciones(?:\s*importantes)?|Notas Importantes|Avisos|Puntos clave|Ten en cuenta))[\s\S]*?(?=(?:#{2,4}|\n#{1,3}|$))/i);
  if (notesMatch) {
    const noteLines = notesMatch[0].split('\n');
    noteLines.forEach(line => {
      let cleaned = line
        .replace(/^[-*•\d+.)\s]+/, '')
        .replace(/[*_#`~]/g, '')
        .trim();
      
      cleaned = cleaned.replace(/^(?:Consulta RUC de Oficio|Nota Importante|Aviso|Importante)\s*:\s*/i, '').trim();

      if (cleaned && !cleaned.toLowerCase().startsWith("consideraciones") && cleaned.length > 5) {
        notes.push(cleaned);
      }
    });
  }

  // Verificar si calificamos como estructurado
  const isStructured = Boolean(
    (requirements.length > 0 || steps.length > 0) &&
    (meta.costo || meta.modalidad || meta.entidad || description)
  );

  return {
    isStructured,
    title,
    meta,
    description,
    requirements: requirements.slice(0, 5),
    steps: steps.slice(0, 5),
    notes: notes.slice(0, 4),
    followUps
  };
}

// ─── Componente Principal ProgressiveDisclosureResponse ───────────────────────
export function ProgressiveDisclosureResponse({
  content,
  onFollowUp,
  onRetry,
  isError = false,
  isTyping = false,
  theme
}: {
  content: string;
  onFollowUp?: (query: string) => void;
  onRetry?: () => void;
  isError?: boolean;
  isTyping?: boolean;
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light" || (!theme && typeof document !== 'undefined' && !document.documentElement.classList.contains("dark"));

  if (isError) {
    return (
      <div style={{
        padding: "14px 16px",
        borderRadius: 12,
        background: isLight ? "rgba(220, 38, 38, 0.05)" : "rgba(239, 68, 68, 0.10)",
        border: isLight ? "1px solid rgba(220, 38, 38, 0.20)" : "1px solid rgba(239, 68, 68, 0.25)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#DC2626", fontWeight: 700, fontSize: 13.5 }}>
          <WarningRegular fontSize={16} />
          <span>No pudimos procesar la consulta en este momento</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: isLight ? "#475569" : "#CBD5E1", lineHeight: 1.5 }}>
          Ocurrió un inconveniente temporal de conexión con el servicio de IA. Puedes intentar realizar la consulta nuevamente.
        </p>
        {onRetry && (
          <div style={{ paddingTop: 2 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                haptic.medium();
                onRetry();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                background: "#DC2626",
                color: "#FFFFFF",
                border: "none",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              <ArrowClockwiseRegular fontSize={13} />
              <span>Intentar nuevamente</span>
            </motion.button>
          </div>
        )}
      </div>
    );
  }

  const { cleanText, followUps } = useMemo(() => sanitizeContent(content), [content]);
  const parsed = useMemo(() => parseStructuredTramite(cleanText, followUps), [cleanText, followUps]);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 16, 
      width: "100%", 
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 15.5,
      lineHeight: 1.68,
      color: isLight ? "#0D0D0D" : "#ECECEC"
    }}>
      
      {/* ── CASO 1: PRESENTACIÓN EDITORIAL INSTITUCIONAL (SIN INSIGNIAS DE COLORES ARTIFICIALES) ── */}
      {parsed.isStructured && !isTyping ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Cabecera del Trámite */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {parsed.title && (
              <h3 style={{ 
                fontSize: 20, 
                fontWeight: 800, 
                color: isLight ? "#0D0D0D" : "#ECECEC", 
                margin: "0 0 2px", 
                letterSpacing: "-0.02em",
                lineHeight: 1.3
              }}>
                {parsed.title}
              </h3>
            )}
          </div>

          {/* Descripción Completa Unificada (Con Modalidad, Costo, Entidad y Acceso integrados) */}
          {parsed.description && (
            <div style={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: isLight ? "#262626" : "#D4D4D4"
            }}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p style={{ margin: "0 0 10px", fontSize: 15.5, lineHeight: 1.7, color: isLight ? "#262626" : "#D4D4D4" }} {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong style={{ fontWeight: 750, color: isLight ? "#0D0D0D" : "#ECECEC" }} {...props} />
                  )
                }}
              >
                {parsed.description}
              </ReactMarkdown>
            </div>
          )}

          {/* Requisitos */}
          {parsed.requirements.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ 
                fontSize: 15.5, 
                fontWeight: 750, 
                color: isLight ? "#0D0D0D" : "#ECECEC",
                letterSpacing: "-0.01em"
              }}>
                Requisitos necesarios:
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {parsed.requirements.map((req, rIdx) => (
                  <div key={rIdx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    fontSize: 15,
                    color: isLight ? "#262626" : "#D4D4D4",
                    lineHeight: 1.62
                  }}>
                    <span style={{ color: isLight ? "#10A37F" : "#38BDF8", fontWeight: 700, flexShrink: 0, fontSize: 16 }}>•</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pasos para realizar el trámite */}
          {parsed.steps.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ 
                fontSize: 15.5, 
                fontWeight: 750, 
                color: isLight ? "#0D0D0D" : "#ECECEC",
                letterSpacing: "-0.01em"
              }}>
                Pasos para realizar el trámite:
              </span>
              <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                {parsed.steps.map((step, sIdx) => (
                  <li key={sIdx} style={{ fontSize: 15, lineHeight: 1.62, color: isLight ? "#262626" : "#D4D4D4" }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Notas y Consideraciones (Callout Limpio Institucional) */}
          {parsed.notes.length > 0 && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: isLight ? "#F9F9F9" : "#2F2F2F",
              borderLeft: `3.5px solid ${isLight ? "#10A37F" : "#38BDF8"}`,
              borderTop: `1px solid ${isLight ? "#E5E5E5" : "rgba(255,255,255,0.06)"}`,
              borderRight: `1px solid ${isLight ? "#E5E5E5" : "rgba(255,255,255,0.06)"}`,
              borderBottom: `1px solid ${isLight ? "#E5E5E5" : "rgba(255,255,255,0.06)"}`,
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}>
              <span style={{ 
                fontSize: 12, 
                fontWeight: 750, 
                color: isLight ? "#10A37F" : "#38BDF8", 
                textTransform: "uppercase", 
                letterSpacing: "0.04em" 
              }}>
                Puntos a tener en cuenta
              </span>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
                {parsed.notes.map((note, nIdx) => (
                  <li key={nIdx} style={{ fontSize: 14.5, lineHeight: 1.58, color: isLight ? "#525252" : "#B4B4B4" }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      ) : (
        /* ── CASO 2: MARKDOWN EDITORIAL FLUIDO (CONVERSACIONAL / STREAMING) ── */
        <div className="lota-markdown-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h2 style={{ 
                  fontSize: 20, 
                  fontWeight: 800, 
                  margin: "14px 0 8px", 
                  color: isLight ? "#0D0D0D" : "#ECECEC", 
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3
                }} {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h3 style={{ 
                  fontSize: 17.5, 
                  fontWeight: 750, 
                  margin: "14px 0 8px", 
                  color: isLight ? "#0D0D0D" : "#ECECEC", 
                  letterSpacing: "-0.015em",
                  borderLeft: `3.5px solid ${isLight ? "#10A37F" : "#38BDF8"}`,
                  paddingLeft: 10,
                  lineHeight: 1.35
                }} {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h4 style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  margin: "12px 0 6px", 
                  color: isLight ? "#10A37F" : "#38BDF8", 
                  lineHeight: 1.4
                }} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p style={{ 
                  margin: "0 0 10px", 
                  fontSize: 15.5,
                  lineHeight: 1.7, 
                  color: isLight ? "#0D0D0D" : "#ECECEC" 
                }} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul style={{ 
                  margin: "0 0 12px", 
                  paddingLeft: 20, 
                  listStyleType: "disc", 
                  color: isLight ? "#10A37F" : "#38BDF8", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 6 
                }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol style={{ 
                  margin: "0 0 12px", 
                  paddingLeft: 20, 
                  listStyleType: "decimal", 
                  color: isLight ? "#10A37F" : "#38BDF8", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 6 
                }} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li style={{ 
                  fontSize: 15.5,
                  lineHeight: 1.68, 
                  color: isLight ? "#262626" : "#D4D4D4" 
                }} {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong style={{ 
                  fontWeight: 750, 
                  color: isLight ? "#0D0D0D" : "#ECECEC" 
                }} {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote style={{
                  margin: "10px 0 12px",
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: isLight ? "#F9F9F9" : "#2F2F2F",
                  borderLeft: `3.5px solid ${isLight ? "#10A37F" : "#38BDF8"}`,
                  color: isLight ? "#262626" : "#D4D4D4",
                  fontSize: 14.5,
                  lineHeight: 1.6
                }} {...props} />
              ),
              a: ({ node, href, children, ...props }) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: isLight ? "#10A37F" : "#38BDF8", 
                    fontWeight: 650, 
                    textDecoration: "underline",
                    textUnderlineOffset: 3
                  }} 
                  {...props}
                >
                  {children}
                </a>
              ),
              table: ({ node, ...props }) => (
                <div style={{ overflowX: "auto", margin: "12px 0" }}>
                  <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 14,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: isLight ? "1px solid #E5E5E5" : "1px solid rgba(255, 255, 255, 0.08)"
                  }} {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th style={{
                  padding: "8px 12px",
                  background: isLight ? "#F4F4F4" : "rgba(255, 255, 255, 0.06)",
                  fontWeight: 700,
                  textAlign: "left",
                  borderBottom: isLight ? "1px solid #E5E5E5" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isLight ? "#0D0D0D" : "#ECECEC"
                }} {...props} />
              ),
              td: ({ node, ...props }) => (
                <td style={{
                  padding: "8px 12px",
                  borderBottom: isLight ? "1px solid #F4F4F4" : "1px solid rgba(255, 255, 255, 0.04)",
                  color: isLight ? "#262626" : "#D4D4D4"
                }} {...props} />
              )
            }}
          >
            {cleanText}
          </ReactMarkdown>

          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: isLight ? "#10A37F" : "#38BDF8", fontWeight: 700, fontSize: 18, marginLeft: 2 }}
            >
              ▌
            </motion.span>
          )}
        </div>
      )}

      {/* ── CONSULTAS RÁPIDAS SUGERIDAS (COMPACTAS AL PIE) ── */}
      {followUps.length > 0 && !isTyping && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2, paddingTop: 4 }}>
          <span style={{ 
            fontSize: 10.5, 
            fontWeight: 750, 
            color: isLight ? "#737373" : "#B4B4B4", 
            textTransform: "uppercase", 
            letterSpacing: "0.05em", 
            display: "flex", 
            alignItems: "center", 
            gap: 5 
          }}>
            <SparkleRegular fontSize={12} color={isLight ? "#10A37F" : "#38BDF8"} />
            <span>Consultas sugeridas:</span>
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {followUps.map((prompt, pIdx) => (
              <motion.button
                key={pIdx}
                whileHover={{ scale: 1.01, borderColor: isLight ? "#10A37F" : "#38BDF8" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  haptic.light();
                  if (onFollowUp) onFollowUp(prompt);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: isLight ? "#F4F4F4" : "rgba(255, 255, 255, 0.04)",
                  border: isLight ? "1px solid #E5E5E5" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isLight ? "#0D0D0D" : "#ECECEC",
                  fontSize: 12,
                  fontWeight: 550,
                  cursor: "pointer",
                  textAlign: "left",
                  lineHeight: 1.35,
                  boxShadow: isLight ? "0 1px 2px rgba(0, 0, 0, 0.02)" : "none",
                  transition: "border-color 0.15s ease"
                }}
              >
                <span>{prompt}</span>
                <ArrowRightRegular fontSize={11} color={isLight ? "#10A37F" : "#38BDF8"} />
              </motion.button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}