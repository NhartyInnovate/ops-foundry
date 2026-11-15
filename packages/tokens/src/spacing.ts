/**
 * Ops Foundry Design Tokens — Spacing, Layout & Radii
 */

export const layout = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  },

  borderRadius: {
    none: '0',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem', // Primary card radius from wireframes
    '3xl': '1.5rem',
    full: '9999px',   // Button pill radius from wireframes
  },

  breakpoints: {
    mobile: '390px',
    tablet: '768px',
    desktop: '1440px',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;

export type Layout = typeof layout;
