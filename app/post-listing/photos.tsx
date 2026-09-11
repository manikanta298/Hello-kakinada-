import React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { FormProgress } from '@/components/forms/FormProgress';
import { ImagePickerGrid } from '@/components/forms/ImagePickerGrid';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { AppText } from '@/components/common/AppText';
import { usePostListingStore } from '@/store/postListingStore';
import { colors, spacing } from '@/theme';

export default function PostListingPhotosStep() {
  const { photos, addPhoto, removePhoto } = usePostListingStore();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormProgress step={4} total={5} title="Add some photos" />

      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }}>
        <AppText preset="caption" color={colors.textSecondary} style={{ marginBottom: spacing.md }}>
          Listings with photos get up to 3x more views. The first photo becomes your cover image.
        </AppText>
        <ImagePickerGrid photos={photos} onAdd={addPhoto} onRemove={removePhoto} />
      </ScrollView>

      <WizardFooter
        label={photos.length > 0 ? 'Continue' : 'Skip for now'}
        onPress={() => router.push('/post-listing/preview')}
      />
    </View>
  );
}
