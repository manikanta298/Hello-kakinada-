import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface RatingSummaryProps {
  average: number;
  count: number;
}

export function RatingSummary({ average, count }: RatingSummaryProps) {
  return (
    <View style={styles.row}>
      <AppText preset="h1">{average.toFixed(1)}</AppText>
      <View style={styles.right}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Ionicons
              key={i}
              name={i <= Math.round(average) ? 'star' : 'star-outline'}
              size={16}
              color={colors.star}
              style={styles.star}
            />
          ))}
        </View>
        <AppText preset="small" color={colors.textTertiary}>
          Based on {count} reviews
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  right: {
    marginLeft: spacing.md,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 1,
  },
});
