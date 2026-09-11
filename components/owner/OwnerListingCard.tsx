import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { ListingStatus, OwnerListing } from '@/types/owner';
import { colors, radius, spacing } from '@/theme';

interface OwnerListingCardProps {
  listing: OwnerListing;
  onDelete?: (id: string) => void;
}

const STATUS_STYLE: Record<ListingStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: colors.success, bg: colors.successLight },
  pending: { label: 'Pending Review', color: colors.warning, bg: colors.warningLight },
  paused: { label: 'Paused', color: colors.textSecondary, bg: colors.backgroundAlt },
  rejected: { label: 'Rejected', color: colors.error, bg: colors.errorLight },
};

export function OwnerListingCard({ listing, onDelete }: OwnerListingCardProps) {
  const status = STATUS_STYLE[listing.status];

  const confirmDelete = () => {
    Alert.alert('Delete listing?', `"${listing.title}" will be removed permanently.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete?.(listing.id) },
    ]);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: listing.image }} style={styles.image} />

      <View style={styles.body}>
        <AppText preset="bodyMedium" numberOfLines={1}>
          {listing.title}
        </AppText>
        <AppText preset="small" color={colors.textTertiary}>
          {listing.categoryName}
        </AppText>

        <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
          <AppText preset="small" color={status.color} style={styles.statusLabel}>
            {status.label}
          </AppText>
        </View>

        {listing.status === 'active' && (
          <AppText preset="small" color={colors.textTertiary} style={styles.metrics}>
            {listing.views.toLocaleString()} views · {listing.leadCount} leads
          </AppText>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push(`/owner/listing/${listing.id}/edit` as any)}
          hitSlop={6}
        >
          <Ionicons name="create-outline" size={18} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.actionButton} onPress={confirmDelete} hitSlop={6}>
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.skeleton,
  },
  body: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },
  statusLabel: {
    fontWeight: '600',
  },
  metrics: {
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
