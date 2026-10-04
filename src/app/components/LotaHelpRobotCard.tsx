import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  BotRegular, 
  FlashRegular,
  DocumentBulletListMultipleRegular,
  VehicleCarProfileRegular,
  BuildingBankRegular,
  KeyRegular
} from '@fluentui/react-icons';
import { haptic } from "../utils/haptics";

interface LotaHelpRobotCardProps {
  theme?: "light" | "dark";
  onNavigateToLota?: (query?: string) => void;
}

const QUICK_SUGGESTIONS = [
  {
    icon: DocumentBulletListMultipleRegular,
    label: "Renovación o Duplicado de DNI",
    query: "¿Cómo tramito la renovación o duplicado de mi DNI azul o electrónico?"
  },
  {
    icon: KeyRegular,
    label: "Obtener Clave SOL SUNAT",
    query: "¿Cómo obtengo mi Clave SOL de SUNAT por primera vez por internet?"
  },
  {
    icon: VehicleCarProfileRegular,
    label: "Récord y Puntos de Brevete MTC",
    query: "¿Cómo consultar mis puntos de licencia de conducir y papeletas en el MTC?"
  },
  {
    icon: BuildingBankRegular,
    label: "Copia Literal en SUNARP",
    query: "¿Cómo solicitar una Copia Literal de partida registral en la web de SUNARP?"
  }
];

export function LotaHelpRobotCard({ theme = "dark", onNavigateToLota }: LotaHelpRobotCardProps) {
  const isLight = theme === "light";
  const [isHovered, setIsHovered] = useState(false);

  const handleAction = (query?: string) => {
    haptic.medium();
    if (onNavigateToLota) {
      onNavigateToLota(query);
    } else {
      window.location.hash = "#frutilota";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 24,
        background: isLight 
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.94) 100%)"
          : "linear-gradient(135deg, rgba(10, 15, 30, 0.94) 0%, rgba(15, 23, 42, 0.90) 100%)",
        border: isLight 
          ? "1px solid rgba(220, 38, 38, 0.16)" 
          : "1px solid rgba(56, 189, 248, 0.24)",
        boxShadow: isLight
          ? "0 18px 45px rgba(220, 38, 38, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)"
          : "0 20px 50px rgba(0, 0, 0, 0.65), 0 0 40px rgba(56, 189, 248, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        padding: "clamp(24px, 3.5vw, 32px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
        gap: 28,
        alignItems: "center",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* ── Background Cyber Grid & Glow Aura ── */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isLight
            ? "radial-gradient(ellipse at 80% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 80% 50%, rgba(56, 189, 248, 0.18) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%)",
          zIndex: 0
        }} 
      />

      {/* ── Left Column: Value Proposition, Status & Action ── */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        
        {/* Live Status Pill Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              borderRadius: 999,
              background: isLight ? "rgba(220, 38, 38, 0.08)" : "rgba(56, 189, 248, 0.12)",
              border: isLight ? "1px solid rgba(220, 38, 38, 0.20)" : "1px solid rgba(56, 189, 248, 0.30)",
              fontSize: 12,
              fontWeight: 700,
              color: isLight ? "#DC2626" : "#38BDF8",
              letterSpacing: "0.02em"
            }}
          >
            <BotRegular fontSize={14} />
            <span>ASISTENTE INTELIGENTE OFICIAL</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontSize: 11.5,
              fontWeight: 650,
              color: "#10B981"
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#10B981",
                boxShadow: "0 0 8px #10B981",
                display: "inline-block"
              }}
            />
            <span>Online 24/7</span>
          </div>
        </div>

        {/* Heading & Description */}
        <div>
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 800,
              lineHeight: 1.25,
              margin: "0 0 8px",
              color: isLight ? "#0F172A" : "#FFFFFF",
              letterSpacing: "-0.02em",
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
          >
            ¿Dudas con tu trámite? Resuélvelo en segundos con LOTA AI
          </h2>
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.5,
              margin: 0,
              color: isLight ? "#475569" : "#94A3B8",
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
          >
            Obtén pasos exactos, costos oficiales, enlaces de acceso directo y requisitos de SUNAT, RENIEC, MTC, SUNARP y EsSalud sin esperar respuestas por correo.
          </p>
        </div>

        {/* Primary CTA Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: isLight ? "0 8px 24px rgba(220, 38, 38, 0.35)" : "0 8px 28px rgba(56, 189, 248, 0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAction()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              borderRadius: 14,
              border: "none",
              background: isLight
                ? "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #0369A1 50%, #4338CA 100%)",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: isLight
                ? "0 4px 16px rgba(220, 38, 38, 0.28)"
                : "0 6px 20px rgba(2, 132, 199, 0.35)",
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
          >
            <SparkleRegular fontSize={18} color="#FFFFFF" />
            <span>Consultar con LOTA AI</span>
            <ArrowRightRegular fontSize={16} color="#FFFFFF" />
          </motion.button>
        </div>

        {/* Quick Question Chips */}
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 750,
              color: isLight ? "#64748B" : "#94A3B8",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <FlashRegular fontSize={14} color={isLight ? "#DC2626" : "#38BDF8"} />
            <span>Consultas frecuentes instantáneas:</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_SUGGESTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ 
                    scale: 1.03, 
                    background: isLight ? "rgba(220, 38, 38, 0.08)" : "rgba(56, 189, 248, 0.16)",
                    borderColor: isLight ? "rgba(220, 38, 38, 0.3)" : "rgba(56, 189, 248, 0.5)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAction(item.query)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 10,
                    background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
                    border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: isLight ? "#1E293B" : "#E2E8F0",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  }}
                >
                  <Icon fontSize={14} color={isLight ? "#DC2626" : "#38BDF8"} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Right Column: Animated 3D Robot Mascot ── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 240,
          userSelect: "none"
        }}
      >
        {/* Ambient Cyan Pulse Glow Halo */}
        <motion.div
          animate={{
            scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.15, 1],
            opacity: isHovered ? [0.65, 0.85, 0.65] : [0.35, 0.55, 0.35]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: isLight
              ? "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, rgba(239, 68, 68, 0.10) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(56, 189, 248, 0.40) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        {/* Floating Robot Container */}
        <motion.div
          animate={{
            transform: [
              "translateY(0px) rotate(0deg)",
              "translateY(-10px) rotate(1.2deg)",
              "translateY(0px) rotate(-0.8deg)",
              "translateY(-5px) rotate(0.6deg)",
              "translateY(0px) rotate(0deg)"
            ]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.25 }
          }}
          style={{
            position: "relative",
            zIndex: 2,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          onClick={() => handleAction()}
          title="Hablar con LOTA AI"
        >
          {/* 3D Robot Image with Glowing Visor Reflex */}
          <div
            style={{
              position: "relative",
              width: "clamp(180px, 22vw, 230px)",
              height: "clamp(180px, 22vw, 230px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src="/img/lota-bot.png"
              alt="LOTA AI Mascot"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: isLight 
                  ? "drop-shadow(0 12px 24px rgba(220, 38, 38, 0.20))" 
                  : "drop-shadow(0 16px 30px rgba(56, 189, 248, 0.35)) drop-shadow(0 0 15px rgba(56, 189, 248, 0.25))"
              }}
            />
          </div>

          {/* Dynamic Ground Shadow that breathes with height */}
          <motion.div
            animate={{
              transform: [
                "scaleX(1) scaleY(1)",
                "scaleX(0.82) scaleY(0.82)",
                "scaleX(1) scaleY(1)",
                "scaleX(0.90) scaleY(0.90)",
                "scaleX(1) scaleY(1)"
              ],
              opacity: isLight ? [0.22, 0.10, 0.22, 0.15, 0.22] : [0.60, 0.25, 0.60, 0.38, 0.60]
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: 140,
              height: 14,
              borderRadius: "50%",
              background: isLight
                ? "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(56, 189, 248, 0.2) 40%, transparent 70%)",
              filter: "blur(4px)",
              marginTop: -6
            }}
          />
        </motion.div>

        {/* Small floating prompt indicator */}
        <motion.div
          animate={{
            y: [0, -3, 0]
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            marginTop: 8,
            padding: "3px 10px",
            borderRadius: 999,
            background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)",
            border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.10)",
            fontSize: 11,
            fontWeight: 650,
            color: isLight ? "#64748B" : "#94A3B8",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          <span>Haz clic en LOTA para consultar</span>
          <span>✨</span>
        </motion.div>

      </div>

    </motion.div>
  );
}
