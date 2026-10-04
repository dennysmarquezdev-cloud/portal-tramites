import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  HeartRegular,
  GridRegular,
  PersonRegular,
  NavigationRegular,
  SignOutRegular,
  ShieldCheckmarkRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  ChevronDownRegular
} from '@fluentui/react-icons';
import { toast } from "sonner";
import { Page } from "../types";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { AnimatedThemeIcon } from "./AnimatedThemeToggle";

interface AppHeaderProps {
  page: Page;
  setPage: (p: Page) => void;
  faveCount?: number;
  user?: any;
  isAdmin?: boolean;
  onAdmin?: () => void;
  onLogin?: () => void;
  onOpenPaywall?: () => void;
  onOpenSidebar?: () => void;
  onLogout?: () => void;
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

export function AppHeader({
  page,
  setPage,
  faveCount = 0,
  user,
  isAdmin,
  onAdmin,
  onLogin,
  onOpenPaywall,
  onOpenSidebar,
  onLogout,
  theme = "light",
  toggleTheme
}: AppHeaderProps) {
  const isLight = theme === "light";
  const emailLower = (user?.email || "").toLowerCase();
  const isPlus = user?.isPremium === true || emailLower === "plaeis260@gmail.com";
  const isUserAdmin = isAdmin || emailLower === "plaeis260@gmail.com";
  const displayName = user?.displayName ? user.displayName.split(" ")[0] : (user?.email ? user.email.split("@")[0] : null);
  const fullDisplayName = user?.displayName || displayName || "Usuario";
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const navItems: Array<{ id: Page; label: string; badge?: number }> = [
    { id: "home", label: "Inicio" },
    { id: "categories", label: isPlus ? "Catálogo" : "Catálogo" },
    { id: "favorites", label: "Favoritos", badge: faveCount > 0 ? faveCount : undefined },
    { id: "perfil", label: "Mi Perfil" },
    { id: "help", label: "Ayuda" },
  ];

  const handleToggleThemeInMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.selection();
    sound.playHoverKey();
    if (toggleTheme) {
      toggleTheme();
      toast.success(isLight ? "Modo Oscuro activado" : "Modo Claro activado");
    }
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.medium();
    sound.playClick();
    setProfileMenuOpen(false);
    if (onLogout) {
      onLogout();
      toast.success("Has cerrado sesión exitosamente.");
    }
  };

  return (
    <header className="app-header">
      {/* ── Mobile Sidebar Toggle Button ── */}
      <button
        onClick={() => {
          haptic.medium();
          onOpenSidebar?.();
        }}
        className="sidebar-toggle-btn"
        title="Abrir menú"
        aria-label="Abrir menú"
      >
        <NavigationRegular fontSize={18} />
      </button>

      {/* ── Brand Wordmark ── */}
      <div
        onClick={() => {
          haptic.selection();
          setPage("home");
          window.location.hash = "";
        }}
        className="app-header-brand"
        title="Ir al inicio de ahorratiempo"
        role="button"
        tabIndex={0}
        aria-label="ahorratiempo - Ir al inicio"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            haptic.selection();
            setPage("home");
            window.location.hash = "";
          }
        }}
      >
        <span className="brand-wordmark-ahorra">ahorra</span>
        <span className="brand-wordmark-tiempo">tiempo</span>
        <span className="brand-wordmark-pe">.pe</span>
      </div>

      {/* ── Desktop Main Navigation ── */}
      <nav className="main-nav" aria-label="Navegación principal">
        {navItems.map((item) => {
          const isActive = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                haptic.selection();
                setPage(item.id);
              }}
              className={`nav-btn ${isActive ? "nav-btn--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* ── Right Side User / Admin / Login CTA ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }} ref={menuRef}>
        {/* Botón de Acceso Admin para Administradores */}
        {isUserAdmin && onAdmin && (
          <button
            onClick={() => {
              haptic.medium();
              onAdmin();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px 12px",
              borderRadius: 8,
              background: isLight ? "rgba(11, 30, 56, 0.05)" : "rgba(255, 255, 255, 0.08)",
              border: isLight ? "1px solid rgba(11, 30, 56, 0.12)" : "1px solid rgba(255, 255, 255, 0.15)",
              color: isLight ? "#1E293B" : "#F1F5F9",
              fontSize: 12.5,
              fontWeight: 650,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em",
              transition: "all 0.15s ease"
            }}
            title="Acceder al Panel de Administración"
          >
            Admin
          </button>
        )}

        {user ? (
          <>
            <div
              onClick={() => {
                sound.playHoverKey();
                haptic.selection();
                setProfileMenuOpen(prev => !prev);
              }}
              className={`avatar-btn ${profileMenuOpen ? "avatar-btn--active" : ""}`}
              title="Opciones de cuenta y perfil"
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={profileMenuOpen}
              aria-label={`Perfil de ${displayName || "usuario"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  haptic.selection();
                  setProfileMenuOpen(prev => !prev);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              {/* Avatar Circle con foto de Google si existe */}
              <div 
                className="avatar-circle"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  background: isPlus 
                    ? "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" 
                    : "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)"
                }}
              >
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={displayName || "Google Avatar"} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                ) : null}
                <span style={{ display: user?.photoURL ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                  {initial}
                </span>
              </div>

              <span className="avatar-name">{displayName}</span>

              {isPlus ? (
                <span className="avatar-plan">PLUS</span>
              ) : (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    haptic.medium();
                    onOpenPaywall?.();
                  }}
                  className="avatar-plan avatar-plan--free"
                  title="Haz clic para actualizar a Plus"
                >
                  GRATIS
                </span>
              )}

              <ChevronDownRegular 
                fontSize={13} 
                style={{ 
                  color: isLight ? "#64748B" : "#94A3B8",
                  transform: profileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }} 
              />
            </div>

            {/* ── Menú Desplegable de Perfil (Framer Motion) ── */}
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 260,
                    borderRadius: 14,
                    background: isLight ? "#FFFFFF" : "#0F172A",
                    border: isLight ? "1.5px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.14)",
                    boxShadow: isLight
                      ? "0 12px 36px rgba(11, 30, 56, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)"
                      : "0 16px 44px rgba(0, 0, 0, 0.75)",
                    padding: "8px",
                    zIndex: 1000,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {/* Cabecera del Usuario */}
                  <div 
                    style={{
                      padding: "10px 10px 12px",
                      borderRadius: 10,
                      background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                      border: isLight ? "1px solid #F1F5F9" : "1px solid rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6
                    }}
                  >
                    <div 
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: isPlus 
                          ? "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" 
                          : "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 750,
                        fontSize: 16
                      }}
                    >
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={displayName || "Google Avatar"} 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      ) : null}
                      <span style={{ display: user?.photoURL ? "none" : "block" }}>{initial}</span>
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ 
                          fontSize: 13.5, 
                          fontWeight: 750, 
                          color: isLight ? "#0F172A" : "#F8FAFC",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}>
                          {fullDisplayName}
                        </span>
                        {isPlus ? (
                          <span style={{
                            fontSize: 9,
                            fontWeight: 800,
                            color: "#7C3AED",
                            background: "#F5F3FF",
                            padding: "1px 5px",
                            borderRadius: 6,
                            letterSpacing: "0.03em"
                          }}>
                            PLUS
                          </span>
                        ) : (
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "#64748B",
                            background: isLight ? "#E2E8F0" : "rgba(255,255,255,0.1)",
                            padding: "1px 5px",
                            borderRadius: 6
                          }}>
                            GRATIS
                          </span>
                        )}
                      </div>
                      <span style={{ 
                        fontSize: 11.5, 
                        color: isLight ? "#64748B" : "#94A3B8",
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {user?.email || ""}
                      </span>
                    </div>
                  </div>

                  {/* Lista de Acciones: Solo Modo Oscuro/Claro y Cerrar Sesión */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Botón de Modo Claro / Modo Oscuro Integrado en la Lista */}
                    {toggleTheme && (
                      <button
                        type="button"
                        onClick={handleToggleThemeInMenu}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 9,
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "transparent",
                          border: "none",
                          color: isLight ? "#1E293B" : "#E2E8F0",
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                          transition: "background 0.15s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        title={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <AnimatedThemeIcon isDark={!isLight} size={16} />
                          <span>{isLight ? "Modo Oscuro" : "Modo Claro"}</span>
                        </div>
                        <span style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 6,
                          background: isLight ? "#E2E8F0" : "rgba(255,255,255,0.12)",
                          color: isLight ? "#475569" : "#CBD5E1"
                        }}>
                          {isLight ? "Oscuro" : "Claro"}
                        </span>
                      </button>
                    )}

                    {/* Separador */}
                    <div style={{ height: 1, background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.08)", margin: "4px 0" }} />

                    {/* Salir / Cerrar Sesión */}
                    <button
                      type="button"
                      onClick={handleLogoutClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: "transparent",
                        border: "none",
                        color: "#EF4444",
                        fontSize: 12.5,
                        fontWeight: 650,
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = isLight ? "#FEF2F2" : "rgba(239, 68, 68, 0.12)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <SignOutRegular fontSize={16} style={{ color: "#EF4444" }} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <button
            onClick={() => {
              haptic.medium();
              onLogin?.();
            }}
            className="app-header-login-btn"
            aria-label="Iniciar sesión"
          >
            <PersonRegular fontSize={15} />
            <span>Iniciar sesión</span>
          </button>
        )}
      </div>
    </header>
  );
}
