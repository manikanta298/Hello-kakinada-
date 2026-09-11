import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Rating } from './Rating';
import { Listing } from '@/types/listing';
import { colors, radius, spacing } from '@/theme';

interface ListingHeaderProps {
  listing: Listing;
}

export function ListingHeader({ listing }: ListingHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.categoryRow}>
        <AppText preset="caption" color={colors.accent} style={styles.category}>
          {listing.categoryName.toUpperCase()}
        </AppText>
        {listing.verified && (
          <View style={styles.verifiedPill}>
            <Ionicons name="checkmark-circle" size={12} color={colors.accent} />
            <AppText preset="small" color={colors.accent} style={styles.verifiedText}>
              Verified
            </AppText>
          </View>
        )}
      </View>

      <AppText preset="h1" style={styles.title}>
        {listing.title}
      </AppText>

      <View style={styles.metaRow}>
        <Rating value={listing.rating} reviewCount={listing.reviewCount} size={15} />
        {listing.price && (
          <>
            <View style={styles.dot} />
            <AppText preset="bodyMedium">{listing.price}</AppText>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  verifiedText: {
    marginLeft: 3,
    fontWeight: '600',
  },
  title: {
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textTertiary,
    marginHorizontal: spacing.sm,
  },
});
