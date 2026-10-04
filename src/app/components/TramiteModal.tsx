import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  SettingsRegular, BookmarkRegular, BookmarkAddRegular, DismissRegular, 
  BuildingRegular, SparkleRegular, CheckmarkCircleRegular, OpenRegular,
  CheckmarkRegular, ClockRegular, MoneyRegular, GlobeRegular, ShieldCheckmarkRegular,
  InfoRegular, ArrowRightRegular
} from '@fluentui/react-icons';
import { Tramite } from '../types';
import { getCat } from '../App';
import { AdminCMSContext } from '../context';
import { getCategoryVisual } from '../data';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, Button, Text } from '@fluentui/react-components';

import { haptic } from '../utils/haptics';

export function TramiteModal({ t, onClose, faved, onFav, onAnalyze, user }: { t: Tramite; onClose: () => void; faved: boolean; onFav: () => void; onAnalyze: () => void; user: any; }) {
  const cat = getCat(t.categoryId);
  const visual = getCategoryVisual(t.categoryId || cat.id, cat.name);
  const catColor = visual.accentColor || cat.colorB || "#0284C7";
  const { isAdmin, onEditCms } = useContext(AdminCMSContext);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  // Interactive checklist state (Zero-Latency Optimistic Local State)
  const [checkedReqs, setCheckedReqs] = useState<Set<number>>(new Set());

  const toggleReq = (index: number) => {
    haptic.light();
    setCheckedReqs(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleStartTramite = () => {
    haptic.success();
    window.open(t.url || "https://www.gob.pe/", "_blank", "noopener,noreferrer");
  };

  const handleFavWrapper = () => {
    haptic.medium();
    onFav();
  };

  const handleCloseWrapper = () => {
    haptic.light();
    onClose();
  };

  const handleAnalyzeInline = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const apiUrl = import.meta.env.VITE_CF_WORKER_URL || "https://ahorratiempo-scraper.ahorratiempo.workers.dev";
      
      const reqList = t.requirements && t.requirements.length > 0 ? t.requirements.join("; ") : "Ninguno específico";
      const conList = t.considerations && t.considerations.length > 0 ? t.considerations.join("; ") : "Ninguna";
      
      const prompt = `Analiza este trámite peruano. Eres LOTA AI. REGLA ESTRICTA DE ESTILO: NO uses iconos o emojis de frutas en tus respuestas bajo ninguna circunstancia. No saludes.
      
Datos del Trámite:
- Título: ${t.title}
- Entidad: ${t.entity} (${cat.name})
- Requisitos: ${reqList}
- Consideraciones: ${conList}
- Costo y Tiempo: ${t.price} / ${t.time}

Tu respuesta DEBE estructurarse estrictamente como un "mapa de pasos", siguiendo este formato en Markdown:

Una breve introducción de 1 a 2 líneas indicando qué se logra con este trámite.

- **Requisitos Previos:** (Menciona lo que se necesita antes de empezar).
- **Proceso de Solicitud:** (Explica el paso a paso de cómo y dónde hacerlo).
- **Consideraciones Clave:** (Tiempos de espera, vigencia o advertencias).

Finaliza con una pregunta breve invitando al usuario a consultar más detalles si lo requiere. Usa viñetas claras y texto en negrita para los encabezados de cada punto.`;

      const response = await fetch(`${apiUrl}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [{ role: "user", content: prompt }] 
        })
      });
      
      const contentType = response.headers.get("content-type");
      let data: any = null;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Invalid response format");
      }
      
      if (data && data.response) {
        setAnalysisResult(`**Análisis Inteligente de LOTA AI:**\n\n${data.response}`);
      } else {
        setAnalysisResult("**Ups!** Mis servidores están procesando múltiples consultas. Por favor, intenta de nuevo.");
      }
    } catch (e) {
      console.error("AI Error:", e);
      setAnalysisResult("**Ups!** Tuvimos un error de red al procesar los datos. Por favor, revisa tu conexión e intenta de nuevo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatRawDescription = (text: string) => {
    if (!text) return null;
    
    let cleanText = text
      .replace(/Descripción/gi, "")
      .replace(new RegExp(t.title, "gi"), "")
      .replace(/En qué casos se considera un delito/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (cleanText.length > 0) {
      cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    }
    
    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    let intro = sentences[0] || cleanText;
    if (sentences.length > 1 && intro.length < 100) {
      intro += " " + sentences[1];
    }
    
    return (
      <p style={{ color: "var(--colorNeutralForeground1)", fontSize: 15, lineHeight: 1.65, margin: 0, fontFamily: "'Inter', sans-serif" }}>
        {intro.trim()}
      </p>
    );
  };

  const isFree = (t.price || "").toLowerCase().includes("gratis") || (t.price || "").toLowerCase().includes("gratuito") || !t.price;
  const progressPercent = t.requirements.length > 0 ? (checkedReqs.size / t.requirements.length) * 100 : 0;

  return (
    <Dialog open={true} onOpenChange={(_, data) => !data.open && handleCloseWrapper()}>
      <DialogSurface className="at-bottom-sheet-mobile" style={{ maxWidth: 740, width: "calc(100vw - 32px)", padding: 0, borderRadius: 24, overflow: "hidden", background: "var(--colorNeutralBackground1)", border: "1px solid var(--colorNeutralStroke1)", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
        
        {/* Mobile Drag Indicator Pill */}
        <div className="at-sheet-handle" title="Desliza hacia abajo para cerrar" />

        {/* Header */}
        <div style={{ padding: "12px 24px 16px", borderBottom: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)" }}>
          {/* Top Bar Actions */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 999, background: `${catColor}14`, border: `1px solid ${catColor}30` }}>
              <cat.Icon size={14} color={catColor} />
              <span style={{ color: catColor, fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase" }}>{cat.name}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {isAdmin && (
                <Button size="small" appearance="subtle" icon={<SettingsRegular fontSize={14} />} onClick={() => onEditCms("tramite", t)}>
                  Editar
                </Button>
              )}
              <motion.button 
                whileTap={{ scale: 0.92 }}
                onClick={handleFavWrapper}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 10, background: faved ? "rgba(245, 158, 11, 0.12)" : "var(--colorNeutralBackground1)", border: faved ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid var(--colorNeutralStroke1)", cursor: "pointer", color: faved ? "#D97706" : "var(--colorNeutralForeground2)", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
              >
                {faved ? <BookmarkRegular fontSize={15} color="#D97706" /> : <BookmarkAddRegular fontSize={15} />}
                <span>{faved ? "Guardado" : "Guardar"}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleCloseWrapper} 
                style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer", color: "var(--colorNeutralForeground2)", display: "flex", borderRadius: "50%" }}
              >
                <DismissRegular fontSize={18} />
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <DialogTitle style={{ marginBottom: 0 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.25rem, 2.8vw, 1.65rem)", fontWeight: 700, margin: 0, color: "var(--colorNeutralForeground1)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              {t.title}
            </h2>
          </DialogTitle>
        </div>

        {/* Modal Body */}
        <DialogBody style={{ padding: "20px 24px 24px", overflowY: "auto", maxHeight: "calc(88vh - 200px)" }}>
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              
              {/* Description */}
              {t.description && (
                <div style={{ padding: "14px 16px", borderRadius: 14, background: "var(--colorNeutralBackground2)", border: "1px solid var(--colorNeutralStroke2)" }}>
                  {formatRawDescription(t.description)}
                </div>
              )}

              {/* Interactive Checklist de Requisitos */}
              {t.requirements.length > 0 && !analysisResult && !isAnalyzing && (
                <div style={{ background: "var(--colorNeutralBackground1)", border: "1px solid var(--colorNeutralStroke1)", borderRadius: 18, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckmarkCircleRegular fontSize={18} color="#0284C7" />
                      <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 15, fontWeight: 700, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                        Requisitos del Trámite (Checklist)
                      </h3>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: checkedReqs.size === t.requirements.length ? "#10B981" : "var(--colorNeutralForeground3)" }}>
                      {checkedReqs.size} de {t.requirements.length} listos
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: "100%", height: 6, background: "var(--colorNeutralBackground2)", borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${progressPercent}%` }} 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ height: "100%", background: progressPercent === 100 ? "#10B981" : "linear-gradient(90deg, #0284C7, #38BDF8)", borderRadius: 999 }} 
                    />
                  </div>

                  {/* Interactive Checklist items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.requirements.map((r, i) => {
                      const isChecked = checkedReqs.has(i);
                      return (
                        <motion.div 
                          key={i}
                          onClick={() => toggleReq(i)}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.99 }}
                          style={{ 
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                            padding: "10px 12px",
                            borderRadius: 12,
                            background: isChecked ? "rgba(16, 185, 129, 0.08)" : "var(--colorNeutralBackground2)",
                            border: isChecked ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--colorNeutralStroke2)",
                            cursor: "pointer",
                            transition: "background 0.2s, border-color 0.2s"
                          }}
                        >
                          <div style={{ width: 22, height: 22, borderRadius: 6, background: isChecked ? "#10B981" : "var(--colorNeutralBackground1)", border: isChecked ? "none" : "1.5px solid var(--colorNeutralStroke1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                            {isChecked && <CheckmarkRegular fontSize={14} color="#FFFFFF" />}
                          </div>
                          <span style={{ color: isChecked ? "var(--colorNeutralForeground1)" : "var(--colorNeutralForeground2)", fontSize: 13.5, lineHeight: 1.5, textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.8 : 1 }}>
                            {r}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Considerations */}
              {t.considerations && t.considerations.length > 0 && !analysisResult && !isAnalyzing && (
                <div style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(217, 119, 6, 0.06)", border: "1px solid rgba(217, 119, 6, 0.2)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <InfoRegular fontSize={18} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h4 style={{ color: "#D97706", fontSize: 13.5, fontWeight: 700, margin: "0 0 4px" }}>Ten en cuenta:</h4>
                    <p style={{ color: "var(--colorNeutralForeground2)", fontSize: 13, lineHeight: 1.45, margin: 0 }}>
                      {t.considerations.join(". ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Loading AI Guide */}
              {isAnalyzing && (
                <div style={{ background: "var(--colorNeutralBackground2)", border: "1.5px solid #0284C7", borderRadius: 18, padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <motion.div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0284C7" }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div style={{ width: 10, height: 10, borderRadius: "50%", background: "#38BDF8" }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} />
                    <motion.div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7DD3FC" }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} />
                  </div>
                  <span style={{ color: "var(--colorNeutralForeground1)", fontSize: 14.5, fontWeight: 700 }}>
                    LOTA AI está generando tu guía estructurada paso a paso...
                  </span>
                </div>
              )}

              {/* AI Generated Guide */}
              {analysisResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ 
                    background: "var(--colorNeutralBackground2)", 
                    border: "1px solid #0284C7", 
                    borderRadius: 20, 
                    padding: "22px 24px",
                    boxShadow: "0 8px 24px rgba(2, 132, 199, 0.08)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--colorNeutralStroke1)" }}>
                    <SparkleRegular fontSize={22} color="#0284C7" />
                    <span style={{ color: "#0284C7", fontSize: 16, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
                      Guía Inteligente LOTA AI
                    </span>
                  </div>
                  <div style={{ color: "var(--colorNeutralForeground1)", fontSize: 14, lineHeight: 1.7 }}>
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ color: "#0284C7", fontWeight: 700 }} {...props} />,
                        ul: ({node, ...props}) => <ul style={{ margin: "0 0 16px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }} {...props} />,
                        li: ({node, ...props}) => <li style={{ lineHeight: 1.55 }} {...props} />,
                      }}
                    >
                      {analysisResult.replace("**Análisis Inteligente de LOTA AI:**\n\n", "").replace("**Análisis Inteligente de FRUTILOTA:**\n\n", "")}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                {/* Official CTA Button */}
                <motion.button 
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  onClick={e => { e.preventDefault(); handleStartTramite(); }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    height: 48,
                    borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(2, 132, 199, 0.35)",
                  }}
                >
                  <span>Iniciar trámite en Gob.pe</span>
                  <OpenRegular fontSize={17} color="#FFFFFF" />
                </motion.button>
              </div>

            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
