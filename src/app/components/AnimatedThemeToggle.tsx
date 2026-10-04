import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { haptic } from '../utils/haptics';

interface AnimatedThemeIconProps {
  isDark: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Ícono vectorial SVG animado Sol / Luna con morphing dinámico mediante máscara
 * y rayos solares con animación de escala, opacidad y rotación.
 */
export function AnimatedThemeIcon({
  isDark,
  size = 18,
  className = '',
  style = {}
}: AnimatedThemeIconProps) {
  const uniqueId = useId().replace(/:/g, '-');
  const maskId = `theme-mask-${uniqueId}`;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      animate={{
        rotate: isDark ? 40 : 90,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 20
      }}
      style={{
        display: "block",
        overflow: "visible",
        color: isDark ? "#818CF8" : "#F59E0B",
        filter: isDark 
          ? "drop-shadow(0 0 4px rgba(129, 140, 248, 0.45))" 
          : "drop-shadow(0 0 5px rgba(245, 158, 11, 0.55))",
        ...style
      }}
    >
      <mask id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <motion.circle
          animate={{
            cx: isDark ? 19 : 28,
            cy: isDark ? 4.5 : 0,
            r: isDark ? 9 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22
          }}
          fill="black"
        />
      </mask>

      {/* Cuerpo central Sol / Luna */}
      <motion.circle
        cx="12"
        cy="12"
        mask={`url(#${maskId})`}
        animate={{
          r: isDark ? 9 : 5,
          fill: isDark ? "#818CF8" : "#F59E0B",
          stroke: isDark ? "#818CF8" : "#F59E0B"
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22
        }}
      />

      {/* Rayos de sol con animación de escala, desvanecimiento y rotación */}
      <motion.g
        stroke={isDark ? "#818CF8" : "#F59E0B"}
        strokeWidth="2"
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.35 : 1,
          rotate: isDark ? -45 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22
        }}
        style={{
          transformOrigin: "center"
        }}
      >
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.g>
    </motion.svg>
  );
}

interface AnimatedThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  size?: number;
  buttonSize?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

/**
 * Botón interactivo completo con efectos táctiles, borde nítido de precisión y soporte de tema.
 */
export function AnimatedThemeToggle({
  isDark,
  onToggle,
  size = 15,
  buttonSize = 32,
  className = '',
  style = {},
  ariaLabel
}: AnimatedThemeToggleProps) {
  const label = ariaLabel || (isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro");

  return (
    <motion.button
      type="button"
      whileHover={{ 
        scale: 1.05,
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 0, 0, 0.15)"
      }}
      whileTap={{ scale: 0.92 }}
      onClick={() => {
        haptic.selection();
        onToggle();
      }}
      title={label}
      aria-label={label}
      className={`animated-theme-toggle ${className}`}
      style={{
        width: buttonSize,
        height: buttonSize,
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        border: isDark 
          ? "1px solid rgba(255, 255, 255, 0.12)" 
          : "1px solid rgba(0, 0, 0, 0.10)",
        background: isDark 
          ? "rgba(255, 255, 255, 0.04)" 
          : "rgba(255, 255, 255, 0.70)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        cursor: "pointer",
        outline: "none",
        transition: "border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
        boxShadow: isDark 
          ? "0 1px 3px rgba(0, 0, 0, 0.25)" 
          : "0 1px 2px rgba(0, 0, 0, 0.05)",
        ...style
      }}
    >
      <AnimatedThemeIcon isDark={isDark} size={size} />
    </motion.button>
  );
}
