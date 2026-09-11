import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Screen } from '@/components/common/Screen';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchFilters } from '@/components/search/SearchFilters';
import { ViewToggle } from '@/components/search/ViewToggle';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { SearchEmptyState } from '@/components/search/SearchEmptyState';
import { useSearchStore } from '@/store/searchStore';
import { mockListings } from '@/data/mockListings';
import { colors, spacing } from '@/theme';

export default function SearchScreen() {
  const { query, setQuery, filters } = useSearchStore();
  const [view, setView] = useState<'list' | 'map'>('list');

  const results = useMemo(() => {
    let list = mockListings;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.categoryName.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q)
      );
    }

    if (filters.categoryId) {
      list = list.filter((l) => l.categoryId === filters.categoryId);
    }
    if (filters.minRating) {
      list = list.filter((l) => l.rating >= filters.minRating!);
    }
    if (filters.verifiedOnly) {
      list = list.filter((l) => l.verified);
    }

    const sorted = [...list];
    if (filters.sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === 'distance') sorted.sort((a, b) => (a.distance ?? 99) - (b.distance ?? 99));

    return sorted;
  }, [query, filters]);

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <SearchInput value={query} onChangeText={setQuery} autoFocus />
      <SearchFilters />
      <ViewToggle value={view} onChange={setView} resultCount={results.length} />

      {view === 'list' ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultCard listing={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListEmptyComponent={<SearchEmptyState query={query} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.mapPlaceholder}>
          <SearchEmptyState />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding + 84 + spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },
});
