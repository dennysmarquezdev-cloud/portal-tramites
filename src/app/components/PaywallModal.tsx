import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DismissRegular } from "@fluentui/react-icons";
import { toast } from "sonner";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { SquishyPricing } from "@/components/ui/squishy-pricing";
import { MessageCircle, ShieldCheck, Copy, Check, QrCode, Sparkles } from "lucide-react";
import imgYape from "@/imports/yape-qr.png";

export interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  theme?: "light" | "dark";
  onSuccess?: () => void;
}

export function PaywallModal({
  isOpen,
  onClose,
  user,
  theme = "dark",
  onSuccess
}: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "lifetime">("lifetime");
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyNumber = () => {
    sound.playHoverKey();
    haptic.selection();
    navigator.clipboard.writeText("922466078");
    setCopied(true);
    toast.success("Número de Yape copiado: 922 466 078");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppPay = (plan: "monthly" | "lifetime") => {
    haptic.medium();
    sound.playClick();
    const planText = plan === "lifetime" 
      ? "ACCESO TOTAL DE POR VIDA (S/ 49 - CONSULTAS ILIMITADAS)" 
      : "PASE MENSUAL (S/ 15 - CONSULTAS LIMITADAS)";

    const userEmail = user?.email || "mi cuenta";
    const msg = `Hola Dennys Marquez Flores, deseo activar LOTA AI PLUS (${planText}) en mi cuenta: ${userEmail}. Adjunto comprobante de Yape por favor.`;
    window.open(`https://wa.me/51922466078?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleVerify = async () => {
    haptic.medium();
    sound.playClick();
    if (!user?.email) {
      toast.error("Debes iniciar sesión para verificar tu suscripción.");
      return;
    }
    setChecking(true);
    try {
      const emailLower = user.email.toLowerCase();
      const docRef = doc(db, "compradores", emailLower);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && (docSnap.data().isPremium === true || docSnap.data().esAdmin === true)) {
        haptic.success();
        toast.success("¡Tu cuenta LOTA AI PLUS está activa! Disfruta de todas las funciones.");
        onSuccess?.();
        onClose();
      } else {
        toast.info("Aún no detectamos tu activación. Si ya enviaste tu comprobante por WhatsApp a Dennys Marquez Flores, se activará en breves minutos.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error al verificar activación.");
    } finally {
      setChecking(false);
    }
  };

  const planPrice = selectedPlan === "lifetime" ? "S/ 49" : "S/ 15";
  const planName = selectedPlan === "lifetime" 
    ? "Acceso de por Vida (S/ 49 - Ilimitado)" 
    : "Pase Mensual (S/ 15 - Flexible)";

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
            padding: "12px",
            boxSizing: "border-box"
          }}
        >
          {/* Backdrop con desenfoque de cristal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: isLight ? "rgba(15, 23, 42, 0.48)" : "rgba(2, 6, 18, 0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)"
            }}
          />

          {/* Modal Contenido en 1 Vista Responsiva */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: 880,
              maxHeight: "92vh",
              overflowY: "auto",
              background: isLight ? "#FFFFFF" : "#0A101D",
              borderRadius: 22,
              border: isLight ? "1.5px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: isLight
                ? "0 24px 64px rgba(15, 23, 42, 0.16), 0 8px 24px rgba(0, 0, 0, 0.04)"
                : "0 24px 64px rgba(0, 0, 0, 0.90)",
              boxSizing: "border-box",
              fontFamily: "'Inter', -apple-system, sans-serif",
              overflowX: "hidden",
              padding: "24px 22px 20px"
            }}
          >
            {/* Botón Cerrar (X) Flotante */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.08)",
                border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.12)",
                color: isLight ? "#475569" : "#94A3B8",
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
                zIndex: 20
              }}
              aria-label="Cerrar modal"
            >
              <DismissRegular fontSize={16} />
            </motion.button>

            {/* Encabezado Formal */}
            <div style={{ textAlign: "center", marginBottom: 18, padding: "0 20px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 10px",
                borderRadius: 100,
                background: isLight ? "rgba(2, 132, 199, 0.08)" : "rgba(56, 189, 248, 0.12)",
                color: isLight ? "#0284C7" : "#38BDF8",
                fontSize: 11.5,
                fontWeight: 750,
                marginBottom: 8,
                letterSpacing: "0.02em"
              }}>
                <Sparkles size={13} />
                <span>ACTIVACIÓN INMEDIATA LOTA AI PLUS</span>
              </div>
              <h2 style={{
                color: isLight ? "#0F172A" : "#FFFFFF",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(22px, 3vw, 26px)",
                fontWeight: 850,
                margin: "0 0 6px",
                letterSpacing: "-0.02em"
              }}>
                Elige tu Plan y Realiza tu Pago Oficial
              </h2>
              <p style={{
                color: isLight ? "#64748B" : "#94A3B8",
                fontSize: 13.5,
                maxWidth: 580,
                margin: "0 auto",
                lineHeight: 1.45
              }}>
                Selecciona tu modalidad preferida y escanea el código QR de Yape a nombre de <strong>Dennys Marquez Flores</strong>.
              </p>
            </div>

            {/* ── 2 Tarjetas Responsivas SquishyPricing ── */}
            <SquishyPricing
              selectedPlan={selectedPlan}
              onSelectPlan={(plan) => {
                sound.playHoverKey();
                setSelectedPlan(plan);
              }}
              onWhatsAppPay={handleWhatsAppPay}
              theme={theme}
            />

            {/* ── CENTRO DE PAGO DESTACADO: QR YAPE PROMINENTE (Protagonista de la sesión de pago) ── */}
            <div 
              style={{
                marginTop: 18,
                background: isLight 
                  ? "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)" 
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                border: isLight ? "2px solid #CBD5E1" : "1.5px solid rgba(124, 58, 237, 0.35)",
                borderRadius: 18,
                padding: "20px 20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.04)" : "0 8px 30px rgba(0,0,0,0.4)"
              }}
            >
              {/* Header de la sección Yape */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, borderBottom: `1px solid ${isLight ? "#E2E8F0" : "rgba(255,255,255,0.08)"}`, paddingBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{
                    background: "#730A8D",
                    color: "#FFFFFF",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontWeight: 850,
                    fontSize: 12.5,
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                  }}>
                    <QrCode size={15} />
                    <span>YAPE OFICIAL</span>
                  </div>
                  <span style={{ fontSize: 13, color: isLight ? "#334155" : "#E2E8F0" }}>
                    Plan a pagar: <strong style={{ color: isLight ? "#0284C7" : "#38BDF8", fontWeight: 750 }}>{planName}</strong>
                  </span>
                </div>

                {/* Badge de Monto Destacado */}
                <div style={{
                  background: isLight ? "#ECFDF5" : "rgba(16, 185, 129, 0.15)",
                  border: isLight ? "1px solid #A7F3D0" : "1px solid rgba(16, 185, 129, 0.3)",
                  color: isLight ? "#047857" : "#34D399",
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 5
                }}>
                  <span>Monto exacto:</span>
                  <span style={{ fontSize: 15.5 }}>{planPrice}</span>
                </div>
              </div>

              {/* ── CUERPO PRINCIPAL DEL QR YAPE (PROMINENTE Y CENTRADO) ── */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
                alignItems: "center"
              }}>
                {/* Caja Visual del QR */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFFFFF",
                  padding: "16px",
                  borderRadius: 16,
                  border: "2px solid #730A8D",
                  boxShadow: "0 8px 24px rgba(115, 10, 141, 0.15)",
                  textAlign: "center"
                }}>
                  <div style={{
                    background: "#FFFFFF",
                    padding: 8,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <img 
                      src={imgYape} 
                      alt="Código QR Yape Oficial Dennys Marquez Flores" 
                      style={{ 
                        width: 175, 
                        height: 175, 
                        objectFit: "contain",
                        imageRendering: "-webkit-optimize-contrast"
                      }} 
                    />
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Escanea desde tu app Yape
                    </div>
                  </div>
                </div>

                {/* Datos del Titular y Pasos Claros */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Titular Oficial: Dennys Marquez Flores */}
                  <div style={{
                    background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                    border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.10)",
                    borderRadius: 12,
                    padding: "12px 14px"
                  }}>
                    <span style={{ fontSize: 11, color: isLight ? "#64748B" : "#94A3B8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.03em", display: "block", marginBottom: 2 }}>
                      Titular de la cuenta a transferir:
                    </span>
                    <span style={{
                      fontSize: 16.5,
                      fontWeight: 850,
                      color: isLight ? "#0F172A" : "#FFFFFF",
                      display: "block",
                      letterSpacing: "-0.01em"
                    }}>
                      Dennys Marquez Flores
                    </span>
                  </div>

                  {/* Número de Celular Yape + Botón Copiar */}
                  <div style={{
                    background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                    border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.10)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8
                  }}>
                    <div>
                      <span style={{ fontSize: 11, color: isLight ? "#64748B" : "#94A3B8", fontWeight: 600, display: "block" }}>
                        Número de celular Yape:
                      </span>
                      <span style={{ fontSize: 15.5, fontWeight: 800, color: isLight ? "#0F172A" : "#38BDF8", letterSpacing: "0.02em" }}>
                        922 466 078
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyNumber}
                      style={{
                        background: isLight ? "rgba(2, 132, 199, 0.08)" : "rgba(56, 189, 248, 0.12)",
                        border: isLight ? "1px solid rgba(2, 132, 199, 0.3)" : "1px solid rgba(56, 189, 248, 0.3)",
                        color: isLight ? "#0284C7" : "#38BDF8",
                        borderRadius: 8,
                        padding: "7px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        transition: "all 0.15s ease"
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? "¡Copiado!" : "Copiar número"}</span>
                    </motion.button>
                  </div>

                  {/* Pasos Rápidos */}
                  <div style={{ fontSize: 12, color: isLight ? "#475569" : "#94A3B8", lineHeight: 1.45, padding: "0 4px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                      <strong style={{ color: "#730A8D" }}>1.</strong>
                      <span>Abre Yape y escanea el QR o transfiere a <strong>Dennys Marquez Flores</strong> ({planPrice}).</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <strong style={{ color: "#16A34A" }}>2.</strong>
                      <span>Envía la captura de tu yapeo por WhatsApp para activación inmediata.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Envío por WhatsApp y Verificación */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginTop: 4 }}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWhatsAppPay(selectedPlan)}
                  style={{
                    background: "#16A34A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 13.5,
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 3px 12px rgba(22, 163, 74, 0.35)"
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Enviar Comprobante por WhatsApp</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={checking}
                  style={{
                    background: isLight ? "#E0F2FE" : "rgba(56, 189, 248, 0.15)",
                    color: isLight ? "#0284C7" : "#38BDF8",
                    border: isLight ? "1.5px solid #0284C7" : "1.5px solid #38BDF8",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 13.5,
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: isLight ? "0 2px 8px rgba(2, 132, 199, 0.12)" : "none",
                    opacity: checking ? 0.6 : 1
                  }}
                >
                  <ShieldCheck size={18} />
                  <span>{checking ? "Verificando activación..." : "Ya realicé el pago (Verificar)"}</span>
                </motion.button>
              </div>

              {/* Nota de Confianza */}
              <div style={{ textAlign: "center", fontSize: 11.5, color: isLight ? "#64748B" : "#94A3B8", marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <ShieldCheck size={14} color="#16A34A" />
                <span>Pago seguro verificado · Titular: <strong>Dennys Marquez Flores</strong> · Activación oficial</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PaywallModal;
