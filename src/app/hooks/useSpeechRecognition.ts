import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { normalizePeruvianCivicSpeech } from "../utils/speechCorrection";
import { haptic } from "../utils/haptics";

export interface SpeechRecognitionOptions {
  onResult?: (finalText: string) => void;
  onInterim?: (interimText: string) => void;
  lang?: string;
  silenceTimeoutMs?: number;
}

export function useSpeechRecognition({
  onResult,
  onInterim,
  lang = "es-PE",
  silenceTimeoutMs = 1800
}: SpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [audioLevel, setAudioLevel] = useState<number>(0); // 0.0 a 1.0 para ondas visuales
  const [hasSupport, setHasSupport] = useState<boolean>(true);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);
  const fullTranscriptRef = useRef<string>("");
  const lastInterimRef = useRef<string>("");
  const latestCombinedTranscriptRef = useRef<string>("");
  const silenceTimerRef = useRef<any>(null);
  const waveIntervalRef = useRef<any>(null);
  const speechActiveRef = useRef<boolean>(false);
  const currentLangRef = useRef<string>(lang);

  // Comprobar soporte del navegador al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSupported = Boolean(
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      );
      setHasSupport(isSupported);
    }
  }, []);

  // Animación de ondas orgánica y reactiva (No bloquea el hardware del micrófono en móviles Android/iOS)
  const startVisualWaveAnimation = useCallback(() => {
    if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    
    let tick = 0;
    waveIntervalRef.current = setInterval(() => {
      tick++;
      if (!isListeningRef.current) return;

      if (speechActiveRef.current) {
        // Nivel sonoro alto y reactivo cuando se detecta voz activa
        const dynamicLevel = 0.55 + Math.sin(tick * 0.4) * 0.35 + Math.random() * 0.1;
        setAudioLevel(Math.min(1, Math.max(0.3, dynamicLevel)));
      } else {
        // Respiración suave y constante cuando está escuchando en silencio
        const idleLevel = 0.18 + Math.sin(tick * 0.2) * 0.08;
        setAudioLevel(Math.min(0.35, Math.max(0.1, idleLevel)));
      }
    }, 60);
  }, []);

  const stopVisualWaveAnimation = useCallback(() => {
    if (waveIntervalRef.current) {
      clearInterval(waveIntervalRef.current);
      waveIntervalRef.current = null;
    }
    speechActiveRef.current = false;
    setAudioLevel(0);
  }, []);

  // Limpiar temporizador de silencio
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  // Detener escucha y entregar resultado procesado
  const stopListening = useCallback(() => {
    clearSilenceTimer();
    isListeningRef.current = false;
    setIsListening(false);
    stopVisualWaveAnimation();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    const rawResult = (
      latestCombinedTranscriptRef.current || 
      fullTranscriptRef.current || 
      lastInterimRef.current
    ).trim();
    
    setInterimTranscript("");
    fullTranscriptRef.current = "";
    lastInterimRef.current = "";
    latestCombinedTranscriptRef.current = "";
    speechActiveRef.current = false;

    if (rawResult) {
      // Aplicar pipeline de corrección fonética y NLP peruano
      const cleaned = normalizePeruvianCivicSpeech(rawResult);
      if (onResult) {
        onResult(cleaned);
      }
    }
  }, [clearSilenceTimer, stopVisualWaveAnimation, onResult]);

  // Programar auto-cierre tras silencio prolongado
  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    if (silenceTimeoutMs > 0 && isListeningRef.current) {
      silenceTimerRef.current = setTimeout(() => {
        const currentSpoken = (
          latestCombinedTranscriptRef.current || 
          fullTranscriptRef.current || 
          lastInterimRef.current
        ).trim();

        if (isListeningRef.current && currentSpoken.length > 0) {
          stopListening();
        } else {
          speechActiveRef.current = false;
        }
      }, silenceTimeoutMs);
    }
  }, [clearSilenceTimer, silenceTimeoutMs, stopListening]);

  // Iniciar reconocimiento continuo con soporte móvil nativo
  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Tu navegador no soporta reconocimiento de voz. Te recomendamos Chrome o Edge.");
      return;
    }

    haptic.selection();
    fullTranscriptRef.current = "";
    lastInterimRef.current = "";
    latestCombinedTranscriptRef.current = "";
    speechActiveRef.current = false;
    setInterimTranscript("");
    isListeningRef.current = true;
    setIsListening(true);

    startVisualWaveAnimation();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLangRef.current || lang || "es-PE";
      // En móviles, continuous: true causa bloqueos o interrupciones en Chrome Android.
      // Usamos continuous: true en desktop y un ciclo resiliente en móvil.
      recognition.continuous = !isMobile;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };

      recognition.onspeechstart = () => {
        speechActiveRef.current = true;
      };

      recognition.onspeechend = () => {
        speechActiveRef.current = false;
        resetSilenceTimer();
      };

      recognition.onresult = (event: any) => {
        speechActiveRef.current = true;
        let currentInterim = "";
        let newFinal = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item && item[0]) {
            const trans = item[0].transcript;
            if (item.isFinal) {
              newFinal += (newFinal ? " " : "") + trans;
            } else {
              currentInterim += (currentInterim ? " " : "") + trans;
            }
          }
        }

        if (newFinal) {
          fullTranscriptRef.current = (fullTranscriptRef.current + " " + newFinal).trim();
        }

        lastInterimRef.current = currentInterim;
        setInterimTranscript(currentInterim);
        const combined = (fullTranscriptRef.current + (currentInterim ? " " + currentInterim : "")).trim();
        latestCombinedTranscriptRef.current = combined;

        if (onInterim) {
          onInterim(combined);
        }

        // Reiniciar contador de silencio cuando el usuario habla
        resetSilenceTimer();
      };

      recognition.onerror = (e: any) => {
        console.warn("[LOTA Voice] SpeechRecognition event:", e.error);
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          toast.error("Permiso de micrófono denegado. Habilita el acceso al micrófono en tu navegador.");
          stopListening();
        } else if (e.error === "language-not-supported") {
          // Fallback a español internacional si el dialecto regional no está instalado en el teléfono
          currentLangRef.current = "es-419";
          try {
            recognition.lang = "es-419";
            recognition.start();
          } catch {}
        } else if (e.error === "no-speech") {
          speechActiveRef.current = false;
        } else if (e.error === "network") {
          // Micro-falla de red; no desconectar si el usuario sigue en sesión
        }
      };

      recognition.onend = () => {
        // Auto-reconexión fluida para mantener escucha activa
        if (isListeningRef.current) {
          const currentSpoken = (
            latestCombinedTranscriptRef.current || 
            fullTranscriptRef.current || 
            lastInterimRef.current
          ).trim();

          // Si hay texto acumulado y el usuario guardó silencio, finalizar
          if (isMobile && currentSpoken.length > 0) {
            stopListening();
          } else {
            try {
              recognition.start();
            } catch {
              stopListening();
            }
          }
        } else {
          stopVisualWaveAnimation();
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      resetSilenceTimer();
    } catch (err) {
      console.error("Error al iniciar SpeechRecognition:", err);
      toast.error("No se pudo activar el micrófono.");
      isListeningRef.current = false;
      setIsListening(false);
      stopVisualWaveAnimation();
    }
  }, [lang, onInterim, resetSilenceTimer, startVisualWaveAnimation, stopVisualWaveAnimation, stopListening]);

  // Alternar micrófono
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Cancelar escucha descartando lo grabado
  const cancelListening = useCallback(() => {
    clearSilenceTimer();
    isListeningRef.current = false;
    setIsListening(false);
    stopVisualWaveAnimation();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    fullTranscriptRef.current = "";
    lastInterimRef.current = "";
    latestCombinedTranscriptRef.current = "";
    setInterimTranscript("");
    speechActiveRef.current = false;
  }, [clearSilenceTimer, stopVisualWaveAnimation]);

  // Limpieza al desmontar componente
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      clearSilenceTimer();
      stopVisualWaveAnimation();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [clearSilenceTimer, stopVisualWaveAnimation]);

  return {
    isListening,
    interimTranscript,
    audioLevel,
    hasSupport,
    startListening,
    stopListening,
    cancelListening,
    toggleListening
  };
}
