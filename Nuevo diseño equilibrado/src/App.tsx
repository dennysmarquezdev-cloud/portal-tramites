import { useState } from "react";
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

type Page = "inicio" | "categorias" | "favoritos" | "perfil" | "ayuda" | "consultar";

// ── Palette ───────────────────────────────────────────────────────────────────
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

const G = `'Space Grotesk', sans-serif`;
const I = `'Inter', sans-serif`;
const IS_PLUS = true; // plan del usuario actual

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV: { id: Page; label: string }[] = [
  { id: "inicio",     label: "Inicio"          },
  { id: "categorias", label: "Categorías"      },
  { id: "favoritos",  label: "Favoritos"       },
  { id: "perfil",     label: "Mi Perfil"       },
  { id: "ayuda",      label: "Ayuda"           },
];

const CATS = [
  { name: "Ayuda social",           count: 8,  desc: "Consultas e inscripciones a programas y bonos."   },
  { name: "Conducir",               count: 9,  desc: "Brevete, identificación vehicular y multas."       },
  { name: "Denunciar o reclamar",   count: 16, desc: "Daños, patrimonio, animales y medio ambiente."    },
  { name: "Educación",              count: 7,  desc: "Matrícula, certificados, becas y cursos."          },
  { name: "Emprender",              count: 13, desc: "Iniciar un negocio, contratar con el Estado."      },
  { name: "Familia",                count: 18, desc: "Matrimonio, maternidad y denuncias."               },
  { name: "Identificación",         count: 7,  desc: "DNI, partidas y firma digital."                   },
  { name: "Entidades públicas",     count: 2,  desc: "Información pública y transparencia."             },
  { name: "Salud",                  count: 11, desc: "Atención médica y seguros de salud."              },
  { name: "Trabajo",                count: 15, desc: "Convocatorias, recibos y derechos laborales."     },
  { name: "Viajar al extranjero",   count: 18, desc: "Pasaporte, documentación y requisitos."           },
  { name: "Vivienda",               count: 11, desc: "Servicios básicos y trámites municipales."        },
  { name: "Extranjeros en Perú",    count: 9,  desc: "Carnés, residencia y permisos."                  },
];

const CHAT_HISTORY = [
  { group: "Hoy",         title: "¿Cómo consultar mi RUC en SUNAT?",                    preview: "Consultar RUC · SUNAT",           time: "1:59 p.m."  },
  { group: "Hoy",         title: "Requisitos para renovar mi DNI",                       preview: "Renovación de DNI · RENIEC",       time: "11:20 a.m." },
  { group: "Ayer",        title: "¿Cómo obtener mi Clave SOL por primera vez?",          preview: "Clave SOL · SUNAT",               time: "5:26 p.m."  },
  { group: "Ayer",        title: "Trámite de duplicado de acta de nacimiento",           preview: "Acta de nacimiento · RENIEC",     time: "3:10 p.m."  },
  { group: "Esta semana", title: "¿Cuánto cuesta el brevete A-I?",                       preview: "Licencia de conducir · MTC",      time: "2 set."     },
  { group: "Esta semana", title: "Suspensión de retenciones – Formulario 1609",          preview: "Formulario 1609 · SUNAT",         time: "1 set."     },
  { group: "Esta semana", title: "Inscripción en EsSalud como independiente",            preview: "Afiliación · EsSalud",            time: "31 ago."    },
];

const FAQS = [
  "¿Cómo tramito el duplicado o renovación de mi DNI?",
  "¿Cómo obtengo mi Clave SOL de SUNAT por primera vez?",
  "¿Qué es y cómo realizo pagos en Págalo.pe?",
  "¿Cómo consulto mis puntos de brevete o récord MTC?",
];

// ── Shared atoms ──────────────────────────────────────────────────────────────
function Logo({ size = 18 }: { size?: number }) {
  return (
    <span style={{ fontFamily: G, fontWeight: 700, fontSize: size, letterSpacing: "-0.04em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: T.violet }}>ahorra</span>
      <span style={{ color: T.strong }}>tiempo</span>
      <span style={{ color: T.muted, fontWeight: 400 }}>.pe</span>
    </span>
  );
}

function Tag({ children, color = T.muted }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 100,
      background: T.cream, border: `1px solid ${T.border}`,
      fontSize: 11, fontWeight: 600, color, fontFamily: I,
      letterSpacing: "0.02em",
    }}>
      {children}
    </span>
  );
}

function PrimaryBtn({ children, onClick, full, sm }: { children: React.ReactNode; onClick?: () => void; full?: boolean; sm?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: sm ? "8px 18px" : "12px 24px",
        background: hov ? T.violet2 : T.violet,
        color: "#fff", border: "none", borderRadius: 10,
        fontFamily: G, fontWeight: 600, fontSize: sm ? 13 : 14,
        letterSpacing: "-0.01em", cursor: "pointer",
        width: full ? "100%" : undefined,
        transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px", borderRadius: 10,
        background: hov ? T.border : "transparent",
        border: `1.5px solid ${T.border}`,
        color: T.ink, fontFamily: G, fontWeight: 600,
        fontSize: 13, cursor: "pointer", transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: 14, ...style }}>
      {children}
    </div>
  );
}

// ── Institutional logos ───────────────────────────────────────────────────────
const INST_LOGOS = [
  { key: "sunat",      src: imgSunat,      label: "Tributación & RUC"     },
  { key: "reniec",     src: imgReniec,     label: "Identificación civil"   },
  { key: "essalud",    src: imgEssalud,    label: "Salud & seguros"        },
  { key: "sunarp",     src: imgSunarp,     label: "Registros públicos"     },
  { key: "migraciones",src: imgMigraciones,label: "Pasaportes & extranjería"},
  { key: "sunedu",     src: imgSunedu,     label: "Educación superior"     },
  { key: "banco",      src: imgBanco,      label: "Pagos oficiales"        },
  { key: "pj",         src: imgPj,         label: "Poder Judicial"         },
  { key: "inpe",       src: imgInpe,       label: "Sistema penitenciario"  },
  { key: "grtca",      src: imgGrtca,      label: "Transportes Arequipa"   },
  { key: "onp",        src: imgOnp,        label: "Pensiones"              },
  { key: "sedapar",    src: imgSedapar,    label: "Agua Arequipa"          },
  { key: "sedapal",    src: imgSedapal,    label: "Agua Lima"              },
  { key: "sunafil",    src: imgSunafil,    label: "Inspección laboral"     },
  { key: "sis",        src: imgSis,        label: "Seguro integral"        },
  { key: "satlima",    src: imgSatLima,    label: "Tributos Lima"          },
  { key: "osinergmin", src: imgOsinergmin, label: "Energía & minería"      },
];

const QUICK_TRAMITES = [
  { icon: "🪪", label: "Renovar DNI",       sub: "RENIEC" },
  { icon: "📋", label: "Consultar RUC",      sub: "SUNAT"  },
  { icon: "🔑", label: "Obtener Clave SOL",  sub: "SUNAT"  },
  { icon: "🚗", label: "Tramitar brevete",   sub: "MTC"    },
  { icon: "🏥", label: "Afiliación EsSalud", sub: "EsSalud"},
  { icon: "🛂", label: "Pasaporte",          sub: "Migraciones"},
];

// ── INICIO ────────────────────────────────────────────────────────────────────
function InicioView({ onConsultar }: { onConsultar: () => void }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", background: T.sand }}>

      {/* ── Hero ── */}
      <div className="lota-hero" style={{ minHeight: "calc(100vh - 56px - 44px)" }}>
        <div className="lota-hero-inner">

          <div className="lota-wordmark">
            <span className="lota-wordmark-lota">LOTA</span>
            <span className="lota-wordmark-ai">AI</span>
          </div>

          <p className="lota-tagline">
            Tu localizadora y orientadora oficial de trámites ágiles para
            resolver gestiones públicas sin colas ni confusiones.
          </p>

          <div className="lota-cta-wrap">
            <button className="lota-cta-primary" onClick={onConsultar}>
              <svg className="lota-cta-spark" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3.05 3.05l1.42 1.42M10.53 10.53l1.42 1.42M10.53 4.47l1.42-1.42M3.05 11.95l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Consultar trámite con LOTA AI
              <svg className="lota-cta-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Logos strip ── */}
      <div style={{ padding: "32px 0 48px", background: T.sand, borderTop: `1px solid ${T.border}` }}>
        <p style={{ fontFamily: I, fontSize: 11, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", margin: "0 0 20px" }}>
          Conectado con entidades oficiales del Estado peruano
        </p>
        <div className="logos-grid">
          {INST_LOGOS.map(({ key, src, label }) => (
            <div key={key} className="logo-cell">
              <img src={src} alt={label} className="logo-img" />
              <span className="logo-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── CATEGORÍAS ────────────────────────────────────────────────────────────────
const TRAMITES = [
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Emitir recibo por honorarios electrónico" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Consultar RUC" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Emitir factura electrónica - Sistema de Emisión Electrónica – SOL" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Obtener ficha RUC electrónica" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "SUNAT Operaciones en Línea - SOL" },
  { entidad: "SUNAT",      costo: "S/ 48",    titulo: "Solicitar suspensión de retenciones de cuarta categoría - Formulario N° 1609" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Emitir Guía de Remisión Electrónica (GRE) - SOL" },
  { entidad: "SUNAT",      costo: "Gratuito", titulo: "Emitir boleta de venta electrónica" },
  { entidad: "RENIEC",     costo: "S/ 27",    titulo: "Renovación de DNI" },
  { entidad: "RENIEC",     costo: "S/ 27",    titulo: "Duplicado de DNI por pérdida o deterioro" },
  { entidad: "RENIEC",     costo: "Gratuito", titulo: "Consulta de datos del DNI en línea" },
  { entidad: "RENIEC",     costo: "Gratuito", titulo: "Inscripción de nacimiento extemporáneo" },
  { entidad: "MTC",        costo: "S/ 25",    titulo: "Tramitar licencia de conducir categoría A-I" },
  { entidad: "MTC",        costo: "Gratuito", titulo: "Consultar récord de conductor en línea" },
  { entidad: "MTC",        costo: "S/ 25",    titulo: "Renovación de licencia de conducir" },
  { entidad: "EsSalud",    costo: "Gratuito", titulo: "Afiliación como asegurado regular" },
  { entidad: "EsSalud",    costo: "Gratuito", titulo: "Consulta de derechohabientes" },
  { entidad: "Migraciones",costo: "S/ 98",    titulo: "Tramitar pasaporte electrónico" },
  { entidad: "Migraciones",costo: "Gratuito", titulo: "Consultar movimiento migratorio" },
  { entidad: "SUNARP",     costo: "S/ 20",    titulo: "Búsqueda de índice de propietarios" },
  { entidad: "SUNARP",     costo: "Gratuito", titulo: "Consulta en línea de partidas registrales" },
  { entidad: "ONP",        costo: "Gratuito", titulo: "Consultar semanas aportadas al SNP" },
  { entidad: "ONP",        costo: "Gratuito", titulo: "Solicitar Bono de Reconocimiento" },
];

const ENTIDAD_CHIPS = ["Todos", "SUNAT", "RENIEC", "MTC", "EsSalud", "Migraciones", "SUNARP", "ONP"];

function CategoriasView() {
  const [search, setSearch] = useState("");
  const [entidad, setEntidad] = useState("Todos");

  const filtered = TRAMITES.filter(t => {
    const matchEntidad = entidad === "Todos" || t.entidad === entidad;
    const matchSearch = t.titulo.toLowerCase().includes(search.toLowerCase()) || t.entidad.toLowerCase().includes(search.toLowerCase());
    return matchEntidad && matchSearch;
  });

  return (
    <div style={{ height: "100%", overflowY: "auto", background: T.sand }}>
      <div className="catalogo-wrap">

        {/* Header */}
        <div className="catalogo-header">
          <h2 className="catalogo-title">Catálogo de trámites</h2>
          <div className="catalogo-search-wrap">
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", flexShrink: 0 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke={T.muted} strokeWidth="1.3"/>
              <path d="M10 10l2 2" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar trámite..." type="text"
              className="catalogo-search"
            />
          </div>
        </div>

        {/* Entity chips */}
        <div className="catalogo-chips">
          {ENTIDAD_CHIPS.map(e => (
            <button
              key={e}
              onClick={() => setEntidad(e)}
              className={`catalogo-chip${entidad === e ? " catalogo-chip--active" : ""}`}
            >{e}</button>
          ))}
        </div>

        {/* List */}
        <div className="catalogo-list">
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", fontFamily: I, fontSize: 14, color: T.muted }}>
              Sin resultados para "{search}"
            </div>
          )}
          {filtered.map((t, i) => (
            <button key={i} className="catalogo-item">
              <div className="catalogo-item-top">
                <span className="catalogo-item-entidad">{t.entidad}</span>
                <span className={`catalogo-item-costo${t.costo !== "Gratuito" ? " catalogo-item-costo--paid" : ""}`}>
                  {t.costo}
                </span>
              </div>
              <div className="catalogo-item-titulo">{t.titulo}</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── PERFIL ────────────────────────────────────────────────────────────────────
function PerfilView() {
  return (
    <div className="page-pad" style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* Name header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: `linear-gradient(135deg, ${T.violet} 0%, #9B5BFF 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: G, fontWeight: 700, fontSize: 22, color: "#fff",
            position: "relative", flexShrink: 0,
          }}>
            D
            <span style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: T.sage, border: "2px solid " + T.sand }} />
          </div>
          <div>
            <h1 style={{ fontFamily: G, fontWeight: 700, fontSize: 26, letterSpacing: "-0.04em", color: T.strong, margin: "0 0 4px" }}>
              Dennys Marquez
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: I, fontSize: 13, color: T.muted }}>plaeis260@gmail.com</span>
              <span style={{ fontFamily: I, fontSize: 11, fontWeight: 700, color: T.violet, background: T.lilac, padding: "2px 8px", borderRadius: 100 }}>PLUS</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{ marginBottom: 20 }}>
          {[
            { val: "2",    label: "Trámites guardados",    sub: "Acceso prioritario activo" },
            { val: "30",   label: "Consultas inteligentes", sub: "Respondidas por LOTA AI"   },
            { val: "12 h", label: "Tiempo ahorrado",        sub: "Colas evitadas estimadas"  },
          ].map((s, i) => (
            <Card key={s.label} style={{
              padding: "28px 28px",
              borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              borderRight: i < 2 ? "none" : `1px solid ${T.border}`,
              borderLeft: i > 0 ? "none" : `1px solid ${T.border}`,
            }}>
              <div style={{ fontFamily: G, fontWeight: 700, fontSize: 44, color: T.strong, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>
                {s.val}
              </div>
              <div style={{ fontFamily: I, fontWeight: 600, fontSize: 13, color: T.ink, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontFamily: I, fontSize: 12, color: T.muted }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        <div className="perfil-main">
          {/* LOTA AI */}
          <Card style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 16, letterSpacing: "-0.03em", color: T.strong, margin: "0 0 4px" }}>
                  LOTA AI — Asistente 24/7
                </h3>
                <p style={{ fontFamily: I, fontSize: 13, color: T.muted, margin: 0 }}>Orientación ciudadana y trámites oficiales del Estado</p>
              </div>
            </div>

            <p style={{ fontFamily: I, fontSize: 13, color: T.muted, lineHeight: 1.7, margin: 0 }}>
              ¿Tienes dudas sobre cómo renovar tu DNI, tramitar tu Clave SOL o consultar antecedentes? Pregúntale a LOTA AI para obtener requisitos y enlaces oficiales al instante.
            </p>

            <PrimaryBtn full>
              Iniciar Consulta con LOTA AI
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M8 4l3 2.5L8 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </PrimaryBtn>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: T.sand, borderRadius: 10, fontSize: 12, color: T.muted, fontFamily: I }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L2 3.5v4c0 2.5 2.2 4.5 5 5 2.8-.5 5-2.5 5-5v-4L7 1.5z" stroke={T.sage} strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              Tus consultas y favoritos se guardan de forma privada y segura.
            </div>
          </Card>

          {/* Historial */}
          <Card style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 16, letterSpacing: "-0.03em", color: T.strong, margin: 0 }}>Historial</h3>
              <span style={{ fontFamily: I, fontSize: 11, color: T.muted }}>Últimas acciones</span>
            </div>
            {CHAT_HISTORY.slice(0, 5).map((c, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "11px 0",
                borderTop: `1px solid ${T.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.violet, flexShrink: 0 }} />
                  <span style={{ fontFamily: I, fontSize: 13, color: T.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: I, fontSize: 11, color: T.muted, whiteSpace: "nowrap", marginLeft: 8 }}>{c.time}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── AYUDA ─────────────────────────────────────────────────────────────────────
function AyudaView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: "", correo: "", detalle: "" });

  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 14px",
    border: `1.5px solid ${T.border}`, borderRadius: 10,
    fontSize: 14, outline: "none", color: T.ink,
    background: T.sand, fontFamily: I, transition: "border-color 0.15s",
  };

  return (
    <div className="page-pad" style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
              Soporte oficial
            </p>
            <h2 style={{ fontFamily: G, fontWeight: 700, fontSize: 34, letterSpacing: "-0.04em", color: T.strong, margin: 0 }}>
              Centro de Ayuda
            </h2>
          </div>
          <PrimaryBtn sm onClick={() => {}}>
            Consultar con LOTA AI
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M8 4l3 2.5L8 9" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PrimaryBtn>
        </div>

        <div className="ayuda-grid">
          {/* Channels */}
          <Card style={{ padding: 28 }}>
            <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: T.strong, margin: "0 0 4px" }}>
              Canales de Atención
            </h3>
            <p style={{ fontFamily: I, fontSize: 13, color: T.muted, margin: "0 0 24px" }}>
              Asistencia ciudadana personalizada y respuestas oficiales.
            </p>

            {[
              { label: "WhatsApp Soporte", badge: "~5 MIN",   badgeColor: "#00875A" },
              { label: "Correo Oficial",   badge: "< 24 HRS", badgeColor: T.violet  },
            ].map(ch => (
              <div key={ch.label} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", border: `1.5px solid ${T.border}`,
                borderRadius: 10, marginBottom: 10, cursor: "pointer",
                background: T.sand,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: I, fontWeight: 600, fontSize: 14, color: T.ink }}>{ch.label}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "2px 8px", borderRadius: 100,
                    background: ch.badgeColor + "18", color: ch.badgeColor,
                    fontFamily: I,
                  }}>
                    {ch.badge}
                  </span>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5.5M10 2v4.5" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: "14px 16px", background: T.sand, borderRadius: 10 }}>
              <p style={{ fontFamily: I, fontSize: 12, color: T.muted, margin: "0 0 4px" }}>
                Lun–Vie 8:00 AM – 6:00 PM · Sáb 9:00 AM – 1:00 PM
              </p>
              <p style={{ fontFamily: I, fontSize: 12, color: T.muted, margin: 0 }}>
                Pagos en Págalo.pe y bancos autorizados del Estado.
              </p>
            </div>
          </Card>

          {/* Form */}
          <Card style={{ padding: 28 }}>
            <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: T.strong, margin: "0 0 4px" }}>
              Enviar Consulta Directa
            </h3>
            <p style={{ fontFamily: I, fontSize: 13, color: T.muted, margin: "0 0 24px" }}>
              Un asesor revisará tu caso y responderá a tu correo.
            </p>

            {[
              { k: "nombre", label: "Nombre Completo",    ph: "Ej. Carlos Ramírez",    type: "text"  },
              { k: "correo", label: "Correo Electrónico", ph: "tucorreo@gmail.com",     type: "email" },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.strong, display: "block", marginBottom: 6 }}>
                  {f.label}
                </label>
                <input
                  type={f.type} placeholder={f.ph}
                  value={form[f.k as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                  style={inp}
                  onFocus={e => (e.target.style.borderColor = T.violet)}
                  onBlur={e => (e.target.style.borderColor = T.border)}
                />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.strong, display: "block", marginBottom: 6 }}>
                Detalle de la Consulta
              </label>
              <textarea
                rows={3} placeholder="Describe brevemente qué trámite necesitas resolver..."
                value={form.detalle} onChange={e => setForm({ ...form, detalle: e.target.value })}
                style={{ ...inp, resize: "none" }}
                onFocus={e => (e.target.style.borderColor = T.violet)}
                onBlur={e => (e.target.style.borderColor = T.border)}
              />
            </div>

            <PrimaryBtn full>
              Enviar Consulta
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5L12 2l-4 10-2-3.5-2-2z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </PrimaryBtn>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.border}` }}>
            <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: T.strong, margin: 0 }}>
              Preguntas Frecuentes
            </h3>
          </div>
          {FAQS.map((q, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "17px 28px",
                background: "transparent", border: "none",
                borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{ fontFamily: I, fontSize: 14, fontWeight: openFaq === i ? 600 : 400, color: openFaq === i ? T.strong : T.ink }}>
                {q}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 16 }}
              >
                <path d="M2.5 5l4.5 4 4.5-4" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── FAVORITOS ─────────────────────────────────────────────────────────────────
function FavoritosView({ onExplorar }: { onExplorar: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: T.lilac, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 20S4 14 4 8.5a4.5 4.5 0 019-1.5 4.5 4.5 0 019 1.5C22 14 12 20 12 20z" stroke={T.violet} strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: G, fontWeight: 700, fontSize: 32, letterSpacing: "-0.04em", color: T.strong, margin: "0 0 8px" }}>2 guardados</h2>
      <p style={{ fontFamily: I, fontSize: 15, color: T.muted, margin: "0 0 28px" }}>Acceso prioritario a tus guías de trámite.</p>
      <GhostBtn onClick={onExplorar}>Explorar catálogo</GhostBtn>
    </div>
  );
}

// ── CHAT / CONSULTAR ──────────────────────────────────────────────────────────
const ENTIDADES = [
  { id: "sunat",      label: "SUNAT",      sub: "Tributos, RUC y Clave SOL",         color: "#F5A623" },
  { id: "reniec",     label: "RENIEC",     sub: "DNI digital, actas y duplicados",    color: "#004A8F" },
  { id: "mtc",        label: "MTC",        sub: "Licencias de conducir y papeletas",  color: "#003087" },
  { id: "essalud",    label: "EsSalud",    sub: "Seguros, acreditaciones y citas",    color: "#006B4E" },
  { id: "migraciones",label: "Migraciones",sub: "Pasaportes y extranjería",           color: "#6B3FA0" },
];

const HISTORIAL = [
  { ent: "SUNAT",  label: "Emitir recibo por honorarios electrónico",               costo: "Gratuito" },
  { ent: "SUNAT",  label: "Consultar RUC",                                           costo: "Gratuito" },
  { ent: "SUNAT",  label: "Emitir factura electrónica – Sistema SOL",                costo: "Gratuito" },
  { ent: "SUNAT",  label: "Obtener ficha RUC electrónica",                           costo: "Gratuito" },
  { ent: "SUNAT",  label: "Solicitar suspensión de retenciones – Formulario 1609",   costo: "S/ 48"    },
  { ent: "RENIEC", label: "Renovación de DNI",                                       costo: "S/ 39"    },
  { ent: "RENIEC", label: "Duplicado de acta de nacimiento",                         costo: "Gratuito" },
];

const COLLECTIONS = [
  { label: "SUNAT (Tributos & RUC)",       color: "#F5A623" },
  { label: "RENIEC (DNI & Identidad)",     color: "#004A8F" },
  { label: "MTC (Brevete & Tránsito)",     color: "#003087" },
  { label: "SUNARP (Registros Públicos)",  color: "#1B5E9B" },
  { label: "EsSalud (Salud & Citas)",      color: "#F59E0B" },
];

const SECTIONS = [
  {
    icon: "📄",
    label: "Descripción",
    count: null,
    content: "El trámite de \"Consultar RUC\" permite a los ciudadanos verificar si una persona o empresa está registrada en SUNAT y si están funcionando de manera legal.",
  },
  { icon: "📋", label: "Requisitos",                    count: 3,  content: null },
  { icon: "⚠️", label: "Consideraciones y Notas",      count: 3,  content: null },
  { icon: "🚀", label: "Pasos para realizar el trámite", count: 18, content: null },
];

function ChatInput({
  value, onChange, onSend, entity, onEntityChange,
}: {
  value: string; onChange: (v: string) => void; onSend: () => void;
  entity: string; onEntityChange: (id: string) => void;
}) {
  const [dropdown, setDropdown] = useState(false);
  const active = ENTIDADES.find(e => e.id === entity)!;

  return (
    <div style={{ position: "relative" }}>
      {/* Entity dropdown */}
      {dropdown && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0,
          width: 280, background: T.cream, border: `1px solid ${T.border}`,
          borderRadius: 14, overflow: "hidden", zIndex: 50,
          boxShadow: "0 8px 32px rgba(13,2,33,0.10)",
        }}>
          <div style={{ padding: "10px 16px 8px", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontFamily: I, fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Especializaciones del Estado
            </span>
          </div>
          {ENTIDADES.map(e => (
            <button
              key={e.id}
              onClick={() => { onEntityChange(e.id); setDropdown(false); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", background: entity === e.id ? T.lilac : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: G, fontWeight: 600, fontSize: 14, color: entity === e.id ? T.violet : T.strong }}>
                    {e.label}
                  </span>
                  {entity === e.id && (
                    <span style={{ fontFamily: I, fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "1px 6px", borderRadius: 100, background: T.violet, color: "#fff" }}>
                      ACTIVO
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: I, fontSize: 12, color: T.muted }}>{e.sub}</span>
              </div>
              {entity !== e.id && (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="1" width="11" height="11" rx="2.5" stroke={T.border} strokeWidth="1.2"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Input card */}
      <div style={{
        background: T.cream, border: `1.5px solid ${T.border}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(13,2,33,0.06)",
      }}>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
          placeholder="Pregunta a LOTA AI sobre trámites oficiales..."
          rows={2}
          style={{
            width: "100%", padding: "16px 18px 8px", border: "none", outline: "none",
            resize: "none", fontFamily: I, fontSize: 15, color: T.ink,
            background: "transparent", lineHeight: 1.5,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", padding: "8px 12px 12px", gap: 8 }}>
          {/* + */}
          <button style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {/* Entity chip */}
          <button
            onClick={() => setDropdown(!dropdown)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 10px", borderRadius: 8,
              background: T.sand, border: `1.5px solid ${T.border}`,
              cursor: "pointer", fontFamily: I, fontWeight: 600, fontSize: 13,
              color: T.strong,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: active.color, flexShrink: 0 }} />
            {active.label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5l3 3 3-3" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div style={{ flex: 1 }} />

          {/* Mic */}
          <button style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="4.5" y="1" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M2 7c0 2.761 2.239 5 5 5s5-2.239 5-5M7 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Send */}
          <button
            onClick={onSend}
            style={{
              width: 32, height: 32, borderRadius: 8, border: "none",
              background: value.trim() ? T.violet : T.border,
              cursor: value.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M7 2l5 5-5 5" stroke={value.trim() ? "#fff" : T.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function TramiteCard() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : [...o, i]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header card */}
      <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: "14px 14px 0 0", padding: "22px 24px 18px", borderBottom: "none" }}>
        <h3 style={{ fontFamily: G, fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em", color: T.strong, margin: "0 0 12px" }}>
          Consultar RUC
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "SUNAT",             icon: "🏛️" },
            { label: "Costo: Gratuito",   icon: "⭐" },
            { label: "Requiere Clave SOL", icon: "🔑" },
          ].map(b => (
            <span key={b.label} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 100,
              background: T.sand, border: `1px solid ${T.border}`,
              fontFamily: I, fontSize: 12, fontWeight: 500, color: T.muted,
            }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderTop: "none", overflow: "hidden" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 24px", background: T.sand, borderBottom: `1px solid ${T.border}`,
        }}>
          <span style={{ fontFamily: I, fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Detalles del trámite (4 secciones)
          </span>
          <button
            onClick={() => setOpen(open.length === SECTIONS.length ? [] : SECTIONS.map((_, i) => i))}
            style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.violet, background: "none", border: "none", cursor: "pointer" }}
          >
            {open.length === SECTIONS.length ? "Colapsar todo" : "Desplegar todo"}
          </button>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ borderBottom: i < SECTIONS.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "14px 24px", background: "transparent", border: "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontFamily: G, fontWeight: 600, fontSize: 14, color: T.strong, flex: 1, letterSpacing: "-0.01em" }}>
                {s.label}
              </span>
              {s.count && (
                <span style={{ fontFamily: I, fontSize: 11, fontWeight: 600, color: T.muted }}>
                  {s.count} items
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: open.includes(i) ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                <path d="M2.5 5l4.5 4 4.5-4" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {open.includes(i) && s.content && (
              <div style={{ padding: "0 24px 18px 54px" }}>
                <p style={{ fontFamily: I, fontSize: 14, color: T.muted, lineHeight: 1.7, margin: 0 }}>{s.content}</p>
              </div>
            )}
            {open.includes(i) && !s.content && (
              <div style={{ padding: "0 24px 18px 54px" }}>
                {Array.from({ length: s.count ?? 0 }).slice(0, 3).map((_, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.violet, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontFamily: I, fontSize: 13, color: T.muted }}>
                      {s.label === "Requisitos"
                        ? ["DNI vigente del solicitante", "Número de RUC a consultar", "Acceso a internet o punto de atención SUNAT"][j]
                        : s.label === "Consideraciones y Notas"
                        ? ["El servicio es completamente gratuito", "Disponible 24/7 en la web de SUNAT", "No requiere registro previo"][j]
                        : `Paso ${j + 1} del proceso`}
                    </span>
                  </div>
                ))}
                {(s.count ?? 0) > 3 && (
                  <button style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.violet, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                    Ver todos ({s.count})
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested queries */}
      <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderTop: "none", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 12 }}>💡</span>
          <span style={{ fontFamily: I, fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Consultas sugeridas
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            "¿Qué requisitos necesito para activar mi RUC presencialmente?",
            "¿Cómo cambiar de domicilio fiscal en mi Ficha RUC?",
          ].map(q => (
            <button key={q} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 100,
              background: T.sand, border: `1.5px solid ${T.border}`,
              fontFamily: I, fontSize: 13, color: T.ink, cursor: "pointer",
              transition: "border-color 0.15s",
            }}>
              {q}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5h7M6 3l3 2.5L6 8" stroke={T.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Official links */}
      <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderTop: "none", borderRadius: "0 0 14px 14px", padding: "16px 24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 12 }}>🏛️</span>
          <span style={{ fontFamily: I, fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Accesos y guías oficiales del Estado
          </span>
        </div>
        {[
          { title: "Consultar RUC (Acceso Directo SUNAT)", sub: "Acceso directo a la plataforma oficial · Costo: Gratuito", icon: "🔴" },
          { title: "Guía Oficial Gob.pe: Consultar RUC",   sub: "Guía oficial del trámite en Gob.pe · Costo: Gratuito",   icon: "📄" },
        ].map(link => (
          <div key={link.title} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", marginBottom: 8,
            background: T.sand, border: `1px solid ${T.border}`, borderRadius: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{link.icon}</span>
              <div>
                <div style={{ fontFamily: G, fontWeight: 600, fontSize: 14, color: T.strong, marginBottom: 2 }}>{link.title}</div>
                <div style={{ fontFamily: I, fontSize: 12, color: T.muted }}>{link.sub}</div>
              </div>
            </div>
            <button style={{
              padding: "6px 14px", borderRadius: 8,
              background: T.violet, border: "none", color: "#fff",
              fontFamily: I, fontWeight: 600, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              Ingresar
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5h7M6 3l3 2.5L6 8" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Action strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {[
          { label: "Copiar", icon: "📋" },
          { label: "Escuchar", icon: "🔊" },
        ].map(a => (
          <button key={a.label} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            background: T.cream, border: `1.5px solid ${T.border}`,
            fontFamily: I, fontWeight: 500, fontSize: 13, color: T.muted, cursor: "pointer",
          }}>
            <span style={{ fontSize: 13 }}>{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ConsultarView({ onBack, onCategorias }: { onBack: () => void; onCategorias: () => void }) {
  const [input, setInput] = useState("");
  const [entity, setEntity] = useState("sunat");
  const [sent, setSent] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const [catEntidad, setCatEntidad] = useState("Todos");
  const [sidebarTab, setSidebarTab] = useState<"historial" | "colecciones">("historial");
  const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const D = darkMode ? {
    bg:     "#0D1521",
    sidebar:"#101928",
    text:   "#EEF2F9",
    muted:  "#7A93B2",
    border: "#1C2D42",
    ink:    "#D8E4F2",
    inputBg:"#162032",
    itemHov:"#162848",
    chip:   "#162032",
    chipAct: T.violet,
  } : {
    bg:     T.sand,
    sidebar:T.cream,
    text:   T.strong,
    muted:  T.muted,
    border: T.border,
    ink:    T.ink,
    inputBg:T.sand,
    itemHov:T.lilac,
    chip:   T.sand,
    chipAct: T.violet,
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setSent(true);
    setInput("");
  };

  const userQ = "¿Cómo realizar el trámite de \"Consultar RUC\" ante SUNAT? Explícame los requisitos, pasos y consideraciones oficiales.";

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>

      {/* ── Sidebar ── */}
      <aside className="chat-sidebar" style={{
        width: chatSidebarOpen ? 232 : 0,
        flexShrink: 0, background: D.sidebar,
        borderRight: chatSidebarOpen ? `1px solid ${D.border}` : "none",
        display: "flex", flexDirection: "column", overflow: "hidden",
        transition: "width 0.22s ease, background 0.25s, border-color 0.25s",
      }}>
        {/* User */}
        <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${D.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: `linear-gradient(135deg, ${T.violet} 0%, #9B5BFF 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: G, fontWeight: 700, fontSize: 13, color: "#fff",
              }}>D</div>
              <span style={{ fontFamily: G, fontWeight: 600, fontSize: 14, color: D.text }}>Dennys</span>
              <span style={{ fontFamily: I, fontSize: 9, fontWeight: 800, color: T.violet, background: T.lilac, padding: "1px 6px", borderRadius: 100 }}>PLUS</span>
            </div>
            <button onClick={() => setChatSidebarOpen(false)} title="Ocultar panel" style={{ background: "none", border: "none", cursor: "pointer", color: D.muted, display: "flex", alignItems: "center", padding: "4px 6px", borderRadius: 6, transition: "color 0.13s" }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = D.text}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = D.muted}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6M6 7.5h7M10.5 5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Back to inicio — desktop only */}
          <button onClick={onBack} className="chat-back-btn" style={{
            width: "100%", display: "flex", alignItems: "center", gap: 7,
            padding: "7px 12px", borderRadius: 8, marginBottom: 8,
            background: "transparent", border: "none",
            fontFamily: I, fontWeight: 500, fontSize: 13, color: D.muted, cursor: "pointer",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = T.violet}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = D.muted}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Inicio
          </button>

          {/* New chat */}
          <button style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", borderRadius: 8,
            background: "transparent", border: `1.5px solid ${D.border}`,
            fontFamily: I, fontWeight: 600, fontSize: 13, color: D.ink, cursor: "pointer",
          }}>
            Nuevo chat
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 2v9M2 6.5h9" stroke={D.muted} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Tab toggle */}
        <div style={{ display: "flex", padding: "10px 10px 0", gap: 4 }}>
          {(["historial", "colecciones"] as const).map(t => (
            <button key={t} onClick={() => setSidebarTab(t)} style={{
              flex: 1, padding: "6px 0", borderRadius: 7, border: "none",
              background: sidebarTab === t ? D.bg : "transparent",
              fontFamily: I, fontWeight: 600, fontSize: 12, cursor: "pointer",
              color: sidebarTab === t ? D.ink : D.muted, textTransform: "capitalize",
            }}>
              {t === "historial" ? "Historial" : "Colecciones"}
            </button>
          ))}
        </div>

        {sidebarTab === "historial" ? (
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 0" }}>
            {(() => {
              const groups = ["Hoy", "Ayer", "Esta semana"];
              return groups.map(g => {
                const items = CHAT_HISTORY.filter(c => c.group === g);
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <div style={{ padding: "8px 10px 4px", fontFamily: I, fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {g}
                    </div>
                    {items.map((c, i) => (
                      <button key={i} style={{
                        width: "100%", display: "flex", flexDirection: "column", gap: 2,
                        padding: "9px 10px", borderRadius: 8, border: "none",
                        background: g === "Hoy" && i === 0 ? (darkMode ? "#162848" : T.lilac) : "transparent",
                        cursor: "pointer", textAlign: "left", marginBottom: 1,
                      }}>
                        <span style={{ fontFamily: I, fontSize: 13, lineHeight: 1.35, color: g === "Hoy" && i === 0 ? T.violet : D.ink, fontWeight: g === "Hoy" && i === 0 ? 600 : 400, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                          {c.title}
                        </span>
                        <span style={{ fontFamily: I, fontSize: 10, color: D.muted }}>
                          {c.preview} · {c.time}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              });
            })()}
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
            {COLLECTIONS.map((c, i) => (
              <button key={i} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 10px", borderRadius: 8, border: "none",
                background: "transparent", cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontFamily: I, fontSize: 13, color: D.ink }}>{c.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom */}
        <div style={{ padding: "10px 8px", borderTop: `1px solid ${D.border}` }}>
          <button onClick={() => setDarkMode(d => !d)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 10px", borderRadius: 8, border: "none",
            background: darkMode ? "#1E293B" : "transparent", cursor: "pointer",
            fontFamily: I, fontSize: 13, color: D.muted, transition: "background 0.2s",
          }}>
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
            {darkMode ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 1v1M7 12v1M1 7h1M12 7h1M3 3l.7.7M10.3 10.3l.7.7M10.3 3.7L11 3M3 10.3l-.7.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 9A6 6 0 015 2.5a6 6 0 100 9 6 6 0 006.5-2.5z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* ── Catálogo panel (drawer) ── */}
      {catalogOpen && (() => {
        const gratuitos = TRAMITES.filter(t =>
          t.costo === "Gratuito" &&
          t.titulo.toLowerCase().includes(catSearch.toLowerCase())
        );
        const plusFiltered = TRAMITES.filter(t => {
          const matchE = catEntidad === "Todos" || t.entidad === catEntidad;
          const matchS = t.titulo.toLowerCase().includes(catSearch.toLowerCase()) || t.entidad.toLowerCase().includes(catSearch.toLowerCase());
          return matchE && matchS;
        });
        return (
          <div className="chat-catalog-panel">
            {/* Header */}
            <div className="chat-catalog-header">
              <div>
                <span style={{ fontFamily: G, fontWeight: 700, fontSize: 15, color: T.strong, letterSpacing: "-0.02em" }}>
                  {IS_PLUS ? "Catálogo completo" : "Trámites gratuitos"}
                </span>
                {!IS_PLUS && (
                  <div style={{ fontFamily: I, fontSize: 11, color: T.muted, marginTop: 2 }}>
                    Plan PLUS desbloquea todo el catálogo
                  </div>
                )}
              </div>
              <button onClick={() => setCatalogOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", padding: 4 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: "10px 16px", position: "relative" }}>
              <svg style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)" }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke={T.muted} strokeWidth="1.2"/>
                <path d="M9 9l2 2" stroke={T.muted} strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Buscar trámite..." className="chat-catalog-search" />
            </div>

            {/* PLUS: entity chips */}
            {IS_PLUS && (
              <div className="chat-catalog-chips">
                {ENTIDAD_CHIPS.map(e => (
                  <button key={e} onClick={() => setCatEntidad(e)} className={`catalogo-chip${catEntidad === e ? " catalogo-chip--active" : ""}`} style={{ fontSize: 11, padding: "5px 12px" }}>{e}</button>
                ))}
              </div>
            )}

            {/* List */}
            <div className="chat-catalog-list">
              {(IS_PLUS ? plusFiltered : gratuitos).map((t, i) => (
                <button key={i} className="chat-catalog-item" onClick={() => { setInput(t.titulo); setCatalogOpen(false); }}>
                  <div className="catalogo-item-top">
                    <span className="catalogo-item-entidad">{t.entidad}</span>
                    <span className={`catalogo-item-costo${t.costo !== "Gratuito" ? " catalogo-item-costo--paid" : ""}`}>{t.costo}</span>
                  </div>
                  <div className="catalogo-item-titulo">{t.titulo}</div>
                </button>
              ))}

              {/* Free user upsell */}
              {!IS_PLUS && (
                <div style={{ padding: "16px", background: T.lilac, borderTop: `1px solid ${T.border}` }}>
                  <div style={{ fontFamily: G, fontWeight: 700, fontSize: 13, color: T.violet, marginBottom: 4 }}>
                    ¿Quieres acceso completo?
                  </div>
                  <div style={{ fontFamily: I, fontSize: 12, color: T.muted, lineHeight: 1.5 }}>
                    Con Plan PLUS accedes a todos los trámites de 17 entidades, con o sin costo.
                  </div>
                  <button style={{ marginTop: 10, padding: "7px 16px", background: T.violet, color: "#fff", border: "none", borderRadius: 100, fontFamily: I, fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%" }}>
                    Obtener Plan PLUS
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── Chat area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: D.bg, transition: "background 0.25s", position: "relative" }}>

        {/* Sidebar reopen button — visible only when sidebar is collapsed, desktop */}
        {!chatSidebarOpen && (
          <button onClick={() => setChatSidebarOpen(true)} title="Mostrar panel" className="chat-sidebar-reopen" style={{
            position: "absolute", top: 12, left: 12, zIndex: 10,
            display: "flex", alignItems: "center", gap: 6,
            background: D.sidebar, border: `1px solid ${D.border}`,
            borderRadius: 8, padding: "6px 10px", cursor: "pointer",
            fontFamily: I, fontSize: 12, color: D.muted, transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = D.text}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = D.muted}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path d="M6 2h6a1 1 0 011 1v9a1 1 0 01-1 1H6M9 7.5H2M4.5 5L1.5 7.5 4.5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Top bar: back button — mobile only (sidebar hidden on small screens) */}
        <div className="chat-mobile-topbar" style={{ borderBottom: `1px solid ${D.border}` }}>
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: I, fontSize: 13, fontWeight: 500, color: D.muted,
            padding: "4px 8px", borderRadius: 8, transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = T.violet}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = D.muted}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Inicio
          </button>
        </div>

        {!sent ? (
          /* ── Empty state ── */
          <div className="chat-empty">

            <h2 className="chat-greeting" style={{ color: D.text, marginBottom: 32 }}>
              ¿En qué te puedo<br />ayudar hoy?
            </h2>

            {/* Input */}
            <div style={{ width: "100%", maxWidth: 600, marginBottom: 16 }}>
              <ChatInput value={input} onChange={setInput} onSend={handleSend} entity={entity} onEntityChange={setEntity} />
            </div>

            {/* Catálogo fallback */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: I, fontSize: 13, color: D.muted }}>¿No sabes qué consultar?</span>
              <button
                onClick={onCategorias}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "6px 14px", background: "transparent",
                  border: `1.5px solid ${D.border}`, borderRadius: 100,
                  fontFamily: I, fontSize: 13, fontWeight: 600, color: T.violet,
                  cursor: "pointer", transition: "border-color 0.13s, background 0.13s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = darkMode ? "#1E3A5F" : T.lilac; (e.currentTarget as HTMLButtonElement).style.borderColor = T.violet; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = D.border; }}
              >
                Ver catálogo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        ) : (
          /* ── Conversation ── */
          <>
            <div className="chat-messages" style={{ flex: 1, overflowY: "auto", padding: "32px 48px", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* User bubble */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  maxWidth: "72%", padding: "12px 18px",
                  background: T.violet, borderRadius: "16px 16px 4px 16px",
                  fontFamily: I, fontSize: 14, color: "#fff", lineHeight: 1.65,
                }}>
                  {userQ}
                </div>
              </div>

              {/* AI response — no avatar, full width with label */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: `linear-gradient(135deg, ${T.coral} 0%, #FF7043 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: G, fontWeight: 800, fontSize: 8, color: "#fff" }}>LO</div>
                  <span style={{ fontFamily: I, fontSize: 12, fontWeight: 600, color: T.muted }}>LOTA AI</span>
                </div>
                <TramiteCard />
              </div>
            </div>

            {/* Sticky input */}
            <div className="chat-input-wrap" style={{ padding: "16px 48px 24px", borderTop: `1px solid ${D.border}`, background: D.bg }}>
              <ChatInput value={input} onChange={setInput} onSend={handleSend} entity={entity} onEntityChange={setEntity} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Mobile bottom nav ─────────────────────────────────────────────────────────
const MOB_NAV = [
  { id: "inicio"     as Page, label: "Inicio",
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth={a?2:1.5} fill={a?"currentColor":"none"} fillOpacity={a?.12:0}/></svg> },
  { id: "categorias" as Page, label: "Trámites",
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={a?2:1.5}/><rect x="12" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={a?2:1.5}/><rect x="3" y="12" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={a?2:1.5}/><rect x="12" y="12" width="7" height="7" rx="2" stroke="currentColor" strokeWidth={a?2:1.5}/></svg> },
  { id: "consultar"  as Page, label: "LOTA AI", special: true,
    icon: (_a: boolean) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2l2.4 6.6L20 11l-6.6 2.4L11 20l-2.4-6.6L2 11l6.6-2.4L11 2z" fill="white" stroke="white" strokeWidth="1"/></svg> },
  { id: "favoritos"  as Page, label: "Guardados",
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 3h12a1 1 0 011 1v15l-7-4-7 4V4a1 1 0 011-1z" stroke="currentColor" strokeWidth={a?2:1.5} fill={a?"currentColor":"none"} fillOpacity={a?.12:0}/></svg> },
  { id: "perfil"     as Page, label: "Perfil",
    icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth={a?2:1.5}/><path d="M3 19c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth={a?2:1.5} strokeLinecap="round"/></svg> },
];

function MobileBottomNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <nav className="mob-bottom-nav">
      {MOB_NAV.map(n => {
        const active = page === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            className={`mob-nav-btn${n.special ? " mob-nav-btn--special" : ""}${active && !n.special ? " mob-nav-btn--active" : ""}`}
          >
            <span className="mob-nav-icon">{n.icon(active)}</span>
            <span className="mob-nav-label">{n.label}</span>
            {n.id === "favoritos" && <span className="mob-nav-badge">2</span>}
          </button>
        );
      })}
    </nav>
  );
}

// ── Sidebar toggle icon ───────────────────────────────────────────────────────
function SidebarToggleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="1.5" width="15" height="15" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 1.5v15" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

// ── Main sidebar ──────────────────────────────────────────────────────────────
function AppSidebar({ page, setPage, onClose }: { page: Page; setPage: (p: Page) => void; onClose: () => void }) {
  return (
    <aside className="app-sidebar">
      {/* User header */}
      <div className="sidebar-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div className="avatar-circle" style={{ width: 32, height: 32, fontSize: 13 }}>D</div>
          <div>
            <div style={{ fontFamily: G, fontWeight: 700, fontSize: 14, color: T.strong, letterSpacing: "-0.02em" }}>Dennys Marquez</div>
            <div style={{ fontFamily: I, fontSize: 11, color: T.muted }}>Plan PLUS · Ilimitado</div>
          </div>
        </div>
        <button className="sidebar-close" onClick={onClose} title="Cerrar panel">
          <SidebarToggleIcon />
        </button>
      </div>

      {/* Consult CTA */}
      <div style={{ padding: "12px 14px" }}>
        <PrimaryBtn full onClick={() => { setPage("consultar"); onClose(); }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 11L6 7M6 7V3M6 7H10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Consultar con LOTA AI
        </PrimaryBtn>
      </div>

      <div className="sidebar-divider" />

      {/* Nav */}
      <nav style={{ padding: "8px 8px", flex: 1 }}>
        <div style={{ fontFamily: I, fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 10px 8px" }}>
          Navegación
        </div>
        {[
          { id: "inicio" as Page,     icon: "⌂", label: "Inicio"           },
          { id: "categorias" as Page, icon: "⊞", label: "Categorías"       },
          { id: "favoritos" as Page,  icon: "♡", label: "Favoritos", badge: "2" },
          { id: "perfil" as Page,     icon: "◯", label: "Mi Perfil"        },
          { id: "ayuda" as Page,      icon: "?", label: "Centro de Ayuda"  },
        ].map(n => (
          <button
            key={n.id}
            onClick={() => { setPage(n.id); onClose(); }}
            className={`sidebar-nav-btn${page === n.id ? " sidebar-nav-btn--active" : ""}`}
          >
            <span className="sidebar-nav-icon">{n.icon}</span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.badge && <span className="sidebar-badge">{n.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      {/* Bottom */}
      <div style={{ padding: "8px 8px 16px" }}>
        <div style={{ fontFamily: I, fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 10px 8px" }}>
          Colecciones
        </div>
        {COLLECTIONS.map(c => (
          <button key={c.label} className="sidebar-nav-btn" onClick={() => { setPage("categorias"); onClose(); }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13 }}>{c.label}</span>
          </button>
        ))}
      </div>

    </aside>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inChat = page === "consultar";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.sand, fontFamily: I, position: "relative" }}>

      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && !inChat && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar panel ── */}
      {sidebarOpen && !inChat && (
        <AppSidebar page={page} setPage={setPage} onClose={() => setSidebarOpen(false)} />
      )}

      {/* ── Header ── */}
      {!inChat && (
        <header className="app-header">
          {/* Sidebar toggle */}
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? "Cerrar panel" : "Abrir panel"}
          >
            <SidebarToggleIcon />
          </button>

          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <Logo size={17} />
          </div>

          {/* Nav tabs — hidden on mobile */}
          <nav className="main-nav">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className={`nav-btn${page === n.id ? " nav-btn--active" : ""}`}
              >
                {n.label}
                {n.id === "favoritos" && <span className="nav-badge">2</span>}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: "auto" }}>
            <button onClick={() => setPage("perfil")} className="avatar-btn">
              <div className="avatar-circle">D</div>
              <span className="avatar-name">Dennys</span>
              <span className="avatar-plan">PLUS</span>
            </button>
          </div>
        </header>
      )}

      {/* ── Content ── */}
      <main style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {page === "inicio"     && <InicioView onConsultar={() => setPage("consultar")} />}
        {page === "categorias" && <CategoriasView />}
        {page === "favoritos"  && <FavoritosView onExplorar={() => setPage("categorias")} />}
        {page === "perfil"     && <PerfilView />}
        {page === "ayuda"      && <AyudaView />}
        {page === "consultar"  && <ConsultarView onBack={() => setPage("inicio")} onCategorias={() => setPage("categorias")} />}
      </main>

      {/* ── Footer desktop ── */}
      {!inChat && (
        <footer className="app-footer">
          <span className="footer-copy">© 2026 ahorratiempo.pe — Todos los derechos reservados.</span>
          <div className="footer-links">
            {["Privacidad", "Términos", "Cookies"].map(l => (
              <button key={l} className="footer-link">{l}</button>
            ))}
          </div>
        </footer>
      )}

      {/* ── Mobile bottom nav ── */}
      {!inChat && <MobileBottomNav page={page} setPage={setPage} />}
    </div>
  );
}
