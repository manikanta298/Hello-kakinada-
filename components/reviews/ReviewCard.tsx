import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Review } from '@/types/review';
import { colors, radius, spacing } from '@/theme';

interface ReviewCardProps {
  review: Review;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AppText preset="small" color={colors.textInverse} style={styles.avatarText}>
            {initials}
          </AppText>
        </View>
        <View style={styles.headerText}>
          <AppText preset="bodyMedium">{review.userName}</AppText>
          <AppText preset="small" color={colors.textTertiary}>
            {formatDate(review.date)}
          </AppText>
        </View>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Ionicons
              key={i}
              name={i <= review.rating ? 'star' : 'star-outline'}
              size={12}
              color={colors.star}
            />
          ))}
        </View>
      </View>

      <AppText preset="caption" color={colors.textSecondary} style={styles.comment}>
        {review.comment}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  stars: {
    flexDirection: 'row',
  },
  comment: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
});
