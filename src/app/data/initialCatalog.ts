import { Category, Tramite } from "../types";
import { 
  BuildingBankRegular, 
  PersonRegular, 
  PulseRegular, 
  BuildingRegular, 
  HatGraduationRegular, 
  ShieldRegular, 
  BriefcaseRegular,
  DocumentTextRegular 
} from '@fluentui/react-icons';
import rawCatalogoData from "../../data/catalogo.json";

// Mapeo de Categorías Oficiales
const CATEGORY_MAP: Record<string, { id: string; name: string; description: string; icon: any; color: string; logos: string[] }> = {
  "identidad y ciudadania": {
    id: "identidad-y-ciudadania",
    name: "Identidad y Ciudadanía",
    description: "DNI electrónico, partidas de nacimiento, matrimonio y defunción ante RENIEC.",
    icon: PersonRegular,
    color: "#EF4444",
    logos: ["/logos/RENIEC.png"]
  },
  "finanzas y afp": {
    id: "finanzas-y-afp",
    name: "Finanzas y AFP",
    description: "Tasas en pagalo.pe, aportes a fondos de pensión, cuentas y tributos.",
    icon: BuildingBankRegular,
    color: "#F59E0B",
    logos: ["/logos/MEF.png", "/logos/AFP.png", "/logos/ONP.png"]
  },
  "salud y seguros": {
    id: "salud-y-seguros",
    name: "Salud y Seguros",
    description: "Atención y acreditación en EsSalud, SIS y citas en el Ministerio de Salud.",
    icon: PulseRegular,
    color: "#10B981",
    logos: ["/logos/ESSALUD.png", "/logos/MINSA.png"]
  },
  "negocios y propiedad": {
    id: "negocios-y-propiedad",
    name: "Negocios y Propiedad",
    description: "Registros públicos SUNARP, constitución de empresas y copias literales.",
    icon: BuildingRegular,
    color: "#3B82F6",
    logos: ["/logos/SUNARP.png", "/logos/PRODUCE.png"]
  },
  "educacion": {
    id: "educacion",
    name: "Educación",
    description: "Grados, títulos, certificados oficiales de estudios y becas Pronabec.",
    icon: HatGraduationRegular,
    color: "#8B5CF6",
    logos: ["/logos/MINEDU.png"]
  },
  "seguridad y justicia": {
    id: "seguridad-y-justicia",
    name: "Seguridad y Justicia",
    description: "Antecedentes policiales, penales, judiciales y denuncias ciudadanas.",
    icon: ShieldRegular,
    color: "#EC4899",
    logos: ["/logos/MINJUSDH.png"]
  },
  "trabajo y empleo": {
    id: "trabajo-y-empleo",
    name: "Trabajo y Empleo",
    description: "Certificados laborales único laboral (CERTIJOVEN/CERTIADULTO) y MTPE.",
    icon: BriefcaseRegular,
    color: "#06B6D4",
    logos: ["/logos/MTPE.png"]
  }
};

function normalizeKey(str: string): string {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// 1. Construir Trámites Iniciales desde catalogo.json
export const INITIAL_TRAMITES: Tramite[] = (rawCatalogoData as any[]).map((item, idx) => {
  const rawCat = item["Categoría"] || "Identidad y Ciudadanía";
  const normCat = normalizeKey(rawCat);
  const catConfig = CATEGORY_MAP[normCat] || {
    id: normCat.replace(/\s+/g, "-"),
    name: rawCat,
    description: "Trámites oficiales del Estado peruano.",
    icon: DocumentTextRegular,
    color: "#EF4444",
    logos: []
  };

  const reqs = item["Requisitos"] 
    ? String(item["Requisitos"]).split(/\d+\.\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  const tips = item["Consideraciones"]
    ? String(item["Consideraciones"]).split(/[•*]\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  return {
    id: String(item.orden || idx + 1),
    title: item["Títítulo del Trámite"] || "Trámite Oficial",
    categoryId: catConfig.id,
    entity: rawCat.includes("RENIEC") ? "RENIEC" : rawCat.includes("SUNAT") ? "SUNAT" : rawCat.includes("SUNARP") ? "SUNARP" : "Gobierno del Perú",
    price: item["Costo"] || "Gratuito",
    isPaid: !(item["Costo"] || "").toLowerCase().includes("gratuito"),
    time: "Inmediato online",
    isImmediate: true,
    description: item["Descripción Corta"] || "",
    raw_content: `${item["Descripción Corta"] || ""}\n\nRequisitos:\n${item["Requisitos"] || ""}\n\nConsideraciones:\n${item["Consideraciones"] || ""}`,
    requirements: reqs,
    considerations: tips,
    tips: tips,
    url: item["URL Oficial"] || "https://www.gob.pe/",
    featured: idx < 6,
    order: item.orden || idx + 1
  };
});

// 2. Construir Categorías Iniciales
export const INITIAL_CATEGORIES: Category[] = Object.values(CATEGORY_MAP).map((c, idx) => {
  const count = INITIAL_TRAMITES.filter(t => t.categoryId === c.id).length;
  return {
    id: c.id,
    name: c.name,
    description: c.description,
    count: count,
    colorA: c.color,
    colorB: c.color,
    Icon: c.icon,
    logos: c.logos,
    bgImg: "",
    orden: idx + 1
  };
});
