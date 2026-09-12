import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FormProgress } from '@/components/forms/FormProgress';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { AppText } from '@/components/common/AppText';
import { usePostListingStore } from '@/store/postListingStore';
import { categoryService } from '@/services';
import { Category } from '@/types/category';
import { colors, radius, spacing } from '@/theme';

export default function PostListingPreviewStep() {
  const { categoryId, title, description, price, address, phone, whatsapp, photos, reset } =
    usePostListingStore();
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    if (!categoryId) return;
    categoryService.getById(categoryId).then((result) => {
      if (!cancelled) setCategory(result);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const handleSubmit = () => {
    router.push('/post-listing/success');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormProgress step={5} total={5} title="Preview your listing" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coverWrap}>
          {photos[0] ? (
            <Image source={{ uri: photos[0] }} style={styles.cover} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="image-outline" size={32} color={colors.textTertiary} />
            </View>
          )}
        </View>

        <View style={styles.card}>
          {category && (
            <AppText preset="caption" color={colors.accent} style={styles.category}>
              {category.name.toUpperCase()}
            </AppText>
          )}
          <AppText preset="h2" style={styles.title}>
            {title || 'Untitled listing'}
          </AppText>
          {!!price && (
            <AppText preset="bodyMedium" color={colors.accent} style={styles.price}>
              {price}
            </AppText>
          )}

          <AppText preset="body" color={colors.textSecondary} style={styles.description}>
            {description || 'No description provided.'}
          </AppText>

          <View style={styles.divider} />

          <Row icon="location-outline" label={address || 'No address provided'} />
          <Row icon="call-outline" label={phone || 'No phone provided'} />
          {whatsapp && <Row icon="logo-whatsapp" label="WhatsApp contact enabled" />}
        </View>
      </ScrollView>

      <WizardFooter label="Publish Listing" onPress={handleSubmit} />
    </View>
  );
}

function Row({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={16} color={colors.textSecondary} />
      <AppText preset="caption" color={colors.textSecondary} style={styles.rowLabel}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  coverWrap: {
    height: 180,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.skeleton,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
  },
  card: {
    marginTop: spacing.lg,
  },
  category: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    marginTop: spacing.xs,
  },
  price: {
    marginTop: spacing.xxs,
    fontWeight: '600',
  },
  description: {
    marginTop: spacing.md,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rowLabel: {
    marginLeft: spacing.sm,
  },
});
