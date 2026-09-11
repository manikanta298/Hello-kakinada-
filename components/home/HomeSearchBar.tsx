import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, shadows, spacing, dimensions } from '@/theme';

export function HomeSearchBar() {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [styles.bar, pressed && styles.barPressed]}
        onPress={() => router.push('/search')}
      >
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <AppText preset="body" color={colors.textTertiary} style={styles.placeholder}>
          Search restaurants, hotels, services...
        </AppText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.filterButton, pressed && styles.filterPressed]}
        onPress={() => router.push('/search/filters')}
      >
        <Ionicons name="options-outline" size={20} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensions.inputHeight + 4,
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  barPressed: {
    backgroundColor: colors.border,
  },
  placeholder: {
    marginLeft: spacing.sm,
  },
  filterButton: {
    width: dimensions.inputHeight + 4,
    height: dimensions.inputHeight + 4,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  filterPressed: {
    backgroundColor: colors.accentPressed,
  },
});
