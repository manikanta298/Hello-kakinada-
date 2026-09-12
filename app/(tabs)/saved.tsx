import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { useFavorites } from '@/hooks/useFavorites';
import { colors, spacing } from '@/theme';

export default function SavedScreen() {
  const { savedListings, loading } = useFavorites();

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <AppText preset="h2">Saved</AppText>
        <AppText preset="caption" color={colors.textSecondary}>
          {savedListings.length} listing{savedListings.length !== 1 ? 's' : ''}
        </AppText>
      </View>

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={savedListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultCard listing={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="heart-outline" size={40} color={colors.textTertiary} />
              <AppText preset="bodyMedium" style={styles.emptyTitle}>
                No saved listings yet
              </AppText>
              <AppText preset="caption" color={colors.textTertiary} align="center" style={styles.emptySubtitle}>
                Tap the heart icon on any listing to save it here.
              </AppText>
              <AppText
                preset="bodyMedium"
                color={colors.accent}
                style={styles.emptyAction}
                onPress={() => router.push('/(tabs)/explore')}
              >
                Browse listings
              </AppText>
            </View>
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding + 84 + spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    marginTop: spacing.md,
  },
  emptySubtitle: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  emptyAction: {
    marginTop: spacing.lg,
    fontWeight: '600',
  },
});
