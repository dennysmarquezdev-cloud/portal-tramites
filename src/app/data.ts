import { DocumentTextRegular, CalculatorRegular, PulseRegular, AirplaneRegular, BuildingBankRegular, MoneyRegular, ShieldRegular, ScalesRegular, HatGraduationRegular, Wifi1Regular, QuestionCircleRegular } from '@fluentui/react-icons';
import React from "react";
import { Category, Notif, ExpressItem, ThemeKey } from "./types";
export type { Category, Notif, ExpressItem, ThemeKey };
import imgReniec from "@/imports/RENIEC.png";
import imgEssalud from "@/imports/ESSALUD.png";
import imgMinsa from "@/imports/MINISTERIO_DE_SALUD.png";
import imgSunarp from "@/imports/SUNARP.png";
import imgMigraciones from "@/imports/MIGRACIONES_PERU.png";
import imgAfp from "@/imports/Administradora_de_Fondos_de_Pensiones.png";
import imgMef from "@/imports/MINISTERIO_DE_ECONOMIA_Y_FINANZAS.png";

export const EXPRESS_ICONS: Record<string, React.ElementType> = {
  DocumentTextRegular, CalculatorRegular, PulseRegular, AirplaneRegular, BuildingBankRegular, MoneyRegular, ShieldRegular,
  ScalesRegular, HatGraduationRegular, Wifi1Regular, QuestionCircleRegular
};

export function getExpressIcon(name: string): React.ElementType {
  return EXPRESS_ICONS[name] || DocumentTextRegular;
}

export const NOTIFICATIONS: Notif[] = [
  { id:"n1", entity:"LOTA AI", categoryId:"general", title:"¡Bienvenido a ahorratiempo!", desc:"Tu asistente inteligente está listo. Conviértete en usuario Premium para obtener ayuda ilimitada, acceder a todos los trámites exclusivos y usar la plataforma sin restricciones.", time:"Hace 2 min", isNew:true },
  { id:"n2", entity:"LOTA AI", categoryId:"general", title:"Consejo de Seguridad", desc:"Recuerda siempre revisar la barra de direcciones para confirmar que estás en una página oficial (terminada en .gob.pe).", time:"Hace 2 h", isNew:true },
  { id:"n3", entity:"LOTA AI", categoryId:"general", title:"Orientación Digital", desc:"Pregúntale a LOTA AI sobre cualquier trámite oficial del estado peruano.", time:"Hace 1 día", isNew:false },
];

export const AI_FLOWS: Record<string, { steps: string[]; time: string; url?: string; chips?: string[] }> = {
  "recibo|honorario|freelance": {
    steps: [
      "Ingresa a SUNAT Operaciones en Línea (SOL) con tu RUC y Clave SOL",
      "Dirígete a 'Comprobantes de Pago' > 'SEE - SOL' > 'Emitir Recibo por Honorarios Electrónico'",
      "Completa los datos del cliente, descripción del servicio y monto",
      "Ten en cuenta: Aplica retención del 8% solo si el monto supera S/ 1,500 (o 0% con Formulario 1609)",
      "Emite y descarga tu recibo en PDF de forma 100% gratuita"
    ],
    time: "3 min online", url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
    chips: ["Suspensión de retenciones 1609", "Obtener Clave SOL", "Consultar RUC"],
  },
  "renovar|duplicado|dni": {
    steps: ["Ingresa a la plataforma oficial de RENIEC o app DNI BioFacial","Selecciona 'Renovación de DNI'","Paga la tasa en pagalo.pe o Banco de la Nación (S/ 30.00 azul / S/ 41.00 DNIe)","Registra tus datos y captura de foto","Recoge tu DNI en la agencia elegida"],
    time:"15 min online + recojo", url:"https://apps.reniec.gob.pe/renovacionDni/",
    chips:["¿Qué documentos necesito?","¿Cuánto cuesta?","Consultar RUC"],
  },
  "ruc|sunat|consultar ruc": {
    steps:["Ingresa a la Consulta RUC en Línea de SUNAT","Digita el número de RUC, DNI o Razón Social","Verifica que el estado sea 'Activo' y condición 'Habido'"],
    time:"1 min", url:"https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp",
    chips:["Emitir recibo por honorarios","Obtener Clave SOL","Declarar impuestos"],
  },
  "pasaporte": {
    steps:["Paga la tasa de S/ 120.90 en pagalo.pe (código 01810)","Agenda tu cita en el portal de Migraciones","Asiste a la sede con tu DNI vigente y comprobante de pago","Toma de foto biométrica y entrega del pasaporte el mismo día"],
    time:"20 min + cita", url:"https://citaspasaporte.migraciones.gob.pe/",
    chips:["Movimientos migratorios","Permiso de permanencia","Consultar RUC"],
  },
  "essalud|asegurado": {
    steps:["Ingresa a essalud.gob.pe","Click en 'Consulta de Asegurado'","Ingresa tu DNI","Verifica tu estado y centro asignado"],
    time:"2 min", url:"https://essalud.gob.pe",
    chips:["Carnet de vacunación","Cita médica virtual","Renovar DNI"],
  },
  "vacun|carnet|minsa": {
    steps:["Descarga la app VIVA MINSA","Regístrate con tu DNI","Ve a 'Vacunación'","Descarga tu carnet en PDF"],
    time:"5 min", url:"https://www.gob.pe/vivaminsa",
    chips:["Consultar ESSALUD","Cita médica","Renovar DNI"],
  },
  "afp|pensiones|jubilaci": {
    steps:["Ingresa al portal de tu AFP (Integra, Prima, Profuturo o Habitat)","Usa tu DNI o código de afiliado","Ve a 'Mi Cuenta'","Revisa saldo, aportes y rentabilidad"],
    time:"3 min",
    chips:["AFP vs ONP","Retiro por desempleo","Consultar ONP"],
  },
  "sunarp|certificado|partida|propiedad": {
    steps:["Ingresa a extranet.sunarp.gob.pe","Selecciona 'Certificado Literal'","Ingresa el número de partida registral","Paga S/ 22.00","Descarga tu certificado en PDF"],
    time:"10 min", url:"https://extranet.sunarp.gob.pe",
    chips:["Alerta registral","Inscripcin de transferencia","Renovar DNI"],
  },
  "alerta registral": {
    steps:["Ingresa a extranet.sunarp.gob.pe","Ve a 'Alerta Registral'","Ingresa tu partida registral","Registra tu celular o correo"],
    time:"5 min", url:"https://extranet.sunarp.gob.pe",
    chips:["Certificado SUNARP","Renovar DNI"],
  },
  "impuesto|declarar|renta": {
    steps:["Ingresa a SUNAT Operaciones en Lnea (SOL)","Usa tu RUC y clave SOL","Ve a 'Declaraciones y Pagos'","Selecciona el formulario correspondiente","Revisa, declara y guarda el comprobante"],
    time:"30 min", url:"https://www.sunat.gob.pe/sol.html",
    chips:["Consultar RUC","Cronograma de vencimientos","Calcular deuda"],
  },
  "portabilidad|cambiar operador": {
    steps:["Solicita el NIP de portabilidad a tu operador actual","Acude al nuevo operador con tu DNI y NIP","Firma el contrato con el nuevo operador"],
    time:"1 da hábil",
    chips:["Reclamo OSIPTEL","Velocidad internet","Renovar DNI"],
  },
};

export const WHATSAPP_URL = `https://wa.me/51922466078?text=Hola%2C%20necesito%20ayuda%20con%20ahorratiempo`;
export const LIMA_BG = "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=1920&h=700&fit=crop&auto=format&q=75";

export const THEMES: Record<ThemeKey, { name: string; emoji: string; bg: string; sidebar: string; card: string; primary: string; accent: string; muted: string; border: string; text: string; pexelsQuery: string }> = {
    oceano: { name:"Océano Pacífico", emoji:"🌊", bg:"#06082b", sidebar:"#090C48", card:"#0b103e", primary:"#0F1255", accent:"#2D5BFF", muted:"#93c5fd", border:"rgba(45,91,255,.2)", text:"#FFFFFF", pexelsQuery:"peru ocean dark water waves" },
    aurora: { name:"Aurora Andina",   emoji:"✨", bg:"#0f0221", sidebar:"#1a0533", card:"#1f0940", primary:"#a855f7", accent:"#c084fc", muted:"#9f7aea", border:"rgba(168,85,247,.15)", text:"#FFFFFF", pexelsQuery:"aurora borealis night sky purple" },
    bosque: { name:"Bosque Amazónico",emoji:"🌳", bg:"#021a0a", sidebar:"#04200d", card:"#052e12", primary:"#10b981", accent:"#34d399", muted:"#6ee7b7", border:"rgba(16,185,129,.15)", text:"#FFFFFF", pexelsQuery:"amazon rainforest dark green nature" },
    fuego:  { name:"Fuego Inca",      emoji:"🔥", bg:"#1a0902", sidebar:"#200d04", card:"#2e1205", primary:"#f97316", accent:"#fb923c", muted:"#fdba74", border:"rgba(249,115,22,.15)", text:"#FFFFFF", pexelsQuery:"fire flames dark red night" },
    noche:  { name:"Noche Eterna",    emoji:"🌙", bg:"#080808", sidebar:"#111111", card:"#1a1a1a", primary:"#e5e5e5", accent:"#ffffff", muted:"#888888", border:"rgba(255,255,255,.12)", text:"#FFFFFF", pexelsQuery:"black texture dark minimal abstract" },
    cielo:  { name:"Cielo Andino",    emoji:"⛅", bg:"#0a1929", sidebar:"#0f2744", card:"#132f52", primary:"#38bdf8", accent:"#7dd3fc", muted:"#93c5fd", border:"rgba(56,189,248,.15)", text:"#FFFFFF", pexelsQuery:"andes mountains peru landscape clear sky" },
    desierto: { name:"Desierto Costero", emoji:"🏜️", bg:"#2b1a0a", sidebar:"#3d250d", card:"#4f3011", primary:"#eab308", accent:"#facc15", muted:"#fef08a", border:"rgba(234,179,8,.15)", text:"#FFFFFF", pexelsQuery:"sand dunes desert landscape sunset peru" },
    andes:  { name:"Nevado Huascarán", emoji:"🏔️", bg:"#171717", sidebar:"#262626", card:"#404040", primary:"#94a3b8", accent:"#cbd5e1", muted:"#f1f5f9", border:"rgba(148,163,184,.15)", text:"#FFFFFF", pexelsQuery:"snowy mountain peak landscape cold" },
    sunset: { name:"Sunset Limeño",   emoji:"🌇", bg:"#2a0a18", sidebar:"#3d0f22", card:"#52142d", primary:"#f43f5e", accent:"#fb7185", muted:"#fecdd3", border:"rgba(244,63,94,.15)", text:"#FFFFFF", pexelsQuery:"lima sunset ocean city dark orange" },
  };

export interface CategoryVisualConfig {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  image: string;
  alt: string;
}

export const CATEGORY_VISUALS: Record<string, CategoryVisualConfig> = {
  "ayuda-social": {
    id: "ayuda-social",
    name: "Ayuda Social",
    description: "Programas y bonos de apoyo social.",
    accentColor: "#22c55e",
    image: "/categories/ayuda-social.svg",
    alt: "Ayuda Social"
  },
  "conducir": {
    id: "conducir",
    name: "Conducir",
    description: "Brevete, identificación vehicular y multas.",
    accentColor: "#6366f1",
    image: "/categories/conducir.svg",
    alt: "Conducir"
  },
  "emprender": {
    id: "emprender",
    name: "Emprender",
    description: "Iniciar un negocio, contratar con el Estado e impuestos.",
    accentColor: "#0ea5e9",
    image: "/categories/emprender.svg",
    alt: "Emprender"
  },
  "educacion": {
    id: "educacion",
    name: "Educación",
    description: "Matrícula, certificados, becas y cursos.",
    accentColor: "#eab308",
    image: "/categories/educacion.svg",
    alt: "Educación"
  },
  "vivir-en-el-peru": {
    id: "vivir-en-el-peru",
    name: "Vivir en el Perú",
    description: "Carnés, residencia y permisos.",
    accentColor: "#8b5cf6",
    image: "/categories/vivir-en-el-peru.svg",
    alt: "Vivir en el Perú"
  },
  "familia": {
    id: "familia",
    name: "Familia",
    description: "Matrimonio, maternidad y denuncias.",
    accentColor: "#ec4899",
    image: "/categories/familia.svg",
    alt: "Familia"
  },
  "identificacion-ciudadana": {
    id: "identificacion-ciudadana",
    name: "Identificación Ciudadana",
    description: "DNI, partidas y firma digital.",
    accentColor: "#f97316",
    image: "/categories/identificacion-ciudadana.svg",
    alt: "Identificación Ciudadana"
  },
  "salud": {
    id: "salud",
    name: "Salud",
    description: "Atención médica y seguros de salud.",
    accentColor: "#06b6d4",
    image: "/categories/salud.svg",
    alt: "Salud"
  },
  "trabajo": {
    id: "trabajo",
    name: "Trabajo",
    description: "Convocatorias públicas, recibos y derechos laborales.",
    accentColor: "#2563eb",
    image: "/categories/trabajo.svg",
    alt: "Trabajo"
  },
  "denunciar-o-reclamar": {
    id: "denunciar-o-reclamar",
    name: "Denunciar o reclamar",
    description: "Daños contra personas, patrimonio, animales y medio ambiente.",
    accentColor: "#4f46e5",
    image: "/categories/denuncia-o-reclamar.svg",
    alt: "Denunciar o reclamar"
  },
  "vivienda-y-construccion": {
    id: "vivienda-y-construccion",
    name: "Vivienda y construcción",
    description: "Servicios básicos y trámites municipales.",
    accentColor: "#f59e0b",
    image: "/categories/vivienda-y-construccion.svg",
    alt: "Vivienda y construcción"
  },
  "viajar-a-otro-pais": {
    id: "viajar-a-otro-pais",
    name: "Viajar a otro país",
    description: "Pasaporte, documentación y requisitos.",
    accentColor: "#0284c7",
    image: "/categories/viajar-a-otro-pais.svg",
    alt: "Viajar a otro país"
  },
  "informacion-de-entidades": {
    id: "informacion-de-entidades",
    name: "Entidades públicas",
    description: "Información pública y transparencia.",
    accentColor: "#1e293b",
    image: "/categories/entidades-publicas.svg",
    alt: "Entidades públicas"
  },
  "entidades-publicas": {
    id: "entidades-publicas",
    name: "Entidades públicas",
    description: "Información pública y transparencia.",
    accentColor: "#1e293b",
    image: "/categories/entidades-publicas.svg",
    alt: "Entidades públicas"
  }
};

export function getCategoryVisual(catId: string, name?: string): CategoryVisualConfig {
  const normId = (catId || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  if (CATEGORY_VISUALS[normId]) return CATEGORY_VISUALS[normId];
  if (normId.includes("ayuda") || normId.includes("social")) return CATEGORY_VISUALS["ayuda-social"];
  if (normId.includes("conducir") || normId.includes("vehicul") || normId.includes("auto")) return CATEGORY_VISUALS["conducir"];
  if (normId.includes("emprend") || normId.includes("negocio") || normId.includes("tribut") || normId.includes("produc")) return CATEGORY_VISUALS["emprender"];
  if (normId.includes("educa") || normId.includes("curso") || normId.includes("beca")) return CATEGORY_VISUALS["educacion"];
  if (normId.includes("extranjer") || normId.includes("vivir")) return CATEGORY_VISUALS["vivir-en-el-peru"];
  if (normId.includes("famil")) return CATEGORY_VISUALS["familia"];
  if (normId.includes("identi") || normId.includes("dni") || normId.includes("ciudadan")) return CATEGORY_VISUALS["identificacion-ciudadana"];
  if (normId.includes("salud") || normId.includes("medic") || normId.includes("sis")) return CATEGORY_VISUALS["salud"];
  if (normId.includes("trabaj") || normId.includes("empleo") || normId.includes("pension")) return CATEGORY_VISUALS["trabajo"];
  if (normId.includes("denunc") || normId.includes("reclam") || normId.includes("justic")) return CATEGORY_VISUALS["denunciar-o-reclamar"];
  if (normId.includes("vivien") || normId.includes("construc") || normId.includes("predio")) return CATEGORY_VISUALS["vivienda-y-construccion"];
  if (normId.includes("viaj") || normId.includes("pasaport") || normId.includes("migra")) return CATEGORY_VISUALS["viajar-a-otro-pais"];
  if (normId.includes("entidad") || normId.includes("public") || normId.includes("gobiern")) return CATEGORY_VISUALS["entidades-publicas"];

  return {
    id: catId,
    name: name || catId,
    description: "Trámites y servicios del Estado peruano.",
    accentColor: "#2563eb",
    image: "/categories/entidades-publicas.png",
    alt: name || catId
  };
}

// Legacy mock types/data for unused component files
export type Procedure = any;
export type CategoryKey = string;
export const categories: any[] = [];
export const procedures: any[] = [];
export const getCategoryByKey = (key: string) => null;
export const TOTAL_PROCEDURES = 0;
export const TOTAL_CATEGORIES = 0;


