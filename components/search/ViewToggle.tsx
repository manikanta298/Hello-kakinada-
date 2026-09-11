import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface ViewToggleProps {
  value: 'list' | 'map';
  onChange: (value: 'list' | 'map') => void;
  resultCount: number;
}

export function ViewToggle({ value, onChange, resultCount }: ViewToggleProps) {
  return (
    <View style={styles.row}>
      <AppText preset="caption" color={colors.textSecondary}>
        {resultCount} result{resultCount !== 1 ? 's' : ''}
      </AppText>

      <View style={styles.toggle}>
        <Pressable
          style={[styles.segment, value === 'list' && styles.segmentActive]}
          onPress={() => onChange('list')}
        >
          <Ionicons
            name="list"
            size={15}
            color={value === 'list' ? colors.accent : colors.textSecondary}
          />
        </Pressable>
        <Pressable
          style={[styles.segment, value === 'map' && styles.segmentActive]}
          onPress={() => onChange('map')}
        >
          <Ionicons
            name="map-outline"
            size={15}
            color={value === 'map' ? colors.accent : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.sm,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.sm,
    padding: 2,
  },
  segment: {
    width: 30,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm - 2,
  },
  segmentActive: {
    backgroundColor: colors.white,
  },
});
