"use client";
import React from "react";
import { motion } from "framer-motion";
import { haptic } from "@/app/utils/haptics";
import { Check, Star } from "lucide-react";

export interface SquishyPricingProps {
  onSelectPlan?: (plan: "monthly" | "lifetime") => void;
  selectedPlan?: "monthly" | "lifetime";
  theme?: "light" | "dark";
  onWhatsAppPay?: (plan: "monthly" | "lifetime") => void;
}

export const SquishyPricing: React.FC<SquishyPricingProps> = ({
  onSelectPlan,
  selectedPlan = "lifetime",
  theme = "light",
  onWhatsAppPay
}) => {
  const isLight = theme === "light";

  const handleCardClick = (plan: "monthly" | "lifetime") => {
    haptic.selection();
    onSelectPlan?.(plan);
  };

  return (
    <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* ── 2 Columnas de Planes: Formales, Claras y de Alto Contraste ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        alignItems: "stretch"
      }}>
        
        {/* ── Tarjeta 1: Pase Mensual (Formal y Limpia) ── */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handleCardClick("monthly")}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 16,
            padding: "22px 22px 20px",
            background: isLight ? "#FFFFFF" : "#0F172A",
            border: selectedPlan === "monthly" 
              ? (isLight ? "2px solid #0284C7" : "2px solid #38BDF8")
              : (isLight ? "1.5px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.12)"),
            boxShadow: selectedPlan === "monthly"
              ? (isLight ? "0 8px 24px -4px rgba(2, 132, 199, 0.18), 0 2px 6px rgba(0,0,0,0.04)" : "0 8px 24px -4px rgba(0, 0, 0, 0.6)")
              : (isLight ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "none"),
            cursor: "pointer",
            transition: "all 0.2s ease",
            userSelect: "none",
            boxSizing: "border-box"
          }}
        >
          <div>
            {/* Título del Plan */}
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 15,
                fontWeight: 750,
                color: isLight ? "#0F172A" : "#FFFFFF",
                display: "block"
              }}>
                Pase Mensual
              </span>
            </div>

            {/* Precio Monumental */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "2px 0 8px" }}>
              <span style={{
                fontSize: "clamp(34px, 3.5vw, 42px)",
                fontWeight: 850,
                letterSpacing: "-0.03em",
                color: isLight ? "#0F172A" : "#FFFFFF",
                lineHeight: 1
              }}>
                S/ 15
              </span>
              <span style={{ fontSize: 13, fontWeight: 650, color: isLight ? "#64748B" : "#94A3B8" }}>
                / mes
              </span>
            </div>

            <p style={{
              fontSize: 12.5,
              color: isLight ? "#64748B" : "#94A3B8",
              lineHeight: 1.45,
              margin: "0 0 16px"
            }}>
              Para resolver trámites puntuales de este mes con total flexibilidad.
            </p>

            {/* Lista de Beneficios Claros */}
            <div style={{
              borderTop: `1px solid ${isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.08)"}`,
              paddingTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              marginBottom: 20
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: isLight ? "#334155" : "#E2E8F0" }}>
                <Check size={15} style={{ color: "#0284C7", flexShrink: 0, marginTop: 2 }} />
                <span><strong>Hasta 40 consultas</strong> mensuales con LOTA AI</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: isLight ? "#334155" : "#E2E8F0" }}>
                <Check size={15} style={{ color: "#0284C7", flexShrink: 0, marginTop: 2 }} />
                <span>Guías oficiales paso a paso con cobertura nacional</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: isLight ? "#334155" : "#E2E8F0" }}>
                <Check size={15} style={{ color: "#0284C7", flexShrink: 0, marginTop: 2 }} />
                <span>Requisitos actualizados sin hacer colas</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: isLight ? "#334155" : "#E2E8F0" }}>
                <Check size={15} style={{ color: "#0284C7", flexShrink: 0, marginTop: 2 }} />
                <span>Cancela o renueva cuando lo necesites</span>
              </div>
            </div>
          </div>

          {/* Botón de Selección */}
          <button
            type="button"
            style={{
              width: "100%",
              padding: "10.5px 16px",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: selectedPlan === "monthly" ? "none" : `1.5px solid ${isLight ? "#BAE6FD" : "rgba(255, 255, 255, 0.2)"}`,
              background: selectedPlan === "monthly" 
                ? "#0284C7" 
                : (isLight ? "#F0F9FF" : "transparent"),
              color: selectedPlan === "monthly" 
                ? "#FFFFFF" 
                : (isLight ? "#0284C7" : "#FFFFFF")
            }}
          >
            {selectedPlan === "monthly" ? "✓ Plan Seleccionado" : "Elegir Plan Mensual"}
          </button>
        </motion.div>


        {/* ── Tarjeta 2: Acceso de Por Vida (Azul LOTA Institucional) ── */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handleCardClick("lifetime")}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 16,
            padding: "22px 22px 20px",
            background: isLight 
              ? "linear-gradient(150deg, #0284C7 0%, #0369A1 100%)" 
              : "linear-gradient(150deg, #0369A1 0%, #0C4A6E 100%)",
            border: selectedPlan === "lifetime"
              ? "2px solid #BAE6FD"
              : "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: selectedPlan === "lifetime"
              ? "0 12px 32px -4px rgba(2, 132, 199, 0.38), 0 0 0 1px #38BDF8"
              : "0 4px 16px rgba(2, 132, 199, 0.18)",
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "all 0.2s ease",
            userSelect: "none",
            boxSizing: "border-box"
          }}
        >
          <div>
            {/* Header del Plan con Título y Badge Más Elegido */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{
                fontSize: 15,
                fontWeight: 750,
                color: "#FFFFFF",
                display: "block"
              }}>
                Acceso de Por Vida
              </span>

              <span style={{
                fontSize: 10.5,
                fontWeight: 800,
                padding: "3px 9px",
                borderRadius: 6,
                background: "#FEF08A",
                color: "#0F172A",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.15)"
              }}>
                <Star size={11} fill="#0F172A" />
                MÁS ELEGIDO
              </span>
            </div>

            {/* Precio Monumental */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "2px 0 8px" }}>
              <span style={{
                fontSize: "clamp(34px, 3.5vw, 42px)",
                fontWeight: 850,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                lineHeight: 1
              }}>
                S/ 49
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#FEF08A" }}>
                / pago único
              </span>
            </div>

            <p style={{
              fontSize: 12.5,
              color: "#E0F2FE",
              lineHeight: 1.45,
              margin: "0 0 16px"
            }}>
              Un solo pago para siempre. Consultas ilimitadas y tranquilidad total sin mensualidades.
            </p>

            {/* Lista de Beneficios Claros */}
            <div style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              paddingTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              marginBottom: 20
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#FFFFFF" }}>
                <Check size={15} style={{ color: "#86EFAC", flexShrink: 0, marginTop: 2 }} />
                <span><strong>Consultas 100% ILIMITADAS 24/7</strong> de por vida</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#FFFFFF" }}>
                <Check size={15} style={{ color: "#86EFAC", flexShrink: 0, marginTop: 2 }} />
                <span><strong>Múltiples entidades oficiales</strong> con cobertura nacional</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#FFFFFF" }}>
                <Check size={15} style={{ color: "#86EFAC", flexShrink: 0, marginTop: 2 }} />
                <span>Generador de cartas y solicitudes formales</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#FFFFFF" }}>
                <Check size={15} style={{ color: "#86EFAC", flexShrink: 0, marginTop: 2 }} />
                <span>Soporte preferencial prioritario por WhatsApp</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#FFFFFF" }}>
                <Check size={15} style={{ color: "#86EFAC", flexShrink: 0, marginTop: 2 }} />
                <span>Todas las futuras actualizaciones incluidas</span>
              </div>
            </div>
          </div>

          {/* Botón de Selección */}
          <button
            type="button"
            style={{
              width: "100%",
              padding: "10.5px 16px",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 750,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: "none",
              background: selectedPlan === "lifetime" ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)",
              color: selectedPlan === "lifetime" ? "#0284C7" : "#FFFFFF",
              boxShadow: selectedPlan === "lifetime" ? "0 4px 14px rgba(0, 0, 0, 0.12)" : "none"
            }}
          >
            {selectedPlan === "lifetime" ? "✓ Plan Seleccionado" : "Elegir Acceso de Por Vida"}
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export const Component = SquishyPricing;
export default SquishyPricing;
