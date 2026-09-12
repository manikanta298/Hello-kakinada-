import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '@/theme';

interface MapPinProps {
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress?: () => void;
}

export function MapPin({ icon, active = false, onPress }: MapPinProps) {
  return (
    <Pressable style={styles.wrap} onPress={onPress} hitSlop={8}>
      <View style={[styles.circle, active && styles.circleActive]}>
        <Ionicons name={icon} size={16} color={active ? colors.white : colors.accent} />
      </View>
      <View style={[styles.tail, active && styles.tailActive]} />
    </Pressable>
  );
}

const SIZE = 32;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.circle,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleActive: {
    backgroundColor: colors.accent,
    borderColor: colors.white,
  },
  tail: {
    width: 8,
    height: 8,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.accent,
    marginTop: -6,
    transform: [{ rotate: '45deg' }],
  },
  tailActive: {
    backgroundColor: colors.accent,
    borderColor: colors.white,
  },
});
