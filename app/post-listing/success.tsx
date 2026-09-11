import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { usePostListingStore } from '@/store/postListingStore';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

export default function PostListingSuccessStep() {
  const reset = usePostListingStore((s) => s.reset);

  // Clear the wizard form once the listing has been "submitted"
  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={40} color={colors.white} />
        </View>

        <AppText preset="h2" align="center" style={styles.title}>
          Listing Submitted!
        </AppText>
        <AppText preset="body" color={colors.textSecondary} align="center" style={styles.subtitle}>
          Your listing is under review and will go live within 24 hours. We'll notify you once it's
          approved.
        </AppText>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}
          onPress={() => router.replace('/owner/listings')}
        >
          <AppText preset="button" color={colors.white}>
            View My Listings
          </AppText>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.replace('/(tabs)')}>
          <AppText preset="bodyMedium" color={colors.textPrimary}>
            Back to Home
          </AppText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPadding,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: radius.circle,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  title: {
    marginTop: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.sm,
    lineHeight: 22,
    paddingHorizontal: spacing.lg,
  },
  footer: {
    paddingBottom: spacing.md,
  },
  primaryButton: {
    height: dimensions.buttonHeight,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  secondaryButton: {
    height: dimensions.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
});
