import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface LocationCardProps {
  address: string;
  distance?: number;
}

export function LocationCard({ address, distance }: LocationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="location" size={18} color={colors.accent} />
      </View>
      <View style={styles.textWrap}>
        <AppText preset="bodyMedium">{address}</AppText>
        {typeof distance === 'number' && (
          <AppText preset="small" color={colors.textTertiary} style={styles.distance}>
            {distance.toFixed(1)} km away
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.screenPadding,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  distance: {
    marginTop: 2,
  },
});
