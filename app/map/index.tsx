import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { ListingsMapView } from '@/components/map/ListingsMapView';
import { listingService } from '@/services';
import { useAsync } from '@/hooks/useAsync';
import { colors, radius, spacing } from '@/theme';

export default function MapScreen() {
  const { data: listings, loading } = useAsync(() => listingService.getAll(), []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {loading || !listings ? (
        <LoadingState />
      ) : (
        <ListingsMapView listings={listings} />
      )}

      <SafeAreaView edges={['top']} style={styles.headerOverlay} pointerEvents="box-none">
        <Pressable style={styles.iconButton} onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.titlePill}>
          <AppText preset="bodyMedium">
            {loading || !listings ? 'Loading…' : `${listings.length} listings nearby`}
          </AppText>
        </View>

        <Pressable style={styles.iconButton} onPress={() => router.push('/search')} hitSlop={8}>
          <Ionicons name="search" size={18} color={colors.textPrimary} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePill: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
});
