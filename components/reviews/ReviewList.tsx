import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/common/AppText';
import { RatingSummary } from './RatingSummary';
import { ReviewCard } from './ReviewCard';
import { Review } from '@/types/review';
import { colors, spacing } from '@/theme';

interface ReviewListProps {
  listingId: string;
  reviews: Review[];
  average: number;
  previewCount?: number;
}

export function ReviewList({ listingId, reviews, average, previewCount = 2 }: ReviewListProps) {
  const preview = reviews.slice(0, previewCount);
  const hasMore = reviews.length > previewCount;

  return (
    <View>
      <View style={styles.headerRow}>
        <AppText preset="h3">Reviews</AppText>
      </View>

      <RatingSummary average={average} count={reviews.length} />

      <View style={styles.list}>
        {preview.map((review, index) => (
          <View key={review.id}>
            <ReviewCard review={review} />
            {index < preview.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      {hasMore && (
        <Pressable
          style={styles.seeAll}
          onPress={() => router.push(`/listing/reviews?id=${listingId}`)}
        >
          <AppText preset="bodyMedium" color={colors.accent}>
            See all {reviews.length} reviews
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  seeAll: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
});
