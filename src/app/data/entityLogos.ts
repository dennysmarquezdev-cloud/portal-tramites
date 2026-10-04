// ── Institutional Logos Oficiales (Entidades del Estado Peruano) ──
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
import imgAfp from "@/imports/Administradora_de_Fondos_de_Pensiones.png";
import imgMinedu from "@/imports/MINEDU.png";
import imgMinsa from "@/imports/MINISTERIO_DE_SALUD.png";
import imgMinjusdh from "@/imports/MINJUSDH.png";
import imgMtc from "@/imports/MTC.png";
import imgMtpe from "@/imports/MTPE_-_Ministerio_de_Trabajo_y_Promoci_n_del_Empleo.png";
import imgOnpe from "@/imports/Oficina_Nacional_de_Procesos_Electorales.png";
import imgProduce from "@/imports/PRODUCE.png";
import imgMef from "@/imports/MINISTERIO_DE_ECONOMIA_Y_FINANZAS.png";

// Helper para convertir SVG a data URI seguro
function svgToUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// SVGs institucionales limpios y vectoriales para entidades sin archivo de imagen
const svgSusalud = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="18" cy="18" r="16" fill="#E0F2FE"/>
    <path d="M18 7v22M7 18h22" stroke="#0083CA" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="18" cy="18" r="4.5" fill="#E30613"/>
  </g>
  <text x="50" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#0083CA" letter-spacing="-0.3">SUSALUD</text>
  <text x="51" y="38" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#64748B" letter-spacing="0.2">SUPERINTENDENCIA DE SALUD</text>
</svg>
`);

const svgSbs = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <rect x="2" y="2" width="32" height="32" rx="6" fill="#005A9C"/>
    <path d="M10 12h16M10 18h16M10 24h10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="26" cy="24" r="3" fill="#00A859"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#005A9C" letter-spacing="0.5">SBS</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#00A859">BANCA, SEGUROS Y AFP</text>
</svg>
`);

const svgIndecopi = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 8)">
    <polygon points="17,3 32,10 32,23 17,31 2,23 2,10" fill="#004F9F"/>
    <polyline points="9,17 15,23 25,11" fill="none" stroke="#D9261C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="17" fill="#004F9F" letter-spacing="-0.3">INDECOPI</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#64748B">DEFENSA DEL CONSUMIDOR</text>
</svg>
`);

const svgOsiptel = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 8)">
    <circle cx="8" cy="26" r="4" fill="#FF6900"/>
    <path d="M7 16 A 12 12 0 0 1 21 27" fill="none" stroke="#0072CE" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M7 6 A 22 22 0 0 1 31 27" fill="none" stroke="#0072CE" stroke-width="3.5" stroke-linecap="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#0072CE" letter-spacing="0.5">OSIPTEL</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#FF6900">TELECOMUNICACIONES</text>
</svg>
`);

const svgSutran = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 8)">
    <circle cx="17" cy="17" r="15" fill="#E30613"/>
    <path d="M10 24 L17 10 L24 24 Z" fill="#FFFFFF"/>
    <line x1="17" y1="10" x2="17" y2="24" stroke="#E30613" stroke-width="1.5"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#E30613" letter-spacing="0.5">SUTRAN</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#475569">TRANSPORTE TERRESTRE</text>
</svg>
`);

const svgAtu = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 8)">
    <rect x="2" y="2" width="30" height="30" rx="7" fill="#E4002B"/>
    <path d="M8 24 L17 9 L26 24 M11 19 L23 19" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
  <text x="48" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="22" fill="#E4002B" letter-spacing="1">ATU</text>
  <text x="50" y="40" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#1D252D">TRANSPORTE URBANO</text>
</svg>
`);

const svgPronabec = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <polygon points="17,3 21,12 31,13 23,20 26,30 17,24 8,30 11,20 3,13 13,12" fill="#FFB81C"/>
    <circle cx="17" cy="17" r="7" fill="#0066B2"/>
  </g>
  <text x="48" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="16" fill="#0066B2" letter-spacing="-0.3">PRONABEC</text>
  <text x="49" y="38" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#64748B">PROGRAMA DE BECAS</text>
</svg>
`);

const svgPnp = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 6)">
    <polygon points="17,2 31,8 31,23 17,33 3,23 3,8" fill="#006837" stroke="#FFD100" stroke-width="1.5"/>
    <circle cx="17" cy="16" r="7" fill="#FFD100"/>
    <path d="M17 11v10M12 16h10" stroke="#D91023" stroke-width="2"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#006837" letter-spacing="1">PNP</text>
  <text x="50" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#D91023">POLICÍA NACIONAL DEL PERÚ</text>
</svg>
`);

const svgJne = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <rect x="3" y="10" width="28" height="22" rx="3" fill="#003B70"/>
    <path d="M11 10V5h12v5" fill="none" stroke="#E30613" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="17" y1="16" x2="17" y2="24" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#003B70" letter-spacing="1">JNE</text>
  <text x="50" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#E30613">JURADO NACIONAL DE ELECCIONES</text>
</svg>
`);

const svgIndeci = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <polygon points="17,3 32,30 2,30" fill="#FF6600"/>
    <polygon points="17,10 27,27 7,27" fill="#003366"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#FF6600" letter-spacing="0.5">INDECI</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#003366">DEFENSA CIVIL</text>
</svg>
`);

const svgOefa = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="15" fill="#00853F"/>
    <path d="M17 6 C23 12 23 22 17 28 C11 22 11 12 17 6 Z" fill="#FFFFFF"/>
    <circle cx="17" cy="17" r="4" fill="#00558F"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="19" fill="#00853F" letter-spacing="0.5">OEFA</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#00558F">FISCALIZACIÓN AMBIENTAL</text>
</svg>
`);

const svgSerfor = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="15" fill="#E8F5E9"/>
    <path d="M17 6 L23 15 L19 15 L25 24 L9 24 L15 15 L11 15 Z" fill="#439539"/>
    <rect x="15.5" y="24" width="3" height="5" fill="#795548"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#439539" letter-spacing="0.2">SERFOR</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#2D68C4">FORESTAL Y DE FAUNA</text>
</svg>
`);

const svgSenasa = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="15" fill="#006837"/>
    <path d="M17 9 C12 14 12 21 17 26 C22 21 22 14 17 9" fill="#FFD100"/>
    <circle cx="17" cy="17.5" r="3" fill="#FFFFFF"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#006837" letter-spacing="0.2">SENASA</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#D91023">SANIDAD AGRARIA</text>
</svg>
`);

const svgSmv = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <rect x="2" y="2" width="30" height="30" rx="6" fill="#004B87"/>
    <polyline points="8,22 14,16 20,20 26,11" fill="none" stroke="#EAAA00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#004B87" letter-spacing="1">SMV</text>
  <text x="50" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#EAAA00">MERCADO DE VALORES</text>
</svg>
`);

const svgSunass = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="15" fill="#E0F2FE"/>
    <path d="M17 6 C17 6 9 16 9 22 C9 26.5 12.5 30 17 30 C21.5 30 25 26.5 25 22 C25 16 17 6 17 6 Z" fill="#0284C7"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#0284C7" letter-spacing="0.5">SUNASS</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#0369A1">REGULADOR DE AGUA</text>
</svg>
`);

const svgOsitran = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="15" fill="#F1F5F9"/>
    <path d="M7 25 L17 9 L27 25" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
    <path d="M12 25 L17 17 L22 25" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#1E293B" letter-spacing="0.5">OSITRAN</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#64748B">INFRAESTRUCTURA DE TRANSPORTE</text>
</svg>
`);

const svgMpfn = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <rect x="3" y="3" width="28" height="28" rx="5" fill="#881337"/>
    <polygon points="17,7 27,27 7,27" fill="#FDE047"/>
    <circle cx="17" cy="20" r="3" fill="#881337"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#881337" letter-spacing="0.5">MINISTERIO PÚBLICO</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="6.5" fill="#991B1B">FISCALÍA DE LA NACIÓN</text>
</svg>
`);

const svgDefensoria = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <polygon points="17,3 31,9 31,21 17,31 3,21 3,9" fill="#047857"/>
    <path d="M12 17 L16 21 L22 13" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="16" fill="#047857" letter-spacing="-0.2">DEFENSORÍA</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#065F46">DEL PUEBLO DEL PERÚ</text>
</svg>
`);

const svgSineace = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="14" fill="#312E81"/>
    <path d="M11 17 L15 21 L23 13" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#312E81" letter-spacing="0.5">SINEACE</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#4338CA">CALIDAD EDUCATIVA</text>
</svg>
`);

const svgDigemid = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <rect width="160" height="50" rx="8" fill="#FFFFFF"/>
  <g transform="translate(8, 7)">
    <circle cx="17" cy="17" r="14" fill="#E0F2FE"/>
    <path d="M17 9v16M9 17h16" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
    <circle cx="17" cy="17" r="3" fill="#E11D48"/>
  </g>
  <text x="48" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#0284C7" letter-spacing="0.3">DIGEMID</text>
  <text x="49" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="6.5" fill="#64748B">MEDICAMENTOS Y DROGAS</text>
</svg>
`);

// Mapa de logos oficiales por acrónimo de entidad
export const ENTITY_LOGOS: Record<string, string> = {
  SUNAT: imgSunat,
  RENIEC: imgReniec,
  ESSALUD: imgEssalud,
  SUNARP: imgSunarp,
  MIGRACIONES: imgMigraciones,
  SUNEDU: imgSunedu,
  BN: imgBanco,
  "BANCO DE LA NACION": imgBanco,
  "BANCO DE LA NACIÓN": imgBanco,
  "PODER JUDICIAL": imgPj,
  PJ: imgPj,
  INPE: imgInpe,
  GRTCA: imgGrtca,
  MTC: imgMtc,
  ONP: imgOnp,
  SEDAPAR: imgSedapar,
  SEDAPAL: imgSedapal,
  SUNAFIL: imgSunafil,
  SIS: imgSis,
  "SAT LIMA": imgSatLima,
  SAT: imgSatLima,
  OSINERGMIN: imgOsinergmin,
  AFP: imgAfp,
  MINEDU: imgMinedu,
  MINSA: imgMinsa,
  MINJUSDH: imgMinjusdh,
  MTPE: imgMtpe,
  ONPE: imgOnpe,
  PRODUCE: imgProduce,
  MEF: imgMef,
  SUSALUD: svgSusalud,
  SBS: svgSbs,
  INDECOPI: svgIndecopi,
  OSIPTEL: svgOsiptel,
  SUTRAN: svgSutran,
  ATU: svgAtu,
  PRONABEC: svgPronabec,
  PNP: svgPnp,
  JNE: svgJne,
  INDECI: svgIndeci,
  OEFA: svgOefa,
  SERFOR: svgSerfor,
  SENASA: svgSenasa,
  SMV: svgSmv,
  SUNASS: svgSunass,
  OSITRAN: svgOsitran,
  MPFN: svgMpfn,
  "MINISTERIO PUBLICO": svgMpfn,
  DEFENSORIA: svgDefensoria,
  "DEFENSORÍA DEL PUEBLO": svgDefensoria,
  SINEACE: svgSineace,
  DIGEMID: svgDigemid,
};

// Íconos SVG oficiales para cada una de las 10 categorías ciudadanas
export const CATEGORY_ICONS: Record<string, string> = {
  "identidad-civiles-migracion": "/categories/identificacion-ciudadana.svg",
  "economia-impuestos-registros": "/categories/emprender.svg",
  salud: "/categories/salud.svg",
  "trabajo-pensiones": "/categories/trabajo.svg",
  "transporte-transito": "/categories/conducir.svg",
  "educacion-formacion": "/categories/educacion.svg",
  "consumo-regulacion-servicios": "/categories/denuncia-o-reclamar.svg",
  "justicia-legalidad-orden": "/categories/entidades-publicas.svg",
  "sistema-electoral": "/categories/entidades-publicas.svg",
  "recursos-naturales-emergencias": "/categories/vivienda-y-construccion.svg",
};

export function getEntityLogo(acronym: string): string | null {
  if (!acronym) return null;
  const key = acronym.trim().toUpperCase();
  return ENTITY_LOGOS[key] || null;
}

export function getCategoryIcon(categoryId: string): string {
  return CATEGORY_ICONS[categoryId] || "/categories/entidades-publicas.svg";
}
