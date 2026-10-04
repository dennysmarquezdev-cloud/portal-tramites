import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDownloadRegular, 
  CopyRegular, 
  CheckmarkRegular, 
  SparkleRegular, 
  EyeRegular, 
  PhoneRegular, 
  LaptopRegular, 
  GridRegular, 
  VideoRegular, 
  ColorRegular, 
  ArrowLeftRegular,
  ChatRegular,
  BotRegular,
  ShieldCheckmarkRegular,
  OpenRegular,
  ArrowRightRegular,
  PlayRegular,
  PauseRegular,
  ArrowCounterclockwiseRegular,
  Speaker2Regular,
  SpeakerMuteRegular,
  QrCodeRegular,
  CheckmarkCircleRegular,
  GlobeRegular,
  DocumentSearchRegular,
  BuildingRegular,
  StarRegular,
  RecordRegular,
  ImageRegular,
  FlashRegular,
  ShieldRegular
} from "@fluentui/react-icons";
import { getEntityLogo } from "../data/entityLogos";

interface MarketingKitPageProps {
  onBack?: () => void;
  theme?: "light" | "dark";
}

// Sound Synthesizer via Web Audio API for cinematic commercial sound FX
class SoundFX {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Soft high-tech whoosh transition
  whoosh() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.45);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {
      // Audio context suppressed
    }
  }

  // Energy burst / Impact
  burst() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  // LOTA AI message chime
  chime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [587.33, 880, 1174.66].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  // Success triumph chord
  success() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

export default function MarketingKitPage({ onBack, theme: initialTheme = "light" }: MarketingKitPageProps) {
  const [activeTab, setActiveTab] = useState<"video-15s" | "banner-hero" | "story-vertical" | "post-cuadrado" | "identidad" | "video-guion">("video-15s");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">(initialTheme);
  const [copied, setCopied] = useState<string | null>(null);

  // Video 15s Interactive State
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0); // 0 to 15 seconds
  const [videoFormat, setVideoFormat] = useState<"vertical" | "horizontal">("vertical");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundFxEnabled, setSoundFxEnabled] = useState(true);
  const videoIntervalRef = useRef<any>(null);
  const lastSpokenSceneRef = useRef<number>(-1);
  const videoStageRef = useRef<HTMLDivElement | null>(null);

  // Export / Recording State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const isDark = previewTheme === "dark";
  const G = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

  // Notion Calm Theme
  const notion = {
    bg: isDark ? "#191919" : "#F7F6F3",
    cardBg: isDark ? "#242424" : "#FFFFFF",
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "#E3E2DE",
    title: isDark ? "#EDEDEB" : "#37352F",
    textSub: isDark ? "#9B9A97" : "#6E6D6A",
    textMuted: isDark ? "#6E6D6A" : "#9B9A97",
    pillDefaultBg: isDark ? "rgba(255, 255, 255, 0.06)" : "#F1F1EF",
    pillDefaultText: isDark ? "#D3D2CE" : "#45433F",
    pillDefaultBorder: isDark ? "rgba(255, 255, 255, 0.08)" : "#E3E2DE",
    pillGreenBg: isDark ? "rgba(74, 158, 107, 0.16)" : "#EDF3EC",
    pillGreenText: isDark ? "#86D9A5" : "#2E6B38",
    pillGreenBorder: isDark ? "rgba(74, 158, 107, 0.28)" : "#D5E8D4",
    pillBlueBg: isDark ? "rgba(30, 64, 175, 0.18)" : "#EFF6FF",
    pillBlueText: isDark ? "#93C5FD" : "#1E40AF",
    divider: isDark ? "rgba(255, 255, 255, 0.07)" : "#EDECE9"
  };

  // Official Institutional Logos
  const logoSunat = getEntityLogo("SUNAT");
  const logoReniec = getEntityLogo("RENIEC");
  const logoSunarp = getEntityLogo("SUNARP");
  const logoBanco = getEntityLogo("BN");
  const logoEssalud = getEntityLogo("ESSALUD");
  const logoMtc = getEntityLogo("MTC");

  // Video Voice Synthesis Function
  const speakScene = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-PE";
      utterance.rate = 1.08;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis not available:", e);
    }
  };

  // Video Playback Engine (0s to 15s)
  useEffect(() => {
    if (videoPlaying) {
      videoIntervalRef.current = setInterval(() => {
        setVideoTime(prev => {
          const next = prev + 0.1;
          if (next >= 15) {
            setVideoPlaying(false);
            return 15;
          }
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    } else {
      clearInterval(videoIntervalRef.current);
    }
    return () => clearInterval(videoIntervalRef.current);
  }, [videoPlaying]);

  // Voice & SFX Trigger based on exact seconds
  useEffect(() => {
    if (!videoPlaying) return;

    if (videoTime >= 0 && videoTime < 3 && lastSpokenSceneRef.current !== 1) {
      lastSpokenSceneRef.current = 1;
      if (soundFxEnabled) sfx.whoosh();
      speakScene("¿Cansado de buscar tus trámites en mil páginas distintas del Estado?");
    } else if (videoTime >= 3.2 && videoTime < 7 && lastSpokenSceneRef.current !== 2) {
      lastSpokenSceneRef.current = 2;
      if (soundFxEnabled) sfx.burst();
      speakScene("¡Ya no más! Entra hoy mismo a ahorratiempo.pe.");
    } else if (videoTime >= 7.2 && videoTime < 11 && lastSpokenSceneRef.current !== 3) {
      lastSpokenSceneRef.current = 3;
      if (soundFxEnabled) sfx.chime();
      speakScene("La IA que reúne la información de bastantes entidades públicas en un solo lugar.");
    } else if (videoTime >= 11.2 && videoTime <= 15 && lastSpokenSceneRef.current !== 4) {
      lastSpokenSceneRef.current = 4;
      if (soundFxEnabled) sfx.success();
      speakScene("Todo integrado, rápido y gratis. ¡Entra ya!");
    }
  }, [videoTime, videoPlaying, soundFxEnabled]);

  const handlePlayPause = () => {
    if (videoTime >= 15) {
      setVideoTime(0);
      lastSpokenSceneRef.current = -1;
    }
    setVideoPlaying(!videoPlaying);
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setVideoPlaying(false);
    setVideoTime(0);
    lastSpokenSceneRef.current = -1;
  };

  const jumpToScene = (time: number) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    lastSpokenSceneRef.current = -1;
    setVideoTime(time);
  };

  // Determine current active scene
  const currentScene = videoTime < 3 ? 1 : (videoTime < 7 ? 2 : (videoTime < 11 ? 3 : 4));

  // ── High-Definition Snapshot PNG Exporter ──
  const handleDownloadSnapshot = () => {
    const canvas = document.createElement("canvas");
    const width = videoFormat === "vertical" ? 1080 : 1920;
    const height = videoFormat === "vertical" ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (currentScene === 1) {
      bgGrad.addColorStop(0, "#160B12");
      bgGrad.addColorStop(0.5, "#0D1322");
      bgGrad.addColorStop(1, "#080B10");
    } else if (currentScene === 2) {
      bgGrad.addColorStop(0, "#081C38");
      bgGrad.addColorStop(0.5, "#0A254A");
      bgGrad.addColorStop(1, "#030B14");
    } else if (currentScene === 3) {
      bgGrad.addColorStop(0, "#0B2138");
      bgGrad.addColorStop(0.5, "#0D182A");
      bgGrad.addColorStop(1, "#050811");
    } else {
      bgGrad.addColorStop(0, "#062822");
      bgGrad.addColorStop(0.5, "#0A1E30");
      bgGrad.addColorStop(1, "#040B12");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Header Logo & Domain
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 38px Inter, sans-serif";
    ctx.fillText("ahorratiempo.pe", 80, 110);
    ctx.fillStyle = "#0284C7";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillText("PORTAL OFICIAL DE TRÁMITES", 80, 150);

    // Scene Specific Content
    if (currentScene === 1) {
      ctx.fillStyle = "#EF4444";
      ctx.font = "900 68px Inter, sans-serif";
      ctx.fillText("¿MIL PÁGINAS DISTINTAS?", 80, height * 0.42);
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "500 36px Inter, sans-serif";
      ctx.fillText("No pierdas horas buscando requisitos confusos en el Estado.", 80, height * 0.48);
      ctx.fillText("RENIEC • SUNAT • SUNARP • BANCO DE LA NACIÓN • MTC", 80, height * 0.54);
    } else if (currentScene === 2) {
      ctx.fillStyle = "#38BDF8";
      ctx.font = "900 42px Inter, sans-serif";
      ctx.fillText("¡YA NO MÁS!", 80, height * 0.38);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 84px Inter, sans-serif";
      ctx.fillText("ahorratiempo.pe", 80, height * 0.46);
      ctx.fillStyle = "#94A3B8";
      ctx.font = "500 34px Inter, sans-serif";
      ctx.fillText("El primer portal que reúne todas las entidades públicas del Perú.", 80, height * 0.53);
    } else if (currentScene === 3) {
      ctx.fillStyle = "#10B981";
      ctx.font = "800 36px Inter, sans-serif";
      ctx.fillText("● ASISTENCIA INTELIGENTE CON LOTA AI", 80, height * 0.34);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 64px Inter, sans-serif";
      ctx.fillText("Información oficial consolidada", 80, height * 0.42);
      ctx.fillStyle = "#CBD5E1";
      ctx.font = "500 32px Inter, sans-serif";
      ctx.fillText("• RENIEC (DNI)  • SUNAT (RUC Digital)  • SUNARP (Vehicular)  • Págalo.pe", 80, height * 0.50);
    } else {
      ctx.fillStyle = "#10B981";
      ctx.font = "900 76px Inter, sans-serif";
      ctx.fillText("¡TODO EN UN SOLO SITIO!", 80, height * 0.40);
      ctx.fillStyle = "#38BDF8";
      ctx.font = "900 52px Inter, sans-serif";
      ctx.fillText("Entra hoy mismo gratis a: ahorratiempo.pe", 80, height * 0.48);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "600 30px Inter, sans-serif";
      ctx.fillText("✓ +25 Entidades Oficiales  ✓ Respuestas con IA  ✓ Sin colas ni gestores", 80, height * 0.56);
    }

    // Footer Trust Badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(80, height - 140, width - 160, 2);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "500 24px Inter, sans-serif";
    ctx.fillText("🇵🇪 Diseñado para optimizar el tiempo de todos los peruanos · Escena " + currentScene + " (Segundo " + videoTime.toFixed(1) + "s)", 80, height - 90);

    // Download Trigger
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ahorratiempo-escena-${currentScene}-${videoFormat}.png`;
    link.href = dataUrl;
    link.click();
  };

  // ── HD Video Exporter Engine (WebM / MediaRecorder) ──
  const handleExportVideo = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);
    setExportStatusText("Preparando motor de renderizado HD...");

    const width = videoFormat === "vertical" ? 720 : 1280;
    const height = videoFormat === "vertical" ? 1280 : 720;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("Error al inicializar el lienzo de video");
      setIsExporting(false);
      return;
    }

    // Preload Brand Logo
    const imgLogo = new Image();
    imgLogo.src = "/logo-ahorratiempo.png";
    await new Promise((resolve) => {
      imgLogo.onload = resolve;
      imgLogo.onerror = resolve;
    });

    const fps = 30;
    const totalFrames = 15 * fps; // 450 frames
    const stream = canvas.captureStream(fps);

    let recorder: MediaRecorder;
    try {
      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : (MediaRecorder.isTypeSupported("video/webm") ? "video/webm" : "video/mp4");
      recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6000000 });
    } catch (e) {
      recorder = new MediaRecorder(stream);
    }

    const recordedChunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: recorder.mimeType || "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ahorratiempo-spot-15s-${videoFormat}.webm`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setIsExporting(false);
      setExportProgress(100);
      setExportStatusText("¡Video exportado exitosamente!");
    };

    recorder.start();

    // Render frame by frame
    for (let frame = 0; frame <= totalFrames; frame++) {
      const time = frame / fps;
      const progressPercent = Math.round((frame / totalFrames) * 100);
      setExportProgress(progressPercent);
      setExportStatusText(`Renderizando fotograma ${frame} / ${totalFrames} (${time.toFixed(1)}s)...`);

      // ── DRAW FRAME ──
      const scene = time < 3 ? 1 : (time < 7 ? 2 : (time < 11 ? 3 : 4));

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (scene === 1) {
        grad.addColorStop(0, "#1A0A10");
        grad.addColorStop(0.5, "#0D1322");
        grad.addColorStop(1, "#060A10");
      } else if (scene === 2) {
        grad.addColorStop(0, "#082142");
        grad.addColorStop(0.5, "#0369A1");
        grad.addColorStop(1, "#06121E");
      } else if (scene === 3) {
        grad.addColorStop(0, "#0A1D30");
        grad.addColorStop(0.5, "#0F172A");
        grad.addColorStop(1, "#030712");
      } else {
        grad.addColorStop(0, "#062E25");
        grad.addColorStop(0.5, "#0F172A");
        grad.addColorStop(1, "#030712");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Grid Pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Top Header
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 26px Inter, sans-serif";
      ctx.fillText("ahorratiempo.pe", 40, 60);

      // Progress Tracker pill
      ctx.fillStyle = "#0284C7";
      ctx.fillRect(width - 170, 36, 130, 30);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 15px Inter, sans-serif";
      ctx.fillText(`${time.toFixed(1)}s / 15.0s`, width - 155, 57);

      // Scene Graphics
      if (scene === 1) {
        // Chaos Scene
        const wobble = Math.sin(frame * 0.2) * 15;
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
        ctx.beginPath();
        ctx.arc(width / 2, height / 2 - 40, 110 + wobble, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#EF4444";
        ctx.font = "900 48px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("¿MIL PÁGINAS DISTINTAS?", width / 2, height * 0.42);

        ctx.fillStyle = "#E2E8F0";
        ctx.font = "600 24px Inter, sans-serif";
        ctx.fillText("SUNAT • RENIEC • SUNARP • MINISTERIOS", width / 2, height * 0.50);

        ctx.fillStyle = "#94A3B8";
        ctx.font = "500 18px Inter, sans-serif";
        ctx.fillText("Colas interminables, páginas caídas y requisitos confusos...", width / 2, height * 0.56);
        ctx.textAlign = "left";
      } else if (scene === 2) {
        // Unification Scene
        const pulse = Math.abs(Math.sin(frame * 0.15)) * 40;
        ctx.fillStyle = "rgba(2, 132, 199, 0.3)";
        ctx.beginPath();
        ctx.arc(width / 2, height * 0.35, 120 + pulse, 0, Math.PI * 2);
        ctx.fill();

        if (imgLogo.complete) {
          ctx.drawImage(imgLogo, width / 2 - 60, height * 0.35 - 60, 120, 120);
        }

        ctx.fillStyle = "#38BDF8";
        ctx.font = "800 28px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("¡YA NO MÁS!", width / 2, height * 0.54);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 58px Inter, sans-serif";
        ctx.fillText("ahorratiempo.pe", width / 2, height * 0.62);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "500 22px Inter, sans-serif";
        ctx.fillText("Tu nuevo portal unificado de trámites oficiales", width / 2, height * 0.68);
        ctx.textAlign = "left";
      } else if (scene === 3) {
        // LOTA AI scene
        ctx.fillStyle = "#10B981";
        ctx.font = "800 22px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("● ASISTENTE INTELIGENTE LOTA AI ACTIVO", width / 2, height * 0.32);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 44px Inter, sans-serif";
        ctx.fillText("CONECTADO AL INSTANTE A:", width / 2, height * 0.40);

        // 4 Grid blocks
        const cardW = width * 0.38;
        const cardH = 65;
        const startX = width / 2 - cardW - 10;
        const startX2 = width / 2 + 10;

        // RENIEC
        ctx.fillStyle = "rgba(30, 64, 175, 0.3)";
        ctx.fillRect(startX, height * 0.46, cardW, cardH);
        ctx.fillStyle = "#93C5FD";
        ctx.font = "bold 20px Inter, sans-serif";
        ctx.fillText("RENIEC (DNI S/ 30.00)", startX + cardW / 2, height * 0.46 + 40);

        // SUNAT
        ctx.fillStyle = "rgba(4, 120, 87, 0.3)";
        ctx.fillRect(startX2, height * 0.46, cardW, cardH);
        ctx.fillStyle = "#86EFAC";
        ctx.fillText("SUNAT (RUC Gratuito)", startX2 + cardW / 2, height * 0.46 + 40);

        // SUNARP
        ctx.fillStyle = "rgba(4, 120, 87, 0.3)";
        ctx.fillRect(startX, height * 0.54, cardW, cardH);
        ctx.fillStyle = "#86EFAC";
        ctx.fillText("SUNARP (Vehicular)", startX + cardW / 2, height * 0.54 + 40);

        // BANCO DE LA NACION
        ctx.fillStyle = "rgba(185, 28, 28, 0.3)";
        ctx.fillRect(startX2, height * 0.54, cardW, cardH);
        ctx.fillStyle = "#FCA5A5";
        ctx.fillText("BANCO DE LA NACIÓN", startX2 + cardW / 2, height * 0.54 + 40);

        ctx.textAlign = "left";
      } else {
        // Finale Scene
        ctx.fillStyle = "#10B981";
        ctx.font = "900 52px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("¡TODO EN UN SOLO SITIO!", width / 2, height * 0.36);

        if (imgLogo.complete) {
          ctx.drawImage(imgLogo, width / 2 - 50, height * 0.42, 100, 100);
        }

        ctx.fillStyle = "#38BDF8";
        ctx.font = "900 46px Inter, sans-serif";
        ctx.fillText("ahorratiempo.pe", width / 2, height * 0.60);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 22px Inter, sans-serif";
        ctx.fillText("✓ +25 Entidades  ✓ 100% Gratis  ✓ IA 24/7", width / 2, height * 0.67);
        ctx.textAlign = "left";
      }

      // Bottom Subtitles Box
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(40, height - 90, width - 80, 60);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.strokeRect(40, height - 90, width - 80, 60);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.fillText(
        scene === 1 ? "ESCENA 1: EL PROBLEMA" : (scene === 2 ? "ESCENA 2: LA SOLUCIÓN" : (scene === 3 ? "ESCENA 3: CONEXIÓN LOTA AI" : "ESCENA 4: LLAMADO A LA ACCIÓN")),
        55,
        height - 68
      );

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "500 15px Inter, sans-serif";
      const subtitles = [
        '"¿Cansado de buscar tus trámites en mil páginas distintas del Estado?"',
        '"¡Ya no más! Entra hoy mismo a ahorratiempo.pe."',
        '"La IA que reúne la información de bastantes entidades públicas en un solo lugar."',
        '"Todo integrado, rápido y gratis. ¡Entra ya!"'
      ];
      ctx.fillText(subtitles[scene - 1], 55, height - 44);

      // Yield frame
      await new Promise(r => setTimeout(r, 10));
    }

    recorder.stop();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: isDark ? "#080E1A" : "#EDF3FA",
      color: isDark ? "#F8FAFC" : "#0F172A",
      fontFamily: G,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top Bar Studio */}
      <header style={{
        padding: "16px 28px",
        background: isDark ? "#0F172A" : "#FFFFFF",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#CBD5E1"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
                background: isDark ? "rgba(255,255,255,0.06)" : "#F8FAFC",
                color: isDark ? "#E2E8F0" : "#334155",
                cursor: "pointer",
                fontFamily: G,
                fontSize: 13,
                fontWeight: 650,
                transition: "all 0.15s"
              }}
            >
              <ArrowLeftRegular fontSize={15} /> Volver al portal
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <img 
                src="/logo-ahorratiempo.png" 
                alt="AhorraTiempo" 
                style={{ width: 38, height: 38, objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(2,132,199,0.3))" }} 
              />
              <span style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: "#10B981", border: "2px solid #fff" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 style={{ margin: 0, fontSize: 18, fontWeight: 850, letterSpacing: "-0.02em" }}>
                  Estudio de Marketing & Video HD
                </h1>
                <span style={{ fontSize: 10.5, fontWeight: 800, background: "linear-gradient(135deg, #0284C7, #06B6D4)", color: "#fff", padding: "2px 8px", borderRadius: 6 }}>
                  PRO 4K
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: isDark ? "#94A3B8" : "#64748B" }}>
                Exportador de video • Renderizado en tiempo real • Logos oficiales y voz sincronizada
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Bar: Downloads & Theme */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Direct Video Download Button */}
          <button
            onClick={handleExportVideo}
            disabled={isExporting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 750,
              cursor: isExporting ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
              opacity: isExporting ? 0.7 : 1,
              transition: "all 0.15s"
            }}
          >
            <ArrowDownloadRegular fontSize={16} />
            {isExporting ? `Exportando (${exportProgress}%)...` : "Descargar Video (.webm)"}
          </button>

          {/* Direct Snapshot PNG Download */}
          <button
            onClick={handleDownloadSnapshot}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 8,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
              background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontSize: 12.5,
              fontWeight: 650,
              cursor: "pointer"
            }}
          >
            <ImageRegular fontSize={15} /> Descargar Captura HD (PNG)
          </button>

          {/* Theme Selector */}
          <div style={{
            display: "flex",
            alignItems: "center",
            background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
            borderRadius: 8,
            padding: 3,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`
          }}>
            <button
              onClick={() => setPreviewTheme("light")}
              style={{
                padding: "5px 11px",
                borderRadius: 6,
                border: "none",
                background: !isDark ? "#FFFFFF" : "transparent",
                color: !isDark ? "#0F172A" : "#94A3B8",
                fontWeight: 650,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: !isDark ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
              }}
            >
              ☀️ Claro
            </button>
            <button
              onClick={() => setPreviewTheme("dark")}
              style={{
                padding: "5px 11px",
                borderRadius: 6,
                border: "none",
                background: isDark ? "#1E293B" : "transparent",
                color: isDark ? "#F8FAFC" : "#64748B",
                fontWeight: 650,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "none"
              }}
            >
              🌙 Oscuro
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div style={{
        background: isDark ? "#0B1322" : "#FFFFFF",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0"}`,
        padding: "0 28px",
        display: "flex",
        gap: 8,
        overflowX: "auto"
      }}>
        {[
          { id: "video-15s", label: "🎬 Reproductor de Video HD (15s)", icon: VideoRegular, badge: "DESCARGA DISPONIBLE" },
          { id: "banner-hero", label: "Banner Hero (16:9)", icon: LaptopRegular },
          { id: "story-vertical", label: "Story / Reels (9:16)", icon: PhoneRegular },
          { id: "post-cuadrado", label: "Post Feed (1:1)", icon: GridRegular },
          { id: "identidad", label: "Recursos de Marca & Logos", icon: ColorRegular },
          { id: "video-guion", label: "Guion Escrito & Pautas", icon: DocumentSearchRegular },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "14px 16px",
                background: "none",
                border: "none",
                borderBottom: `2.5px solid ${isActive ? "#0284C7" : "transparent"}`,
                color: isActive ? (isDark ? "#38BDF8" : "#0284C7") : (isDark ? "#94A3B8" : "#64748B"),
                fontWeight: isActive ? 750 : 600,
                fontSize: 13.5,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease"
              }}
            >
              <Icon fontSize={16} /> {tab.label}
              {tab.badge && (
                <span style={{ fontSize: 10, background: "linear-gradient(135deg, #0284C7, #10B981)", color: "#FFFFFF", padding: "1px 7px", borderRadius: 4, fontWeight: 800 }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Studio Body */}
      <main style={{ flex: 1, padding: "28px 24px", maxWidth: 1320, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        
        {/* TAB 0: REPRODUCTOR DE VIDEO DINÁMICO DE 15 SEGUNDOS */}
        {activeTab === "video-15s" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* Top Bar Video Tools */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 850, letterSpacing: "-0.02em" }}>
                  🎬 Spot Publicitario 15s: "Todas las entidades en un solo lugar"
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                  Animación sincronizada segundo a segundo con locución oficial en español, efectos de sonido y descarga directa en HD.
                </p>
              </div>

              {/* Controls & Sound Toggles */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {/* Format Toggle */}
                <div style={{ display: "flex", background: isDark ? "#1E293B" : "#E2E8F0", padding: 3, borderRadius: 8 }}>
                  <button
                    onClick={() => setVideoFormat("vertical")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: videoFormat === "vertical" ? "#0284C7" : "transparent",
                      color: videoFormat === "vertical" ? "#FFFFFF" : (isDark ? "#94A3B8" : "#475569"),
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5
                    }}
                  >
                    <PhoneRegular fontSize={14} /> Vertical 9:16 (TikTok/Reels)
                  </button>
                  <button
                    onClick={() => setVideoFormat("horizontal")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: videoFormat === "horizontal" ? "#0284C7" : "transparent",
                      color: videoFormat === "horizontal" ? "#FFFFFF" : (isDark ? "#94A3B8" : "#475569"),
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5
                    }}
                  >
                    <LaptopRegular fontSize={14} /> Horizontal 16:9 (YouTube/Web)
                  </button>
                </div>

                {/* Voice Toggle */}
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
                    background: voiceEnabled ? (isDark ? "rgba(2, 132, 199, 0.2)" : "#E0F2FE") : (isDark ? "#1E293B" : "#FFFFFF"),
                    color: voiceEnabled ? "#0284C7" : (isDark ? "#94A3B8" : "#64748B"),
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  {voiceEnabled ? <Speaker2Regular fontSize={15} /> : <SpeakerMuteRegular fontSize={15} />}
                  {voiceEnabled ? "Locución Activa" : "Mute"}
                </button>

                {/* Sound FX Toggle */}
                <button
                  onClick={() => setSoundFxEnabled(!soundFxEnabled)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
                    background: soundFxEnabled ? (isDark ? "rgba(16, 185, 129, 0.2)" : "#ECFDF5") : (isDark ? "#1E293B" : "#FFFFFF"),
                    color: soundFxEnabled ? "#10B981" : (isDark ? "#94A3B8" : "#64748B"),
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <FlashRegular fontSize={15} />
                  {soundFxEnabled ? "Efectos SFX" : "Sin SFX"}
                </button>
              </div>
            </div>

            {/* Export Progress Bar when recording */}
            {isExporting && (
              <div style={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                border: "1.5px solid #0284C7",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: "0 10px 30px rgba(2,132,199,0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444", animation: "pulse 1s infinite" }} />
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: notion.title }}>{exportStatusText}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#0284C7" }}>{exportProgress}%</span>
                </div>
                <div style={{ width: "100%", height: 8, background: isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${exportProgress}%`, height: "100%", background: "linear-gradient(90deg, #0284C7, #10B981)", transition: "width 0.1s linear" }} />
                </div>
              </div>
            )}

            {/* ── CINEMATIC VIDEO CANVAS STAGE (AGENCY GRADE) ── */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0" }}>
              
              {/* Vertical Mobile Frame Mockup (Titanium Bezel) */}
              <div 
                ref={videoStageRef}
                style={{
                  width: videoFormat === "vertical" ? 380 : "min(920px, 94vw)",
                  height: videoFormat === "vertical" ? 680 : 518,
                  borderRadius: videoFormat === "vertical" ? 40 : 20,
                  background: isDark 
                    ? "radial-gradient(circle at center, #0B1424 0%, #030712 100%)" 
                    : "radial-gradient(circle at center, #FFFFFF 0%, #E2EEFB 100%)",
                  border: videoFormat === "vertical" 
                    ? `8px solid ${isDark ? "#1E293B" : "#334155"}` 
                    : `3px solid ${isDark ? "#1E293B" : "#CBD5E1"}`,
                  boxShadow: isDark 
                    ? "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)" 
                    : "0 30px 80px rgba(15,23,42,0.22), 0 0 0 1px rgba(0,0,0,0.05)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: videoFormat === "vertical" ? "18px 20px" : "24px 28px",
                  boxSizing: "border-box"
                }}
              >
                {/* Dynamic Island / Bezel Notch for Vertical Phone */}
                {videoFormat === "vertical" && (
                  <div style={{
                    position: "absolute",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 100,
                    height: 22,
                    borderRadius: 12,
                    background: "#000000",
                    zIndex: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    boxSizing: "border-box",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1E293B" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                  </div>
                )}

                {/* Ambient Cinematic Colored Spotlights */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: currentScene === 1 
                    ? "radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.18), transparent 70%)"
                    : (currentScene === 2 
                      ? "radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.35), transparent 70%)"
                      : (currentScene === 3 
                        ? "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.22), transparent 70%)"
                        : "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25), transparent 70%)")),
                  transition: "background 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: "none"
                }} />

                {/* Header Badge & Live Clock */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20, marginTop: videoFormat === "vertical" ? 14 : 0 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.9)",
                    padding: "4px 10px",
                    borderRadius: 20,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#CBD5E1"}`
                  }}>
                    <img src="/logo-ahorratiempo.png" alt="AhorraTiempo" style={{ width: 20, height: 20, objectFit: "contain" }} />
                    <span style={{ fontSize: 12, fontWeight: 850, color: isDark ? "#FFFFFF" : "#0F172A", letterSpacing: "-0.01em" }}>
                      ahorratiempo.pe
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 850,
                      background: "linear-gradient(135deg, #0284C7, #0369A1)",
                      color: "#FFFFFF",
                      padding: "3px 10px",
                      borderRadius: 12,
                      boxShadow: "0 2px 10px rgba(2,132,199,0.4)"
                    }}>
                      {videoTime.toFixed(1)}s / 15.0s
                    </span>
                  </div>
                </div>

                {/* ── 4 CINEMATIC STAGE SCENES ── */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 20 }}>
                  <AnimatePresence mode="wait">
                    
                    {/* ── ESCENA 1 (0:00 - 0:03): Logos Oficiales Caóticos y Ciudadano Abrumado ── */}
                    {currentScene === 1 && (
                      <motion.div
                        key="scene-1"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%", textAlign: "center" }}
                      >
                        {/* 3D Orbiting Official Logos */}
                        <div style={{ position: "relative", width: videoFormat === "vertical" ? 310 : 440, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          
                          {/* Floating Warning Tags */}
                          <motion.div
                            animate={{ opacity: [0.6, 1, 0.6], y: [-2, 2, -2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ position: "absolute", top: -6, background: "rgba(239, 68, 68, 0.9)", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 9.5, fontWeight: 900, letterSpacing: "0.05em" }}
                          >
                            ⚠️ ERROR 404 • PÁGINA CAÍDA
                          </motion.div>

                          {/* Official SUNAT Card */}
                          <motion.div
                            animate={{ y: [-8, 8, -8], x: [-6, 6, -6], rotate: [-8, 8, -8] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              top: 20,
                              left: 6,
                              background: "#FFFFFF",
                              padding: "6px 10px",
                              borderRadius: 10,
                              boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                              border: "1.5px solid #047857",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              zIndex: 10
                            }}
                          >
                            {logoSunat && <img src={logoSunat} alt="SUNAT" style={{ height: 22, maxWidth: 64, objectFit: "contain" }} />}
                            <span style={{ fontSize: 10.5, fontWeight: 850, color: "#047857" }}>SUNAT</span>
                          </motion.div>

                          {/* Official RENIEC Card */}
                          <motion.div
                            animate={{ y: [8, -8, 8], x: [7, -7, 7], rotate: [8, -8, 8] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              top: 22,
                              right: 6,
                              background: "#FFFFFF",
                              padding: "6px 10px",
                              borderRadius: 10,
                              boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                              border: "1.5px solid #1E40AF",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              zIndex: 10
                            }}
                          >
                            {logoReniec && <img src={logoReniec} alt="RENIEC" style={{ height: 22, maxWidth: 64, objectFit: "contain" }} />}
                            <span style={{ fontSize: 10.5, fontWeight: 850, color: "#1E40AF" }}>RENIEC</span>
                          </motion.div>

                          {/* Official SUNARP Card */}
                          <motion.div
                            animate={{ y: [-9, 9, -9], rotate: [-10, 10, -10] }}
                            transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              bottom: 16,
                              left: 10,
                              background: "#FFFFFF",
                              padding: "6px 10px",
                              borderRadius: 10,
                              boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                              border: "1.5px solid #047857",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              zIndex: 10
                            }}
                          >
                            {logoSunarp && <img src={logoSunarp} alt="SUNARP" style={{ height: 22, maxWidth: 64, objectFit: "contain" }} />}
                            <span style={{ fontSize: 10.5, fontWeight: 850, color: "#047857" }}>SUNARP</span>
                          </motion.div>

                          {/* Official Banco de la Nación Card */}
                          <motion.div
                            animate={{ y: [7, -7, 7], rotate: [10, -10, 10] }}
                            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              bottom: 14,
                              right: 8,
                              background: "#FFFFFF",
                              padding: "6px 10px",
                              borderRadius: 10,
                              boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                              border: "1.5px solid #B91C1C",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              zIndex: 10
                            }}
                          >
                            {logoBanco && <img src={logoBanco} alt="Banco de la Nación" style={{ height: 22, maxWidth: 64, objectFit: "contain" }} />}
                            <span style={{ fontSize: 10.5, fontWeight: 850, color: "#B91C1C" }}>BN / Págalo.pe</span>
                          </motion.div>

                          {/* Center Frustrated Citizen Silhouette Avatar */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [-4, 4, -4] }}
                            transition={{ duration: 1.1, repeat: Infinity }}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.05))",
                              border: "2px solid #EF4444",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 0 35px rgba(239, 68, 68, 0.4)",
                              backdropFilter: "blur(8px)"
                            }}
                          >
                            <span style={{ fontSize: 36 }}>🤯</span>
                          </motion.div>
                        </div>

                        {/* High Impact Kinetic Headline */}
                        <div>
                          <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            style={{
                              fontSize: videoFormat === "vertical" ? 23 : 30,
                              fontWeight: 950,
                              color: "#EF4444",
                              letterSpacing: "-0.03em",
                              textTransform: "uppercase",
                              textShadow: "0 2px 16px rgba(239, 68, 68, 0.45)"
                            }}
                          >
                            ¿MIL PÁGINAS DISTINTAS?
                          </motion.div>
                          <p style={{ margin: "6px 0 0", fontSize: 13, color: isDark ? "#CBD5E1" : "#475569", fontWeight: 600 }}>
                            Enlaces rotos, requisitos confusos y colas interminables...
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ── ESCENA 2 (0:03 - 0:07): Unificación y Vórtice de AhorraTiempo ── */}
                    {currentScene === 2 && (
                      <motion.div
                        key="scene-2"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                        transition={{ type: "spring", damping: 18, stiffness: 280 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%", textAlign: "center" }}
                      >
                        {/* Radiant Shockwave Rings & 3D Logo */}
                        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {/* Expanding Outer Ring */}
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.85, 0.3] }}
                            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              width: 170,
                              height: 170,
                              borderRadius: 85,
                              background: "radial-gradient(circle, rgba(2, 132, 199, 0.45) 0%, rgba(2, 132, 199, 0) 70%)"
                            }}
                          />
                          <motion.img
                            src="/logo-ahorratiempo.png"
                            alt="Logo AhorraTiempo"
                            initial={{ scale: 0.25, rotate: -40 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 340, damping: 14 }}
                            style={{
                              width: 110,
                              height: 110,
                              objectFit: "contain",
                              position: "relative",
                              zIndex: 2,
                              filter: "drop-shadow(0 14px 35px rgba(2, 132, 199, 0.65))"
                            }}
                          />
                        </div>

                        {/* Title & Call */}
                        <div>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 900,
                            color: "#0284C7",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em"
                          }}>
                            ¡YA NO MÁS!
                          </div>
                          <div style={{
                            fontSize: videoFormat === "vertical" ? 32 : 38,
                            fontWeight: 950,
                            color: isDark ? "#FFFFFF" : "#090D14",
                            letterSpacing: "-0.035em"
                          }}>
                            ahorratiempo.pe
                          </div>
                          <p style={{ margin: "6px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                            Tu nuevo portal unificado de trámites oficiales en el Perú
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ── ESCENA 3 (0:07 - 0:11): Interfaz Real del Portal con LOTA AI y Entidades Oficiales ── */}
                    {currentScene === 3 && (
                      <motion.div
                        key="scene-3"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", maxWidth: 350 }}
                      >
                        {/* LOTA AI Header Bar */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          background: isDark ? "#141D2E" : "#FFFFFF",
                          padding: "8px 14px",
                          borderRadius: 14,
                          border: `1.5px solid ${notion.border}`,
                          boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ position: "relative" }}>
                              <img src="/assets/lota-ai-logo.png" alt="LOTA AI" style={{ width: 28, height: 28, borderRadius: 8, boxShadow: "0 2px 8px rgba(2,132,199,0.3)" }} />
                              <span style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#10B981", border: "1.5px solid #fff" }} />
                            </div>
                            <div style={{ textAlign: "left" }}>
                              <div style={{ fontSize: 13, fontWeight: 850, color: notion.title }}>LOTA AI</div>
                              <div style={{ fontSize: 10, color: "#10B981", fontWeight: 750 }}>● Conectado a +25 Entidades</div>
                            </div>
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 800, background: "linear-gradient(135deg, #0284C7, #06B6D4)", color: "#FFFFFF", padding: "2px 8px", borderRadius: 10 }}>
                            EN VIVO
                          </span>
                        </div>

                        {/* Real Portal Chat Bubble Interaction */}
                        <div style={{
                          width: "100%",
                          background: notion.cardBg,
                          border: `1.5px solid ${notion.border}`,
                          borderRadius: 14,
                          padding: "12px 14px",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          gap: 9,
                          boxShadow: "0 12px 30px rgba(0,0,0,0.14)"
                        }}>
                          {/* User Query Mock */}
                          <div style={{
                            alignSelf: "flex-end",
                            background: "#0284C7",
                            color: "#FFFFFF",
                            padding: "6px 12px",
                            borderRadius: "12px 12px 3px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            maxWidth: "90%"
                          }}>
                            ¿Cómo saco mi RUC y renuevo mi DNI?
                          </div>

                          {/* LOTA AI Multi-Entity Consolidation */}
                          <div style={{
                            fontSize: 10.5,
                            fontWeight: 850,
                            color: "#0284C7",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            display: "flex",
                            alignItems: "center",
                            gap: 5
                          }}>
                            <SparkleRegular fontSize={13} /> CONSOLIDADO OFICIAL:
                          </div>

                          {/* 4 Official Entity Micro-Cards with Real Logos */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                            {/* RENIEC */}
                            <div style={{
                              background: isDark ? "rgba(30,64,175,0.18)" : "#EFF6FF",
                              border: "1px solid #93C5FD",
                              borderRadius: 8,
                              padding: "6px 8px",
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}>
                              {logoReniec && <img src={logoReniec} alt="RENIEC" style={{ height: 18, width: 38, objectFit: "contain", background: "#fff", borderRadius: 3, padding: "1px 2px" }} />}
                              <div style={{ fontSize: 10, fontWeight: 800, color: "#1E40AF", lineHeight: 1.15 }}>
                                RENIEC <br /><span style={{ fontSize: 9, fontWeight: 500, color: notion.textSub }}>DNI S/ 30.00</span>
                              </div>
                            </div>

                            {/* SUNAT */}
                            <div style={{
                              background: isDark ? "rgba(4,120,87,0.18)" : "#ECFDF5",
                              border: "1px solid #86EFAC",
                              borderRadius: 8,
                              padding: "6px 8px",
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}>
                              {logoSunat && <img src={logoSunat} alt="SUNAT" style={{ height: 18, width: 38, objectFit: "contain", background: "#fff", borderRadius: 3, padding: "1px 2px" }} />}
                              <div style={{ fontSize: 10, fontWeight: 800, color: "#047857", lineHeight: 1.15 }}>
                                SUNAT <br /><span style={{ fontSize: 9, fontWeight: 500, color: notion.textSub }}>RUC Gratuito</span>
                              </div>
                            </div>

                            {/* SUNARP */}
                            <div style={{
                              background: isDark ? "rgba(4,120,87,0.18)" : "#ECFDF5",
                              border: "1px solid #86EFAC",
                              borderRadius: 8,
                              padding: "6px 8px",
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}>
                              {logoSunarp && <img src={logoSunarp} alt="SUNARP" style={{ height: 18, width: 38, objectFit: "contain", background: "#fff", borderRadius: 3, padding: "1px 2px" }} />}
                              <div style={{ fontSize: 10, fontWeight: 800, color: "#047857", lineHeight: 1.15 }}>
                                SUNARP <br /><span style={{ fontSize: 9, fontWeight: 500, color: notion.textSub }}>Vehicular</span>
                              </div>
                            </div>

                            {/* BANCO DE LA NACION */}
                            <div style={{
                              background: isDark ? "rgba(185,28,28,0.18)" : "#FEF2F2",
                              border: "1px solid #FCA5A5",
                              borderRadius: 8,
                              padding: "6px 8px",
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}>
                              {logoBanco && <img src={logoBanco} alt="Banco de la Nación" style={{ height: 18, width: 38, objectFit: "contain", background: "#fff", borderRadius: 3, padding: "1px 2px" }} />}
                              <div style={{ fontSize: 10, fontWeight: 800, color: "#B91C1C", lineHeight: 1.15 }}>
                                BN <br /><span style={{ fontSize: 9, fontWeight: 500, color: notion.textSub }}>Págalo.pe</span>
                              </div>
                            </div>
                          </div>

                          <div style={{
                            fontSize: 10.5,
                            color: notion.textSub,
                            lineHeight: 1.35,
                            borderTop: `1px solid ${notion.divider}`,
                            paddingTop: 6,
                            textAlign: "center"
                          }}>
                            "Requisitos actualizados, tasas oficiales y enlaces directos."
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── ESCENA 4 (0:11 - 0:15): Cierre Triunfal, Link Web y QR ── */}
                    {currentScene === 4 && (
                      <motion.div
                        key="scene-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%", textAlign: "center" }}
                      >
                        <div style={{
                          fontSize: videoFormat === "vertical" ? 23 : 28,
                          fontWeight: 950,
                          color: "#10B981",
                          letterSpacing: "-0.03em",
                          textTransform: "uppercase"
                        }}>
                          ¡TODO EN UN SOLO SITIO!
                        </div>

                        {/* Clean QR & Link Box with HUD Target Brackets */}
                        <div style={{
                          background: notion.cardBg,
                          border: `1.5px solid ${notion.border}`,
                          borderRadius: 16,
                          padding: "14px 18px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 10,
                          boxShadow: "0 14px 35px rgba(0,0,0,0.18)",
                          maxWidth: 250,
                          position: "relative"
                        }}>
                          {/* QR with Official Brand Icon */}
                          <div style={{
                            width: 96,
                            height: 96,
                            background: "#FFFFFF",
                            padding: 6,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1.5px solid #CBD5E1",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                          }}>
                            <img src="/logo-ahorratiempo.png" alt="QR" style={{ width: 76, height: 76, objectFit: "contain" }} />
                          </div>

                          <div style={{ fontSize: 16, fontWeight: 950, color: "#0284C7", letterSpacing: "-0.02em" }}>
                            ahorratiempo.pe
                          </div>
                          
                          <div style={{ display: "flex", gap: 6 }}>
                            <span style={{ fontSize: 9.5, fontWeight: 750, color: notion.pillGreenText, background: notion.pillGreenBg, padding: "2px 6px", borderRadius: 4 }}>
                              ✓ 100% GRATIS
                            </span>
                            <span style={{ fontSize: 9.5, fontWeight: 750, color: notion.pillBlueText, background: notion.pillBlueBg, padding: "2px 6px", borderRadius: 4 }}>
                              ✓ +25 ENTIDADES
                            </span>
                          </div>
                        </div>

                        {/* Pulsing CTA Action Button */}
                        <div style={{
                          background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                          color: "#FFFFFF",
                          padding: "9px 26px",
                          borderRadius: 22,
                          fontSize: 13.5,
                          fontWeight: 850,
                          boxShadow: "0 8px 22px rgba(2, 132, 199, 0.5)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7
                        }}>
                          ¡Entra ya a ahorratiempo.pe! <ArrowRightRegular fontSize={15} />
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Bottom Video Captions Bar (Subtítulos en tiempo real) */}
                <div style={{
                  background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${notion.border}`,
                  borderRadius: 12,
                  padding: "8px 14px",
                  zIndex: 20,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 10, fontWeight: 850, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {currentScene === 1 && "Escena 1 (0:00 - 0:03) • El Caos"}
                    {currentScene === 2 && "Escena 2 (0:03 - 0:07) • La Solución Unificada"}
                    {currentScene === 3 && "Escena 3 (0:07 - 0:11) • Conexión Inteligente LOTA AI"}
                    {currentScene === 4 && "Escena 4 (0:11 - 0:15) • Cierre Triunfal y QR"}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", marginTop: 2 }}>
                    {currentScene === 1 && 'Locución: "¿Cansado de buscar tus trámites en mil páginas distintas del Estado?"'}
                    {currentScene === 2 && 'Locución: "¡Ya no más! Entra hoy mismo a ahorratiempo.pe."'}
                    {currentScene === 3 && 'Locución: "La IA que reúne la información de bastantes entidades públicas en un solo lugar."'}
                    {currentScene === 4 && 'Locución: "Todo integrado, rápido y gratis. ¡Entra ya!"'}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Timeline & Player Controls */}
            <div style={{
              background: notion.cardBg,
              border: `1.5px solid ${notion.border}`,
              borderRadius: 16,
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: 920,
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
            }}>
              {/* Timeline Progress Bar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: notion.textSub }}>
                  <span>0:00</span>
                  <span style={{ color: "#0284C7", fontWeight: 900 }}>{videoTime.toFixed(1)}s / 15.0s</span>
                  <span>0:15</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.1}
                  value={videoTime}
                  onChange={e => {
                    const t = parseFloat(e.target.value);
                    jumpToScene(t);
                  }}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    accentColor: "#0284C7"
                  }}
                />
              </div>

              {/* Action Buttons & Scene Jumpers */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                {/* Play/Pause/Reset */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={handlePlayPause}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "9px 20px",
                      borderRadius: 8,
                      background: "#0284C7",
                      color: "#FFFFFF",
                      border: "none",
                      fontSize: 13.5,
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)"
                    }}
                  >
                    {videoPlaying ? <PauseRegular fontSize={16} /> : <PlayRegular fontSize={16} />}
                    {videoPlaying ? "Pausar" : (videoTime >= 15 ? "Repetir" : "Reproducir")}
                  </button>

                  <button
                    onClick={handleReset}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "9px 14px",
                      borderRadius: 8,
                      background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                      color: isDark ? "#E2E8F0" : "#334155",
                      border: `1px solid ${notion.border}`,
                      fontSize: 12.5,
                      fontWeight: 650,
                      cursor: "pointer"
                    }}
                  >
                    <ArrowCounterclockwiseRegular fontSize={14} /> Reiniciar
                  </button>
                </div>

                {/* Direct Scene Jump Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { label: "1. Caos (0s)", time: 0 },
                    { label: "2. Logo (3s)", time: 3.2 },
                    { label: "3. LOTA AI (7s)", time: 7.2 },
                    { label: "4. Cierre QR (11s)", time: 11.2 },
                  ].map((s, i) => (
                    <button
                      key={i}
                      onClick={() => jumpToScene(s.time)}
                      style={{
                        padding: "6px 11px",
                        borderRadius: 6,
                        border: `1px solid ${notion.border}`,
                        background: (currentScene === i + 1) ? (isDark ? "rgba(2, 132, 199, 0.2)" : "#E0F2FE") : (isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF"),
                        color: (currentScene === i + 1) ? "#0284C7" : (isDark ? "#94A3B8" : "#64748B"),
                        fontSize: 12,
                        fontWeight: (currentScene === i + 1) ? 800 : 600,
                        cursor: "pointer"
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: BANNER HERO 16:9 */}
        {activeTab === "banner-hero" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 850 }}>Banner Publicitario Horizontal (16:9 / 1920x1080)</h2>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                  Composición oficial con logotipos institucionales reales y la interfaz de LOTA AI.
                </p>
              </div>
              <button
                onClick={handleDownloadSnapshot}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: "#0284C7",
                  color: "#FFFFFF",
                  fontSize: 12.5,
                  fontWeight: 750,
                  cursor: "pointer"
                }}
              >
                <ArrowDownloadRegular fontSize={14} /> Descargar Banner HD
              </button>
            </div>

            {/* Canvas 16:9 */}
            <div style={{
              width: "100%",
              aspectRatio: "16 / 9",
              maxHeight: 640,
              borderRadius: 16,
              background: isDark 
                ? "linear-gradient(135deg, #070D18 0%, #0F172A 60%, #1E293B 100%)" 
                : "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #EDF3FA 100%)",
              border: `1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "#CBD5E1"}`,
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.15)",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 48px",
              boxSizing: "border-box"
            }}>
              {/* Left Side: Brand & Value Prop */}
              <div style={{ flex: "1 1 48%", zIndex: 2, display: "flex", flexDirection: "column", gap: 18, maxWidth: 520 }}>
                {/* Brand Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF", padding: "6px 14px", borderRadius: 30, border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "#E2E8F0"}`, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", width: "fit-content" }}>
                  <img src="/logo-ahorratiempo.png" alt="AhorraTiempo" style={{ width: 22, height: 22, objectFit: "contain" }} />
                  <span style={{ fontSize: 13, fontWeight: 750, letterSpacing: "-0.01em", color: isDark ? "#FFFFFF" : "#0F172A" }}>
                    ahorratiempo.pe
                  </span>
                  <span style={{ fontSize: 11, background: "#0284C7", color: "#FFFFFF", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>
                    OFICIAL PERÚ
                  </span>
                </div>

                {/* Main Headline */}
                <h1 style={{
                  margin: 0,
                  fontSize: "clamp(26px, 3.2vw, 42px)",
                  fontWeight: 850,
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                  color: isDark ? "#FFFFFF" : "#090D14"
                }}>
                  Tus trámites oficiales <br />
                  <span style={{ color: "#0284C7" }}>sin colas ni enredos.</span>
                </h1>

                {/* Subtitle */}
                <p style={{
                  margin: 0,
                  fontSize: "clamp(13px, 1.4vw, 16px)",
                  lineHeight: 1.45,
                  color: isDark ? "#94A3B8" : "#475569"
                }}>
                  Orientación con Inteligencia Artificial y acceso directo a más de 25 entidades del Estado.
                </p>

                {/* Real Institutional Logos Carousel Ribbon */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: isDark ? "rgba(0,0,0,0.3)" : "#FFFFFF", padding: "8px 12px", borderRadius: 10, border: `1px solid ${notion.border}` }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: notion.textSub, textTransform: "uppercase" }}>Entidades:</span>
                  {logoSunat && <img src={logoSunat} alt="SUNAT" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                  {logoReniec && <img src={logoReniec} alt="RENIEC" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                  {logoSunarp && <img src={logoSunarp} alt="SUNARP" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                  {logoBanco && <img src={logoBanco} alt="Banco de la Nación" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                  {logoEssalud && <img src={logoEssalud} alt="EsSalud" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                  {logoMtc && <img src={logoMtc} alt="MTC" style={{ height: 20, maxWidth: 55, objectFit: "contain" }} />}
                </div>

                {/* Feature Pills */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  {["✓ Requisitos en 1 Clic", "✓ Tasas Págalo.pe", "✓ Modo Offline"].map((pill, i) => (
                    <span key={i} style={{
                      fontSize: 12,
                      fontWeight: 650,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: isDark ? "rgba(2, 132, 199, 0.15)" : "#E0F2FE",
                      color: isDark ? "#38BDF8" : "#0369A1",
                      border: `1px solid ${isDark ? "rgba(2, 132, 199, 0.3)" : "#BAE6FD"}`
                    }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Real Device Mockup */}
              <div style={{
                flex: "1 1 48%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 2
              }}>
                <div style={{
                  width: "100%",
                  maxWidth: 440,
                  borderRadius: 14,
                  background: notion.cardBg,
                  border: `1.5px solid ${notion.border}`,
                  boxShadow: isDark 
                    ? "0 25px 60px -10px rgba(0,0,0,0.8)" 
                    : "0 25px 50px -12px rgba(55, 53, 47, 0.16)",
                  padding: 18,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12
                }}>
                  {/* Mockup Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${notion.divider}`, paddingBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <img src="/assets/lota-ai-logo.png" alt="LOTA AI" style={{ width: 28, height: 28, borderRadius: 6 }} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 750, color: notion.title }}>LOTA AI</div>
                        <div style={{ fontSize: 11, color: notion.pillGreenText, fontWeight: 600 }}>● Asistente Oficial Activo</div>
                      </div>
                    </div>
                    {logoSunat && <img src={logoSunat} alt="SUNAT" style={{ height: 24, maxWidth: 65, objectFit: "contain" }} />}
                  </div>

                  {/* Mockup Bubble User */}
                  <div style={{ alignSelf: "flex-end", background: "#0284C7", color: "#FFFFFF", padding: "8px 12px", borderRadius: "10px 10px 2px 10px", fontSize: 12.5, fontWeight: 500, maxWidth: "85%" }}>
                    ¿Cómo saco mi RUC digital para emitir recibos por honorarios?
                  </div>

                  {/* Mockup Bubble LOTA AI */}
                  <div style={{ alignSelf: "flex-start", background: notion.pillDefaultBg, border: `1px solid ${notion.pillDefaultBorder}`, color: notion.title, padding: "10px 12px", borderRadius: "10px 10px 10px 2px", fontSize: 12, lineHeight: 1.4, maxWidth: "95%", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontWeight: 650, color: notion.pillGreenText }}>
                      ✓ Trámite 100% Gratuito y Virtual
                    </div>
                    <div>1. Ingresa a la app <strong>SUNAT Personas</strong> con tu DNI.</div>
                    <div>2. Valida tu biometría dactilar y registra tu actividad económica.</div>
                    <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
                      <span style={{ background: notion.cardBg, border: `1px solid ${notion.pillDefaultBorder}`, padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, color: notion.pillGreenText, display: "inline-flex", alignItems: "center", gap: 3 }}>
                        Iniciar en SUNAT <ArrowRightRegular fontSize={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORY VERTICAL (9:16) */}
        {activeTab === "story-vertical" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Anuncio Vertical (9:16 - TikTok / Instagram Reels / Shorts)</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                Formato para historias con tarjeta de trámite real y logotipo de RENIEC.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              <div style={{
                width: 360,
                height: 640,
                borderRadius: 24,
                background: isDark 
                  ? "linear-gradient(180deg, #0A101D 0%, #0F172A 50%, #030712 100%)" 
                  : "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 50%, #E2E8F0 100%)",
                border: `2px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
                boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                padding: "24px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Header Story */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/logo-ahorratiempo.png" alt="Logo" style={{ width: 26, height: 26, objectFit: "contain" }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: isDark ? "#FFFFFF" : "#0F172A" }}>
                      ahorratiempo.pe
                    </span>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: "#0284C7", background: "rgba(2, 132, 199, 0.12)", padding: "2px 8px", borderRadius: 10 }}>
                    LOTA AI
                  </span>
                </div>

                {/* Hero Middle Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center", alignItems: "center" }}>
                  <img src="/assets/lota-ai-logo.png" alt="LOTA AI" style={{ width: 56, height: 56, borderRadius: 14, boxShadow: "0 8px 20px rgba(2, 132, 199, 0.25)" }} />
                  
                  <h3 style={{ margin: 0, fontSize: 21, fontWeight: 850, lineHeight: 1.2, color: isDark ? "#FFFFFF" : "#090D14" }}>
                    ¿Vas a hacer un trámite? <br />
                    <span style={{ color: "#0284C7" }}>No hagas más colas.</span>
                  </h3>

                  {/* Real Procedure Card Preview */}
                  <div style={{
                    width: "100%",
                    background: notion.cardBg,
                    border: `1px solid ${notion.border}`,
                    borderRadius: 12,
                    padding: 12,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {logoReniec && <img src={logoReniec} alt="RENIEC" style={{ height: 18, maxWidth: 50, objectFit: "contain" }} />}
                        <span style={{ fontSize: 10, fontWeight: 750, background: notion.pillGreenBg, color: notion.pillGreenText, padding: "2px 6px", borderRadius: 4 }}>
                          OFICIAL
                        </span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: notion.textSub }}>S/ 30.00</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: notion.title }}>
                      Renovación de DNI por Caducidad
                    </div>
                    <div style={{ fontSize: 11, color: notion.textSub, lineHeight: 1.3 }}>
                      Paga en Págalo.pe (Código 02121) y valida tu foto en la app DNI BioFacial de RENIEC.
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  <div style={{
                    width: "100%",
                    padding: "11px 0",
                    borderRadius: 10,
                    background: "#0284C7",
                    color: "#FFFFFF",
                    fontSize: 13.5,
                    fontWeight: 750,
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)"
                  }}>
                    Consultar Trámite Gratis ➔
                  </div>
                  <span style={{ fontSize: 11, color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                    ahorratiempo.pe
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POST CUADRADO 1:1 */}
        {activeTab === "post-cuadrado" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Post Cuadrado para Redes (1:1 / 1080x1080)</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                Composición para redes sociales con logotipos reales de SUNAT, RENIEC y SUNARP.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              <div style={{
                width: 520,
                height: 520,
                borderRadius: 18,
                background: isDark 
                  ? "linear-gradient(145deg, #090E18 0%, #111C2E 100%)" 
                  : "linear-gradient(145deg, #F8FAFC 0%, #EDF3FA 100%)",
                border: `1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "#CBD5E1"}`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                padding: "32px 32px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/logo-ahorratiempo.png" alt="AhorraTiempo" style={{ width: 32, height: 32, objectFit: "contain" }} />
                    <span style={{ fontSize: 16, fontWeight: 800, color: isDark ? "#FFFFFF" : "#0F172A" }}>
                      ahorratiempo.pe
                    </span>
                  </div>
                  <span style={{ fontSize: 11.5, background: notion.pillGreenBg, color: notion.pillGreenText, padding: "3px 9px", borderRadius: 6, fontWeight: 750 }}>
                    +25 ENTIDADES DEL ESTADO
                  </span>
                </div>

                {/* Center Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 24, fontWeight: 850, lineHeight: 1.2, color: isDark ? "#FFFFFF" : "#090D14" }}>
                    Catálogo Oficial de Trámites en Perú
                  </h3>

                  {/* 3 Real Entity Preview Rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { name: "SUNAT", logo: logoSunat, desc: "RUC Digital, Clave SOL, Recibos", cost: "Gratuito", color: "#047857" },
                      { name: "RENIEC", logo: logoReniec, desc: "Renovación DNI, Duplicados, Actas", cost: "S/ 30.00", color: "#1E40AF" },
                      { name: "SUNARP", logo: logoSunarp, desc: "Consulta vehicular, Copia literal", cost: "S/ 6.00", color: "#047857" },
                    ].map((row, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: notion.cardBg,
                        border: `1px solid ${notion.border}`,
                        borderRadius: 8,
                        padding: "10px 14px"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {row.logo && <img src={row.logo} alt={row.name} style={{ height: 24, width: 60, objectFit: "contain" }} />}
                          <div>
                            <div style={{ fontSize: 12.5, fontWeight: 750, color: row.color }}>{row.name}</div>
                            <div style={{ fontSize: 11.5, color: notion.textSub }}>{row.desc}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: notion.pillGreenText, background: notion.pillGreenBg, padding: "2px 7px", borderRadius: 4 }}>
                          {row.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${notion.divider}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <img src="/assets/lota-ai-logo.png" alt="LOTA AI" style={{ width: 22, height: 22, borderRadius: 5 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: isDark ? "#94A3B8" : "#475569" }}>
                      Asistencia con Inteligencia Artificial
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 750, color: "#0284C7" }}>
                    ahorratiempo.pe
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: IDENTIDAD Y ASSETS */}
        {activeTab === "identidad" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Identidad de Marca y Recursos Oficiales</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                Logotipos oficiales en PNG, paleta de colores y recursos visuales para el área de marketing.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {/* Asset 1: Logo AhorraTiempo */}
              <div style={{ background: notion.cardBg, border: `1px solid ${notion.border}`, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
                <img src="/logo-ahorratiempo.png" alt="Logo AhorraTiempo" style={{ width: 80, height: 80, objectFit: "contain" }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750, color: notion.title }}>Logo AhorraTiempo</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: notion.textSub }}>Ícono oficial azul con símbolo de cronómetro</p>
                </div>
                <a href="/logo-ahorratiempo.png" download="logo-ahorratiempo.png" style={{ textDecoration: "none", width: "100%", padding: "8px 0", borderRadius: 6, background: "#0284C7", color: "#FFFFFF", fontSize: 12.5, fontWeight: 700, textAlign: "center" }}>
                  Descargar PNG
                </a>
              </div>

              {/* Asset 2: Logo LOTA AI */}
              <div style={{ background: notion.cardBg, border: `1px solid ${notion.border}`, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
                <img src="/assets/lota-ai-logo.png" alt="Logo LOTA AI" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 16 }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750, color: notion.title }}>Logo LOTA AI</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: notion.textSub }}>Identidad de la Inteligencia Artificial Asistente</p>
                </div>
                <a href="/assets/lota-ai-logo.png" download="lota-ai-logo.png" style={{ textDecoration: "none", width: "100%", padding: "8px 0", borderRadius: 6, background: "#0284C7", color: "#FFFFFF", fontSize: 12.5, fontWeight: 700, textAlign: "center" }}>
                  Descargar PNG
                </a>
              </div>

              {/* Asset 3: Paleta de Colores */}
              <div style={{ background: notion.cardBg, border: `1px solid ${notion.border}`, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750, color: notion.title }}>Paleta de Colores Oficial</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { name: "Azul AhorraTiempo", hex: "#0284C7" },
                    { name: "Verde Trámites", hex: "#047857" },
                    { name: "Azul Institucional", hex: "#1E40AF" },
                    { name: "Notion Marfil (Fondo)", hex: "#F7F6F3" },
                    { name: "Notion Tinta (Texto)", hex: "#37352F" },
                  ].map((color, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, padding: "4px 8px", borderRadius: 4, background: notion.pillDefaultBg }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: color.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
                        <span style={{ fontWeight: 600, color: notion.title }}>{color.name}</span>
                      </div>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: notion.textSub }}>{color.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GUION DE VIDEO ESCRITO */}
        {activeTab === "video-guion" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Guion Oficial de 15 Segundos</h2>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: isDark ? "#94A3B8" : "#64748B" }}>
                  "Todas las entidades en un solo lugar" • Formato para TikTok, Reels y YouTube Shorts.
                </p>
              </div>
            </div>

            <div style={{ background: notion.cardBg, border: `1px solid ${notion.border}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { 
                  time: "0:00 - 0:03", 
                  title: "1. El Problema (Mil páginas distintas)", 
                  video: "Ciudadano abrumado frente a la pantalla del celular. De fondo, logos desordenados de Reniec, Sunat, Sunarp y Ministerios.", 
                  audio: '¿Cansado de buscar tus trámites en mil páginas distintas del Estado?', 
                  super: "¿MIL PÁGINAS DISTINTAS?" 
                },
                { 
                  time: "0:03 - 0:07", 
                  title: "2. La Unificación (Ya no más)", 
                  video: "Los logos dispersos vuelan hacia el centro de la pantalla y se unifican dentro del logo de ahorratiempo.pe.", 
                  audio: '¡Ya no más! Entra hoy mismo a ahorratiempo.pe.', 
                  super: "ahorratiempo.pe" 
                },
                { 
                  time: "0:07 - 0:11", 
                  title: "3. Conexión LOTA AI (Multi-Entidad)", 
                  video: "Transición rápida. Se ve el celular usando la web y a LOTA AI consolidando datos oficiales de múltiples entidades al instante.", 
                  audio: 'La IA que reúne la información de bastantes entidades públicas en un solo lugar.', 
                  super: "CONECTADO A: • Reniec 🪪 • Sunat 💼 • Sunarp 🚗 • ¡Y más!" 
                },
                { 
                  time: "0:11 - 0:15", 
                  title: "4. Cierre y Llamado a la Acción", 
                  video: "El ciudadano sonríe aliviado. Cierre con fondo limpio, link web grande y un código QR destacado.", 
                  audio: 'Todo integrado, rápido y gratis. ¡Entra ya!', 
                  super: "¡TODO EN UN SOLO SITIO! ahorratiempo.pe" 
                }
              ].map((scene, i) => (
                <div key={i} style={{ borderBottom: i < 3 ? `1px solid ${notion.divider}` : "none", paddingBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, background: "#0284C7", color: "#FFFFFF", padding: "2px 7px", borderRadius: 4 }}>
                      {scene.time}
                    </span>
                    <span style={{ fontSize: 13.5, fontWeight: 750, color: notion.title }}>
                      {scene.title}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, color: notion.textSub, paddingLeft: 6 }}>
                    <strong>Visual:</strong> {scene.video}
                  </div>
                  <div style={{ fontSize: 12.5, color: notion.title, paddingLeft: 6 }}>
                    <strong>Locución (Voz en off):</strong> <em>"{scene.audio}"</em>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#0284C7", fontWeight: 700, paddingLeft: 6 }}>
                    Texto en pantalla: {scene.super}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
