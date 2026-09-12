import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Screen } from '@/components/common/Screen';
import { LoadingState } from '@/components/common/LoadingState';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeSearchBar } from '@/components/home/HomeSearchBar';
import { SectionHeader } from '@/components/home/SectionHeader';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PopularListings } from '@/components/home/PopularListings';
import { useCategories } from '@/hooks/useCategories';
import { useAllListings } from '@/hooks/useListings';
import { spacing } from '@/theme';

export default function HomeScreen() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { listings, loading: listingsLoading } = useAllListings();
  const loading = categoriesLoading || listingsLoading;

  if (loading) {
    return (
      <Screen edges={['top']}>
        <StatusBar style="dark" />
        <LoadingState />
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <HomeHeader />
        <HomeSearchBar />

        <View style={styles.section}>
          <SectionHeader title="Browse Categories" onPressAction={() => router.push('/categories')} />
          <CategoryGrid categories={categories} />
        </View>

        <View style={styles.section}>
          <PopularListings listings={listings} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.xl,
  },
});
