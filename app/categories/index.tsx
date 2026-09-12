import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { categoryService } from '@/services';
import { Category } from '@/types/category';
import { colors, radius, spacing } from '@/theme';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    categoryService.getAll().then((result) => {
      if (cancelled) return;
      setCategories(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">All Categories</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              onPress={() => router.push(`/categories/${item.slug}`)}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon as any} size={20} color={colors.accent} />
              </View>
              <View style={styles.rowBody}>
                <AppText preset="bodyMedium">{item.name}</AppText>
                {typeof item.listingCount === 'number' && (
                  <AppText preset="caption" color={colors.textTertiary}>
                    {item.listingCount} listing{item.listingCount !== 1 ? 's' : ''}
                  </AppText>
                )}
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </Pressable>
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  rowPressed: {
    backgroundColor: colors.backgroundAlt,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding + 44 + spacing.sm,
  },
});
