import React from "react";

interface GeometricBevelSeparatorProps {
  theme?: "light" | "dark";
  accentColor?: string;
  fillColor?: string;
  heroBgColor?: string;
  height?: string | number;
  direction?: "left-to-right" | "right-to-left";
  className?: string;
}

export function GeometricBevelSeparator({
  theme = "light",
  accentColor,
  fillColor,
  heroBgColor,
  height = "clamp(30px, 4.5vw, 60px)",
  direction = "left-to-right",
  className = ""
}: GeometricBevelSeparatorProps) {
  const isLight = theme === "light";
  const bgHero = heroBgColor || (isLight ? "#F7FBFF" : "#0D1521");
  const bgNext = fillColor || (isLight ? "#EDF3FA" : "#0D1521");

  const isLtr = direction === "left-to-right";
  // Slope from y=0 on left to y=48 on right (out of 80)
  const polygonBottom = isLtr
    ? "0,0 1920,48 1920,80 0,80"
    : "0,48 1920,0 1920,80 0,80";

  const polygonTop = isLtr
    ? "0,0 1920,0 1920,48"
    : "0,0 1920,0 0,48";

  const lineCoords = isLtr
    ? { x1: 0, y1: 0, x2: 1920, y2: 48 }
    : { x1: 0, y1: 48, x2: 1920, y2: 0 };

  return (
    <div 
      className={`geometric-bevel-separator ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 5,
        lineHeight: 0,
        margin: "0 auto",
        background: bgHero
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }}
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="bevelLaserStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isLight ? "rgba(37, 99, 235, 0.2)" : "rgba(56, 189, 248, 0.2)"} />
            <stop offset="25%" stopColor={isLight ? "#2563EB" : "#38BDF8"} />
            <stop offset="50%" stopColor={isLight ? "#0284C7" : "#60A5FA"} />
            <stop offset="75%" stopColor={isLight ? "#2563EB" : "#38BDF8"} />
            <stop offset="100%" stopColor={isLight ? "rgba(37, 99, 235, 0.2)" : "rgba(56, 189, 248, 0.2)"} />
          </linearGradient>
          <linearGradient id="bevelAmbientGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isLight ? "rgba(56, 189, 248, 0)" : "rgba(56, 189, 248, 0)"} />
            <stop offset="50%" stopColor={isLight ? "rgba(56, 189, 248, 0.18)" : "rgba(56, 189, 248, 0.3)"} />
            <stop offset="100%" stopColor={isLight ? "rgba(56, 189, 248, 0)" : "rgba(56, 189, 248, 0)"} />
          </linearGradient>
        </defs>

        {/* Top polygon (Hero color) */}
        <polygon points={polygonTop} fill={bgHero} />

        {/* Bottom polygon (Next section color) */}
        <polygon points={polygonBottom} fill={bgNext} />

        {/* Ambient Glow */}
        <line
          x1={lineCoords.x1}
          y1={lineCoords.y1}
          x2={lineCoords.x2}
          y2={lineCoords.y2}
          stroke="url(#bevelAmbientGlow)"
          strokeWidth="10"
        />

        {/* Laser Bevel Line */}
        <line
          x1={lineCoords.x1}
          y1={lineCoords.y1}
          x2={lineCoords.x2}
          y2={lineCoords.y2}
          stroke="url(#bevelLaserStroke)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
