import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { LeadCard } from '@/components/owner/LeadCard';
import { ownerService } from '@/services';
import { Lead } from '@/types/lead';
import { colors, radius, spacing } from '@/theme';

export default function OwnerLeadsScreen() {
  const [filter, setFilter] = useState<'all' | 'new'>('all');
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    ownerService.getLeads().then((leads) => {
      if (cancelled) return;
      setAllLeads(leads);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const leads = useMemo(
    () => (filter === 'new' ? allLeads.filter((l) => l.isNew) : allLeads),
    [filter, allLeads]
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Enquiries</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <View style={styles.tabRow}>
        <Tab label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        <Tab label="New" active={filter === 'new'} onPress={() => setFilter('new')} />
      </View>

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LeadCard lead={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="chatbubbles-outline" size={36} color={colors.textTertiary} />
              <AppText preset="bodyMedium" style={styles.emptyTitle}>
                No enquiries here
              </AppText>
            </View>
          }
        />
      )}
    </View>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.tab, active && styles.tabActive]} onPress={onPress}>
      <AppText preset="bodyMedium" color={active ? colors.accent : colors.textSecondary}>
        {label}
      </AppText>
    </Pressable>
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.screenPadding + 34 + spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  emptyTitle: {
    marginTop: spacing.md,
  },
});
