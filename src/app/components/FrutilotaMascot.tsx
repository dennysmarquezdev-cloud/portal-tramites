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
    setEntityDropdownOpen(false);
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
  const [showOnboardingModal, setShowOnboardingModal] = useState(() => {
    try {
      return !localStorage.getItem("ahorratiempo_onboarding_v1");
    } catch {
      return false;
    }
  });

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
        .embedded-entities-shelf::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .chat-sidebar-reopen {
            top: 10px !important;
            left: 10px !important;
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
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
          animation: slowEyeBlink 4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          transform-origin: center center;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.2s ease, 
                      background-color 0.2s ease, 
                      box-shadow 0.2s ease, 
                      opacity 0.2s ease;
          will-change: transform, opacity, filter;
        }
        .prompt-chip-btn:hover {
          animation-play-state: paused !important;
          opacity: 1 !important;
          transform: translateY(-2px) scale(1.02) !important;
          filter: brightness(1.03) !important;
          border-color: ${isDarkMode ? "rgba(56, 189, 248, 0.5)" : "#0284C7"} !important;
          box-shadow: ${isDarkMode 
            ? "0 4px 14px rgba(56, 189, 248, 0.2), 0 0 8px rgba(56, 189, 248, 0.15)" 
            : "0 4px 14px rgba(2, 132, 199, 0.16), 0 1px 3px rgba(0, 0, 0, 0.05)"} !important;
        }
        .prompt-chip-btn:active {
          transform: translateY(0px) scale(0.98) !important;
        }
      `}</style>
      
      {/* ── Backdrop para Sidebar Móvil ── */}
      {chatSidebarOpen && (
        <div 
          className="chat-sidebar-backdrop" 
          onClick={() => setChatSidebarOpen(false)} 
        />
      )}

      {/* ── 1. Sidebar Izquierdo Colapsable (264px) ── */}
      <aside 
        className={`chat-sidebar ${chatSidebarOpen ? "chat-sidebar--open" : ""}`} 
        style={{
          width: chatSidebarOpen ? 264 : 0,
          flexShrink: 0,
          background: D.sidebar,
          borderRight: chatSidebarOpen ? `1px solid ${D.border}` : "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.22s ease, background 0.25s, border-color 0.25s",
          zIndex: 60
        }}
      >
        {/* Header Usuario */}
        <div style={{ padding: "14px 14px 12px", borderBottom: `1px solid ${D.border}`, flexShrink: 0 }}>
          {/* Perfil + Botón Minimizar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }} ref={sidebarProfileMenuRef}>
            <div 
              onClick={() => {
                if (user) {
                  sound.playHoverKey();
                  haptic.selection();
                  setSidebarProfileMenuOpen(prev => !prev);
                } else {
                  onOpenLogin?.();
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                minWidth: 0,
                cursor: "pointer",
                padding: "4px 6px",
                borderRadius: 8,
                transition: "background 0.15s ease"
              }}
              title={user ? "Ver opciones de cuenta" : "Iniciar sesión"}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                flexShrink: 0,
                overflow: "hidden",
                background: isDarkMode ? "#2F2F2F" : "#E5E7EB",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #D1D5DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: I,
                fontWeight: 700,
                fontSize: 13,
                color: isDarkMode ? "#ECECEC" : "#1F2937",
                boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.4)" : "0 1px 2px rgba(0, 0, 0, 0.06)"
              }}>
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || "Google Avatar"} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                ) : null}
                <span style={{ display: user?.photoURL ? "none" : "block" }}>{initial}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontFamily: I, fontWeight: 600, fontSize: 13, color: isDarkMode ? "#ECECEC" : "#0D0D0D", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {displayName}
                  </span>
                  {isPlus && (
                    <span 
                      title="Cuenta Premium Activa"
                      style={{
                        fontFamily: I,
                        fontSize: 9,
                        fontWeight: 700,
                        color: isDarkMode ? "#ECECEC" : "#374151",
                        background: isDarkMode ? "rgba(255, 255, 255, 0.10)" : "#F3F4F6",
                        border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E5E7EB",
                        padding: "1px 6px",
                        borderRadius: 5,
                        letterSpacing: "0.02em",
                        cursor: "default"
                      }}
                    >
                      PLUS
                    </span>
                  )}
                </div>
              </div>
              {user && (
                <ChevronDownRegular 
                  fontSize={11} 
                  style={{ 
                    color: D.muted,
                    transform: sidebarProfileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease"
                  }} 
                />
              )}
            </div>

            {/* Menú Desplegable Flotante en el Sidebar Estilo ChatGPT */}
            <AnimatePresence>
              {sidebarProfileMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    width: 240,
                    borderRadius: 14,
                    background: isDarkMode ? "#212121" : "#FFFFFF",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E5E7EB",
                    boxShadow: isDarkMode ? "0 16px 40px rgba(0,0,0,0.7)" : "0 12px 30px rgba(0,0,0,0.08)",
                    padding: 6,
                    zIndex: 1000,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {toggleTheme && (
                      <button
                        type="button"
                        onClick={handleToggleThemeFromMenu}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "transparent",
                          border: "none",
                          color: isDarkMode ? "#ECECEC" : "#1F2937",
                          fontSize: 13,
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
                          {isDarkMode ? (
                            <WeatherSunnyRegular fontSize={16} style={{ color: "#A3A3A3" }} />
                          ) : (
                            <WeatherMoonRegular fontSize={16} style={{ color: "#6B7280" }} />
                          )}
                          <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
                        </div>
                        <span style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: 6,
                          background: isDarkMode ? "#2F2F2F" : "#F3F4F6",
                          color: isDarkMode ? "#A3A3A3" : "#6B7280",
                          border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB"
                        }}>
                          {isDarkMode ? "Oscuro" : "Claro"}
                        </span>
                      </button>
                    )}

                    <div style={{ height: 1, background: isDarkMode ? "rgba(255,255,255,0.08)" : "#F3F4F6", margin: "3px 0" }} />

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
                        fontSize: 13,
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
                      <SignOutRegular fontSize={16} style={{ color: "inherit" }} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {/* Botón Minimizar */}
              <motion.button 
                type="button"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.06)",
                  borderColor: isDarkMode ? "rgba(255, 255, 255, 0.28)" : "rgba(0, 0, 0, 0.18)",
                  color: isDarkMode ? "#FFFFFF" : "#111827"
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  haptic.selection();
                  setChatSidebarOpen(false);
                }} 
                title="Minimizar panel lateral" 
                aria-label="Minimizar panel lateral"
                className="chat-sidebar-minimize-btn"
                style={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  background: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.70)",
                  border: isDarkMode 
                    ? "1px solid rgba(255, 255, 255, 0.16)" 
                    : "1px solid rgba(0, 0, 0, 0.10)",
                  cursor: "pointer",
                  color: isDarkMode ? "#ECECEC" : "#374151",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  outline: "none",
                  transition: "border-color 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
                  boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.25)" : "0 1px 2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
                  <rect x="1.5" y="2" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="5.5" y1="2" x2="5.5" y2="14" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M11 6L9 8L11 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Contenedor Scrollable del Sidebar (Estilo YouTube) ── */}
        <div 
          className="chat-sidebar-scroll" 
          style={{ 
            flex: 1, 
            overflowY: "auto", 
            display: "flex", 
            flexDirection: "column",
            minHeight: 0
          }}
        >
          {/* Banner para Suscripción si no es PLUS */}
          {!isPlus && (
            <div style={{ padding: "10px 12px 0", flexShrink: 0 }}>
              <button
                onClick={() => {
                  sound.playClick();
                  haptic.medium();
                  setShowPaywallModal(true);
                }}
                onMouseEnter={(e) => {
                  sound.playHoverKey();
                  e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F3F4F6";
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.18)" : "#D1D5DB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDarkMode ? "#212121" : "#FFFFFF";
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.10)" : "#E5E7EB";
                }}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: isDarkMode ? "#212121" : "#FFFFFF",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.10)" : "1px solid #E5E7EB",
                  borderRadius: 10,
                  color: isDarkMode ? "#ECECEC" : "#1F2937",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10A37F",
                    display: "inline-block"
                  }} />
                  <span style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: isDarkMode ? "#ECECEC" : "#111827" }}>
                    Activar LOTA AI PLUS
                  </span>
                </div>
                <ChevronRightRegular fontSize={13} style={{ color: D.muted }} />
              </button>
            </div>
          )}

          {/* Entidades Header con Buscador */}
          <div style={{ padding: "14px 14px 8px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <h2 style={{
                  margin: 0,
                  fontFamily: G,
                  fontSize: 16,
                  fontWeight: 800,
                  color: D.text,
                  letterSpacing: "-0.02em"
                }}>
                  Entidades
                </h2>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 100,
                  background: isDarkMode ? "rgba(255,255,255,0.08)" : "#E2E8F0",
                  color: D.muted
                }}>
                  {displayEntitiesList.length}
                </span>
              </div>
            </div>

            {/* Buscador Rápido de Entidades en Sidebar */}
            <div style={{ position: "relative", width: "100%" }}>
              <SearchRegular 
                style={{ 
                  position: "absolute", 
                  left: 8, 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  color: isDarkMode ? "#9CA3AF" : "#6B7280",
                  pointerEvents: "none" 
                }} 
                fontSize={12} 
              />
              <input 
                value={sidebarEntitySearch}
                onChange={e => setSidebarEntitySearch(e.target.value)}
                placeholder="Buscar entidad (ej. SUNAT, RENIEC)..."
                style={{
                  width: "100%",
                  height: 28,
                  padding: "0 22px 0 26px",
                  borderRadius: 7,
                  border: `1px solid ${D.border}`,
                  background: isDarkMode ? "#262626" : "#FFFFFF",
                  color: D.text,
                  fontFamily: I,
                  fontSize: 11,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
              {sidebarEntitySearch && (
                <button
                  type="button"
                  onClick={() => setSidebarEntitySearch("")}
                  style={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: D.muted,
                    padding: 0
                  }}
                >
                  <DismissRegular fontSize={11} />
                </button>
              )}
            </div>

            {/* Hint sutil de arrastre y pulsación */}
            <div style={{
              fontSize: 10.5,
              color: D.muted,
              padding: "2px 2px 0",
              lineHeight: 1.3,
              userSelect: "none",
              letterSpacing: "-0.01em"
            }}>
              Mantén presionada una entidad para moverla de lugar.
            </div>
          </div>

          {/* Lista de Entidades en Formato Cuadrícula de Cubos con Reordenamiento por Presión / Arrastre */}
          <div style={{ 
            padding: "0 10px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 7,
            alignContent: "start",
            touchAction: draggedEntityAcronym ? "none" : "pan-y",
            userSelect: "none",
            WebkitUserSelect: "none"
          }}>
            {displayEntitiesList.map((c) => {
              const isSelected = entity.toUpperCase() === c.acronym.toUpperCase();
              const isPinned = pinnedEntities.includes(c.acronym);
              const isBeingDragged = draggedEntityAcronym?.toUpperCase() === c.acronym.toUpperCase();
              const catColor = c.categoryColor || c.color || T.violet;
              const bgLight = c.categoryBgLight || "#F1F5F9";
              const logoSrc = getEntityLogo(c.acronym);
              const badgeText = formatBadgeAcronym(c.acronym);

              return (
                <motion.div
                  key={c.id || c.acronym}
                  layout
                  layoutId={`entity-card-${c.acronym}`}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  data-entity-acronym={c.acronym}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(c.acronym, e as unknown as React.DragEvent)}
                  onDragOver={(e) => handleDragOver(c.acronym, e as unknown as React.DragEvent)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(c.acronym, e as unknown as React.TouchEvent)}
                  onTouchMove={(e) => handleTouchMove(e as unknown as React.TouchEvent)}
                  onTouchEnd={() => handleTouchEnd(c.acronym)}
                  onTouchCancel={handleTouchCancel}
                  style={{
                    position: "relative",
                    zIndex: isBeingDragged ? 50 : 1,
                    transform: isBeingDragged ? "scale(1.08)" : "scale(1)",
                    opacity: isBeingDragged ? 0.95 : 1,
                    transition: isBeingDragged ? "none" : "transform 0.15s ease, opacity 0.15s ease",
                    cursor: isBeingDragged ? "grabbing" : "grab",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: isBeingDragged ? "none" : "pan-y"
                  }}
                >
                  <button 
                    type="button"
                    onMouseEnter={() => sound.playHoverKey()}
                    onClick={() => {
                      if (Date.now() - lastTouchTimeRef.current < 500) return;
                      sound.playClick();
                      haptic.selection();
                      setEntity(c.acronym);
                      clearChat();
                      if (typeof window !== "undefined" && window.innerWidth <= 768) {
                        setChatSidebarOpen(false);
                      }
                    }}
                    className="chat-collection-cube-btn"
                    title={`Arrastra o mantén presionado para mover ${c.name || c.acronym}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 6px 8px",
                      borderRadius: 10,
                      border: isBeingDragged
                        ? `1.5px solid ${isDarkMode ? "rgba(255, 255, 255, 0.35)" : "#9CA3AF"}`
                        : isSelected 
                        ? `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.22)" : "#D1D5DB"}` 
                        : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E7EB"}`,
                      background: isBeingDragged
                        ? (isDarkMode ? "#333333" : "#E5E7EB")
                        : isSelected 
                        ? (isDarkMode ? "#2F2F2F" : "#F4F4F5") 
                        : (isDarkMode ? "#212121" : "#FFFFFF"),
                      cursor: "inherit",
                      textAlign: "center",
                      transition: "all 0.16s ease",
                      boxShadow: isBeingDragged
                        ? (isDarkMode ? "0 14px 34px rgba(0,0,0,0.8)" : "0 12px 28px rgba(0,0,0,0.14)")
                        : isSelected 
                        ? (isDarkMode ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 6px rgba(0,0,0,0.05)")
                        : (isDarkMode ? "none" : "0 1px 2px rgba(0,0,0,0.03)"),
                      position: "relative",
                      boxSizing: "border-box",
                      minHeight: 84,
                      pointerEvents: isBeingDragged ? "none" : "auto",
                      WebkitUserSelect: "none",
                      userSelect: "none"
                    }}
                  >
                    {/* Logo / Badge de la Entidad */}
                    <div style={{
                      width: "84%",
                      maxWidth: 64,
                      height: 34,
                      borderRadius: 7,
                      background: "#FFFFFF",
                      border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.10)" : "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2px 5px",
                      marginBottom: 5,
                      boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)",
                      boxSizing: "border-box",
                      overflow: "hidden",
                      pointerEvents: "none"
                    }}>
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={c.acronym}
                          style={{ 
                            maxHeight: "100%", 
                            maxWidth: "100%", 
                            width: "auto", 
                            height: "auto", 
                            objectFit: "contain", 
                            imageRendering: "-webkit-optimize-contrast",
                            display: "block" 
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <span style={{
                          color: isDarkMode ? "#ECECEC" : "#1F2937",
                          fontWeight: 800,
                          fontFamily: G,
                          fontSize: 10.5,
                          textAlign: "center",
                          letterSpacing: badgeText.length > 4 ? "-0.03em" : "0",
                        }}>
                          {badgeText}
                        </span>
                      )}
                    </div>

                    {/* Acrónimo / Nombre Prominente */}
                    <span style={{ 
                      fontFamily: G, 
                      fontSize: 11.5, 
                      color: isSelected ? (isDarkMode ? "#FFFFFF" : "#0D0D0D") : (isDarkMode ? "#ECECEC" : "#374151"), 
                      fontWeight: isSelected ? 800 : 600, 
                      lineHeight: 1.2,
                      textAlign: "center",
                      maxWidth: "100%",
                      overflow: "hidden", 
                      textOverflow: "ellipsis", 
                      whiteSpace: "nowrap",
                      display: "block",
                      padding: "0 2px",
                      pointerEvents: "none",
                      letterSpacing: "-0.01em"
                    }}>
                      {c.acronym}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Línea Separadora después de las Entidades */}
          <div style={{
            height: 1,
            background: D.border,
            margin: "18px 14px 14px",
            flexShrink: 0
          }} />

          {/* ── Footer Informativo y Legal Estilo YouTube ── */}
          <div style={{ padding: "0 14px 24px", display: "flex", flexDirection: "column", gap: 11, flexShrink: 0 }}>
            {/* Botón Destacado: Ver Guía Interactiva de Bienvenida (Estilo ChatGPT) */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                haptic.selection();
                setShowOnboardingModal(true);
              }}
              onMouseEnter={(e) => {
                sound.playHoverKey();
                e.currentTarget.style.background = isDarkMode ? "#2A2A2A" : "#F3F4F6";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.18)" : "#D1D5DB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDarkMode ? "#212121" : "#FFFFFF";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.10)" : "#E5E7EB";
              }}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: 10,
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.10)" : "1px solid #E5E7EB",
                background: isDarkMode ? "#212121" : "#FFFFFF",
                color: isDarkMode ? "#ECECEC" : "#1F2937",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                fontFamily: I,
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.15s ease",
                boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <QuestionCircleRegular fontSize={14} style={{ color: D.muted }} />
                <span>¿Cómo usar ahorratiempo?</span>
              </div>
              <ChevronRightRegular fontSize={13} style={{ color: D.muted }} />
            </button>

            {/* Grupo 1: Información, Derechos de autor, Contactar, Creadores */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 9px" }}>
              {[
                { label: "Información", docKey: "informacion" },
                { label: "Derechos de autor", docKey: "derechos" },
                { label: "Contactar", docKey: "contactar" },
                { label: "Creadores", docKey: "creadores" }
              ].map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    haptic.selection();
                    setActiveFooterDoc(FOOTER_DOCS[item.docKey]);
                  }}
                  onMouseEnter={() => sound.playHoverKey()}
                  style={{
                    fontFamily: I,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: D.muted,
                    cursor: "pointer",
                    transition: "color 0.15s ease",
                    lineHeight: 1.3
                  }}
                  className="youtube-sidebar-link"
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Grupo 2: Términos, Privacidad, Política y Seguridad, Cómo funciona */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 9px" }}>
              {[
                { label: "Términos", docKey: "terminos" },
                { label: "Privacidad", docKey: "privacidad" },
                { label: "Política y seguridad", docKey: "seguridad" },
                { label: "Cómo funciona ahorratiempo", docKey: "comofunciona" }
              ].map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    haptic.selection();
                    setActiveFooterDoc(FOOTER_DOCS[item.docKey]);
                  }}
                  onMouseEnter={() => sound.playHoverKey()}
                  style={{
                    fontFamily: I,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: D.muted,
                    cursor: "pointer",
                    transition: "color 0.15s ease",
                    lineHeight: 1.3
                  }}
                  className="youtube-sidebar-link"
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <div style={{ marginTop: 2 }}>
              <span style={{
                fontFamily: I,
                fontSize: 11,
                fontWeight: 450,
                color: isDarkMode ? "#64748B" : "#94A3B8",
                lineHeight: 1.4,
                display: "block"
              }}>
                © 2026 ahorratiempo
              </span>
            </div>
          </div>
        </div>
      </aside>

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

      {/* ── 3. Chat Area Principal ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: D.bg, transition: "background 0.25s", position: "relative" }}>
        
        {/* Botón Reabrir/Expandir Sidebar (cuando está colapsado) */}
        {!chatSidebarOpen && (
          <button 
            onClick={() => {
              haptic.selection();
              setChatSidebarOpen(true);
            }} 
            title="Abrir menú de entidades" 
            aria-label="Abrir menú de entidades"
            className="chat-sidebar-reopen" 
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              minWidth: 36,
              background: isDarkMode ? "#212121" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.16)" : "#E5E5E5"}`,
              borderRadius: 8,
              padding: 0,
              cursor: "pointer",
              color: isDarkMode ? "#ECECEC" : "#1F2937",
              boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.15s ease"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ display: "block", color: isDarkMode ? "#ECECEC" : "#1F2937", shapeRendering: "geometricPrecision" }}>
              <rect x="1.5" y="2" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
              <line x1="5.5" y1="2" x2="5.5" y2="14" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 6L11 8L9 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}



        {/* ── Área de Conversación o Estado Vacío (Guiado y Dinámico) ── */}
        {messages.length === 0 ? (
          <div 
            className="chat-empty" 
            style={{ 
              flex: 1,
              padding: "36px 20px 32px", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center",
              boxSizing: "border-box",
              overflowY: "auto"
            }}
          >
            {/* Título Principal Tipográfico */}
            <div style={{ textAlign: "center", marginBottom: 8, maxWidth: 680 }}>
              <h1 style={{
                fontFamily: G,
                fontSize: "clamp(19px, 3.8vw, 34px)",
                fontWeight: 850,
                color: isDarkMode ? "#F8FAFC" : "#0A101D",
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.2
              }}>
                ¿Qué trámite o entidad deseas consultar?
              </h1>
            </div>

            {/* Subtítulo Guía Dinámico */}
            <p 
              style={{
                fontFamily: I,
                fontSize: "clamp(13px, 1.5vw, 14.5px)",
                fontWeight: 500,
                color: isDarkMode ? "#94A3B8" : "#475569",
                textAlign: "center",
                maxWidth: 620,
                lineHeight: 1.45,
                margin: "0 0 14px",
                padding: "0 8px"
              }}
            >
              {chatSidebarOpen 
                ? "Selecciona una entidad en el menú lateral o escribe directamente tu duda para que LOTA AI te asista con requisitos y pasos oficiales."
                : "Elige una entidad oficial a continuación o formula tu pregunta directamente."
              }
            </p>

            {/* Selector Visual de Entidades Incrustadas con Navegación por Flechas, Rueda y Arrastre de Mouse */}
            {!chatSidebarOpen && (
              <EmbeddedEntitiesCarousel
                entities={CIVIC_ENTITIES}
                activeEntityAcronym={entity}
                onSelectEntity={handleSwitchEntity}
                isDarkMode={isDarkMode}
                D={D}
              />
            )}

            {/* Tarjeta de Input Centralizada */}
            <div style={{ width: "100%", maxWidth: 660, marginBottom: 14 }}>
              <ChatInputCard 
                value={input}
                onChange={setInput}
                onSend={onFormSubmit}
                entity={entity}
                onEntityChange={handleSwitchEntity}
                onOpenCatalog={() => setCatalogOpen(true)}
                onNewChat={() => {
                  haptic.selection();
                  clearChat();
                }}
                isListening={isListening}
                interimTranscript={interimTranscript}
                audioLevel={audioLevel}
                onToggleVoice={toggleVoiceInput}
                onCancelVoice={() => {
                  haptic.light();
                  cancelVoiceInput();
                  setInput("");
                }}
                isThinking={isThinking}
                onStop={stopGeneration}
                D={D}
                activeEntity={activeEntity}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Atajos de Consultas Populares de la Entidad Activa (Aparecen tras 10s de inactividad) */}
            <AnimatePresence>
              {showFrequentQueries && activeEntity.popularProcedures && activeEntity.popularProcedures.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 660, marginTop: 4 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <SearchRegular fontSize={12} style={{ color: isDarkMode ? "#9CA3AF" : "#6B7280" }} />
                    <span style={{ fontFamily: I, fontSize: 12, fontWeight: 650, color: isDarkMode ? "#D1D5DB" : "#4B5563" }}>
                      Consultas frecuentes de {activeEntity.acronym}:
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, width: "100%" }}>
                    {activeEntity.popularProcedures.slice(0, 3).map((proc, pIdx) => (
                      <motion.button
                        key={pIdx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: pIdx * 0.06, duration: 0.22 }}
                        whileHover={{ scale: 1.025, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          sound.playClick();
                          haptic.medium();
                          executeQuery(`Deseo consultar requisitos, procedimiento oficial y accesos para: "${proc.title}"`);
                        }}
                        onMouseEnter={() => sound.playHoverKey()}
                        className="prompt-chip-btn"
                        style={{
                          animationDelay: `${pIdx * 0.45}s`,
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "7px 14px",
                          background: isDarkMode ? "#262626" : "#FFFFFF",
                          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5E5"}`,
                          borderRadius: 10,
                          fontFamily: I,
                          fontSize: 12,
                          fontWeight: 550,
                          color: D.text,
                          cursor: "pointer",
                          boxShadow: isDarkMode ? "0 2px 6px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.04)",
                          maxWidth: "100%",
                          textAlign: "left"
                        }}
                      >
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{proc.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Stream de Conversación Activa */
          <>
            <div 
              ref={scrollRef}
              className="chat-messages" 
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{
                width: "100%",
                maxWidth: 840,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}>
                {messages.map((msg) => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  
                  {msg.role === 'user' ? (
                    /* Burbuja del Usuario Estilo ChatGPT */
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{
                        maxWidth: "76%",
                        padding: "12px 18px",
                        background: D.userMsgBg,
                        borderRadius: "18px 18px 4px 18px",
                        border: `1px solid ${D.userMsgBorder}`,
                        fontFamily: I,
                        fontSize: 15,
                        fontWeight: 500,
                        color: D.userMsgText,
                        lineHeight: 1.6,
                        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.03)"
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    /* Respuesta de LOTA AI (Directa y limpia, sin imagen de mascota redundante) */
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: "100%" }}>
                      {/* Contenido de la Respuesta */}
                      {msg.isTyping && !msg.content ? (
                        <ThinkingIndicator />
                      ) : (
                        <div>
                          <ProgressiveDisclosureResponse 
                            content={msg.content} 
                            isTyping={msg.isTyping} 
                            isError={msg.isError}
                            theme={isDarkMode ? "dark" : "light"}
                            onFollowUp={(q) => executeQuery(q)}
                          />

                          {/* Accesos oficiales concordantes con el trámite */}
                          {!msg.isTyping && msg.content && (() => {
                            const concordantLinks = getConcordantOfficialLinks(msg.officialLinks, msg.content, msg.rawPrompt);
                            if (concordantLinks.length === 0) return null;

                            return (
                              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                  <GlobeRegular fontSize={13} color={isDarkMode ? "#38BDF8" : T.violet} />
                                  <span>Accesos oficiales para este trámite:</span>
                                </div>
                                {concordantLinks.map((link, lIdx) => {
                                  let hostname = "";
                                  try { hostname = new URL(link.url).hostname; } catch { hostname = "gob.pe"; }

                                  return (
                                    <a
                                      key={lIdx}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "10px 14px",
                                        background: isDarkMode ? "#262626" : "#FFFFFF",
                                        border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E2E8F0"}`,
                                        borderRadius: 10,
                                        textDecoration: "none",
                                        color: D.text,
                                        transition: "all 0.15s ease",
                                        boxShadow: isDarkMode ? "none" : "0 1px 3px rgba(0, 0, 0, 0.02)"
                                      }}
                                      className="lota-official-link-card"
                                    >
                                      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                                        <div style={{
                                          width: 26,
                                          height: 26,
                                          borderRadius: 6,
                                          background: isDarkMode ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          flexShrink: 0
                                        }}>
                                          <OpenRegular fontSize={14} color={isDarkMode ? "#38BDF8" : "#0284C7"} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                                          <span style={{ fontFamily: G, fontWeight: 650, fontSize: 13, color: D.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {link.title}
                                          </span>
                                          <span style={{ fontFamily: I, fontSize: 11, color: isDarkMode ? "#38BDF8" : "#0284C7" }}>
                                            {link.badge || link.entidad || "Portal Oficial"} • {hostname}
                                          </span>
                                        </div>
                                      </div>
                                      <span style={{ 
                                        fontFamily: I, 
                                        fontSize: 12, 
                                        fontWeight: 650, 
                                        color: isDarkMode ? "#38BDF8" : "#0284C7",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        flexShrink: 0,
                                        padding: "4px 8px",
                                        borderRadius: 6,
                                        background: isDarkMode ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.05)"
                                      }}>
                                        Ingresar ↗
                                      </span>
                                    </a>
                                  );
                                })}
                              </div>
                            );
                          })()}

                          {/* Action Strip (Copiar / Escuchar Voz) */}
                          {!msg.isTyping && msg.content && (
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button
                                onClick={() => handleCopy(msg.id, msg.content, msg.officialLinks)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  padding: "6px 12px",
                                  borderRadius: 8,
                                  background: D.sidebar,
                                  border: `1px solid ${D.border}`,
                                  fontFamily: I,
                                  fontWeight: 500,
                                  fontSize: 12,
                                  color: D.muted,
                                  cursor: "pointer"
                                }}
                              >
                                {copiedId === msg.id ? <CheckmarkRegular fontSize={13} color={T.sage} /> : <CopyRegular fontSize={13} />}
                                <span>{copiedId === msg.id ? "Copiado" : "Copiar"}</span>
                              </button>

                              <button
                                onClick={() => toggleSpeak(msg.id, msg.content)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  padding: "6px 12px",
                                  borderRadius: 8,
                                  background: speakingMsgId === msg.id ? (isDarkMode ? "#1E3A5F" : T.lilac) : D.sidebar,
                                  border: `1px solid ${speakingMsgId === msg.id ? T.violet : D.border}`,
                                  fontFamily: I,
                                  fontWeight: 500,
                                  fontSize: 12,
                                  color: speakingMsgId === msg.id ? T.violet : D.muted,
                                  cursor: "pointer"
                                }}
                              >
                                {speakingMsgId === msg.id ? <SpeakerOffRegular fontSize={13} /> : <Speaker2Regular fontSize={13} />}
                                <span>{speakingMsgId === msg.id ? "Detener" : "Escuchar"}</span>
                              </button>
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  )}

                </div>
              ))}
              </div>
            </div>

            {/* Sticky Composer Docked at Bottom */}
            <div 
              className="chat-input-wrap" 
              style={{
                padding: "14px 48px 20px",
                borderTop: `1px solid ${D.border}`,
                background: D.bg,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: 840 }}>
                <ChatInputCard 
                  value={input}
                  onChange={setInput}
                  onSend={onFormSubmit}
                  entity={entity}
                  onEntityChange={setEntity}
                  onOpenCatalog={() => setCatalogOpen(true)}
                  onNewChat={() => {
                    haptic.selection();
                    clearChat();
                  }}
                  isListening={isListening}
                  interimTranscript={interimTranscript}
                  audioLevel={audioLevel}
                  onToggleVoice={toggleVoiceInput}
                  onCancelVoice={() => {
                    haptic.light();
                    cancelVoiceInput();
                    setInput("");
                  }}
                  isThinking={isThinking}
                  onStop={stopGeneration}
                  D={D}
                  activeEntity={activeEntity}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </>
        )}

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
    <div style={{ position: "relative", width: "100%", maxWidth: 660, marginBottom: 14 }}>
      {/* Botón Flecha Izquierda para Navegación con Mouse */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollByAmount(-280)}
            title="Ver entidades oficiales anteriores"
            style={{
              position: "absolute",
              left: -14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: isDarkMode ? "#262626" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E5E5"}`,
              color: isDarkMode ? "#ECECEC" : "#0D0D0D",
              boxShadow: isDarkMode ? "0 4px 16px rgba(0,0,0,0.6)" : "0 4px 14px rgba(0,0,0,0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)"
            }}
          >
            <ChevronLeftRegular fontSize={17} style={{ shapeRendering: "geometricPrecision" }} />
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
          gap: 10,
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
                padding: "8px 8px 7px",
                minWidth: 88,
                borderRadius: 14,
                background: isSelected 
                  ? (isDarkMode ? "#1F2937" : "#F0FDF4") 
                  : (isDarkMode ? "#262626" : "#FFFFFF"),
                border: isSelected 
                  ? `2px solid ${isDarkMode ? "#38BDF8" : "#10A37F"}` 
                  : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#E5E5E5"}`,
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: isSelected 
                  ? (isDarkMode ? "0 0 0 2px rgba(56, 189, 248, 0.25), 0 4px 14px rgba(0,0,0,0.5)" : "0 0 0 2px rgba(16, 163, 127, 0.18), 0 4px 12px rgba(16, 163, 127, 0.15)")
                  : (isDarkMode ? "0 2px 6px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.04)"),
                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {/* Contenedor del Logo Institucional con Fondo Blanco Puro y Proporción Rectangular Clara */}
              <div style={{
                width: 64,
                height: 38,
                borderRadius: 8,
                background: "#FFFFFF",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3px 6px",
                marginBottom: 5,
                boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.05)",
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
                  <span style={{ fontWeight: 850, fontSize: 10, color: catColor, letterSpacing: "-0.01em" }}>
                    {badgeText}
                  </span>
                )}
              </div>

              {/* Nombre / Acrónimo de la Entidad */}
              <span style={{
                fontFamily: I,
                fontSize: 11,
                fontWeight: 800,
                color: isSelected 
                  ? (isDarkMode ? "#38BDF8" : "#10A37F") 
                  : (isDarkMode ? "#ECECEC" : "#0D0D0D"),
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
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollByAmount(280)}
            title="Ver más entidades oficiales"
            style={{
              position: "absolute",
              right: -14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: isDarkMode ? "#262626" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E5E5"}`,
              color: isDarkMode ? "#ECECEC" : "#0D0D0D",
              boxShadow: isDarkMode ? "0 4px 16px rgba(0,0,0,0.6)" : "0 4px 14px rgba(0,0,0,0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)"
            }}
          >
            <ChevronRightRegular fontSize={17} style={{ shapeRendering: "geometricPrecision" }} />
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
          background: D.sidebar,
          border: `1px solid ${D.border}`,
          borderRadius: 14,
          zIndex: 50,
          boxShadow: "0 8px 32px rgba(11,30,56,0.18)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${D.border}`, position: "sticky", top: 0, background: D.sidebar, zIndex: 1 }}>
            <span style={{ fontFamily: I, fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Entidades Oficiales del Estado
            </span>
            <input 
              type="text"
              placeholder="Filtrar entidad..."
              value={cardFilter}
              onChange={e => setCardFilter(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "6px 8px",
                marginTop: 6,
                borderRadius: 6,
                border: `1px solid ${D.border}`,
                background: D.inputBg,
                color: D.text,
                fontSize: 11.5,
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
              .map(e => (
              <button
                key={e.id}
                onClick={() => { onEntityChange(e.acronym); setDropdown(false); setCardFilter(""); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: entity.toUpperCase() === e.acronym.toUpperCase() ? (D.itemHov) : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  borderBottom: `1px solid ${D.border}`,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontFamily: G, fontWeight: 700, fontSize: 13, color: entity.toUpperCase() === e.acronym.toUpperCase() ? (e.categoryColor || T.violet) : D.text }}>
                      {e.acronym}
                    </span>
                    {entity.toUpperCase() === e.acronym.toUpperCase() && (
                      <span style={{ fontFamily: I, fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "1px 6px", borderRadius: 100, background: e.categoryColor || T.violet, color: "#fff" }}>
                        ACTIVA
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: I, fontSize: 11, color: D.muted, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{e.name}</span>
                </div>
              </button>
            ))}
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <CheckmarkRegular fontSize={16} />
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* ── MODO COMPOSITOR DE TEXTO REGULAR ── */
          <motion.div
            key="regular-composer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={{
              background: D.inputBg,
              border: `1.5px solid ${D.border}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: isDarkMode ? "0 2px 14px rgba(0,0,0,0.35)" : "0 2px 14px rgba(0,0,0,0.08)",
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
              
              {/* Botón para Iniciar Nuevo Chat */}
              <button 
                type="button"
                onClick={onNewChat}
                title="Iniciar nuevo chat"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1.5px solid #E5E5E5",
                  background: isDarkMode ? "#212121" : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDarkMode ? "#D1D5DB" : "#4B5563",
                  flexShrink: 0,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1";
                  e.currentTarget.style.color = isDarkMode ? "#FFFFFF" : "#111827";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#E5E5E5";
                  e.currentTarget.style.color = isDarkMode ? "#D1D5DB" : "#4B5563";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <line x1="12" y1="8" x2="12" y2="14"/>
                  <line x1="9" y1="11" x2="15" y2="11"/>
                </svg>
              </button>

              {/* Selector de Entidad Chip con Color de Categoría */}
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
                  background: isDarkMode ? "#212121" : "#FFFFFF",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1.5px solid #E5E5E5",
                  cursor: "pointer",
                  fontFamily: I,
                  fontWeight: 650,
                  fontSize: 12.5,
                  color: isDarkMode ? "#ECECEC" : "#0D0D0D",
                  minWidth: 0,
                  maxWidth: 160,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#E5E5E5";
                }}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{active.acronym}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 3.5l3 3 3-3" stroke={isDarkMode ? "#D1D5DB" : "#6B7280"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Botón de Catálogo como Icono al Costado de Entidades */}
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
                    background: isDarkMode ? "#212121" : "#FFFFFF",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1.5px solid #E5E5E5",
                    cursor: "pointer",
                    fontFamily: I,
                    fontWeight: 650,
                    fontSize: 12.5,
                    color: isDarkMode ? "#ECECEC" : "#0D0D0D",
                    flexShrink: 0,
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#E5E5E5";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                whileTap={{ scale: 0.92 }}
                title="Dictar consulta por voz (Modo ChatGPT)"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.14)" : "1.5px solid #E5E5E5",
                  background: isDarkMode ? "#212121" : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDarkMode ? "#D1D5DB" : "#4B5563",
                  flexShrink: 0,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1";
                  e.currentTarget.style.color = isDarkMode ? "#FFFFFF" : "#111827";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.14)" : "#E5E5E5";
                  e.currentTarget.style.color = isDarkMode ? "#D1D5DB" : "#4B5563";
                }}
              >
                <MicRegular fontSize={16} />
              </motion.button>

              {/* Botón Enviar / Detener */}
              {isThinking ? (
                <button
                  type="button"
                  onClick={onStop}
                  title="Detener respuesta"
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
                  title="Enviar consulta"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background: value.trim() 
                      ? (isDarkMode ? "#ECECEC" : "#0D0D0D") 
                      : (isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#E5E5E5"),
                    cursor: value.trim() ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                    flexShrink: 0
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path 
                      d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" 
                      stroke={value.trim() ? (isDarkMode ? "#0D0D0D" : "#FFFFFF") : (isDarkMode ? "#737373" : "#A3A3A3")} 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
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

