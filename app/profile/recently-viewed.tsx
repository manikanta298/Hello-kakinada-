import React from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { ListingCard } from '@/components/listings/ListingCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { colors, spacing } from '@/theme';

const CARD_WIDTH = (Dimensions.get('window').width - spacing.screenPadding * 2 - spacing.sm) / 2;

export default function RecentlyViewedScreen() {
  const { listings, loading, clear } = useRecentlyViewed();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Recently Viewed</AppText>
        <Pressable onPress={clear} hitSlop={8} disabled={listings.length === 0}>
          <AppText
            preset="small"
            color={listings.length === 0 ? colors.textDisabled : colors.accent}
            style={styles.clearLabel}
          >
            Clear
          </AppText>
        </Pressable>
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : listings.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={40} color={colors.textTertiary} />
          <AppText preset="body" color={colors.textSecondary} style={styles.emptyText}>
            Listings you view will show up here.
          </AppText>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <ListingCard listing={item} width={CARD_WIDTH} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  clearLabel: {
    fontWeight: '600',
  },
  list: {
    padding: spacing.screenPadding,
  },
  row: {
    gap: spacing.sm,
  },
  cardWrap: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
