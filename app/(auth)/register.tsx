import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);

  const canSubmit =
    name.trim().length > 1 && EMAIL_RE.test(email.trim()) && password.length >= 6 && !submitting;

  const handleRegister = async () => {
    setSubmitting(true);
    try {
      const { needsVerification } = await authService.signUp(email.trim(), password, name.trim());
      if (needsVerification) {
        setPendingEmail(email.trim());
        router.push('/(auth)/otp');
      } else {
        router.replace('/(tabs)');
      }
    } catch (err) {
      Alert.alert('Sign up failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <AuthHeader title="Create account" subtitle="List your business and start getting leads today." />

          <FormField label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
          <FormField
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
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
              {submitting ? 'Creating account…' : 'Create Account'}
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
