import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  ArrowLeftRegular, 
  DismissRegular, 
  PinRegular, 
  MicRegular, 
  CheckmarkRegular, 
  SearchRegular
} from "@fluentui/react-icons";
import { 
  Compass, 
  Move, 
  Layers, 
  CheckCircle2, 
  Zap, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle,
  FolderSearch,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";

interface OnboardingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
  onOpenEntityReorder?: () => void;
}

// ── Figma Cursor Component ──
function FigmaCursorBadge({ 
  label, 
  color = "#0D99FF", 
  textColor = "#FFFFFF",
  x = 0, 
  y = 0 
}: { 
  label: string; 
  color?: string; 
  textColor?: string;
  x?: number; 
  y?: number;
}) {
  return (
    <div 
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "flex-start",
        pointerEvents: "none",
        zIndex: 20,
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))"
      }}
    >
      {/* SVG Figma Pointer */}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(-12deg)", flexShrink: 0 }}>
        <path 
          d="M0.5 0.5L6.5 15L9.5 9.5L15 6.5L0.5 0.5Z" 
          fill={color} 
          stroke="#FFFFFF" 
          strokeWidth="1.2" 
          strokeLinejoin="round" 
        />
      </svg>
      {/* Badge Name Tag */}
      <div 
        style={{
          background: color,
          color: textColor,
          fontSize: 10.5,
          fontWeight: 700,
          fontFamily: "'Inter', -apple-system, sans-serif",
          padding: "2px 6px",
          borderRadius: "0 6px 6px 6px",
          marginLeft: -2,
          marginTop: 6,
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
          lineHeight: 1.2
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Figma Corner Handle ──
function FigmaHandle({ position, color = "#0D99FF" }: { position: "tl" | "tr" | "bl" | "br"; color?: string }) {
  const styles: React.CSSProperties = {
    position: "absolute",
    width: 6,
    height: 6,
    background: "#FFFFFF",
    border: `1.5px solid ${color}`,
    borderRadius: 1,
    zIndex: 10,
    boxSizing: "border-box"
  };

  if (position === "tl") { styles.top = -3.5; styles.left = -3.5; }
  if (position === "tr") { styles.top = -3.5; styles.right = -3.5; }
  if (position === "bl") { styles.bottom = -3.5; styles.left = -3.5; }
  if (position === "br") { styles.bottom = -3.5; styles.right = -3.5; }

  return <div style={styles} />;
}

export function OnboardingGuideModal({
  isOpen,
  onClose,
  theme = "dark",
  onOpenEntityReorder
}: OnboardingGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isDarkMode = theme === "dark";

  // Colores exactos de ChatGPT
  const C = {
    bg: isDarkMode ? "#212121" : "#FFFFFF",
    canvas: isDarkMode ? "#171717" : "#F9F9F9",
    surface: isDarkMode ? "#2F2F2F" : "#FFFFFF",
    surfaceAlt: isDarkMode ? "rgba(255, 255, 255, 0.04)" : "#F4F4F4",
    border: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5E5",
    borderFocus: isDarkMode ? "#38BDF8" : "#10A37F",
    textPrimary: isDarkMode ? "#ECECEC" : "#0D0D0D",
    textSecondary: isDarkMode ? "#B4B4B4" : "#737373",
    textMuted: isDarkMode ? "#8E8E8E" : "#A3A3A3",
    dotColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
    figmaBlue: "#0D99FF",
    figmaGreen: "#10A37F",
    figmaPurple: "#8B5CF6",
    figmaAmber: "#F59E0B",
    figmaRed: "#F24E1E"
  };

  // Reiniciar paso al abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // Manejo de teclado
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep]);

  const handleFinish = () => {
    haptic.success();
    sound.playClick();
    try {
      localStorage.setItem("ahorratiempo_onboarding_v1", "true");
    } catch {}
    onClose();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      haptic.selection();
      sound.playClick();
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      haptic.selection();
      sound.playHoverKey();
      setCurrentStep(prev => prev - 1);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ── PASO 1: Catálogo y Directorio Oficial (100% GRATUITO) ──
  // ─────────────────────────────────────────────────────────────
  const Step1Illustration = (
    <div style={{
      background: C.canvas,
      backgroundImage: `radial-gradient(circle, ${C.dotColor} 1.2px, transparent 1.2px)`,
      backgroundSize: "14px 14px",
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Top Figma Frame Tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: isDarkMode ? "rgba(13, 153, 255, 0.15)" : "rgba(13, 153, 255, 0.1)",
          color: C.figmaBlue,
          padding: "2px 8px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          border: `1px solid ${isDarkMode ? "rgba(13, 153, 255, 0.3)" : "rgba(13, 153, 255, 0.2)"}`
        }}>
          <Layers size={11} />
          <span>Frame: Directorio Central Universal</span>
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: isDarkMode ? "rgba(16, 163, 127, 0.18)" : "rgba(16, 163, 127, 0.12)",
          color: C.figmaGreen,
          padding: "2px 8px",
          borderRadius: 99,
          fontSize: 10.5,
          fontWeight: 750
        }}>
          <CheckCircle2 size={11} />
          <span>100% Gratuito & Libre Consulta</span>
        </div>
      </div>

      {/* Figma Canvas Tree Diagram */}
      <div style={{
        position: "relative",
        background: C.surface,
        borderRadius: 12,
        padding: "14px 12px",
        border: `1px solid ${C.border}`,
        boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.04)"
      }}>
        {/* Figma Cursor */}
        <FigmaCursorBadge 
          label="🇵🇪 Ciudadano • Acceso Libre (S/. 0)" 
          color={C.figmaGreen} 
          x={180} 
          y={-10} 
        />

        {/* Master Node: AhorraTiempo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14
        }}>
          <div style={{
            position: "relative",
            background: isDarkMode ? "#1F2937" : "#EFF6FF",
            border: `1.5px solid ${C.figmaBlue}`,
            borderRadius: 8,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: `0 0 0 3px ${isDarkMode ? "rgba(13, 153, 255, 0.15)" : "rgba(13, 153, 255, 0.12)"}`
          }}>
            <FigmaHandle position="tl" color={C.figmaBlue} />
            <FigmaHandle position="tr" color={C.figmaBlue} />
            <FigmaHandle position="bl" color={C.figmaBlue} />
            <FigmaHandle position="br" color={C.figmaBlue} />
            <span style={{ fontSize: 13 }}>🏛️</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: isDarkMode ? "#F3F4F6" : "#1E3A8A" }}>
              AhorraTiempo.pe
            </span>
            <span style={{
              fontSize: 9.5,
              background: C.figmaBlue,
              color: "#FFF",
              padding: "1px 5px",
              borderRadius: 4,
              fontWeight: 700
            }}>
              HUB
            </span>
          </div>
        </div>

        {/* SVG Bezier Connectors Tree */}
        <svg 
          width="100%" 
          height="28" 
          viewBox="0 0 380 28" 
          fill="none" 
          style={{ display: "block", margin: "-6px 0 2px" }}
        >
          {/* Main vertical line from root */}
          <path d="M190 0 L190 10" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Horizontal distributor */}
          <path d="M50 10 L330 10" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" />
          {/* Vertical drops to 4 entities */}
          <path d="M50 10 L50 28" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" />
          <path d="M140 10 L140 28" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" />
          <path d="M240 10 L240 28" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" />
          <path d="M330 10 L330 28" stroke={isDarkMode ? "rgba(255,255,255,0.25)" : "#CBD5E1"} strokeWidth="1.5" />
        </svg>

        {/* 4 Connected Entities & Sub-trámites */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6
        }}>
          {[
            { name: "RENIEC", sub: "DNIe / Copia", color: "#059669", bg: isDarkMode ? "rgba(5, 150, 105, 0.15)" : "#ECFDF5" },
            { name: "SUNAT", sub: "RUC Digital", color: "#2563EB", bg: isDarkMode ? "rgba(37, 99, 235, 0.15)" : "#EFF6FF" },
            { name: "MIGRAC.", sub: "Pasaporte", color: "#0284C7", bg: isDarkMode ? "rgba(2, 132, 199, 0.15)" : "#F0F9FF" },
            { name: "MTC", sub: "Brevete", color: "#DC2626", bg: isDarkMode ? "rgba(220, 38, 38, 0.15)" : "#FEF2F2" },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.bg,
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.06)"}`,
              borderRadius: 8,
              padding: "7px 4px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: item.color }}>{item.name}</span>
              <span style={{ fontSize: 9.5, color: C.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.sub}
              </span>
              <div style={{
                marginTop: 2,
                fontSize: 8.5,
                fontWeight: 700,
                color: C.figmaGreen,
                background: isDarkMode ? "rgba(16, 163, 127, 0.2)" : "rgba(16, 163, 127, 0.1)",
                borderRadius: 4,
                padding: "1px 0"
              }}>
                .gob.pe ↗
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanatory Note */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "8px 10px"
      }}>
        <ShieldCheck size={16} style={{ color: C.figmaGreen, flexShrink: 0 }} />
        <span style={{ fontSize: 11.5, color: C.textSecondary, lineHeight: 1.35 }}>
          <strong>Directorio Público:</strong> Reúne todas las entidades oficiales en un solo lugar. Consulta libremente requisitos, sedes y trámites que no conocías <strong>sin pago ni intermediarios</strong>.
        </span>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ── PASO 2: Organiza tu Mesa de Trabajo (Hold & Drag) ──
  // ─────────────────────────────────────────────────────────────
  const Step2Illustration = (
    <div style={{
      background: C.canvas,
      backgroundImage: `radial-gradient(circle, ${C.dotColor} 1.2px, transparent 1.2px)`,
      backgroundSize: "14px 14px",
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Top Figma Frame Tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: isDarkMode ? "rgba(13, 153, 255, 0.15)" : "rgba(13, 153, 255, 0.1)",
          color: C.figmaBlue,
          padding: "2px 8px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          border: `1px solid ${isDarkMode ? "rgba(13, 153, 255, 0.3)" : "rgba(13, 153, 255, 0.2)"}`
        }}>
          <Move size={11} />
          <span>Frame: Mesa de Trabajo Personalizada</span>
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: isDarkMode ? "rgba(245, 158, 11, 0.18)" : "rgba(245, 158, 11, 0.12)",
          color: C.figmaAmber,
          padding: "2px 8px",
          borderRadius: 99,
          fontSize: 10.5,
          fontWeight: 750
        }}>
          <PinRegular fontSize={12} />
          <span>Hold & Drag + Favoritos</span>
        </div>
      </div>

      {/* Figma Interactive Representation */}
      <div style={{
        position: "relative",
        background: C.surface,
        borderRadius: 12,
        padding: "14px 12px",
        border: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.04)"
      }}>
        {/* Figma Cursor Arrastrando */}
        <FigmaCursorBadge 
          label="👆 Arrastrando a Posición #1" 
          color={C.figmaBlue} 
          x={140} 
          y={36} 
        />

        {/* Item 1: RENIEC (Pinned) */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDarkMode ? "#262626" : "#F4F4F5",
          borderRadius: 8,
          padding: "7px 10px",
          border: `1px solid ${C.border}`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace" }}>01</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>RENIEC</span>
          </div>
          <span style={{
            fontSize: 10,
            background: isDarkMode ? "rgba(245, 158, 11, 0.2)" : "rgba(245, 158, 11, 0.15)",
            color: C.figmaAmber,
            padding: "1px 6px",
            borderRadius: 4,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 3
          }}>
            📌 Fijada
          </span>
        </div>

        {/* Item 2: SUNAT (In Drag State with Figma Handles & Measurement Lines) */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDarkMode ? "#1E293B" : "#EFF6FF",
          borderRadius: 8,
          padding: "8px 10px",
          border: `1.5px solid ${C.figmaBlue}`,
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: `0 8px 20px ${isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(13, 153, 255, 0.2)"}`,
          zIndex: 10
        }}>
          <FigmaHandle position="tl" color={C.figmaBlue} />
          <FigmaHandle position="tr" color={C.figmaBlue} />
          <FigmaHandle position="bl" color={C.figmaBlue} />
          <FigmaHandle position="br" color={C.figmaBlue} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: C.figmaBlue, fontFamily: "monospace", fontWeight: 800 }}>02</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: isDarkMode ? "#93C5FD" : "#1D4ED8" }}>SUNAT</span>
          </div>

          <div style={{
            fontSize: 10,
            background: C.figmaBlue,
            color: "#FFF",
            padding: "2px 7px",
            borderRadius: 4,
            fontWeight: 750,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <Move size={10} />
            <span>Moviendo...</span>
          </div>
        </div>

        {/* Drop Target Indicator Guide */}
        <div style={{
          height: 2,
          background: C.figmaBlue,
          borderRadius: 2,
          position: "relative",
          margin: "0 4px"
        }}>
          <div style={{
            position: "absolute",
            right: 0,
            top: -7,
            background: C.figmaBlue,
            color: "#FFF",
            fontSize: 8,
            padding: "1px 4px",
            borderRadius: 3,
            fontWeight: 800
          }}>
            Drop Area
          </div>
        </div>

        {/* Item 3: MIGRACIONES */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDarkMode ? "#262626" : "#F4F4F5",
          borderRadius: 8,
          padding: "7px 10px",
          border: `1px solid ${C.border}`,
          opacity: 0.85
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace" }}>03</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>MIGRACIONES</span>
          </div>
          <span style={{ fontSize: 10, color: C.textMuted }}>Pasaporte & Extranjería</span>
        </div>
      </div>

      {/* Explanatory Note */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "8px 10px"
      }}>
        <Move size={16} style={{ color: C.figmaBlue, flexShrink: 0 }} />
        <span style={{ fontSize: 11.5, color: C.textSecondary, lineHeight: 1.35 }}>
          <strong>Control Táctil y Ratón:</strong> Mantén presionada cualquier entidad unos instantes para arrastrarla y ordenarla como desees. Tu configuración se guarda automáticamente.
        </span>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ── PASO 3: LOTA AI — Orientador Ciudadano (Plan PLUS) ──
  // ─────────────────────────────────────────────────────────────
  const Step3Illustration = (
    <div style={{
      background: C.canvas,
      backgroundImage: `radial-gradient(circle, ${C.dotColor} 1.2px, transparent 1.2px)`,
      backgroundSize: "14px 14px",
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Top Figma Frame Tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.1)",
          color: C.figmaPurple,
          padding: "2px 8px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          border: `1px solid ${isDarkMode ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.2)"}`
        }}>
          <Sparkles size={11} />
          <span>Frame: Arquitectura de Servicios</span>
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: isDarkMode ? "rgba(16, 163, 127, 0.18)" : "rgba(16, 163, 127, 0.12)",
          color: C.figmaGreen,
          padding: "2px 8px",
          borderRadius: 99,
          fontSize: 10.5,
          fontWeight: 750
        }}>
          <Zap size={11} />
          <span>Orientador 24/7 con IA</span>
        </div>
      </div>

      {/* Side-by-Side Figma Comparison Flow */}
      <div style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>
        {/* Figma Cursor for LOTA AI */}
        <FigmaCursorBadge 
          label="✨ LOTA IA • Orientador Guiado" 
          color={C.figmaPurple} 
          x={140} 
          y={-10} 
        />

        {/* Box Left: Directorio Oficial (GRATIS) */}
        <div style={{
          background: C.surface,
          borderRadius: 12,
          padding: "12px 10px",
          border: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          position: "relative"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.textPrimary }}>
              Directorio Público
            </span>
            <span style={{
              fontSize: 9,
              background: isDarkMode ? "rgba(16, 163, 127, 0.2)" : "rgba(16, 163, 127, 0.12)",
              color: C.figmaGreen,
              padding: "1px 5px",
              borderRadius: 4,
              fontWeight: 800
            }}>
              GRATIS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 10.5, color: C.textSecondary }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={11} style={{ color: C.figmaGreen }} />
              <span>Buscador de entidades</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={11} style={{ color: C.figmaGreen }} />
              <span>Enlaces a sedes .gob.pe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={11} style={{ color: C.figmaGreen }} />
              <span>Requisitos generales</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px",
            textAlign: "center",
            background: isDarkMode ? "rgba(255,255,255,0.04)" : "#F4F4F5",
            borderRadius: 6,
            fontSize: 9.5,
            fontWeight: 700,
            color: C.textMuted
          }}>
            Sin registro ni pago
          </div>
        </div>

        {/* Box Right: LOTA AI Orientador (Plan PLUS) */}
        <div style={{
          position: "relative",
          background: isDarkMode ? "#1E1B2E" : "#F5F3FF",
          borderRadius: 12,
          padding: "12px 10px",
          border: `1.5px solid ${C.figmaPurple}`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          boxShadow: isDarkMode ? "0 4px 20px rgba(139, 92, 246, 0.2)" : "0 2px 12px rgba(139, 92, 246, 0.12)"
        }}>
          <FigmaHandle position="tl" color={C.figmaPurple} />
          <FigmaHandle position="tr" color={C.figmaPurple} />
          <FigmaHandle position="bl" color={C.figmaPurple} />
          <FigmaHandle position="br" color={C.figmaPurple} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Sparkles size={12} style={{ color: C.figmaPurple }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: isDarkMode ? "#DDD6FE" : "#6D28D9" }}>
                LOTA IA Orientador
              </span>
            </div>
            <span style={{
              fontSize: 9,
              background: C.figmaPurple,
              color: "#FFF",
              padding: "1px 5px",
              borderRadius: 4,
              fontWeight: 800
            }}>
              PLAN PLUS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 10.5, color: isDarkMode ? "#E2E8F0" : "#4B5563" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={10} style={{ color: C.figmaPurple }} />
              <span>Asesoría paso a paso 24/7</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={10} style={{ color: C.figmaPurple }} />
              <span>Cálculo de tasas Págalo.pe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={10} style={{ color: C.figmaPurple }} />
              <span>Consultas por voz y texto</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px",
            textAlign: "center",
            background: isDarkMode ? "rgba(139, 92, 246, 0.25)" : "rgba(139, 92, 246, 0.15)",
            borderRadius: 6,
            fontSize: 9.5,
            fontWeight: 750,
            color: isDarkMode ? "#DDD6FE" : "#6D28D9"
          }}>
            Consultas guiadas personalizadas
          </div>
        </div>
      </div>

      {/* Explanatory Note */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "8px 10px"
      }}>
        <Sparkles size={16} style={{ color: C.figmaPurple, flexShrink: 0 }} />
        <span style={{ fontSize: 11.5, color: C.textSecondary, lineHeight: 1.35 }}>
          <strong>Tu Tramitador Inteligente:</strong> Si deseas un orientador que averigüe a fondo tu caso y te guíe paso a paso, suscríbete a <strong>LOTA AI PLUS</strong> para disfrutar de consultas ilimitadas.
        </span>
      </div>
    </div>
  );

  const steps = [
    {
      badge: "Paso 1 de 3 • Catálogo Oficial Gratuito",
      title: "Todas las Entidades del Estado en un Solo Lugar",
      subtitle: "Acceso 100% libre y gratuito para ubicar trámites, sedes y requisitos oficiales.",
      icon: <Compass size={22} style={{ color: C.figmaBlue }} />,
      illustration: Step1Illustration
    },
    {
      badge: "Paso 2 de 3 • Personalización",
      title: "Organiza y Acomoda tu Barra Lateral",
      subtitle: "Mantén presionada cualquier entidad para cambiarla de posición o fijarla con 📌.",
      icon: <Move size={22} style={{ color: C.figmaAmber }} />,
      illustration: Step2Illustration
    },
    {
      badge: "Paso 3 de 3 • Orientación Inteligente",
      title: "LOTA IA: Tu Orientador y Tramitador Personal",
      subtitle: "Asistencia guiada 24/7 por voz y texto con el Plan LOTA AI PLUS.",
      icon: <Sparkles size={22} style={{ color: C.figmaPurple }} />,
      illustration: Step3Illustration
    }
  ];

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleFinish();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 14 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          maxWidth: 620,
          width: "100%",
          background: C.bg,
          borderRadius: 22,
          border: `1px solid ${C.border}`,
          boxShadow: isDarkMode 
            ? "0 28px 70px rgba(0, 0, 0, 0.85), 0 0 1px rgba(255, 255, 255, 0.2)" 
            : "0 20px 60px rgba(0, 0, 0, 0.12)",
          padding: "24px 24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
          boxSizing: "border-box",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}
      >
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={handleFinish}
          title="Cerrar guía"
          aria-label="Cerrar guía"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: C.surface,
            color: C.textSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s ease"
          }}
        >
          <DismissRegular fontSize={15} />
        </button>

        {/* Encabezado del Paso */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingRight: 36 }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: C.surface,
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: isDarkMode ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.04)"
          }}>
            {step.icon}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{
              fontSize: 11.5,
              fontWeight: 750,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: currentStep === 0 ? C.figmaBlue : currentStep === 1 ? C.figmaAmber : C.figmaPurple
            }}>
              {step.badge}
            </span>
            <h3 style={{
              margin: 0,
              fontSize: 17.5,
              fontWeight: 800,
              color: C.textPrimary,
              lineHeight: 1.25,
              letterSpacing: "-0.015em"
            }}>
              {step.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: C.textSecondary,
              lineHeight: 1.4
            }}>
              {step.subtitle}
            </p>
          </div>
        </div>

        {/* Contenido Visual / Ilustración Figma Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {step.illustration}
          </motion.div>
        </AnimatePresence>

        {/* Barra Inferior: Indicador de Pasos y Botones */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E5E5"}`
        }}>
          {/* Indicador de Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  haptic.selection();
                  setCurrentStep(idx);
                }}
                aria-label={`Ir al paso ${idx + 1}`}
                style={{
                  width: currentStep === idx ? 24 : 7,
                  height: 7,
                  borderRadius: 99,
                  background: currentStep === idx 
                    ? (currentStep === 0 ? C.figmaBlue : currentStep === 1 ? C.figmaAmber : C.figmaGreen)
                    : (isDarkMode ? "rgba(255, 255, 255, 0.18)" : "#E5E5E5"),
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.22s ease"
                }}
              />
            ))}
          </div>

          {/* Botones de Navegación */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.textPrimary,
                  fontSize: 13,
                  fontWeight: 650,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <ArrowLeftRegular fontSize={13} />
                <span>Atrás</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "transparent",
                  color: C.textSecondary,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Saltar guía
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                border: "none",
                background: currentStep === steps.length - 1
                  ? C.figmaGreen
                  : (isDarkMode ? "#ECECEC" : "#0D0D0D"),
                color: currentStep === steps.length - 1 ? "#FFFFFF" : (isDarkMode ? "#0D0D0D" : "#FFFFFF"),
                fontSize: 13,
                fontWeight: 750,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: currentStep === steps.length - 1
                  ? "0 4px 14px rgba(16, 163, 127, 0.35)"
                  : (isDarkMode ? "0 4px 14px rgba(0, 0, 0, 0.4)" : "0 4px 14px rgba(0, 0, 0, 0.15)")
              }}
            >
              <span>{currentStep === steps.length - 1 ? "¡Empezar a usar AhorraTiempo!" : "Siguiente"}</span>
              {currentStep === steps.length - 1 ? (
                <CheckmarkRegular fontSize={14} />
              ) : (
                <ArrowRightRegular fontSize={14} />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
