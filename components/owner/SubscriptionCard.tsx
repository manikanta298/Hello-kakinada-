import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Subscription } from '@/types/owner';
import { colors, radius, spacing } from '@/theme';

interface SubscriptionCardProps {
  subscription: Subscription;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const usageRatio = subscription.listingsUsed / subscription.listingLimit;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.planBadge}>
          <Ionicons name="ribbon-outline" size={14} color={colors.accent} />
          <AppText preset="small" color={colors.accent} style={styles.planLabel}>
            {subscription.planLabel}
          </AppText>
        </View>
        <AppText preset="small" color={colors.textTertiary}>
          Renews {formatDate(subscription.renewsOn)}
        </AppText>
      </View>

      <View style={styles.usageRow}>
        <AppText preset="caption" color={colors.textSecondary}>
          {subscription.listingsUsed} of {subscription.listingLimit} listings used
        </AppText>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(usageRatio, 1) * 100}%` }]} />
      </View>

      <Pressable
        style={({ pressed }) => [styles.upgradeButton, pressed && styles.upgradePressed]}
        onPress={() => router.push('/owner/analytics')}
      >
        <AppText preset="bodyMedium" color={colors.accent}>
          Upgrade Plan
        </AppText>
        <Ionicons name="arrow-forward" size={16} color={colors.accent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.screenPadding,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  planLabel: {
    marginLeft: 4,
    fontWeight: '600',
  },
  usageRow: {
    marginTop: spacing.md,
  },
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  upgradePressed: {
    opacity: 0.6,
  },
});
