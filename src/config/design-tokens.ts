/**
 * ╔══════════════════════════════════════════════════╗
 *  DESIGN TOKENS — Single source of truth
 *  Edit values here → entire app updates automatically
 * ╚══════════════════════════════════════════════════╝
 */

// ─── Fonts ──────────────────────────────────────────
export const fonts = {
  sans: '"Inter", "Inter Placeholder", system-ui, sans-serif',
  serif: '"Instrument Serif", "Georgia", serif',
} as const;

// ─── Colors ─────────────────────────────────────────
export const colors = {
  /** Light surface backgrounds */
  bg: {
    DEFAULT: "#fefefe",
    subtle: "#f5f5f5",
    muted: "#eee",
  },

  /** Fixed raw values (never swapped by theme) */
  raw: {
    bgLight: "#fefefe",
    bgDark: "#050505",
    surface: "#141414",
    textLight: "#fefefe",
    textDark: "#141414",
  },

  /** Card & surface backgrounds */
  card: {
    DEFAULT: "#111111",
    hover: "#1a1a1a",
  },
  surface: "#141414",

  /** Accent palette */
  accent: {
    teal: "#2dd4bf",
    pink: "#f472b6",
    purple: "#a78bfa",
    blue: "#60a5fa",
  },

  /** Glow overlays */
  glow: {
    teal: "rgba(45, 212, 191, 0.15)",
    pink: "rgba(244, 114, 182, 0.15)",
    purple: "rgba(167, 139, 250, 0.15)",
    blue: "rgba(96, 165, 250, 0.15)",
  },

  /** Borders */
  border: {
    light: "rgba(0, 0, 0, 0.06)",
    dark: "rgba(255, 255, 255, 0.06)",
  },
} as const;

// ─── Theme-Aware Colors ─────────────────────────────
// These swap automatically between light ↔ dark
export const themes = {
  light: {
    bg: colors.raw.bgLight,
    textPrimary: colors.raw.textDark,
    textSecondary: "#666666",
    textMuted: "#a3a3a3",
    textInverse: colors.raw.textLight,
    borderDyn: "rgba(0, 0, 0, 0.06)",
  },
  dark: {
    bg: colors.raw.bgDark,
    textPrimary: colors.raw.textLight,
    textSecondary: "#9e9e9e",
    textMuted: "#666666",
    textInverse: colors.raw.textDark,
    borderDyn: "rgba(255, 255, 255, 0.06)",
  },
} as const;

// ─── Spacing (8px base) ─────────────────────────────
export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
} as const;

// ─── Typography Scale ───────────────────────────────
export const typography = {
  xs: "11px",
  sm: "13px",
  base: "15px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "60px",
  "7xl": "72px",
  hero: "clamp(48px, 6.5vw, 80px)",
} as const;

// ─── Border Radius ──────────────────────────────────
export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  full: "9999px",
} as const;

// ─── Shadows ────────────────────────────────────────
export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.06)",
  md: "0 4px 12px rgba(0, 0, 0, 0.08)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.1)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.12)",
} as const;

// ─── Transitions ────────────────────────────────────
export const transitions = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: "200ms",
  durationBase: "300ms",
  durationSlow: "500ms",
} as const;

// ─── Full Token Map (for CSS variable injection) ────
// Maps each TS token → its CSS custom property name + value
export function getCSSVariables(theme: "light" | "dark" = "light") {
  const t = themes[theme];

  return {
    // Fonts
    "--font-sans": fonts.sans,
    "--font-serif": fonts.serif,

    // Backgrounds
    "--color-bg": t.bg,
    "--color-bg-subtle": colors.bg.subtle,
    "--color-bg-muted": colors.bg.muted,
    "--color-bg-light-raw": colors.raw.bgLight,
    "--color-bg-dark-raw": colors.raw.bgDark,
    "--color-surface-raw": colors.raw.surface,
    "--color-text-light-raw": colors.raw.textLight,
    "--color-text-dark-raw": colors.raw.textDark,
    "--color-bg-card": colors.card.DEFAULT,
    "--color-bg-card-hover": colors.card.hover,
    "--color-surface": colors.surface,

    // Dynamic text
    "--color-text-primary": t.textPrimary,
    "--color-text-secondary": t.textSecondary,
    "--color-text-muted": t.textMuted,
    "--color-text-inverse": t.textInverse,
    "--color-border-dyn": t.borderDyn,

    // Accent
    "--color-accent-teal": colors.accent.teal,
    "--color-accent-pink": colors.accent.pink,
    "--color-accent-purple": colors.accent.purple,
    "--color-accent-blue": colors.accent.blue,

    // Glow
    "--color-glow-teal": colors.glow.teal,
    "--color-glow-pink": colors.glow.pink,
    "--color-glow-purple": colors.glow.purple,
    "--color-glow-blue": colors.glow.blue,

    // Border
    "--color-border-light": colors.border.light,
    "--color-border-dark": colors.border.dark,

    // Spacing
    "--space-1": spacing[1],
    "--space-2": spacing[2],
    "--space-3": spacing[3],
    "--space-4": spacing[4],
    "--space-5": spacing[5],
    "--space-6": spacing[6],
    "--space-8": spacing[8],
    "--space-10": spacing[10],
    "--space-12": spacing[12],
    "--space-16": spacing[16],
    "--space-20": spacing[20],
    "--space-24": spacing[24],
    "--space-32": spacing[32],

    // Typography
    "--text-xs": typography.xs,
    "--text-sm": typography.sm,
    "--text-base": typography.base,
    "--text-lg": typography.lg,
    "--text-xl": typography.xl,
    "--text-2xl": typography["2xl"],
    "--text-3xl": typography["3xl"],
    "--text-4xl": typography["4xl"],
    "--text-5xl": typography["5xl"],
    "--text-6xl": typography["6xl"],
    "--text-7xl": typography["7xl"],
    "--text-hero": typography.hero,

    // Radius
    "--radius-sm": radius.sm,
    "--radius-md": radius.md,
    "--radius-lg": radius.lg,
    "--radius-xl": radius.xl,
    "--radius-2xl": radius["2xl"],
    "--radius-full": radius.full,

    // Shadows
    "--shadow-sm": shadows.sm,
    "--shadow-md": shadows.md,
    "--shadow-lg": shadows.lg,
    "--shadow-xl": shadows.xl,

    // Transitions
    "--ease-out": transitions.easeOut,
    "--duration-fast": transitions.durationFast,
    "--duration-base": transitions.durationBase,
    "--duration-slow": transitions.durationSlow,
  } as const;
}
