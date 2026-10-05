import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  OpenRegular, 
  CopyRegular, 
  CheckmarkRegular, 
  MicRegular, 
  MicOffRegular, 
  Speaker2Regular, 
  SpeakerOffRegular, 
  SearchRegular,
  DismissRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  SparkleFilled,
  SparkleRegular,
  SignOutRegular,
  ClockRegular,
  GlobeRegular,
  DocumentTextRegular,
  ArrowRightRegular,
  KeyRegular,
  PersonKeyRegular,
  ReceiptRegular,
  MoneyRegular,
  ScaleFillRegular,
  VehicleTruckRegular,
  ArrowResetRegular,
  CheckmarkCircleRegular,
  FilterRegular,
  BuildingBankRegular,
  ChevronDownRegular,
  PersonRegular,
  GridRegular,
  PinRegular,
  PinFilled,
  ArrowUpRegular,
  ArrowDownRegular,
  ArrowSortRegular,
  SettingsRegular,
  BookOpenRegular,
  QuestionCircleRegular
} from '@fluentui/react-icons';
import { useFrutilotaAI } from "../hooks/useFrutilotaAI";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { haptic } from "../utils/haptics";
import { sound } from "../utils/sound";
import { playLotaSpeech, stopLotaSpeech } from "../utils/speech";
import { getConcordantOfficialLinks } from "../utils/officialLinkMatcher";
import { ProgressiveDisclosureResponse } from "./ProgressiveDisclosureResponse";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { PaywallView } from "./PaywallView";
import { OnboardingGuideModal } from "./OnboardingGuideModal";
import { CIVIC_ENTITIES, findCivicEntity, buildEntityWelcomeMessage, getEntityVoiceExample } from "../data/civicEntities";
import { getEntityLogo } from "../data/entityLogos";
import { getEntityOfficialProcedures, DirectProcedureItem } from "../data/directProcedures";
import multiCatalogRaw from "../data/multi_entidades_catalogo.json";
import { AnimatedThemeIcon } from "./AnimatedThemeToggle";

function cleanText(str: string = ""): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// ── Palette & Typography Tokens ──────────────────────────────────────────────
const T = {
  sand:    "#EDF3FA",   // background — celeste muy suave
  cream:   "#F7FBFF",   // card surface
  ink:     "#0B1E38",   // navy profundo
  violet:  "#2F6CB5",   // primario — azul medio
  violet2: "#235294",   // hover
  lilac:   "#DCE9F8",   // azul tint surface
  coral:   "#4FADD4",   // celeste accent
  sage:    "#1E8A6E",   // éxito
  muted:   "#5A7898",   // texto secundario
  border:  "#C9DDEF",   // bordes celeste pálido
  strong:  "#0B1E38",   // headings
};

const G = `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const I = `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

// ── Entidades Oficiales del Estado ────────────────
function formatBadgeAcronym(acronym: string = ""): string {
  const clean = acronym.trim().toUpperCase();
  if (clean === "PODER JUDICIAL") return "PJ";
  if (clean === "BANCO DE LA NACIÓN" || clean === "BANCO DE LA NACION") return "BN";
  if (clean === "MIGRACIONES") return "MIG";
  if (clean === "OSINERGMIN") return "OSINERG";
  if (clean.length > 7) return clean.substring(0, 6) + "…";
  return clean;
}

function getBadgeFontSize(text: string): number {
  const len = text.length;
  if (len <= 3) return 10.5;
  if (len <= 4) return 9;
  if (len <= 5) return 8;
  if (len <= 6) return 7.2;
  return 6.5;
}

export interface CatalogItem {
  id: string;
  entidad: string;
  costo: string;
  modalidad?: string;
  tipo_acceso?: string;
  titulo: string;
  resumen_snippet?: string;
  url_guia?: string;
  action_url?: string;
}

// Catálogo Oficial Multi-Entidad compilado para el Drawer (3,033 trámites del Estado Peruano)
const COMPILED_CATALOG: CatalogItem[] = ((multiCatalogRaw as any[]) || []).map((t, idx) => ({
  id: String(t.id || idx + 1),
  entidad: t.entidad || "Estado Peruano",
  costo: t.costo || "Gratuito",
  modalidad: t.modalidad || "Virtual",
  tipo_acceso: t.publico_objetivo || "Oficial",
  titulo: t.titulo_oficial || t.title || t.titulo || "",
  resumen_snippet: t.descripcion || t.summary || t.resumen_snippet || "",
  url_guia: t.url || t.url_guia || "",
  action_url: t.action_url || t.url || "",
}));

export function matchEntityTramite(tramiteEntidad: string, actAcr: string, actId?: string, actName?: string): boolean {
  const normEnt = (tramiteEntidad || "").toUpperCase().trim();
  const acr = (actAcr || actId || "").toUpperCase().trim();
  const name = (actName || "").toUpperCase().trim();

  if (!normEnt || !acr) return false;
  if (normEnt === acr) return true;
  if (acr === "BN" && (normEnt === "BN" || normEnt.includes("BANCO DE LA NACION") || normEnt.includes("BANCO DE LA NACIÓN"))) return true;
  if ((acr === "PJ" || acr === "PODER JUDICIAL") && (normEnt === "PJ" || normEnt === "PODER JUDICIAL")) return true;
  if (acr === "ONP" && normEnt === "ONPE") return false;
  if (acr === "ONPE" && normEnt === "ONP") return false;
  if (acr === "SUNAT" && normEnt.startsWith("SUNA")) return normEnt === "SUNAT";
  if (acr === "SUNASS" && normEnt === "SUNARP") return false;
  if (acr === "SEDAPAL" && normEnt === "SEDAPAR") return false;
  if (acr === "SEDAPAR" && normEnt === "SEDAPAL") return false;

  if (name && normEnt === name) return true;
  if (normEnt.startsWith(acr + " ") || normEnt.endsWith(" " + acr)) return true;
  return false;
}

const ENTIDADES = CIVIC_ENTITIES.map(e => ({
  id: e.acronym,
  label: e.acronym,
  sub: e.description,
  color: e.color,
  category: e.category,
  name: e.name
}));

const COLLECTIONS = CIVIC_ENTITIES.map(e => {
  const count = COMPILED_CATALOG.filter(t => matchEntityTramite(t.entidad, e.acronym, e.id, e.name)).length;
  return {
    id: e.acronym,
    label: e.acronym,
    sub: e.name,
    count: `${count || e.popularProcedures.length} trámites`,
    color: e.color
  };
});

const ENTIDAD_CHIPS = [
  "Todos", 
  "RUC & Clave SOL", 
  "Comprobantes de Pago", 
  "Declaraciones & Tributos", 
  "Fraccionamiento & Deuda",
  "Aduanas & Comercio",
  "Gratuitos"
];

export interface CategoryMeta {
  type: 'ruc' | 'cpe' | 'renta' | 'deuda' | 'aduanas' | 'general';
  label: string;
  accentColor: string;
  bgTint: string;
  borderTint: string;
  icon: React.ReactNode;
}

export function getCategoryMeta(titulo: string, isDarkMode: boolean): CategoryMeta {
  const t = cleanText(titulo);
  
  if (/ruc|clave sol|registro unico|registro de contribuyente|ficha ruc|domicilio fiscal/i.test(t)) {
    return {
      type: 'ruc',
      label: 'RUC & Clave SOL',
      accentColor: isDarkMode ? "#93C5FD" : "#1E40AF",
      bgTint: isDarkMode ? "rgba(30, 58, 138, 0.22)" : "#F0F7FF",
      borderTint: isDarkMode ? "rgba(147, 197, 253, 0.28)" : "#DBEAFE",
      icon: <PersonKeyRegular fontSize={17} />
    };
  }
  
  if (/recibo|factura|boleta|comprobante|remision|gre|nota de credito|nota de debito|emision electronica|cpe/i.test(t)) {
    return {
      type: 'cpe',
      label: 'Comprobantes de Pago',
      accentColor: isDarkMode ? "#38BDF8" : "#0369A1",
      bgTint: isDarkMode ? "rgba(3, 105, 161, 0.2)" : "#F0F9FF",
      borderTint: isDarkMode ? "rgba(56, 189, 248, 0.28)" : "#E0F2FE",
      icon: <ReceiptRegular fontSize={17} />
    };
  }
  
  if (/fracciona|aplaz|deuda|saldo|devoluci|4949|embargo|coactiv|reclamaci|valores|queja|impugna|medida cautelar/i.test(t)) {
    return {
      type: 'deuda',
      label: 'Fraccionamiento & Deuda',
      accentColor: isDarkMode ? "#CBD5E1" : "#334155",
      bgTint: isDarkMode ? "rgba(51, 65, 85, 0.25)" : "#F1F5F9",
      borderTint: isDarkMode ? "rgba(203, 213, 225, 0.28)" : "#E2E8F0",
      icon: <ScaleFillRegular fontSize={17} />
    };
  }

  if (/aduan|importaci|exportaci|envio|courier|equipaje|manifiesto|arancel|drawback/i.test(t)) {
    return {
      type: 'aduanas',
      label: 'Aduanas & Comercio',
      accentColor: isDarkMode ? "#5EEAD4" : "#0F766E",
      bgTint: isDarkMode ? "rgba(15, 118, 110, 0.2)" : "#F0FDFA",
      borderTint: isDarkMode ? "rgba(94, 234, 212, 0.28)" : "#CCFBF1",
      icon: <VehicleTruckRegular fontSize={17} />
    };
  }
  
  if (/declaraci|renta|retenci|detracci|spot|1609|cuarta|quinta|tercera|tribut|621|709|plame|percepcion|impuesto|pago|pdt/i.test(t)) {
    return {
      type: 'renta',
      label: 'Declaraciones & Tributos',
      accentColor: isDarkMode ? "#A5B4FC" : "#4338CA",
      bgTint: isDarkMode ? "rgba(67, 56, 202, 0.2)" : "#EEF2FF",
      borderTint: isDarkMode ? "rgba(165, 180, 252, 0.28)" : "#E0E7FF",
      icon: <MoneyRegular fontSize={17} />
    };
  }
  
  return {
    type: 'general',
    label: 'Procedimiento Oficial',
    accentColor: isDarkMode ? "#94A3B8" : "#475569",
    bgTint: isDarkMode ? "rgba(148, 163, 184, 0.12)" : "#F8FAFC",
    borderTint: isDarkMode ? "rgba(148, 163, 184, 0.2)" : "#E2E8F0",
    icon: <DocumentTextRegular fontSize={17} />
  };
}

// Documentos Informativos y Legales Oficiales para el Sidebar
const FOOTER_DOCS: Record<string, { title: string; badge: string; content: React.ReactNode }> = {
  informacion: {
    title: "Información de ahorratiempo",
    badge: "Portal Cívico",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          <strong>ahorratiempo</strong> es una plataforma cívica digital independiente creada para ayudar a los ciudadanos peruanos a orientarse, conocer los requisitos actualizados y acceder a los trámites oficiales del Estado (SUNAT, RENIEC, MIGRACIONES, MTC, SUNARP, MINSA, ESSALUD, ONP y más).
        </p>
        <p style={{ margin: 0 }}>
          A través del asistente inteligente <strong>LOTA AI</strong>, puedes realizar consultas en lenguaje natural las 24 horas del día para evitar desplazamientos innecesarios y trámites engorrosos.
        </p>
      </div>
    )
  },
  derechos: {
    title: "Derechos de autor",
    badge: "Propiedad Intelectual",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          Todo el diseño, arquitectura, código de software y componentes interactivos de ahorratiempo son propiedad de sus desarrolladores © 2026 ahorratiempo.
        </p>
        <p style={{ margin: 0 }}>
          Los nombres de las instituciones, logotipos oficiales, procedimientos administrativos y normativas públicas corresponden a las respectivas entidades del Estado Peruano y se presentan con fines estrictamente informativos y de educación cívica.
        </p>
      </div>
    )
  },
  contactar: {
    title: "Contactar a ahorratiempo",
    badge: "Atención Ciudadana",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          Si tienes consultas, sugerencias de nuevos trámites o deseas reportar un enlace desactualizado, puedes escribirnos directamente a:
        </p>
        <div style={{ padding: "12px 14px", background: "rgba(2, 132, 199, 0.08)", borderRadius: 10, border: "1px solid rgba(2, 132, 199, 0.2)" }}>
          <div style={{ fontWeight: 700, color: "#0284C7", fontSize: 14 }}>contacto@ahorratiempo.pe</div>
          <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>Mesa de ayuda digital y soporte técnico</div>
        </div>
      </div>
    )
  },
  creadores: {
    title: "Equipo Creador",
    badge: "Desarrollo Peruano",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          ahorratiempo es un proyecto concebido y desarrollado en el Perú por ingenieros y diseñadores comprometidos con la transformación digital ciudadana.
        </p>
        <p style={{ margin: 0 }}>
          Nuestra misión es hacer que la información del Estado sea accesible, clara, rápida y comprensible para todos los peruanos en cualquier dispositivo.
        </p>
      </div>
    )
  },
  terminos: {
    title: "Términos y condiciones",
    badge: "Condiciones de Uso",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          1. <strong>Naturaleza informativa:</strong> ahorratiempo y el asistente LOTA AI proporcionan orientación referencial basada en fuentes públicas oficiales. No sustituyen los actos resolutivos ni las mesas de partes oficiales.
        </p>
        <p style={{ margin: 0 }}>
          2. <strong>Gratuidad y transparencia:</strong> Las consultas informativas son de acceso abierto. Nunca solicitamos pagos a cuentas no oficiales ni comisiones por trámites gratuitos del Estado.
        </p>
        <p style={{ margin: 0 }}>
          3. <strong>Responsabilidad:</strong> El usuario es responsable de verificar los requisitos finales en los enlaces directos provistos hacia cada portal oficial del Estado (.gob.pe).
        </p>
      </div>
    )
  },
  privacidad: {
    title: "Política de privacidad",
    badge: "Ley N° 29733",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          En cumplimiento con la <strong>Ley N° 29733</strong> (Ley de Protección de Datos Personales del Perú), respetamos y protegemos la privacidad de cada usuario:
        </p>
        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          <li>No almacenamos ni solicitamos claves privadas (Clave SOL, contraseña DNIe ni tokens bancarios).</li>
          <li>Las consultas se procesan en sesiones anónimas y seguras.</li>
          <li>No comercializamos información de usuarios a terceras empresas.</li>
        </ul>
      </div>
    )
  },
  seguridad: {
    title: "Política y seguridad",
    badge: "Protección Digital",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          La seguridad de nuestros usuarios es prioritaria:
        </p>
        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          <li>Conexión protegida con cifrado TLS 1.3 / HTTPS de última generación.</li>
          <li>Filtro y verificación contra sitios fraudulentos, direccionando exclusivamente a dominios institucionales oficiales del Estado (.gob.pe).</li>
          <li>Protección de identidad y aislamiento de sesiones.</li>
        </ul>
      </div>
    )
  },
  comofunciona: {
    title: "Cómo funciona ahorratiempo",
    badge: "Guía de Uso",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          Ahorra horas de búsqueda y colas en 3 sencillos pasos:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ padding: "8px 12px", background: "rgba(2, 132, 199, 0.06)", borderRadius: 8, borderLeft: "3px solid #0284C7" }}>
            <strong>1. Selecciona la entidad o escribe tu trámite:</strong> Elige SUNAT, RENIEC, MTC u otra institución, o formula una consulta en tus propias palabras.
          </div>
          <div style={{ padding: "8px 12px", background: "rgba(2, 132, 199, 0.06)", borderRadius: 8, borderLeft: "3px solid #0284C7" }}>
            <strong>2. LOTA AI te orienta con los requisitos oficiales:</strong> Sintetiza los requisitos clave, pasos a seguir, tiempos y modalidades (digital o presencial).
          </div>
          <div style={{ padding: "8px 12px", background: "rgba(2, 132, 199, 0.06)", borderRadius: 8, borderLeft: "3px solid #0284C7" }}>
            <strong>3. Accede al canal oficial:</strong> Sigue el paso a paso estructurado y haz clic en el botón directo para iniciar el trámite en el portal del Estado.
          </div>
        </div>
      </div>
    )
  }
};

export interface FrutilotaMascotProps {
  initialEntity?: string;
  initialQuery?: string;
  onQueryEvent?: () => void;
  user?: any;
  onBack?: () => void;
  onOpenLogin?: () => void;
  onOpenPaywall?: () => void;
  onLogout?: () => void;
  theme?: "light" | "dark";
  toggleTheme?: () => void;
  onGoToCatalog?: () => void;
}

// ── Paletas Temáticas Estilo ChatGPT para Subcategorías de Trámites ──
const CHATGPT_SUBCATEGORY_PALETTES = [
  // 0. Azul Cobalto (Identidad, DNI, Pasaportes, Ciudadanía)
  {
    light: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", dot: "#2563EB" },
    dark:  { bg: "rgba(37, 99, 235, 0.16)", border: "rgba(37, 99, 235, 0.38)", text: "#93C5FD", dot: "#3B82F6" }
  },
  // 1. Verde Esmeralda (Tributos, RUC, Impuestos, Finanzas)
  {
    light: { bg: "#ECFDF5", border: "#A7F3D0", text: "#065F46", dot: "#10B981" },
    dark:  { bg: "rgba(16, 185, 129, 0.16)", border: "rgba(16, 185, 129, 0.38)", text: "#6EE7B7", dot: "#10B981" }
  },
  // 2. Ámbar / Naranja Cálido (Propiedad, Registros, Predios, Inmuebles, Vehicular)
  {
    light: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E", dot: "#F59E0B" },
    dark:  { bg: "rgba(245, 158, 11, 0.16)", border: "rgba(245, 158, 11, 0.38)", text: "#FDE68A", dot: "#F59E0B" }
  },
  // 3. Rosa / Carmesí Suave (Salud, Citas Médicas, Seguros, Hospital)
  {
    light: { bg: "#FFF1F2", border: "#FECDD3", text: "#9F1239", dot: "#F43F5E" },
    dark:  { bg: "rgba(244, 63, 94, 0.16)", border: "rgba(244, 63, 94, 0.38)", text: "#FECDD3", dot: "#FB7185" }
  },
  // 4. Violeta / Púrpura (Transporte, Brevetes, Licencias, Tránsito)
  {
    light: { bg: "#F5F3FF", border: "#DDD6FE", text: "#5B21B6", dot: "#8B5CF6" },
    dark:  { bg: "rgba(139, 92, 246, 0.16)", border: "rgba(139, 92, 246, 0.38)", text: "#DDD6FE", dot: "#A78BFA" }
  },
  // 5. Índigo Profundo (Educación, Becas, Títulos, Constancias)
  {
    light: { bg: "#EEF2FF", border: "#C7D2FE", text: "#3730A3", dot: "#6366F1" },
    dark:  { bg: "rgba(99, 102, 241, 0.16)", border: "rgba(99, 102, 241, 0.38)", text: "#C7D2FE", dot: "#818CF8" }
  },
  // 6. Cian / Turquesa (Justicia, Legalidad, Certificados, Registros Civiles)
  {
    light: { bg: "#ECFEFF", border: "#A5F3FC", text: "#155E75", dot: "#06B6D4" },
    dark:  { bg: "rgba(6, 182, 212, 0.16)", border: "rgba(6, 182, 212, 0.38)", text: "#A5F3FC", dot: "#22D3EE" }
  },
  // 7. Amarillo Dorado / Ámbar (Riesgos, Seguridad, Biometría, Alertas)
  {
    light: { bg: "#FEF3C7", border: "#FDE047", text: "#854D0E", dot: "#EAB308" },
    dark:  { bg: "rgba(234, 179, 8, 0.16)", border: "rgba(234, 179, 8, 0.38)", text: "#FEF08A", dot: "#FACC15" }
  },
  // 8. Verde Azulado / Teal (Servicios, Extras, Agua, Consultas Generales)
  {
    light: { bg: "#F0FDFA", border: "#99F6E4", text: "#115E59", dot: "#14B8A6" },
    dark:  { bg: "rgba(20, 184, 166, 0.16)", border: "rgba(20, 184, 166, 0.38)", text: "#99F6E4", dot: "#2DD4BF" }
  }
];

function getSubcategoryTheme(catName: string, isDarkMode: boolean, index: number) {
  const norm = (catName || "").toLowerCase();
  let paletteIdx = index % CHATGPT_SUBCATEGORY_PALETTES.length;

  if (/identidad|dni|pasaporte|ciudadan|extranjer/i.test(norm)) {
    paletteIdx = 0; // Azul
  } else if (/tribut|ruc|impuesto|finanz|econom|factur|pago|honorario/i.test(norm)) {
    paletteIdx = 1; // Verde
  } else if (/propiedad|inmueble|predio|vehicul|placa|partida|titul/i.test(norm)) {
    paletteIdx = 2; // Ámbar/Naranja
  } else if (/salud|cita|medic|seguro|essalud|minsa|hospital/i.test(norm)) {
    paletteIdx = 3; // Rosa
  } else if (/transporte|brevete|licencia|transit|conducir|mtc/i.test(norm)) {
    paletteIdx = 4; // Violeta
  } else if (/educac|beca|titul|grado|estudio|colegio|minedu/i.test(norm)) {
    paletteIdx = 5; // Índigo
  } else if (/actas|registro civil|justic|legal|poder|judicial/i.test(norm)) {
    paletteIdx = 6; // Cian
  } else if (/riesgo|seguridad|alerta|biometr|c4|garant/i.test(norm)) {
    paletteIdx = 7; // Dorado
  } else if (/servicio|extra|agua|luz|general/i.test(norm)) {
    paletteIdx = 8; // Teal
  }

  const p = CHATGPT_SUBCATEGORY_PALETTES[paletteIdx];
  return isDarkMode ? p.dark : p.light;
}


export interface GroupedCategory {
  id: string;
  name: string;
  icon?: string;
  barColor: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textLight: string;
  bgDark: string;
  borderDark: string;
  textDark: string;
  entityAcronyms: string[];
}

export const NATIONAL_CATEGORIES: GroupedCategory[] = [
  {
    id: "economia-finanzas",
    name: "Economía, Impuestos y Registros",
    icon: "💰",
    barColor: "#006039",
    color: "#059669",
    bgLight: "#F0FDF4",
    borderLight: "#A7F3D0",
    textLight: "#064E3B",
    bgDark: "rgba(6, 95, 70, 0.22)",
    borderDark: "rgba(52, 211, 153, 0.4)",
    textDark: "#6EE7B7",
    entityAcronyms: ["SUNAT", "SUNARP", "SBS", "BN", "SMV"]
  },
  {
    id: "identidad",
    name: "Identidad, Trámites Civiles y Migración",
    icon: "🪪",
    barColor: "#0B2F86",
    color: "#1E40AF",
    bgLight: "#EFF6FF",
    borderLight: "#BFDBFE",
    textLight: "#1E3A8A",
    bgDark: "rgba(30, 58, 138, 0.22)",
    borderDark: "rgba(96, 165, 250, 0.4)",
    textDark: "#93C5FD",
    entityAcronyms: ["RENIEC", "MIGRACIONES"]
  },
  {
    id: "salud",
    name: "Salud y Seguridad Social",
    icon: "🏥",
    barColor: "#0E7490",
    color: "#0284C7",
    bgLight: "#ECFEFF",
    borderLight: "#A5F3FC",
    textLight: "#155E75",
    bgDark: "rgba(14, 116, 144, 0.22)",
    borderDark: "rgba(34, 211, 238, 0.4)",
    textDark: "#67E8F9",
    entityAcronyms: ["ESSALUD", "SIS", "MINSA", "SUSALUD"]
  },
  {
    id: "trabajo-pensiones",
    name: "Trabajo, Empleo y Pensiones",
    icon: "💼",
    barColor: "#9A3412",
    color: "#EA580C",
    bgLight: "#FFF7ED",
    borderLight: "#FED7AA",
    textLight: "#9A3412",
    bgDark: "rgba(154, 52, 18, 0.22)",
    borderDark: "rgba(251, 146, 60, 0.4)",
    textDark: "#FDBA74",
    entityAcronyms: ["ONP", "SUNAFIL", "MTPE", "AFP"]
  },
  {
    id: "transporte-nacional",
    name: "Transporte y Tránsito Nacional",
    icon: "🚗",
    barColor: "#334155",
    color: "#0D9488",
    bgLight: "#F8FAFC",
    borderLight: "#CBD5E1",
    textLight: "#1E293B",
    bgDark: "rgba(51, 65, 85, 0.3)",
    borderDark: "rgba(148, 163, 184, 0.4)",
    textDark: "#CBD5E1",
    entityAcronyms: ["MTC", "SUTRAN"]
  },
  {
    id: "educacion",
    name: "Educación, Becas y Formación",
    icon: "🎓",
    barColor: "#3730A3",
    color: "#4F46E5",
    bgLight: "#EEF2FF",
    borderLight: "#C7D2FE",
    textLight: "#3730A3",
    bgDark: "rgba(55, 48, 163, 0.22)",
    borderDark: "rgba(129, 140, 248, 0.4)",
    textDark: "#A5B4FC",
    entityAcronyms: ["SUNEDU", "MINEDU", "PRONABEC"]
  },
  {
    id: "justicia-orden",
    name: "Justicia, Legalidad y Orden Policial",
    icon: "⚖️",
    barColor: "#1F2937",
    color: "#475569",
    bgLight: "#F3F4F6",
    borderLight: "#D1D5DB",
    textLight: "#111827",
    bgDark: "rgba(31, 41, 55, 0.35)",
    borderDark: "rgba(156, 163, 175, 0.4)",
    textDark: "#E5E7EB",
    entityAcronyms: ["PODER JUDICIAL", "PNP", "MINJUSDH", "INPE"]
  },
  {
    id: "electoral",
    name: "Sistema Electoral",
    icon: "🗳️",
    barColor: "#991B1B",
    color: "#DC2626",
    bgLight: "#FEF2F2",
    borderLight: "#FECACA",
    textLight: "#991B1B",
    bgDark: "rgba(153, 27, 27, 0.22)",
    borderDark: "rgba(248, 113, 113, 0.4)",
    textDark: "#FCA5A5",
    entityAcronyms: ["ONPE", "JNE"]
  },
  {
    id: "consumo-regulacion",
    name: "Consumo y Regulación de Servicios",
    icon: "🏢",
    barColor: "#5B21B6",
    color: "#7C3AED",
    bgLight: "#FAF5FF",
    borderLight: "#DDD6FE",
    textLight: "#5B21B6",
    bgDark: "rgba(91, 33, 182, 0.22)",
    borderDark: "rgba(192, 132, 252, 0.4)",
    textDark: "#DDD6FE",
    entityAcronyms: ["INDECOPI", "OSIPTEL", "OSINERGMIN"]
  },
  {
    id: "recursos-emergencias",
    name: "Recursos Naturales, Producción y Emergencias",
    icon: "🌿",
    barColor: "#166534",
    color: "#16A34A",
    bgLight: "#F0FDF4",
    borderLight: "#BBF7D0",
    textLight: "#166534",
    bgDark: "rgba(22, 101, 52, 0.22)",
    borderDark: "rgba(74, 222, 128, 0.4)",
    textDark: "#86EFAC",
    entityAcronyms: ["INDECI", "OEFA", "SERFOR", "SENASA", "PRODUCE"]
  }
];

export const REGIONAL_CATEGORIES: GroupedCategory[] = [
  {
    id: "servicios-regionales",
    name: "Servicios Regionales y Entidades Locales",
    icon: "🏙️",
    barColor: "#1E40AF",
    color: "#0284C7",
    bgLight: "#EFF6FF",
    borderLight: "#BFDBFE",
    textLight: "#1E40AF",
    bgDark: "rgba(30, 64, 175, 0.22)",
    borderDark: "rgba(96, 165, 250, 0.4)",
    textDark: "#93C5FD",
    entityAcronyms: ["SEDAPAL", "SEDAPAR", "SAT LIMA", "ATU"]
  }
];


export function FrutilotaMascot({
  initialEntity = "SUNAT",
  initialQuery = "",
  onQueryEvent,
  user,
  onBack,
  onOpenLogin,
  onOpenPaywall,
  onLogout,
  theme = "light",
  toggleTheme,
  onGoToCatalog
}: FrutilotaMascotProps) {
  const isPlus = useMemo(() => {
    return user?.isPremium === true || (user?.email || "").toLowerCase() === "plaeis260@gmail.com";
  }, [user]);

  const [selectedEntity, setSelectedEntity] = useState<string | null>(() => {
    if (initialQuery) {
      return initialEntity ? findCivicEntity(initialEntity).acronym : "SUNAT";
    }
    return null; // Initial state: show all entities directory
  });
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryCategory, setDirectoryCategory] = useState("all");
  const [entity, setEntity] = useState(() => (initialEntity ? findCivicEntity(initialEntity).acronym : "SUNAT"));
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const [entityFilterText, setEntityFilterText] = useState("");
  const activeEntity = useMemo(() => findCivicEntity(entity), [entity]);

  useEffect(() => {
    if (initialEntity) {
      setEntity(findCivicEntity(initialEntity).acronym);
    }
  }, [initialEntity]);

  const handleSwitchEntity = (newAcronym: string) => {
    haptic.selection();
    const matched = findCivicEntity(newAcronym);
    setEntity(matched.acronym);
    setSelectedEntity(matched.acronym);
    setEntityDropdownOpen(false);
    setProcSearchQuery("");
    setSelectedCategory("all");
    clearChat();
  };

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const [catEntidad, setCatEntidad] = useState("Todos");
  const [catalogPage, setCatalogPage] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isCatalogHovered, setIsCatalogHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFooterDoc, setActiveFooterDoc] = useState<{ title: string; badge: string; content: React.ReactNode } | null>(null);
  const [procSearchQuery, setProcSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [sidebarProfileMenuOpen, setSidebarProfileMenuOpen] = useState(false);
  const sidebarProfileMenuRef = useRef<HTMLDivElement>(null);

  const isDarkMode = theme === "dark";

  // Entidades fijadas y orden personalizado en Sidebar
  const [pinnedEntities, setPinnedEntities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ahorratiempo_sidebar_pinned");
      if (saved) return JSON.parse(saved);
    } catch {}
    return ["SUNAT", "RENIEC", "MIGRACIONES", "MTC"];
  });

  const [customOrder, setCustomOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ahorratiempo_sidebar_order");
      if (saved) return JSON.parse(saved);
    } catch {}
    return CIVIC_ENTITIES.map(e => e.acronym);
  });

  const [draggedEntityAcronym, setDraggedEntityAcronym] = useState<string | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const isTouchDraggingRef = useRef(false);
  const hasTouchMovedRef = useRef(false);
  const lastTouchTimeRef = useRef<number>(0);

  const [sidebarEntitySearch, setSidebarEntitySearch] = useState("");
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const mobileEntitiesBarRef = useRef<HTMLDivElement>(null);

  const toggleCategoryExpand = (catKey: string) => {
    sound.playClick();
    haptic.selection();
    setExpandedCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  useEffect(() => {
    if (mobileEntitiesBarRef.current) {
      const activeEl = mobileEntitiesBarRef.current.querySelector(`[data-mobile-entity="${entity.toUpperCase()}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [entity]);

  const savePinnedEntities = (newList: string[]) => {
    setPinnedEntities(newList);
    try {
      localStorage.setItem("ahorratiempo_sidebar_pinned", JSON.stringify(newList));
    } catch {}
  };

  const saveCustomOrder = (newOrder: string[]) => {
    setCustomOrder(newOrder);
    try {
      localStorage.setItem("ahorratiempo_sidebar_order", JSON.stringify(newOrder));
    } catch {}
  };

  const swapEntities = (sourceAcr: string, targetAcr: string) => {
    if (!sourceAcr || !targetAcr || sourceAcr.toUpperCase() === targetAcr.toUpperCase()) return;
    
    // Obtenemos la lista completa ordenada actual
    const currentOrder = [...customOrder];
    CIVIC_ENTITIES.forEach(e => {
      if (!currentOrder.some(a => a.toUpperCase() === e.acronym.toUpperCase())) {
        currentOrder.push(e.acronym);
      }
    });

    const sourceIdx = currentOrder.findIndex(a => a.toUpperCase() === sourceAcr.toUpperCase());
    const targetIdx = currentOrder.findIndex(a => a.toUpperCase() === targetAcr.toUpperCase());
    if (sourceIdx === -1 || targetIdx === -1) return;

    const [moved] = currentOrder.splice(sourceIdx, 1);
    currentOrder.splice(targetIdx, 0, moved);

    saveCustomOrder(currentOrder);
    haptic.selection();
    sound.playHoverKey();
  };

  const handleDragStart = (acronym: string, e: React.DragEvent) => {
    setDraggedEntityAcronym(acronym);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", acronym);
    haptic.selection();
    sound.playHoverKey();
  };

  const handleDragOver = (targetAcronym: string, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedEntityAcronym && draggedEntityAcronym.toUpperCase() !== targetAcronym.toUpperCase()) {
      swapEntities(draggedEntityAcronym, targetAcronym);
    }
  };

  const handleDragEnd = () => {
    if (draggedEntityAcronym) {
      setDraggedEntityAcronym(null);
      haptic.success();
      sound.playClick();
      toast.success("Posición guardada");
    }
  };

  const handleTouchStart = (acronym: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    isTouchDraggingRef.current = false;
    hasTouchMovedRef.current = false;
    
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }

    // 380ms de pulsación sostenida (long-press) activa el modo de reordenamiento
    touchTimerRef.current = setTimeout(() => {
      isTouchDraggingRef.current = true;
      setDraggedEntityAcronym(acronym);
      haptic.medium();
      sound.playHoverKey();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try { navigator.vibrate([40, 30, 40]); } catch {}
      }
    }, 380);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touchStartPosRef.current) return;
    
    const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);

    // Si el usuario desliza más de 10px antes de que se cumpla el long-press, es un SCROLL
    if (!isTouchDraggingRef.current) {
      if (deltaX > 10 || deltaY > 10) {
        hasTouchMovedRef.current = true;
        if (touchTimerRef.current) {
          clearTimeout(touchTimerRef.current);
          touchTimerRef.current = null;
        }
      }
      return;
    }

    // Si ya está activo el modo arrastre (long-press completado):
    if (isTouchDraggingRef.current && draggedEntityAcronym) {
      if (e.cancelable) e.preventDefault(); // Prevenir scroll mientras se reordena

      // Bounding box hit testing para reordenar fluidamente en móviles
      const cards = document.querySelectorAll<HTMLElement>("[data-entity-acronym]");
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const targetAcronym = card.getAttribute("data-entity-acronym");
        if (!targetAcronym || targetAcronym.toUpperCase() === draggedEntityAcronym.toUpperCase()) {
          continue;
        }

        const rect = card.getBoundingClientRect();
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          swapEntities(draggedEntityAcronym, targetAcronym);
          break;
        }
      }
    }
  };

  const handleTouchEnd = (acronym: string) => {
    lastTouchTimeRef.current = Date.now();
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }

    if (isTouchDraggingRef.current) {
      // Fin del arrastre
      isTouchDraggingRef.current = false;
      setDraggedEntityAcronym(null);
      haptic.success();
      sound.playClick();
      toast.success("Posición guardada");
    } else if (!hasTouchMovedRef.current) {
      // Tap normal intencional (el usuario tocó sin deslizar / sin hacer scroll)
      sound.playClick();
      haptic.selection();
      setEntity(acronym);
      clearChat();
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        setChatSidebarOpen(false);
      }
    }

    touchStartPosRef.current = null;
    hasTouchMovedRef.current = false;
  };

  const handleTouchCancel = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    if (isTouchDraggingRef.current) {
      isTouchDraggingRef.current = false;
      setDraggedEntityAcronym(null);
    }
    touchStartPosRef.current = null;
    hasTouchMovedRef.current = false;
  };

  const handleTogglePin = (acronym: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    haptic.selection();
    sound.playClick();
    const isPinned = pinnedEntities.includes(acronym);
    let nextPinned: string[];
    if (isPinned) {
      nextPinned = pinnedEntities.filter(a => a !== acronym);
      toast.info(`${acronym} desfijada`);
    } else {
      nextPinned = [acronym, ...pinnedEntities.filter(a => a !== acronym)];
      toast.success(`📌 ${acronym} fijada como favorita`);
    }
    savePinnedEntities(nextPinned);
  };

  const displayEntitiesList = useMemo(() => {
    const entityMap = new Map(CIVIC_ENTITIES.map(c => [c.acronym.toUpperCase(), c]));
    const ordered: typeof CIVIC_ENTITIES = [];
    const added = new Set<string>();

    // 1. Sigue el customOrder exacto
    customOrder.forEach(acr => {
      const ent = entityMap.get(acr.toUpperCase());
      if (ent && !added.has(ent.acronym.toUpperCase())) {
        ordered.push(ent);
        added.add(ent.acronym.toUpperCase());
      }
    });

    // 2. Agrega cualquier entidad restante
    CIVIC_ENTITIES.forEach(ent => {
      if (!added.has(ent.acronym.toUpperCase())) {
        ordered.push(ent);
        added.add(ent.acronym.toUpperCase());
      }
    });

    // 3. Filtro de búsqueda
    if (sidebarEntitySearch.trim()) {
      const q = cleanText(sidebarEntitySearch);
      return ordered.filter(c => cleanText(c.acronym).includes(q) || cleanText(c.name || "").includes(q) || cleanText(c.description || "").includes(q));
    }

    return ordered;
  }, [customOrder, sidebarEntitySearch]);

  const filteredDirectoryEntities = useMemo(() => {
    let list = displayEntitiesList;
    if (directoryCategory !== "all") {
      list = list.filter(e => {
        const cat = e.category || "";
        if (directoryCategory === "identidad") return /identidad|migra/i.test(cat);
        if (directoryCategory === "tributos") return /econom|impuest|registr/i.test(cat);
        if (directoryCategory === "salud") return /salud|seguridad social|bienestar/i.test(cat);
        if (directoryCategory === "transporte") return /transporte|tránsito/i.test(cat);
        if (directoryCategory === "justicia") return /justicia|trabajo|empleo/i.test(cat);
        if (directoryCategory === "educacion") return /educaci|empren/i.test(cat);
        if (directoryCategory === "servicios") return /vivienda|energ|básicos/i.test(cat);
        return true;
      });
    }
    if (directorySearch.trim()) {
      const q = cleanText(directorySearch);
      list = list.filter(c => cleanText(c.acronym).includes(q) || cleanText(c.name || "").includes(q) || cleanText(c.description || "").includes(q));
    }
    return list;
  }, [displayEntitiesList, directoryCategory, directorySearch]);

  const displayName = useMemo(() => {
    if (user?.displayName) return user.displayName.trim().split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "Usuario";
  }, [user]);
  const fullDisplayName = user?.displayName || displayName;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarProfileMenuRef.current && !sidebarProfileMenuRef.current.contains(e.target as Node)) {
        setSidebarProfileMenuOpen(false);
      }
    };
    if (sidebarProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarProfileMenuOpen]);

  const handlePerformLogout = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    haptic.medium();
    sound.playClick();
    setSidebarProfileMenuOpen(false);
    if (onLogout) {
      onLogout();
      toast.success("Has cerrado sesión exitosamente.");
    }
  };

  const handleToggleThemeFromMenu = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    haptic.selection();
    sound.playHoverKey();
    if (toggleTheme) {
      toggleTheme();
      toast.success(isDarkMode ? "Modo Claro activado" : "Modo Oscuro activado");
    }
  };

  // ── Paleta Exacta Estilo ChatGPT (Dark Canvas #212121, Sidebar #171717, Card #2F2F2F | Light Canvas #FFFFFF, Sidebar #F9F9F9, Card #FFFFFF) ──
  const D = useMemo(() => {
    return isDarkMode ? {
      bg:          "#212121",   // ChatGPT Canvas Dark
      sidebar:     "#171717",   // ChatGPT Sidebar Dark
      cardBg:      "#2F2F2F",   // ChatGPT Card / Bubble Dark
      text:        "#ECECEC",   // ChatGPT High-contrast Text Dark
      muted:       "#B4B4B4",   // ChatGPT Muted Text Dark
      border:      "#303030",   // ChatGPT Clean Border Dark
      ink:         "#ECECEC",
      inputBg:     "#2F2F2F",   // ChatGPT Input Box Dark
      itemHov:     "#2A2A2A",
      chip:        "#2F2F2F",
      chipAct:     "#10A37F",
      userMsgBg:   "#2F2F2F",
      userMsgText: "#ECECEC",
      userMsgBorder: "rgba(255, 255, 255, 0.1)",
    } : {
      bg:          "#FFFFFF",   // ChatGPT Canvas Light
      sidebar:     "#F9F9F9",   // ChatGPT Sidebar Light
      cardBg:      "#FFFFFF",   // ChatGPT Card Light
      text:        "#0D0D0D",   // ChatGPT Text Light
      muted:       "#737373",   // ChatGPT Muted Text Light
      border:      "#E5E5E5",   // ChatGPT Border Light
      ink:         "#0D0D0D",
      inputBg:     "#F4F4F4",   // ChatGPT Input Box Light
      itemHov:     "#ECECEC",   // ChatGPT Hover Light
      chip:        "#F4F4F4",
      chipAct:     "#0D0D0D",
      userMsgBg:   "#F4F4F4",   // ChatGPT User Bubble Light
      userMsgText: "#0D0D0D",
      userMsgBorder: "#E5E5E5",
    };
  }, [isDarkMode]);

  const {
    messages,
    input,
    setInput,
    isThinking,
    handleSend,
    clearChat,
    stopGeneration
  } = useFrutilotaAI("", entity);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Límite de 2 consultas gratuitas para usuarios no PLUS
  const FREE_QUERY_LIMIT = 2;
  const [queryCount, setQueryCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("lota_guest_queries") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const executeQuery = useCallback((textToSend?: string) => {
    const queryText = textToSend !== undefined ? textToSend : input;
    if (!queryText.trim() || isThinking) return;

    if (!isPlus && queryCount >= FREE_QUERY_LIMIT) {
      haptic.error();
      setShowPaywallModal(true);
      toast.info("Has alcanzado el límite de 2 consultas de prueba. Suscríbete para continuar con acceso ilimitado.");
      return;
    }

    if (!isPlus) {
      const nextCount = queryCount + 1;
      setQueryCount(nextCount);
      try {
        localStorage.setItem("lota_guest_queries", String(nextCount));
      } catch {}
    }

    if (onQueryEvent) onQueryEvent();
    handleSend(textToSend);
  }, [input, isThinking, isPlus, queryCount, onQueryEvent, handleSend]);

  // Enviar consulta inicial si fue provista
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      executeQuery(initialQuery);
    }
  }, [initialQuery, executeQuery]);

  // Reiniciar página del catálogo al filtrar o cambiar entidad
  useEffect(() => {
    setCatalogPage(0);
  }, [catSearch, entity]);

  // Auto-desplazamiento del catálogo hacia la derecha cada 6 segundos
  useEffect(() => {
    if (!catalogOpen || !isAutoSliding || isCatalogHovered) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCatalogPage(p => p + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [catalogOpen, isAutoSliding, isCatalogHovered]);

  // Auto scroll al final cuando lleguen mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Teclado: Cerrar con Escape y navegar páginas con flechas
  useEffect(() => {
    if (!catalogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCatalogOpen(false);
      } else if (e.key === "ArrowRight") {
        setSlideDirection(1);
        setCatalogPage(p => p + 1);
      } else if (e.key === "ArrowLeft") {
        setSlideDirection(-1);
        setCatalogPage(p => Math.max(0, p - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [catalogOpen]);

  const isVoiceTriggeredRef = useRef<boolean>(false);
  const lastSpokenMsgIdRef = useRef<string | null>(null);

  const toggleSpeak = useCallback((msgId: string, content: string) => {
    haptic.medium();
    if (speakingMsgId === msgId) {
      stopLotaSpeech();
      setSpeakingMsgId(null);
    } else {
      stopLotaSpeech();
      setSpeakingMsgId(msgId);
      // Limpiar markdown básico para lectura fluida
      const plainText = content.replace(/[#*_`[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
      playLotaSpeech(plainText, {
        onEnd: () => setSpeakingMsgId(null),
        onError: () => setSpeakingMsgId(null)
      });
    }
  }, [speakingMsgId]);

  // ── Sistema de Reconocimiento de Voz Continuo e Inteligente (LOTA Voice AI) ──
  const {
    isListening,
    interimTranscript,
    audioLevel,
    cancelListening: cancelVoiceInput,
    toggleListening: toggleVoiceInput
  } = useSpeechRecognition({
    lang: "es-PE",
    silenceTimeoutMs: 1800,
    onInterim: (liveText) => {
      setInput(liveText);
    },
    onResult: (finalCleanedText) => {
      if (finalCleanedText && finalCleanedText.trim()) {
        setInput(finalCleanedText);
        isVoiceTriggeredRef.current = true;
        executeQuery(finalCleanedText);
      }
    }
  });

  // Auto-reproducir respuesta por voz cuando la consulta fue iniciada por dictado de voz
  useEffect(() => {
    if (isVoiceTriggeredRef.current && !isThinking && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (
        lastMsg &&
        lastMsg.role === 'assistant' &&
        !lastMsg.isTyping &&
        !lastMsg.isError &&
        lastMsg.content &&
        lastSpokenMsgIdRef.current !== lastMsg.id
      ) {
        lastSpokenMsgIdRef.current = lastMsg.id;
        isVoiceTriggeredRef.current = false;
        toggleSpeak(lastMsg.id, lastMsg.content);
      }
    }
  }, [messages, isThinking, toggleSpeak]);

  const handleCopy = (msgId: string, content: string, links?: any[]) => {
    haptic.success();
    let text = content;
    if (links && links.length > 0) {
      text += "\n\nAccesos oficiales:\n" + links.map(l => `- ${typeof l === 'object' ? (l.title || l.titulo || l.url) : l}`).join("\n");
    }
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    toast.success("Respuesta copiada");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const onFormSubmit = () => {
    isVoiceTriggeredRef.current = false;
    executeQuery();
  };

  // Historial dinámico agrupado (vacío para nuevos usuarios)
  const groupedHistory = useMemo(() => {
    const userMsgs = messages.filter(m => m.role === 'user');
    if (userMsgs.length === 0) {
      return [];
    }

    return [
      {
        group: "Hoy",
        items: userMsgs.map((m) => ({
          title: m.content
        }))
      }
    ];
  }, [messages]);

  // ── Temporizador de 10 Segundos de Inactividad para Consultas Frecuentes ──
  const [showFrequentQueries, setShowFrequentQueries] = useState(false);

  useEffect(() => {
    // Si hay mensajes en la conversación o el usuario está escribiendo o usando el micrófono, ocultamos
    if (
      messages.length > 0 || 
      input.trim().length > 0 || 
      isListening || 
      (interimTranscript && interimTranscript.trim().length > 0)
    ) {
      setShowFrequentQueries(false);
      return;
    }

    // Iniciar conteo de 10 segundos de inactividad
    setShowFrequentQueries(false);
    const timer = setTimeout(() => {
      setShowFrequentQueries(true);
    }, 10000); // 10 segundos exactos

    return () => clearTimeout(timer);
  }, [messages.length, input, isListening, interimTranscript, entity]);

  return (
    <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: D.bg, fontFamily: I }}>
      <style>{`
        .chat-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.18)"} transparent;
        }
        .chat-sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-sidebar-scroll::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.18)"};
          border-radius: 999px;
        }
        .chat-sidebar-scroll:hover::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.32)" : "rgba(0, 0, 0, 0.32)"};
        }
        .youtube-sidebar-link:hover {
          color: ${isDarkMode ? "#F8FAFC" : "#0F172A"} !important;
          text-decoration: underline;
        }
        .embedded-entities-shelf {
          display: flex;
          width: 100%;
          max-width: 660px;
          overflow-x: auto;
          gap: 8px;
          padding: 6px 2px 12px;
          margin-bottom: 12px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .mobile-bottom-entities-bar::-webkit-scrollbar,
        .desktop-top-entities-header::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .mob-hide-entity-logo {
            display: none !important;
          }
          .desktop-top-entities-header {
            display: none !important;
          }
          .dynamic-official-procedures-container {
            padding: 14px 14px 28px !important;
          }
          .proc-item-mobile-hidden {
            display: none !important;
          }
          .chat-empty {
            padding: 38px 12px 16px !important;
            justify-content: flex-start !important;
            min-height: min-content !important;
          }
          .embedded-entities-shelf {
            padding: 4px 2px 10px;
            margin-bottom: 10px;
          }
        }
        @media (min-width: 769px) {
          .desktop-top-entities-header {
            display: flex !important;
          }
          .proc-ver-mas-container {
            display: none !important;
          }
        }
        .mob-entity-chip:active,
        .mob-entity-cube:active {
          transform: scale(0.93) !important;
        }
        @keyframes slowEyeBlink {
          0%, 60% {
            opacity: 1;
            transform: scaleY(1) scaleX(1);
            filter: brightness(1);
          }
          70% {
            opacity: 0.65;
            transform: scaleY(0.84) scaleX(0.99);
            filter: brightness(0.93);
          }
          76% {
            opacity: 0.36;
            transform: scaleY(0.68) scaleX(0.975);
            filter: brightness(0.86);
          }
          83% {
            opacity: 0.72;
            transform: scaleY(0.92) scaleX(0.992);
            filter: brightness(0.96);
          }
          90%, 100% {
            opacity: 1;
            transform: scaleY(1) scaleX(1);
            filter: brightness(1);
          }
        }
        .prompt-chip-btn {
          transform-origin: center center;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.18s ease, 
                      background-color 0.18s ease, 
                      box-shadow 0.18s ease;
          will-change: transform;
        }
        .prompt-chip-btn:hover {
          transform: translateY(-1px) scale(1.015) !important;
          background-color: ${isDarkMode ? "#2A2A2A" : "#F9FAFB"} !important;
          border-color: ${isDarkMode ? "rgba(255, 255, 255, 0.25)" : "#D1D5DB"} !important;
          box-shadow: ${isDarkMode 
            ? "0 3px 10px rgba(0, 0, 0, 0.45)" 
            : "0 2px 8px rgba(0, 0, 0, 0.06)"} !important;
        }
        .prompt-chip-btn:active {
          transform: translateY(0px) scale(0.98) !important;
        }
      `}</style>
      

        

      {/* ── 2. Modal de Catálogo Completo (Ventana Universal en 2 Columnas con Deslizamiento Automático / Paginado) ── */}
      <AnimatePresence>
        {catalogOpen && (() => {
          const catColor = activeEntity.categoryColor || activeEntity.color || T.violet;
          const bgLight = activeEntity.categoryBgLight || "#F0F9FF";

          // Lista de procedimientos según la entidad activa
          let baseList: {
            id: string;
            titulo: string;
            resumen: string;
            costo: string;
            acceso: string;
            url?: string;
          }[] = [];

          const entityProcedures = COMPILED_CATALOG.filter(t => 
            matchEntityTramite(t.entidad, activeEntity.acronym, activeEntity.id, activeEntity.name)
          );

          if (entityProcedures.length > 0) {
            baseList = entityProcedures.map(t => ({
              id: t.id,
              titulo: t.titulo,
              resumen: t.resumen_snippet || `Trámite normativo oficial de ${activeEntity.acronym || activeEntity.name}.`,
              costo: t.costo || "Gratuito",
              acceso: /clave sol/i.test(t.tipo_acceso || "") ? "Clave SOL" : (t.modalidad || "En línea"),
              url: t.action_url || t.url_guia
            }));
          } else {
            baseList = (activeEntity.popularProcedures || []).map((p, idx) => ({
              id: String(idx + 1),
              titulo: p.title,
              resumen: p.description,
              costo: "Gratuito",
              acceso: "En línea",
              url: p.url
            }));
          }

          const q = cleanText(catSearch);
          const listToDisplay = baseList.filter(p => {
            if (!q) return true;
            return cleanText(p.titulo).includes(q) || cleanText(p.resumen).includes(q);
          });

          // Paginación en 2 columnas: 6 trámites por vista (2 cols x 3 filas) para aprovechar el espacio y alta nitidez
          const ITEMS_PER_PAGE = 6;
          const totalPages = Math.max(1, Math.ceil(listToDisplay.length / ITEMS_PER_PAGE));
          const safePage = ((catalogPage % totalPages) + totalPages) % totalPages;
          const currentPageItems = listToDisplay.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

          const handleNext = () => {
            haptic.selection();
            setSlideDirection(1);
            setCatalogPage(p => p + 1);
          };

          const handlePrev = () => {
            haptic.selection();
            setSlideDirection(-1);
            setCatalogPage(p => (p === 0 ? totalPages - 1 : p - 1));
          };

          // Paleta editorial ultra-nítida inspirada en Notion (máxima legibilidad & contraste calibrado)
          const notion = {
            bg: isDarkMode ? "#0E131F" : "#F8FAFC",
            cardBg: isDarkMode ? "#161F30" : "#FFFFFF",
            cardBorder: isDarkMode ? "rgba(255, 255, 255, 0.09)" : "#E2E8F0",
            headerBg: isDarkMode ? "#111827" : "#FFFFFF",
            subHeaderBg: isDarkMode ? "#0F172A" : "#F1F5F9",
            title: isDarkMode ? "#F8FAFC" : "#0F172A",
            textSub: isDarkMode ? "#94A3B8" : "#475569",
            textMuted: isDarkMode ? "#64748B" : "#64748B",
            border: isDarkMode ? "rgba(255, 255, 255, 0.10)" : "#E2E8F0",
            inputBg: isDarkMode ? "#161F30" : "#FFFFFF",
            inputBorder: isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#CBD5E1",
            pillDefaultBg: isDarkMode ? "rgba(255, 255, 255, 0.07)" : "#F1F5F9",
            pillDefaultText: isDarkMode ? "#E2E8F0" : "#334155",
            pillDefaultBorder: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#CBD5E1",
            pillGreenBg: isDarkMode ? "rgba(16, 185, 129, 0.15)" : "#ECFDF5",
            pillGreenText: isDarkMode ? "#34D399" : "#047857",
            pillGreenBorder: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "#A7F3D0",
            pillAmberBg: isDarkMode ? "rgba(245, 158, 11, 0.15)" : "#FFFBEB",
            pillAmberText: isDarkMode ? "#FBBF24" : "#B45309",
            pillAmberBorder: isDarkMode ? "rgba(245, 158, 11, 0.3)" : "#FDE68A",
            lotaActionText: isDarkMode ? "#38BDF8" : "#0284C7",
            btnNavBg: isDarkMode ? "#1E293B" : "#FFFFFF",
            btnNavBorder: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#CBD5E1",
            btnNavText: isDarkMode ? "#F1F5F9" : "#1E293B",
            divider: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"
          };

          return (
            <div 
              className="catalog-modal-overlay"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box"
              }}
            >
              <style>{`
                .catalog-modal-overlay {
                  padding: 16px;
                }
                .catalog-modal-window {
                  width: min(1080px, 96vw);
                  height: min(88vh, 760px);
                  border-radius: 14px;
                }
                .catalog-header {
                  padding: 14px 22px;
                  gap: 14px;
                }
                .catalog-subbar {
                  padding: 10px 22px;
                  gap: 12px;
                }
                .catalog-content-scroll {
                  padding: 16px 22px;
                }
                .catalog-twocol-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 12px 14px;
                  width: 100%;
                }
                .catalog-dots-footer {
                  padding: 10px 20px;
                }
                .catalog-card-notion {
                  padding: 14px 16px;
                  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
                }
                .catalog-card-notion:hover {
                  transform: translateY(-1px);
                  border-color: ${isDarkMode ? "rgba(255,255,255,0.18)" : "#C7C5C0"} !important;
                  box-shadow: ${isDarkMode ? "0 4px 12px rgba(0,0,0,0.5)" : "0 3px 10px rgba(55, 53, 47, 0.07)"} !important;
                }

                @media (max-width: 680px) {
                  .catalog-modal-overlay {
                    padding: 6px !important;
                  }
                  .catalog-modal-window {
                    width: 100% !important;
                    height: 94vh !important;
                    border-radius: 12px !important;
                  }
                  .catalog-header {
                    padding: 11px 13px !important;
                    gap: 10px !important;
                  }
                  .catalog-subbar {
                    padding: 8px 11px !important;
                    gap: 8px !important;
                  }
                  .catalog-content-scroll {
                    padding: 10px 10px !important;
                  }
                  .catalog-twocol-grid {
                    grid-template-columns: 1fr !important;
                    gap: 9px !important;
                  }
                  .catalog-dots-footer {
                    padding: 8px 8px !important;
                  }
                  .catalog-card-notion {
                    padding: 12px 13px !important;
                  }
                }
              `}</style>

              {/* Backdrop sobrio desenfocado */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setCatalogOpen(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDarkMode ? "rgba(15, 15, 15, 0.78)" : "rgba(35, 38, 43, 0.5)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              />

              {/* Ventana Modal Institucional del Catálogo (Estilo Notion) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ type: "spring", damping: 28, stiffness: 340 }}
                className="catalog-modal-window"
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: notion.bg,
                  border: `1px solid ${notion.border}`,
                  boxShadow: isDarkMode 
                    ? "0 20px 60px -10px rgba(0,0,0,0.8)" 
                    : "0 20px 50px -12px rgba(55, 53, 47, 0.12)",
                  overflow: "hidden",
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Header Institucional */}
                <div className="catalog-header" style={{
                  borderBottom: `1px solid ${notion.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: notion.headerBg,
                  flexShrink: 0
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: "1 1 auto" }}>
                    {/* Badge Institucional / Logo de la Entidad */}
                    {(() => {
                      const logoSrc = getEntityLogo(activeEntity.acronym);
                      if (logoSrc) {
                        return (
                          <div style={{
                            width: 44,
                            minWidth: 44,
                            maxWidth: 44,
                            height: 36,
                            minHeight: 36,
                            maxHeight: 36,
                            borderRadius: 7,
                            background: "#FFFFFF",
                            border: `1px solid ${notion.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2px 5px",
                            flexShrink: 0,
                            boxShadow: "0 1px 2px rgba(55, 53, 47, 0.04)",
                            boxSizing: "border-box",
                            overflow: "hidden"
                          }}>
                            <img
                              src={logoSrc}
                              alt={activeEntity.acronym}
                              style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
                              loading="lazy"
                            />
                          </div>
                        );
                      }
                      const badgeText = formatBadgeAcronym(activeEntity.acronym);
                      return (
                        <div style={{
                          width: 42,
                          minWidth: 42,
                          maxWidth: 42,
                          height: 36,
                          minHeight: 36,
                          maxHeight: 36,
                          borderRadius: 7,
                          background: "#FFFFFF",
                          border: `1px solid ${notion.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: notion.title,
                          fontWeight: 750,
                          fontFamily: G,
                          fontSize: badgeText.length > 5 ? 8 : (badgeText.length > 3 ? 9.5 : 11.5),
                          letterSpacing: "-0.01em",
                          flexShrink: 0,
                          boxShadow: "0 1px 2px rgba(55, 53, 47, 0.04)",
                          textAlign: "center",
                          padding: "0 4px",
                          boxSizing: "border-box",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          lineHeight: 1
                        }}>
                          {badgeText}
                        </div>
                      );
                    })()}

                    <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                      <h2 style={{ 
                        margin: 0, 
                        fontFamily: G, 
                        fontSize: 16.5, 
                        fontWeight: 700, 
                        color: notion.title, 
                        letterSpacing: "-0.015em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        Catálogo Oficial
                      </h2>
                      <p style={{ 
                        margin: "1px 0 0", 
                        fontFamily: I, 
                        fontSize: 11.5, 
                        color: notion.textSub, 
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {activeEntity.name}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCatalogOpen(false)} 
                    aria-label="Cerrar catálogo"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      border: `1px solid ${notion.btnNavBorder}`,
                      background: notion.btnNavBg,
                      color: notion.btnNavText,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      flexShrink: 0
                    }}
                  >
                    <DismissRegular fontSize={15} />
                  </button>
                </div>

                {/* Sub-barra: Buscador + Controles de Paginación */}
                <div className="catalog-subbar" style={{
                  borderBottom: `1px solid ${notion.divider}`,
                  background: notion.subHeaderBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0
                }}>
                  {/* Buscador */}
                  <div style={{ position: "relative", flex: "1 1 0", minWidth: 0, maxWidth: 360 }}>
                    <SearchRegular 
                      style={{ 
                        position: "absolute", 
                        left: 9, 
                        top: "50%", 
                        transform: "translateY(-50%)", 
                        color: notion.textMuted,
                        pointerEvents: "none" 
                      }} 
                      fontSize={13.5} 
                    />
                    <input 
                      value={catSearch} 
                      onChange={e => setCatSearch(e.target.value)} 
                      placeholder={`Buscar trámite de ${activeEntity.acronym}...`} 
                      style={{
                        width: "100%",
                        height: 33,
                        padding: "0 26px 0 28px",
                        borderRadius: 6,
                        border: `1px solid ${notion.inputBorder}`,
                        background: notion.inputBg,
                        color: notion.title,
                        fontFamily: I,
                        fontSize: 12,
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                    {catSearch && (
                      <button
                        onClick={() => setCatSearch("")}
                        style={{
                          position: "absolute",
                          right: 7,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: notion.textMuted,
                          padding: 0
                        }}
                      >
                        <DismissRegular fontSize={12} />
                      </button>
                    )}
                  </div>

                  {/* Controles de Paginación (Fijos y sin salto de línea) */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    {/* Indicador de Página (whiteSpace nowrap estricto) */}
                    <span style={{
                      fontFamily: I,
                      fontSize: 12,
                      fontWeight: 650,
                      color: notion.textSub,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      padding: "0 2px"
                    }}>
                      {safePage + 1} / {totalPages}
                    </span>

                    {/* Botones Anterior / Siguiente */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={totalPages <= 1}
                        aria-label="Página anterior"
                        style={{
                          width: 27,
                          height: 27,
                          borderRadius: 6,
                          border: `1px solid ${notion.btnNavBorder}`,
                          background: notion.btnNavBg,
                          color: notion.btnNavText,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: totalPages <= 1 ? "not-allowed" : "pointer",
                          opacity: totalPages <= 1 ? 0.35 : 1,
                          transition: "all 0.15s ease",
                          flexShrink: 0
                        }}
                      >
                        <ChevronLeftRegular fontSize={12} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={totalPages <= 1}
                        aria-label="Página siguiente"
                        style={{
                          width: 27,
                          height: 27,
                          borderRadius: 6,
                          border: `1px solid ${notion.btnNavBorder}`,
                          background: notion.btnNavBg,
                          color: notion.btnNavText,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: totalPages <= 1 ? "not-allowed" : "pointer",
                          opacity: totalPages <= 1 ? 0.35 : 1,
                          transition: "all 0.15s ease",
                          flexShrink: 0
                        }}
                      >
                        <ChevronRightRegular fontSize={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contenedor de Vista de 2 Columnas */}
                <div 
                  className="catalog-content-scroll"
                  onMouseEnter={() => setIsCatalogHovered(true)}
                  onMouseLeave={() => setIsCatalogHovered(false)}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    background: notion.bg,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  {listToDisplay.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={safePage}
                        initial={{ opacity: 0, x: slideDirection * 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -slideDirection * 28 }}
                        transition={{ duration: 0.18, ease: "easeInOut" }}
                        className="catalog-twocol-grid"
                      >
                        {currentPageItems.map((t, idx) => {
                          return (
                            <div
                              key={t.id || idx}
                              onMouseEnter={() => sound.playHoverKey()}
                              onClick={() => { 
                                sound.playClick();
                                haptic.medium();
                                setCatalogOpen(false);
                                executeQuery(`Deseo consultar requisitos, procedimiento oficial y accesos para: "${t.titulo}"`); 
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: 10,
                                border: `1px solid ${notion.cardBorder}`,
                                background: notion.cardBg,
                                cursor: "pointer",
                                textAlign: "left",
                                minHeight: 110,
                                boxSizing: "border-box",
                                boxShadow: isDarkMode 
                                  ? "0 2px 5px rgba(0, 0, 0, 0.45)" 
                                  : "0 1px 3px rgba(15, 23, 42, 0.05)",
                              }}
                              className="catalog-card-notion"
                            >
                              <div>
                                {/* Fila Superior: Badges (Modalidad) y Número de Trámite */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9, gap: 6 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", flex: "1 1 auto", minWidth: 0 }}>
                                    {t.acceso && (
                                      <span style={{
                                        fontFamily: I,
                                        fontSize: 10.5,
                                        fontWeight: 650,
                                        color: notion.pillDefaultText,
                                        background: notion.pillDefaultBg,
                                        border: `1px solid ${notion.pillDefaultBorder}`,
                                        padding: "2px 7px",
                                        borderRadius: 5,
                                        whiteSpace: "nowrap",
                                        letterSpacing: "0.01em",
                                        WebkitFontSmoothing: "antialiased"
                                      }}>
                                        {t.acceso}
                                      </span>
                                    )}
                                  </div>

                                  <span style={{
                                    fontFamily: I,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: notion.textMuted,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                    letterSpacing: "0.02em"
                                  }}>
                                    #{safePage * ITEMS_PER_PAGE + idx + 1}
                                  </span>
                                </div>

                                {/* Título de Trámite Nítido con Alta Definición */}
                                <h3 style={{
                                  margin: "0",
                                  fontFamily: G,
                                  fontSize: "15px",
                                  fontWeight: 700,
                                  color: notion.title,
                                  lineHeight: 1.38,
                                  letterSpacing: "-0.015em",
                                  WebkitFontSmoothing: "antialiased",
                                  textRendering: "geometricPrecision"
                                }}>
                                  {t.titulo}
                                </h3>
                              </div>

                              {/* Barra Inferior de Acción */}
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingTop: 9,
                                marginTop: 9,
                                gap: 6,
                                flexWrap: "wrap",
                                borderTop: `1px solid ${notion.divider}`
                              }}>
                                <span style={{
                                  fontFamily: I,
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: notion.lotaActionText,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  whiteSpace: "nowrap",
                                  WebkitFontSmoothing: "antialiased"
                                }}>
                                  Consultar con LOTA AI <ArrowRightRegular fontSize={11} />
                                </span>

                                {t.url && (
                                  <a
                                    href={t.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    style={{
                                      fontFamily: I,
                                      fontSize: 11,
                                      fontWeight: 650,
                                      color: notion.textSub,
                                      textDecoration: "none",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 3.5,
                                      padding: "2.5px 7.5px",
                                      borderRadius: 5,
                                      background: notion.pillDefaultBg,
                                      border: `1px solid ${notion.pillDefaultBorder}`,
                                      whiteSpace: "nowrap",
                                      WebkitFontSmoothing: "antialiased",
                                      transition: "all 0.15s ease"
                                    }}
                                  >
                                    Portal oficial <OpenRegular fontSize={10} />
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}

                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div style={{ 
                      padding: "50px 20px", 
                      textAlign: "center", 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      gap: 8 
                    }}>
                      <h4 style={{ margin: 0, fontFamily: G, fontSize: 15.5, fontWeight: 650, color: notion.title }}>
                        No se encontraron trámites
                      </h4>
                      <p style={{ margin: 0, fontFamily: I, fontSize: 13, color: notion.textSub }}>
                        Prueba buscando con otras palabras clave.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Modal: Puntos Indicadores de Páginas (Adaptables) */}
                {totalPages > 1 && (
                  <div className="catalog-dots-footer" style={{
                    borderTop: `1px solid ${notion.divider}`,
                    background: notion.subHeaderBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    flexShrink: 0,
                    overflowX: "auto",
                    maxWidth: "100%",
                    boxSizing: "border-box"
                  }}>
                    {Array.from({ length: totalPages }).map((_, pIdx) => {
                      const isVisibleDot = totalPages <= 12 || Math.abs(pIdx - safePage) <= 4 || pIdx === 0 || pIdx === totalPages - 1;
                      if (!isVisibleDot) return null;
                      return (
                        <button
                          key={pIdx}
                          onClick={() => {
                            haptic.selection();
                            setSlideDirection(pIdx > safePage ? 1 : -1);
                            setCatalogPage(pIdx);
                          }}
                          aria-label={`Ir a página ${pIdx + 1}`}
                          style={{
                            width: pIdx === safePage ? 16 : 5,
                            height: 5,
                            borderRadius: 2.5,
                            background: pIdx === safePage 
                              ? notion.title 
                              : (isDarkMode ? "rgba(255,255,255,0.2)" : "#D3D2CE"),
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            transition: "all 0.2s ease",
                            flexShrink: 0
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* ── 3. Contenedor Principal a Pantalla Completa (Sin Sidebar) ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: D.bg, transition: "background 0.25s", position: "relative", height: "100%", overflow: "hidden" }}>
        
        {/* ── Top Bar Sutil: Solo Perfil de Google Disimulado ── */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "8px 18px",
          borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E7EB"}`,
          background: isDarkMode ? "#171717" : "#FFFFFF",
          flexShrink: 0,
          zIndex: 40,
          boxShadow: isDarkMode ? "0 1px 4px rgba(0,0,0,0.4)" : "0 1px 3px rgba(0,0,0,0.02)"
        }}>
          {/* Perfil de Google Disimulado */}
          <div style={{ position: "relative" }} ref={sidebarProfileMenuRef}>
            {user ? (
              /* Usuario conectado con Google */
              <div
                onClick={() => {
                  sound.playHoverKey();
                  haptic.selection();
                  setSidebarProfileMenuOpen(prev => !prev);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 9px 4px 5px",
                  borderRadius: 20,
                  background: isDarkMode ? "#262626" : "#F1F5F9",
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"}`,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  userSelect: "none"
                }}
                title="Opciones de tu cuenta Google"
              >
                {/* Avatar Google */}
                <div style={{
                  width: 25,
                  height: 25,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: isDarkMode ? "#333333" : "#E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid #D1D5DB"
                }}>
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "Google"} 
                      referrerPolicy="no-referrer"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 700, color: isDarkMode ? "#ECECEC" : "#1F2937" }}>{initial}</span>
                  )}
                </div>

                {/* Nombre */}
                <span style={{
                  fontFamily: I,
                  fontSize: 12,
                  fontWeight: 600,
                  color: isDarkMode ? "#ECECEC" : "#0F172A",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {displayName}
                </span>

                <ChevronDownRegular 
                  fontSize={11} 
                  style={{ 
                    color: isDarkMode ? "#9CA3AF" : "#64748B",
                    transform: sidebarProfileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.18s ease"
                  }} 
                />
              </div>
            ) : (
              /* Usuario invitado -> Botón Conectar con Google disimulado */
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  haptic.medium();
                  onOpenLogin?.();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "5px 12px",
                  borderRadius: 7,
                  background: isDarkMode ? "#262626" : "#FFFFFF",
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#D1D5DB"}`,
                  color: isDarkMode ? "#ECECEC" : "#1F2937",
                  fontFamily: I,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)"
                }}
              >
                {/* SVG Google */}
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Acceder con Google</span>
              </button>
            )}

            {/* Dropdown del Menú de Perfil */}
            <AnimatePresence>
              {sidebarProfileMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 240,
                    borderRadius: 12,
                    background: isDarkMode ? "#212121" : "#FFFFFF",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid #E5E7EB",
                    boxShadow: isDarkMode ? "0 16px 40px rgba(0,0,0,0.7)" : "0 12px 30px rgba(0,0,0,0.12)",
                    padding: 8,
                    zIndex: 1000,
                    fontFamily: I
                  }}
                >
                  {/* Header Info */}
                  <div style={{ padding: "8px 10px 10px", borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "#F1F5F9"}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: isDarkMode ? "#333333" : "#E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={fullDisplayName} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{initial}</span>
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isDarkMode ? "#F9FAFB" : "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {fullDisplayName}
                        </p>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: isDarkMode ? "#9CA3AF" : "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Opciones */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 6 }}>
                    {toggleTheme && (
                      <button
                        type="button"
                        onClick={handleToggleThemeFromMenu}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "transparent",
                          border: "none",
                          color: isDarkMode ? "#ECECEC" : "#1F2937",
                          fontSize: 12.5,
                          fontWeight: 500,
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                          transition: "background 0.15s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = isDarkMode ? "#2F2F2F" : "#F4F4F5")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          {isDarkMode ? <WeatherSunnyRegular fontSize={15} style={{ color: "#A3A3A3" }} /> : <WeatherMoonRegular fontSize={15} style={{ color: "#6B7280" }} />}
                          <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
                        </div>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handlePerformLogout}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: "transparent",
                        border: "none",
                        color: isDarkMode ? "#ECECEC" : "#1F2937",
                        fontSize: 12.5,
                        fontWeight: 500,
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDarkMode ? "rgba(239, 68, 68, 0.12)" : "#FEF2F2";
                        e.currentTarget.style.color = "#EF4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = isDarkMode ? "#ECECEC" : "#1F2937";
                      }}
                    >
                      <SignOutRegular fontSize={15} style={{ color: "inherit" }} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ── Navegador Dinámico de Trámites Oficiales (100% Directo, Sin Chat) ── */}
        <div 
          className="dynamic-official-procedures-container"
          style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            minWidth: 0, 
            boxSizing: "border-box",
            overflowY: "auto",
            padding: "20px 24px 48px"
          }}
        >
          <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            
            {/* ── Vista 1: Directorio General de Entidades Agrupadas en Grid Oficial (Estilo Mockup) ── */}
            {!selectedEntity ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 1100, margin: "0 auto" }}>
                {/* Título Oficial Principal */}
                <h1 style={{
                  fontFamily: G,
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 850,
                  letterSpacing: "-0.025em",
                  textAlign: "center",
                  margin: "8px 0 16px",
                  color: isDarkMode ? "#F9FAFB" : "#0D0D0D",
                  textTransform: "uppercase"
                }}>
                  ENTIDADES
                </h1>

                {/* ── Cuadrícula de Categorías (Bloques con Barra Vertical + Grid de Entidades) ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                  {[...NATIONAL_CATEGORIES, ...REGIONAL_CATEGORIES].map((catGroup) => {
                    const groupEntities = catGroup.entityAcronyms
                      .map(acr => findCivicEntity(acr))
                      .filter(Boolean);

                    if (groupEntities.length === 0) return null;

                    return (
                      <div
                        key={catGroup.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "stretch",
                          width: "100%",
                          borderRadius: 8,
                          overflow: "hidden",
                          border: `1.5px solid ${isDarkMode ? catGroup.borderDark : catGroup.borderLight}`,
                          background: isDarkMode ? catGroup.bgDark : catGroup.bgLight,
                          boxShadow: isDarkMode ? "0 2px 10px rgba(0,0,0,0.25)" : "0 1px 4px rgba(0,0,0,0.03)"
                        }}
                      >
                        {/* Barra Vertical Izquierda (Estilo Mockup) */}
                        <div
                          style={{
                            width: "clamp(34px, 4vw, 42px)",
                            minWidth: "clamp(34px, 4vw, 42px)",
                            background: isDarkMode ? catGroup.color : catGroup.barColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px 2px",
                            boxSizing: "border-box",
                            userSelect: "none",
                            flexShrink: 0
                          }}
                        >
                          <span
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                              fontFamily: G,
                              fontSize: "clamp(11px, 1.1vw, 12.5px)",
                              fontWeight: 700,
                              letterSpacing: "0.02em",
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              color: "#FFFFFF"
                            }}
                          >
                            {catGroup.name}
                          </span>
                        </div>

                        {/* Grid de Entidades a la Derecha */}
                        <div
                          style={{
                            flex: 1,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                            gap: 8,
                            padding: 8,
                            minWidth: 0,
                            boxSizing: "border-box"
                          }}
                        >
                          {groupEntities.map((c) => {
                            const logoSrc = getEntityLogo(c.acronym);

                            return (
                              <motion.div
                                key={c.id || c.acronym}
                                whileHover={{ y: -2, scale: 1.01 }}
                                whileTap={{ scale: 0.985 }}
                                onClick={() => {
                                  sound.playClick();
                                  haptic.selection();
                                  setEntity(c.acronym);
                                  setSelectedEntity(c.acronym);
                                  clearChat();
                                  const container = document.querySelector(".dynamic-official-procedures-container");
                                  if (container) container.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                style={{
                                  background: isDarkMode ? "rgba(255, 255, 255, 0.04)" : "#FFFFFF",
                                  border: `1.5px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : catGroup.borderLight}`,
                                  borderRadius: 8,
                                  padding: "16px 12px 14px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  minHeight: 90,
                                  boxSizing: "border-box",
                                  gap: 6,
                                  transition: "border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
                                  boxShadow: isDarkMode ? "0 1px 4px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.02)"
                                }}
                                onMouseEnter={e => {
                                  sound.playHoverKey();
                                  e.currentTarget.style.borderColor = isDarkMode ? "#FFFFFF" : catGroup.barColor;
                                  e.currentTarget.style.boxShadow = isDarkMode ? "0 4px 14px rgba(0,0,0,0.4)" : "0 3px 10px rgba(0,0,0,0.08)";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.12)" : catGroup.borderLight;
                                  e.currentTarget.style.boxShadow = isDarkMode ? "0 1px 4px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.02)";
                                }}
                              >
                                {/* Logo institucional si existe */}
                                {logoSrc && (
                                  <div 
                                    style={{
                                      width: 44,
                                      height: 28,
                                      borderRadius: 5,
                                      background: "#FFFFFF",
                                      border: "1px solid rgba(0,0,0,0.08)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      padding: "2px 4px",
                                      boxSizing: "border-box",
                                      overflow: "hidden",
                                      marginBottom: 2
                                    }}
                                  >
                                    <img 
                                      src={logoSrc} 
                                      alt={c.acronym} 
                                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", display: "block" }} 
                                    />
                                  </div>
                                )}

                                {/* Acrónimo Oficial en Grande (Estilo Mockup) */}
                                <h3 style={{
                                  fontFamily: G,
                                  fontSize: "clamp(17px, 2.2vw, 22px)",
                                  fontWeight: 850,
                                  color: isDarkMode ? catGroup.textDark : catGroup.textLight,
                                  margin: 0,
                                  letterSpacing: "-0.01em",
                                  lineHeight: 1.15
                                }}>
                                  {c.acronym}
                                </h3>

                                {/* Subtítulo breve del nombre oficial */}
                                <p style={{
                                  fontFamily: I,
                                  fontSize: 10.5,
                                  fontWeight: 550,
                                  color: isDarkMode ? catGroup.textDark : catGroup.textLight,
                                  opacity: 0.8,
                                  margin: 0,
                                  lineHeight: 1.25,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  maxWidth: "100%"
                                }}>
                                  {c.name}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
                /* ── Vista 2: Catálogo de Trámites de la Entidad Seleccionada ── */
              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                
                {/* Botón Superior para Volver a Todas las Entidades */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      haptic.selection();
                      setSelectedEntity(null);
                      const container = document.querySelector(".dynamic-official-procedures-container");
                      if (container) container.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onMouseEnter={() => sound.playHoverKey()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 8,
                      background: isDarkMode ? "#212121" : "#F4F4F5",
                      border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E5E7EB"}`,
                      color: isDarkMode ? "#ECECEC" : "#1F2937",
                      fontFamily: I,
                      fontSize: 12.5,
                      fontWeight: 650,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.03)"
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <span>Ver todas las entidades</span>
                  </button>
                </div>

                {/* ── Encabezado Superior de Entidades para Escritorio (Horizontal Scrollable Shelf) ── */}
                <div 
                  className="desktop-top-entities-header"
                  style={{
                    display: "none",
                    alignItems: "center",
                    gap: 8,
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    padding: "2px 0 10px",
                    borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
                    marginBottom: 2
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      haptic.selection();
                      setSelectedEntity(null);
                      clearChat();
                    }}
                    onMouseEnter={() => sound.playHoverKey()}
                    style={{
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: !selectedEntity ? (isDarkMode ? "#2563EB" : "#0F172A") : (isDarkMode ? "#1F1F1F" : "#FFFFFF"),
                      color: !selectedEntity ? "#FFFFFF" : (isDarkMode ? "#E2E8F0" : "#334155"),
                      border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"}`,
                      cursor: "pointer",
                      fontFamily: I,
                      fontSize: 12,
                      fontWeight: 650
                    }}
                  >
                    <span>🏛️ Todas</span>
                  </button>

                  {displayEntitiesList.map((c) => {
                    const isSelected = selectedEntity && entity.toUpperCase() === c.acronym.toUpperCase();
                    const logoSrc = getEntityLogo(c.acronym);

                    return (
                      <button
                        key={`desktop-head-${c.id || c.acronym}`}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          haptic.selection();
                          setEntity(c.acronym);
                          setSelectedEntity(c.acronym);
                          clearChat();
                        }}
                        onMouseEnter={() => sound.playHoverKey()}
                        style={{
                          flexShrink: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          padding: isSelected ? "7px 14px" : "6px 12px",
                          borderRadius: 999,
                          background: isSelected 
                            ? (isDarkMode ? "#2563EB" : "#0F172A") 
                            : (isDarkMode ? "#1F1F1F" : "#FFFFFF"),
                          color: isSelected ? "#FFFFFF" : (isDarkMode ? "#E2E8F0" : "#334155"),
                          border: isSelected 
                            ? `1px solid ${isDarkMode ? "#3B82F6" : "#0F172A"}` 
                            : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"}`,
                          boxShadow: isSelected 
                            ? (isDarkMode ? "0 2px 10px rgba(37, 99, 235, 0.4)" : "0 2px 6px rgba(15, 23, 42, 0.15)") 
                            : (isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.03)"),
                          cursor: "pointer",
                          fontFamily: I,
                          fontSize: 12.5,
                          fontWeight: isSelected ? 750 : 600,
                          transition: "all 0.15s ease"
                        }}
                      >
                        <div style={{
                          width: 26,
                          height: 18,
                          borderRadius: 4,
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1px 2px",
                          boxSizing: "border-box",
                          overflow: "hidden",
                          flexShrink: 0
                        }}>
                          {logoSrc ? (
                            <img 
                              src={logoSrc} 
                              alt={c.acronym} 
                              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", display: "block" }} 
                            />
                          ) : (
                            <span style={{ fontSize: 8.5, fontWeight: 800, color: "#1E293B" }}>{c.acronym.slice(0, 3)}</span>
                          )}
                        </div>
                        <span>{c.acronym}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Banner de la Entidad Activa */}
                {(() => {
                  const allProcs = getEntityOfficialProcedures(activeEntity.acronym);
                  const logoSrc = getEntityLogo(activeEntity.acronym);

                  // Agrupación por subcategorías
                  const categoriesMap = new Map<string, DirectProcedureItem[]>();
                  allProcs.forEach(p => {
                    const cat = p.category || "Trámites Generales";
                    if (!categoriesMap.has(cat)) {
                      categoriesMap.set(cat, []);
                    }
                    categoriesMap.get(cat)!.push(p);
                  });

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      
                      {/* Banner Principal de la Entidad */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 14,
                        padding: "14px 18px",
                        borderRadius: 12,
                        background: isDarkMode ? "#1C1C1C" : "#FFFFFF",
                        border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"}`,
                        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.03)"
                      }}>
                        <div 
                          className="mob-hide-entity-logo"
                          style={{
                            width: 56,
                            height: 38,
                            borderRadius: 7,
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2px 5px",
                            boxSizing: "border-box",
                            overflow: "hidden",
                            flexShrink: 0,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
                          }}
                        >
                          {logoSrc ? (
                            <img 
                              src={logoSrc} 
                              alt={activeEntity.acronym} 
                              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", display: "block" }} 
                            />
                          ) : (
                            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#0F172A" }}>{activeEntity.acronym}</span>
                          )}
                        </div>
                        <div>
                          <h2 style={{
                            fontFamily: G,
                            fontSize: 19,
                            fontWeight: 850,
                            color: isDarkMode ? "#F9FAFB" : "#0F172A",
                            letterSpacing: "-0.02em",
                            margin: 0
                          }}>
                            Trámites de {activeEntity.acronym}
                          </h2>
                          <p style={{
                            fontFamily: I,
                            fontSize: 12,
                            color: isDarkMode ? "#9CA3AF" : "#64748B",
                            margin: "2px 0 0"
                          }}>
                            {activeEntity.name}
                          </p>
                        </div>
                      </div>

                      {/* Renderizado de Categorías al Estilo ChatGPT */}
                      {Array.from(categoriesMap.entries()).map(([catName, procsList], cIdx) => {
                        const catKey = `${activeEntity.acronym}-${catName}`;
                        const isExpanded = Boolean(expandedCategories[catKey]);

                        return (
                          <div key={catName} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            
                            {/* Cabecera de Subcategoría con Fondo de Color y Puntito Estilo ChatGPT */}
                            {(() => {
                              const subTheme = getSubcategoryTheme(catName, isDarkMode, cIdx);
                              return (
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  padding: "9px 14px",
                                  borderRadius: 10,
                                  background: subTheme.bg,
                                  border: `1px solid ${subTheme.border}`,
                                  boxShadow: isDarkMode ? "0 1px 4px rgba(0,0,0,0.25)" : "0 1px 3px rgba(0,0,0,0.02)",
                                  transition: "all 0.15s ease"
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      background: subTheme.dot,
                                      
                                      flexShrink: 0
                                    }} />
                                    <h3 style={{
                                      fontFamily: G,
                                      fontSize: 14,
                                      fontWeight: 750,
                                      color: subTheme.text,
                                      margin: 0,
                                      letterSpacing: "-0.015em"
                                    }}>
                                      {catName}
                                    </h3>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Cuadrícula de Tarjetas de esta Subcategoría */}
                            <div 
                              style={{ 
                                display: "grid", 
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                                gap: 11,
                                width: "100%"
                              }}
                            >
                              {procsList.map((proc, pIdx) => {
                                const isHiddenOnMobile = pIdx >= 3 && !isExpanded;

                                return (
                                  <motion.a
                                    key={proc.id || `${catName}-${pIdx}`}
                                    href={proc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={isHiddenOnMobile ? "proc-item-mobile-hidden" : ""}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.16, delay: Math.min(pIdx * 0.02, 0.2) }}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    whileTap={{ scale: 0.985 }}
                                    onClick={() => {
                                      sound.playClick();
                                      haptic.selection();
                                    }}
                                    onMouseEnter={() => sound.playHoverKey()}
                                    style={{
                                      background: isDarkMode ? "#1C1C1C" : "#FFFFFF",
                                      border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"}`,
                                      borderRadius: 12,
                                      padding: "14px 15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      gap: 10,
                                      textDecoration: "none",
                                      boxShadow: isDarkMode ? "0 3px 12px rgba(0,0,0,0.3)" : "0 1px 6px rgba(0,0,0,0.04)",
                                      cursor: "pointer",
                                      transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                                    }}
                                  >
                                    {/* Título Nítido del Trámite */}
                                    <h4 style={{
                                      fontFamily: G,
                                      fontSize: 14,
                                      fontWeight: 700,
                                      color: isDarkMode ? "#F9FAFB" : "#0F172A",
                                      margin: 0,
                                      lineHeight: 1.36,
                                      letterSpacing: "-0.015em",
                                      WebkitFontSmoothing: "antialiased",
                                      textRendering: "geometricPrecision"
                                    }}>
                                      {proc.title}
                                    </h4>

                                    {/* Pie de Acción: Botón Directo al Portal Oficial */}
                                    <div style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      paddingTop: 8,
                                      borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.07)" : "#F1F5F9"}`
                                    }}>
                                      <span style={{
                                        fontFamily: I,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: isDarkMode ? "#9CA3AF" : "#64748B"
                                      }}>
                                        Acceso directo
                                      </span>

                                      <span style={{
                                        padding: "4px 10px",
                                        borderRadius: 6,
                                        background: isDarkMode ? "#2D2D2D" : "#0F172A",
                                        color: "#FFFFFF",
                                        fontFamily: G,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        boxShadow: isDarkMode ? "0 2px 6px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
                                      }}>
                                        <span>Ingresar</span>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                          <polyline points="15 3 21 3 21 9"/>
                                          <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                      </span>
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>

                            {/* Botón Ver Más para Móviles si hay más de 3 trámites */}
                            {procsList.length > 3 && (
                              <div className="proc-ver-mas-container" style={{ display: "flex", justifyContent: "center", paddingTop: 3 }}>
                                <button
                                  type="button"
                                  onClick={() => toggleCategoryExpand(catKey)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "6px 16px",
                                    borderRadius: 20,
                                    background: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#F1F5F9",
                                    border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#CBD5E1"}`,
                                    color: isDarkMode ? "#60A5FA" : "#2563EB",
                                    fontFamily: G,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    boxShadow: isDarkMode ? "0 1px 4px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)"
                                  }}
                                >
                                  <span>{isExpanded ? "Ver menos" : `Ver más (${procsList.length - 3} trámites)`}</span>
                                  <svg 
                                    width="11" 
                                    height="11" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    style={{ 
                                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", 
                                      transition: "transform 0.2s ease" 
                                    }}
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

              </div>
            )}

            {/* ── Footer Oficial: Copyright y Términos con Condiciones ── */}
            <footer style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "24px 16px 20px",
              marginTop: 20,
              borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`
            }}>
              {/* Enlaces Legales e Informativos */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "8px 18px"
              }}>
                {[
                  { label: "Términos y condiciones", docKey: "terminos" },
                  { label: "Política de privacidad", docKey: "privacidad" },
                  { label: "Política y seguridad", docKey: "seguridad" },
                  { label: "Cómo funciona", docKey: "comofunciona" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      haptic.selection();
                      setActiveFooterDoc(FOOTER_DOCS[item.docKey]);
                    }}
                    onMouseEnter={() => sound.playHoverKey()}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontFamily: I,
                      fontSize: 12,
                      fontWeight: 550,
                      color: isDarkMode ? "#9CA3AF" : "#64748B",
                      cursor: "pointer",
                      transition: "color 0.15s ease",
                      textDecoration: "none"
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = isDarkMode ? "#F9FAFB" : "#0F172A")}
                    onMouseOut={e => (e.currentTarget.style.color = isDarkMode ? "#9CA3AF" : "#64748B")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Copyright */}
              <p style={{
                margin: 0,
                fontFamily: I,
                fontSize: 11.5,
                color: isDarkMode ? "#64748B" : "#94A3B8",
                textAlign: "center"
              }}>
                © 2026 ahorratiempo. Todos los derechos reservados.
              </p>
            </footer>
          </div>
        </div>


      </div>

      {/* ── 4. Modal Flotante de Paywall (Activación y Suscripción) ── */}
      <AnimatePresence>
        {showPaywallModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              overflowY: "auto"
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPaywallModal(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                maxWidth: 900,
                width: "100%",
                maxHeight: "92vh",
                overflowY: "auto",
                position: "relative"
              }}
            >
              {/* Botón Cerrar Modal */}
              <button
                onClick={() => {
                  haptic.selection();
                  setShowPaywallModal(false);
                }}
                title="Cerrar modal"
                aria-label="Cerrar modal"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 20,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E2E8F0",
                  background: isDarkMode ? "#1E293B" : "#FFFFFF",
                  color: isDarkMode ? "#F8FAFC" : "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <DismissRegular fontSize={16} />
              </button>

              <PaywallView
                user={user}
                theme={theme}
                onBack={() => setShowPaywallModal(false)}
                onOpenLogin={() => {
                  setShowPaywallModal(false);
                  onOpenLogin?.();
                }}
                onActivated={() => {
                  setShowPaywallModal(false);
                  window.location.reload();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal de Documentos Informativos y Legales ── */}
      <AnimatePresence>
        {activeFooterDoc && (
          <div 
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              background: "rgba(3, 7, 18, 0.65)",
              backdropFilter: "blur(6px)"
            }}
            onClick={() => {
              sound.playClick();
              setActiveFooterDoc(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
              style={{
                background: isDarkMode ? "#212121" : "#FFFFFF",
                border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.12)" : "#E2E8F0"}`,
                borderRadius: 18,
                width: "100%",
                maxWidth: 540,
                maxHeight: "85vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: isDarkMode ? "0 20px 50px rgba(0,0,0,0.8)" : "0 20px 50px rgba(0,0,0,0.15)",
              }}
            >
              {/* Header del Modal */}
              <div style={{
                padding: "18px 20px 14px",
                borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "#F1F5F9"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: isDarkMode ? "#171717" : "#F8FAFC"
              }}>
                <div>
                  <span style={{
                    fontFamily: I,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isDarkMode ? "#38BDF8" : "#0284C7",
                    display: "inline-block",
                    marginBottom: 3
                  }}>
                    {activeFooterDoc.badge}
                  </span>
                  <h3 style={{
                    margin: 0,
                    fontFamily: G,
                    fontSize: 17,
                    fontWeight: 750,
                    color: D.text
                  }}>
                    {activeFooterDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    haptic.light();
                    setActiveFooterDoc(null);
                  }}
                  title="Cerrar"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: isDarkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid #E2E8F0",
                    background: isDarkMode ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                    color: D.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <DismissRegular fontSize={16} />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div style={{
                padding: "20px",
                overflowY: "auto",
                fontFamily: I,
                fontSize: 13.5,
                lineHeight: 1.6,
                color: D.text
              }}>
                {activeFooterDoc.content}
              </div>

              {/* Footer del Modal */}
              <div style={{
                padding: "12px 20px",
                borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "#F1F5F9"}`,
                display: "flex",
                justifyContent: "flex-end",
                background: isDarkMode ? "#171717" : "#F8FAFC"
              }}>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveFooterDoc(null);
                  }}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
                    background: isDarkMode ? "#2F2F2F" : "#0F172A",
                    color: "#FFFFFF",
                    fontFamily: I,
                    fontSize: 12.5,
                    fontWeight: 650,
                    cursor: "pointer"
                  }}
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal de Guía de Onboarding para Nuevos Usuarios / Invitados ── */}
      <OnboardingGuideModal 
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        theme={theme}
        onOpenEntityReorder={() => {
          setChatSidebarOpen(true);
        }}
      />

      

    </div>
  );
}

// ── Componente Interno: EmbeddedEntitiesCarousel (Navegación Fluida con Mouse, Trackpad y Botones) ──
interface EmbeddedEntitiesCarouselProps {
  entities: typeof CIVIC_ENTITIES;
  activeEntityAcronym: string;
  onSelectEntity: (acronym: string) => void;
  isDarkMode: boolean;
  D: any;
}

function EmbeddedEntitiesCarousel({
  entities,
  activeEntityAcronym,
  onSelectEntity,
  isDarkMode,
  D
}: EmbeddedEntitiesCarouselProps) {
  const shelfRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const checkScrollability = useCallback(() => {
    const el = shelfRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, entities]);

  const scrollByAmount = (offset: number) => {
    const el = shelfRef.current;
    if (!el) return;
    sound.playClick();
    haptic.selection();
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = shelfRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = shelfRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    dragDistanceRef.current = Math.abs(walk);
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", marginBottom: 10 }}>
      {/* Botón Flecha Izquierda para Navegación con Mouse */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollByAmount(-280)}
            title="Ver entidades anteriores"
            style={{
              position: "absolute",
              left: -14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: isDarkMode ? "#212121" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"}`,
              color: isDarkMode ? "#ECECEC" : "#0D0D0D",
              boxShadow: isDarkMode ? "0 4px 14px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "all 0.15s ease"
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contenedor del Carrusel con Soporte para Rueda de Mouse y Arrastre Táctil */}
      <div
        ref={shelfRef}
        className="embedded-entities-shelf"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={(e) => {
          if (e.deltaY !== 0) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
        style={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          gap: 9,
          padding: "6px 2px 10px",
          margin: 0,
          scrollbarWidth: "none",
          cursor: "grab",
          userSelect: "none"
        }}
      >
        {entities.map((c) => {
          const isSelected = activeEntityAcronym.toUpperCase() === c.acronym.toUpperCase();
          const logoSrc = getEntityLogo(c.acronym);
          const catColor = c.categoryColor || c.color || T.violet;
          const badgeText = formatBadgeAcronym(c.acronym);

          return (
            <button
              key={c.id}
              onClick={() => {
                if (dragDistanceRef.current < 6) {
                  sound.playClick();
                  haptic.selection();
                  onSelectEntity(c.acronym);
                }
              }}
              onMouseEnter={() => sound.playHoverKey()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 10px 7px",
                minWidth: 84,
                borderRadius: 10,
                background: isSelected 
                  ? (isDarkMode ? "#2F2F2F" : "#F4F4F5") 
                  : (isDarkMode ? "#212121" : "#FFFFFF"),
                border: isSelected 
                  ? (isDarkMode ? "1px solid rgba(255, 255, 255, 0.32)" : "1.5px solid #0D0D0D") 
                  : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E5E7EB"}`,
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: isSelected 
                  ? (isDarkMode ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.06)")
                  : (isDarkMode ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.03)"),
                transition: "all 0.16s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {/* Contenedor del Logo Institucional con Fondo Blanco Puro y Proporción Rectangular Clara */}
              <div style={{
                width: 58,
                height: 32,
                borderRadius: 6,
                background: "#FFFFFF",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px 5px",
                marginBottom: 5,
                boxShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)",
                overflow: "hidden",
                boxSizing: "border-box"
              }}>
                {logoSrc ? (
                  <img 
                    src={logoSrc} 
                    alt={c.acronym} 
                    style={{ 
                      maxWidth: "100%", 
                      maxHeight: "100%", 
                      width: "auto", 
                      height: "auto", 
                      objectFit: "contain", 
                      imageRendering: "-webkit-optimize-contrast",
                      display: "block" 
                    }} 
                  />
                ) : (
                  <span style={{ fontWeight: 800, fontSize: 10, color: catColor, letterSpacing: "-0.01em" }}>
                    {badgeText}
                  </span>
                )}
              </div>

              {/* Nombre / Acrónimo de la Entidad */}
              <span style={{
                fontFamily: I,
                fontSize: 11.5,
                fontWeight: isSelected ? 700 : 550,
                color: isSelected 
                  ? (isDarkMode ? "#FFFFFF" : "#0D0D0D") 
                  : (isDarkMode ? "#9CA3AF" : "#4B5563"),
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap"
              }}>
                {c.acronym}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón Flecha Derecha para Navegación con Mouse */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollByAmount(280)}
            title="Ver más entidades"
            style={{
              position: "absolute",
              right: -14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: isDarkMode ? "#212121" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"}`,
              color: isDarkMode ? "#ECECEC" : "#0D0D0D",
              boxShadow: isDarkMode ? "0 4px 14px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "all 0.15s ease"
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Componente Interno: ChatInputCard (Estilo ChatGPT Voice & Figma Make App) ──
interface ChatInputCardProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  entity: string;
  onEntityChange: (id: string) => void;
  onOpenCatalog?: () => void;
  onNewChat: () => void;
  isListening: boolean;
  interimTranscript?: string;
  audioLevel?: number;
  onToggleVoice: () => void;
  onCancelVoice?: () => void;
  isThinking: boolean;
  onStop: () => void;
  D: any;
  activeEntity?: any;
  isDarkMode?: boolean;
}

function ChatInputCard({
  value,
  onChange,
  onSend,
  entity,
  onEntityChange,
  onOpenCatalog,
  onNewChat,
  isListening,
  interimTranscript = "",
  audioLevel = 0,
  onToggleVoice,
  onCancelVoice,
  isThinking,
  onStop,
  D,
  activeEntity,
  isDarkMode = false,
}: ChatInputCardProps) {
  const [dropdown, setDropdown] = useState(false);
  const [cardFilter, setCardFilter] = useState("");
  const active = activeEntity || CIVIC_ENTITIES.find(e => e.acronym.toUpperCase() === entity.toUpperCase()) || CIVIC_ENTITIES[0];
  const activeColor = active.categoryColor || active.color || T.violet;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      
      {/* Backdrop transparente para cerrar Dropdown */}
      {dropdown && (
        <div 
          onClick={() => setDropdown(false)} 
          style={{ position: "fixed", inset: 0, zIndex: 45 }} 
        />
      )}

      {/* Dropdown de Especializaciones */}
      {dropdown && !isListening && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: 0,
          width: 320,
          maxWidth: "min(320px, calc(100vw - 32px))",
          maxHeight: 320,
          overflowY: "auto",
          background: isDarkMode ? "#212121" : "#FFFFFF",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#E5E7EB"}`,
          borderRadius: 12,
          zIndex: 50,
          boxShadow: isDarkMode ? "0 12px 36px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB"}`, position: "sticky", top: 0, background: isDarkMode ? "#212121" : "#FFFFFF", zIndex: 1 }}>
            <span style={{ fontFamily: I, fontSize: 10, fontWeight: 700, color: isDarkMode ? "#9CA3AF" : "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Entidades Oficiales del Estado
            </span>
            <input 
              type="text"
              placeholder="Buscar entidad..."
              value={cardFilter}
              onChange={e => setCardFilter(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 10px",
                marginTop: 6,
                borderRadius: 8,
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E5E7EB"}`,
                background: isDarkMode ? "#2A2A2A" : "#F4F4F5",
                color: isDarkMode ? "#ECECEC" : "#0D0D0D",
                fontSize: 12,
                fontFamily: I,
                outline: "none"
              }}
            />
          </div>
          <div style={{ overflowY: "auto", maxHeight: 220 }}>
            {CIVIC_ENTITIES
              .filter(e => {
                const q = cardFilter.toLowerCase().trim();
                if (!q) return true;
                return e.acronym.toLowerCase().includes(q) || e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
              })
              .map(e => {
                const isSelected = entity.toUpperCase() === e.acronym.toUpperCase();
                return (
                  <button
                    key={e.id}
                    onClick={() => { onEntityChange(e.acronym); setDropdown(false); setCardFilter(""); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "9px 14px",
                      background: isSelected ? (isDarkMode ? "#2F2F2F" : "#F4F4F5") : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.06)" : "#F3F4F6"}`,
                      transition: "background 0.12s ease"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontFamily: G, fontWeight: 700, fontSize: 13, color: isDarkMode ? "#ECECEC" : "#0D0D0D" }}>
                          {e.acronym}
                        </span>
                        {isSelected && (
                          <span style={{ fontFamily: I, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.04em", padding: "1px 6px", borderRadius: 6, background: isDarkMode ? "rgba(255,255,255,0.15)" : "#0D0D0D", color: "#FFFFFF" }}>
                            ACTIVA
                          </span>
                        )}
                      </div>
                      <span style={{ fontFamily: I, fontSize: 11, color: isDarkMode ? "#9CA3AF" : "#6B7280", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{e.name}</span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isListening ? (
          /* ── MODO DICTADO DE VOZ CHATGPT (ChatGPT-Style Voice Capsule) ── */
          <motion.div
            key="chatgpt-voice-composer"
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: isDarkMode ? "#212121" : "#FFFFFF",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.16)" : "1px solid #E5E7EB",
              borderRadius: 18,
              boxShadow: isDarkMode ? "0 12px 36px rgba(0, 0, 0, 0.65)" : "0 10px 30px rgba(0, 0, 0, 0.08)",
              padding: "16px 18px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minHeight: 116,
              boxSizing: "border-box"
            }}
          >
            {/* Texto Transcrito en Tiempo Real / Prompt de Escucha */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {value.trim() ? (
                <div style={{
                  fontFamily: I,
                  fontSize: "15px",
                  fontWeight: 500,
                  color: isDarkMode ? "#ECECEC" : "#0D0D0D",
                  lineHeight: 1.5,
                  maxHeight: 72,
                  overflowY: "auto",
                  wordBreak: "break-word"
                }}>
                  {value}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 15,
                      marginLeft: 4,
                      background: isDarkMode ? "#ECECEC" : "#0D0D0D",
                      verticalAlign: "middle"
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: G, fontSize: 14.5, fontWeight: 700, color: isDarkMode ? "#ECECEC" : "#0D0D0D" }}>
                      Escuchando tu voz...
                    </span>
                  </div>
                  <span style={{ fontFamily: I, fontSize: 12, color: isDarkMode ? "#9CA3AF" : "#6B7280", lineHeight: 1.35 }}>
                    {getEntityVoiceExample(active.acronym)}
                  </span>
                </div>
              )}
            </div>

            {/* Ecualizador de Ondas Sonoras Orgánicas (ChatGPT Symmetrical Soundwave) */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              height: 26,
              padding: "0 8px"
            }}>
              {[0.2, 0.35, 0.55, 0.75, 0.9, 1.0, 1.0, 0.9, 0.75, 0.55, 0.35, 0.2].map((weight, idx) => {
                const waveHeight = Math.max(4, Math.min(22, (audioLevel * 22 * weight) + (Math.sin(idx * 0.7 + Date.now() / 140) * 3 + 3)));
                return (
                  <motion.div
                    key={idx}
                    animate={{ height: waveHeight }}
                    transition={{ duration: 0.08, ease: "linear" }}
                    style={{
                      width: 3.5,
                      borderRadius: 4,
                      background: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "#1F2937"
                    }}
                  />
                );
              })}
            </div>

            {/* Dock de Acciones Inferiores (Cancelar | Status Pill | Enviar/Confirmar) */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #F3F4F6",
              paddingTop: 10
            }}>
              {/* Botón Cancelar (✕) */}
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  if (onCancelVoice) onCancelVoice();
                  else onToggleVoice();
                }}
                title="Cancelar grabación"
                aria-label="Cancelar grabación"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.10)" : "1px solid #E5E7EB",
                  background: isDarkMode ? "#2A2A2A" : "#F3F4F6",
                  color: isDarkMode ? "#A3A3A3" : "#6B7280",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#EF4444";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.35)";
                  e.currentTarget.style.background = isDarkMode ? "rgba(239, 68, 68, 0.15)" : "#FEF2F2";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isDarkMode ? "#A3A3A3" : "#6B7280";
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.10)" : "#E5E7EB";
                  e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F3F4F6";
                }}
              >
                <DismissRegular fontSize={15} />
              </button>

              {/* Status Pill Central Estilo ChatGPT */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 10px",
                borderRadius: 20,
                background: isDarkMode ? "#2A2A2A" : "#F3F4F6",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E5E7EB"
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10A37F",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(16, 163, 127, 0.6)"
                }} />
                <span style={{ fontFamily: I, fontSize: 11, fontWeight: 650, color: isDarkMode ? "#ECECEC" : "#1F2937", letterSpacing: "0.02em" }}>
                  LOTA Voz
                </span>
              </div>

              {/* Botón Confirmar / Enviar (Estilo ChatGPT) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  haptic.success();
                  onToggleVoice();
                }}
                title={value.trim() ? "Enviar consulta" : "Terminar grabación"}
                aria-label={value.trim() ? "Enviar consulta" : "Terminar grabación"}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "none",
                  background: isDarkMode ? "#ECECEC" : "#0D0D0D",
                  color: isDarkMode ? "#0D0D0D" : "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.15s ease"
                }}
              >
                {value.trim() ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"/>
                  </svg>
                ) : (
                  <CheckmarkRegular fontSize={16} />
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* ── MODO COMPOSITOR DE TEXTO REGULAR (ESTILO CHATGPT) ── */
          <motion.div
            key="regular-composer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={{
              background: isDarkMode ? "#212121" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.35)" : "0 2px 14px rgba(0,0,0,0.05)",
            }}
          >
            <textarea
              value={value}
              onChange={e => onChange(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder={`Pregunta a LOTA AI sobre trámites de ${active.acronym}...`}
              rows={2}
              className="chat-textarea-composer"
              style={{
                width: "100%",
                padding: "14px 18px 6px",
                border: "none",
                outline: "none",
                resize: "none",
                fontFamily: I,
                fontSize: 14.5,
                color: isDarkMode ? "#ECECEC" : "#0D0D0D",
                background: "transparent",
                lineHeight: 1.5,
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", padding: "8px 12px 10px", gap: 8 }}>
              
              {/* Botón para Iniciar Nuevo Chat (Estilo ChatGPT) */}
              <button 
                type="button"
                onClick={onNewChat}
                title="Iniciar nuevo chat"
                aria-label="Iniciar nuevo chat"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB"}`,
                  background: isDarkMode ? "#2A2A2A" : "#F4F4F5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDarkMode ? "#D1D5DB" : "#4B5563",
                  flexShrink: 0,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDarkMode ? "#333333" : "#E5E7EB";
                  e.currentTarget.style.color = isDarkMode ? "#FFFFFF" : "#111827";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F4F4F5";
                  e.currentTarget.style.color = isDarkMode ? "#D1D5DB" : "#4B5563";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </button>

              {/* Selector de Entidad Chip Estilo ChatGPT */}
              <button
                type="button"
                onClick={() => setDropdown(!dropdown)}
                title="Seleccionar entidad del Estado"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: isDarkMode ? "#2A2A2A" : "#F4F4F5",
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB"}`,
                  cursor: "pointer",
                  fontFamily: I,
                  fontWeight: 600,
                  fontSize: 12.5,
                  color: isDarkMode ? "#ECECEC" : "#18181B",
                  minWidth: 0,
                  maxWidth: 160,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDarkMode ? "#333333" : "#E5E7EB";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F4F4F5";
                }}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{active.acronym}</span>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: isDarkMode ? "#9CA3AF" : "#6B7280" }}>
                  <path d="M4 6l4 4 4-4"/>
                </svg>
              </button>

              {/* Botón de Catálogo Estilo ChatGPT */}
              {onOpenCatalog && (
                <button
                  type="button"
                  onClick={onOpenCatalog}
                  title={`Ver catálogo de trámites de ${active.acronym}`}
                  aria-label="Ver catálogo de trámites"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 10px",
                    borderRadius: 8,
                    background: isDarkMode ? "#2A2A2A" : "#F4F4F5",
                    border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB"}`,
                    cursor: "pointer",
                    fontFamily: I,
                    fontWeight: 600,
                    fontSize: 12.5,
                    color: isDarkMode ? "#ECECEC" : "#18181B",
                    flexShrink: 0,
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = isDarkMode ? "#333333" : "#E5E7EB";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F4F4F5";
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                  <span>Catálogo</span>
                </button>
              )}

              <div style={{ flex: 1 }} />

              {/* Botón de Micrófono (dictado por voz estilo ChatGPT) */}
              <motion.button 
                type="button"
                onClick={onToggleVoice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                title="Dictar consulta por voz"
                aria-label="Dictar consulta por voz"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB"}`,
                  background: isDarkMode ? "#2A2A2A" : "#F4F4F5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDarkMode ? "#D1D5DB" : "#4B5563",
                  flexShrink: 0,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDarkMode ? "#333333" : "#E5E7EB";
                  e.currentTarget.style.color = isDarkMode ? "#FFFFFF" : "#111827";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F4F4F5";
                  e.currentTarget.style.color = isDarkMode ? "#D1D5DB" : "#4B5563";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </motion.button>

              {/* Botón Enviar / Detener (Estilo ChatGPT) */}
              {isThinking ? (
                <button
                  type="button"
                  onClick={onStop}
                  title="Detener respuesta"
                  aria-label="Detener respuesta"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background: isDarkMode ? "#ECECEC" : "#0D0D0D",
                    color: isDarkMode ? "#0D0D0D" : "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: isDarkMode ? "#0D0D0D" : "#FFFFFF" }} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSend}
                  disabled={!value.trim()}
                  title="Enviar consulta"
                  aria-label="Enviar consulta"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background: value.trim() 
                      ? (isDarkMode ? "#FFFFFF" : "#0D0D0D") 
                      : (isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E7EB"),
                    color: value.trim()
                      ? (isDarkMode ? "#0D0D0D" : "#FFFFFF")
                      : (isDarkMode ? "#737373" : "#9CA3AF"),
                    cursor: value.trim() ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: value.trim() 
                      ? (isDarkMode ? "0 2px 8px rgba(255, 255, 255, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.15)") 
                      : "none",
                    transition: "all 0.15s ease",
                    flexShrink: 0
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"/>
                  </svg>
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

