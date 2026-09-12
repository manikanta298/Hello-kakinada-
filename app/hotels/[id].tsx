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
import { useHotelDetail } from '@/hooks/useHotelDetail';
import { colors, radius, spacing } from '@/theme';

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, hotel, reviews, loading } = useHotelDetail(id);

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

        {hotel && (
          <View style={styles.checkRow}>
            <CheckInfo label="Check-in" value={hotel.checkIn} />
            <View style={styles.checkDivider} />
            <CheckInfo label="Check-out" value={hotel.checkOut} />
          </View>
        )}

        <View style={styles.section}>
          <SectionLabel label="Description" />
          <AppText preset="body" color={colors.textSecondary} style={styles.description}>
            {listing.description}
          </AppText>
        </View>

        {hotel && hotel.amenities.length > 0 && (
          <View style={styles.section}>
            <SectionLabel label="Amenities" />
            <View style={styles.chipRow}>
              {hotel.amenities.map((amenity) => (
                <View key={amenity} style={styles.chip}>
                  <AppText preset="small" color={colors.textPrimary}>
                    {amenity}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        )}

        {hotel && hotel.roomTypes.length > 0 && (
          <View style={styles.section}>
            <SectionLabel label="Room Types" />
            {hotel.roomTypes.map((room) => (
              <View key={room.name} style={styles.roomRow}>
                <Ionicons name="bed-outline" size={16} color={colors.textSecondary} />
                <AppText preset="body" style={styles.roomName}>
                  {room.name}
                </AppText>
                <AppText preset="bodyMedium" color={colors.accent}>
                  {room.price}
                </AppText>
              </View>
            ))}
          </View>
        )}

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

function CheckInfo({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.checkInfo}>
      <AppText preset="small" color={colors.textTertiary}>
        {label}
      </AppText>
      <AppText preset="bodyMedium">{value}</AppText>
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
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  checkInfo: {
    flex: 1,
    alignItems: 'center',
  },
  checkDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
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
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roomName: {
    flex: 1,
    marginLeft: spacing.sm,
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
