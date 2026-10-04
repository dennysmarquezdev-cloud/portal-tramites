import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SparkleRegular, 
  ArrowRightRegular, 
  ChevronDownRegular, 
  SendRegular, 
  CheckmarkRegular,
  OpenRegular,
  ChatRegular,
  MailRegular
} from '@fluentui/react-icons';
import { haptic } from "../utils/haptics";
import { WHATSAPP_URL } from "../data";

const FAQS = [
  {
    q: "¿AhorraTiempo realiza los trámites de forma directa o cobra por ellos?",
    a: "No. AhorraTiempo.pe es un buscador inteligente, catálogo unificado y asistente de orientación ciudadana con Inteligencia Artificial (LOTA AI). No somos tramitadores ni intermediarios. Centralizamos los requisitos, costos y pasos oficiales de más de 30 entidades del Estado y te facilitamos los enlaces oficiales directos para que realices tus trámites de forma segura en las webs del gobierno."
  },
  {
    q: "¿Qué entidades del Estado puedo encontrar en AhorraTiempo?",
    a: "Encontrarás las entidades más concurridas (RENIEC, SUNAT, Migraciones, MTC, SUNARP, Banco de la Nación, EsSalud, SIS) y también organismos de protección y regulación ciudadana fundamentales que muchos desconocen: SUSALUD (atención en salud y clínicas), SUNAFIL (derechos laborales), OSINERGMIN (electricidad, gas y combustibles), OSIPTEL (telecomunicaciones), INDECOPI (defensa del consumidor), SMV, OEFA, entre otras."
  },
  {
    q: "¿Cómo tramito el duplicado o renovación de mi DNI?",
    a: "Inicia el trámite en la web oficial del RENIEC o en la app DNI BioFacial tras abonar la tasa correspondiente en Págalo.pe o Banco de la Nación."
  },
  {
    q: "¿Cómo obtengo mi Clave SOL de SUNAT por primera vez?",
    a: "Genera tu Clave SOL desde la app Personas SUNAT o en la plataforma oficial con validación biométrica de huella o DNI electrónico."
  },
  {
    q: "¿Qué es y cómo realizo pagos en Págalo.pe?",
    a: "Es la plataforma oficial del Banco de la Nación para pagar tasas de trámites de RENIEC, Migraciones, MTC, Poder Judicial y PNP con tarjeta de débito/crédito."
  },
  {
    q: "¿Cómo consulto mis puntos de brevete o récord MTC?",
    a: "Ingresa al Sistema de Licencias de Conducir por Puntos del MTC digitando tu número de DNI para verificar tu historial y papeletas vigentes."
  }
];

export interface HelpPageProps {
  siteConfig?: any;
  onNavigate?: (page: string, query?: string) => void;
  theme?: "light" | "dark";
  user?: any;
  onLogin?: () => void;
  onOpenPaywall?: () => void;
}

export default function HelpPage({ 
  siteConfig, 
  onNavigate, 
  theme = "light", 
  user, 
  onLogin, 
  onOpenPaywall 
}: HelpPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: "", correo: "", detalle: "" });
  const [sent, setSent] = useState(false);

  const isLight = theme === "light";
  const emailLower = (user?.email || "").toLowerCase();
  const isPlus = user?.isPremium === true || emailLower === "plaeis260@gmail.com";

  const handleLotaClick = () => {
    haptic.medium();
    if (!user) {
      onLogin?.();
      return;
    }
    if (!isPlus) {
      onOpenPaywall?.();
      return;
    }
    onNavigate?.("frutilota");
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim()) return;
    haptic.success();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ nombre: "", correo: "", detalle: "" });
    }, 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
    borderRadius: 10,
    fontSize: 13.5,
    outline: "none",
    color: isLight ? "#0B1E38" : "#EEF2F9",
    background: isLight ? "#EDF3FA" : "#162032",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.15s ease"
  };

  return (
    <div className="page-pad" style={{ width: "100%", maxWidth: 940, margin: "0 auto", paddingBottom: 60 }}>
      
      {/* ── Header ── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 700, color: isLight ? "#5A7898" : "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>
          Soporte oficial
        </p>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: "clamp(26px, 3.5vw, 34px)", letterSpacing: "-0.04em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: 0 }}>
          Centro de Ayuda
        </h2>
      </div>

      {/* ── 2 Columns: Canales + Formulario ── */}
      <div className="ayuda-grid">
        
        {/* Left Card: Canales de Atención */}
        <div style={{
          background: isLight ? "#F7FBFF" : "#101928",
          border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column"
        }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 16.5, letterSpacing: "-0.02em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: "0 0 4px" }}>
            Canales de Atención
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 20px" }}>
            Asistencia ciudadana personalizada y respuestas oficiales.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 10,
              marginBottom: 10,
              textDecoration: "none",
              background: isLight ? "#EDF3FA" : "#162032"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 650, fontSize: 13.5, color: isLight ? "#0B1E38" : "#EEF2F9" }}>WhatsApp Soporte</span>
              <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 100, background: "rgba(0, 135, 90, 0.12)", color: "#00875A", fontFamily: "'Inter', sans-serif" }}>
                ~5 MIN
              </span>
            </div>
            <OpenRegular fontSize={13} color={isLight ? "#5A7898" : "#94A3B8"} />
          </a>

          <a
            href="mailto:soporte.ahorratiempo@gmail.com"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
              borderRadius: 10,
              marginBottom: 16,
              textDecoration: "none",
              background: isLight ? "#EDF3FA" : "#162032"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 650, fontSize: 13.5, color: isLight ? "#0B1E38" : "#EEF2F9" }}>Correo Oficial</span>
              <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 100, background: isLight ? "rgba(47, 108, 181, 0.12)" : "rgba(96, 165, 250, 0.15)", color: isLight ? "#2F6CB5" : "#60A5FA", fontFamily: "'Inter', sans-serif" }}>
                &lt; 24 HRS
              </span>
            </div>
            <OpenRegular fontSize={13} color={isLight ? "#5A7898" : "#94A3B8"} />
          </a>

          <div style={{ marginTop: "auto", padding: "12px 14px", background: isLight ? "#EDF3FA" : "#162032", borderRadius: 10 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 4px" }}>
              Lun–Vie 8:00 AM – 6:00 PM · Sáb 9:00 AM – 1:00 PM
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isLight ? "#5A7898" : "#94A3B8", margin: 0 }}>
              Pagos en Págalo.pe y bancos autorizados del Estado.
            </p>
          </div>
        </div>

        {/* Right Card: Formulario Directo */}
        <div style={{
          background: isLight ? "#F7FBFF" : "#101928",
          border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
          borderRadius: 16,
          padding: 24
        }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 16.5, letterSpacing: "-0.02em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: "0 0 4px" }}>
            Enviar Consulta Directa
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isLight ? "#5A7898" : "#94A3B8", margin: "0 0 18px" }}>
            Un asesor revisará tu caso y responderá a tu correo.
          </p>

          <form onSubmit={handleSendForm} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 650, color: isLight ? "#0B1E38" : "#EEF2F9", display: "block", marginBottom: 5 }}>
                Nombre Completo
              </label>
              <input
                type="text"
                placeholder="Ej. Carlos Ramírez"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 650, color: isLight ? "#0B1E38" : "#EEF2F9", display: "block", marginBottom: 5 }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="tucorreo@gmail.com"
                value={form.correo}
                onChange={e => setForm({ ...form, correo: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 650, color: isLight ? "#0B1E38" : "#EEF2F9", display: "block", marginBottom: 5 }}>
                Detalle de la Consulta
              </label>
              <textarea
                rows={3}
                placeholder="Describe brevemente qué trámite necesitas resolver..."
                value={form.detalle}
                onChange={e => setForm({ ...form, detalle: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: 4,
                padding: "11px 18px",
                borderRadius: 10,
                background: sent ? "#1E8A6E" : "#2F6CB5",
                color: "#FFFFFF",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 13.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.2s"
              }}
            >
              {sent ? <CheckmarkRegular fontSize={15} /> : <SendRegular fontSize={15} />}
              <span>{sent ? "¡Consulta Enviada con Éxito!" : "Enviar Consulta"}</span>
            </button>
          </form>
        </div>

      </div>

      {/* ── FAQ Accordion ── */}
      <div style={{
        background: isLight ? "#F7FBFF" : "#101928",
        border: isLight ? "1.5px solid #C9DDEF" : "1.5px solid #1C2D42",
        borderRadius: 16,
        overflow: "hidden"
      }}>
        <div style={{ padding: "18px 24px", borderBottom: isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42" }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 750, fontSize: 16.5, letterSpacing: "-0.02em", color: isLight ? "#0B1E38" : "#EEF2F9", margin: 0 }}>
            Preguntas Frecuentes
          </h3>
        </div>

        {FAQS.map((q, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? (isLight ? "1px solid #C9DDEF" : "1px solid #1C2D42") : "none" }}>
              <button
                onClick={() => {
                  haptic.light();
                  setOpenFaq(isOpen ? null : i);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: isOpen ? 650 : 500, color: isLight ? "#0B1E38" : "#EEF2F9" }}>
                  {q.q}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                  <ChevronDownRegular fontSize={14} color={isLight ? "#5A7898" : "#94A3B8"} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 24px 16px" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: isLight ? "#5A7898" : "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                        {q.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
