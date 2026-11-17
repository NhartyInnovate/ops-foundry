/**
 * Ops Foundry Design Tokens — Color Palette
 * Direction C: Shared Foundation, Distinct Personalities
 */

export const colors = {
  // Shared Brand Foundation
  brand: {
    orange: '#FF5A1F',
    orangeHover: '#E04810',
    orangeLight: '#FFF4EE',
    orangeBorder: '#FFD7C2',
  },

  // Surfaces & Backgrounds
  surface: {
    canvas: '#FBFBF9',     // Warm off-white (Shared base)
    pure: '#FFFFFF',       // Card highlights & clean modals
    muted: '#F3F4F6',      // Light neutral gray
  },

  // Property-Specific Personalities
  corporate: {
    black: '#111215',      // Industrial Carbon Black (Commercial Ground)
    blackHover: '#0B0C0E',
    card: '#18191E',
    border: '#282A30',
  },

  academy: {
    primary: '#7C3AED',         // Primary Purple
    primaryHover: '#6D28D9',    // Primary Hover
    deepViolet: '#4C1D95',      // Deep Violet Accent
    lightPurple: '#F3E8FF',     // Light Purple Background
    purpleBorder: '#DDD6FE',    // Subtle Purple Border
    mainText: '#1E232E',        // Scholastic Main Text / Headings
    white: '#FFFFFF',           // Crisp White
    slate: '#1E232E',           // Scholastic Deep Slate (Academic Ground)
    slateHover: '#151922',
    card: '#252B38',
    border: '#323B4C',
  },

  // Neutrals & Typography
  neutral: {
    900: '#111827',
    800: '#1F2937',
    700: '#374151',
    600: '#4B5563',
    500: '#6B7280',        // Secondary text
    400: '#9CA3AF',
    300: '#D1D5DB',
    200: '#E5E7EB',        // Neutral border
    100: '#F3F4F6',
    50: '#F9FAFB',
  },

  // Status & Feedback
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  }
} as const;

export type Colors = typeof colors;
