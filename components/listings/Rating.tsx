import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: number;
}

export function Rating({ value, reviewCount, size = 13 }: RatingProps) {
  if (!value) return null;

  return (
    <View style={styles.row}>
      <Ionicons name="star" size={size} color={colors.star} />
      <AppText preset="small" style={styles.value}>
        {value.toFixed(1)}
      </AppText>
      {typeof reviewCount === 'number' && (
        <AppText preset="small" color={colors.textTertiary}>
          {' '}
          ({reviewCount})
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginLeft: spacing.xxs,
    fontWeight: '600',
  },
});
