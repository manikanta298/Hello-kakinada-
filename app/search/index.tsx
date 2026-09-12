import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Screen } from '@/components/common/Screen';
import { LoadingState } from '@/components/common/LoadingState';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchFilters } from '@/components/search/SearchFilters';
import { ViewToggle } from '@/components/search/ViewToggle';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { SearchEmptyState } from '@/components/search/SearchEmptyState';
import { ListingsMapView } from '@/components/map/ListingsMapView';
import { useSearch } from '@/hooks/useSearch';
import { colors, spacing } from '@/theme';

export default function SearchScreen() {
  const { query, setQuery, results, loading } = useSearch();
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <SearchInput value={query} onChangeText={setQuery} autoFocus />
      <SearchFilters />
      <ViewToggle value={view} onChange={setView} resultCount={results.length} />

      {loading ? (
        <LoadingState />
      ) : view === 'list' ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultCard listing={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListEmptyComponent={<SearchEmptyState query={query} />}
          contentContainerStyle={styles.listContent}
        />
      ) : results.length === 0 ? (
        <SearchEmptyState query={query} />
      ) : (
        <View style={styles.mapWrap}>
          <ListingsMapView listings={results} />
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
  mapWrap: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },
});
