import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { SearchEmptyState } from '@/components/search/SearchEmptyState';
import { useCategory } from '@/hooks/useCategories';
import { useListingsByCategory } from '@/hooks/useListings';
import { colors, spacing } from '@/theme';

export default function CategoryListingsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { category, loading: categoryLoading } = useCategory(slug);
  const { listings, loading: listingsLoading } = useListingsByCategory(category?.id ?? '');
  const loading = categoryLoading || (!!category && listingsLoading);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3" numberOfLines={1} style={styles.headerTitle}>
          {category?.name ?? 'Category'}
        </AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : !category ? (
        <SearchEmptyState />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultCard listing={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <AppText preset="caption" color={colors.textTertiary} style={styles.countLabel}>
              {listings.length} listing{listings.length !== 1 ? 's' : ''}
            </AppText>
          }
          ListEmptyComponent={<SearchEmptyState />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  countLabel: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding + 84 + spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
});
