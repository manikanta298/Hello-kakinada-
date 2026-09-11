import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Screen } from '@/components/common/Screen';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeSearchBar } from '@/components/home/HomeSearchBar';
import { SectionHeader } from '@/components/home/SectionHeader';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PopularListings } from '@/components/home/PopularListings';
import { mockCategories } from '@/data/mockCategories';
import { mockListings } from '@/data/mockListings';
import { spacing } from '@/theme';

export default function HomeScreen() {
  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <HomeHeader />
        <HomeSearchBar />

        <View style={styles.section}>
          <SectionHeader title="Browse Categories" />
          <CategoryGrid categories={mockCategories} />
        </View>

        <View style={styles.section}>
          <PopularListings listings={mockListings} />
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
