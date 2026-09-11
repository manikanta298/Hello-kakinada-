import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  fontFamily,

  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },

  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Ready-to-spread presets for common text roles
  preset: {
    display: { fontSize: 36, fontWeight: '700' as const, lineHeight: 44 },
    h1: { fontSize: 30, fontWeight: '700' as const, lineHeight: 38 },
    h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 30 },
    h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 26 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
    bodyMedium: { fontSize: 16, fontWeight: '500' as const, lineHeight: 22 },
    caption: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    small: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 20 },
  },
} as const;
