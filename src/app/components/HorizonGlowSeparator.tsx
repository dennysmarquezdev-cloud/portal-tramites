import React from "react";

interface HorizonGlowSeparatorProps {
  theme?: "light" | "dark";
  className?: string;
  badgeLabel?: string;
}

export function HorizonGlowSeparator({
  theme = "light",
  className = "",
  badgeLabel
}: HorizonGlowSeparatorProps) {
  const isLight = theme === "light";

  return (
    <div 
      className={`horizon-glow-separator ${className}`}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 10,
        margin: "0 auto",
        height: 24
      }}
      aria-hidden="true"
    >
      {/* ── Ambient Radial Flare / Aura ── */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(260px, 50vw, 680px)",
          height: 28,
          background: isLight 
            ? "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.08) 55%, transparent 75%)" 
            : "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.38) 0%, rgba(37, 99, 235, 0.16) 55%, transparent 80%)",
          filter: "blur(10px)",
          pointerEvents: "none"
        }}
      />

      {/* ── Baseline 1px track that smoothly fades to edges ── */}
      <div 
        style={{
          width: "100%",
          height: 1,
          background: isLight
            ? "linear-gradient(90deg, transparent 0%, rgba(201, 221, 239, 0.4) 15%, rgba(37, 99, 235, 0.3) 38%, rgba(56, 189, 248, 0.75) 50%, rgba(37, 99, 235, 0.3) 62%, rgba(201, 221, 239, 0.4) 85%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(28, 45, 66, 0.4) 15%, rgba(56, 189, 248, 0.35) 38%, rgba(56, 189, 248, 0.9) 50%, rgba(56, 189, 248, 0.35) 62%, rgba(28, 45, 66, 0.4) 85%, transparent 100%)"
        }}
      />

      {/* ── High-Intensity Center Laser Beam ── */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(120px, 24vw, 300px)",
          height: 2,
          borderRadius: 9999,
          background: isLight
            ? "linear-gradient(90deg, transparent, #2563EB 20%, #38BDF8 50%, #2563EB 80%, transparent)"
            : "linear-gradient(90deg, transparent, #60A5FA 20%, #BAE6FD 50%, #60A5FA 80%, transparent)",
          boxShadow: isLight
            ? "0 0 14px 1.5px rgba(56, 189, 248, 0.75), 0 0 4px 0.5px rgba(37, 99, 235, 0.85)"
            : "0 0 18px 2.5px rgba(56, 189, 248, 0.85), 0 0 6px 1px rgba(186, 230, 253, 0.95)"
        }}
      />

      {/* ── Center Node / Micro-Sparkle Node ── */}
      {badgeLabel ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2px 10px",
            borderRadius: 9999,
            background: isLight ? "#FFFFFF" : "#0D1521",
            border: isLight ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(56, 189, 248, 0.4)",
            color: isLight ? "#0284C7" : "#38BDF8",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
            boxShadow: isLight ? "0 2px 8px rgba(37, 99, 235, 0.12)" : "0 2px 12px rgba(0, 0, 0, 0.5)",
            display: "inline-flex",
            alignItems: "center",
            gap: 5
          }}
        >
          <span 
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: isLight ? "#0284C7" : "#38BDF8",
              boxShadow: "0 0 6px currentColor"
            }} 
          />
          {badgeLabel}
        </div>
      ) : (
        <div 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: isLight ? "#38BDF8" : "#BAE6FD",
            boxShadow: isLight 
              ? "0 0 10px 2px rgba(56, 189, 248, 0.9)" 
              : "0 0 12px 3px rgba(186, 230, 253, 1)"
          }}
        />
      )}
    </div>
  );
}
