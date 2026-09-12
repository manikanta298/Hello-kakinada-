import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Rating } from './Rating';
import { FavoriteButton } from './FavoriteButton';
import { Listing } from '@/types/listing';
import { getListingRoute } from '@/utils/listingRoute';
import { colors, radius, shadows, spacing } from '@/theme';

interface ListingCardProps {
  listing: Listing;
  width?: number;
}

export function ListingCard({ listing, width = 220 }: ListingCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}
      onPress={() => router.push(getListingRoute(listing))}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: listing.image }} style={styles.image} />
        <View style={styles.favoriteOverlay}>
          <FavoriteButton />
        </View>
        {listing.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={12} color={colors.white} />
            <AppText preset="small" color={colors.white} style={styles.verifiedText}>
              Verified
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <AppText preset="bodyMedium" numberOfLines={1}>
          {listing.title}
        </AppText>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={colors.textTertiary} />
          <AppText preset="small" color={colors.textTertiary} numberOfLines={1} style={styles.location}>
            {listing.location}
          </AppText>
        </View>

        <View style={styles.footerRow}>
          <Rating value={listing.rating} reviewCount={listing.reviewCount} />
          {listing.price && (
            <AppText preset="small" color={colors.accent} style={styles.price}>
              {listing.price}
            </AppText>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  pressed: {
    opacity: 0.85,
  },
  imageWrapper: {
    height: 130,
    backgroundColor: colors.skeleton,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteOverlay: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  verifiedBadge: {
    position: 'absolute',
    left: spacing.xs,
    bottom: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  verifiedText: {
    marginLeft: 2,
    fontWeight: '600',
  },
  body: {
    padding: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    marginLeft: 2,
    flexShrink: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  price: {
    fontWeight: '600',
  },
});
