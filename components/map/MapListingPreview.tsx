import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Rating } from '@/components/listings/Rating';
import { Listing } from '@/types/listing';
import { colors, radius, shadows, spacing } from '@/theme';

interface MapListingPreviewProps {
  listing: Listing;
  onClose: () => void;
}

export function MapListingPreview({ listing, onClose }: MapListingPreviewProps) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
        <Ionicons name="close" size={14} color={colors.textSecondary} />
      </Pressable>

      <Pressable style={styles.body} onPress={() => router.push(`/listing/${listing.id}`)}>
        <Image source={{ uri: listing.image }} style={styles.image} />
        <View style={styles.info}>
          <AppText preset="bodyMedium" numberOfLines={1}>
            {listing.title}
          </AppText>
          <AppText preset="small" color={colors.textTertiary} numberOfLines={1}>
            {listing.location}
          </AppText>
          <Rating value={listing.rating} reviewCount={listing.reviewCount} />
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push(`/modal/contact?id=${listing.id}`)}
        >
          <Ionicons name="call-outline" size={16} color={colors.accent} />
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.actionPrimary]}
          onPress={() => router.push(`/modal/directions?id=${listing.id}`)}
        >
          <Ionicons name="navigate" size={16} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.sm,
    ...shadows.modal,
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: radius.circle,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.skeleton,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  actions: {
    marginLeft: spacing.sm,
    gap: spacing.xs,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: radius.circle,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPrimary: {
    backgroundColor: colors.accent,
  },
});
