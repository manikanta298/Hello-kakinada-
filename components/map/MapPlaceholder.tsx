import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme';

interface MapPlaceholderProps {
  children?: React.ReactNode;
}

/**
 * A lightweight, stylized stand-in for a real map surface. No map SDK or
 * API key required — swap this for react-native-maps once one is wired up;
 * MapPin/MapListingPreview and the pin-positioning logic in the screens
 * that use this won't need to change.
 */
export function MapPlaceholder({ children }: MapPlaceholderProps) {
  return (
    <View style={styles.surface}>
      {/* Decorative grid to read as "map" without implying real streets */}
      <View style={styles.gridRow}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={`v${i}`} style={styles.vLine} />
        ))}
      </View>
      <View style={styles.gridCol}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View key={`h${i}`} style={styles.hLine} />
        ))}
      </View>

      {/* "You are here" marker, fixed at center */}
      <View style={styles.youAreHere}>
        <View style={styles.youAreHereDot} />
        <View style={styles.youAreHereRing} />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    overflow: 'hidden',
  },
  gridRow: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  vLine: {
    width: 1,
    backgroundColor: colors.border,
  },
  gridCol: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-evenly',
  },
  hLine: {
    height: 1,
    backgroundColor: colors.border,
  },
  youAreHere: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -8,
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youAreHereDot: {
    width: 12,
    height: 12,
    borderRadius: radius.circle,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.white,
    zIndex: 1,
  },
  youAreHereRing: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: radius.circle,
    backgroundColor: colors.accentLight,
  },
});
