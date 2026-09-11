import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Listing } from '@/types/listing';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

interface ContactButtonsProps {
  listing: Listing;
}

export function ContactButtons({ listing }: ContactButtonsProps) {
  const handleCall = () => {
    if (listing.phone) Linking.openURL(`tel:${listing.phone}`);
  };

  const handleDirections = () => {
    const query = encodeURIComponent(listing.location);
    Linking.openURL(`https://maps.google.com/?q=${query}`);
  };

  const handleWhatsApp = () => {
    if (listing.phone) Linking.openURL(`https://wa.me/${listing.phone.replace(/\D/g, '')}`);
  };

  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}
        onPress={handleCall}
      >
        <Ionicons name="call" size={18} color={colors.white} />
        <AppText preset="button" color={colors.white} style={styles.primaryLabel}>
          Call
        </AppText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}
        onPress={handleDirections}
      >
        <Ionicons name="navigate" size={18} color={colors.white} />
        <AppText preset="button" color={colors.white} style={styles.primaryLabel}>
          Directions
        </AppText>
      </Pressable>

      {listing.whatsapp && (
        <Pressable
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconPressed]}
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={20} color={colors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.buttonHeight,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    ...shadows.raised,
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  primaryLabel: {
    marginLeft: spacing.xs,
  },
  iconButton: {
    width: dimensions.buttonHeight,
    height: dimensions.buttonHeight,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPressed: {
    backgroundColor: colors.backgroundAlt,
  },
});
