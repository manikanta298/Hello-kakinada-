import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FilterChip } from '@/components/search/FilterChip';
import { useSearchStore } from '@/store/searchStore';
import { mockCategories } from '@/data/mockCategories';
import { SortOption } from '@/types/search';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Top rated', value: 'rating' },
  { label: 'Nearest', value: 'distance' },
  { label: 'Newest', value: 'newest' },
];

const RATING_OPTIONS = [4.5, 4, 3.5, 3];

export default function FiltersScreen() {
  const { filters, setFilters, resetFilters } = useSearchStore();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Filters</AppText>
        <Pressable onPress={resetFilters} hitSlop={8}>
          <AppText preset="bodyMedium" color={colors.accent}>
            Reset
          </AppText>
        </Pressable>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <FilterSection title="Category">
          <View style={styles.wrapRow}>
            {mockCategories.map((c) => (
              <FilterChip
                key={c.id}
                label={c.name}
                active={filters.categoryId === c.id}
                onPress={() =>
                  setFilters({ categoryId: filters.categoryId === c.id ? undefined : c.id })
                }
              />
            ))}
          </View>
        </FilterSection>

        <FilterSection title="Minimum Rating">
          <View style={styles.wrapRow}>
            {RATING_OPTIONS.map((r) => (
              <FilterChip
                key={r}
                label={`${r}+`}
                icon="star"
                active={filters.minRating === r}
                onPress={() => setFilters({ minRating: filters.minRating === r ? undefined : r })}
              />
            ))}
          </View>
        </FilterSection>

        <FilterSection title="Sort By">
          <View style={styles.sortList}>
            {SORT_OPTIONS.map((option) => {
              const active = filters.sortBy === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={styles.sortRow}
                  onPress={() => setFilters({ sortBy: option.value })}
                >
                  <AppText preset="body" color={active ? colors.accent : colors.textPrimary}>
                    {option.label}
                  </AppText>
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={active ? colors.accent : colors.textTertiary}
                  />
                </Pressable>
              );
            })}
          </View>
        </FilterSection>

        <FilterSection title="Other">
          <Pressable
            style={styles.toggleRow}
            onPress={() => setFilters({ verifiedOnly: !filters.verifiedOnly })}
          >
            <AppText preset="body">Verified listings only</AppText>
            <Ionicons
              name={filters.verifiedOnly ? 'checkbox' : 'square-outline'}
              size={22}
              color={filters.verifiedOnly ? colors.accent : colors.textTertiary}
            />
          </Pressable>
        </FilterSection>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.applyButton, pressed && styles.applyPressed]}
          onPress={() => router.back()}
        >
          <AppText preset="button" color={colors.white}>
            Apply Filters
          </AppText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText preset="bodyMedium" style={styles.sectionTitle}>
        {title}
      </AppText>
      {children}
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
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sortList: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.screenPadding,
  },
  applyButton: {
    height: dimensions.buttonHeight,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  applyPressed: {
    backgroundColor: colors.accentPressed,
  },
});
