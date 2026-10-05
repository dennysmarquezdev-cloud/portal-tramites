import { Suspense, lazy } from 'react';
import { AIAssistant } from './components/AIAssistant';
import { SearchResults } from './components/SearchResults';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
const PerfilPage = lazy(() => import('./pages/PerfilPage'));
const AjustesPage = lazy(() => import('./pages/AjustesPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const MarketingKitPage = lazy(() => import('./pages/MarketingKitPage'));

import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
const Admindashboard = lazy(() => import("./AdminDashboard"));
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { FluentProvider, webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { HomeRegular, GridRegular, HeartRegular, QuestionCircleRegular, SignOutRegular, SearchRegular, ChevronLeftRegular, ChevronRightRegular, BuildingRegular, DismissRegular, MailRegular, CallRegular, ChatRegular, ShieldRegular, DocumentTextRegular, PulseRegular, CalculatorRegular, BriefcaseRegular, ScalesRegular, HatGraduationRegular, BuildingBankRegular, MoneyRegular, AirplaneRegular, BuildingFactoryRegular, Wifi1Regular, StarRegular, SendRegular, NavigationRegular, AlertRegular, CheckmarkCircleRegular, ErrorCircleRegular, CheckmarkRegular, OpenRegular, ClockRegular, ArrowTrendingRegular, PeopleRegular, LockClosedRegular, ShieldCheckmarkRegular, FlashRegular, PersonRegular, BookmarkAddRegular, BookmarkRegular, VehicleCarRegular, SettingsRegular, BookOpenRegular, SparkleRegular, ChevronDownRegular, ChevronUpRegular, PlayRegular, RibbonStarRegular, WarningRegular, GlobeRegular, DataBarVerticalRegular, LocationRegular, FingerprintRegular, ShareRegular, ArrowClockwiseRegular, ArrowDownloadRegular, BotRegular, ArrowUpRegular } from '@fluentui/react-icons';
import logoImg from "@/imports/logo-ahorratiemop.jpeg";
import { LogoFull, LogoIcon } from "./components/LogoIcon";
import { FrutilotaMascot } from "./components/FrutilotaMascot";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import imgReniec from "@/imports/RENIEC.png";
import imgEssalud from "@/imports/ESSALUD.png";
import imgMinsa from "@/imports/MINISTERIO_DE_SALUD.png";
import imgSunarp from "@/imports/SUNARP.png";
import imgSunarp2 from "@/imports/SUNARP-1.png";
import imgMtpe from "@/imports/MTPE_-_Ministerio_de_Trabajo_y_Promoci_n_del_Empleo.png";
import imgMtpe2 from "@/imports/MTPE_-_Ministerio_de_Trabajo_y_Promoci_n_del_Empleo-1.png";
import imgMinjus from "@/imports/MINJUSDH.png";
import imgMtc from "@/imports/MTC.png";
import imgMigraciones from "@/imports/MIGRACIONES_PERU.png";
import imgAfp from "@/imports/Administradora_de_Fondos_de_Pensiones.png";
import imgOnp from "@/imports/Administradora_de_Fondos_de_Pensiones__2_.png";
import imgMinedu from "@/imports/MINEDU.png";
import imgMef from "@/imports/MINISTERIO_DE_ECONOMIA_Y_FINANZAS.png";
import imgProduce from "@/imports/PRODUCE.png";
import imgOnpe from "@/imports/Oficina_Nacional_de_Procesos_Electorales.png";
import { AIChatBot } from "./components/AIChatBot";
import ReactMarkdown from "react-markdown";
import { AppLoadingScreen } from "./components/AppLoadingScreen";
import { LoginModal } from "./components/LoginModal";
import { PaywallModal } from "./components/PaywallModal";
import { haptic } from "./utils/haptics";

// Firebase Integration
import { auth, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const TramiteEditorModal = lazy(() => import('./InlineEditors').then(m => ({ default: m.TramiteEditorModal })));
const CategoryEditorModal = lazy(() => import('./InlineEditors').then(m => ({ default: m.CategoryEditorModal })));
const SiteConfigEditorModal = lazy(() => import('./InlineEditors').then(m => ({ default: m.SiteConfigEditorModal })));
const ExpressManagerModal = lazy(() => import('./InlineEditors').then(m => ({ default: m.ExpressManagerModal })));

export const AdminCMSContext = createContext<{
  isAdmin: boolean;
  onEditCms: (type: "tramite"|"categoria"|"site"|"express-list", data?: any) => void;
}>({ isAdmin: false, onEditCms: () => {} });

import { ErrorView, ScreenB_AccessDenied } from "./components/ErrorView";
import { Sidebar, FloatingNavTrigger } from "./components/Navigation";

export function getIconForCategory(id: string): React.ElementType {
  const found = CATS.find(c => c.id === id);
  return found ? found.Icon : DocumentTextRegular;
}

export function getLogosForCategory(id: string): string[] {
  const found = CATS.find(c => c.id === id);
  return found ? found.logos || [] : [];
}

//     Types                                                                     
import { Page, Tramite, Category, Notif, ChatMsg, ExpressItem, ThemeKey } from "./types";
import { 
  THEMES, AI_FLOWS, NOTIFICATIONS, 
  WHATSAPP_URL, EXPRESS_ICONS, getExpressIcon 
} from "./data";
import { searchPexels } from "../services/pexels";
import { INITIAL_CATEGORIES, INITIAL_TRAMITES } from "./data/initialCatalog";

export let CATS: Category[] = [...INITIAL_CATEGORIES];
export let T: Tramite[] = [...INITIAL_TRAMITES];
export const getCat = (id: string) => CATS.find(c => c.id === id) || CATS[0];
export const LIMA_BG = "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=1920&h=700&fit=crop&auto=format&q=75";

export const GLOBAL_CSS = `
:root {
  /* ChatGPT Light Theme */
  --colorNeutralBackground1: #FFFFFF;
  --colorNeutralBackground2: #F9F9F9;
  --colorNeutralBackground3: #F4F4F4;
  --colorNeutralBackground4: #FFFFFF;
  --colorNeutralForeground1: #0D0D0D;
  --colorNeutralForeground2: #737373;
  --colorNeutralForeground3: #8E8E93;
  --colorNeutralStroke1: #E5E5E5;
  --colorNeutralStroke2: #ECECEC;
  --colorBrandBackground: #10A37F;
  --colorBrandForeground1: #10A37F;

  /* Fluent 2 Shapes (Border Radius) */
  --borderRadiusNone: 0;
  --borderRadiusSmall: 2px;
  --borderRadiusMedium: 4px;
  --borderRadiusLarge: 8px;
  --borderRadiusXLarge: 12px;
  --borderRadiusXXLarge: 16px;
  --borderRadiusCircular: 50%;

  /* Fluent 2 Spacing (Layout) */
  --spacing1: 4px;
  --spacing2: 8px;
  --spacing3: 12px;
  --spacing4: 16px;
  --spacing5: 20px;
  --spacing6: 24px;
  --spacing7: 28px;
  --spacing8: 32px;

  /* Fluent 2 Elevation (Light) */
  --elevation2: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04);
  --elevation4: 0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04);
  --elevation8: 0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.03);
  --elevation16: 0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.02);

  /* Fluent 2 Material (Light) */
  --materialAcrylic: rgba(255, 255, 255, 0.85);
  --materialMica: rgba(249, 249, 249, 0.95);
}

.dark {
  /* ChatGPT Dark Theme */
  --colorNeutralBackground1: #212121;
  --colorNeutralBackground2: #171717;
  --colorNeutralBackground3: #2F2F2F;
  --colorNeutralBackground4: #212121;
  --colorNeutralForeground1: #ECECEC;
  --colorNeutralForeground2: #B4B4B4;
  --colorNeutralForeground3: #8E8E93;
  --colorNeutralStroke1: #303030;
  --colorNeutralStroke2: rgba(255, 255, 255, 0.12);
  --colorBrandBackground: #10A37F;
  --colorBrandForeground1: #10A37F;

  /* Fluent 2 Elevation (Dark) */
  --elevation2: 0 2px 4px rgba(0,0,0,0.35), 0 0 2px rgba(0,0,0,0.3);
  --elevation4: 0 4px 8px rgba(0,0,0,0.35), 0 0 2px rgba(0,0,0,0.3);
  --elevation8: 0 8px 16px rgba(0,0,0,0.35), 0 0 2px rgba(0,0,0,0.3);
  --elevation16: 0 16px 32px rgba(0,0,0,0.35), 0 0 2px rgba(0,0,0,0.3);

  /* Fluent 2 Material (Dark) */
  --materialAcrylic: rgba(33, 33, 33, 0.85);
  --materialMica: rgba(23, 23, 23, 0.95);
}

/* Fluent 2 Iconography Standardization */
svg[class*="lucide"] {
  stroke-width: 1.5 !important;
}

/* Global Font & Text Styling */
body {
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.at-hero-peru-title-dark {
  font-size: clamp(4.5rem, 13vw, 9.5rem);
  font-weight: 850;
  letter-spacing: -0.02em;
  line-height: 0.95;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Calibri', 'Carlito', 'Candara', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.at-hero-peru-title-dark .at-flag-red {
  color: #EF4444;
  background: linear-gradient(180deg, #F87171 0%, #DC2626 55%, #B91C1C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 32px rgba(220, 38, 38, 0.65)) drop-shadow(0 0 10px rgba(239, 68, 68, 0.45));
}

.at-hero-peru-title-dark .at-flag-white {
  color: #FFFFFF;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 55%, #E2E8F0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 32px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.50));
}

.at-hero-peru-title-light {
  font-size: clamp(4.5rem, 13vw, 9.5rem);
  font-weight: 850;
  letter-spacing: -0.02em;
  line-height: 0.95;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Calibri', 'Carlito', 'Candara', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.at-hero-peru-title-light .at-flag-red {
  color: #DC2626;
  background: linear-gradient(180deg, #EF4444 0%, #DC2626 55%, #991B1B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 4px 18px rgba(220, 38, 38, 0.28));
}

.at-hero-peru-title-light .at-flag-white {
  color: #FFFFFF;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 60%, #E2E8F0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-text-stroke: 2px rgba(15, 23, 42, 0.70);
  filter: drop-shadow(0 4px 18px rgba(15, 23, 42, 0.15));
}

@media (min-width: 768px) {
  .md\\:hidden { display: none !important; }
  .md\\:block { display: block !important; }
  .md\\:flex { display: flex !important; }
}
@media (max-width: 767px) {
  .hidden.md\\:flex { display: none !important; }
  .hidden.md\\:block { display: none !important; }
}
@keyframes aurora1{0%,100%{transform:translate(0,0) scale(1);opacity:.35}33%{transform:translate(70px,-50px) scale(1.15);opacity:.55}66%{transform:translate(-40px,60px) scale(.9);opacity:.25}}
@keyframes aurora2{0%,100%{transform:translate(0,0) scale(1);opacity:.25}40%{transform:translate(-60px,40px) scale(1.2);opacity:.45}70%{transform:translate(50px,-30px) scale(.85);opacity:.2}}
@keyframes pulse-ring{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(1.55);opacity:0}}
@keyframes float-a{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-10px) rotate(-1.5deg)}}
@keyframes float-b{0%,100%{transform:translateY(-5px) rotate(1.5deg)}50%{transform:translateY(5px) rotate(1.5deg)}}
@keyframes float-c{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
@keyframes scanline{0%{top:-4px;opacity:0}8%{opacity:.18}92%{opacity:.18}100%{top:calc(100% + 4px);opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
@keyframes pulse-bot{0%,100%{box-shadow:0 0 0 0 rgba(0,180,216,.5)}70%{box-shadow:0 0 0 10px rgba(0,180,216,0)}}
.clock-scanline{position:absolute;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,rgba(0,200,230,.5),transparent);animation:scanline 5s ease-in-out infinite}
.fa{animation:float-a 4.2s ease-in-out infinite}.fb{animation:float-b 5.1s ease-in-out infinite}.fc{animation:float-c 3.8s ease-in-out infinite}
.category-card{height:146px}
@media(min-width:640px){.category-card{height:196px}}
.main-content { padding: 0 !important; }
::-webkit-scrollbar{display:none}
* {
  box-sizing: border-box;
}
`;



//  Login Page 
const TESTIMONIALS = [
  { text:"Renové mi DNI en 15 min", name:"Juan C.", city:"Lima", emoji:"x" },
  { text:"Sin filasí, sin estrs", name:"Mara P.", city:"Callao", emoji:"S&" },
  { text:"Encontré todo en un lugar", name:"Carlos R.", city:"Arequipa", emoji:"x!x!" },
];




//  Tramite Modal 


//  Scroll Row 

//  AI Assistant 
export function matchAI(text: string) {
  const lower = text.toLowerCase();
  for (const [key, flow] of Object.entries(AI_FLOWS)) {
    if (key.split("|").some(k => lower.includes(k))) return flow;
  }
  return null;
}


//  Notifications Panel 


//  Placa Page 


//  Cursos Page 

//  perfil Page 

//  Ajustes Page 

function Section({ title, icon: Icon, color, children }: { title: string; icon: React.ElementType; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
        <div style={{ width:32,height:32,borderRadius:10,background:`${color}18`,border:`1px solid ${color}30`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 10px ${color}15` }}><Icon size={16} color={color} style={{ filter:`drop-shadow(0 0 3px ${color})` }} /></div>
        <h3 style={{ color:"#e8f0fe",fontSize:15,fontWeight:700,margin:0 }}>{title}</h3>
      </div>
      <div style={{ background: "var(--colorNeutralBackground1)",border: "1px solid var(--colorNeutralStroke1)",borderRadius:16,padding:"16px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
        {children}
      </div>
    </div>
  );
}

//  Algoritmo de Bsqueda (Levenshtein) 
export function levenshtein(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
}

//  Home Page 

//  Categories Page 

//  Search Results 

//  App 
//  Typography-First Minimalist Login Components 
const MaxiText = ({ text, color }: { text: string, color?: string }) => {
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 0.9, gap: "clamp(1rem, 2vw, 2rem)" }}>
      {words.map((word, wIdx) => (
        <div key={wIdx} style={{ display: "flex", flexWrap: "nowrap" }}>
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              whileHover={{ y: -15, color: "#00C2FF", scale: 1.1, textShadow: "0px 10px 30px rgba(0,194,255,0.6)", rotate: i%2===0?4:-4 }}
              transition={{ type: "spring", stiffness: 350, damping: 10 }}
              style={{ display: "inline-block", cursor: "default", color: color || "#FFFFFF", fontSize: "clamp(4.5rem, 9vw, 8.5rem)", fontWeight: 900, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.05em", textTransform: "uppercase" }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("fluent-theme") || localStorage.getItem("app_theme");
    return (saved === "light" || saved === "dark") ? saved : "light";
  });

  const toggleTheme = () => {
    haptic.selection();
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("fluent-theme", next);
      localStorage.setItem("app_theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [activeThemeKey, setActiveThemeKey] = useState<ThemeKey>(() => (localStorage.getItem("active-theme") as ThemeKey) || "andes");
  const [customBgQuery, setCustomBgQuery] = useState<string>(() => localStorage.getItem("custom-bg-query") || "");
  const [bgImageUrl, setBgImageUrl] = useState<string>(() => localStorage.getItem("app_bg_image") || "");

  useEffect(() => {
    if (customBgQuery && customBgQuery.trim().length > 0) {
      searchPexels(customBgQuery, "landscape", 1, 1).then(photos => {
        if (photos && photos.length > 0) {
          setBgImageUrl(photos[0].src.original || photos[0].src.large2x);
        }
      });
    } else if (activeThemeKey && activeThemeKey !== "andes" && THEMES[activeThemeKey]) {
      const q = THEMES[activeThemeKey].pexelsQuery;
      searchPexels(q, "landscape", 1, 1).then(photos => {
        if (photos && photos.length > 0) {
          setBgImageUrl(photos[0].src.original || photos[0].src.large2x);
        }
      });
    } else {
      setBgImageUrl("");
    }
  }, [customBgQuery, activeThemeKey]);

  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== "undefined" ? navigator.onLine : true));
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState<any>(() => {
    try {
      const cached = localStorage.getItem("ahorra_user_cache");
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(() => {
    try {
      const cached = localStorage.getItem("ahorra_user_cache");
      return cached ? true : null;
    } catch { return null; }
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem("ahorra_user_cache");
      if (cached) {
        const u = JSON.parse(cached);
        return (u.email || "").toLowerCase() === "plaeis260@gmail.com";
      }
      return false;
    } catch { return false; }
  });
  const [editingCms, setEditingCms] = useState<{ type: "tramite" | "categoria" | "site" | "express-list"; data?: any } | null>(null);
  const [siteConfig, setSiteConfig] = useState<any>({
    primaryColor: "#0284C7",
    logoText: "ahorratiempo",
    slogan: "gestiona hoy, ahorra siempre",
    showEmergencyBanner: false,
    emergencyBannerText: "Atención: Nuevo horario de atención en sedes RENIEC a nivel nacional."
  });
  const [expressList, setExpressList] = useState<ExpressItem[]>([]);
  const [dbUpdated, setDbUpdated] = useState(0);

  const [page, setPageState] = useState<Page>(() => {
    const rawHash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const validPages: Page[] = ["home", "categories", "favorites", "help", "privacidad", "terminos", "cookies", "perfil", "ajustes", "frutilota", "legal" as any];
    if (rawHash && validPages.includes(rawHash as Page) && rawHash !== "home" && rawHash !== "frutilota") {
      return rawHash as Page;
    }
    return "frutilota";
  });
  const [selected, setSelected] = useState<Tramite | null>(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiEntity, setAiEntity] = useState("SUNAT");

  const setPage = (p: Page, query?: string, entity?: string) => {
    if (query !== undefined) {
      setAiQuery(query);
    }
    if (entity !== undefined) {
      setAiEntity(entity);
    }
    setPageState(p);
    if (p === "frutilota" || p === "home") {
      if (typeof window !== "undefined") {
        window.history.replaceState({ page: p }, "", window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = `#${p}`;
    }
  };

  useEffect(() => {
    const titles: Record<string, string> = {
      home: "ahorratiempo | LOTA AI - Guía Oficial de Trámites",
      categories: "Catálogo de Trámites | ahorratiempo",
      favorites: "Mis Guardados | ahorratiempo",
      help: "Centro de Ayuda | ahorratiempo",
      privacidad: "Política de Privacidad | ahorratiempo",
      terminos: "Términos y Condiciones | ahorratiempo",
      cookies: "Política de Cookies | ahorratiempo",
      perfil: "Mi Perfil | ahorratiempo",
      ajustes: "Ajustes | ahorratiempo",
      frutilota: "ahorratiempo | LOTA AI - Guía Oficial de Trámites",
      "marketing-kit": "Kit Oficial de Marketing | ahorratiempo"
    };
    document.title = titles[page] || "ahorratiempo | LOTA AI";
  }, [page]);

  const handleSelectTramite = (t: Tramite | null) => {
    if (t) {
      haptic.success();
      window.open(t.url || "https://www.gob.pe/", "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const rawHash = window.location.hash.replace("#", "");
    const validPages: Page[] = ["home", "categories", "favorites", "help", "privacidad", "terminos", "cookies", "perfil", "ajustes", "frutilota", "marketing-kit", "legal" as any];
    
    let initial: Page = "frutilota";
    if (rawHash && validPages.includes(rawHash as any) && rawHash !== "home" && rawHash !== "frutilota") {
      initial = rawHash as Page;
      window.history.replaceState({ page: initial }, "", `#${initial}`);
    } else {
      window.history.replaceState({ page: "frutilota" }, "", window.location.pathname + window.location.search);
    }

    setPageState(initial);

    const handlePopState = (e: PopStateEvent) => {
      setSelected(null);
      if (e.state && e.state.page) {
        setPageState(e.state.page);
      } else {
        const h = window.location.hash.replace("#", "");
        if (h && validPages.includes(h as any) && h !== "frutilota" && h !== "home") {
          setPageState(h as any);
        } else {
          setPageState("frutilota");
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [frutiCount, setFrutiCount] = useState(() => parseInt(localStorage.getItem("frutiCount") || "0", 10));
  const [activityList, setActivityList] = useState<import('./types').ActivityItem[]>([]);

  const logActivity = async (text: string) => {
    if (!user) return;
    try {
      const docRef = doc(db, "actividad", user.uid);
      const docSnap = await getDoc(docRef);
      const newItem = {
        text,
        time: new Date().toLocaleString("es-PE", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric" }),
        timestamp: Date.now()
      };
      if (docSnap.exists()) {
        const history = docSnap.data().history || [];
        const newHistory = [newItem, ...history].slice(0, 10);
        await updateDoc(docRef, { history: newHistory });
      } else {
        await setDoc(docRef, { history: [newItem] });
      }
    } catch (e) {
      console.error("Error logging activity", e);
    }
  };
  const [notifs, setNotifs] = useState<Notif[]>(() => {
    const c = parseInt(localStorage.getItem("frutiCount") || "0", 10);
    const base = [...NOTIFICATIONS];
    if (c > 0) {
      base[0] = { ...base[0], desc: `Has realizado ${c} consultas este mes. Sigue así, estás ahorrando tiempo!` };
    }
    return base;
  });

  const handleFrutiQuery = () => {
    setFrutiCount(c => {
      const nc = c + 1;
      localStorage.setItem("frutiCount", nc.toString());
      logActivity("Consultaste a LOTA AI");
      setNotifs(prev => {
        const next = [...prev];
        next[0] = { ...next[0], desc: `Has realizado ${nc} consultas este mes. Sigue así, estás ahorrando tiempo!` };
        return next;
      });
      return nc;
    });
  };
  const notifCount = notifs.filter(n => n.isNew).length;

  // 1. Firebase Auth listener con sincronización de comprador en tiempo real
  useEffect(() => {
    let unsubUserDoc: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubUserDoc) {
        unsubUserDoc();
        unsubUserDoc = null;
      }

      if (firebaseUser) {
        const emailLower = (firebaseUser.email || "").toLowerCase();
        const docRef = doc(db, "compradores", emailLower);

        try {
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(docRef, {
              esAdmin: emailLower === "plaeis260@gmail.com",
              isPremium: false,
              createdAt: new Date(),
              displayName: firebaseUser.displayName || "",
              photoURL: firebaseUser.photoURL || ""
            });
          }
        } catch (err) {
          console.error("Error creando registro comprador:", err);
        }

        unsubUserDoc = onSnapshot(docRef, (snap) => {
          const data = snap.exists() ? snap.data() : {};
          const isPrem = data.isPremium === true;
          const isAdminUser = emailLower === "plaeis260@gmail.com" || data.esAdmin === true;

          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isPremium: isPrem
          };
          setUser(userData);
          setIsAuthorized(true);
          setIsAdmin(isAdminUser);
          try {
            localStorage.setItem("ahorra_user_cache", JSON.stringify(userData));
          } catch (e) {}

          // Si el usuario está suscrito, se le abre el chat con LOTA automáticamente (estilo ChatGPT / Claude)
          const currentHash = window.location.hash.replace("#", "");
          const explicitOtherPage = ["categories", "favorites", "help", "privacidad", "terminos", "cookies", "perfil", "ajustes", "legal"].includes(currentHash);
          if ((isPrem || isAdminUser) && (!currentHash || currentHash === "home") && !explicitOtherPage) {
            setPageState("frutilota");
          }
        });

      } else {
        setUser(null);
        setIsAuthorized(null);
        setIsAdmin(false);
        setIsAdminView(false);
        localStorage.removeItem("ahorra_user_cache");
      }
    });

    return () => {
      unsubscribe();
      if (unsubUserDoc) unsubUserDoc();
    };
  }, []);

  // 2. Real-time dynamic DB categories and procedures sync
  useEffect(() => {
    const unsubscribeCats = onSnapshot(collection(db, "categorias"), (snap) => {
      const list: Category[] = [];
      const LOCAL_LOGOS_MAP: Record<string, string[]> = {
        "MTC": ["/logos/MTC.png"],
        "ELECCIONES": ["/logos/ONPE.png"],
        "RENIEC": ["/logos/RENIEC.png"],
        "SALUD": ["/logos/MINSA.png", "/logos/ESSALUD.png"],
        "ECONOMIA Y FINANZAS": ["/logos/MEF.png"],
        "MTPE": ["/logos/MTPE.png"],
        "MINJUSDH": ["/logos/MINJUSDH.png"],
        "MINEDU": ["/logos/MINEDU.png"],
        "SUNARP": ["/logos/SUNARP.png"],
        "MIGRACIONES": ["/logos/MIGRACIONES_PERU.png"],
        "PENSIONES": ["/logos/AFP.png", "/logos/ONP.png"],
        "PRODUCE": ["/logos/PRODUCE.png"]
      };
      
      snap.forEach(d => {
        const data = d.data();
        const catName = data.label || data.name || "";
        list.push({
          id: d.id,
          name: catName,
          description: data.description || "",
          count: data.count || 0,
          colorA: data.colorA || data.color || "#00b4d8",
          colorB: data.colorB || data.color || "#00b4d8",
          Icon: getIconForCategory(d.id),
          logos: data.logos?.length ? data.logos : (LOCAL_LOGOS_MAP[catName.toUpperCase()] || getLogosForCategory(d.id)),
          bgImg: data.photo || data.bgImg || "",
          orden: data.orden || 999
        });
      });
      
      // Sort locally
      list.sort((a, b) => (a.orden || 999) - (b.orden || 999));

      if (list.length > 0) {
        CATS = list;
        setDbUpdated(prev => prev + 1);
      }
    });

    const unsubscribeProcs = onSnapshot(collection(db, "tramites"), (snap) => {
      const list: Tramite[] = [];
      snap.forEach(d => {
        const data = d.data();
        // Adaptamos el nuevo schema al viejo type Tramite para no romper el front público.
        list.push({
          id: String(d.id),
          title: data.title || "",
          categoryId: data.theme || data.category || "",
          entity: data.entity || "",
          price: data.cost || data.price || "Gratuito",
          isPaid: false,
          time: data.duration || data.time || "Inmediato",
          isImmediate: true,
          description: data.description || "",
          raw_content: data.raw_content || "",
          requirements: Array.isArray(data.requirements) ? data.requirements : (data.requirements ? [data.requirements] : []),
          considerations: Array.isArray(data.considerations) ? data.considerations : (data.considerations ? [data.considerations] : []),
          tips: Array.isArray(data.tips) ? data.tips : (data.tips ? [data.tips] : []),
          url: data.action_url || data.url || "",
          featured: !!data.featured,
          order: data.order || 999
        });
      });
      // Sort locally to avoid dropping documents without an order field
      list.sort((a, b) => (a.order || 999) - (b.order || 999));
      
      if (list.length > 0) {
        T = list;
        setDbUpdated(prev => prev + 1);
      }
    });

    // Sync favorites and activity
    let unsubscribeFavs: any = null;
    let unsubscribeAct: any = null;
    if (user && user.uid) {
      unsubscribeFavs = onSnapshot(doc(db, "favoritos", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const list = data.lista || [];
          setFavorites(new Set(list.map((item: any) => String(item))));
        } else {
          setFavorites(new Set());
        }
      });
      unsubscribeAct = onSnapshot(doc(db, "actividad", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setActivityList(docSnap.data().history || []);
        } else {
          setActivityList([]);
        }
      });
    }

    // Sync site configuration from Firestore
    const unsubscribeSiteConfig = onSnapshot(doc(db, "config", "site"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteConfig(prev => ({
          ...prev,
          ...data
        }));
      }
    });

    // Sync express items from Firestore
    const unsubscribeExpress = onSnapshot(query(collection(db, "express"), orderBy("orden", "asc")), (snap) => {
      const list: ExpressItem[] = [];
      snap.forEach(d => {
        const data = d.data();
        list.push({
          id: d.id,
          title: data.title || "",
          color: data.color || "#00b4d8",
          iconName: data.iconName || "FileText",
          tramiteId: data.tramiteId || "",
          page: data.page || "",
          orden: data.orden || 0
        });
      });
      setExpressList(list);
    });

    return () => {
      unsubscribeCats();
      unsubscribeProcs();
      if (unsubscribeFavs) unsubscribeFavs();
      if (unsubscribeAct) unsubscribeAct();
      unsubscribeSiteConfig();
      unsubscribeExpress();
    };
  }, [isAuthorized, user]);

  const toggleFav = async (id: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    const newFavs = new Set(favorites);
    const item = T.find(t => t.id === id);
    const itemName = item ? item.title : "trámite";

    if (newFavs.has(id)) {
      newFavs.delete(id);
      logActivity(`Eliminaste ${itemName} de favoritos`);
    } else {
      newFavs.add(id);
      logActivity(`Guardaste ${itemName} en favoritos`);
    }
    setFavorites(newFavs);
    try {
      await setDoc(doc(db, "favoritos", user.uid), {
        lista: Array.from(newFavs)
      });
    } catch (err) {
      console.error("Error al guardar favoritos:", err);
    }
  };

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n,isNew:false })));

  const handleLogout = async () => {
    localStorage.removeItem("frutiCount");
    localStorage.removeItem("ahorra_user_cache");
    localStorage.removeItem("lota_chat_history");
    localStorage.removeItem("frutilota_chat_history");
    setFrutiCount(0);
    setActivityList([]);
    setUser(null);
    setIsAuthorized(null);
    setIsAdmin(false);
    await auth.signOut();
  };

  // Pantalla de conexión cuando no hay internet
  if (!isOnline) {
    return <AppLoadingScreen isOffline={true} theme={theme} />;
  }

  // Denied Access View
  if (isAuthorized === false) {
    return (
      <ScreenB_AccessDenied
        userEmail={user?.email || ""}
        onBack={handleLogout}
      />
    );
  }

  if (page === ("legal" as any)) {
    return <Suspense fallback={<div style={{background: "var(--colorNeutralBackground1)",height:"100vh"}} />}><LegalPage /></Suspense>;
  }

  const validFavCount = T.filter(t => favorites.has(t.id)).length;

  return (
    <FluentProvider theme={theme === "dark" ? webDarkTheme : webLightTheme} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <style>{GLOBAL_CSS}</style>
      {isAdminView ? (
        <Suspense fallback={<div style={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>Cargando panel de administración...</div>}>
          <Admindashboard onExit={() => setIsAdminView(false)} />
        </Suspense>
      ) : (
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        height: "100vh", 
        width: "100vw",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        background: theme === 'dark' ? "#212121" : "#EDF3FA",
        color: theme === 'dark' ? "#ECECEC" : "#0B1E38"
      }}>
        <AdminCMSContext.Provider value={{ isAdmin, onEditCms: (type, data) => setEditingCms({ type, data }) }}>
          {page === "frutilota" ? (
            <div style={{ position: "fixed", inset: 0, zIndex: 100, background: theme === "dark" ? "#212121" : "#F8FAFC", display: "flex", flexDirection: "column", height: "100dvh", width: "100vw", overflow: "hidden" }}>
              <FrutilotaMascot 
                initialEntity={aiEntity}
                initialQuery={aiQuery} 
                onQueryEvent={handleFrutiQuery} 
                user={user} 
                onBack={() => {
                  setPage("home");
                  window.location.hash = "";
                }}
                onGoToCatalog={() => {
                  setPage("categories");
                  window.location.hash = "#categories";
                }}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenPaywall={() => setIsPaywallModalOpen(true)}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </div>
          ) : (
            <>
              {/* Sidebar mobile overlay (Drawer táctil bajo demanda) */}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} style={{ position:"fixed",inset:0,zIndex:200,display:"flex" }} onClick={() => setSidebarOpen(false)}>
                    <div style={{ background: theme === "dark" ? "rgba(0,0,0,.7)" : "rgba(15,23,42,.4)", position:"absolute", inset:0, backdropFilter:"blur(4px)" }} />
                    <motion.div initial={{ x:-320 }} animate={{ x:0 }} exit={{ x:-320 }} transition={{ type:"spring",damping:28,stiffness:280 }} style={{ position:"relative",zIndex:1,height:"100%" }} onClick={e => e.stopPropagation()}>
                      <Sidebar 
                        page={page} 
                        setPage={setPage} 
                        onLogout={handleLogout} 
                        faveCount={validFavCount} 
                        onClose={() => setSidebarOpen(false)} 
                        onAdmin={isAdmin ? () => setIsAdminView(true) : undefined} 
                        user={user} 
                        onLogin={() => setIsLoginModalOpen(true)}
                        onOpenPaywall={() => setIsPaywallModalOpen(true)}
                        theme={theme} 
                        toggleTheme={toggleTheme} 
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main App Header */}
              <AppHeader 
                page={page} 
                setPage={setPage} 
                faveCount={validFavCount} 
                user={user} 
                isAdmin={isAdmin}
                onAdmin={isAdmin ? () => setIsAdminView(true) : undefined}
                onLogin={() => setIsLoginModalOpen(true)} 
                onOpenPaywall={() => setIsPaywallModalOpen(true)} 
                onOpenSidebar={() => setSidebarOpen(true)} 
                onLogout={handleLogout}
                theme={theme} 
                toggleTheme={toggleTheme}
              />

              {/* Main Content Area */}
              <main className="main-content" style={{ flex: 1, overflowY: "auto", position: "relative", display: "flex", flexDirection: "column", minHeight: 0, background: theme === "dark" ? "#212121" : "#EDF3FA" }}>
                <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column", width: "100%" }}>
                  <AnimatePresence mode="wait">
                    <Suspense fallback={
                      <div style={{ display: "flex", minHeight: "50vh", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, color: theme === "dark" ? "#60A5FA" : "#2F6CB5", fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                          <SparkleRegular fontSize={20} />
                          <span>Cargando contenido...</span>
                        </div>
                      </div>
                    }>
                      <motion.div key={page} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} transition={{ duration:.25 }} style={{ flex: "1 0 auto", display: "flex", flexDirection: "column", width: "100%", maxWidth: page === "home" ? "100%" : 1240, margin: "0 auto", padding: page === "home" ? 0 : "24px 20px 40px" }}>
                        {page === "home"       && <HomePage       onSelect={handleSelectTramite} favorites={favorites} onFav={toggleFav} onNavigate={setPage} siteConfig={siteConfig} expressList={expressList} theme={theme} user={user} onLogin={() => setIsLoginModalOpen(true)} onOpenPaywall={() => setIsPaywallModalOpen(true)} />}
                        {page === "categories" && <CategoriesPage onSelect={handleSelectTramite} favorites={favorites} onFav={toggleFav} categories={CATS} tramites={T} dbUpdated={dbUpdated} theme={theme} user={user} onOpenPaywall={() => setIsPaywallModalOpen(true)} onNavigate={setPage} onLogin={() => setIsLoginModalOpen(true)} />}
                        {page === "favorites"  && <FavoritesPage  onSelect={handleSelectTramite} favs={T.filter(t => favorites.has(t.id))} onFav={toggleFav} onNavigate={setPage} theme={theme} />}
                        {page === "perfil"     && <PerfilPage     favCount={validFavCount} user={user} isAdmin={isAdmin} onAdmin={isAdmin ? () => setIsAdminView(true) : undefined} frutiCount={frutiCount} activityList={activityList} onNavigate={setPage} onLogin={() => setIsLoginModalOpen(true)} onOpenPaywall={() => setIsPaywallModalOpen(true)} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />}
                        {page === "help"       && <HelpPage       siteConfig={siteConfig} onNavigate={(p, q) => { if (q) setAiQuery(q); setPage(p as any); }} theme={theme} user={user} onLogin={() => setIsLoginModalOpen(true)} onOpenPaywall={() => setIsPaywallModalOpen(true)} />}
                        {page === "ajustes"    && <AjustesPage    theme={theme} toggleTheme={toggleTheme} />}
                        {page === "privacidad" && <PrivacyPage />}
                        {page === "terminos"   && <TermsPage />}
                        {page === "cookies"    && <CookiesPage />}
                        {page === "marketing-kit" && <MarketingKitPage onBack={() => { setPage("home"); window.location.hash = ""; }} theme={theme} />}
                        {page !== "home" && page !== "categories" && page !== "favorites" && page !== "perfil" && page !== "help" && page !== "ajustes" && page !== "privacidad" && page !== "terminos" && page !== "cookies" && page !== "marketing-kit" && (
                            <ErrorView 
                                code="404" 
                                imgName="icons8-top-view-fish" 
                                title="página no encontrada" 
                                message="La dirección a la que intentas acceder no existe o fue movida." 
                                actionText="Volver al inicio" 
                                onAction={() => window.location.hash = ""} 
                            />
                        )}
                      </motion.div>
                    </Suspense>
                  </AnimatePresence>
                </div>

                {/* Universal Desktop Footer para todas las vistas */}
                <AppFooter onNavigate={setPage} />
              </main>

              {/* Mobile Bottom Navigation Bar */}
              <MobileBottomNav 
                page={page} 
                setPage={setPage} 
                favCount={validFavCount} 
                user={user} 
                onLogin={() => setIsLoginModalOpen(true)} 
                onOpenPaywall={() => setIsPaywallModalOpen(true)} 
                isAdmin={isAdmin} 
              />
            </>
          )}
          

          {/* CMS Edit Modals */}
          {editingCms && editingCms.type === "tramite" && <TramiteEditorModal tramite={editingCms.data} dynamicCats={CATS} onClose={() => setEditingCms(null)} />}
          {editingCms && editingCms.type === "categoria" && <CategoryEditorModal category={editingCms.data} onClose={() => setEditingCms(null)} />}
          {editingCms && editingCms.type === "site" && <SiteConfigEditorModal config={siteConfig} onClose={() => setEditingCms(null)} />}
          {editingCms && editingCms.type === "express-list" && <ExpressManagerModal tramites={T} onClose={() => setEditingCms(null)} />}

          {/* Login Modal Flotante Integrado */}
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            onSuccess={() => setIsLoginModalOpen(false)} 
            theme={theme} 
          />

          {/* Modal de Pago / Suscripción LOTA AI PLUS */}
          <PaywallModal 
            isOpen={isPaywallModalOpen}
            onClose={() => setIsPaywallModalOpen(false)}
            user={user}
            theme={theme}
            onSuccess={() => {
              setIsPaywallModalOpen(false);
              setPage("frutilota");
            }}
          />
        </AdminCMSContext.Provider>

        {/* Toast alerts con Estilo ChatGPT */}
        <Toaster 
          theme={theme === "dark" ? "dark" : "light"} 
          position="bottom-right" 
          closeButton={false}
          offset={20}
        />
      </div>
      )}
    </FluentProvider>
  );
}
