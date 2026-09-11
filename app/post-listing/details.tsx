import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { FormProgress } from '@/components/forms/FormProgress';
import { FormField } from '@/components/forms/FormField';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { usePostListingStore } from '@/store/postListingStore';
import { colors, spacing } from '@/theme';

export default function PostListingDetailsStep() {
  const { title, description, price, setDetails } = usePostListingStore();
  const canContinue = title.trim().length > 2 && description.trim().length > 9;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FormProgress step={2} total={5} title="Tell us more" />

      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }} keyboardShouldPersistTaps="handled">
        <FormField
          label="Title"
          placeholder="e.g. Sea Pearl Restaurant"
          value={title}
          onChangeText={(text) => setDetails({ title: text })}
          maxLength={70}
        />
        <FormField
          label="Description"
          placeholder="Describe what makes this listing worth checking out..."
          value={description}
          onChangeText={(text) => setDetails({ description: text })}
          multiline
          maxLength={600}
        />
        <FormField
          label="Price"
          optional
          placeholder="e.g. ₹₹ or ₹12,000/mo"
          value={price}
          onChangeText={(text) => setDetails({ price: text })}
        />
      </ScrollView>

      <View style={{ marginTop: 'auto' }}>
        <WizardFooter disabled={!canContinue} onPress={() => router.push('/post-listing/location')} />
      </View>
    </KeyboardAvoidingView>
  );
}
