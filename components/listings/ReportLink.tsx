import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

export function ReportLink({ listingId }: { listingId: string }) {
  return (
    <Pressable style={styles.row} onPress={() => router.push(`/listing/report?id=${listingId}`)}>
      <Ionicons name="flag-outline" size={16} color={colors.textTertiary} />
      <AppText preset="small" color={colors.textTertiary} style={styles.label}>
        Report this listing
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },
  label: {
    marginLeft: spacing.xs,
  },
});
