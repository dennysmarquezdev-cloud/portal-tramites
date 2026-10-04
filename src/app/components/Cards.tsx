import React, { useContext, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { 
  SettingsRegular, 
  StarRegular, 
  StarFilled, 
  BuildingRegular, 
  ChevronLeftRegular, 
  ChevronRightRegular,
  DocumentTextRegular
} from '@fluentui/react-icons';
import { Tramite } from '../types';
import { getCat } from '../App';
import { AdminCMSContext } from '../context';
import { getCategoryVisual } from '../data';
import { Card, Button } from '@fluentui/react-components';

export function TramiteCard({ 
  t, 
  onClick, 
  faved, 
  onFav, 
  theme 
}: { 
  t: Tramite; 
  onClick: () => void; 
  faved: boolean; 
  onFav: (e: React.MouseEvent) => void;
  theme?: "light" | "dark";
}) {
  const cat = getCat(t.categoryId);
  const visual = getCategoryVisual(t.categoryId || cat.id, cat.name);
  const catColor = visual.accentColor || cat.colorB || "#0284C7";
  const { isAdmin, onEditCms } = useContext(AdminCMSContext);
  const [hover, setHover] = useState(false);

  const isLight = theme === "light" || (!theme && !document.documentElement.classList.contains("dark"));

  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const quickProps = useRef<{
    rotX?: gsap.QuickToFunc;
    rotY?: gsap.QuickToFunc;
    elevY?: gsap.QuickToFunc;
    wmRot?: gsap.QuickToFunc;
    wmScale?: gsap.QuickToFunc;
  }>({});

  useEffect(() => {
    if (!cardRef.current) return;
    quickProps.current.rotX = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.35, ease: "power2.out" });
    quickProps.current.rotY = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.35, ease: "power2.out" });
    quickProps.current.elevY = gsap.quickTo(cardRef.current, "y", { duration: 0.35, ease: "power2.out" });

    if (watermarkRef.current) {
      quickProps.current.wmRot = gsap.quickTo(watermarkRef.current, "rotation", { duration: 0.5, ease: "power2.out" });
      quickProps.current.wmScale = gsap.quickTo(watermarkRef.current, "scale", { duration: 0.5, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    quickProps.current.rotY?.(xPct * 5);
    quickProps.current.rotX?.(-yPct * 5);
    quickProps.current.elevY?.(-3.5);

    quickProps.current.wmRot?.(-12 + xPct * 8);
    quickProps.current.wmScale?.(1.15);
  };

  const handleMouseLeave = () => {
    quickProps.current.rotX?.(0);
    quickProps.current.rotY?.(0);
    quickProps.current.elevY?.(0);
    quickProps.current.wmRot?.(-12);
    quickProps.current.wmScale?.(1);
    setHover(false);
  };

  // Evitar redundancia: sólo mostrar la entidad si es distinta a la categoría
  const isEntityRedundant = !t.entity || 
    t.entity.trim().toLowerCase() === cat.name.trim().toLowerCase() || 
    t.entity.trim().toLowerCase() === "trámites" || 
    t.entity.trim().toLowerCase() === "varios";

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        minWidth: 260,
        width: 260,
        minHeight: 145,
        position: "relative",
        cursor: "pointer",
        background: isLight ? "#FFFFFF" : "rgba(18, 20, 28, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.12)",
        borderTop: `4px solid ${catColor}`,
        borderRadius: 16,
        padding: "16px 16px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: hover 
          ? (isLight ? `0 14px 30px -4px rgba(0, 0, 0, 0.12), 0 0 16px ${catColor}20` : `0 14px 32px -6px rgba(0,0,0,0.7), 0 0 20px ${catColor}30`) 
          : (isLight ? "0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)" : "0 8px 24px rgba(0,0,0,0.4)"),
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease, background 0.2s ease",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        perspective: 1000,
        userSelect: "none",
        flexShrink: 0
      }}
    >
      {/* Marca de agua sutil de fondo (Efecto Documento con GSAP Parallax) */}
      <div 
        ref={watermarkRef}
        style={{ 
          position: "absolute", 
          right: -10, 
          bottom: -10, 
          opacity: hover ? (isLight ? 0.10 : 0.15) : (isLight ? 0.04 : 0.06), 
          color: catColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          willChange: "transform"
        }}
      >
        <DocumentTextRegular fontSize={96} />
      </div>

      {isAdmin && hover && (
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
          <Button size="small" appearance="secondary" icon={<SettingsRegular fontSize={12}/>} onClick={e => { e.stopPropagation(); onEditCms("tramite", t); }}>Editar</Button>
        </div>
      )}

      {/* Top bar: Category Icon + Category Name + Star Fav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${catColor}18`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${catColor}35`, flexShrink: 0 }}>
            <cat.Icon size={17} color={catColor} />
          </div>
          <span className="at-jb-mono" style={{ fontSize: 11, fontWeight: 750, color: isLight ? "#64748B" : "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {cat.name}
          </span>
        </div>

        <motion.button 
          whileTap={{ scale: 0.82 }}
          onClick={onFav}
          aria-label={faved ? "Quitar de favoritos" : "Guardar en favoritos"}
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            width: 36, 
            height: 36, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            borderRadius: "50%",
            margin: "-4px -4px -4px 0"
          }}
        >
          {faved ? <StarFilled fontSize={20} color="#F59E0B" /> : <StarRegular fontSize={20} color={isLight ? "#94A3B8" : "#64748B"} />}
        </motion.button>
      </div>

      {/* Middle: Title with high contrast */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750, color: isLight ? "#0F172A" : "#FFFFFF", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
          {t.title}
        </h4>
        
        {!isEntityRedundant && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <BuildingRegular fontSize={13} color={catColor} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: isLight ? "#475569" : "#CBD5E1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {t.entity}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tramite Card Large (Para Grid de Resultados y Categorías con GSAP) ─────────
export function TramiteCardLg({ 
  t, 
  onClick, 
  faved, 
  onFav, 
  className,
  theme
}: { 
  t: Tramite; 
  onClick: () => void; 
  faved: boolean; 
  onFav: (e: React.MouseEvent) => void; 
  className?: string;
  theme?: "light" | "dark";
}) {
  const cat = getCat(t.categoryId);
  const visual = getCategoryVisual(t.categoryId || cat.id, cat.name);
  const catColor = visual.accentColor || cat.colorB || "#0284C7";
  const { isAdmin, onEditCms } = useContext(AdminCMSContext);
  const [hover, setHover] = useState(false);

  const isLight = theme === "light" || (!theme && !document.documentElement.classList.contains("dark"));

  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const quickProps = useRef<{
    rotX?: gsap.QuickToFunc;
    rotY?: gsap.QuickToFunc;
    elevY?: gsap.QuickToFunc;
    wmRot?: gsap.QuickToFunc;
    wmScale?: gsap.QuickToFunc;
  }>({});

  useEffect(() => {
    if (!cardRef.current) return;
    quickProps.current.rotX = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.35, ease: "power2.out" });
    quickProps.current.rotY = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.35, ease: "power2.out" });
    quickProps.current.elevY = gsap.quickTo(cardRef.current, "y", { duration: 0.35, ease: "power2.out" });

    if (watermarkRef.current) {
      quickProps.current.wmRot = gsap.quickTo(watermarkRef.current, "rotation", { duration: 0.5, ease: "power2.out" });
      quickProps.current.wmScale = gsap.quickTo(watermarkRef.current, "scale", { duration: 0.5, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    quickProps.current.rotY?.(xPct * 4.5);
    quickProps.current.rotX?.(-yPct * 4.5);
    quickProps.current.elevY?.(-3.5);

    quickProps.current.wmRot?.(-12 + xPct * 8);
    quickProps.current.wmScale?.(1.15);
  };

  const handleMouseLeave = () => {
    quickProps.current.rotX?.(0);
    quickProps.current.rotY?.(0);
    quickProps.current.elevY?.(0);
    quickProps.current.wmRot?.(-12);
    quickProps.current.wmScale?.(1);
    setHover(false);
  };

  // Evitar redundancia: sólo mostrar la entidad si es distinta a la categoría
  const isEntityRedundant = !t.entity || 
    t.entity.trim().toLowerCase() === cat.name.trim().toLowerCase() || 
    t.entity.trim().toLowerCase() === "trámites" || 
    t.entity.trim().toLowerCase() === "varios";

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ 
        position: "relative",
        minHeight: 145,
        height: "100%",
        width: "100%",
        cursor: "pointer",
        background: className ? undefined : (isLight ? "#FFFFFF" : "rgba(18, 20, 28, 0.85)"),
        backdropFilter: className ? undefined : "blur(16px)",
        WebkitBackdropFilter: className ? undefined : "blur(16px)",
        border: className ? undefined : (isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.12)"),
        borderTop: `4px solid ${catColor}`,
        borderRadius: 16,
        padding: "16px 18px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: hover 
          ? (isLight ? `0 14px 30px -4px rgba(0, 0, 0, 0.12), 0 0 16px ${catColor}20` : `0 14px 32px -6px rgba(0,0,0,0.7), 0 0 20px ${catColor}30`) 
          : (isLight ? "0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)" : "0 8px 24px rgba(0,0,0,0.4)"),
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease, background 0.2s ease",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        perspective: 1000,
        userSelect: "none"
      }}
    >
      {/* Marca de agua sutil de fondo (Efecto Documento con GSAP Parallax) */}
      <div 
        ref={watermarkRef}
        style={{ 
          position: "absolute", 
          right: -10, 
          bottom: -10, 
          opacity: hover ? (isLight ? 0.10 : 0.15) : (isLight ? 0.04 : 0.06), 
          color: catColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          willChange: "transform"
        }}
      >
        <DocumentTextRegular fontSize={96} />
      </div>

      {isAdmin && hover && (
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
          <Button size="small" appearance="secondary" icon={<SettingsRegular fontSize={12}/>} onClick={e => { e.stopPropagation(); onEditCms("tramite", t); }}>Editar</Button>
        </div>
      )}

      {/* Top bar: Category Icon + Category Name + Star Fav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${catColor}18`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${catColor}35`, flexShrink: 0 }}>
            <cat.Icon size={17} color={catColor} />
          </div>
          <span className="at-jb-mono" style={{ fontSize: 11, fontWeight: 750, color: isLight ? "#64748B" : "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {cat.name}
          </span>
        </div>

        <motion.button 
          whileTap={{ scale: 0.82 }}
          onClick={onFav}
          aria-label={faved ? "Quitar de favoritos" : "Guardar en favoritos"}
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            width: 36, 
            height: 36, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            borderRadius: "50%",
            margin: "-4px -4px -4px 0"
          }}
        >
          {faved ? <StarFilled fontSize={20} color="#F59E0B" /> : <StarRegular fontSize={20} color={isLight ? "#94A3B8" : "#64748B"} />}
        </motion.button>
      </div>

      {/* Middle: Title with high contrast */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750, color: isLight ? "#0F172A" : "#FFFFFF", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
          {t.title}
        </h4>

        {!isEntityRedundant && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <BuildingRegular fontSize={13} color={catColor} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: isLight ? "#475569" : "#CBD5E1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {t.entity}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Quick Access Card ────────────────────────────────────────────────────────
export function QuickAccessCard({ 
  icon: Icon, 
  title, 
  color, 
  onClick,
  theme
}: { 
  icon: React.ElementType; 
  title: string; 
  color: string; 
  onClick: () => void;
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light" || (!theme && !document.documentElement.classList.contains("dark"));

  return (
    <motion.div
      whileHover={{ y: -2.5, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <div 
        onClick={onClick} 
        style={{ 
          minWidth: 120,
          width: 120,
          height: 86,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer",
          background: isLight ? "#FFFFFF" : "rgba(18, 20, 28, 0.85)",
          border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.10)",
          borderRadius: 14,
          boxShadow: isLight ? "0 2px 8px rgba(0,0,0,0.04)" : "0 4px 14px rgba(0,0,0,0.3)",
          transition: "all 0.15s ease"
        }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon fontSize={18} color={color} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 650, color: isLight ? "#0F172A" : "#FFFFFF", textAlign: "center", padding: "0 4px", lineHeight: 1.2 }}>
          {title}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Scroll Row Component ─────────────────────────────────────────────────────
export function ScrollRow({ 
  children, 
  title, 
  subtitle,
  theme
}: { 
  children: React.ReactNode; 
  title?: string; 
  subtitle?: string;
  theme?: "light" | "dark";
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "light" || (!theme && !document.documentElement.classList.contains("dark"));

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {(title || subtitle) && (
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            {title && <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: isLight ? "#0F172A" : "#FFFFFF", letterSpacing: "-0.015em" }}>{title}</h3>}
            {subtitle && <p style={{ margin: "2px 0 0", fontSize: 13, color: isLight ? "#64748B" : "#94A3B8" }}>{subtitle}</p>}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll('left')}
              aria-label="Desplazar hacia la izquierda"
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: "50%", 
                background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.06)", 
                border: isLight ? "1px solid rgba(0, 0, 0, 0.10)" : "1px solid rgba(255, 255, 255, 0.12)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: "pointer", 
                color: isLight ? "#0F172A" : "#FFFFFF",
                boxShadow: isLight ? "0 2px 6px rgba(0,0,0,0.06)" : "none"
              }}
            >
              <ChevronLeftRegular fontSize={16} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll('right')}
              aria-label="Desplazar hacia la derecha"
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: "50%", 
                background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.06)", 
                border: isLight ? "1px solid rgba(0, 0, 0, 0.10)" : "1px solid rgba(255, 255, 255, 0.12)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: "pointer", 
                color: isLight ? "#0F172A" : "#FFFFFF",
                boxShadow: isLight ? "0 2px 6px rgba(0,0,0,0.06)" : "none"
              }}
            >
              <ChevronRightRegular fontSize={16} />
            </motion.button>
          </div>
        </div>
      )}

      <div 
        ref={rowRef}
        style={{ 
          display: "flex", 
          gap: 14, 
          overflowX: "auto", 
          paddingBottom: 8, 
          paddingTop: 2, 
          scrollbarWidth: "none" 
        }}
      >
        {children}
      </div>
    </div>
  );
}
