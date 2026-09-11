import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FormProgress } from '@/components/forms/FormProgress';
import { FormField } from '@/components/forms/FormField';
import { WizardFooter } from '@/components/forms/WizardFooter';
import { AppText } from '@/components/common/AppText';
import { usePostListingStore } from '@/store/postListingStore';
import { colors, radius, spacing } from '@/theme';

export default function PostListingLocationStep() {
  const { address, phone, whatsapp, setLocation } = usePostListingStore();
  const canContinue = address.trim().length > 5 && phone.trim().length >= 10;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FormProgress step={3} total={5} title="Where can customers find you?" />

      <ScrollView contentContainerStyle={{ padding: spacing.screenPadding }} keyboardShouldPersistTaps="handled">
        <FormField
          label="Address"
          placeholder="e.g. Beach Road, Kakinada"
          value={address}
          onChangeText={(text) => setLocation({ address: text })}
        />
        <FormField
          label="Phone number"
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setLocation({ phone: text })}
          maxLength={10}
        />

        <Pressable
          style={[styles.toggleRow]}
          onPress={() => setLocation({ whatsapp: !whatsapp })}
        >
          <View style={styles.toggleLeft}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.textPrimary} />
            <AppText preset="body" style={{ marginLeft: spacing.sm }}>
              Show WhatsApp contact button
            </AppText>
          </View>
          <Ionicons
            name={whatsapp ? 'checkbox' : 'square-outline'}
            size={22}
            color={whatsapp ? colors.accent : colors.textTertiary}
          />
        </Pressable>
      </ScrollView>

      <View style={{ marginTop: 'auto' }}>
        <WizardFooter disabled={!canContinue} onPress={() => router.push('/post-listing/photos')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  toggleRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  toggleLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
};
