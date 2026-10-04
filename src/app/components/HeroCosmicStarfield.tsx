import React from "react";
import { motion } from "framer-motion";

interface HeroCosmicStarfieldProps {
  theme?: "light" | "dark";
}

export function HeroCosmicStarfield({ theme = "light" }: HeroCosmicStarfieldProps) {
  const isLight = theme === "light";

  // Micro-partículas estelares ultra-finas (estilo observatorio astronómico / precisión ejecutiva)
  // Posiciones armónicas y discretas con baja opacidad para máxima sobriedad y elegancia
  const microPins = [
    { x: "12%", y: "22%", r: 1.0, baseOpacity: isLight ? 0.25 : 0.45, delay: 0 },
    { x: "18%", y: "14%", r: 0.8, baseOpacity: isLight ? 0.20 : 0.40, delay: 2.1 },
    { x: "25%", y: "32%", r: 1.2, baseOpacity: isLight ? 0.28 : 0.50, delay: 1.2 },
    { x: "34%", y: "18%", r: 0.9, baseOpacity: isLight ? 0.22 : 0.35, delay: 3.4 },
    { x: "42%", y: "12%", r: 1.1, baseOpacity: isLight ? 0.26 : 0.45, delay: 0.7 },
    { x: "58%", y: "15%", r: 1.0, baseOpacity: isLight ? 0.24 : 0.40, delay: 2.8 },
    { x: "66%", y: "26%", r: 1.3, baseOpacity: isLight ? 0.30 : 0.55, delay: 1.5 },
    { x: "76%", y: "18%", r: 0.8, baseOpacity: isLight ? 0.20 : 0.35, delay: 3.1 },
    { x: "84%", y: "28%", r: 1.1, baseOpacity: isLight ? 0.25 : 0.45, delay: 0.9 },
    { x: "90%", y: "16%", r: 0.9, baseOpacity: isLight ? 0.22 : 0.40, delay: 2.4 },

    // Flancos Medios e Inferiores
    { x: "8%", y: "48%", r: 1.0, baseOpacity: isLight ? 0.20 : 0.35, delay: 1.8 },
    { x: "15%", y: "65%", r: 1.2, baseOpacity: isLight ? 0.25 : 0.45, delay: 0.4 },
    { x: "24%", y: "78%", r: 0.8, baseOpacity: isLight ? 0.18 : 0.30, delay: 3.7 },
    { x: "78%", y: "68%", r: 1.1, baseOpacity: isLight ? 0.26 : 0.45, delay: 1.1 },
    { x: "88%", y: "58%", r: 0.9, baseOpacity: isLight ? 0.20 : 0.38, delay: 2.6 },
    { x: "92%", y: "80%", r: 1.0, baseOpacity: isLight ? 0.22 : 0.40, delay: 0.5 },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* ── 1. Aura Óptica y Resplandor Luminous Superior (Elegancia Ejecutiva) ── */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(400px, 75vw, 980px)",
          height: "clamp(260px, 45vw, 480px)",
          background: isLight
            ? "radial-gradient(ellipse at 50% 35%, rgba(37, 99, 235, 0.07) 0%, rgba(2, 132, 199, 0.035) 45%, transparent 75%)"
            : "radial-gradient(ellipse at 50% 35%, rgba(0, 194, 255, 0.11) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 75%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ── 2. Horizontes Ópticos Vectoriales Finos (Líneas de Trayectoria Sutiles) ── */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          {/* Gradiente de arco orbital sobrio */}
          <linearGradient id="orbitalArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isLight ? "#2563EB" : "#38BDF8"} stopOpacity="0" />
            <stop offset="35%" stopColor={isLight ? "#0284C7" : "#00C2FF"} stopOpacity={isLight ? "0.14" : "0.22"} />
            <stop offset="65%" stopColor={isLight ? "#2563EB" : "#38BDF8"} stopOpacity={isLight ? "0.14" : "0.22"} />
            <stop offset="100%" stopColor={isLight ? "#2563EB" : "#38BDF8"} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="subtleRayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#2563EB" : "#00C2FF"} stopOpacity={isLight ? "0.08" : "0.15"} />
            <stop offset="100%" stopColor={isLight ? "#2563EB" : "#00C2FF"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Arco elíptico sutil de horizonte de inteligencia */}
        <path
          d="M 50 360 Q 600 40 1150 360"
          stroke="url(#orbitalArcGrad)"
          strokeWidth="0.85"
          strokeDasharray="6 8"
        />

        {/* Segundo arco complementario ultra-tenue */}
        <path
          d="M 150 420 Q 600 120 1050 420"
          stroke="url(#orbitalArcGrad)"
          strokeWidth="0.6"
          opacity={isLight ? 0.6 : 0.75}
        />
      </svg>

      {/* ── 3. Puntos Estelares Microscópicos con Respiración Lenta ── */}
      {microPins.map((pin, i) => (
        <motion.div
          key={i}
          initial={{ opacity: pin.baseOpacity * 0.7 }}
          animate={{
            opacity: [pin.baseOpacity * 0.6, pin.baseOpacity * 1.25, pin.baseOpacity * 0.6],
            scale: [0.95, 1.1, 0.95],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            delay: pin.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: pin.x,
            top: pin.y,
            width: pin.r * 2,
            height: pin.r * 2,
            borderRadius: "50%",
            backgroundColor: isLight ? "#2563EB" : "#E2E8F0",
            boxShadow: isLight
              ? `0 0 ${pin.r * 2}px rgba(37, 99, 235, 0.35)`
              : `0 0 ${pin.r * 3}px rgba(56, 189, 248, 0.65)`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── 4. Sutil Micro-Haz Central de Luz Zenith ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "120px",
          background: isLight
            ? "linear-gradient(180deg, rgba(37, 99, 235, 0.25) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, transparent 100%)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
