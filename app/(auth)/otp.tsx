import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { OTPInput } from '@/components/auth/OTPInput';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

const RESEND_SECONDS = 30;
const CODE_LENGTH = 6;

export default function OTPScreen() {
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const pendingEmail = useAuthStore((s) => s.pendingEmail);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const canVerify = code.length === CODE_LENGTH && !submitting;

  const handleVerify = async () => {
    if (!pendingEmail) {
      router.replace('/(auth)/register');
      return;
    }
    setSubmitting(true);
    try {
      await authService.verifySignupOtp(pendingEmail, code);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Verification failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;
    setSecondsLeft(RESEND_SECONDS);
    try {
      await authService.resendSignupOtp(pendingEmail);
    } catch (err) {
      Alert.alert('Could not resend code', err instanceof Error ? err.message : 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <AuthHeader
          title="Verify your email"
          subtitle={`Enter the ${CODE_LENGTH}-digit code sent to ${pendingEmail ?? 'your email'}`}
        />

        <OTPInput value={code} onChange={setCode} length={CODE_LENGTH} />

        <Pressable
          style={styles.resend}
          onPress={handleResend}
          disabled={secondsLeft > 0}
          hitSlop={8}
        >
          <AppText
            preset="caption"
            color={secondsLeft > 0 ? colors.textTertiary : colors.accent}
            style={secondsLeft === 0 ? styles.resendActive : undefined}
          >
            {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : 'Resend code'}
          </AppText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.submit,
            !canVerify && styles.submitDisabled,
            pressed && canVerify && styles.submitPressed,
          ]}
          onPress={handleVerify}
          disabled={!canVerify}
        >
          <AppText preset="button" color={colors.white}>
            {submitting ? 'Verifying…' : 'Verify & Continue'}
          </AppText>
        </Pressable>
      </View>
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
    paddingTop: spacing.xl,
  },
  resend: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  resendActive: {
    fontWeight: '600',
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
