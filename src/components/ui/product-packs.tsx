"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  QrCode, 
  MessageCircle, 
  ArrowRight,
  Clock,
  Infinity as InfinityIcon,
  Check,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineAnimation } from "@/components/ui/product-packs-utils/timeline-animation";
import { GOBPE_COLORS } from "@/app/utils/gobpe-theme";
import { haptic } from "@/app/utils/haptics";
import imgYape from "@/imports/yape-qr.png";

export interface ProductPacksProps {
  onSelectPlan?: (plan: "free" | "monthly" | "lifetime") => void;
  onWhatsAppPay?: (plan: "monthly" | "lifetime") => void;
  onVerify?: () => void;
  user?: any;
  theme?: "light" | "dark";
  isModal?: boolean;
}

export const ProductPacks: React.FC<ProductPacksProps> = ({
  onSelectPlan,
  onWhatsAppPay,
  onVerify,
  user,
  theme = "dark",
  isModal = false
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<"lifetime" | "monthly">("lifetime");
  const [showYapeDetails, setShowYapeDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const isLight = theme === "light";

  const handleCopy = () => {
    haptic.selection();
    navigator.clipboard.writeText("922466078");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePayClick = () => {
    haptic.medium();
    if (onWhatsAppPay) {
      onWhatsAppPay(selectedPlanType);
    } else {
      const planText = selectedPlanType === "lifetime" ? "ACCESO TOTAL DE POR VIDA (S/ 49)" : "PLAN MENSUAL (S/ 15)";
      const userEmail = user?.email || "mi cuenta";
      const msg = `Hola Dennys, deseo activar LOTA AI PLUS (${planText}) en mi cuenta: ${userEmail}. Adjunto comprobante de Yape.`;
      window.open(`https://wa.me/51922466078?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  return (
    <section
      ref={timelineRef}
      style={{
        background: isModal ? "transparent" : (isLight ? GOBPE_COLORS.neutral[100] : GOBPE_COLORS.neutral[800]),
        color: isLight ? GOBPE_COLORS.gray[800] : "#FFFFFF",
        fontFamily: "'Inter', sans-serif"
      }}
      className={`w-full ${isModal ? "py-1 px-1" : "py-12 px-4 md:px-8"} min-h-full flex flex-col justify-center`}
    >
      <div className="max-w-4xl mx-auto w-full">
        
        {/* ── Encabezado Limpio (Sin el badge eliminado) con Bandera de Perú en LOTA AI ── */}
        <TimelineAnimation
          animationNum={1}
          timelineRef={timelineRef}
          className="text-center mb-8"
        >
          <TimelineAnimation
            animationNum={2}
            timelineRef={timelineRef}
            as="h1"
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3"
          >
            <span>Planes de Acceso a </span>
            <span className="inline-flex items-center">
              <span style={{ color: "#DC2626" }}>LO</span>
              <span style={{ color: isLight ? "#1E293B" : "#FFFFFF" }}>TA</span>
              <span>&nbsp;</span>
              <span style={{ color: "#DC2626" }}>AI</span>
            </span>
          </TimelineAnimation>

          <TimelineAnimation
            animationNum={3}
            timelineRef={timelineRef}
            as="p"
            className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-lg leading-relaxed mx-auto"
          >
            Tu asistente inteligente 24/7 para todos los trámites del Estado peruano. Elige el plan que mejor se adapte a tus necesidades.
          </TimelineAnimation>
        </TimelineAnimation>

        {/* ── Selector Dinámico de Modalidad (Mensual vs De Por Vida) ── */}
        <TimelineAnimation
          animationNum={4}
          timelineRef={timelineRef}
          className="flex justify-center mb-8"
        >
          <div 
            style={{
              background: isLight ? GOBPE_COLORS.blue[350] : "rgba(255, 255, 255, 0.06)",
              border: isLight ? `1px solid ${GOBPE_COLORS.neutral[300]}` : "1px solid rgba(255, 255, 255, 0.12)"
            }}
            className="p-1 rounded-xl flex items-center gap-1 shadow-sm"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                haptic.selection();
                setSelectedPlanType("lifetime");
              }}
              style={{
                background: selectedPlanType === "lifetime" ? GOBPE_COLORS.blue[700] : "transparent",
                color: selectedPlanType === "lifetime" ? "#FFFFFF" : (isLight ? GOBPE_COLORS.gray[800] : GOBPE_COLORS.neutral[400]),
                boxShadow: selectedPlanType === "lifetime" ? `0 4px 14px ${GOBPE_COLORS.blue[700]}40` : "none"
              }}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2"
            >
              <InfinityIcon className="w-4 h-4" />
              <span>De Por Vida (S/ 49)</span>
              <span className="bg-amber-400 text-black text-[10px] px-1.5 py-0.5 rounded font-black shadow-xs">
                MÁS POPULAR
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                haptic.selection();
                setSelectedPlanType("monthly");
              }}
              style={{
                background: selectedPlanType === "monthly" ? GOBPE_COLORS.blue[700] : "transparent",
                color: selectedPlanType === "monthly" ? "#FFFFFF" : (isLight ? GOBPE_COLORS.gray[800] : GOBPE_COLORS.neutral[400]),
                boxShadow: selectedPlanType === "monthly" ? `0 4px 14px ${GOBPE_COLORS.blue[700]}40` : "none"
              }}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Mensual (S/ 15/mes)</span>
            </motion.button>
          </div>
        </TimelineAnimation>

        {/* ── Grid de Tarjetas con Micro-Animaciones Elásticas ── */}
        <TimelineAnimation
          animationNum={5}
          timelineRef={timelineRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          {/* Card 1: Plan Gratuito (Ciudadano) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: isLight ? GOBPE_COLORS.gray[100] : "rgba(255, 255, 255, 0.03)",
              borderColor: isLight ? GOBPE_COLORS.neutral[300] : "rgba(255, 255, 255, 0.10)"
            }}
            className="border rounded-2xl p-7 flex flex-col justify-between shadow-sm space-y-6 relative overflow-hidden"
          >
            {/* Morfismo sutil de fondo */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span>Plan Ciudadano</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  Gratuito
                </span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                Acceso básico para consultas informativas y búsqueda de trámites.
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold">S/ 0</span>
                <span className="text-xs font-medium text-neutral-500">/ siempre</span>
              </div>
            </div>

            {/* Lista de Características */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs md:text-sm relative z-10">
              {[
                { label: "Búsqueda en 43+ trámites", val: "Incluido" },
                { label: "Guías paso a paso oficiales", val: "Incluido" },
                { label: "Consultas diarias LOTA AI", val: "3 / día" },
                { label: "Favoritos en el dispositivo", val: "Básico" },
                { label: "Modelos de solicitudes", val: "No incluido", disabled: true },
                { label: "Sincronización en la nube", val: "No incluido", disabled: true },
              ].map((item, i) => (
                <div key={i} className={`flex justify-between items-center ${item.disabled ? "opacity-40" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <Check className={`w-4 h-4 ${item.disabled ? "text-neutral-400" : "text-green-600"}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold text-xs text-neutral-600 dark:text-neutral-400">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              disabled
              className="w-full h-11 rounded-xl text-xs font-bold border-neutral-300 dark:border-neutral-700 opacity-80"
            >
              Plan Activo por Defecto
            </Button>
          </motion.div>

          {/* Card 2: LOTA AI PLUS (Tarjeta Destacada Squishy) */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: isLight 
                ? "linear-gradient(145deg, #FFFFFF 0%, #F0F6FF 100%)" 
                : "linear-gradient(145deg, #0C1222 0%, #080D1A 100%)",
              borderColor: GOBPE_COLORS.blue[650],
              boxShadow: isLight 
                ? "0 16px 40px rgba(0, 86, 172, 0.14)" 
                : "0 20px 52px rgba(0, 86, 172, 0.40), 0 0 24px rgba(220, 38, 38, 0.18)"
            }}
            className="border-2 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden space-y-6"
          >
            {/* Halo de Resplandor Perimetral */}
            <div 
              style={{
                background: `radial-gradient(circle at top right, ${GOBPE_COLORS.blue[700]}35 0%, ${GOBPE_COLORS.red[700]}20 50%, transparent 80%)`
              }}
              className="absolute inset-0 pointer-events-none" 
            />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>LOTA AI PLUS</span>
                </h3>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm">
                  RECOMENDADO
                </span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                Acceso total, consultas ilimitadas y generación automática de solicitudes.
              </p>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-4xl md:text-5xl font-black" style={{ color: GOBPE_COLORS.blue[700] }}>
                  {selectedPlanType === "lifetime" ? "S/ 49" : "S/ 15"}
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  {selectedPlanType === "lifetime" ? "/ pago único de por vida" : "/ mes"}
                </span>
              </div>
            </div>

            {/* Lista de Beneficios Exclusivos */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs md:text-sm relative z-10">
              {[
                { label: "Consultas con LOTA AI", val: "ILIMITADAS" },
                { label: "Generador de Solicitudes y Cartas", val: "Incluido" },
                { label: "Sincronización multidispositivo", val: "En la nube" },
                { label: "Asesoría prioritaria WhatsApp", val: "< 5 min" },
                { label: "Acceso a futuras actualizaciones", val: "Garantizado" },
                { label: "Trámites 100% Verificados Gob.pe", val: "Oficial" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5 font-medium">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold text-xs" style={{ color: GOBPE_COLORS.blue[700] }}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Botones de Pago y Activación */}
            <div className="space-y-2 pt-2 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayClick}
                style={{
                  background: `linear-gradient(135deg, ${GOBPE_COLORS.blue[700]} 0%, ${GOBPE_COLORS.blue[800]} 100%)`,
                  color: "#FFFFFF",
                  boxShadow: `0 6px 20px ${GOBPE_COLORS.blue[700]}45`
                }}
                className="w-full h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pagar con Yape y Activar por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowYapeDetails(!showYapeDetails)}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{showYapeDetails ? "Ocultar QR" : "Ver QR / Número"}</span>
                </button>

                {onVerify && (
                  <button
                    type="button"
                    onClick={onVerify}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ya pagué, Verificar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Despliegue de QR y Número de Yape */}
            {showYapeDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: isLight ? GOBPE_COLORS.blue[350] : "rgba(0, 86, 172, 0.15)",
                  borderColor: isLight ? GOBPE_COLORS.neutral[300] : "rgba(0, 86, 172, 0.35)"
                }}
                className="p-4 rounded-xl border flex flex-col items-center gap-3 text-center relative z-10"
              >
                <img 
                  src={imgYape} 
                  alt="QR Yape Dennys" 
                  className="w-32 h-32 rounded-lg object-contain bg-white p-1 shadow-sm"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-white">
                    Titular: Dennys Marquez Flores
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 mt-1">
                    <span>Número Yape: <strong>922 466 078</strong></span>
                    <button 
                      onClick={handleCopy}
                      className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      {copied ? "¡Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        </TimelineAnimation>

      </div>
    </section>
  );
};

export default ProductPacks;
