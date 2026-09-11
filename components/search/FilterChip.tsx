import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface FilterChipProps {
  label: string;
  active?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  badge?: number;
  onPress?: () => void;
}

export function FilterChip({ label, active = false, icon, badge, onPress }: FilterChipProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && styles.chipPressed,
      ]}
      onPress={onPress}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={14}
          color={active ? colors.accent : colors.textSecondary}
          style={styles.icon}
        />
      )}
      <AppText preset="small" color={active ? colors.accent : colors.textPrimary} style={styles.label}>
        {label}
      </AppText>
      {!!badge && (
        <AppText preset="small" color={colors.accent} style={styles.badge}>
          {badge}
        </AppText>
      )}
      {!icon && (
        <Ionicons
          name="chevron-down"
          size={12}
          color={active ? colors.accent : colors.textTertiary}
          style={styles.chevron}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  chipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  chipPressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 4,
  },
  chevron: {
    marginLeft: 3,
  },
  label: {
    fontWeight: '500',
  },
  badge: {
    marginLeft: 4,
    fontWeight: '700',
  },
});
