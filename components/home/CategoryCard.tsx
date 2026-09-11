import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Category } from '@/types/category';
import { colors, radius, spacing } from '@/theme';

interface CategoryCardProps {
  category: Category;
  onPress?: (category: Category) => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress?.(category)}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={category.icon as any} size={22} color={colors.accent} />
      </View>
      <AppText preset="caption" align="center" numberOfLines={1} style={styles.label}>
        {category.name}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 76,
  },
  pressed: {
    opacity: 0.6,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: radius.xl,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textPrimary,
  },
});
