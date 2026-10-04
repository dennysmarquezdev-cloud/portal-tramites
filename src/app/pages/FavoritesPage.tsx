import React from "react";
import { motion } from "framer-motion";
import { StarRegular, GridRegular, BookmarkRegular, ChevronRightRegular, DismissRegular } from '@fluentui/react-icons';
import { Tramite } from "../types";
import { haptic } from "../utils/haptics";

export default function FavoritesPage({ 
  onSelect, 
  favs = [], 
  onFav,
  onNavigate,
  theme = "light"
}: { 
  onSelect: (t: Tramite) => void; 
  favs: Tramite[]; 
  onFav: (id: string) => void;
  onNavigate?: (page: any) => void;
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light";

  if (favs.length === 0) {
    return (
      <div style={{
        height: "100%",
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        textAlign: "center"
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: isLight ? "#DCE9F8" : "#162848",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 20S4 14 4 8.5a4.5 4.5 0 019-1.5 4.5 4.5 0 019 1.5C22 14 12 20 12 20z" stroke={isLight ? "#2F6CB5" : "#60A5FA"} strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 750,
          fontSize: 28,
          letterSpacing: "-0.03em",
          color: isLight ? "#0B1E38" : "#EEF2F9",
          margin: "0 0 8px"
        }}>
          Sin trámites guardados
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14.5,
          color: isLight ? "#5A7898" : "#94A3B8",
          margin: "0 0 24px",
          maxWidth: 380,
          lineHeight: 1.5
        }}>
          Guarda tus trámites frecuentes con el ícono de favoritos para tener acceso directo y rápido en cualquier momento.
        </p>

        <button
          onClick={() => {
            haptic.medium();
            onNavigate?.("categories");
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 10,
            background: isLight ? "#F7FBFF" : "#101928",
            border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
            color: isLight ? "#0B1E38" : "#EEF2F9",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 650,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s ease"
          }}
        >
          <span>Explorar catálogo</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "36px 20px 80px" }}>
      
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 750,
            fontSize: "clamp(24px, 3.2vw, 32px)",
            color: isLight ? "#0B1E38" : "#EEF2F9",
            margin: "0 0 4px",
            letterSpacing: "-0.03em"
          }}>
            {favs.length} {favs.length === 1 ? "guardado" : "guardados"}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: isLight ? "#5A7898" : "#94A3B8", margin: 0 }}>
            Acceso prioritario a tus guías de trámite.
          </p>
        </div>

        <button
          onClick={() => {
            haptic.selection();
            onNavigate?.("categories");
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 10,
            background: isLight ? "#DCE9F8" : "#162848",
            border: "none",
            color: isLight ? "#2F6CB5" : "#60A5FA",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 650,
            cursor: "pointer"
          }}
        >
          + Agregar más trámites
        </button>
      </div>

      {/* ── List of Saved Procedures ── */}
      <div className="catalogo-list">
        {favs.map((t, i) => (
          <div
            key={t.id || i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 18px",
              borderBottom: i < favs.length - 1 ? (isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42") : "none",
              gap: 12
            }}
          >
            <div
              onClick={() => onSelect(t)}
              style={{ flex: 1, cursor: "pointer", minWidth: 0 }}
            >
              <div className="catalogo-item-top" style={{ marginBottom: 4 }}>
                <span className="catalogo-item-entidad">{t.entity || "OFICIAL"}</span>
              </div>
              <div className="catalogo-item-titulo">{t.title}</div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                haptic.light();
                onFav(t.id);
              }}
              title="Quitar de guardados"
              style={{
                background: "none",
                border: "none",
                color: isLight ? "#5A7898" : "#94A3B8",
                cursor: "pointer",
                padding: 6,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <DismissRegular fontSize={16} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
