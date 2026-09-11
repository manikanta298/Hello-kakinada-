import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface OwnerHeaderProps {
  businessName: string;
  hasNotifications?: boolean;
  onPressNotifications?: () => void;
}

export function OwnerHeader({ businessName, hasNotifications, onPressNotifications }: OwnerHeaderProps) {
  return (
    <View style={styles.row}>
      <View>
        <AppText preset="caption" color={colors.textSecondary}>
          Welcome back,
        </AppText>
        <AppText preset="h2" style={styles.name}>
          {businessName}
        </AppText>
      </View>

      <Pressable style={styles.bell} onPress={onPressNotifications} hitSlop={8}>
        <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        {hasNotifications && <View style={styles.dot} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
  },
  name: {
    marginTop: 2,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
