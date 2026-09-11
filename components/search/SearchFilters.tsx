import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FilterChip } from './FilterChip';
import { useSearchStore } from '@/store/searchStore';
import { spacing } from '@/theme';

const SORT_LABELS: Record<string, string> = {
  relevance: 'Sort',
  rating: 'Top rated',
  distance: 'Nearest',
  newest: 'Newest',
};

export function SearchFilters() {
  const { filters, setFilters, activeFilterCount } = useSearchStore();
  const count = activeFilterCount();

  const cycleSort = () => {
    const order: (typeof filters.sortBy)[] = ['relevance', 'rating', 'distance', 'newest'];
    const next = order[(order.indexOf(filters.sortBy) + 1) % order.length];
    setFilters({ sortBy: next });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <FilterChip
        label="Filters"
        icon="options-outline"
        active={count > 0}
        badge={count > 0 ? count : undefined}
        onPress={() => router.push('/search/filters')}
      />
      <FilterChip
        label={SORT_LABELS[filters.sortBy]}
        active={filters.sortBy !== 'relevance'}
        onPress={cycleSort}
      />
      <FilterChip
        label="Rating 4.0+"
        active={filters.minRating === 4}
        onPress={() => setFilters({ minRating: filters.minRating === 4 ? undefined : 4 })}
      />
      <FilterChip
        label="Verified only"
        icon="checkmark-circle-outline"
        active={!!filters.verifiedOnly}
        onPress={() => setFilters({ verifiedOnly: !filters.verifiedOnly })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
});
