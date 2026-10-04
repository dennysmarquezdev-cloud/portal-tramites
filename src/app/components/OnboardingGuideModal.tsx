import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  ArrowLeftRegular, 
  DismissRegular, 
  PinRegular, 
  PinFilled,
  MicRegular, 
  CheckmarkRegular, 
  SearchRegular,
  GlobeRegular,
  DocumentTextRegular,
  CheckmarkCircleRegular,
  ShieldCheckmarkRegular
} from "@fluentui/react-icons";
import { 
  Compass, 
  Move, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  Pin
} from "lucide-react";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { getEntityLogo } from "../data/entityLogos";

interface OnboardingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
  onOpenEntityReorder?: () => void;
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
    surface: isDarkMode ? "#2F2F2F" : "#F9F9F9",
    surfaceCard: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    border: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5E5",
    borderLight: isDarkMode ? "rgba(255, 255, 255, 0.06)" : "#F0F0F0",
    textPrimary: isDarkMode ? "#ECECEC" : "#0D0D0D",
    textSecondary: isDarkMode ? "#B4B4B4" : "#737373",
    textMuted: isDarkMode ? "#8E8E8E" : "#A3A3A3",
    accentGreen: "#10A37F",
    accentBlue: isDarkMode ? "#38BDF8" : "#0284C7",
    accentAmber: "#F59E0B",
    accentPurple: isDarkMode ? "#A78BFA" : "#7C3AED"
  };

  // Reiniciar paso al abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // Manejo de teclado (Escape, Flechas)
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
  // ── PASO 1: Directorio Universal de Entidades y Trámites ──
  // ─────────────────────────────────────────────────────────────
  const Step1Illustration = (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Banner de Acceso 100% Gratuito */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isDarkMode ? "rgba(16, 163, 127, 0.15)" : "#ECFDF5",
        border: `1px solid ${isDarkMode ? "rgba(16, 163, 127, 0.3)" : "#A7F3D0"}`,
        borderRadius: 10,
        padding: "8px 12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} style={{ color: C.accentGreen }} />
          <span style={{ fontSize: 12, fontWeight: 750, color: isDarkMode ? "#34D399" : "#065F46" }}>
            Catálogo y Buscador 100% Gratuito y Libre
          </span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: isDarkMode ? "#34D399" : "#047857" }}>
          Sin cobros ni registros
        </span>
      </div>

      {/* Grid de Entidades Oficiales con Logos Claros */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8
      }}>
        {[
          { acronym: "RENIEC", desc: "DNIe / Partidas", color: "#059669" },
          { acronym: "SUNAT", desc: "RUC / Clave SOL", color: "#2563EB" },
          { acronym: "MIGRACIONES", desc: "Pasaporte / Citas", color: "#0284C7" },
          { acronym: "MTC", desc: "Brevete / Licencias", color: "#DC2626" }
        ].map((item, idx) => {
          const logoSrc = getEntityLogo(item.acronym);
          return (
            <div
              key={idx}
              style={{
                background: C.surfaceCard,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "10px 6px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 4,
                boxShadow: isDarkMode ? "0 2px 6px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{
                width: 52,
                height: 32,
                background: "#FFFFFF",
                borderRadius: 6,
                border: isDarkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px 4px",
                overflow: "hidden"
              }}>
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={item.acronym}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", imageRendering: "-webkit-optimize-contrast" }}
                  />
                ) : (
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: item.color }}>{item.acronym}</span>
                )}
              </div>
              <span style={{ fontSize: 11, fontWeight: 750, color: C.textPrimary }}>
                {item.acronym}
              </span>
              <span style={{ fontSize: 9.5, color: C.textSecondary, lineHeight: 1.2 }}>
                {item.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Nota descriptiva */}
      <p style={{
        margin: 0,
        fontSize: 12.5,
        lineHeight: 1.45,
        color: C.textSecondary
      }}>
        En <strong>ahorratiempo.pe</strong> encuentras todas las entidades públicas centralizadas para consultar requisitos oficiales, costos en el Banco de la Nación y enlaces directos a las páginas web oficiales <strong>(.gob.pe)</strong> sin intermediarios.
      </p>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ── PASO 2: Organiza tu Mesa de Trabajo (Hold & Drag) ──
  // ─────────────────────────────────────────────────────────────
  const Step2Illustration = (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Vista previa de tarjetas en reordenamiento */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }}>
        {/* Tarjeta 1: Fijada */}
        <div style={{
          background: C.surfaceCard,
          border: `1px solid ${isDarkMode ? "rgba(245, 158, 11, 0.4)" : "#FDE68A"}`,
          borderRadius: 10,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>🏛️</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 750, color: C.textPrimary }}>RENIEC</div>
              <div style={{ fontSize: 10, color: C.textSecondary }}>Identidad & DNI</div>
            </div>
          </div>
          <span style={{
            fontSize: 9.5,
            fontWeight: 700,
            color: C.accentAmber,
            background: isDarkMode ? "rgba(245, 158, 11, 0.2)" : "#FEF3C7",
            padding: "2px 6px",
            borderRadius: 4
          }}>
            📌 Favorita
          </span>
        </div>

        {/* Tarjeta 2: En movimiento sostenido */}
        <div style={{
          background: isDarkMode ? "#1E293B" : "#EFF6FF",
          border: `2px solid ${C.accentBlue}`,
          borderRadius: 10,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: "scale(1.02)",
          boxShadow: isDarkMode ? "0 4px 14px rgba(0,0,0,0.5)" : "0 4px 12px rgba(2, 132, 199, 0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>💼</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: isDarkMode ? "#93C5FD" : "#1D4ED8" }}>SUNAT</div>
              <div style={{ fontSize: 10, color: C.textSecondary }}>Tributos & RUC</div>
            </div>
          </div>
          <span style={{
            fontSize: 9.5,
            fontWeight: 750,
            color: "#FFFFFF",
            background: C.accentBlue,
            padding: "2px 6px",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 3
          }}>
            <Move size={10} /> Mover
          </span>
        </div>
      </div>

      {/* 3 puntos clave explicativos */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ color: C.accentAmber, fontSize: 13, marginTop: 1 }}>📌</span>
          <span style={{ fontSize: 12.5, color: C.textPrimary, lineHeight: 1.35 }}>
            <strong>Fija tus favoritas:</strong> Haz clic en el pin (📌) para mantener tus entidades frecuentes siempre en la parte superior.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ color: C.accentBlue, fontSize: 13, marginTop: 1 }}>👆</span>
          <span style={{ fontSize: 12.5, color: C.textPrimary, lineHeight: 1.35 }}>
            <strong>Reordena manteniendo presionado:</strong> Mantén pulsada cualquier tarjeta y cámbiale de posición libremente.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ color: C.accentGreen, fontSize: 13, marginTop: 1 }}>💾</span>
          <span style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.35 }}>
            Tu orden personalizado se guarda automáticamente en tu navegador para cuando regreses.
          </span>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ── PASO 3: LOTA AI — Orientador Ciudadano (Plan PLUS) ──
  // ─────────────────────────────────────────────────────────────
  const Step3Illustration = (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Comparativa Nítida: Catálogo Gratis vs LOTA AI PLUS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>
        {/* Columna Izquierda: Directorio Gratuito */}
        <div style={{
          background: C.surfaceCard,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.textPrimary }}>
              Directorio Público
            </span>
            <span style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: C.accentGreen,
              background: isDarkMode ? "rgba(16, 163, 127, 0.2)" : "#ECFDF5",
              padding: "1px 6px",
              borderRadius: 4
            }}>
              GRATIS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, color: C.textSecondary }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={12} style={{ color: C.accentGreen }} />
              <span>Buscador de +30 entidades</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={12} style={{ color: C.accentGreen }} />
              <span>Enlaces a sedes .gob.pe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckmarkRegular fontSize={12} style={{ color: C.accentGreen }} />
              <span>Requisitos y sedes oficiales</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px 6px",
            textAlign: "center",
            background: isDarkMode ? "rgba(255,255,255,0.04)" : "#F4F4F5",
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 700,
            color: C.textMuted
          }}>
            Acceso libre sin registro
          </div>
        </div>

        {/* Columna Derecha: LOTA AI Orientador (Plan PLUS) */}
        <div style={{
          background: isDarkMode ? "#1F1D2B" : "#F5F3FF",
          border: `1.5px solid ${isDarkMode ? "rgba(167, 139, 250, 0.4)" : "#DDD6FE"}`,
          borderRadius: 12,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          boxShadow: isDarkMode ? "0 4px 14px rgba(124, 58, 237, 0.15)" : "0 2px 8px rgba(124, 58, 237, 0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Sparkles size={13} style={{ color: C.accentPurple }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: isDarkMode ? "#E9D5FF" : "#6D28D9" }}>
                LOTA AI Orientador
              </span>
            </div>
            <span style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: "#FFFFFF",
              background: C.accentPurple,
              padding: "1px 6px",
              borderRadius: 4
            }}>
              PLAN PLUS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, color: isDarkMode ? "#E2E8F0" : "#4B5563" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={11} style={{ color: C.accentPurple }} />
              <span>Orientación guiada 24/7</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={11} style={{ color: C.accentPurple }} />
              <span>Cálculo de tasas en Págalo.pe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={11} style={{ color: C.accentPurple }} />
              <span>Preguntas por voz y texto</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px 6px",
            textAlign: "center",
            background: isDarkMode ? "rgba(167, 139, 250, 0.2)" : "#EDE9FE",
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 750,
            color: isDarkMode ? "#E9D5FF" : "#6D28D9"
          }}>
            Consultas guiadas personalizadas
          </div>
        </div>
      </div>

      {/* Explicación amigable */}
      <p style={{
        margin: 0,
        fontSize: 12,
        lineHeight: 1.45,
        color: C.textSecondary
      }}>
        ¿Necesitas que un orientador te ayude paso a paso a resolver tu trámite? Puedes preguntarle a <strong>LOTA AI</strong> en cualquier momento. Dispones de consultas de cortesía y acceso ilimitado suscribiéndote al Plan PLUS.
      </p>
    </div>
  );

  const steps = [
    {
      badge: "Paso 1 de 3 • Catálogo Oficial Gratuito",
      title: "Todas las entidades públicas en un solo lugar",
      subtitle: "ahorratiempo reúne más de 30 instituciones para que ubiques requisitos y trámites gratis.",
      icon: <Compass size={22} style={{ color: C.accentGreen }} />,
      illustration: Step1Illustration
    },
    {
      badge: "Paso 2 de 3 • Personalización",
      title: "Organiza tu barra lateral a tu gusto",
      subtitle: "Mantén presionada cualquier tarjeta para reordenarla o fíjala como favorita con 📌.",
      icon: <Move size={22} style={{ color: C.accentAmber }} />,
      illustration: Step2Illustration
    },
    {
      badge: "Paso 3 de 3 • Orientación con IA",
      title: "LOTA AI: Orientación ciudadana 24/7",
      subtitle: "Tu asistente guiado para calcular tasas oficiales y resolver dudas con el Plan LOTA AI PLUS.",
      icon: <Sparkles size={22} style={{ color: C.accentPurple }} />,
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
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          maxWidth: 580,
          width: "100%",
          background: C.bg,
          borderRadius: 20,
          border: `1px solid ${C.border}`,
          boxShadow: isDarkMode 
            ? "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.15)" 
            : "0 20px 50px rgba(0, 0, 0, 0.1)",
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
            width: 44,
            height: 44,
            borderRadius: 12,
            background: C.surface,
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            {step.icon}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{
              fontSize: 11.5,
              fontWeight: 750,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: currentStep === 0 ? C.accentGreen : currentStep === 1 ? C.accentAmber : C.accentPurple
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

        {/* Contenido Visual / Ilustración */}
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
                  width: currentStep === idx ? 22 : 7,
                  height: 7,
                  borderRadius: 99,
                  background: currentStep === idx 
                    ? (currentStep === 0 ? C.accentGreen : currentStep === 1 ? C.accentAmber : C.accentPurple)
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
                  ? C.accentGreen
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
              <span>{currentStep === steps.length - 1 ? "¡Empezar a usar ahorratiempo!" : "Siguiente"}</span>
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
