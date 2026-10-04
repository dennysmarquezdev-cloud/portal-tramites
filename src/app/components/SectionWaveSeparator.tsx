import React from "react";

interface SectionWaveSeparatorProps {
  primaryColor?: string;
  fillColor?: string;
  height?: string | number;
  className?: string;
  flipY?: boolean;
}

export function SectionWaveSeparator({
  primaryColor = "var(--primary, #2563EB)",
  fillColor = "var(--background, #EDF3FA)",
  height = "clamp(48px, 7vw, 96px)",
  className = "",
  flipY = false
}: SectionWaveSeparatorProps) {
  return (
    <div 
      className={`section-wave-container ${className}`} 
      style={{
        position: "absolute",
        bottom: flipY ? "auto" : 0,
        top: flipY ? 0 : "auto",
        left: 0,
        right: 0,
        width: "100%",
        height: height,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
        lineHeight: 0,
        transform: flipY ? "scaleY(-1)" : "none"
      }}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 1920 180" 
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
        <path 
          d="M1921 164.375C1734.2 -139.225 527.167 48.8754 -33 180.875H1921V164.375Z" 
          fill={primaryColor} 
        />
        <path 
          d="M1921 164.375C1714.2 -59.2247 527.167 58.8754 -33 180.875H1921V164.375Z" 
          fill={fillColor} 
        />
      </svg>
    </div>
  );
}
