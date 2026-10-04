import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  ShieldCheckmarkRegular, 
  HistoryRegular, 
  PersonRegular,
  StarRegular,
  BotRegular,
  ClockRegular,
  SignOutRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  EyeRegular,
  GridRegular,
  PeopleRegular,
  SettingsRegular,
  CheckmarkRegular,
  OpenRegular,
  AppsRegular,
  LockClosedRegular,
  ArrowResetRegular
} from '@fluentui/react-icons';
import { toast } from "sonner";
import { ActivityItem, Page } from "../types";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { AnimatedThemeIcon } from "../components/AnimatedThemeToggle";

interface PerfilPageProps {
  favCount: number;
  user: any;
  frutiCount: number;
  activityList?: ActivityItem[];
  isAdmin?: boolean;
  onAdmin?: () => void;
  onNavigate?: (page: any, query?: string) => void;
  onLogin?: () => void;
  onOpenPaywall?: () => void;
  onLogout?: () => void;
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

export default function PerfilPage({ 
  favCount = 2, 
  user, 
  frutiCount = 30, 
  activityList = [],
  isAdmin,
  onAdmin,
  onNavigate,
  onLogin,
  onOpenPaywall,
  onLogout,
  theme = "light",
  toggleTheme
}: PerfilPageProps) {
  const isLight = theme === "light";
  const emailLower = (user?.email || "").toLowerCase();
  const isPlus = user?.isPremium === true || emailLower === "plaeis260@gmail.com";
  const isUserAdmin = isAdmin || emailLower === "plaeis260@gmail.com";
  const displayName = user?.displayName || (user?.email ? user.email.split("@")[0] : "Usuario");
  const displayEmail = user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  // Modo de visualización dual para administradores ("admin" | "client")
  const [adminViewMode, setAdminViewMode] = useState<"admin" | "client">("admin");

  // Historial dinámico real de LOTA AI
  const userChatHistory = useMemo(() => {
    try {
      const raw = localStorage.getItem('lota_chat_history');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((m: any) => m.role === 'user' && m.content)
        .map((m: any) => ({
          title: m.content,
          sub: "Consulta LOTA AI",
          time: "Reciente"
        }));
    } catch {
      return [];
    }
  }, []);

  if (!user) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "40px 24px", textAlign: "center", background: isLight ? "#F7FBFF" : "#101928", border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42", borderRadius: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: isLight ? "#EEF2FF" : "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: isLight ? "#4338CA" : "#818CF8" }}>
          <PersonRegular fontSize={28} />
        </div>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 24, color: isLight ? "#0B1E38" : "#EEF2F9", margin: "0 0 8px" }}>
          Inicia sesión para ver tu perfil
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 24px", lineHeight: 1.5 }}>
          Accede a tus trámites guardados, historial de consultas inteligentes y sincronización en la nube.
        </p>
        <button
          onClick={() => {
            haptic.medium();
            sound.playClick();
            onLogin?.();
          }}
          style={{
            padding: "12px 28px",
            borderRadius: 12,
            background: "#2563EB",
            color: "#fff",
            border: "none",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)"
          }}
        >
          <SparkleRegular fontSize={16} />
          <span>Acceder con Google</span>
        </button>
      </div>
    );
  }

  const effectiveFrutiCount = userChatHistory.length > 0 ? userChatHistory.length : frutiCount;

  // Estadísticas para la vista de cliente
  const clientStats = [
    { val: String(favCount || 0), label: "Trámites guardados", sub: "Acceso prioritario activo" },
    { val: String(effectiveFrutiCount || 0), label: "Consultas inteligentes", sub: "Respondidas por LOTA AI" },
    { val: (Math.max((effectiveFrutiCount || 0) * 0.4, 0)).toFixed(0) + " h", label: "Tiempo ahorrado", sub: "Colas evitadas estimadas" },
  ];

  // Estadísticas globales para la vista de administrador
  const adminStats = [
    { val: "10", label: "Categorías Cívicas", sub: "Estructura hermética activa" },
    { val: "36", label: "Entidades Oficiales", sub: "RENIEC, SUNAT, MIGRACIONES..." },
    { val: "100%", label: "Sincronización Nube", sub: "Firebase Firestore v12 Online" },
  ];

  const isCurrentAdminMode = isUserAdmin && adminViewMode === "admin";

  return (
    <div style={{ width: "100%", maxWidth: 980, margin: "0 auto", padding: "clamp(20px, 4vw, 32px) 16px 80px", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── Header Principal de Usuario ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        
        {/* Identidad y Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0, flex: "1 1 auto" }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: isCurrentAdminMode 
              ? "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)"
              : "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 750,
            fontSize: 22,
            color: "#fff",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
            boxShadow: isCurrentAdminMode ? "0 4px 16px rgba(30, 64, 175, 0.28)" : "0 4px 16px rgba(37, 99, 235, 0.25)"
          }}>
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={displayName} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            ) : null}
            <span style={{ display: user?.photoURL ? "none" : "block" }}>{initial}</span>
            <span style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#10B981",
              border: isLight ? "2px solid #EDF3FA" : "2px solid #0D1521",
              zIndex: 2
            }} />
          </div>

          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(20px, 3.5vw, 26px)",
              letterSpacing: "-0.03em",
              color: isLight ? "#0B1E38" : "#EEF2F9",
              margin: "0 0 4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {displayName}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", wordBreak: "break-all" }}>
                {displayEmail}
              </span>
              
              {/* Badge de Rol / Estado */}
              {isUserAdmin ? (
                isCurrentAdminMode ? (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 750,
                    color: isLight ? "#1E40AF" : "#93C5FD",
                    background: isLight ? "#EFF6FF" : "rgba(30, 64, 175, 0.22)",
                    padding: "3px 10px",
                    borderRadius: 100,
                    border: isLight ? "1px solid #BFDBFE" : "1px solid rgba(59, 130, 246, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}>
                    <ShieldCheckmarkRegular fontSize={13} />
                    <span>ADMINISTRADOR OFICIAL</span>
                  </span>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 750,
                    color: isLight ? "#047857" : "#6EE7B7",
                    background: isLight ? "#ECFDF5" : "rgba(4, 120, 87, 0.2)",
                    padding: "3px 10px",
                    borderRadius: 100,
                    border: isLight ? "1px solid #A7F3D0" : "1px solid rgba(16, 185, 129, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}>
                    <SparkleRegular fontSize={13} />
                    <span>PLAN PLUS (ILIMITADO)</span>
                  </span>
                )
              ) : isPlus ? (
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 750,
                  color: isLight ? "#047857" : "#6EE7B7",
                  background: isLight ? "#ECFDF5" : "rgba(4, 120, 87, 0.2)",
                  padding: "3px 10px",
                  borderRadius: 100,
                  border: isLight ? "1px solid #A7F3D0" : "1px solid rgba(16, 185, 129, 0.35)"
                }}>
                  PLAN PLUS
                </span>
              ) : (
                <button
                  onClick={() => onOpenPaywall?.()}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 750,
                    color: "#0284C7",
                    background: isLight ? "#F0F9FF" : "rgba(2, 132, 199, 0.16)",
                    padding: "3px 10px",
                    borderRadius: 100,
                    border: isLight ? "1px solid #BAE6FD" : "1px solid rgba(14, 165, 233, 0.3)",
                    cursor: "pointer"
                  }}
                >
                  OBTENER PLUS
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Acciones de Cabecera: Tema + Panel Admin Directo + Cerrar Sesión */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Botón de Cambio de Tema (Oscuro / Claro) */}
          {toggleTheme && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                toggleTheme();
                toast.success(isLight ? "Modo Oscuro activado" : "Modo Claro activado");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 10,
                background: isLight ? "#FFFFFF" : "#162032",
                color: isLight ? "#0B1E38" : "#EEF2F9",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #20354E",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 650,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: isLight ? "0 2px 6px rgba(11, 30, 56, 0.04)" : "0 2px 6px rgba(0, 0, 0, 0.25)",
                transition: "all 0.15s ease"
              }}
              title={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
              aria-label={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
            >
              <AnimatedThemeIcon isDark={!isLight} size={16} />
              <span>{isLight ? "Modo Oscuro" : "Modo Claro"}</span>
            </motion.button>
          )}

          {/* Botón Ejecutivo para ir al Dashboard de Admin */}
          {isUserAdmin && onAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                haptic.medium();
                sound.playClick();
                onAdmin();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 10,
                background: isLight ? "#0B1E38" : "#1E293B",
                color: "#FFFFFF",
                border: isLight ? "1px solid #1E3A8A" : "1px solid #334155",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: isLight ? "0 2px 8px rgba(11, 30, 56, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.35)",
                transition: "all 0.15s ease"
              }}
              title="Abrir Panel de Administración del Sistema"
            >
              <ShieldCheckmarkRegular fontSize={16} color="#38BDF8" />
              <span>Panel Admin</span>
            </motion.button>
          )}

          {/* Cerrar Sesión */}
          {onLogout && (
            <button
              onClick={() => {
                haptic.medium();
                sound.playClick();
                onLogout();
                toast.success("Has cerrado sesión exitosamente.");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 10,
                background: isLight ? "#FFFFFF" : "#162032",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #20354E",
                color: isLight ? "#5A7898" : "#94A3B8",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 650,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              title="Cerrar sesión en este navegador"
              aria-label="Cerrar sesión"
            >
              <SignOutRegular fontSize={15} />
              <span>Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Segmented Switcher Dual: Vista Administrador vs Vista Cliente ── */}
      {isUserAdmin && (
        <div style={{
          background: isLight ? "#FFFFFF" : "#101928",
          border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
          borderRadius: 14,
          padding: "10px 14px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
          boxShadow: isLight ? "0 2px 8px rgba(11, 30, 56, 0.03)" : "0 4px 14px rgba(0, 0, 0, 0.25)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: isLight ? "#EFF6FF" : "rgba(37, 99, 235, 0.15)",
              color: isLight ? "#2563EB" : "#60A5FA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <EyeRegular fontSize={19} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 13.5, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                Modo de Visualización del Perfil
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isLight ? "#5A7898" : "#94A3B8" }}>
                {adminViewMode === "admin" 
                  ? "Estás en la consola de administración con accesos rápidos y métricas." 
                  : "Previsualizando la interfaz y trámites exactamente como los ve un usuario cliente."}
              </div>
            </div>
          </div>

          {/* Segmented Switcher Tabs */}
          <div style={{
            display: "flex",
            background: isLight ? "#EDF3FA" : "#162032",
            padding: 3,
            borderRadius: 10,
            border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42",
            gap: 4
          }}>
            <button
              type="button"
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                setAdminViewMode("admin");
                toast.info("Modo Administrador activado");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: adminViewMode === "admin" 
                  ? (isLight ? "#FFFFFF" : "#1E293B") 
                  : "transparent",
                color: adminViewMode === "admin"
                  ? (isLight ? "#0B1E38" : "#FFFFFF")
                  : (isLight ? "#5A7898" : "#94A3B8"),
                fontFamily: "'Inter', sans-serif",
                fontWeight: adminViewMode === "admin" ? 750 : 600,
                fontSize: 12.5,
                cursor: "pointer",
                boxShadow: adminViewMode === "admin"
                  ? (isLight ? "0 2px 6px rgba(0,0,0,0.08)" : "0 2px 6px rgba(0,0,0,0.4)")
                  : "none",
                transition: "all 0.15s ease"
              }}
            >
              <ShieldCheckmarkRegular fontSize={15} color={adminViewMode === "admin" ? (isLight ? "#2563EB" : "#38BDF8") : "currentColor"} />
              <span>Ver como Administrador</span>
            </button>

            <button
              type="button"
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                setAdminViewMode("client");
                toast.info("Previsualizando como Cliente");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: adminViewMode === "client" 
                  ? (isLight ? "#FFFFFF" : "#1E293B") 
                  : "transparent",
                color: adminViewMode === "client"
                  ? (isLight ? "#0B1E38" : "#FFFFFF")
                  : (isLight ? "#5A7898" : "#94A3B8"),
                fontFamily: "'Inter', sans-serif",
                fontWeight: adminViewMode === "client" ? 750 : 600,
                fontSize: 12.5,
                cursor: "pointer",
                boxShadow: adminViewMode === "client"
                  ? (isLight ? "0 2px 6px rgba(0,0,0,0.08)" : "0 2px 6px rgba(0,0,0,0.4)")
                  : "none",
                transition: "all 0.15s ease"
              }}
            >
              <PersonRegular fontSize={15} color={adminViewMode === "client" ? "#10B981" : "currentColor"} />
              <span>Ver como Cliente</span>
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── CASO A: VISTA DE ADMINISTRADOR ──                                */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {isCurrentAdminMode ? (
        <motion.div
          key="admin-view"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Banner Ejecutivo de la Consola de Administración (Sin rojos estridentes) */}
          <div style={{
            padding: "22px 24px",
            borderRadius: 16,
            background: isLight 
              ? "linear-gradient(135deg, #0B1E38 0%, #172E54 100%)" 
              : "linear-gradient(135deg, #0D1521 0%, #16253B 100%)",
            border: isLight ? "1px solid #1E3A8A" : "1px solid #233857",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            boxShadow: isLight ? "0 8px 24px -4px rgba(11, 30, 56, 0.2)" : "0 8px 24px -4px rgba(0, 0, 0, 0.5)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                color: "#38BDF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <ShieldCheckmarkRegular fontSize={26} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 17, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                    Consola de Administración del Sistema
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 750, padding: "2px 7px", borderRadius: 100, background: "rgba(56, 189, 248, 0.2)", color: "#BAE6FD", border: "1px solid rgba(56, 189, 248, 0.4)" }}>
                    ROOT PRIVILEGES
                  </span>
                </div>
                <p style={{ margin: "4px 0 0", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#93C5FD", lineHeight: 1.4 }}>
                  Control centralizado para gestionar trámites gob.pe, 10 categorías cívicas, compradores y métricas globales.
                </p>
              </div>
            </div>

            {onAdmin && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  haptic.medium();
                  sound.playClick();
                  onAdmin();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                  transition: "all 0.15s ease"
                }}
              >
                <span>Abrir Dashboard Completo</span>
                <ArrowRightRegular fontSize={15} />
              </motion.button>
            )}
          </div>

          {/* Módulos de Gestión Rápida de Administrador (4 Cards) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14
          }}>
            {/* Módulo 1: Catálogo & Trámites */}
            <div 
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                onAdmin?.();
              }}
              style={{
                background: isLight ? "#FFFFFF" : "#101928",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                borderRadius: 14,
                padding: "18px 16px",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
              }}
              className="civic-entity-box"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: isLight ? "#EFF6FF" : "rgba(37, 99, 235, 0.16)", color: isLight ? "#1E40AF" : "#60A5FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <GridRegular fontSize={17} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 14, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                  Catálogo & Trámites
                </span>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8", lineHeight: 1.4 }}>
                Gestión de 36 entidades oficiales y 10 categorías cívicas herméticas.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: isLight ? "#2563EB" : "#38BDF8" }}>
                <span>Administrar</span>
                <ArrowRightRegular fontSize={13} />
              </div>
            </div>

            {/* Módulo 2: Compradores & Clientes */}
            <div 
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                onAdmin?.();
              }}
              style={{
                background: isLight ? "#FFFFFF" : "#101928",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                borderRadius: 14,
                padding: "18px 16px",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
              }}
              className="civic-entity-box"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: isLight ? "#ECFDF5" : "rgba(16, 185, 129, 0.16)", color: isLight ? "#047857" : "#34D399", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PeopleRegular fontSize={17} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 14, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                  Usuarios & Clientes
                </span>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8", lineHeight: 1.4 }}>
                Control de activaciones de Plan PLUS y pagos por Yape/Plin.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: isLight ? "#047857" : "#34D399" }}>
                <span>Ver Clientes</span>
                <ArrowRightRegular fontSize={13} />
              </div>
            </div>

            {/* Módulo 3: Motor LOTA AI */}
            <div 
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                onNavigate?.("frutilota");
              }}
              style={{
                background: isLight ? "#FFFFFF" : "#101928",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                borderRadius: 14,
                padding: "18px 16px",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
              }}
              className="civic-entity-box"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: isLight ? "#FAF5FF" : "rgba(139, 92, 246, 0.16)", color: isLight ? "#7C3AED" : "#A78BFA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BotRegular fontSize={17} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 14, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                  Motor LOTA AI
                </span>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8", lineHeight: 1.4 }}>
                Asistente inteligente con prompts oficiales del Estado peruano.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: isLight ? "#7C3AED" : "#A78BFA" }}>
                <span>Probar Chatbot</span>
                <ArrowRightRegular fontSize={13} />
              </div>
            </div>

            {/* Módulo 4: Preferencias de Sistema */}
            <div 
              onClick={() => {
                haptic.selection();
                sound.playHoverKey();
                onNavigate?.("ajustes");
              }}
              style={{
                background: isLight ? "#FFFFFF" : "#101928",
                border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                borderRadius: 14,
                padding: "18px 16px",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
              }}
              className="civic-entity-box"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: isLight ? "#F1F5F9" : "rgba(71, 85, 105, 0.16)", color: isLight ? "#475569" : "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SettingsRegular fontSize={17} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 14, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                  Ajustes Globales
                </span>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8", lineHeight: 1.4 }}>
                Tema visual, efectos de sonido acústicos y caché del sistema.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: isLight ? "#475569" : "#94A3B8" }}>
                <span>Configurar</span>
                <ArrowRightRegular fontSize={13} />
              </div>
            </div>
          </div>

          {/* Estadísticas Globales del Sistema (3 Tarjetas) */}
          <div className="stats-row">
            {adminStats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: isLight ? "#FFFFFF" : "#101928",
                  border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                  borderRadius: 16,
                  padding: "18px 20px",
                  boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
                }}
              >
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 36px)",
                  color: isLight ? "#0B1E38" : "#EEF2F9",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  marginBottom: 6
                }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13.5, color: isLight ? "#0B1E38" : "#EEF2F9", marginBottom: 2 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isLight ? "#5A7898" : "#94A3B8" }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Cuadrícula de 2 Columnas: Seguridad Admin + Historial */}
          <div className="perfil-main">
            {/* Columna Izquierda: Parámetros del Administrador */}
            <div style={{
              background: isLight ? "#FFFFFF" : "#101928",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 16,
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)",
              boxSizing: "border-box"
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 750,
                  fontSize: 16.5,
                  letterSpacing: "-0.03em",
                  color: isLight ? "#0B1E38" : "#EEF2F9",
                  margin: "0 0 4px"
                }}>
                  Credenciales y Seguridad
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: 0 }}>
                  Información de acceso y permisos de administración
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: isLight ? "#F7FBFF" : "#162032", borderRadius: 10, border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>Nivel de Autorización</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: isLight ? "#1E40AF" : "#60A5FA" }}>
                    Super Administrador
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: isLight ? "#F7FBFF" : "#162032", borderRadius: 10, border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>Base de Datos</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#10B981", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                    Sincronizada
                  </span>
                </div>

                {toggleTheme && (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "10px 12px", 
                    background: isLight ? "#F7FBFF" : "#162032", 
                    borderRadius: 10, 
                    border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <AnimatedThemeIcon isDark={!isLight} size={17} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>
                        Apariencia
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        haptic.selection();
                        sound.playHoverKey();
                        toggleTheme();
                        toast.success(isLight ? "Modo Oscuro activado" : "Modo Claro activado");
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: isLight ? "#EDF3FA" : "#1C2D42",
                        border: isLight ? "1px solid #C9DDEF" : "1px solid #2A405A",
                        color: isLight ? "#0B1E38" : "#EEF2F9",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      <span>{isLight ? "Modo Claro" : "Modo Oscuro"}</span>
                      <span style={{ fontSize: 11, color: isLight ? "#2563EB" : "#38BDF8", fontWeight: 800 }}>Cambiar</span>
                    </button>
                  </div>
                )}
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                background: isLight ? "#EDF3FA" : "#162032",
                borderRadius: 10,
                fontSize: 12,
                color: isLight ? "#5A7898" : "#94A3B8",
                fontFamily: "'Inter', sans-serif",
                marginTop: "auto"
              }}>
                <LockClosedRegular fontSize={15} color="#10B981" />
                <span>Sesión encriptada con autenticación segura de Firebase.</span>
              </div>
            </div>

            {/* Columna Derecha: Consultas Recientes de LOTA AI */}
            <div style={{
              background: isLight ? "#FFFFFF" : "#101928",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 16,
              padding: "22px 20px",
              boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <HistoryRegular fontSize={18} color="#2563EB" />
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 16.5, letterSpacing: "-0.03em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: 0 }}>
                    Consultas del Asistente LOTA AI
                  </h3>
                </div>
                <span className="perfil-history-badge">
                  {userChatHistory.length > 0 ? `${userChatHistory.length} registradas` : "0 registradas"}
                </span>
              </div>

              {userChatHistory.length > 0 ? (
                <div className="perfil-history-list">
                  {userChatHistory.slice(0, 6).map((c: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        haptic.selection();
                        sound.playHoverKey();
                        onNavigate?.("frutilota", c.title);
                      }}
                      className="perfil-history-item"
                      role="button"
                      tabIndex={0}
                    >
                      <div className="perfil-history-icon-box">
                        <BotRegular fontSize={17} />
                      </div>
                      <div className="perfil-history-text">
                        <span className="perfil-history-title">
                          {c.title}
                        </span>
                        <span className="perfil-history-sub">
                          Consulta oficial con LOTA AI
                        </span>
                      </div>
                      <div className="perfil-history-right">
                        <span className="perfil-history-time-badge">
                          <ClockRegular fontSize={11} />
                          <span>{c.time}</span>
                        </span>
                        <span className="perfil-history-arrow">
                          <ArrowRightRegular fontSize={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isLight ? "#EFF6FF" : "#162032",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB"
                  }}>
                    <ClockRegular fontSize={22} />
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                    Sin consultas previas
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 12px", maxWidth: 320, lineHeight: 1.5 }}>
                    Prueba el motor de asistencia ciudadana para consultar cualquier requisito o trámite.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      haptic.medium();
                      sound.playClick();
                      onNavigate?.("frutilota");
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "#2563EB",
                      color: "#FFFFFF",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer"
                    }}
                  >
                    <span>Abrir LOTA AI</span>
                    <ArrowRightRegular fontSize={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        /* ═════════════════════════════════════════════════════════════════════ */
        /* ── CASO B: VISTA DE CLIENTE (O PREVISUALIZACIÓN) ──                  */
        /* ═════════════════════════════════════════════════════════════════════ */
        <motion.div
          key="client-view"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Banner de Previsualización Activa (Solo si es Administrador en Modo Cliente) */}
          {isUserAdmin && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: isLight ? "#EFF6FF" : "rgba(30, 64, 175, 0.18)",
              border: isLight ? "1.5px solid #BFDBFE" : "1.5px solid rgba(59, 130, 246, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <PersonRegular fontSize={18} color="#2563EB" />
                <span style={{ fontSize: 13, color: isLight ? "#1E40AF" : "#BFDBFE", fontWeight: 600 }}>
                  Estás previsualizando la vista de perfil como usuario cliente con Plan PLUS activo.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  haptic.selection();
                  sound.playHoverKey();
                  setAdminViewMode("admin");
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Volver a Modo Admin
              </button>
            </div>
          )}

          {/* Estadísticas de Cliente (3 Tarjetas) */}
          <div className="stats-row">
            {clientStats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: isLight ? "#FFFFFF" : "#101928",
                  border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
                  borderRadius: 16,
                  padding: "18px 20px",
                  boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)"
                }}
              >
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 36px)",
                  color: isLight ? "#0B1E38" : "#EEF2F9",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  marginBottom: 6
                }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13.5, color: isLight ? "#0B1E38" : "#EEF2F9", marginBottom: 2 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isLight ? "#5A7898" : "#94A3B8" }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Cuadrícula de Cliente: Tu Cuenta + Historial */}
          <div className="perfil-main">
            {/* Left: Tu Cuenta y Seguridad */}
            <div style={{
              background: isLight ? "#FFFFFF" : "#101928",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 16,
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)",
              boxSizing: "border-box"
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 750,
                  fontSize: 16.5,
                  letterSpacing: "-0.03em",
                  color: isLight ? "#0B1E38" : "#EEF2F9",
                  margin: "0 0 4px"
                }}>
                  Tu Cuenta y Seguridad
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: 0 }}>
                  Información de acceso, privacidad y sincronización
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: isLight ? "#F7FBFF" : "#162032", borderRadius: 10, border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>Tipo de cuenta</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: isPlus ? "#2563EB" : "#10B981" }}>
                    {isPlus ? "Plan PLUS (Ilimitado)" : "Plan Gratuito"}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: isLight ? "#F7FBFF" : "#162032", borderRadius: 10, border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>Sincronización en la nube</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#10B981", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                    Activa
                  </span>
                </div>

                {toggleTheme && (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "10px 12px", 
                    background: isLight ? "#F7FBFF" : "#162032", 
                    borderRadius: 10, 
                    border: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <AnimatedThemeIcon isDark={!isLight} size={17} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: isLight ? "#5A7898" : "#94A3B8" }}>
                        Apariencia del portal
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        haptic.selection();
                        sound.playHoverKey();
                        toggleTheme();
                        toast.success(isLight ? "Modo Oscuro activado" : "Modo Claro activado");
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: isLight ? "#EDF3FA" : "#1C2D42",
                        border: isLight ? "1px solid #C9DDEF" : "1px solid #2A405A",
                        color: isLight ? "#0B1E38" : "#EEF2F9",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      <span>{isLight ? "Modo Claro" : "Modo Oscuro"}</span>
                      <span style={{ fontSize: 11, color: isLight ? "#2563EB" : "#38BDF8", fontWeight: 800 }}>Cambiar</span>
                    </button>
                  </div>
                )}
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                background: isLight ? "#EDF3FA" : "#162032",
                borderRadius: 10,
                fontSize: 12,
                color: isLight ? "#5A7898" : "#94A3B8",
                fontFamily: "'Inter', sans-serif",
                marginTop: "auto"
              }}>
                <ShieldCheckmarkRegular fontSize={15} color="#10B981" />
                <span>Tus trámites y consultas se guardan de forma privada y segura.</span>
              </div>
            </div>

            {/* Right: Historial de Consultas de Cliente */}
            <div style={{
              background: isLight ? "#FFFFFF" : "#101928",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 16,
              padding: "22px 20px",
              boxShadow: "0 2px 8px rgba(11, 30, 56, 0.03)",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <HistoryRegular fontSize={18} color="#2563EB" />
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 16.5, letterSpacing: "-0.03em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: 0 }}>
                    Historial de consultas
                  </h3>
                </div>
                <span className="perfil-history-badge">
                  {userChatHistory.length > 0 ? `${userChatHistory.length} guardadas` : "0 consultas"}
                </span>
              </div>

              {userChatHistory.length > 0 ? (
                <div className="perfil-history-list">
                  {userChatHistory.slice(0, 6).map((c: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        haptic.selection();
                        sound.playHoverKey();
                        if (!user) {
                          onLogin?.();
                          return;
                        }
                        if (!isPlus) {
                          onOpenPaywall?.();
                          return;
                        }
                        onNavigate?.("frutilota", c.title);
                      }}
                      className="perfil-history-item"
                      role="button"
                      tabIndex={0}
                    >
                      <div className="perfil-history-icon-box">
                        <BotRegular fontSize={17} />
                      </div>
                      <div className="perfil-history-text">
                        <span className="perfil-history-title">
                          {c.title}
                        </span>
                        <span className="perfil-history-sub">
                          Consulta con LOTA AI
                        </span>
                      </div>
                      <div className="perfil-history-right">
                        <span className="perfil-history-time-badge">
                          <ClockRegular fontSize={11} />
                          <span>{c.time}</span>
                        </span>
                        <span className="perfil-history-arrow">
                          <ArrowRightRegular fontSize={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isLight ? "#EFF6FF" : "#162032",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB"
                  }}>
                    <ClockRegular fontSize={22} />
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                    Historial vacío
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 12px", maxWidth: 320, lineHeight: 1.5 }}>
                    Aún no tienes consultas registradas. Pregúntale a LOTA AI para resolver cualquier duda o trámite.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      haptic.medium();
                      sound.playClick();
                      if (!user) {
                        onLogin?.();
                        return;
                      }
                      if (!isPlus) {
                        onOpenPaywall?.();
                        return;
                      }
                      onNavigate?.("frutilota");
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "#2563EB",
                      color: "#FFFFFF",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer"
                    }}
                  >
                    <span>Consultar con LOTA AI</span>
                    <ArrowRightRegular fontSize={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
