import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GlobeRegular, 
  FlashRegular, 
  CheckmarkRegular, 
  CloudRegular, 
  SparkleRegular, 
  SettingsRegular,
  ShieldCheckmarkRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  CheckmarkCircleFilled,
  Speaker2Regular,
  SpeakerOffRegular
} from '@fluentui/react-icons';
import { toast } from "sonner";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { AnimatedThemeIcon } from "../components/AnimatedThemeToggle";

interface AjustesPageProps {
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

export default function AjustesPage({ theme = "dark", toggleTheme }: AjustesPageProps) {
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [language, setLanguage] = useState("es-PE");
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const [storageUsed, setStorageUsed] = useState("2.4 MB");

  const isLight = theme === "light";

  const handleClearCache = () => {
    haptic.medium();
    setConfirmed("cache");
    try {
      localStorage.removeItem("custom-bg-query");
      sessionStorage.clear();
      setStorageUsed("0.1 MB");
      toast.success("Caché y datos temporales liberados con éxito");
      setTimeout(() => {
        setConfirmed(null);
      }, 2500);
    } catch (e) {
      toast.error("Error al limpiar caché");
      setConfirmed(null);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", paddingBottom: 60, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* ── Banner Superior ── */}
      <div 
        style={{ 
          background: isLight ? "#FFFFFF" : "rgba(10, 15, 29, 0.82)", 
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)", 
          borderRadius: 22, 
          padding: "24px 28px", 
          marginBottom: 22,
          boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          gap: 18
        }}
      >
        <div 
          style={{ 
            width: 50, 
            height: 50, 
            borderRadius: 14, 
            background: isLight ? "rgba(2, 132, 199, 0.10)" : "rgba(56, 189, 248, 0.12)", 
            border: isLight ? "1px solid rgba(2, 132, 199, 0.25)" : "1px solid rgba(56, 189, 248, 0.32)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: isLight ? "#0284C7" : "#38BDF8",
            flexShrink: 0,
            boxShadow: isLight ? "0 2px 10px rgba(2, 132, 199, 0.15)" : "0 0 20px rgba(56, 189, 248, 0.25)"
          }}
        >
          <SettingsRegular fontSize={26} color={isLight ? "#0284C7" : "#38BDF8"} />
        </div>
        <div>
          <h1 style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: "clamp(22px, 3vw, 26px)", fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>
            Ajustes y Preferencias
          </h1>
          <p style={{ color: isLight ? "#475569" : "#94A3B8", fontSize: 13.5, margin: "4px 0 0", lineHeight: 1.4 }}>
            Configuración de apariencia, asistente cívico, idioma oficial y gestión de almacenamiento.
          </p>
        </div>
      </div>

      {/* ── Tarjetas de Configuración ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        
        {/* Card 0: Apariencia y Tema (Modo Claro vs Modo Oscuro) */}
        <div 
          style={{ 
            background: isLight ? "#FFFFFF" : "rgba(10, 15, 29, 0.82)", 
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)", 
            borderRadius: 20, 
            overflow: "hidden",
            boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
          }}
        >
          {/* Header de la Tarjeta */}
          <div style={{ padding: "16px 22px 14px", borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.05)", background: isLight ? "rgba(0, 0, 0, 0.02)" : "rgba(0, 0, 0, 0.25)" }}>
            <div style={{ color: isLight ? "#64748B" : "#94A3B8", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              // APARIENCIA
            </div>
            <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 15.5, fontWeight: 700, marginTop: 2 }}>
              Tema Visual del Portal
            </div>
          </div>

          <div style={{ padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            
            {/* Tile Modo Claro */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (theme !== "light" && toggleTheme) {
                  haptic.selection();
                  toggleTheme();
                  toast.success("Modo Claro activado");
                }
              }}
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                cursor: "pointer",
                background: isLight ? "rgba(220, 38, 38, 0.05)" : "rgba(255, 255, 255, 0.04)",
                border: isLight ? "2px solid #DC2626" : "1px solid rgba(255, 255, 255, 0.10)",
                boxShadow: isLight ? "0 4px 16px rgba(220, 38, 38, 0.15)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatedThemeIcon isDark={false} size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: isLight ? "#0F172A" : "#FFFFFF" }}>
                    Modo Claro
                  </div>
                  <div style={{ fontSize: 12, color: isLight ? "#64748B" : "#94A3B8", marginTop: 2 }}>
                    Swiss Paper & Cerámica
                  </div>
                </div>
              </div>
              {isLight && <CheckmarkCircleFilled fontSize={20} color="#DC2626" />}
            </motion.div>

            {/* Tile Modo Oscuro */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (theme !== "dark" && toggleTheme) {
                  haptic.selection();
                  toggleTheme();
                  toast.success("Modo Oscuro activado");
                }
              }}
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                cursor: "pointer",
                background: !isLight ? "rgba(239, 68, 68, 0.12)" : (isLight ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.04)"),
                border: !isLight ? "2px solid #EF4444" : (isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.10)"),
                boxShadow: !isLight ? "0 4px 16px rgba(239, 68, 68, 0.25)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(99, 102, 241, 0.15)", border: "1px solid rgba(99, 102, 241, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatedThemeIcon isDark={true} size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: isLight ? "#0F172A" : "#FFFFFF" }}>
                    Modo Oscuro
                  </div>
                  <div style={{ fontSize: 12, color: isLight ? "#64748B" : "#94A3B8", marginTop: 2 }}>
                    Dark Obsidian Glass
                  </div>
                </div>
              </div>
              {!isLight && <CheckmarkCircleFilled fontSize={20} color="#EF4444" />}
            </motion.div>

          </div>
        </div>

        {/* Card 1: Preferencias del Sistema */}
        <div 
          style={{ 
            background: isLight ? "#FFFFFF" : "rgba(10, 15, 29, 0.82)", 
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)", 
            borderRadius: 20, 
            overflow: "hidden",
            boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
          }}
        >
          {/* Header de la Tarjeta */}
          <div style={{ padding: "16px 22px 14px", borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.05)", background: isLight ? "rgba(0, 0, 0, 0.02)" : "rgba(0, 0, 0, 0.25)" }}>
            <div style={{ color: isLight ? "#64748B" : "#94A3B8", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              // GENERAL
            </div>
            <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 15.5, fontWeight: 700, marginTop: 2 }}>
              Opciones de Navegación
            </div>
          </div>

          {/* Setting 1: Idioma y Región */}
          <div 
            style={{ 
              padding: "18px 22px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: 16,
              borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.04)" : "1px solid rgba(255, 255, 255, 0.04)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: isLight ? "rgba(2, 132, 199, 0.10)" : "rgba(56, 189, 248, 0.10)", border: isLight ? "1px solid rgba(2, 132, 199, 0.20)" : "1px solid rgba(56, 189, 248, 0.20)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <GlobeRegular fontSize={20} color={isLight ? "#0284C7" : "#38BDF8"} />
              </div>
              <div>
                <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 14, fontWeight: 650 }}>Idioma y Región</div>
                <div style={{ color: isLight ? "#64748B" : "#94A3B8", fontSize: 12.5, marginTop: 2 }}>Español (Perú) • Plataforma gob.pe</div>
              </div>
            </div>

            <select 
              value={language} 
              onChange={(e) => {
                haptic.selection();
                setLanguage(e.target.value);
                toast.success("Idioma configurado en Español (Perú)");
              }}
              style={{ 
                padding: "8px 14px", 
                borderRadius: 10, 
                background: isLight ? "#FFFFFF" : "#000000", 
                border: isLight ? "1px solid rgba(0, 0, 0, 0.15)" : "1px solid rgba(255, 255, 255, 0.22)", 
                color: isLight ? "#0F172A" : "#FFFFFF", 
                fontSize: 13, 
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
                boxShadow: isLight ? "0 1px 4px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0, 0, 0, 0.5)"
              }}
            >
              <option value="es-PE">Español (Perú)</option>
              <option value="qu">Quechua</option>
              <option value="ay">Aymara</option>
            </select>
          </div>

          {/* Setting 2: Asistente Cívico LOTA AI */}
          <div 
            style={{ 
              padding: "18px 22px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: 16,
              borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.04)" : "1px solid rgba(255, 255, 255, 0.04)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <SparkleRegular fontSize={20} color="#8B5CF6" />
              </div>
              <div>
                <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 14, fontWeight: 650 }}>Asistente Cívico LOTA AI</div>
                <div style={{ color: isLight ? "#64748B" : "#94A3B8", fontSize: 12.5, marginTop: 2 }}>Orientación contextual y atajos inteligentes</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12.5, color: aiAssistantEnabled ? (isLight ? "#0284C7" : "#38BDF8") : "#64748B", fontWeight: 650 }}>
                {aiAssistantEnabled ? "ACTIVO" : "SILENCIOSO"}
              </span>
              <div 
                onClick={() => {
                  haptic.selection();
                  setAiAssistantEnabled(!aiAssistantEnabled);
                  toast.info(aiAssistantEnabled ? "Asistente en modo silencioso" : "Asistente activado");
                }} 
                role="switch"
                aria-checked={aiAssistantEnabled}
                style={{ 
                  width: 46, 
                  height: 24, 
                  borderRadius: 12, 
                  background: aiAssistantEnabled ? "#8B5CF6" : (isLight ? "#E2E8F0" : "#1E293B"), 
                  border: `1px solid ${aiAssistantEnabled ? "#8B5CF6" : (isLight ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)")}`, 
                  position: "relative", 
                  cursor: "pointer",
                  boxShadow: aiAssistantEnabled ? "0 0 14px rgba(139, 92, 246, 0.4)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <div 
                  style={{ 
                    width: 18, 
                    height: 18, 
                    borderRadius: "50%", 
                    background: "#FFFFFF", 
                    position: "absolute", 
                    top: 2, 
                    left: aiAssistantEnabled ? 24 : 3, 
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", 
                    transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" 
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Setting 3: Efectos de Sonido Acústicos (Teclita UI) */}
          <div 
            style={{ 
              padding: "18px 22px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: 16
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {soundEnabled ? (
                  <Speaker2Regular fontSize={20} color="#10B981" />
                ) : (
                  <SpeakerOffRegular fontSize={20} color="#64748B" />
                )}
              </div>
              <div>
                <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 14, fontWeight: 650 }}>Efectos de Sonido Acústicos</div>
                <div style={{ color: isLight ? "#64748B" : "#94A3B8", fontSize: 12.5, marginTop: 2 }}>Sonido de tecla táctil al explorar entidades y trámites</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12.5, color: soundEnabled ? (isLight ? "#059669" : "#34D399") : "#64748B", fontWeight: 650 }}>
                {soundEnabled ? "ACTIVADO" : "SILENCIADO"}
              </span>
              <div 
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  sound.setEnabled(next);
                  if (next) sound.playHoverKey();
                  haptic.selection();
                  toast.info(next ? "Sonidos de interacción activados" : "Sonidos de interacción silenciados");
                }} 
                role="switch"
                aria-checked={soundEnabled}
                style={{ 
                  width: 46, 
                  height: 24, 
                  borderRadius: 12, 
                  background: soundEnabled ? "#10B981" : (isLight ? "#E2E8F0" : "#1E293B"), 
                  border: `1px solid ${soundEnabled ? "#10B981" : (isLight ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)")}`, 
                  position: "relative", 
                  cursor: "pointer",
                  boxShadow: soundEnabled ? "0 0 14px rgba(16, 185, 129, 0.4)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <div 
                  style={{ 
                    width: 18, 
                    height: 18, 
                    borderRadius: "50%", 
                    background: "#FFFFFF", 
                    position: "absolute", 
                    top: 2, 
                    left: soundEnabled ? 24 : 3, 
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", 
                    transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Almacenamiento y Caché Local */}
        <div 
          style={{ 
            background: isLight ? "#FFFFFF" : "rgba(10, 15, 29, 0.82)", 
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)", 
            borderRadius: 20, 
            padding: "22px",
            boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: isLight ? "rgba(2, 132, 199, 0.10)" : "rgba(56, 189, 248, 0.10)", border: isLight ? "1px solid rgba(2, 132, 199, 0.22)" : "1px solid rgba(56, 189, 248, 0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CloudRegular fontSize={22} color={isLight ? "#0284C7" : "#38BDF8"} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: isLight ? "#0F172A" : "#FFFFFF", fontSize: 15, fontWeight: 700 }}>
                Almacenamiento Local y Caché
              </div>
              <div style={{ color: isLight ? "#475569" : "#94A3B8", fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>
                Gestiona los datos temporales en tu navegador para mantener la fluidez y velocidad de navegación.
              </div>
            </div>
          </div>

          {/* Storage Progress Bar */}
          <div style={{ background: isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.08)", height: 7, borderRadius: 4, overflow: "hidden", margin: "16px 0 10px" }}>
            <div style={{ width: "8%", height: "100%", background: "linear-gradient(90deg, #38BDF8, #8B5CF6)", borderRadius: 4, boxShadow: "0 0 10px #38BDF8" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: isLight ? "#64748B" : "#94A3B8", marginBottom: 18 }}>
            <span>{storageUsed} en uso</span>
            <span>50 MB disponibles</span>
          </div>

          {/* Action Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClearCache}
            style={{ 
              padding: "10px 20px", 
              borderRadius: 12, 
              background: confirmed === "cache" ? "#10B981" : (isLight ? "#0F172A" : "#000000"), 
              border: `2px solid ${confirmed === "cache" ? "#10B981" : "#8B5CF6"}`, 
              color: "#FFFFFF", 
              fontSize: 13.5, 
              fontWeight: 650, 
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: isLight ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 4px 16px rgba(0, 0, 0, 0.6)",
              transition: "all 0.18s ease"
            }}
          >
            {confirmed === "cache" ? (
              <>
                <CheckmarkRegular fontSize={17} /> <span>¡Caché Liberada con Éxito!</span>
              </>
            ) : (
              <>
                <FlashRegular fontSize={17} color="#C4B5FD" /> <span>Liberar espacio y limpiar caché</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Security & Sync Note */}
        <div style={{ padding: "14px 18px", borderRadius: 14, background: isLight ? "rgba(2, 132, 199, 0.05)" : "rgba(56, 189, 248, 0.05)", border: isLight ? "1px solid rgba(2, 132, 199, 0.15)" : "1px solid rgba(56, 189, 248, 0.18)", display: "flex", alignItems: "center", gap: 12 }}>
          <ShieldCheckmarkRegular fontSize={20} color={isLight ? "#0284C7" : "#38BDF8"} />
          <span style={{ fontSize: 13, color: isLight ? "#475569" : "#94A3B8", lineHeight: 1.4 }}>
            Las preferencias y configuraciones del portal se sincronizan automáticamente con la memoria de tu dispositivo.
          </span>
        </div>

      </div>

    </div>
  );
}
