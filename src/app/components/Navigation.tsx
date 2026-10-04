import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DismissRegular, 
  HomeRegular, 
  GridRegular, 
  QuestionCircleRegular, 
  SignOutRegular, 
  ShieldRegular, 
  HeartRegular, 
  SparkleRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  PersonRegular
} from '@fluentui/react-icons';
import { Page } from '../types';
import { Tooltip } from '@fluentui/react-components';
import { haptic } from '../utils/haptics';
import { GOBPE_COLORS } from '../utils/gobpe-theme';
import { AnimatedThemeIcon } from './AnimatedThemeToggle';

// Icono de Sidebar Toggle Panel
export function SidebarToggleIcon({ size = 20, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <rect width="18" height="18" x="3" y="3" rx="5" stroke={color} />
      <path d="M9 3v18" stroke={color} />
    </svg>
  );
}

// ── Cápsula Unificada de Control ─────────────────────────
export function FloatingNavTrigger({ 
  onOpen, 
  onLogoClick,
  onAdmin,
  isAdmin,
  user,
  onLogin,
  theme = "dark"
}: { 
  onOpen: () => void; 
  onLogoClick?: () => void;
  onAdmin?: () => void;
  isAdmin?: boolean;
  user?: any;
  onLogin?: () => void;
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light";

  return (
    <div 
      style={{
        position: "fixed",
        top: 18,
        left: 20,
        zIndex: 60,
        userSelect: "none"
      }}
    >
      {/* Botón Flotante Minimalista de Cristal con Gob.pe */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: isLight ? GOBPE_COLORS.gray[100] : GOBPE_COLORS.neutral[800],
          border: isLight ? `1px solid ${GOBPE_COLORS.neutral[300]}` : "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 9999,
          padding: "4px 8px 4px 4px",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow: isLight ? "0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)" : "0 8px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 86, 172, 0.25)",
          gap: 6
        }}
      >
        {/* Botón de Alternancia de Módulos (Sidebar) */}
        <Tooltip content="Abrir módulos de navegación" relationship="label">
          <motion.button
            whileHover={{ scale: 1.08, background: isLight ? GOBPE_COLORS.neutral[100] : "rgba(255, 255, 255, 0.12)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              haptic.medium();
              onOpen();
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              color: isLight ? GOBPE_COLORS.gray[800] : "#FFFFFF",
              padding: 0,
              transition: "all 0.15s ease"
            }}
            aria-label="Abrir navegación"
          >
            <SidebarToggleIcon size={18} color={isLight ? GOBPE_COLORS.gray[800] : "#FFFFFF"} />
          </motion.button>
        </Tooltip>

        {/* Separador vertical */}
        <div style={{ width: 1, height: 16, background: isLight ? GOBPE_COLORS.neutral[300] : "rgba(255, 255, 255, 0.18)" }} />

        {/* Avatar / Usuario */}
        {user ? (
          <Tooltip content={user.displayName || user.email || "Mi Perfil"} relationship="label">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                haptic.selection();
                window.location.hash = "#perfil";
              }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${GOBPE_COLORS.blue[700]}` }} 
                />
              ) : (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: GOBPE_COLORS.blue[700], color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </motion.button>
          </Tooltip>
        ) : (
          <Tooltip content="Iniciar Sesión" relationship="label">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                haptic.medium();
                onLogin?.();
              }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "2px 6px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: isLight ? GOBPE_COLORS.blue[700] : GOBPE_COLORS.blue[400],
                fontSize: 12,
                fontWeight: 700
              }}
            >
              <PersonRegular fontSize={15} />
              <span>Acceder</span>
            </motion.button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

// ── Sidebar de Navegación Sana AI con Colores Oficiales Gob.pe ──
export const Sidebar = NavigationDrawer;
export function NavigationDrawer({
  isOpen = true,
  onClose,
  page,
  setPage,
  faveCount = 0,
  user,
  onLogin,
  onLogout,
  onAdmin,
  isAdmin,
  theme = "dark",
  toggleTheme,
  onOpenPaywall
}: {
  isOpen?: boolean;
  onClose?: () => void;
  page: Page;
  setPage: (p: Page, query?: string) => void;
  faveCount?: number;
  user?: any;
  onLogin?: () => void;
  onLogout?: () => void;
  onAdmin?: () => void;
  isAdmin?: boolean;
  theme?: "light" | "dark";
  toggleTheme?: () => void;
  onOpenPaywall?: () => void;
}) {
  const isLight = theme === "light";
  const headerName = user?.displayName ? user.displayName.split(" ")[0] : "Portal Trámites";
  const isUserPremium = user?.isPremium === true || (user?.email || "").toLowerCase() === "plaeis260@gmail.com";

  const handleNav = (p: Page) => {
    haptic.selection();
    if (p === "frutilota" && !isUserPremium) {
      onOpenPaywall?.();
      onClose?.();
      return;
    }
    setPage(p);
    onClose?.();
  };

  const navItems = [
    { id: "home" as Page, label: "Inicio", icon: HomeRegular },
    { id: "categories" as Page, label: "Categorías", icon: GridRegular },
    { id: "favorites" as Page, label: "Favoritos", icon: HeartRegular, count: faveCount },
    ...(user ? [{ id: "perfil" as Page, label: "Mi Perfil", icon: PersonRegular }] : []),
    { id: "help" as Page, label: "Centro de Ayuda", icon: QuestionCircleRegular },
  ];

  return (
    <div style={{ 
      width: 270, 
      maxWidth: "86vw",
      height: "100%", 
      margin: 0,
      background: isLight ? GOBPE_COLORS.gray[100] : GOBPE_COLORS.neutral[800],
      backdropFilter: "blur(28px) saturate(180%)",
      WebkitBackdropFilter: "blur(28px) saturate(180%)",
      borderRight: isLight ? `1px solid ${GOBPE_COLORS.neutral[300]}` : "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: onClose ? "0 20px 20px 0" : "0",
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between",
      flexShrink: 0, 
      overflow: "hidden",
      boxShadow: onClose ? (isLight ? "16px 0 48px rgba(0, 0, 0, 0.08)" : "16px 0 48px rgba(0, 0, 0, 0.85)") : "none",
      padding: "16px 12px 12px",
      boxSizing: "border-box",
      fontFamily: "'Calibri', 'Carlito', 'Candara', 'Segoe UI', -apple-system, sans-serif"
    }}>
      {/* ── Zona Superior y Navegación Principal ── */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1, overflow: "hidden" }}>
        
        {/* Top Header con Nombre y Cerrar */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          padding: "2px 6px 12px",
          flexShrink: 0 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ 
              fontSize: 15, 
              fontWeight: 800, 
              color: isLight ? GOBPE_COLORS.gray[800] : "#FFFFFF", 
              letterSpacing: "-0.01em" 
            }}>
              {headerName}
            </span>
            {isUserPremium && (
              <span style={{ 
                fontSize: 10, 
                fontWeight: 800, 
                color: "#FFFFFF", 
                background: GOBPE_COLORS.red[700], 
                padding: "1px 6px", 
                borderRadius: 999 
              }}>
                PLUS
              </span>
            )}
          </div>

          {onClose && (
            <motion.button 
              whileHover={{ scale: 1.08, background: isLight ? GOBPE_COLORS.neutral[200] : "rgba(255, 255, 255, 0.10)" }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              title="Cerrar barra lateral"
              style={{ 
                border: "none", 
                background: "transparent", 
                color: isLight ? GOBPE_COLORS.neutral[600] : GOBPE_COLORS.neutral[400], 
                cursor: "pointer", 
                width: 28, 
                height: 28, 
                borderRadius: "50%",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              <DismissRegular fontSize={14} />
            </motion.button>
          )}
        </div>

        {/* Botón Destacado: "Consultar a LOTA AI" con Gob.pe Blue */}
        <div style={{ paddingBottom: 6, flexShrink: 0 }}>
          <motion.button
            whileHover={{ scale: 1.02, background: GOBPE_COLORS.blue[800] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNav("frutilota")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 12px",
              borderRadius: 12,
              border: "none",
              background: GOBPE_COLORS.blue[700],
              color: "#FFFFFF",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 3px 10px ${GOBPE_COLORS.blue[700]}40`,
              transition: "all 0.15s ease"
            }}
          >
            <span>Consultar a LOTA AI</span>
            <SparkleRegular fontSize={16} color="#FFFFFF" />
          </motion.button>
        </div>

        {/* Lista de Navegación con Iconos a la Derecha */}
        <div className="at-scroll-elastic" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3, paddingRight: 2 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = page === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ background: isLight ? GOBPE_COLORS.blue[200] : "rgba(0, 86, 172, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8.5px 12px",
                  borderRadius: 10,
                  border: "none",
                  borderLeft: isActive ? `3.5px solid ${GOBPE_COLORS.blue[700]}` : "3.5px solid transparent",
                  background: isActive 
                    ? (isLight ? GOBPE_COLORS.blue[350] : "rgba(0, 86, 172, 0.22)") 
                    : "transparent",
                  color: isActive 
                    ? (isLight ? GOBPE_COLORS.blue[800] : "#FFFFFF") 
                    : (isLight ? GOBPE_COLORS.gray[800] : GOBPE_COLORS.neutral[300]),
                  fontSize: 13.5,
                  fontWeight: isActive ? 750 : 550,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span style={{ 
                      background: GOBPE_COLORS.red[700], 
                      color: "#FFFFFF", 
                      fontSize: 10, 
                      fontWeight: 800, 
                      padding: "1px 6px", 
                      borderRadius: 999 
                    }}>
                      {item.count}
                    </span>
                  )}
                </div>
                <Icon fontSize={16} color={isActive ? GOBPE_COLORS.blue[700] : (isLight ? GOBPE_COLORS.neutral[600] : GOBPE_COLORS.neutral[400])} />
              </motion.button>
            );
          })}
        </div>

      </div>

      {/* ── Zona Inferior ── */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 6, 
        paddingTop: 10, 
        borderTop: isLight ? `1px solid ${GOBPE_COLORS.neutral[300]}` : "1px solid rgba(255, 255, 255, 0.08)",
        flexShrink: 0 
      }}>
        
        {/* Alternar Modo Claro / Oscuro */}
        {toggleTheme && (
          <motion.button
            whileHover={{ background: isLight ? GOBPE_COLORS.neutral[100] : "rgba(255, 255, 255, 0.06)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              haptic.selection();
              toggleTheme();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7.5px 10px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: isLight ? GOBPE_COLORS.neutral[600] : GOBPE_COLORS.neutral[400],
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <span>{theme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
            <AnimatedThemeIcon isDark={theme === "dark"} size={16} />
          </motion.button>
        )}

        {/* Acceso Admin */}
        {onAdmin && (
          <motion.button
            whileHover={{ background: GOBPE_COLORS.red[200] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onAdmin();
              onClose?.();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7.5px 10px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: GOBPE_COLORS.red[700],
              fontSize: 13,
              fontWeight: 650,
              cursor: "pointer"
            }}
          >
            <span>Panel Admin</span>
            <ShieldRegular fontSize={15} color={GOBPE_COLORS.red[700]} />
          </motion.button>
        )}

        {/* Iniciar / Cerrar Sesión */}
        {!user && onLogin ? (
          <motion.button
            whileHover={{ scale: 1.02, background: GOBPE_COLORS.blue[800] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onLogin();
              onClose?.();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 12px",
              borderRadius: 10,
              background: GOBPE_COLORS.blue[700],
              border: "none",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 2px 8px ${GOBPE_COLORS.blue[700]}35`
            }}
          >
            <span>Iniciar sesión</span>
          </motion.button>
        ) : onLogout && user ? (
          <motion.button
            whileHover={{ background: isLight ? GOBPE_COLORS.neutral[100] : "rgba(255, 255, 255, 0.06)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onLogout();
              onClose?.();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7.5px 10px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: isLight ? GOBPE_COLORS.neutral[600] : GOBPE_COLORS.neutral[400],
              fontSize: 13,
              fontWeight: 550,
              cursor: "pointer"
            }}
          >
            <span>Cerrar sesión</span>
            <SignOutRegular fontSize={15} />
          </motion.button>
        ) : null}

        {/* Tarjeta de Estado Gob.pe */}
        <div style={{
          padding: "9px 11px",
          borderRadius: 12,
          background: isLight ? GOBPE_COLORS.neutral[100] : "rgba(255, 255, 255, 0.03)",
          border: isLight ? `1px solid ${GOBPE_COLORS.neutral[300]}` : "1px solid rgba(255, 255, 255, 0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 12, fontWeight: 750, color: isLight ? GOBPE_COLORS.gray[800] : "#FFFFFF" }}>
              {isUserPremium ? "Plan PLUS Activo" : "Portal de Trámites"}
            </span>
            <span style={{ fontSize: 10.5, color: isLight ? GOBPE_COLORS.neutral[600] : GOBPE_COLORS.neutral[400], fontWeight: 500 }}>
              {isUserPremium ? "Consultas ilimitadas" : "43+ trámites verificados"}
            </span>
          </div>

          <div style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: GOBPE_COLORS.green[700],
            boxShadow: `0 0 6px ${GOBPE_COLORS.green[700]}`
          }} />
        </div>
      </div>
    </div>
  );
}
