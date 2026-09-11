import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Rating } from '@/components/listings/Rating';
import { FavoriteButton } from '@/components/listings/FavoriteButton';
import { Listing } from '@/types/listing';
import { colors, radius, spacing } from '@/theme';

interface SearchResultCardProps {
  listing: Listing;
}

export function SearchResultCard({ listing }: SearchResultCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => router.push(`/listing/${listing.id}`)}
    >
      <Image source={{ uri: listing.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText preset="bodyMedium" numberOfLines={1} style={styles.title}>
            {listing.title}
          </AppText>
          {listing.verified && (
            <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
          )}
        </View>

        <AppText preset="small" color={colors.textTertiary} numberOfLines={1} style={styles.category}>
          {listing.categoryName}
        </AppText>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={colors.textTertiary} />
          <AppText preset="small" color={colors.textTertiary} numberOfLines={1} style={styles.location}>
            {listing.location}
            {typeof listing.distance === 'number' ? ` · ${listing.distance.toFixed(1)} km` : ''}
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

      <FavoriteButton />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: radius.md,
    backgroundColor: colors.skeleton,
  },
  body: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    flexShrink: 1,
  },
  category: {
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  location: {
    marginLeft: 3,
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
