import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { OwnerHeader } from '@/components/owner/OwnerHeader';
import { OwnerStats } from '@/components/owner/OwnerStats';
import { SubscriptionCard } from '@/components/owner/SubscriptionCard';
import { OwnerListingCard } from '@/components/owner/OwnerListingCard';
import { LeadCard } from '@/components/owner/LeadCard';
import { ownerService } from '@/services';
import { OwnerListing, Subscription } from '@/types/owner';
import { Lead } from '@/types/lead';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

export default function OwnerDashboardScreen() {
  const [listings, setListings] = useState<OwnerListing[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([ownerService.getListings(), ownerService.getLeads(), ownerService.getSubscription()]).then(
      ([ownerListings, leads, sub]) => {
        if (cancelled) return;
        setListings(ownerListings);
        setAllLeads(leads);
        setSubscription(sub);
        setLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const leads = useMemo(() => allLeads.slice(0, 3), [allLeads]);

  const stats = useMemo(() => {
    const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
    const newLeads = allLeads.filter((l) => l.isNew).length;
    const activeListings = listings.filter((l) => l.status === 'active').length;
    return { totalViews, newLeads, activeListings };
  }, [listings, allLeads]);

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    ownerService.deleteListing(id);
  };

  if (loading || !subscription) {
    return (
      <Screen edges={['top']}>
        <StatusBar style="dark" />
        <LoadingState />
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <OwnerHeader businessName="Sea Pearl Restaurant" hasNotifications />

        <View style={styles.section}>
          <OwnerStats
            totalViews={stats.totalViews}
            totalLeads={stats.newLeads}
            activeListings={stats.activeListings}
          />
        </View>

        <View style={styles.section}>
          <SubscriptionCard subscription={subscription} />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Your Listings"
            actionLabel="Manage"
            onPress={() => router.push('/owner/listings')}
          />
          {listings.map((listing) => (
            <OwnerListingCard key={listing.id} listing={listing} onDelete={handleDelete} />
          ))}

          <Pressable style={styles.addListingButton} onPress={() => router.push('/post-listing')}>
            <Ionicons name="add-circle-outline" size={18} color={colors.accent} />
            <AppText preset="bodyMedium" color={colors.accent} style={styles.addLabel}>
              Add New Listing
            </AppText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Recent Enquiries"
            actionLabel="View all"
            onPress={() => router.push('/owner/leads')}
          />
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

function SectionHeader({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <AppText preset="h3">{title}</AppText>
      <Pressable onPress={onPress} hitSlop={8}>
        <AppText preset="bodyMedium" color={colors.accent}>
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.xs,
  },
  addListingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.buttonHeight - 4,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    backgroundColor: colors.accentLight,
  },
  addLabel: {
    marginLeft: spacing.xs,
  },
});
