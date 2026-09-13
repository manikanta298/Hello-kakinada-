import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { OwnerStats } from '@/components/owner/OwnerStats';
import { ownerService } from '@/services';
import { OwnerListing, Subscription } from '@/types/owner';
import { Lead } from '@/types/lead';
import { colors, radius, shadows, spacing } from '@/theme';

const PLANS = [
  { id: 'free', label: 'Free', price: '₹0', listings: 1, features: ['1 active listing', 'Basic visibility'] },
  {
    id: 'basic',
    label: 'Basic',
    price: '₹299/mo',
    listings: 5,
    features: ['5 active listings', 'Priority in category', 'WhatsApp leads'],
  },
  {
    id: 'premium',
    label: 'Premium',
    price: '₹799/mo',
    listings: 20,
    features: ['20 active listings', 'Top placement', 'Advanced analytics', 'Dedicated support'],
  },
];

export default function OwnerAnalyticsScreen() {
  const [ownerListings, setOwnerListings] = useState<OwnerListing[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([ownerService.getListings(), ownerService.getLeads(), ownerService.getSubscription()]).then(
      ([listings, allLeads, sub]) => {
        if (cancelled) return;
        setOwnerListings(listings);
        setLeads(allLeads);
        setSubscription(sub);
        setLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !subscription) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <LoadingState />
      </View>
    );
  }

  const totalViews = ownerListings.reduce((sum, l) => sum + l.views, 0);
  const totalLeads = leads.length;
  const activeListings = ownerListings.filter((l) => l.status === 'active').length;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Performance & Plan</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <AppText preset="bodyMedium" style={styles.sectionLabel}>
          This month
        </AppText>
        <OwnerStats totalViews={totalViews} totalLeads={totalLeads} activeListings={activeListings} />

        <AppText preset="bodyMedium" style={[styles.sectionLabel, { marginTop: spacing.xl }]}>
          Choose a plan
        </AppText>

        {PLANS.map((plan) => {
          const active = plan.id === subscription.plan;
          return (
            <View key={plan.id} style={[styles.planCard, active && styles.planCardActive]}>
              <View style={styles.planHeader}>
                <View>
                  <AppText preset="bodyMedium">{plan.label}</AppText>
                  <AppText preset="h3" color={active ? colors.accent : colors.textPrimary}>
                    {plan.price}
                  </AppText>
                </View>
                {active && (
                  <View style={styles.currentPill}>
                    <AppText preset="small" color={colors.accent} style={styles.currentLabel}>
                      Current Plan
                    </AppText>
                  </View>
                )}
              </View>

              {plan.features.map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={14} color={colors.accent} />
                  <AppText preset="caption" color={colors.textSecondary} style={styles.featureLabel}>
                    {feature}
                  </AppText>
                </View>
              ))}

              {!active && (
                <Pressable
                  style={styles.selectButton}
                  onPress={() =>
                    Alert.alert('Switch plan', `You're about to switch to the ${plan.label} plan.`, [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Confirm',
                        onPress: () => Alert.alert('Plan updated', `You're now on the ${plan.label} plan.`),
                      },
                    ])
                  }
                >
                  <AppText preset="bodyMedium" color={colors.white}>
                    Switch to {plan.label}
                  </AppText>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>
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
    paddingBottom: spacing.xxl,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  planCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  planCardActive: {
    borderColor: colors.accent,
    ...shadows.card,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  currentPill: {
    backgroundColor: colors.accentLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  currentLabel: {
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  featureLabel: {
    marginLeft: spacing.xs,
  },
  selectButton: {
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
});
