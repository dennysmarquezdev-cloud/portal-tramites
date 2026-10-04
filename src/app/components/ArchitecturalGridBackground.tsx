import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ArchitecturalGridBackgroundProps {
  theme?: "light" | "dark";
  className?: string;
}

export function ArchitecturalGridBackground({
  theme = "light",
  className = ""
}: ArchitecturalGridBackgroundProps) {
  const isLight = theme === "light";
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`at-architectural-grid-bg ${className}`}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: isLight 
          ? "#F8FAFC" 
          : "#030712",
        transition: "background 0.3s ease"
      }}
    >
      {/* ── 1. Destello Central Cenital (Zenithal Spotlight) ── */}
      <div 
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          maxWidth: 1400,
          height: "65vh",
          borderRadius: "50%",
          background: isLight
            ? "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(220, 38, 38, 0.08) 0%, rgba(217, 119, 6, 0.04) 35%, rgba(2, 132, 199, 0.02) 60%, transparent 80%)"
            : "radial-gradient(ellipse 75% 65% at 50% 20%, rgba(239, 68, 68, 0.18) 0%, rgba(245, 158, 11, 0.07) 35%, rgba(2, 132, 199, 0.03) 60%, transparent 80%)",
          filter: "blur(50px)",
          opacity: 0.95
        }}
      />

      {/* ── 2. Cuadrícula Técnica Arquitectónica con Máscara Radial ── */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isLight
            ? `
              linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
            `
            : `
              linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px)
            `,
          backgroundSize: "44px 44px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 48%, black 25%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 48%, black 25%, transparent 85%)",
          opacity: isLight ? 0.85 : 0.75
        }}
      />

      {/* ── 3. Marcadores de Cruz Técnica (+) en Intersecciones Mayores (Estilo Linear) ── */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isLight
            ? `
              radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.25) 1.5px, transparent 0)
            `
            : `
              radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.4) 1.5px, transparent 0)
            `,
          backgroundSize: "132px 132px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 48%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 48%, black 20%, transparent 80%)",
          opacity: 0.9
        }}
      />

      {/* ── 4. Foco Interactivo con Seguimiento Suave de Ratón ── */}
      <div 
        style={{
          position: "absolute",
          top: mousePos.y - 250,
          left: mousePos.x - 250,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: isLight
            ? "radial-gradient(circle, rgba(220, 38, 38, 0.045) 0%, rgba(2, 132, 199, 0.02) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(239, 68, 68, 0.10) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          transition: "top 0.15s ease-out, left 0.15s ease-out"
        }}
      />

      {/* ── 5. Partículas Flotantes de Luz Sutil (Ambient Dust) ── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${15 + i * 14}vw`,
            y: `${60 + (i % 3) * 15}vh`,
            opacity: isLight ? 0.25 : 0.4
          }}
          animate={{
            y: [`${60 + (i % 3) * 15}vh`, `${25 + (i % 4) * 12}vh`],
            opacity: isLight ? [0.15, 0.45, 0.15] : [0.2, 0.65, 0.2]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            borderRadius: "50%",
            background: i % 2 === 0 
              ? (isLight ? "#DC2626" : "#EF4444") 
              : (isLight ? "#D97706" : "#F59E0B"),
            boxShadow: isLight
              ? "0 0 10px rgba(220, 38, 38, 0.3)"
              : "0 0 14px rgba(239, 68, 68, 0.6)",
            pointerEvents: "none"
          }}
        />
      ))}

      {/* ── 6. Viñeta Suave de Bordes para Enfoque en el Centro ── */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: isLight
            ? "radial-gradient(ellipse 90% 75% at 50% 50%, transparent 45%, rgba(248, 250, 252, 0.6) 100%)"
            : "radial-gradient(ellipse 90% 75% at 50% 50%, transparent 45%, rgba(3, 7, 18, 0.7) 100%)",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}
