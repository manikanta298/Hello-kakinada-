import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { SectionHeader } from '@/components/home/SectionHeader';
import { PopularListings } from '@/components/home/PopularListings';
import { useCategories } from '@/hooks/useCategories';
import { useNearbyListings, useTrendingListings } from '@/hooks/useListings';
import { colors, radius, spacing } from '@/theme';

export default function ExploreScreen() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { listings: trending, loading: trendingLoading } = useTrendingListings();
  const { listings: nearby, loading: nearbyLoading } = useNearbyListings();
  const loading = categoriesLoading || trendingLoading || nearbyLoading;

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <AppText preset="h2">Explore</AppText>
        <Pressable
          style={styles.searchButton}
          onPress={() => router.push('/search')}
          hitSlop={8}
        >
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <AppText preset="body" color={colors.textTertiary} style={styles.searchLabel}>
            Search Kakinada...
          </AppText>
        </Pressable>
      </View>

      {loading ? (
        <LoadingState />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <SectionHeader title="All Categories" onPressAction={() => router.push('/categories')} />
            <CategoryGrid categories={categories} />
          </View>

          <View style={styles.section}>
            <PopularListings listings={trending} title="Top Rated" />
          </View>

          <View style={styles.section}>
            <PopularListings listings={nearby} title="Nearby You" />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  searchLabel: {
    marginLeft: spacing.sm,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.xl,
  },
});
