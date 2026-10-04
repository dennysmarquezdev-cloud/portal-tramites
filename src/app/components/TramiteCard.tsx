import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  BuildingRegular, 
  StarRegular, 
  KeyRegular, 
  ChevronDownRegular, 
  CopyRegular, 
  Speaker2Regular, 
  SpeakerOffRegular, 
  OpenRegular, 
  CheckmarkRegular,
  LightbulbRegular,
  DocumentTextRegular,
  WarningRegular,
  RocketRegular,
  DocumentBulletListMultipleRegular
} from '@fluentui/react-icons';
import { playLotaSpeech, stopLotaSpeech } from "../utils/speech";
import { haptic } from "../utils/haptics";

export interface TramiteCardProps {
  title?: string;
  entidad?: string;
  costo?: string;
  requiereClaveSol?: boolean;
  description?: string;
  requirements?: string[];
  considerations?: string[];
  steps?: string[];
  officialLinks?: Array<{ title: string; url: string; sub?: string }>;
  suggestedQueries?: string[];
  onQueryClick?: (q: string) => void;
  theme?: "light" | "dark";
}

export function TramiteCard({
  title = "Consultar RUC",
  entidad = "SUNAT",
  costo = "Gratuito",
  requiereClaveSol = false,
  description = "El trámite de consulta y verificación de RUC permite a personas naturales y jurídicas conocer su estado tributario y validez oficial ante la entidad recaudadora.",
  requirements = [
    "DNI o Carné de Extranjería vigente del solicitante",
    "Número de RUC o Razón Social a consultar",
    "Conexión a internet o punto de atención SUNAT"
  ],
  considerations = [
    "El servicio de consulta en línea es 100% gratuito y no requiere gestores",
    "Disponible las 24 horas del día, los 365 días del año en el portal de SUNAT",
    "Verifica que el estado del contribuyente figure como 'ACTIVO' y 'HABIDO'"
  ],
  steps = [
    "Ingresa a la plataforma oficial de consulta RUC o a la app SUNAT Móvil.",
    "Elige la modalidad de búsqueda (Por número de RUC, por Documento de Identidad o por Nombre/Razón Social).",
    "Ingresa los datos solicitados y presiona el botón 'Buscar'.",
    "Revisa la Ficha RUC con la información de domicilio fiscal, actividad económica y comprobantes autorizados."
  ],
  officialLinks = [
    { title: "Consultar RUC (Acceso Directo SUNAT)", url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp", sub: "Plataforma oficial en línea" },
    { title: "Guía Oficial Gob.pe: Consultar RUC", url: "https://www.gob.pe/278-consultar-ruc", sub: "Guía y requisitos del Estado peruano" }
  ],
  suggestedQueries = [
    "¿Qué requisitos necesito para activar mi RUC presencialmente?",
    "¿Cómo cambiar de domicilio fiscal en mi Ficha RUC?"
  ],
  onQueryClick,
  theme = "light"
}: TramiteCardProps) {
  const isLight = theme === "light";
  const [openSections, setOpenSections] = useState<number[]>([0]); // 0: Descripcion abierta por defecto
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: "desc",
      icon: <DocumentTextRegular fontSize={16} color={isLight ? "#0056AC" : "#60A5FA"} />,
      label: "Descripción",
      count: null,
      items: [description]
    },
    {
      id: "req",
      icon: <DocumentBulletListMultipleRegular fontSize={16} color={isLight ? "#0056AC" : "#60A5FA"} />,
      label: "Requisitos",
      count: requirements.length,
      items: requirements
    },
    {
      id: "notes",
      icon: <WarningRegular fontSize={16} color="#F59E0B" />,
      label: "Consideraciones y Notas",
      count: considerations.length,
      items: considerations
    },
    {
      id: "steps",
      icon: <RocketRegular fontSize={16} color={isLight ? "#10B981" : "#34D399"} />,
      label: "Pasos para realizar el trámite",
      count: steps.length,
      items: steps
    }
  ];

  const toggleSection = (idx: number) => {
    haptic.light();
    setOpenSections(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    haptic.selection();
    if (openSections.length === sections.length) {
      setOpenSections([]);
    } else {
      setOpenSections(sections.map((_, i) => i));
    }
  };

  const handleCopy = () => {
    haptic.success();
    const textToCopy = `📌 ${title} (${entidad})
${description}

📋 REQUISITOS:
${requirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}

⚠️ CONSIDERACIONES:
${considerations.map((c, i) => `• ${c}`).join("\n")}

🚀 PASOS:
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Trámite copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeech = () => {
    haptic.medium();
    if (isSpeaking) {
      stopLotaSpeech();
      setIsSpeaking(false);
    } else {
      const speechText = `${title}. Entidad ${entidad}. ${description}. Requisitos: ${requirements.join(". ")}. Pasos principales: ${steps.join(". ")}`;
      setIsSpeaking(true);
      playLotaSpeech(speechText, {
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      borderRadius: 14,
      overflow: "hidden",
      border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)",
      background: isLight ? "#F7FBFF" : "#101928",
      boxShadow: isLight ? "0 4px 20px rgba(11, 30, 56, 0.05)" : "0 8px 30px rgba(0, 0, 0, 0.35)",
      fontFamily: "'Calibri', 'Carlito', 'Candara', 'Segoe UI', Inter, sans-serif"
    }}>
      {/* ── 1. Header Card ── */}
      <div style={{
        padding: "18px 22px 16px",
        background: isLight ? "#FFFFFF" : "#131E32",
        borderBottom: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <h3 style={{
          margin: "0 0 10px",
          fontSize: 18.5,
          fontWeight: 750,
          color: isLight ? "#0B1E38" : "#FFFFFF",
          letterSpacing: "-0.02em"
        }}>
          {title}
        </h3>

        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {entidad && (
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3.5px 10px",
              borderRadius: 100,
              background: isLight ? "#EDF3FA" : "rgba(255, 255, 255, 0.06)",
              border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)",
              fontSize: 11.5,
              fontWeight: 650,
              color: isLight ? "#0056AC" : "#93C5FD"
            }}>
              <BuildingRegular fontSize={13} /> {entidad}
            </span>
          )}
          {requiereClaveSol && (
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3.5px 10px",
              borderRadius: 100,
              background: isLight ? "#EDF3FA" : "rgba(255, 255, 255, 0.06)",
              border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)",
              fontSize: 11.5,
              fontWeight: 650,
              color: isLight ? "#EA580C" : "#FDBA74"
            }}>
              <KeyRegular fontSize={13} /> Requiere Clave SOL
            </span>
          )}
        </div>
      </div>

      {/* ── 2. Accordion Container ── */}
      <div style={{ background: isLight ? "#F7FBFF" : "#101928" }}>
        {/* Accordion Top Control */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 22px",
          background: isLight ? "#EDF3FA" : "#0D1521",
          borderBottom: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.06)"
        }}>
          <span style={{
            fontSize: 10.5,
            fontWeight: 800,
            color: isLight ? "#5A7898" : "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            Detalles del trámite (4 secciones)
          </span>
          <button
            onClick={toggleAll}
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: isLight ? "#0056AC" : "#60A5FA",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            {openSections.length === sections.length ? "Colapsar todo" : "Desplegar todo"}
          </button>
        </div>

        {/* Section items */}
        {sections.map((s, i) => {
          const isOpen = openSections.includes(i);
          return (
            <div 
              key={s.id} 
              style={{ 
                borderBottom: i < sections.length - 1 
                  ? (isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.06)") 
                  : "none" 
              }}
            >
              <button
                onClick={() => toggleSection(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 22px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>{s.icon}</span>
                <span style={{
                  fontWeight: 650,
                  fontSize: 13.5,
                  color: isLight ? "#0B1E38" : "#FFFFFF",
                  flex: 1,
                  letterSpacing: "-0.01em"
                }}>
                  {s.label}
                </span>
                {s.count !== null && (
                  <span style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: isLight ? "#5A7898" : "#94A3B8",
                    background: isLight ? "#EDF3FA" : "rgba(255, 255, 255, 0.06)",
                    padding: "2px 7px",
                    borderRadius: 6
                  }}>
                    {s.count} {s.count === 1 ? "ítem" : "ítems"}
                  </span>
                )}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                  <ChevronDownRegular fontSize={13} color={isLight ? "#5A7898" : "#94A3B8"} />
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
                    <div style={{ padding: "0 22px 14px 44px" }}>
                      {s.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                          {s.id !== "desc" && (
                            <span style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: isLight ? "#0056AC" : "#60A5FA",
                              flexShrink: 0,
                              marginTop: 7
                            }} />
                          )}
                          <span style={{
                            fontSize: 13.5,
                            color: isLight ? "#334155" : "#CBD5E1",
                            lineHeight: 1.55
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── 3. Suggested Queries (if any) ── */}
      {suggestedQueries && suggestedQueries.length > 0 && (
        <div style={{
          background: isLight ? "#F7FBFF" : "#101928",
          borderTop: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.06)",
          padding: "14px 22px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <LightbulbRegular fontSize={14} color="#F59E0B" />
            <span style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: isLight ? "#5A7898" : "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}>
              Consultas sugeridas
            </span>
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onQueryClick?.(q)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 100,
                  background: isLight ? "#EDF3FA" : "rgba(255, 255, 255, 0.05)",
                  border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)",
                  fontSize: 12.5,
                  color: isLight ? "#0B1E38" : "#E2E8F0",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                <span>{q}</span>
                <span style={{ fontSize: 11, color: isLight ? "#0056AC" : "#60A5FA" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. Official Links ── */}
      {officialLinks && officialLinks.length > 0 && (
        <div style={{
          background: isLight ? "#FFFFFF" : "#131E32",
          borderTop: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.06)",
          padding: "14px 22px 18px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <BuildingRegular fontSize={14} color={isLight ? "#0056AC" : "#60A5FA"} />
            <span style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: isLight ? "#5A7898" : "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}>
              Accesos y guías oficiales del Estado
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {officialLinks.map((link, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: isLight ? "#EDF3FA" : "rgba(255, 255, 255, 0.04)",
                  border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  gap: 12
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: isLight ? "#0056AC" : "#2563EB",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <OpenRegular fontSize={14} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontWeight: 650,
                      fontSize: 13,
                      color: isLight ? "#0B1E38" : "#FFFFFF",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {link.title}
                    </div>
                    {link.sub && (
                      <div style={{
                        fontSize: 11.5,
                        color: isLight ? "#5A7898" : "#94A3B8"
                      }}>
                        {link.sub}
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "5px 12px",
                    borderRadius: 8,
                    background: isLight ? "#0056AC" : "#2563EB",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    flexShrink: 0
                  }}
                >
                  Ingresar
                  <OpenRegular fontSize={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Action Strip ── */}
      <div style={{
        display: "flex",
        gap: 8,
        padding: "10px 22px 14px",
        background: isLight ? "#F7FBFF" : "#101928",
        borderTop: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.06)"
      }}>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.05)",
            border: isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)",
            fontSize: 12,
            fontWeight: 600,
            color: copied ? "#10B981" : (isLight ? "#5A7898" : "#94A3B8"),
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          {copied ? <CheckmarkRegular fontSize={13} /> : <CopyRegular fontSize={13} />}
          <span>{copied ? "Copiado" : "Copiar"}</span>
        </button>

        <button
          onClick={handleToggleSpeech}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            background: isSpeaking ? (isLight ? "#FEE2E2" : "rgba(220, 38, 38, 0.2)") : (isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.05)"),
            border: isSpeaking ? "1px solid #DC2626" : (isLight ? "1px solid #C9DDEF" : "1px solid rgba(255, 255, 255, 0.10)"),
            fontSize: 12,
            fontWeight: 600,
            color: isSpeaking ? "#DC2626" : (isLight ? "#5A7898" : "#94A3B8"),
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          {isSpeaking ? <SpeakerOffRegular fontSize={13} /> : <Speaker2Regular fontSize={13} />}
          <span>{isSpeaking ? "Detener" : "Escuchar"}</span>
        </button>
      </div>
    </div>
  );
}
