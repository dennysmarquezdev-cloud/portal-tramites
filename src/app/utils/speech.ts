/**
 * Motor Avanzado de Síntesis de Voz Humana para LOTA AI
 * Optimizado para voces neuronales/naturales de última generación en Edge, Chrome, Safari y Android.
 */

export interface SpeechOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  rate?: number;
  pitch?: number;
  volume?: number;
}

/**
 * Obtiene la mejor voz en español disponible en el sistema (priorizando modelos neuronales de alta fidelidad).
 */
export function getBestSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const spanishVoices = voices.filter(v => 
    v.lang && (v.lang.toLowerCase().startsWith("es") || v.lang.toLowerCase().startsWith("spa"))
  );

  if (spanishVoices.length === 0) return null;

  // Sistema de puntuación ponderado para seleccionar la voz más humana y cálida
  const scored = spanishVoices.map(v => {
    let score = 0;
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();

    // 1. Voces Neuronales / Naturales (Microsoft Edge Natural, Google Neural, Apple Enhanced)
    if (name.includes("natural") || name.includes("neural") || name.includes("online (natural)")) {
      score += 150;
    }
    if (name.includes("google") || name.includes("network")) {
      score += 100;
    }
    if (name.includes("enhanced") || name.includes("premium") || name.includes("siri")) {
      score += 90;
    }

    // 2. Nombres de voces humanas y amigables reconocidas
    if (
      name.includes("salma") || 
      name.includes("dalia") || 
      name.includes("paloma") || 
      name.includes("monica") || 
      name.includes("mónica") || 
      name.includes("paulina") || 
      name.includes("sofia") || 
      name.includes("sabina") || 
      name.includes("camila") || 
      name.includes("luciana") || 
      name.includes("francisca") ||
      name.includes("elena")
    ) {
      score += 50;
    }

    // 3. Ponderación por acento / región (Perú y Latinoamérica)
    if (lang === "es-pe" || lang === "es_pe") score += 35;
    else if (lang.includes("es-419") || lang.includes("es-mx") || lang.includes("es-us") || lang.includes("es-co")) score += 28;
    else if (lang.includes("es-ar") || lang.includes("es-cl")) score += 20;
    else if (lang.includes("es-es") || lang.includes("es_es")) score += 15;
    else score += 10;

    // 4. Bonificación para voces remotas/en la nube (casi siempre son neuronales en navegadores modernos)
    if (!v.localService) score += 15;

    return { voice: v, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.voice || null;
}

/**
 * Limpia y adapta el texto de markdown para lectura fluida y conversacional en español.
 */
export function sanitizeTextForSpeech(text: string): string {
  if (!text) return "";

  let clean = text;

  // 1. Eliminar bloques de código markdown y tablas
  clean = clean.replace(/```[\s\S]*?```/g, " en el bloque detallado. ");
  clean = clean.replace(/`([^`]+)`/g, "$1");
  clean = clean.replace(/\|[^\n]+\|/g, ""); // tablas markdown

  // 2. Limpiar enlaces y URLs
  clean = clean.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, "$1");
  clean = clean.replace(/https?:\/\/\S+/g, "el portal web oficial");

  // 3. Limpiar encabezados, negritas, cursivas y tachados
  clean = clean.replace(/#{1,6}\s+/g, "");
  clean = clean.replace(/\*\*([^*]+)\*\*/g, "$1");
  clean = clean.replace(/\*([^*]+)\*/g, "$1");
  clean = clean.replace(/__([^_]+)__/g, "$1");
  clean = clean.replace(/_([^_]+)_/g, "$1");
  clean = clean.replace(/~~([^~]+)~~/g, "$1");

  // 4. Adaptar viñetas y listas numéricas para pausas naturales
  clean = clean.replace(/^[\s]*[-•*]\s+/gm, " ");
  clean = clean.replace(/^[\s]*\d+\.\s+/gm, " ");

  // 5. Adaptar monedas y términos frecuentes en Perú
  clean = clean.replace(/S\/\.?\s*(\d+(?:\.\d+)?)/gi, "$1 soles");
  clean = clean.replace(/Gratis|Gratuito/gi, "sin costo");

  // 6. Eliminar emojis comunes de forma segura
  clean = clean.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "");

  // 7. Normalizar signos de puntuación y espacios
  clean = clean.replace(/[\r\n]+/g, ". ");
  clean = clean.replace(/\s{2,}/g, " ");
  clean = clean.replace(/\.{2,}/g, ".");
  clean = clean.replace(/,\s*,/g, ",");

  return clean.trim();
}

/**
 * Divide el texto en oraciones naturales para evitar bloqueos del motor de voz del navegador.
 */
function splitIntoNaturalChunks(text: string, maxLength: number = 180): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length + 1 <= maxLength) {
      currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (trimmed.length > maxLength) {
        const subParts = trimmed.split(/([,;:]\s+)/);
        let subChunk = "";
        for (const part of subParts) {
          if (subChunk.length + part.length <= maxLength) {
            subChunk += part;
          } else {
            if (subChunk.trim()) chunks.push(subChunk.trim());
            subChunk = part;
          }
        }
        if (subChunk.trim()) currentChunk = subChunk.trim();
        else currentChunk = "";
      } else {
        currentChunk = trimmed;
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

let activeSpeechController: { cancel: () => void } | null = null;

/**
 * Detiene cualquier locución en curso.
 */
export function stopLotaSpeech() {
  if (activeSpeechController) {
    activeSpeechController.cancel();
    activeSpeechController = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Reproduce el texto usando la voz más humana y natural disponible.
 */
export function playLotaSpeech(text: string, options: SpeechOptions = {}) {
  stopLotaSpeech();

  if (typeof window === "undefined" || !window.speechSynthesis) {
    options.onError?.(new Error("SpeechSynthesis no soportado"));
    return;
  }

  const cleanText = sanitizeTextForSpeech(text);
  if (!cleanText) {
    options.onEnd?.();
    return;
  }

  const chunks = splitIntoNaturalChunks(cleanText);
  if (chunks.length === 0) {
    options.onEnd?.();
    return;
  }

  const voice = getBestSpanishVoice();
  let currentIndex = 0;
  let isCancelled = false;

  const controller = {
    cancel: () => {
      isCancelled = true;
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  };

  activeSpeechController = controller;
  options.onStart?.();

  const speakNextChunk = () => {
    if (isCancelled || currentIndex >= chunks.length) {
      if (activeSpeechController === controller) {
        activeSpeechController = null;
      }
      if (!isCancelled) {
        options.onEnd?.();
      }
      return;
    }

    const chunk = chunks[currentIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || "es-PE";
    } else {
      utterance.lang = "es-PE";
    }

    // Prosodia calibrada para máxima naturalidad humana
    utterance.rate = options.rate ?? 1.0;     // Ritmo conversacional calmado y claro
    utterance.pitch = options.pitch ?? 1.02;  // Tono cálido, amigable y empático
    utterance.volume = options.volume ?? 1.0;

    utterance.onend = () => {
      currentIndex++;
      speakNextChunk();
    };

    utterance.onerror = (e) => {
      if (isCancelled) return;
      currentIndex++;
      if (currentIndex < chunks.length) {
        speakNextChunk();
      } else {
        if (activeSpeechController === controller) {
          activeSpeechController = null;
        }
        options.onError?.(e);
        options.onEnd?.();
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      options.onError?.(err);
      options.onEnd?.();
    }
  };

  speakNextChunk();
}
