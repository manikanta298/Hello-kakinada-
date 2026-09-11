import React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { FormProgress } from '@/components/forms/FormProgress';
import { CategorySelector } from '@/components/forms/CategorySelector';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { usePostListingStore } from '@/store/postListingStore';
import { mockCategories } from '@/data/mockCategories';
import { colors, spacing } from '@/theme';

export default function PostListingCategoryStep() {
  const { categoryId, setCategory } = usePostListingStore();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormProgress step={1} total={5} title="What are you listing?" />

      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }}>
        <CategorySelector categories={mockCategories} selectedId={categoryId} onSelect={setCategory} />
      </ScrollView>

      <WizardFooter
        disabled={!categoryId}
        onPress={() => router.push('/post-listing/details')}
      />
    </View>
  );
}
