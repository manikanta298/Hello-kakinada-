import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { FormField } from '@/components/forms/FormField';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { ownerService } from '@/services';
import { ListingStatus, OwnerListing } from '@/types/owner';
import { colors, radius, spacing } from '@/theme';

const STATUS_OPTIONS: { value: ListingStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

export default function EditOwnerListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [listing, setListing] = useState<OwnerListing | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ListingStatus>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    ownerService.getListings().then((all) => {
      if (cancelled) return;
      const found = all.find((l) => l.id === id) ?? null;
      setListing(found);
      if (found) {
        setTitle(found.title);
        setStatus(found.status === 'rejected' || found.status === 'pending' ? 'active' : found.status);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSave = () => {
    Alert.alert('Changes saved', 'Your listing has been updated.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Edit Listing</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : !listing ? (
        <View style={styles.empty}>
          <Ionicons name="alert-circle-outline" size={36} color={colors.textTertiary} />
          <AppText preset="bodyMedium" style={styles.emptyTitle}>
            Listing not found
          </AppText>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <AppText preset="caption" color={colors.textTertiary} style={styles.category}>
              {listing.categoryName.toUpperCase()}
            </AppText>

            <FormField label="Title" value={title} onChangeText={setTitle} maxLength={70} />

            <AppText preset="bodyMedium" style={styles.statusLabel}>
              Status
            </AppText>
            <View style={styles.statusRow}>
              {STATUS_OPTIONS.map((option) => {
                const active = status === option.value;
                return (
                  <Pressable
                    key={option.value}
                    style={[styles.statusChip, active && styles.statusChipActive]}
                    onPress={() => setStatus(option.value)}
                  >
                    <AppText preset="bodyMedium" color={active ? colors.accent : colors.textSecondary}>
                      {option.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <WizardFooter label="Save Changes" onPress={handleSave} disabled={title.trim().length < 3} />
        </>
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
  content: {
    padding: spacing.screenPadding,
  },
  category: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  statusLabel: {
    marginBottom: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statusChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    marginTop: spacing.md,
  },
});
