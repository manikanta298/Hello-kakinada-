/**
 * Clean, white-first color palette.
 * Backgrounds stay near-white; a single accent carries all emphasis.
 */

export const colors = {
  // Backgrounds
  background: '#FFFFFF',
  backgroundAlt: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Borders / dividers
  border: '#EDEDED',
  borderStrong: '#E0E0E0',

  // Text
  textPrimary: '#111111',
  textSecondary: '#6B6B6B',
  textTertiary: '#A0A0A0',
  textInverse: '#FFFFFF',
  textDisabled: '#C7C7C7',

  // Brand / accent — replace with the exact hex sampled from the logo
  primary: '#111111',
  primaryLight: '#3A3A3A',
  accent: '#0A66FF',
  accentLight: '#E8F0FF',
  accentPressed: '#0850CC',

  // Feedback
  success: '#1FA971',
  successLight: '#E4F7EF',
  warning: '#F5A623',
  warningLight: '#FFF3DD',
  error: '#E5484D',
  errorLight: '#FDECEC',
  info: '#3B82F6',
  infoLight: '#EAF2FE',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.4)',
  skeleton: '#F0F0F0',

  // Ratings
  star: '#FFB400',
} as const;

export type ColorKey = keyof typeof colors;
