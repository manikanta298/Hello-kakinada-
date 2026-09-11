import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, shadows, spacing } from '@/theme';

interface Stat {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface OwnerStatsProps {
  totalViews: number;
  totalLeads: number;
  activeListings: number;
}

export function OwnerStats({ totalViews, totalLeads, activeListings }: OwnerStatsProps) {
  const stats: Stat[] = [
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: 'eye-outline' },
    { label: 'New Leads', value: totalLeads.toString(), icon: 'chatbubble-outline' },
    { label: 'Active Listings', value: activeListings.toString(), icon: 'list-outline' },
  ];

  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.card}>
          <Ionicons name={stat.icon} size={16} color={colors.accent} />
          <AppText preset="h2" color={colors.accent} style={styles.value}>
            {stat.value}
          </AppText>
          <AppText preset="small" color={colors.textSecondary}>
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.card,
  },
  value: {
    marginTop: spacing.xs,
  },
});
