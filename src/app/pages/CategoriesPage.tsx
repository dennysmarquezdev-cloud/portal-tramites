import React from "react";
import { Tramite, Category, Page } from "../types";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { getEntityLogo, getCategoryIcon } from "../data/entityLogos";

// ══════════════════════════════════════════════════════════════════════════
// 10 CATEGORÍAS CIUDADANAS EXCLUSIVAS DE ENTIDADES CON PALETA DE 3 TONOS
// ══════════════════════════════════════════════════════════════════════════
export interface CivicEntity {
  acronym: string;
  description: string;
  promptContext: string;
}

export interface CivicCategory {
  id: string;
  name: string;
  order: number;
  columns: 1 | 2 | 3;
  // ── Paleta de 3 Tonos ──
  bgLight: string;      // Fondo / Chip
  baseColor: string;    // Base / Borde
  textColor: string;    // Texto / Énfasis
  // Dark mode adaptativo
  darkBg: string;
  darkBorder: string;
  darkText: string;
  // Entidades estrictas
  entities: CivicEntity[];
}

export const CIVIC_DIRECTORIES_DATA: CivicCategory[] = [
  // 1. Identidad, Trámites Civiles y Migración (Azul cobalto) -> RENIEC, MIGRACIONES
  {
    id: "identidad-civiles-migracion",
    name: "Identidad, Trámites Civiles y Migración",
    order: 1,
    columns: 1,
    bgLight: "#EFF6FF",
    baseColor: "#1E40AF",
    textColor: "#172554",
    darkBg: "rgba(30, 64, 175, 0.16)",
    darkBorder: "#2563EB",
    darkText: "#BFDBFE",
    entities: [
      {
        acronym: "RENIEC",
        description: "Emisión y renovación de DNI / DNIe, actas de nacimiento, matrimonio o defunción y certificados C4.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de RENIEC (DNI electrónico, duplicados, renovación, actas y certificados)."
      },
      {
        acronym: "MIGRACIONES",
        description: "Pasaportes biométricos, citas, control migratorio de extranjeros, prórrogas y movimiento migratorio.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de MIGRACIONES (Pasaporte biométrico, citas, extranjeros y movimiento migratorio)."
      }
    ]
  },

  // 2. Economía, Impuestos y Registros (Verde esmeralda) -> SUNAT, SUNARP, SBS, BN, SMV
  {
    id: "economia-impuestos-registros",
    name: "Economía, Impuestos y Registros",
    order: 2,
    columns: 3,
    bgLight: "#ECFDF5",
    baseColor: "#047857",
    textColor: "#064E3B",
    darkBg: "rgba(4, 120, 87, 0.16)",
    darkBorder: "#059669",
    darkText: "#A7F3D0",
    entities: [
      {
        acronym: "SUNAT",
        description: "RUC, Clave SOL, recibos por honorarios, comprobantes de pago y declaraciones tributarias.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de SUNAT (RUC, Clave SOL, Recibo por Honorarios, Formulario 1609 y facturación)."
      },
      {
        acronym: "SUNARP",
        description: "Registro de inmuebles, vehículos, personas y empresas, consulta vehicular y copias literales.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de SUNARP (Partidas registrales, consulta vehicular, predios y copias literales)."
      },
      {
        acronym: "SBS",
        description: "Supervisión del sistema financiero, reporte de deudas en central de riesgos y normativa de AFP.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de la SBS (Reporte de deudas, central de riesgos y AFP)."
      },
      {
        acronym: "BN",
        description: "Cuentas del Banco de la Nación, Cuenta DNI y pago de tasas administrativas en Págalo.pe.",
        promptContext: "Deseo consultar trámites y requisitos oficiales del Banco de la Nación (Pago de tasas en Págalo.pe y Cuenta DNI)."
      },
      {
        acronym: "SMV",
        description: "Supervisión del mercado de valores, fondos mutuos e inversiones financieras reguladas.",
        promptContext: "Deseo consultar información y trámites oficiales de la SMV (Mercado de valores y fondos mutuos)."
      }
    ]
  },

  // 3. Salud (Cian / Celeste médico) -> ESSALUD, SIS, MINSA, SUSALUD
  {
    id: "salud",
    name: "Salud",
    order: 3,
    columns: 2,
    bgLight: "#F0F9FF",
    baseColor: "#0284C7",
    textColor: "#0C4A6E",
    darkBg: "rgba(2, 132, 199, 0.16)",
    darkBorder: "#0EA5E9",
    darkText: "#BAE6FD",
    entities: [
      {
        acronym: "ESSALUD",
        description: "Seguro social de salud, acreditación de asegurados, centros asistenciales, citas y subsidios.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de EsSalud (Acreditación, centro asistencial, citas y subsidio de lactancia)."
      },
      {
        acronym: "SIS",
        description: "Seguro Integral de Salud gratuito, afiliación virtual, consulta de asegurado y cobertura médica.",
        promptContext: "Deseo consultar trámites y requisitos oficiales del SIS (Afiliación virtual, consulta de asegurado y cobertura médica)."
      },
      {
        acronym: "MINSA",
        description: "Carné de vacunación digital, establecimientos de salud pública y programas de prevención.",
        promptContext: "Deseo consultar trámites y requisitos oficiales del MINSA (Carné de vacunación digital y centros de salud)."
      },
      {
        acronym: "SUSALUD",
        description: "Defensa de los derechos en salud, atención de reclamos y fiscalización de IPRESS.",
        promptContext: "Deseo consultar sobre reclamos y defensa de derechos en salud ante SUSALUD."
      }
    ]
  },

  // 4. Trabajo y Pensiones (Terracota Ejecutivo) -> ONP, SUNAFIL, MTPE, AFP
  {
    id: "trabajo-pensiones",
    name: "Trabajo y Pensiones",
    order: 4,
    columns: 2,
    bgLight: "#FFF7ED",
    baseColor: "#C2410C",
    textColor: "#7C2D12",
    darkBg: "rgba(194, 65, 12, 0.16)",
    darkBorder: "#EA580C",
    darkText: "#FED7AA",
    entities: [
      {
        acronym: "ONP",
        description: "Pensión de jubilación, estado de aportes al Sistema Nacional de Pensiones (SNP) y trámites previsionales.",
        promptContext: "Deseo consultar trámites y requisitos oficiales de la ONP (Aportes al SNP, jubilación y pensiones)."
      },
      {
        acronym: "SUNAFIL",
        description: "Inspección laboral, derechos del trabajador, denuncias laborales virtuales y cálculo de liquidación.",
        promptContext: "Deseo consultar trámites y orientación oficial de SUNAFIL (Denuncia laboral virtual, planilla y liquidación laboral)."
      },
      {
        acronym: "MTPE",
        description: "Certificado Único Laboral (Certijoven / Certiadulto), empleo formal y bolsa de trabajo.",
        promptContext: "Deseo consultar trámites y requisitos oficiales del MTPE (Certificado Único Laboral y empleo formal)."
      },
      {
        acronym: "AFP",
        description: "Fondos de pensiones privados, estado de cuenta individual, aportes voluntarios y retiros autorizados.",
        promptContext: "Deseo consultar orientación y trámites sobre las AFP (Estado de cuenta, fondo previsional y retiros)."
      }
    ]
  },

  // 5. Transporte y Tránsito (Petróleo / Teal Puro) -> MTC, SUTRAN, SAT LIMA, ATU
  {
    id: "transporte-transito",
    name: "Transporte y Tránsito",
    order: 5,
    columns: 2,
    bgLight: "#F0FDFA",
    baseColor: "#0F766E",
    textColor: "#134E48",
    darkBg: "rgba(15, 118, 110, 0.16)",
    darkBorder: "#14B8A6",
    darkText: "#99F6E4",
    entities: [
      {
        acronym: "MTC",
        description: "Licencia de conducir (brevete A-I), récord del conductor, examen médico y sistema de puntos.",
        promptContext: "Deseo consultar trámites y requisitos oficiales del MTC (Licencia de conducir A-I, récord del conductor y puntos)."
      },
      {
        acronym: "SUTRAN",
        description: "Fiscalización del transporte terrestre nacional, verificación de papeletas viales e infracciones.",
        promptContext: "Deseo consultar trámites y papeletas de fiscalización terrestre ante SUTRAN."
      },
      {
        acronym: "SAT LIMA",
        description: "Papeletas de tránsito de Lima Metropolitana, impuesto vehicular, alcabala y tributos municipales.",
        promptContext: "Deseo consultar papeletas de tránsito e impuesto vehicular ante el SAT Lima."
      },
      {
        acronym: "ATU",
        description: "Transporte urbano de Lima y Callao, autorizaciones de servicio de taxi y fiscalización de rutas.",
        promptContext: "Deseo consultar trámites y habilitaciones de transporte urbano ante la ATU."
      }
    ]
  },

  // 6. Educación y Formación (Índigo) -> SUNEDU, MINEDU, PRONABEC
  {
    id: "educacion-formacion",
    name: "Educación y Formación",
    order: 6,
    columns: 3,
    bgLight: "#EEF2FF",
    baseColor: "#4338CA",
    textColor: "#312E81",
    darkBg: "rgba(67, 56, 202, 0.16)",
    darkBorder: "#6366F1",
    darkText: "#C7D2FE",
    entities: [
      {
        acronym: "SUNEDU",
        description: "Registro y verificación oficial de grados académicos, títulos universitarios y carné universitario.",
        promptContext: "Deseo consultar trámites y verificación oficial de grados y títulos en SUNEDU."
      },
      {
        acronym: "MINEDU",
        description: "Certificado oficial de estudios escolares, convalidaciones educativas y escalafón docente.",
        promptContext: "Deseo consultar trámites escolares y certificados de estudio ante el MINEDU."
      },
      {
        acronym: "PRONABEC",
        description: "Convocatorias y postulaciones a Beca 18, becas de posgrado y créditos educativos del Estado.",
        promptContext: "Deseo consultar requisitos y convocatorias de Beca 18 y programas de PRONABEC."
      }
    ]
  },

  // 7. Consumo, Regulación y Servicios (Púrpura / Morado) -> INDECOPI, OSIPTEL, OSINERGMIN, SEDAPAL, SEDAPAR
  {
    id: "consumo-regulacion-servicios",
    name: "Consumo, Regulación y Servicios",
    order: 7,
    columns: 3,
    bgLight: "#FAF5FF",
    baseColor: "#7C3AED",
    textColor: "#581C87",
    darkBg: "rgba(124, 58, 237, 0.16)",
    darkBorder: "#8B5CF6",
    darkText: "#DDD6FE",
    entities: [
      {
        acronym: "INDECOPI",
        description: "Protección y defensa del consumidor, Libro de Reclamaciones, marcas y propiedad intelectual.",
        promptContext: "Deseo consultar orientación sobre reclamos de consumidor y registro de marcas en INDECOPI."
      },
      {
        acronym: "OSIPTEL",
        description: "Servicios de telefonía móvil, internet fijo/hogar, reclamos y bloqueo de equipos IMEI.",
        promptContext: "Deseo consultar trámites de telecomunicaciones y bloqueo de IMEI ante OSIPTEL."
      },
      {
        acronym: "OSINERGMIN",
        description: "Supervisión del servicio eléctrico, tarifas de luz, combustibles y suministro de gas natural.",
        promptContext: "Deseo consultar reclamos de tarifas eléctricas y combustibles ante OSINERGMIN."
      },
      {
        acronym: "SEDAPAL",
        description: "Servicio de agua potable y alcantarillado en Lima y Callao, facturación y reportes de averías.",
        promptContext: "Deseo consultar trámites y facturación de agua potable en SEDAPAL."
      },
      {
        acronym: "SEDAPAR",
        description: "Servicio de agua potable y alcantarillado en Arequipa, trámites comerciales y estado de cuenta.",
        promptContext: "Deseo consultar trámites y estado de cuenta de agua en SEDAPAR Arequipa."
      }
    ]
  },

  // 8. Justicia, Legalidad y Orden (Gris pizarra) -> PODER JUDICIAL, INPE, MINJUSDH, PNP
  {
    id: "justicia-legalidad-orden",
    name: "Justicia, Legalidad y Orden",
    order: 8,
    columns: 2,
    bgLight: "#F1F5F9",
    baseColor: "#475569",
    textColor: "#0F172A",
    darkBg: "rgba(71, 85, 105, 0.16)",
    darkBorder: "#64748B",
    darkText: "#E2E8F0",
    entities: [
      {
        acronym: "PODER JUDICIAL",
        description: "Certificado de antecedentes penales electrónico y seguimiento de expedientes judiciales (CEJ).",
        promptContext: "Deseo consultar trámites del Poder Judicial (Antecedentes penales electrónicos y expedientes CEJ)."
      },
      {
        acronym: "INPE",
        description: "Certificado de antecedentes judiciales y trámites administrativos penitenciarios.",
        promptContext: "Deseo consultar sobre el certificado de antecedentes judiciales del INPE."
      },
      {
        acronym: "MINJUSDH",
        description: "Asistencia legal gratuita de la Defensa Pública, centros de conciliación y derechos humanos.",
        promptContext: "Deseo consultar orientación y asistencia legal gratuita ante el MINJUSDH (Defensa Pública)."
      },
      {
        acronym: "PNP",
        description: "Certificado de antecedentes policiales digital (CERAP), denuncias virtuales y citas policiales.",
        promptContext: "Deseo consultar trámites oficiales de la PNP (Antecedentes policiales digitales y denuncia virtual)."
      }
    ]
  },

  // 9. Sistema Electoral (Rojo cívico) -> ONPE, JNE
  {
    id: "sistema-electoral",
    name: "Sistema Electoral",
    order: 9,
    columns: 1,
    bgLight: "#FEF2F2",
    baseColor: "#DC2626",
    textColor: "#7F1D1D",
    darkBg: "rgba(220, 38, 38, 0.16)",
    darkBorder: "#EF4444",
    darkText: "#FECACA",
    entities: [
      {
        acronym: "ONPE",
        description: "Consulta de local de votación, miembros de mesa y resultados oficiales de elecciones.",
        promptContext: "Deseo consultar sobre local de votación, miembro de mesa y procesos electorales en la ONPE."
      },
      {
        acronym: "JNE",
        description: "Consulta de multas electorales, solicitudes de dispensa y Registro de Organizaciones Políticas.",
        promptContext: "Deseo consultar sobre multas electorales y solicitudes de dispensa ante el JNE."
      }
    ]
  },

  // 10. Recursos Naturales y Emergencias (Verde bosque) -> INDECI, OEFA, SERFOR, SENASA
  {
    id: "recursos-naturales-emergencias",
    name: "Recursos Naturales y Emergencias",
    order: 10,
    columns: 2,
    bgLight: "#F0FDF4",
    baseColor: "#15803D",
    textColor: "#14532D",
    darkBg: "rgba(21, 128, 61, 0.16)",
    darkBorder: "#22C55E",
    darkText: "#BBF7D0",
    entities: [
      {
        acronym: "INDECI",
        description: "Prevención y preparación ante desastres, planes familiares y guías de emergencia de Defensa Civil.",
        promptContext: "Deseo consultar orientación y guías de prevención de emergencias de INDECI."
      },
      {
        acronym: "OEFA",
        description: "Denuncias ambientales a través del SINADA y fiscalización ambiental a empresas.",
        promptContext: "Deseo consultar sobre denuncias de contaminación ambiental a través del SINADA / OEFA."
      },
      {
        acronym: "SERFOR",
        description: "Gestión sostenible de recursos forestales, protección de fauna silvestre y autorizaciones.",
        promptContext: "Deseo consultar trámites y normatividad de fauna y recursos forestales ante SERFOR."
      },
      {
        acronym: "SENASA",
        description: "Sanidad agraria, control fitosanitario, sanidad animal e inocuidad agroalimentaria.",
        promptContext: "Deseo consultar requisitos fitosanitarios y sanitarios oficiales en SENASA."
      }
    ]
  }
];

interface CategoriesPageProps {
  onSelect?: (t: Tramite) => void;
  favorites?: Set<string>;
  onFav?: (id: string) => void;
  categories?: Category[];
  tramites?: Tramite[];
  dbUpdated?: number;
  theme?: "light" | "dark";
  user?: any;
  onOpenPaywall?: () => void;
  onNavigate?: (p: Page, query?: string, entity?: string) => void;
  onLogin?: () => void;
}

export default function CategoriesPage({
  theme = "light",
  user,
  onOpenPaywall,
  onNavigate,
  onLogin
}: CategoriesPageProps) {
  const isLight = theme === "light";

  // Manejador del clic en la entidad: Abre el Chatbot con la entidad seleccionada
  const handleEntityClick = (ent: CivicEntity) => {
    sound.playClick();
    haptic.medium();
    
    // Iniciar Chatbot directamente enfocado en la entidad seleccionada
    onNavigate?.("frutilota", undefined, ent.acronym);
  };

  return (
    <div style={{ width: "100%", maxWidth: 1040, margin: "0 auto", padding: "24px 16px 80px", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .civic-cat-grid-1 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .civic-cat-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        @media (max-width: 600px) {
          .civic-cat-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        .civic-cat-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        @media (max-width: 768px) {
          .civic-cat-grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .civic-cat-grid-3 {
            grid-template-columns: 1fr;
          }
        }
        .civic-entity-box {
          position: relative;
          border-radius: 8px;
          transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
        }
        .civic-entity-box:hover,
        .civic-entity-box:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          z-index: 50;
        }
        .civic-entity-note {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.18s ease;
          z-index: 100;
          width: max-content;
          max-width: min(300px, 86vw);
          padding: 9px 13px;
          border-radius: 8px;
          text-align: center;
          white-space: normal;
          box-shadow: 0 12px 28px -4px rgba(11, 30, 56, 0.38), 0 4px 10px -2px rgba(11, 30, 56, 0.2);
        }
        .civic-entity-note::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: #0B1E38 transparent transparent transparent;
        }
        .civic-entity-box:hover .civic-entity-note,
        .civic-entity-box:focus-visible .civic-entity-note {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
      
      {/* ── Título Principal Único ── */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(24px, 3.6vw, 36px)",
          letterSpacing: "-0.03em",
          color: isLight ? "#0B1E38" : "#F0F6FC",
          margin: 0,
          lineHeight: 1.2
        }}>
          ¿Qué trámite necesitas resolver hoy?
        </h1>
      </div>

      {/* ── Bloques de Categorías con Espina Lateral y Cajas de Entidades ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {CIVIC_DIRECTORIES_DATA.map(cat => {
          const gridClass = cat.columns === 1 
            ? "civic-cat-grid-1" 
            : cat.columns === 2 
            ? "civic-cat-grid-2" 
            : "civic-cat-grid-3";

          return (
            <div
              key={cat.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                gap: 8
              }}
            >
              {/* Espina Lateral Vertical en Color Base con Nombre de Categoría */}
              <div
                style={{
                  background: cat.baseColor,
                  color: "#FFFFFF",
                  padding: "16px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 44,
                  maxWidth: 48,
                  borderRadius: 8,
                  flexShrink: 0,
                  userSelect: "none"
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 750,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {cat.name}
                </span>
              </div>

              {/* Área de Cajas de Entidades */}
              <div
                className={gridClass}
                style={{
                  flex: 1
                }}
              >
                {cat.entities.map(ent => {
                  const logoSrc = getEntityLogo(ent.acronym);

                  return (
                    <div
                      key={ent.acronym}
                      className="civic-entity-box"
                      onMouseEnter={() => {
                        sound.playHoverKey();
                        haptic.selection();
                      }}
                      onFocus={() => {
                        sound.playHoverKey();
                      }}
                      onClick={() => handleEntityClick(ent)}
                      style={{
                        background: isLight ? cat.bgLight : cat.darkBg,
                        border: isLight ? `1.5px solid ${cat.baseColor}40` : `1.5px solid ${cat.baseColor}60`,
                        borderRadius: 8,
                        minHeight: cat.columns === 1 ? 92 : 98,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 10px",
                        cursor: "pointer",
                        userSelect: "none",
                        boxShadow: isLight ? "0 1px 3px rgba(0,0,0,0.03)" : "none"
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleEntityClick(ent);
                        }
                      }}
                    >
                      {logoSrc ? (
                        <div style={{
                          width: "100%",
                          height: 68,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px 14px",
                          background: "#FFFFFF",
                          borderRadius: 6,
                          border: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.15)",
                          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
                          boxSizing: "border-box"
                        }}>
                          <img
                            src={logoSrc}
                            alt={`Logo oficial de ${ent.acronym}`}
                            style={{
                              maxHeight: 52,
                              maxWidth: "96%",
                              width: "auto",
                              height: "auto",
                              objectFit: "contain",
                              display: "block"
                            }}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div style={{
                          width: "100%",
                          height: 68,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px 12px",
                          background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.08)",
                          borderRadius: 6,
                          border: `1px solid ${cat.baseColor}30`,
                          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
                          boxSizing: "border-box"
                        }}>
                          <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 850,
                            fontSize: ent.acronym.length > 7 ? "clamp(15px, 1.8vw, 18px)" : "clamp(18px, 2.4vw, 24px)",
                            color: isLight ? cat.textColor : cat.darkText,
                            letterSpacing: ent.acronym.length > 7 ? "-0.02em" : "0.02em",
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%"
                          }}>
                            {ent.acronym}
                          </span>
                        </div>
                      )}

                      {/* Nota Descriptiva Flotante al Posar el Cursor */}
                      <div
                        className="civic-entity-note"
                        style={{
                          background: isLight ? "#0B1E38" : "#030712",
                          color: "#FFFFFF",
                          border: isLight ? "1px solid rgba(255, 255, 255, 0.15)" : `1px solid ${cat.baseColor}`
                        }}
                      >
                        <div style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 1.42,
                          color: "#F8FAFC"
                        }}>
                          {ent.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
