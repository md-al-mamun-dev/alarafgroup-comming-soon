export const designTokens = {
  colors: {
    primary: "#142921",
    surface: "#FFFFFF",
    surfaceSubtle: "#F5F4F0",
    border: "#E6E4DF",
    textPrimary: "#142921",
    textBody: "#3A4742",
    textMuted: "#66746E",
    accent: "#0D1C16",
  },
  typography: {
    h1Size: "48px",
    h2Size: "30px",
    h3Size: "20px",
    bodySize: "14px",
    captionSize: "11px",
  },
  dimensions: {
    headerHeight: "93px",
    logoBoxSize: "43px",
    ctaButtonWidth: "145px",
    ctaButtonHeight: "50px",
    maxCanvasWidth: "1440px",
  },
  radii: {
    button: "7px",
    logo: "7.5px",
    card: "12px",
    slot: "16px",
  },
} as const;

export type DesignTokens = typeof designTokens;
export type SemanticColors = typeof designTokens.colors;

/**
 * Backward-compatible corpTokens alias
 */
export const corpTokens = {
  colors: {
    dark: designTokens.colors.primary,
    light: designTokens.colors.surfaceSubtle,
    border: designTokens.colors.border,
    frameBorder: designTokens.colors.textMuted,
    muted: designTokens.colors.textMuted,
    gray: designTokens.colors.textBody,
    accent: designTokens.colors.accent,
    cardBg: designTokens.colors.surface,
  },
  dimensions: designTokens.dimensions,
  radii: designTokens.radii,
} as const;

export type CorpColors = typeof corpTokens.colors;
