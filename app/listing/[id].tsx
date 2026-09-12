import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCarousel } from '@/components/listings/ImageCarousel';
import { ListingHeader } from '@/components/listings/ListingHeader';
import { LocationCard } from '@/components/listings/LocationCard';
import { OpeningHours } from '@/components/listings/OpeningHours';
import { ContactButtons } from '@/components/listings/ContactButtons';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReportLink } from '@/components/listings/ReportLink';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { useListingDetail } from '@/hooks/useListingDetail';
import { colors, spacing } from '@/theme';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, reviews, hours, loading } = useListingDetail(id);

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
        <ImageCarousel images={listing.images} listingId={listing.id} />

        <ListingHeader listing={listing} />

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

        <View style={styles.section}>
          <SectionLabel label="Working Hours" />
          <OpeningHours hours={hours} />
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
  section: {
    marginTop: spacing.lg,
  },
  sectionLabel: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.sm,
  },
  description: {
    paddingHorizontal: spacing.screenPadding,
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
