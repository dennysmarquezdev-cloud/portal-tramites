import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRightRegular, 
  ArrowLeftRegular, 
  DismissRegular, 
  CheckmarkRegular
} from "@fluentui/react-icons";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { getEntityLogo } from "../data/entityLogos";

interface OnboardingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
  onOpenEntityReorder?: () => void;
}

// ── Icono 1 Único: Portal Cívico Universal (Conexión de Entidades) ──
function UniqueCivicNexusIcon({ size = 24, color = "#10A37F" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M12 2.5C14.8 5.8 16.5 8.8 16.5 12C16.5 15.2 14.8 18.2 12 21.5C9.2 18.2 7.5 15.2 7.5 12C7.5 8.8 9.2 5.8 12 2.5Z" stroke={color} strokeWidth="1.5" />
      <path d="M3.5 12H20.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.5 7.5H18.5" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" />
      <path d="M5.5 16.5H18.5" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.2" fill={color} />
    </svg>
  );
}

// ── Icono 2 Único: Módulos Reordenables (Mesa de Trabajo Dinámica) ──
function UniqueModularDeckIcon({ size = 24, color = "#D97706" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="4" width="7" height="6.5" rx="2" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="4" width="7" height="6.5" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="6.5" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="6.5" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M7 7.25H7.01M17 7.25H17.01M7 16.75H7.01M17 16.75H17.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10.5 7.25L13.5 7.25" stroke={color} strokeWidth="1.2" strokeDasharray="1.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Icono 3 Único: Constelación de Inteligencia Cívica (LOTA AI Spark) ──
function UniqueAiConstellationIcon({ size = 24, color = "#6366F1" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C12 7.2 16.2 11.4 21.4 11.4C16.2 11.4 12 15.6 12 20.8C12 15.6 7.8 11.4 2.6 11.4C7.8 11.4 12 7.2 12 2Z" 
        fill={color} 
        fillOpacity="0.15"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <circle cx="12" cy="11.4" r="1.8" fill={color} />
      <circle cx="19" cy="5" r="1.2" fill={color} />
      <circle cx="5" cy="18" r="1.2" fill={color} />
    </svg>
  );
}

export function OnboardingGuideModal({
  isOpen,
  onClose,
  theme = "dark",
  onOpenEntityReorder
}: OnboardingGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isDarkMode = theme === "dark";

  // Colores refinados y desaturados estilo ChatGPT / Claude / Gemini
  const C = {
    bg: isDarkMode ? "#212121" : "#FFFFFF",
    surface: isDarkMode ? "#1B1B1B" : "#F9F9FB",
    surfaceCard: isDarkMode ? "#282828" : "#FFFFFF",
    border: isDarkMode ? "rgba(255, 255, 255, 0.09)" : "#E5E7EB",
    borderSubtle: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#F0F2F5",
    textPrimary: isDarkMode ? "#ECECEC" : "#0D0D0D",
    textSecondary: isDarkMode ? "#A3A3A3" : "#6B7280",
    textMuted: isDarkMode ? "#737373" : "#9CA3AF",
    
    // Tonos sobrios desaturados
    sage: isDarkMode ? "#34D399" : "#059669",
    sageBg: isDarkMode ? "rgba(16, 163, 127, 0.12)" : "#ECFDF5",
    sageBorder: isDarkMode ? "rgba(16, 163, 127, 0.25)" : "#D1FAE5",

    ochre: isDarkMode ? "#FBBF24" : "#D97706",
    ochreBg: isDarkMode ? "rgba(217, 119, 6, 0.12)" : "#FFFBEB",
    ochreBorder: isDarkMode ? "rgba(217, 119, 6, 0.25)" : "#FEF3C7",

    iris: isDarkMode ? "#A5B4FC" : "#6366F1",
    irisBg: isDarkMode ? "rgba(99, 102, 241, 0.12)" : "#EEF2FF",
    irisBorder: isDarkMode ? "rgba(99, 102, 241, 0.25)" : "#E0E7FF"
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
  // ── PASO 1: Directorio Universal de Entidades y Trámites ──
  // ─────────────────────────────────────────────────────────────
  const Step1Illustration = (
    <div style={{
      background: C.surface,
      borderRadius: 14,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Banner de Acceso 100% Gratuito y Libre */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: C.sageBg,
        border: `1px solid ${C.sageBorder}`,
        borderRadius: 8,
        padding: "8px 12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: C.sage, fontWeight: 800 }}>✓</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.sage }}>
            Catálogo oficial 100% gratuito y libre
          </span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 650, color: C.sage }}>
          Sin cobros ni registros
        </span>
      </div>

      {/* Grid de 4 Instituciones Principales */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8
      }}>
        {[
          { acronym: "RENIEC", desc: "DNIe y partidas" },
          { acronym: "SUNAT", desc: "RUC y Clave SOL" },
          { acronym: "MIGRACIONES", desc: "Pasaporte y citas" },
          { acronym: "MTC", desc: "Brevete y licencias" }
        ].map((item, idx) => {
          const logoSrc = getEntityLogo(item.acronym);
          return (
            <div
              key={idx}
              style={{
                background: C.surfaceCard,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "9px 6px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 4,
                boxShadow: isDarkMode ? "0 2px 5px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.03)"
              }}
            >
              <div style={{
                width: 54,
                height: 32,
                background: "#FFFFFF",
                borderRadius: 6,
                border: isDarkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid #E5E7EB",
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
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.textPrimary }}>{item.acronym}</span>
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
        En <strong>ahorratiempo.pe</strong> encuentras el enlace a todas las entidades públicas nacionales reunidas en un solo lugar para consultar requisitos oficiales y acceder directamente a las sedes <strong>.gob.pe</strong>.
      </p>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ── PASO 2: Organiza tus Entidades a tu Medida ──
  // ─────────────────────────────────────────────────────────────
  const Step2Illustration = (
    <div style={{
      background: C.surface,
      borderRadius: 14,
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
        {/* Tarjeta 1: Normal */}
        <div style={{
          background: C.surfaceCard,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 750, color: C.textPrimary }}>RENIEC</div>
            <div style={{ fontSize: 10, color: C.textSecondary }}>Identidad y DNI</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, background: isDarkMode ? "rgba(255,255,255,0.06)" : "#F3F4F6", padding: "2px 6px", borderRadius: 4 }}>
            Posición 1
          </span>
        </div>

        {/* Tarjeta 2: En movimiento sostenido */}
        <div style={{
          background: C.ochreBg,
          border: `1.5px solid ${C.ochreBorder}`,
          borderRadius: 10,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: "scale(1.02)",
          boxShadow: isDarkMode ? "0 4px 12px rgba(0,0,0,0.4)" : "0 3px 10px rgba(217, 119, 6, 0.12)"
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.ochre }}>SUNAT</div>
            <div style={{ fontSize: 10, color: C.textSecondary }}>Tributos y RUC</div>
          </div>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: C.ochre,
            background: isDarkMode ? "rgba(217, 119, 6, 0.2)" : "#FEF3C7",
            padding: "2px 6px",
            borderRadius: 4
          }}>
            Moviendo
          </span>
        </div>
      </div>

      {/* Puntos explicativos sin viñetas de puntos */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ color: C.ochre, fontSize: 12, fontWeight: 800, marginTop: 1 }}>—</span>
          <span style={{ fontSize: 12.5, color: C.textPrimary, lineHeight: 1.35 }}>
            <strong>Mantén presionada cualquier tarjeta:</strong> Pulsa por un instante la entidad y arrástrala hacia arriba o abajo para acomodar el orden a tu preferencia.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ color: C.sage, fontSize: 12, fontWeight: 800, marginTop: 1 }}>—</span>
          <span style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.35 }}>
            Tu orden personalizado se guarda de forma automática en tu navegador para que siempre lo encuentres listo.
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
      borderRadius: 14,
      padding: "16px 14px",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
      {/* Comparativa Sobria: Directorio Gratuito vs LOTA AI PLUS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>
        {/* Columna Izquierda: Directorio Gratuito */}
        <div style={{
          background: C.surfaceCard,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 750, color: C.textPrimary }}>
              Directorio Público
            </span>
            <span style={{
              fontSize: 9.5,
              fontWeight: 750,
              color: C.sage,
              background: C.sageBg,
              padding: "1px 6px",
              borderRadius: 4
            }}>
              GRATIS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, color: C.textSecondary }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.sage, fontSize: 11 }}>✓</span>
              <span>Buscador de +30 entidades</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.sage, fontSize: 11 }}>✓</span>
              <span>Enlace a todas las entidades públicas nacionales</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.sage, fontSize: 11 }}>✓</span>
              <span>Requisitos oficiales</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px",
            textAlign: "center",
            background: isDarkMode ? "rgba(255,255,255,0.04)" : "#F3F4F6",
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 650,
            color: C.textMuted
          }}>
            Acceso libre para todos
          </div>
        </div>

        {/* Columna Derecha: LOTA AI Orientador (Plan PLUS) */}
        <div style={{
          background: C.irisBg,
          border: `1px solid ${C.irisBorder}`,
          borderRadius: 10,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: isDarkMode ? "#C7D2FE" : "#4338CA" }}>
              LOTA AI Orientador
            </span>
            <span style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: isDarkMode ? "#EEF2FF" : "#4338CA",
              background: isDarkMode ? "rgba(99, 102, 241, 0.3)" : "#E0E7FF",
              padding: "1px 6px",
              borderRadius: 4
            }}>
              PLAN PLUS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, color: isDarkMode ? "#E2E8F0" : "#4B5563" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.iris, fontSize: 11 }}>✦</span>
              <span>Orientación interactiva 24/7</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.iris, fontSize: 11 }}>✦</span>
              <span>Chat sobre un trámite específico para averiguar más</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: C.iris, fontSize: 11 }}>✦</span>
              <span>Consultas por voz y texto</span>
            </div>
          </div>

          <div style={{
            marginTop: "auto",
            padding: "4px",
            textAlign: "center",
            background: isDarkMode ? "rgba(99, 102, 241, 0.25)" : "#E0E7FF",
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 750,
            color: isDarkMode ? "#E0E7FF" : "#4338CA"
          }}>
            Consultas guiadas personalizadas
          </div>
        </div>
      </div>

      {/* Nota descriptiva */}
      <p style={{
        margin: 0,
        fontSize: 12,
        lineHeight: 1.45,
        color: C.textSecondary
      }}>
        Si necesitas un orientador que te ayude a profundizar en un trámite en específico y resolver tus dudas paso a paso, puedes usar <strong>LOTA AI</strong> mediante el Plan PLUS tras tus consultas gratuitas.
      </p>
    </div>
  );

  const steps = [
    {
      badge: "Paso 1 de 3 / Catálogo Oficial Gratuito",
      title: "Todas las entidades públicas en un solo lugar",
      subtitle: "ahorratiempo reúne más de 30 instituciones para que ubiques requisitos y trámites gratis.",
      icon: <UniqueCivicNexusIcon size={22} color={C.sage} />,
      illustration: Step1Illustration
    },
    {
      badge: "Paso 2 de 3 / Personalización",
      title: "Organiza tus entidades a tu medida",
      subtitle: "Mantén presionada cualquier tarjeta para reordenarla y acomodar tu mesa de trabajo.",
      icon: <UniqueModularDeckIcon size={22} color={C.ochre} />,
      illustration: Step2Illustration
    },
    {
      badge: "Paso 3 de 3 / Orientación con IA",
      title: "LOTA AI: Orientación ciudadana 24/7",
      subtitle: "Tu asistente guiado para tener un chat con un trámite en específico y averiguar más con el Plan LOTA AI PLUS.",
      icon: <UniqueAiConstellationIcon size={22} color={C.iris} />,
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
        background: "rgba(0, 0, 0, 0.72)",
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
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          maxWidth: 580,
          width: "100%",
          background: C.bg,
          borderRadius: 18,
          border: `1px solid ${C.border}`,
          boxShadow: isDarkMode 
            ? "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.12)" 
            : "0 18px 45px rgba(0, 0, 0, 0.09)",
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
            borderRadius: 8,
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
              color: currentStep === 0 ? C.sage : currentStep === 1 ? C.ochre : C.iris
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            {step.illustration}
          </motion.div>
        </AnimatePresence>

        {/* Barra Inferior: Progreso Segmentado (Sin Puntos) y Botones */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
          borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E7EB"}`
        }}>
          {/* Barra de Progreso Segmentada (Sin Puntos) */}
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
                  width: currentStep === idx ? 28 : 12,
                  height: 4,
                  borderRadius: 2,
                  background: currentStep === idx 
                    ? (currentStep === 0 ? C.sage : currentStep === 1 ? C.ochre : C.iris)
                    : (isDarkMode ? "rgba(255, 255, 255, 0.18)" : "#E5E7EB"),
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
                  borderRadius: 8,
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
                  borderRadius: 8,
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
                borderRadius: 8,
                border: "none",
                background: currentStep === steps.length - 1
                  ? (isDarkMode ? "#ECECEC" : "#0D0D0D")
                  : (isDarkMode ? "#ECECEC" : "#0D0D0D"),
                color: isDarkMode ? "#0D0D0D" : "#FFFFFF",
                fontSize: 13,
                fontWeight: 750,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: isDarkMode ? "0 4px 14px rgba(0, 0, 0, 0.4)" : "0 4px 14px rgba(0, 0, 0, 0.15)"
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
