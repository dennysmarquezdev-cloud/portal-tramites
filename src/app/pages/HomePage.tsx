import React, { useContext } from "react";
import { Page, Tramite, ExpressItem } from "../types";
import { AdminCMSContext } from "../context";
import { haptic } from "../utils/haptics";

// ── Institutional Logos Oficiales (17 Entidades del Estado) ──
import imgEssalud from "@/imports/logo-essalud-v2.png";
import imgBanco from "@/imports/BANCO-DE-LA-NACION.png";
import imgGrtca from "@/imports/GRTCArequipa-300x44.png";
import imgReniec from "@/imports/RENIEC-e1778099776494-300x125.png";
import imgSunat from "@/imports/SUNAT-e1777915183226-300x182.jpg";
import imgSunedu from "@/imports/SUNEDU-300x144.png";
import imgSunarp from "@/imports/SUNARP-300x166.png";
import imgPj from "@/imports/PJ-300x244.jpg";
import imgMigraciones from "@/imports/MIGRACIONES-300x92.png";
import imgInpe from "@/imports/INPE-e1778097255701-300x106.jpg";
import imgOnp from "@/imports/ONP-300x281.png";
import imgSedapar from "@/imports/Sedapar-860x1000.jpg";
import imgSedapal from "@/imports/SEDAPAL.jpg";
import imgSunafil from "@/imports/SUNAFIL-e1777051720181-300x257.jpg";
import imgSis from "@/imports/SIS.png";
import imgSatLima from "@/imports/SATLima-e1778602823912-300x197.jpg";
import imgOsinergmin from "@/imports/OSINERGMIN-300x88.png";

// ── 20 Celdas de la Cuadrícula 5x4 Exacta (17 Entidades + 3 Celdas de Relleno) ──
const GRID_ITEMS = [
  // Fila 1
  { key: "sunat",       src: imgSunat,       label: "Tributación & RUC",      query: "SUNAT" },
  { key: "reniec",      src: imgReniec,      label: "Identificación civil",    query: "RENIEC" },
  { key: "essalud",     src: imgEssalud,     label: "Salud & seguros",         query: "EsSalud" },
  { key: "sunarp",      src: imgSunarp,      label: "Registros públicos",      query: "SUNARP" },
  { key: "migraciones", src: imgMigraciones, label: "Pasaportes & extranjería", query: "Migraciones" },
  // Fila 2
  { key: "sunedu",      src: imgSunedu,      label: "Educación superior",      query: "SUNEDU" },
  { key: "banco",       src: imgBanco,       label: "Pagos oficiales",         query: "Banco de la Nación" },
  { key: "pj",          src: imgPj,          label: "Poder Judicial",          query: "Poder Judicial" },
  { key: "inpe",        src: imgInpe,        label: "Sistema penitenciario",   query: "INPE" },
  { key: "grtca",       src: imgGrtca,       label: "Transportes Arequipa",    query: "MTC" },
  // Fila 3
  { key: "onp",         src: imgOnp,         label: "Pensiones",               query: "ONP" },
  { key: "sedapar",     src: imgSedapar,     label: "Agua Arequipa",           query: "Sedapar" },
  { key: "sedapal",     src: imgSedapal,     label: "Agua Lima",               query: "Sedapal" },
  { key: "sunafil",     src: imgSunafil,     label: "Inspección laboral",      query: "SUNAFIL" },
  { key: "sis",         src: imgSis,         label: "Seguro integral",         query: "SIS" },
  // Fila 4
  { key: "satlima",     src: imgSatLima,     label: "Tributos Lima",           query: "SAT" },
  { key: "osinergmin",  src: imgOsinergmin,  label: "Energía & minería",       query: "Osinergmin" },
  { key: "empty-1",     src: null,           label: "",                       query: null },
  { key: "empty-2",     src: null,           label: "",                       query: null },
  { key: "empty-3",     src: null,           label: "",                       query: null },
];

interface HomePageProps {
  onSelect: (t: Tramite) => void;
  favorites: Set<string>;
  onFav: (id: string) => void;
  onNavigate: (p: Page, query?: string) => void;
  siteConfig?: any;
  expressList: ExpressItem[];
  theme?: "light" | "dark";
  user?: any;
  onLogin?: () => void;
  onOpenPaywall?: () => void;
}

export default function HomePage({
  onNavigate,
  user,
  onLogin,
  onOpenPaywall
}: HomePageProps) {
  const { isAdmin } = useContext(AdminCMSContext);

  const handleLotaClick = (customQuery?: string) => {
    haptic.medium();
    if (!user) {
      onLogin?.();
      return;
    }
    const emailLower = (user.email || "").toLowerCase();
    const isPrem = user.isPremium === true || emailLower === "plaeis260@gmail.com" || isAdmin;
    if (!isPrem) {
      onOpenPaywall?.();
      return;
    }
    onNavigate("frutilota", customQuery);
  };

  return (
    <div style={{ height: "100%", width: "100%", overflowY: "auto", position: "relative" }}>

      {/* ── 1. Hero Central LOTA AI ── */}
      <section className="lota-hero">
        <div className="lota-hero-inner">

          {/* Wordmark: LOTA    AI con espaciado amplio exacto */}
          <div className="lota-wordmark">
            <span className="lota-wordmark-lota">LOTA</span>
            <span className="lota-wordmark-ai">AI</span>
          </div>

          {/* Tagline Cívico Oficial de 3 Líneas Equilibradas */}
          <p className="lota-tagline">
            Tu localizadora y orientadora oficial de trámites ágiles<br />
            para resolver gestiones públicas sin colas ni<br />
            confusiones.
          </p>

          {/* Botón Principal LOTA AI (Diseño Institucional) */}
          <div className="lota-cta-wrap">
            <button 
              className="lota-cta-primary" 
              onClick={() => handleLotaClick()}
              aria-label="Consultar trámite con LOTA AI"
            >
              {/* Ícono de Destello / Sparkle Celeste */}
              <svg className="lota-cta-spark" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.05 3.05l2.12 2.12M10.83 10.83l2.12 2.12M10.83 5.17l2.12-2.12M3.05 12.95l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              
              <span>Consultar trámite con LOTA AI</span>
              
              {/* Flecha Derecha */}
              <svg className="lota-cta-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ── 2. Divisor Sutil Diagonal ── */}
      <div className="lota-hero-separator" aria-hidden="true">
        <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none">
          <path d="M0 0L1440 20" stroke="#7BBFDC" strokeWidth="1.5" strokeOpacity="0.75" />
        </svg>
      </div>

      {/* ── 3. Sección de Entidades Oficiales con Tarjeta 5x4 ── */}
      <section className="logos-section">
        {/* Título de la sección */}
        <p className="logos-section-label">
          CONECTADO CON ENTIDADES OFICIALES DEL ESTADO PERUANO
        </p>

        {/* Tarjeta contenedora blanca con bordes internos */}
        <div className="logos-container-card">
          <div className="logos-grid-5">
            {GRID_ITEMS.map((item, idx) => {
              if (!item.src) {
                return (
                  <div 
                    key={item.key || idx} 
                    className="logo-cell logo-cell--empty" 
                    aria-hidden="true" 
                  />
                );
              }
              return (
                <div
                  key={item.key}
                  className="logo-cell"
                  onClick={() => {
                    haptic.selection();
                    if (item.query) {
                      onNavigate("categories", item.query);
                    }
                  }}
                  title={`Ver trámites de ${item.label}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      haptic.selection();
                      if (item.query) onNavigate("categories", item.query);
                    }
                  }}
                >
                  <img 
                    src={item.src} 
                    alt={`Logo oficial de ${item.label}`} 
                    className="logo-img" 
                    loading="lazy" 
                  />
                  <span className="logo-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
