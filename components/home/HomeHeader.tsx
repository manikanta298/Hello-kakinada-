import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface HomeHeaderProps {
  location?: string;
  greeting?: string;
}

export function HomeHeader({ location = 'Kakinada, AP', greeting = 'Hello 👋' }: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <View>
        <AppText preset="caption" color={colors.textSecondary}>
          {greeting}
        </AppText>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={16} color={colors.accent} />
          <AppText preset="h3" style={styles.locationText}>
            {location}
          </AppText>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
      </View>

      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={20} color={colors.textPrimary} />
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
    paddingTop: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxs,
  },
  locationText: {
    marginHorizontal: spacing.xxs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
