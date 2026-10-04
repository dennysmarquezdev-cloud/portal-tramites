import React, { useState, useEffect } from "react";
import { Clock, Menu, Globe } from "lucide-react";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { AdminPage } from "../types";

const useStyles = makeStyles({
  topbar: {
    height: "64px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    gap: "16px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: 0,
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  breadCrumbRoot: {
    color: tokens.colorNeutralForeground3,
    fontWeight: 500,
    fontSize: "13px",
  },
  breadCrumbSeparator: {
    color: tokens.colorNeutralForeground4,
    fontSize: "13px",
  },
  breadCrumbActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 700,
    fontSize: "14.5px",
    letterSpacing: "-0.01em",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  systemStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    border: "1px solid rgba(16, 185, 129, 0.2)",
    color: "#059669",
    fontSize: "12px",
    fontWeight: 700,
    "@media (max-width: 768px)": {
      display: "none",
    }
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#10B981",
    boxShadow: "0 0 6px #10B981",
  },
  timeWidget: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: tokens.colorNeutralForeground2,
    fontSize: "12.5px",
    fontWeight: 600,
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "6px 12px",
    borderRadius: "10px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    "@media (max-width: 640px)": {
      display: "none",
    }
  },
  portalBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "10px",
    fontWeight: 650,
    fontSize: "13px",
  }
});

const PAGE_NAMES: Record<AdminPage, string> = {
  overview: "Resumen General",
  tramites: "Catálogo de Trámites",
  radar: "Radar del Scraper SUNAT",
  categorias: "Gestión de Categorías",
  compradores: "Usuarios & Suscriptores",
};

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface AdminTopBarProps {
  currentPage?: AdminPage;
  onMenuToggle: () => void;
  onExit?: () => void;
}

export function AdminTopBar({ currentPage = "overview", onMenuToggle, onExit }: AdminTopBarProps) {
  const styles = useStyles();
  const time = useCurrentTime();

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        <Button
          appearance="subtle"
          icon={<Menu size={20} />}
          onClick={onMenuToggle}
          className="mobile-only"
          aria-label="Abrir menú de navegación"
        />
        <div className={styles.breadcrumbs}>
          <span className={styles.breadCrumbRoot}>Admin</span>
          <span className={styles.breadCrumbSeparator}>/</span>
          <span className={styles.breadCrumbActive}>{PAGE_NAMES[currentPage] || "Panel"}</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Estado Operativo */}
        <div className={styles.systemStatus} title="Todos los servicios (Firestore, LOTA AI RAG, Scraper) operando correctamente">
          <span className={styles.statusDot} />
          <span>Servicios Operativos</span>
        </div>

        {/* Reloj en Vivo */}
        <div className={styles.timeWidget}>
          <Clock size={14} color="#64748B" />
          <span>{time}</span>
        </div>

        {/* Botón Volver al Portal Web */}
        {onExit && (
          <Button
            appearance="secondary"
            icon={<Globe size={15} color="#2563EB" />}
            onClick={onExit}
            className={styles.portalBtn}
            title="Volver a la vista del portal ciudadano"
          >
            <span>Ver Portal Web</span>
          </Button>
        )}
      </div>
    </header>
  );
}

