import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  ArrowLeftRegular, 
  DismissRegular, 
  PinRegular, 
  MicRegular, 
  GlobeRegular, 
  CheckmarkRegular, 
  GridRegular,
  WeatherMoonRegular,
  PersonRegular,
  SearchRegular
} from "@fluentui/react-icons";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";

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

  // Reiniciar paso al abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // Manejo de teclado (Flechas izq/der y Escape)
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

  const steps = [
    {
      badge: "Paso 1 de 4 • Tu Espacio Ciudadano",
      title: "¡Bienvenido a AhorraTiempo.pe!",
      subtitle: "Tu buscador ciudadano y asistente inteligente con IA para trámites del Estado.",
      icon: <SparkleRegular fontSize={30} style={{ color: "#38BDF8" }} />,
      illustration: (
        <div style={{
          background: isDarkMode ? "#171717" : "#F1F5F9",
          borderRadius: 16,
          padding: "18px",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: isDarkMode ? "#ECECEC" : "#0F172A" }}>
              Tú tienes el control total de tu experiencia
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: isDarkMode ? "#B4B4B4" : "#475569" }}>
            Centralizamos los requisitos, tasas del Banco de la Nación y guías oficiales de más de <strong>30 entidades públicas</strong>. No somos intermediarios ni tramitadores: te orientamos con transparencia y te conectamos directo a las sedes oficiales (.gob.pe).
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginTop: 4
          }}>
            {[
              { label: "Buscador Oficial", sub: "+30 entidades" },
              { label: "LOTA AI", sub: "Voz & texto 24/7" },
              { label: "Enlaces Seguros", sub: "Directo a gob.pe" },
            ].map((box, i) => (
              <div key={i} style={{
                background: isDarkMode ? "#212121" : "#FFFFFF",
                borderRadius: 10,
                padding: "10px 8px",
                textAlign: "center",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.06)" : "#E2E8F0"}`
              }}>
                <div style={{ fontSize: 12, fontWeight: 750, color: isDarkMode ? "#ECECEC" : "#1E293B" }}>{box.label}</div>
                <div style={{ fontSize: 10.5, color: isDarkMode ? "#8E8E93" : "#64748B", marginTop: 2 }}>{box.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      badge: "Paso 2 de 4 • Personalización",
      title: "Acomoda tus Entidades en el Sidebar",
      subtitle: "Organiza y fija con un clic las instituciones que más consultas.",
      icon: <PinRegular fontSize={30} style={{ color: "#F59E0B" }} />,
      illustration: (
        <div style={{
          background: isDarkMode ? "#171717" : "#F1F5F9",
          borderRadius: 16,
          padding: "18px",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: isDarkMode ? "#B4B4B4" : "#475569" }}>
            En la barra lateral izquierda puedes <strong>fijar con pin (📌)</strong> tus entidades favoritas (SUNAT, RENIEC, Migraciones, MTC, etc.) y <strong>reordenarlas a tu gusto</strong> arrastrándolas o con los botones de posición.
          </p>
          <div style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "4px 2px"
          }}>
            {[
              { name: "SUNAT", pinned: true, color: "#1E40AF" },
              { name: "RENIEC", pinned: true, color: "#059669" },
              { name: "MIGRACIONES", pinned: false, color: "#0284C7" },
              { name: "MTC", pinned: false, color: "#DC2626" }
            ].map((ent, i) => (
              <div key={i} style={{
                background: isDarkMode ? "#212121" : "#FFFFFF",
                borderRadius: 10,
                padding: "8px 12px",
                border: `1.5px solid ${ent.pinned ? (isDarkMode ? "#38BDF8" : ent.color) : (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E2E8F0")}`,
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0
              }}>
                <span style={{ fontSize: 12, fontWeight: 750, color: isDarkMode ? "#ECECEC" : "#1E293B" }}>{ent.name}</span>
                {ent.pinned && <span style={{ fontSize: 11 }}>📌</span>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: isDarkMode ? "#38BDF8" : "#0284C7", fontWeight: 600 }}>
            ✨ Tu orden personalizado se guarda automáticamente en tu navegador.
          </div>
        </div>
      )
    },
    {
      badge: "Paso 3 de 4 • Inteligencia Cívica",
      title: "Pregúntale a LOTA AI por Texto o Voz",
      subtitle: "Respuestas directas, requisitos exactos y cálculo de tasas oficiales.",
      icon: <MicRegular fontSize={30} style={{ color: "#10B981" }} />,
      illustration: (
        <div style={{
          background: isDarkMode ? "#171717" : "#F1F5F9",
          borderRadius: 16,
          padding: "18px",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <div style={{
            background: isDarkMode ? "#212121" : "#FFFFFF",
            borderRadius: 12,
            padding: "10px 14px",
            border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E2E8F0"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SearchRegular fontSize={14} style={{ color: isDarkMode ? "#8E8E93" : "#94A3B8" }} />
              <span style={{ fontSize: 12.5, color: isDarkMode ? "#ECECEC" : "#1E293B", fontStyle: "italic" }}>
                "¿Cómo renuevo mi DNI vencido y cuánto cuesta la tasa?"
              </span>
            </div>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#E0F2FE",
              color: isDarkMode ? "#38BDF8" : "#0284C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <MicRegular fontSize={15} />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: isDarkMode ? "#B4B4B4" : "#475569" }}>
            Pulsa el micrófono para dictar con tu voz o escribe en el prompt. LOTA AI te explicará los requisitos oficiales, el código de tasa para pagar en Págalo.pe / Banco de la Nación y el enlace oficial para reservar tu cita.
          </p>
        </div>
      )
    },
    {
      badge: "Paso 4 de 4 • Experiencia & Confort",
      title: "Tema Oscuro ChatGPT & Catálogo Completo",
      subtitle: "Interfaz visual cuidada al milímetro para el día y la noche.",
      icon: <WeatherMoonRegular fontSize={30} style={{ color: "#A855F7" }} />,
      illustration: (
        <div style={{
          background: isDarkMode ? "#171717" : "#F1F5F9",
          borderRadius: 16,
          padding: "18px",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: isDarkMode ? "#B4B4B4" : "#475569" }}>
            Disfruta del nuevo <strong>tema oscuro con la paleta de ChatGPT</strong> (tonos grafito neutros que descansan tu vista) o cambia a modo claro cuando lo desees desde el menú de perfil o el selector lateral.
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "10px",
            background: isDarkMode ? "#212121" : "#FFFFFF",
            borderRadius: 12,
            border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>🌓</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: isDarkMode ? "#ECECEC" : "#1E293B" }}>Modo Oscuro ChatGPT</span>
            </div>
            <div style={{ width: 1, height: 16, background: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E2E8F0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>📚</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: isDarkMode ? "#ECECEC" : "#1E293B" }}>3,000+ Trámites</span>
            </div>
          </div>
        </div>
      )
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
        background: "rgba(0, 0, 0, 0.78)",
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
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          maxWidth: 580,
          width: "100%",
          background: isDarkMode ? "#212121" : "#FFFFFF",
          borderRadius: 20,
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0",
          boxShadow: isDarkMode 
            ? "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.2)" 
            : "0 20px 50px rgba(15, 23, 42, 0.15)",
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
            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #E2E8F0",
            background: isDarkMode ? "#2F2F2F" : "#F8FAFC",
            color: isDarkMode ? "#B4B4B4" : "#64748B",
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
            width: 48,
            height: 48,
            borderRadius: 14,
            background: isDarkMode ? "#2F2F2F" : "#F1F5F9",
            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #E2E8F0",
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
              letterSpacing: "0.05em",
              color: isDarkMode ? "#38BDF8" : "#0284C7"
            }}>
              {step.badge}
            </span>
            <h3 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              color: isDarkMode ? "#ECECEC" : "#0F172A",
              lineHeight: 1.25,
              letterSpacing: "-0.015em"
            }}>
              {step.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: isDarkMode ? "#B4B4B4" : "#64748B",
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
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
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
          borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#F1F5F9"}`
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
                    ? (isDarkMode ? "#38BDF8" : "#0284C7") 
                    : (isDarkMode ? "rgba(255, 255, 255, 0.2)" : "#CBD5E1"),
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
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#CBD5E1"}`,
                  background: "transparent",
                  color: isDarkMode ? "#ECECEC" : "#334155",
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
                  color: isDarkMode ? "#8E8E93" : "#64748B",
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
                  ? "#10B981"
                  : (isDarkMode ? "#38BDF8" : "#0284C7"),
                color: currentStep === steps.length - 1 ? "#FFFFFF" : (isDarkMode ? "#0F172A" : "#FFFFFF"),
                fontSize: 13,
                fontWeight: 750,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: currentStep === steps.length - 1
                  ? "0 4px 14px rgba(16, 185, 129, 0.35)"
                  : (isDarkMode ? "0 4px 14px rgba(56, 189, 248, 0.35)" : "0 4px 14px rgba(2, 132, 199, 0.3)")
              }}
            >
              <span>{currentStep === steps.length - 1 ? "¡Empezar a ahorrar tiempo!" : "Siguiente"}</span>
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
