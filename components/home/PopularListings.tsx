import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SectionHeader } from './SectionHeader';
import { ListingCard } from '@/components/listings/ListingCard';
import { Listing } from '@/types/listing';
import { spacing } from '@/theme';

interface PopularListingsProps {
  listings: Listing[];
  title?: string;
  onPressAction?: () => void;
}

export function PopularListings({ listings, title = 'Popular Near You', onPressAction }: PopularListingsProps) {
  return (
    <View>
      <SectionHeader title={title} onPressAction={onPressAction ?? (() => router.push('/search'))} />
      <FlatList
        data={listings}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ListingCard listing={item} />}
        ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.screenPadding,
  },
});
