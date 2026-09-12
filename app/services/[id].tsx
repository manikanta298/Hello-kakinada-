import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCarousel } from '@/components/listings/ImageCarousel';
import { ListingHeader } from '@/components/listings/ListingHeader';
import { LocationCard } from '@/components/listings/LocationCard';
import { ContactButtons } from '@/components/listings/ContactButtons';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReportLink } from '@/components/listings/ReportLink';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { useServiceDetail } from '@/hooks/useServiceDetail';
import { colors, radius, spacing } from '@/theme';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, service, reviews, loading } = useServiceDetail(id);

  if (loading || !listing) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <LoadingState />
      </View>
    );
  }

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : listing.rating;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ImageCarousel images={listing.images} />

        <ListingHeader listing={listing} />

        {service && (
          <View style={styles.infoCard}>
            <InfoRow icon="pricetag-outline" label="Pricing" value={service.pricingModel} />
            {service.startingPrice && (
              <InfoRow icon="cash-outline" label="Starting at" value={service.startingPrice} />
            )}
            <InfoRow icon="time-outline" label="Availability" value={service.availability} />
            <InfoRow icon="map-outline" label="Service area" value={service.serviceArea} last />
          </View>
        )}

        <View style={styles.section}>
          <SectionLabel label="Description" />
          <AppText preset="body" color={colors.textSecondary} style={styles.description}>
            {listing.description}
          </AppText>
        </View>

        <View style={styles.section}>
          <SectionLabel label="Address" />
          <LocationCard address={listing.location} distance={listing.distance} />
        </View>

        <View style={[styles.section, styles.reviewSection]}>
          <ReviewList listingId={listing.id} reviews={reviews} average={average} />
        </View>
      
        <ReportLink listingId={listing.id} />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <ContactButtons listing={listing} />
      </SafeAreaView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <Ionicons name={icon} size={18} color={colors.accent} />
      <AppText preset="small" color={colors.textTertiary} style={styles.infoLabel}>
        {label}
      </AppText>
      <AppText preset="bodyMedium" style={styles.infoValue} numberOfLines={1}>
        {value}
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
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    marginLeft: spacing.sm,
    width: 90,
  },
  infoValue: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.screenPadding,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  description: {
    lineHeight: 22,
  },
  reviewSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
