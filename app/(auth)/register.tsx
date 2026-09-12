import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { useAuthStore } from '@/store/authStore';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const setPendingPhone = useAuthStore((s) => s.setPendingPhone);

  const canSubmit = name.trim().length > 1 && phone.trim().length >= 10 && password.length >= 4;

  const handleRegister = () => {
    // Prototype: send an OTP to verify the phone before creating the account.
    setPendingPhone(phone);
    router.push('/(auth)/otp');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <AuthHeader title="Create account" subtitle="List your business and start getting leads today." />

          <FormField label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
          <FormField
            label="Phone number"
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
          <PasswordInput value={password} onChangeText={setPassword} placeholder="Create a password" />

          <AppText preset="small" color={colors.textTertiary} style={styles.terms}>
            By continuing, you agree to Hello Kakinada's Terms of Service and Privacy Policy.
          </AppText>

          <Pressable
            style={({ pressed }) => [
              styles.submit,
              !canSubmit && styles.submitDisabled,
              pressed && canSubmit && styles.submitPressed,
            ]}
            onPress={handleRegister}
            disabled={!canSubmit}
          >
            <AppText preset="button" color={colors.white}>
              Send OTP
            </AppText>
          </Pressable>

          <AuthFooter
            question="Already have an account?"
            actionLabel="Log in"
            onPress={() => router.replace('/(auth)/login')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.screenPadding,
    paddingTop: spacing.xl,
  },
  terms: {
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  submit: {
    height: dimensions.buttonHeight,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  submitPressed: {
    backgroundColor: colors.accentPressed,
  },
  submitDisabled: {
    backgroundColor: colors.textDisabled,
  },
});
