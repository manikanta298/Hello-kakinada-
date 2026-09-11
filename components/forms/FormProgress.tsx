import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface FormProgressProps {
  step: number; // 1-based
  total: number;
  title: string;
  onBack?: () => void;
}

export function FormProgress({ step, total, title, onBack }: FormProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={onBack ?? (() => router.back())} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="caption" color={colors.textTertiary}>
          Step {step} of {total}
        </AppText>
      </View>

      <AppText preset="h2" style={styles.title}>
        {title}
      </AppText>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(step / total) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: spacing.md,
  },
  track: {
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
  },
});
