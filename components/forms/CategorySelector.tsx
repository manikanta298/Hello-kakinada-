import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Category } from '@/types/category';
import { colors, radius, spacing } from '@/theme';

interface CategorySelectorProps {
  categories: Category[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function CategorySelector({ categories, selectedId, onSelect }: CategorySelectorProps) {
  return (
    <View style={styles.grid}>
      {categories.map((category) => {
        const active = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            style={[styles.card, active && styles.cardActive]}
            onPress={() => onSelect(category.id)}
          >
            <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
              <Ionicons
                name={category.icon as any}
                size={20}
                color={active ? colors.white : colors.accent}
              />
            </View>
            <AppText
              preset="caption"
              color={active ? colors.accent : colors.textPrimary}
              style={styles.label}
            >
              {category.name}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  cardActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconCircleActive: {
    backgroundColor: colors.accent,
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
  },
});
