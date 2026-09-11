import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

export function SectionHeader({ title, actionLabel = 'See all', onPressAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText preset="h3">{title}</AppText>

      {onPressAction && (
        <Pressable style={styles.action} onPress={onPressAction} hitSlop={8}>
          <AppText preset="bodyMedium" color={colors.accent}>
            {actionLabel}
          </AppText>
          <Ionicons name="chevron-forward" size={16} color={colors.accent} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.sm,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
