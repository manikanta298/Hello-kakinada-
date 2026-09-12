import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { FormProgress } from '@/components/forms/FormProgress';
import { CategorySelector } from '@/components/forms/CategorySelector';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { LoadingState } from '@/components/common/LoadingState';
import { usePostListingStore } from '@/store/postListingStore';
import { categoryService } from '@/services';
import { Category } from '@/types/category';
import { colors, spacing } from '@/theme';

export default function PostListingCategoryStep() {
  const { categoryId, setCategory } = usePostListingStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    categoryService.getAll().then((result) => {
      if (cancelled) return;
      setCategories(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormProgress step={1} total={5} title="What are you listing?" />

      {loading ? (
        <LoadingState />
      ) : (
        <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }}>
          <CategorySelector categories={categories} selectedId={categoryId} onSelect={setCategory} />
        </ScrollView>
      )}

      <WizardFooter
        disabled={!categoryId}
        onPress={() => router.push('/post-listing/details')}
      />
    </View>
  );
}
