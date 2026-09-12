import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCarousel } from '@/components/listings/ImageCarousel';
import { LocationCard } from '@/components/listings/LocationCard';
import { ReportLink } from '@/components/listings/ReportLink';
import { ContactButtons } from '@/components/listings/ContactButtons';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { usePropertyDetail } from '@/hooks/usePropertyDetail';
import { colors, radius, spacing } from '@/theme';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, property, loading } = usePropertyDetail(id);

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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ImageCarousel images={listing.images} />

        <View style={styles.section}>
          <AppText preset="caption" color={colors.accent} style={styles.category}>
            REAL ESTATE {property ? `· FOR ${property.intent.toUpperCase()}` : ''}
          </AppText>
          <AppText preset="h1" style={styles.title}>
            {listing.title}
          </AppText>
          <AppText preset="h3" color={colors.accent} style={styles.price}>
            {listing.price}
          </AppText>
        </View>

        {property && (
          <View style={styles.statsRow}>
            <Stat icon="bed-outline" label={`${property.bedrooms} Beds`} />
            <Stat icon="water-outline" label={`${property.bathrooms} Baths`} />
            <Stat icon="resize-outline" label={`${property.areaSqft} sqft`} />
          </View>
        )}

        {property && (
          <View style={styles.badgeRow}>
            <Badge label={property.propertyType} />
            <Badge label={property.furnishing} />
          </View>
        )}

        <View style={styles.section}>
          <SectionLabel label="Description" />
          <AppText preset="body" color={colors.textSecondary} style={styles.description}>
            {listing.description}
          </AppText>
        </View>

        {property && property.amenities.length > 0 && (
          <View style={styles.section}>
            <SectionLabel label="Amenities" />
            <View style={styles.chipRow}>
              {property.amenities.map((amenity) => (
                <View key={amenity} style={styles.chip}>
                  <Ionicons name="checkmark" size={12} color={colors.success} />
                  <AppText preset="small" color={colors.textPrimary} style={styles.chipLabel}>
                    {amenity}
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

function Stat({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color={colors.textPrimary} />
      <AppText preset="small" color={colors.textSecondary} style={styles.statLabel}>
        {label}
      </AppText>
    </View>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <AppText preset="small">{label}</AppText>
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
    paddingHorizontal: spacing.screenPadding,
  },
  category: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    marginTop: spacing.xs,
  },
  price: {
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: spacing.xxs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.md,
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chipLabel: {
    marginLeft: spacing.xxs,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
