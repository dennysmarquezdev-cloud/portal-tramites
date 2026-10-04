import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DismissRegular, 
  LockClosedRegular 
} from "@fluentui/react-icons";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";
import { haptic } from "../utils/haptics";
import { LogoIcon } from "./LogoIcon";
import lotaAiLogo from "../../assets/lota-ai-logo.png";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  theme?: "light" | "dark";
}

// ── Fondo Cósmico de Estrellas Nítidas y Profesionales ──
function CosmicStarfieldBackground({ isLight = true }: { isLight?: boolean }) {
  // Estrellas estelares principales (4-point diamond sparkles)
  const stars = [
    { x: 30, y: 38, size: 16, color: "#0284C7", delay: 0 },
    { x: 80, y: 75, size: 10, color: isLight ? "#2563EB" : "#60A5FA", delay: 1.2 },
    { x: 385, y: 36, size: 18, color: "#F59E0B", delay: 0.6 },
    { x: 345, y: 88, size: 11, color: "#0284C7", delay: 1.8 },
    { x: 36, y: 160, size: 14, color: isLight ? "#4F46E5" : "#818CF8", delay: 0.9 },
    { x: 395, y: 170, size: 13, color: isLight ? "#0066FF" : "#38BDF8", delay: 2.1 },
    { x: 26, y: 270, size: 12, color: "#D97706", delay: 1.5 },
    { x: 408, y: 285, size: 15, color: isLight ? "#2563EB" : "#60A5FA", delay: 0.3 },
    { x: 44, y: 395, size: 13, color: "#0284C7", delay: 2.4 },
    { x: 382, y: 405, size: 14, color: isLight ? "#6366F1" : "#A78BFA", delay: 1.1 },
  ];

  // Micro-partículas y nodos estelares
  const microDust = [
    { cx: 52, cy: 48, r: 1.8, opacity: 0.45, fill: "#0284C7" },
    { cx: 115, cy: 32, r: 1.4, opacity: 0.35, fill: "#2563EB" },
    { cx: 165, cy: 58, r: 1.6, opacity: 0.4, fill: "#818CF8" },
    { cx: 280, cy: 42, r: 1.5, opacity: 0.35, fill: "#0284C7" },
    { cx: 332, cy: 62, r: 2.0, opacity: 0.5, fill: "#F59E0B" },
    { cx: 28, cy: 115, r: 1.5, opacity: 0.4, fill: "#2563EB" },
    { cx: 92, cy: 185, r: 1.3, opacity: 0.3, fill: "#0284C7" },
    { cx: 352, cy: 145, r: 1.6, opacity: 0.45, fill: "#818CF8" },
    { cx: 412, cy: 125, r: 1.8, opacity: 0.4, fill: "#F59E0B" },
    { cx: 32, cy: 330, r: 1.5, opacity: 0.35, fill: "#0284C7" },
    { cx: 72, cy: 440, r: 1.4, opacity: 0.3, fill: "#2563EB" },
    { cx: 362, cy: 350, r: 1.6, opacity: 0.4, fill: "#818CF8" },
    { cx: 412, cy: 430, r: 1.8, opacity: 0.45, fill: "#0284C7" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        borderRadius: 26,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 440 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          {/* Resplandores cósmicos de fondo sutiles */}
          <radialGradient id="cosmicGlow1" cx="20%" cy="15%" r="40%">
            <stop offset="0%" stopColor={isLight ? "rgba(0, 102, 255, 0.09)" : "rgba(56, 189, 248, 0.18)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="cosmicGlow2" cx="85%" cy="20%" r="40%">
            <stop offset="0%" stopColor={isLight ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.15)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="cosmicGlow3" cx="50%" cy="85%" r="45%">
            <stop offset="0%" stopColor={isLight ? "rgba(99, 102, 241, 0.06)" : "rgba(99, 102, 241, 0.16)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Nebulosas espaciales suaves */}
        <rect width="440" height="540" fill="url(#cosmicGlow1)" />
        <rect width="440" height="540" fill="url(#cosmicGlow2)" />
        <rect width="440" height="540" fill="url(#cosmicGlow3)" />

        {/* Filamentos de constelaciones */}
        <g opacity={isLight ? 0.3 : 0.45}>
          <path d="M30 38 L80 75 L115 32" stroke={isLight ? "#93C5FD" : "#38BDF8"} strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M385 36 L345 88 L352 145" stroke={isLight ? "#FDE68A" : "#FBBF24"} strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M36 160 L92 185 L32 330" stroke={isLight ? "#C7D2FE" : "#818CF8"} strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M395 170 L408 285 L362 350" stroke={isLight ? "#93C5FD" : "#38BDF8"} strokeWidth="0.8" strokeDasharray="3 3" />
        </g>

        {/* Micro-estrellas fijas */}
        {microDust.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={isLight ? d.opacity : d.opacity * 1.3} />
        ))}
      </svg>

      {/* Estrellas Diamante 4-Point con micro-animación de brillo cósmico */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4, scale: 0.9 }}
          animate={{
            opacity: [0.35, 0.95, 0.35],
            scale: [0.85, 1.15, 0.85],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: s.size,
            height: s.size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0 C12 6.6 6.6 12 0 12 C6.6 12 12 17.4 12 24 C12 17.4 17.4 12 24 12 C17.4 12 12 6.6 12 0 Z"
              fill={s.color}
              opacity={isLight ? 0.85 : 0.95}
            />
            <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" opacity={0.95} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ── Iconos SVG de Alta Calidad para Beneficios ──
function ShieldSecurityIcon({ size = 22, isLight = true }: { size?: number; isLight?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path 
        d="M12 2.5L4 6.2V11.5C4 16.8 7.4 21.6 12 22.9C16.6 21.6 20 16.8 20 11.5V6.2L12 2.5Z" 
        fill={isLight ? "rgba(16, 185, 129, 0.14)" : "rgba(16, 185, 129, 0.22)"} 
        stroke="url(#shieldGrad)" 
        strokeWidth="1.6" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 12.2L11 14.2L15.5 9.7" 
        stroke="url(#shieldGrad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function LotaBotIcon({ size = 22, isLight = true }: { size?: number; isLight?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="botGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="50%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {/* Cabeza del Asistente */}
      <rect 
        x="4.5" 
        y="6.5" 
        width="15" 
        height="12" 
        rx="4.5" 
        fill={isLight ? "rgba(0, 102, 255, 0.12)" : "rgba(56, 189, 248, 0.2)"} 
        stroke="url(#botGrad)" 
        strokeWidth="1.6" 
      />
      {/* Antena */}
      <path d="M12 3.5V6.5" stroke="url(#botGrad)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1.2" fill="#00C2FF" />
      {/* Ojos */}
      <circle cx="9" cy="11.5" r="1.4" fill="url(#botGrad)" />
      <circle cx="15" cy="11.5" r="1.4" fill="url(#botGrad)" />
      {/* Sonrisa */}
      <path d="M10.2 14.8C10.8 15.5 11.4 15.8 12 15.8C12.6 15.8 13.2 15.5 13.8 14.8" stroke="url(#botGrad)" strokeWidth="1.3" strokeLinecap="round" />
      {/* Sensores laterales */}
      <path d="M3 10.5V14.5M21 10.5V14.5" stroke="url(#botGrad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarFavoritesIcon({ size = 22, isLight = true }: { size?: number; isLight?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <path 
        d="M12 3L14.7 8.5L20.8 9.4L16.4 13.7L17.4 19.8L12 16.9L6.6 19.8L7.6 13.7L3.2 9.4L9.3 8.5L12 3Z" 
        fill={isLight ? "rgba(245, 158, 11, 0.14)" : "rgba(245, 158, 11, 0.22)"} 
        stroke="url(#starGrad)" 
        strokeWidth="1.6" 
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11.5" r="1.3" fill="url(#starGrad)" />
    </svg>
  );
}

export function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  theme = "light"
}: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const isLight = theme === "light";

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleGoogle = async () => {
    haptic.medium();
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      haptic.success();
      toast.success(`¡Bienvenido, ${result.user.displayName || "Usuario"}!`);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        haptic.error();
        toast.error(err.message || "Error al iniciar sesión con Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box"
          }}
        >
          {/* Backdrop con desenfoque de cristal suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: isLight 
                ? "rgba(11, 30, 56, 0.48)" 
                : "rgba(2, 6, 18, 0.84)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)"
            }}
          />

          {/* Tarjeta Modal Premium con Fondo Cósmico */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 360 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: 440,
              background: isLight ? "#FFFFFF" : "#0E1726",
              borderRadius: 26,
              border: isLight 
                ? "1.5px solid rgba(0, 102, 255, 0.16)" 
                : "1.5px solid rgba(255, 255, 255, 0.1)",
              boxShadow: isLight
                ? "0 28px 70px -12px rgba(11, 30, 56, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.9) inset"
                : "0 32px 80px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
              boxSizing: "border-box",
              fontFamily: "'Inter', -apple-system, sans-serif",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fondo de Estrellas Cósmicas Nítidas */}
            <CosmicStarfieldBackground isLight={isLight} />

            {/* Cabecera Cálida con Logo LOTA AI */}
            <div 
              style={{ 
                position: "relative", 
                zIndex: 1,
                width: "100%", 
                padding: "32px 24px 18px", 
                background: isLight 
                  ? "radial-gradient(ellipse at 50% 0%, rgba(232, 242, 253, 0.85) 0%, rgba(248, 250, 252, 0.4) 75%, transparent 100%)" 
                  : "radial-gradient(ellipse at 50% 0%, rgba(23, 40, 68, 0.9) 0%, rgba(14, 23, 38, 0.5) 80%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderBottom: isLight ? "1px solid rgba(237, 243, 250, 0.8)" : "1px solid rgba(255, 255, 255, 0.06)",
                boxSizing: "border-box"
              }}
            >
              {/* Botón Cerrar (X) Flotante */}
              <motion.button
                whileHover={{ scale: 1.08, background: isLight ? "#E2EDF8" : "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: isLight ? "rgba(237, 243, 250, 0.9)" : "rgba(255, 255, 255, 0.06)",
                  border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.1)",
                  color: isLight ? "#475569" : "#94A3B8",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  zIndex: 10
                }}
                aria-label="Cerrar modal"
              >
                <DismissRegular fontSize={15} />
              </motion.button>

              {/* Logo Oficial de LOTA AI Sin Contorno Negro con Halo Pulsante */}
              <div style={{ position: "relative", marginBottom: 16 }}>
                {/* Halo de resplandor sutil */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    background: isLight
                      ? "radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, rgba(56, 189, 248, 0.12) 60%, transparent 80%)"
                      : "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.18) 60%, transparent 80%)",
                    filter: "blur(10px)",
                    zIndex: 0
                  }}
                />
                
                {/* Contenedor Limpio del Logo LOTA AI */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: 74,
                    height: 74,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: isLight 
                      ? "drop-shadow(0 8px 20px rgba(0, 102, 255, 0.22))" 
                      : "drop-shadow(0 10px 24px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.25))"
                  }}
                >
                  <img 
                    src={lotaAiLogo} 
                    alt="LOTA AI" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain",
                      display: "block"
                    }} 
                  />

                  {/* Micro-badge de ahorratiempo sobre el icono */}
                  <div 
                    style={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      zIndex: 3,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#0066FF",
                      border: "2px solid #FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0, 102, 255, 0.35)"
                    }}
                    title="ahorratiempo.pe"
                  >
                    <LogoIcon size={13} variant="white" />
                  </div>
                </div>
              </div>

              {/* Título Principal Amigable */}
              <h2 
                style={{ 
                  margin: "0 0 6px 0", 
                  fontSize: "clamp(20px, 3.8vw, 23px)", 
                  fontWeight: 800, 
                  color: isLight ? "#0B1E38" : "#F8FAFC",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.03em"
                }}
              >
                ¡Hola! Te damos la bienvenida
              </h2>

              <p 
                style={{ 
                  margin: 0, 
                  fontSize: 13, 
                  lineHeight: 1.5, 
                  color: isLight ? "#526581" : "#94A3B8",
                  maxWidth: 360
                }}
              >
                Inicia sesión para sincronizar tus trámites guardados y consultar a LOTA AI desde cualquier dispositivo.
              </p>
            </div>

            {/* Cuerpo del Modal & Beneficios */}
            <div style={{ position: "relative", zIndex: 1, padding: "18px 22px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
              
              {/* Chips de Beneficios Rápidos con Iconos SVG de Calidad */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[
                  { 
                    icon: <ShieldSecurityIcon size={24} isLight={isLight} />, 
                    title: "100% Seguro",
                    sub: "Cifrado oficial",
                    bgColor: isLight ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.12)",
                    borderColor: isLight ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.25)"
                  },
                  { 
                    icon: <LotaBotIcon size={24} isLight={isLight} />, 
                    title: "LOTA AI 24/7",
                    sub: "Guía tributaria",
                    bgColor: isLight ? "rgba(0, 102, 255, 0.07)" : "rgba(56, 189, 248, 0.12)",
                    borderColor: isLight ? "rgba(0, 102, 255, 0.2)" : "rgba(56, 189, 248, 0.25)"
                  },
                  { 
                    icon: <StarFavoritesIcon size={24} isLight={isLight} />, 
                    title: "Favoritos",
                    sub: "Sync en la nube",
                    bgColor: isLight ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.12)",
                    borderColor: isLight ? "rgba(245, 158, 11, 0.2)" : "rgba(245, 158, 11, 0.25)"
                  },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "11px 6px",
                      background: b.bgColor,
                      border: `1px solid ${b.borderColor}`,
                      borderRadius: 14,
                      textAlign: "center",
                      transition: "transform 0.14s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2 }}>
                      {b.icon}
                    </div>
                    <span style={{ 
                      fontSize: 11.5, 
                      fontWeight: 700, 
                      color: isLight ? "#0B1E38" : "#F8FAFC",
                      lineHeight: 1.2
                    }}>
                      {b.title}
                    </span>
                    <span style={{ 
                      fontSize: 9.5, 
                      fontWeight: 500, 
                      color: isLight ? "#64748B" : "#94A3B8" 
                    }}>
                      {b.sub}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Botón Principal de Google OAuth */}
              <motion.button
                onClick={handleGoogle}
                disabled={loading}
                whileHover={{ 
                  scale: 1.015, 
                  boxShadow: isLight 
                    ? "0 10px 24px -4px rgba(0, 102, 255, 0.2), 0 2px 8px rgba(11, 30, 56, 0.08)" 
                    : "0 10px 28px -4px rgba(0, 0, 0, 0.7), 0 0 16px rgba(56, 189, 248, 0.3)" 
                }}
                whileTap={{ scale: 0.985 }}
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 14,
                  background: isLight ? "#FFFFFF" : "#131F33",
                  border: isLight 
                    ? "1.5px solid #CBD5E1" 
                    : "1.5px solid rgba(56, 189, 248, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  cursor: loading ? "wait" : "pointer",
                  color: isLight ? "#0F172A" : "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: isLight 
                    ? "0 2px 8px rgba(11, 30, 56, 0.05)" 
                    : "0 2px 10px rgba(0, 0, 0, 0.4)",
                  transition: "all 0.16s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Icono Oficial de Google */}
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{loading ? "Conectando con Google..." : "Iniciar sesión con Google"}</span>
              </motion.button>

              {/* Pie de Seguridad Simplificado */}
              <div 
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  textAlign: "center",
                  fontSize: 12, 
                  fontWeight: 500,
                  color: isLight ? "#64748B" : "#94A3B8",
                  lineHeight: 1.4
                }}
              >
                <LockClosedRegular fontSize={14} color={isLight ? "#059669" : "#34D399"} />
                <span>Autenticación oficial con Google</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

