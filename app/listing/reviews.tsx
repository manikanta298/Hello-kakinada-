import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { useListingReviews } from '@/hooks/useListingReviews';
import { colors, spacing } from '@/theme';

export default function AllReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, reviews, average, loading } = useListingReviews(id);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3" numberOfLines={1} style={styles.headerTitle}>
          {listing?.title ?? 'Reviews'}
        </AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={
            <View style={styles.summary}>
              <RatingSummary average={average} count={reviews.length} />
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <ReviewCard review={item} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="chatbubble-ellipses-outline" size={40} color={colors.textTertiary} />
              <AppText preset="body" color={colors.textSecondary} style={styles.emptyText}>
                No reviews yet.
              </AppText>
            </View>
          }
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
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  summary: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cardWrap: {
    paddingHorizontal: spacing.screenPadding,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
