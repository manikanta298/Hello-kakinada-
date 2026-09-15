import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { authService } from '@/services/auth';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = EMAIL_RE.test(email.trim()) && password.length >= 6 && !submitting;

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      await authService.signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Login failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    try {
      await authService.signInWithGoogle();
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Google sign-in failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <AuthHeader title="Welcome back" subtitle="Log in to manage your listings and enquiries." />

          <FormField
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <PasswordInput value={password} onChangeText={setPassword} placeholder="Enter password" />

          <Pressable onPress={() => router.push('/(auth)/forgot-password')} hitSlop={8}>
            <AppText preset="caption" color={colors.accent} style={styles.forgot}>
              Forgot password?
            </AppText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.submit,
              !canSubmit && styles.submitDisabled,
              pressed && canSubmit && styles.submitPressed,
            ]}
            onPress={handleLogin}
            disabled={!canSubmit}
          >
            <AppText preset="button" color={colors.white}>
              {submitting ? 'Logging in…' : 'Log In'}
            </AppText>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <AppText preset="small" color={colors.textTertiary} style={styles.dividerLabel}>
              OR
            </AppText>
            <View style={styles.divider} />
          </View>

          <SocialLoginButton label="Continue with Google" icon="logo-google" onPress={handleGoogleLogin} />
          <SocialLoginButton
            label="Continue as Guest"
            icon="person-outline"
            onPress={() => router.replace('/(tabs)')}
          />

          <AuthFooter
            question="Don't have an account?"
            actionLabel="Sign up"
            onPress={() => router.push('/(auth)/register')}
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
  forgot: {
    alignSelf: 'flex-end',
    fontWeight: '600',
    marginTop: -spacing.sm,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    marginHorizontal: spacing.sm,
  },
});
