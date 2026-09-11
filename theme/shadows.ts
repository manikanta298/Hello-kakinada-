import { Platform } from 'react-native';

/**
 * On a white background, shadows do the work borders can't.
 * Keep opacity low — these should read as "lift", not "outline".
 */
const shadow = (elevation: number, opacity: number, radius: number) =>
  Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {},
  });

export const shadows = {
  none: {},
  card: shadow(2, 0.06, 8),
  raised: shadow(4, 0.08, 12),
  modal: shadow(12, 0.12, 24),
} as const;
