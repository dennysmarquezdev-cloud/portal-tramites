/**
 * ═══════════════════════════════════════════════════════════════
 * GOB.PE OFFICIAL DESIGN SYSTEM — COLOR PALETTE & SEMANTIC TOKENS
 * Secretaría de Gobierno y Transformación Digital (PCM / Gob.pe)
 * ═══════════════════════════════════════════════════════════════
 */

export const GOBPE_COLORS = {
  // ── Primarios ──
  red: {
    800: "#BF0909", // Color corporativo y principal
    700: "#DC362E",
    600: "#E46962",
    500: "#EB918E",
    400: "#F2B8B5",
    300: "#F9DEDC",
    200: "#FCEEEE",
  },
  gray: {
    800: "#26292E", // Textos y títulos principales, bordes, footer
    700: "#3C3E43",
    600: "#515458",
    500: "#7D7F82",
    450: "#979797", // Texto alternativo/muted
    400: "#A8A9AB",
    300: "#BEBFC0",
    200: "#E9EAEA",
    100: "#FFFFFF",
  },
  neutral: {
    800: "#171717",
    700: "#262626",
    600: "#555869", // Texto secundario alternativo
    550: "#656A8A",
    500: "#8A94A2",
    400: "#C5CDDA",
    350: "#D4DDEC",
    300: "#DEE3EA", // Deshabilitado, bordes suaves
    250: "#EEF3FB",
    200: "#EDF0F4",
    100: "#F6F9FC", // Secciones alternativas
  },

  // ── Secundarios ──
  blue: {
    800: "#184397", // Hover principal
    700: "#0056AC", // Botones y enlaces principales
    650: "#1363D0", // Contenedores
    600: "#0071E3",
    500: "#4597E8",
    400: "#E1F0FF",
    350: "#E8F2F7", // Contenedores suaves
    300: "#EEF3FB", // Alternativo secciones
    200: "#F2F9FF", // Secciones alternativas
    150: "#F4F8FB", // Migas de pan, secciones
  },
  green: {
    800: "#126B49",
    700: "#1B9D6B", // Alertas positivas, tags y labels
    600: "#54B690",
    500: "#C9F0D8",
    400: "#E3F3EC",
  },
  orange: {
    800: "#D75600",
    700: "#FF6701", // Alertas, semáforos, tags y labels
    600: "#FF8C41",
    500: "#FFC6A0",
    400: "#FFF3EA",
  },
  yellow: {
    800: "#997300",
    700: "#C69810",
    600: "#EAB824",
    500: "#FFD147", // Focus ring, estado seleccionado
    400: "#FFE8A3",
    300: "#FFF9E8",
  },
  indigo: {
    800: "#2A2D59",
    700: "#474D98", // Banners, tags y labels
    600: "#6C74E6",
    500: "#C1C5FF",
    400: "#DFE1FF",
    300: "#F1F2FF",
  },
  purple: {
    800: "#331980",
    700: "#5D2EE5", // Botones alternativos, tags
    650: "#5D48E0",
    600: "#7865EC",
    400: "#9A7CEF",
    300: "#C2B1F5",
    200: "#F6F6FE",
  },
  strawberry: {
    800: "#D20042",
    700: "#DD4071", // Banners, tags y labels
    600: "#EE9FB8",
    500: "#F9DFE7",
    400: "#FFF3F7",
  },
  skyblue: {
    800: "#0995AD", // Banners, tags y labels
    700: "#87DFEF",
    600: "#AAF2FF",
    500: "#E2FBFF",
    400: "#F2FDFF",
  },
} as const;

/**
 * Roles Semánticos Oficiales Gob.pe
 */
export const GOBPE_SEMANTIC = {
  // Fondos
  bgContainer: GOBPE_COLORS.blue[650],
  bgContainerLight: GOBPE_COLORS.blue[350],
  bgAlt1: GOBPE_COLORS.blue[200],
  bgAlt2: GOBPE_COLORS.blue[300],
  bgAlt3: GOBPE_COLORS.neutral[100],
  bgBreadcrumbs: GOBPE_COLORS.blue[150],
  bgFooter: GOBPE_COLORS.gray[800],

  // Textos
  textPrimary: GOBPE_COLORS.gray[800],
  textSecondary: GOBPE_COLORS.neutral[600],
  textMuted: GOBPE_COLORS.gray[450],

  // Botones y Enlaces
  btnPrimary: GOBPE_COLORS.blue[700],
  btnPrimaryHover: GOBPE_COLORS.blue[800],
  btnAlt: GOBPE_COLORS.purple[700],
  btnDisabled: GOBPE_COLORS.neutral[300],

  // Bordes
  borderMain: GOBPE_COLORS.gray[800],
  borderDisabled: GOBPE_COLORS.neutral[300],

  // Focus
  focusRing: GOBPE_COLORS.yellow[500],
} as const;

export default GOBPE_COLORS;
