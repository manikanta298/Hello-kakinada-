import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { CategoryCard } from './CategoryCard';
import { Category } from '@/types/category';
import { spacing } from '@/theme';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <View style={styles.grid}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={(c) => router.push(`/categories/${c.slug}`)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
    paddingHorizontal: spacing.screenPadding,
  },
});
