/**
 * Motor de Corrección Fonética y Normalización Inteligente de Voz para el Estado Peruano (LOTA AI)
 * Limpia muletillas, corrige errores fonéticos de Speech-to-Text en entidades/trámites y 
 * reestructura sintácticamente consultas orales peruanas.
 */

// 1. Diccionario de equivalencias fonéticas y ortográficas para entidades y conceptos cívicos peruanos
const CIVIC_PHONETIC_REPLACEMENTS: Array<{ regex: RegExp; replacement: string }> = [
  // Entidades principales
  { regex: /\b(?:la\s+)?(?:sunad|zonat|sonat|tsunat|zunat)\b/gi, replacement: "SUNAT" },
  { regex: /\b(?:la\s+)?(?:renie|renieq|reneic|reñec|reneg|reñec|renieg)\b/gi, replacement: "RENIEC" },
  { regex: /\b(?:la\s+)?(?:sunar|sonar|zunarp|sunarpe|zonarp)\b/gi, replacement: "SUNARP" },
  { regex: /\b(?:el\s+)?(?:essalu|essalud|esalud|salud seguro|esalú)\b/gi, replacement: "EsSalud" },
  { regex: /\b(?:el\s+)?(?:mtc|m tc|eme te ce|ministerio de transportes)\b/gi, replacement: "MTC" },
  { regex: /\b(?:la\s+)?(?:sutran|sutrán|zutran)\b/gi, replacement: "SUTRAN" },
  { regex: /\b(?:el\s+)?(?:sat lima|sat de lima|satlima)\b/gi, replacement: "SAT Lima" },
  { regex: /\b(?:la\s+)?(?:sunedu|zunedu)\b/gi, replacement: "SUNEDU" },
  { regex: /\b(?:el\s+)?(?:indecopi|indecopy|indecoppi)\b/gi, replacement: "INDECOPI" },
  { regex: /\b(?:el\s+)?(?:osiptel|osiptell)\b/gi, replacement: "OSIPTEL" },
  { regex: /\b(?:el\s+)?(?:osinergmin|osinerg|osiner)\b/gi, replacement: "OSINERGMIN" },
  { regex: /\b(?:el\s+)?(?:sis seguro|seguro sis|sis gratuito)\b/gi, replacement: "SIS" },
  { regex: /\b(?:el\s+)?(?:banco de la nacion|banco de la nación|banco nacion|bn peru)\b/gi, replacement: "Banco de la Nación" },
  { regex: /\b(?:pagalo pe|paga lo pe|pagalo\.pe|pagalo punto pe|paga lo punto pe)\b/gi, replacement: "Págalo.pe" },
  { regex: /\b(?:migraciones peru|superintendencia de migraciones)\b/gi, replacement: "Migraciones" },
  { regex: /\b(?:pronabec|beca 18|beca diez y ocho)\b/gi, replacement: "PRONABEC" },
  { regex: /\b(?:poder judicial|pj peru)\b/gi, replacement: "Poder Judicial" },
  { regex: /\b(?:sedapal)\b/gi, replacement: "SEDAPAL" },
  { regex: /\b(?:sedapar)\b/gi, replacement: "SEDAPAR" },

  // Documentos e Identificaciones
  { regex: /\b(?:dni azul|de ene i azul|d n i azul)\b/gi, replacement: "DNI azul" },
  { regex: /\b(?:dni electronico|dni electrónico|dnie|de ene i e|d n i electronico)\b/gi, replacement: "DNI electrónico" },
  { regex: /\b(?:duplicado de dni|sacar duplicado dni|duplicado dni)\b/gi, replacement: "duplicado de DNI" },
  { regex: /\b(?:renovacion de dni|renovación de dni|renovar dni)\b/gi, replacement: "renovación de DNI" },
  { regex: /\b(?:de ene i|d n i|d\.n\.i\.)\b/gi, replacement: "DNI" },
  { regex: /\b(?:errec|erre u ce|r u c|r\.u\.c\.)\b/gi, replacement: "RUC" },
  { regex: /\b(?:clave sol|clave del sol|clave zol|clave sunat sol)\b/gi, replacement: "Clave SOL" },
  { regex: /\b(?:ficha ruc|constancia de ruc|ficha del ruc)\b/gi, replacement: "ficha RUC" },
  { regex: /\b(?:carne de extranjeria|carné de extranjería|carnet de extranjeria)\b/gi, replacement: "carné de extranjería" },
  { regex: /\b(?:partida de nacimiento|acta de nacimiento)\b/gi, replacement: "acta de nacimiento" },
  { regex: /\b(?:copia literal de sunarp|copia literal sunarp|partida registral)\b/gi, replacement: "copia literal de SUNARP" },
  { regex: /\b(?:copia literal)\b/gi, replacement: "copia literal" },

  // Trámites Vehiculares y Transporte
  { regex: /\b(?:brebete|brevete|brebente|brevetes)\b/gi, replacement: "brevete" },
  { regex: /\b(?:licencia de conducir|licencia conducir)\b/gi, replacement: "licencia de conducir" },
  { regex: /\b(?:record de conductor|record conductor|puntos de brevete|puntos mtc)\b/gi, replacement: "récord de conductor" },
  { regex: /\b(?:papeletas de transito|papeleta transito|papeletas mtc|papeletas sutran)\b/gi, replacement: "papeletas de tránsito" },
  { regex: /\b(?:soat vehicular|soat digital)\b/gi, replacement: "SOAT" },
  { regex: /\b(?:revision tecnica|inspeccion tecnica vehicular)\b/gi, replacement: "revisión técnica vehicular" },

  // Trámites Tributarios y Freelance
  { regex: /\b(?:recibo por honorarios electronico|recibo por honorario electronico|recibo por honorarios|recibo de honorarios)\b/gi, replacement: "recibo por honorarios electrónico" },
  { regex: /\b(?:suspensi[oó]n|suspenci[oó]n)(?:\s+de\s+retenciones)?(?:\s+de)?\s*(?:4ta|cuarta)(?:\s+categor[ií]a)?\b/gi, replacement: "suspensión de retenciones de 4ta categoría" },
  { regex: /\b(?:formulario\s+(?:virtual\s+)?1609)\b/gi, replacement: "Formulario Virtual 1609" },
  { regex: /\b(?:cuarta categoria|renta de 4ta|renta de cuarta)\b/gi, replacement: "renta de 4ta categoría" },
  { regex: /\b(?:inscribir ruc|sacar ruc por internet|inscribirme al ruc)\b/gi, replacement: "inscripción en el RUC" },
  { regex: /\b(?:consultar ruc|consulta ruc|buscar ruc)\b/gi, replacement: "consultar RUC" }
];

/**
 * Elimina repeticiones orales y muletillas conversacionales típicas del habla peruana.
 */
export function removeOralDisfluencies(raw: string): string {
  if (!raw) return "";

  let cleaned = raw;

  // 1. Eliminar repeticiones de palabras consecutivas (ej: "mi mi", "de de", "para para", "quiero quiero")
  cleaned = cleaned.replace(/\b([a-záéíóúñ]+)\s+\1\b/gi, "$1");
  cleaned = cleaned.replace(/\b([a-záéíóúñ]+)\s+\1\b/gi, "$1");

  // 2. Eliminar muletillas y titubeos al inicio o intermedios
  const fillerPatterns = [
    /\b(?:este|esteee+|eh+|ehhh+|ah+|ahhh+|mmm+|mm+|em+|emmm+)\b/gi,
    /\b(?:o sea|osea|bueno pues|digamos que|como que|tipo que|la verdad es que)\b/gi,
    /\b(?:sabes qué|mira este|escúchame|a ver este|a ver a ver|a ver)\b/gi
  ];

  fillerPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, " ");
  });

  // 3. Limpiar espacios múltiples y recortar
  return cleaned.replace(/\s{2,}/g, " ").trim();
}

/**
 * Corrige errores fonéticos específicos de STT y estandariza términos normativos peruanos.
 */
export function applyCivicPhoneticCorrections(text: string): string {
  if (!text) return "";

  let processed = text;
  CIVIC_PHONETIC_REPLACEMENTS.forEach(({ regex, replacement }) => {
    processed = processed.replace(regex, replacement);
  });

  return processed;
}

/**
 * Reorganiza sintácticamente oraciones conversacionales o desordenadas en consultas claras.
 */
export function restructureConversationalIntent(text: string): string {
  if (!text) return "";

  let cleaned = text.trim();

  // 1. Depurar saludos, vocativos amables ("hola buenas", "señorita", "por favor...")
  cleaned = cleaned
    .replace(/^(?:hola\s+buenas(?:\s+tardes|\s+noches|\s+d[ií]as)?|buenos\s+d[ií]as|buenas\s+tardes|buenas\s+noches|hola\s+qu[eé]\s+tal|hola|buenas|saludos|por\s+favor|disculpe|disculpa)\s*[,.:;]?\s*/gi, "")
    .replace(/^(?:señorita|señor|amigo|amiga|joven|lota(?:\s+ai|\s+bot)?|chicos)\s*[,.:;]?\s*/gi, "")
    .replace(/^(?:me gustaría saber|quisiera saber|deseo saber|quiero saber|quisiera consultar|deseo consultar|necesito saber|me puedes decir|podrías decirme|puedes decirme|ayúdame con|ayúdame a|desearía saber|desearía consultar|desearía|quisiera|deseo|necesito)\s+/gi, "")
    .trim();

  // 2. Corregir construcciones dobles desordenadas ("pago como hago", "cómo pago cómo hago")
  cleaned = cleaned.replace(/\b(?:pago\s+c[oó]mo\s+hago|pagar\s+c[oó]mo\s+hago|c[oó]mo\s+hago\s+para\s+pagar)\b/gi, "pagar");
  cleaned = cleaned.replace(/\b(?:c[oó]mo\s+hago\s+para\s+sacar|sacar\s+quiero|tramitar\s+quiero)\b/gi, "tramitar");

  // 3. Corregir y estandarizar construcciones orales de preguntas y trámites
  if (/^(?:sobre\s+la|sobre\s+el|sobre)\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:sobre\s+la|sobre\s+el|sobre)\s+/i, "Cómo tramitar ");
  } else if (/^(?:cómo|como)?\s*(?:sacar|tramitar|obtener)\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:cómo|como)?\s*(?:sacar|tramitar|obtener)\s+/i, "Cómo tramitar ");
  } else if (/^(?:cómo|como)?\s*(?:pagar)\s+(?:de|del)?\s*/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:cómo|como)?\s*(?:pagar)\s+(?:de|del)?\s*/i, "Cómo pagar ");
  } else if (/^(?:cómo|como)?\s*(?:consultar|buscar|ver\s+estado\s+de|ver)\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:cómo|como)?\s*(?:consultar|buscar|ver\s+estado\s+de|ver)\s+/i, "Cómo consultar ");
  } else if (/^(?:dónde|donde)\s+(?:sacar|tramitar|obtener|hacer)\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^(?:dónde|donde)\s+(?:sacar|tramitar|obtener|hacer)\s+/i, "Dónde tramitar ");
  }

  return cleaned.trim();
}

/**
 * Formatea la puntuación, mayúsculas y signos de interrogación finales.
 */
export function formatPeruvianCivicGrammar(text: string): string {
  if (!text) return "";

  let formatted = text.trim();

  // 1. Capitalizar primera letra
  if (formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  // 2. Si comienza con interrogativo (Cómo, Dónde, Cuándo, Qué, Cuánto, Requisitos) y no tiene signo, formatearlo
  const isQuestion = /^(?:cómo|como|dónde|donde|cuándo|cuando|qué|que|cuánto|cuanto|cuál|cual|por qué|por que|quién|quien)\b/i.test(formatted);
  if (isQuestion && !formatted.endsWith("?") && !formatted.startsWith("¿")) {
    formatted = `¿${formatted}?`;
  }

  // 3. Normalizar acrónimos oficiales en mayúsculas
  const acronyms = ["SUNAT", "RENIEC", "MTC", "SUNARP", "SUTRAN", "SUNEDU", "INDECOPI", "OSIPTEL", "OSINERGMIN", "SIS", "DNI", "RUC", "SOL", "SAT", "PRONABEC", "BN", "PJ", "SOAT"];
  acronyms.forEach(acro => {
    const r = new RegExp(`\\b${acro}\\b`, "gi");
    formatted = formatted.replace(r, acro);
  });

  return formatted;
}

/**
 * Pipeline principal de normalización inteligente de audio para LOTA AI.
 * Convierte el habla espontánea de un ciudadano en una consulta cívica impecable.
 */
export function normalizePeruvianCivicSpeech(rawTranscript: string): string {
  if (!rawTranscript || !rawTranscript.trim()) return "";

  // Paso 1: Eliminar titubeos, muletillas y repeticiones
  const noDisfluencies = removeOralDisfluencies(rawTranscript);

  // Paso 2: Corrección fonética de entidades y trámites peruanos
  const correctedPhonetics = applyCivicPhoneticCorrections(noDisfluencies);

  // Paso 3: Reestructuración sintáctica de la intención del ciudadano
  const restructured = restructureConversationalIntent(correctedPhonetics);

  // Paso 4: Puntuación, capitalización y pulido final
  const finalized = formatPeruvianCivicGrammar(restructured);

  return finalized || correctedPhonetics || rawTranscript.trim();
}
