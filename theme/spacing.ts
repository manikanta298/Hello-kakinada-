/**
 * Base-4 spacing scale. Use these instead of raw numbers
 * so future density/redesign changes are a one-line edit.
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,

  // Common layout aliases
  screenPadding: 16,
  cardPadding: 16,
  sectionGap: 24,
} as const;
