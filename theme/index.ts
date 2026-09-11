export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './dimensions';

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { dimensions } from './dimensions';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  dimensions,
} as const;

export type Theme = typeof theme;
