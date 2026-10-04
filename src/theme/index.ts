/**
 * AhorraTiempo Design System — Theme Constants
 * Single source of truth for all design tokens (TS side).
 * CSS variables are the runtime source; these are for use in
 * inline styles, calculations, or logic that needs raw values.
 */

export const AT_COLORS = {
  /* Brand */
  primary:   '#0D6EFD',
  secondary: '#00C2FF',
  accent:    '#00E0A6',

  /* Backgrounds */
  background: "var(--colorNeutralBackground1)",
  surface:    '#142335',
  surfaceAlt: '#0D1B2A',
  surfaceDeep:'#1A2C3F',

  /* Text */
  foreground:  '#FFFFFF',
  textMuted:   '#B8C1D1',

  /* States */
  error:   '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info:    '#0D6EFD',

  /* Borders */
  border: '#1E3A54',
} as const;

export const AT_RADIUS = {
  btn:   14,   // px
  card:  18,   // px
  input: 14,   // px
  modal: 20,   // px
  chip:  999,  // px (pill)
  sm:    8,    // px
} as const;

export const AT_SHADOW = {
  sm:   '0 4px 16px rgba(0,0,0,0.12)',
  md:   '0 10px 35px rgba(0,0,0,0.18)',
  lg:   '0 20px 60px rgba(0,0,0,0.25)',
  glow: '0 0 24px rgba(13,110,253,0.35)',
  glowAccent: '0 0 24px rgba(0,224,166,0.30)',
} as const;

export const AT_DURATION = {
  fast:   200, // más
  normal: 250, // más
  slow:   300, // más
} as const;

export const AT_SPACING = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const AT_FONT = {
  family: "'Poppins', 'Inter', sans-serif",
  weights: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
} as const;

export const AT_CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  identidad:   { color: '#0D6EFD', bg: 'rgba(13,110,253,0.15)' },
  salud:       { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  tributos:    { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  trabajo:     { color: '#00C2FF', bg: 'rgba(0,194,255,0.15)' },
  justicia:    { color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
  educacion:   { color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
  propiedad:   { color: '#00E0A6', bg: 'rgba(0,224,166,0.15)' },
  pensiones:   { color: '#00C2FF', bg: 'rgba(0,194,255,0.15)' },
  migraciones: { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  produccion:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  telecom:     { color: '#0D6EFD', bg: 'rgba(13,110,253,0.15)' },
};

/** Returns the gradient string for the primary CTA */
export const AT_GRADIENT_PRIMARY = 'linear-gradient(135deg, #0D6EFD 0%, #0056d2 100%)';
export const AT_GRADIENT_BRAND   = 'linear-gradient(135deg, #0D6EFD 0%, #00C2FF 50%, #00E0A6 100%)';
export const AT_GRADIENT_HERO    = `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,110,253,0.22) 0%, transparent 70%),
  radial-gradient(ellipse 40% 40% at 80% 50%, rgba(0,194,255,0.10) 0%, transparent 60%),
  #081320`;

export default {
  colors:  AT_COLORS,
  radius:  AT_RADIUS,
  shadow:  AT_SHADOW,
  duration: AT_DURATION,
  spacing: AT_SPACING,
  font:    AT_FONT,
  gradients: {
    primary: AT_GRADIENT_PRIMARY,
    brand:   AT_GRADIENT_BRAND,
    hero:    AT_GRADIENT_HERO,
  },
};
