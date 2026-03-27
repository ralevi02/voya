/** Design tokens extracted from voya_cascade_mobile.html */

export const DARK = {
  bg: '#060606',
  mapGradient: ['#081812', '#0D2218', '#091A12', '#0C1E16'],
} as const;

/** Glass-morphism presets */
export const GLASS = {
  /** .g — standard glass card */
  standard: {
    bg: 'rgba(255,255,255,0.058)',
    border: 'rgba(255,255,255,0.10)',
    inset: 'rgba(255,255,255,0.11)',
    blur: 48,
  },
  /** .g2 — subtle glass */
  subtle: {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.07)',
    blur: 20,
  },
  /** .g3 — hero card glass */
  hero: {
    bg: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.15)',
    inset: 'rgba(255,255,255,0.17)',
    blur: 56,
  },
  /** .g-dock — bottom dock glass */
  dock: {
    bg: 'rgba(255,255,255,0.09)',
    border: 'rgba(255,255,255,0.16)',
    inset: 'rgba(255,255,255,0.20)',
    blur: 64,
  },
} as const;

/** Accent green used across badges & status */
export const GREEN = {
  solid: '#39D98A',
  badge_bg: 'rgba(57,217,138,0.12)',
  badge_border: 'rgba(57,217,138,0.22)',
  badge_text: 'rgba(57,217,138,0.82)',
  glow: 'rgba(57,217,138,0.80)',
} as const;

/** Text opacity scale from the mockup */
export const TEXT = {
  primary: 'rgba(232,234,244,0.92)',
  secondary: 'rgba(210,216,238,0.80)',
  muted: 'rgba(138,142,165,0.50)',
  dim: 'rgba(120,124,145,0.38)',
  ghost: 'rgba(120,124,145,0.32)',
  label: 'rgba(138,142,162,0.42)',
} as const;
