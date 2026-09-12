import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FormField } from '@/components/forms/FormField';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

export default function ForgotPasswordScreen() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const canSubmit = phone.trim().length >= 10;

  const handleSend = () => setSent(true);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Pressable onPress={() => router.back()} hitSlop={8} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>

          {sent ? (
            <View style={styles.sentState}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail-open-outline" size={28} color={colors.white} />
              </View>
              <AppText preset="h2" align="center" style={styles.sentTitle}>
                Check your phone
              </AppText>
              <AppText preset="body" color={colors.textSecondary} align="center" style={styles.sentSubtitle}>
                We've sent a password reset link via SMS to {phone}.
              </AppText>

              <Pressable style={styles.submit} onPress={() => router.replace('/(auth)/login')}>
                <AppText preset="button" color={colors.white}>
                  Back to Login
                </AppText>
              </Pressable>
            </View>
          ) : (
            <>
              <AuthHeader
                title="Reset password"
                subtitle="Enter your registered phone number and we'll send you a reset link."
              />

              <FormField
                label="Phone number"
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.submit,
                  !canSubmit && styles.submitDisabled,
                  pressed && canSubmit && styles.submitPressed,
                ]}
                onPress={handleSend}
                disabled={!canSubmit}
              >
                <AppText preset="button" color={colors.white}>
                  Send Reset Link
                </AppText>
              </Pressable>
            </>
          )}
        </View>
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
    flex: 1,
    padding: spacing.screenPadding,
  },
  back: {
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
  sentState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.circle,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentTitle: {
    marginTop: spacing.lg,
  },
  sentSubtitle: {
    marginTop: spacing.sm,
    lineHeight: 21,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
});
