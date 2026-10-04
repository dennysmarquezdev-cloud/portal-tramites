import React, { useContext, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SettingsRegular, ChevronRightRegular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { Category } from "../types";
import { getCategoryVisual } from "../data";
import { AdminCMSContext } from "../context";

interface CategoryCardProps {
  cat: Category;
  count: number;
  isActive: boolean;
  onClick: () => void;
  theme?: "light" | "dark";
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  cat,
  count,
  isActive,
  onClick,
  theme
}) => {
  const { isAdmin, onEditCms } = useContext(AdminCMSContext);
  const visual = getCategoryVisual(cat.id, cat.name);
  const accent = visual.accentColor || cat.colorB || "#0284C7";
  const desc = cat.description || visual.description;
  const imageSrc = visual.image;

  const isLight = theme === "light" || (!theme && !document.documentElement.classList.contains("dark"));

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // GSAP QuickTo Animation Handlers for 60fps High-End Magnetic Tilt
  const quickProps = useRef<{
    rotX?: gsap.QuickToFunc;
    rotY?: gsap.QuickToFunc;
    elevY?: gsap.QuickToFunc;
    imgX?: gsap.QuickToFunc;
    imgY?: gsap.QuickToFunc;
    imgScale?: gsap.QuickToFunc;
  }>({});

  useEffect(() => {
    if (!cardRef.current) return;

    quickProps.current.rotX = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.35, ease: "power2.out" });
    quickProps.current.rotY = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.35, ease: "power2.out" });
    quickProps.current.elevY = gsap.quickTo(cardRef.current, "y", { duration: 0.35, ease: "power2.out" });

    if (imageRef.current) {
      quickProps.current.imgX = gsap.quickTo(imageRef.current, "x", { duration: 0.45, ease: "power2.out" });
      quickProps.current.imgY = gsap.quickTo(imageRef.current, "y", { duration: 0.45, ease: "power2.out" });
      quickProps.current.imgScale = gsap.quickTo(imageRef.current, "scale", { duration: 0.45, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // 3D Tilt & Magnetic Physics
    quickProps.current.rotY?.(xPct * 5);
    quickProps.current.rotX?.(-yPct * 5);
    quickProps.current.elevY?.(-3);

    // Parallax depth on 3D illustration
    quickProps.current.imgX?.(-xPct * 6);
    quickProps.current.imgY?.(-yPct * 5);
    quickProps.current.imgScale?.(1.06);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    quickProps.current.rotX?.(0);
    quickProps.current.rotY?.(0);
    quickProps.current.elevY?.(0);
    quickProps.current.imgX?.(0);
    quickProps.current.imgY?.(0);
    quickProps.current.imgScale?.(1);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        background: isLight ? "#FFFFFF" : "rgba(18, 20, 28, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 18,
        border: isActive ? `2px solid ${accent}` : (isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.12)"),
        borderTop: `4px solid ${accent}`,
        boxShadow: isActive
          ? `0 14px 35px -6px ${accent}40, 0 0 20px ${accent}25`
          : isHovered
            ? (isLight ? "0 14px 30px -6px rgba(0,0,0,0.10)" : "0 14px 30px -6px rgba(0,0,0,0.6), 0 0 15px rgba(255,255,255,0.06)")
            : (isLight ? "0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)" : "0 8px 24px rgba(0,0,0,0.4)"),
        padding: "18px 18px 16px",
        cursor: "pointer",
        minHeight: 172,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        userSelect: "none",
        transformStyle: "preserve-3d",
        perspective: 1000,
        transformOrigin: "center center",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Admin edit button */}
      {isAdmin && (
        <div style={{ position: "absolute", top: 10, right: 42, zIndex: 10 }}>
          <Button
            appearance="subtle"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEditCms("categoria", cat);
            }}
            icon={<SettingsRegular fontSize={12} />}
            style={{ padding: "2px 6px", height: 24, minWidth: "auto", borderRadius: 8 }}
          >
            Editar
          </Button>
        </div>
      )}

      {/* Top Header: Title & Count Badge */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 16.5,
              fontWeight: 750,
              color: isLight ? "#0F172A" : "#FFFFFF",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              maxWidth: "calc(100% - 38px)",
              wordBreak: "break-word",
            }}
          >
            {cat.name}
          </h3>

          {/* Count Badge */}
          <span
            className="at-jb-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 26,
              height: 22,
              padding: "0 8px",
              borderRadius: 6,
              border: isActive ? `1px solid ${accent}60` : (isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.15)"),
              background: isActive ? `${accent}25` : (isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.06)"),
              color: isActive ? (isLight ? accent : "#FFFFFF") : (isLight ? "#475569" : "#CBD5E1"),
              fontSize: 11,
              fontWeight: 750,
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          >
            {count}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: 12.5,
            lineHeight: 1.5,
            color: isLight ? "#475569" : "#94A3B8",
            maxWidth: "60%",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontWeight: 450,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Bottom Row: Micro-Interactive Forward Indicator */}
      <div 
        ref={chevronRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          color: isHovered || isActive ? accent : (isLight ? "#64748B" : "#94A3B8"),
          fontSize: 12,
          fontWeight: 650,
          marginTop: "auto",
          zIndex: 2,
          transform: isHovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease",
        }}
      >
        <span>Ver trámites</span>
        <ChevronRightRegular fontSize={13} />
      </div>

      {/* 3D Illustration / SVG on bottom right with GSAP Parallax */}
      {imageSrc && (
        <img
          ref={imageRef}
          src={imageSrc}
          alt={visual.alt}
          loading="lazy"
          style={{
            position: "absolute",
            bottom: 4,
            right: 6,
            width: "auto",
            height: "clamp(76px, 20vw, 98px)",
            maxWidth: "42%",
            objectFit: "contain",
            pointerEvents: "none",
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.08))",
            willChange: "transform",
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      )}
    </div>
  );
};
