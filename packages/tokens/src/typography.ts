/**
 * Ops Foundry Design Tokens — Typography
 */

export const typography = {
  fonts: {
    display: 'var(--font-manrope), Manrope, sans-serif',
    body: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  fontSizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1.12' }],
    '6xl': ['3.75rem', { lineHeight: '1.08' }],
    '7xl': ['4.5rem', { lineHeight: '1.04' }],
  },

  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  letterSpacing: {
    tightest: '-0.03em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    widest: '0.05em',
  }
} as const;

export type Typography = typeof typography;
