import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { OTPInput } from '@/components/auth/OTPInput';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { useAuthStore } from '@/store/authStore';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

const RESEND_SECONDS = 30;

export default function OTPScreen() {
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const { pendingPhone, login } = useAuthStore();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const canVerify = code.length === 4;

  const handleVerify = () => {
    // Prototype: any 4-digit code succeeds.
    login({ id: 'u1', name: 'New User', phone: pendingPhone ?? '' });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <AuthHeader
          title="Verify your number"
          subtitle={`Enter the 4-digit code sent to ${pendingPhone ?? 'your phone'}`}
        />

        <OTPInput value={code} onChange={setCode} />

        <Pressable
          style={styles.resend}
          onPress={() => setSecondsLeft(RESEND_SECONDS)}
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
            Verify & Continue
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
