import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { ContactButtons } from '@/components/listings/ContactButtons';
import { LocationCard } from '@/components/listings/LocationCard';
import { ReportLink } from '@/components/listings/ReportLink';
import { useJobDetail } from '@/hooks/useJobDetail';
import { colors, radius, spacing } from '@/theme';

function postedAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  return `Posted ${days} days ago`;
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, job, loading } = useJobDetail(id);

  if (loading || !listing) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <LoadingState />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3" numberOfLines={1} style={styles.headerTitle}>
          Job Details
        </AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <AppText preset="caption" color={colors.accent} style={styles.category}>
            JOBS
          </AppText>
          <AppText preset="h1" style={styles.title}>
            {listing.title}
          </AppText>
          {job?.company && (
            <View style={styles.companyRow}>
              <Ionicons name="business-outline" size={16} color={colors.textSecondary} />
              <AppText preset="bodyMedium" color={colors.textSecondary} style={styles.companyName}>
                {job.company}
              </AppText>
            </View>
          )}
          {job?.postedAt && (
            <AppText preset="small" color={colors.textTertiary} style={styles.postedAt}>
              {postedAgo(job.postedAt)}
            </AppText>
          )}
        </View>

        <View style={styles.salaryCard}>
          <Ionicons name="cash-outline" size={20} color={colors.accent} />
          <View style={styles.salaryTextWrap}>
            <AppText preset="small" color={colors.textSecondary}>
              Monthly salary
            </AppText>
            <AppText preset="h3" color={colors.accent}>
              {job ? `₹${job.salaryMin.toLocaleString()} – ₹${job.salaryMax.toLocaleString()}` : listing.price}
            </AppText>
          </View>
        </View>

        {job && (
          <View style={styles.badgeRow}>
            <Badge icon="briefcase-outline" label={job.jobType} />
            <Badge icon="school-outline" label={job.experience} />
          </View>
        )}

        <View style={styles.section}>
          <SectionLabel label="Job Description" />
          <AppText preset="body" color={colors.textSecondary} style={styles.description}>
            {listing.description}
          </AppText>
        </View>

        {job && job.skills.length > 0 && (
          <View style={styles.section}>
            <SectionLabel label="Skills Required" />
            <View style={styles.chipRow}>
              {job.skills.map((skill) => (
                <View key={skill} style={styles.chip}>
                  <AppText preset="small" color={colors.textPrimary}>
                    {skill}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <SectionLabel label="Location" />
          <LocationCard address={listing.location} distance={listing.distance} />
        </View>
      
        <ReportLink listingId={listing.id} />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <ContactButtons listing={listing} />
      </SafeAreaView>
    </View>
  );
}

function Badge({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.badge}>
      <Ionicons name={icon} size={14} color={colors.textPrimary} />
      <AppText preset="small" style={styles.badgeLabel}>
        {label}
      </AppText>
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <AppText preset="h3" style={styles.sectionLabel}>
      {label}
    </AppText>
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.screenPadding,
  },
  category: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    marginTop: spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  companyName: {
    marginLeft: spacing.xs,
  },
  postedAt: {
    marginTop: spacing.xxs,
  },
  salaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  salaryTextWrap: {
    marginLeft: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeLabel: {
    marginLeft: spacing.xs,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  description: {
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
