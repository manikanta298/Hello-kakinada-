import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { colors, dimensions, radius, shadows, spacing } from '@/theme';

interface WizardFooterProps {
  label?: string;
  disabled?: boolean;
  onPress: () => void;
}

export function WizardFooter({ label = 'Continue', disabled, onPress }: WizardFooterProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.footer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <AppText preset="button" color={colors.white}>
          {label}
        </AppText>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.screenPadding,
  },
  button: {
    height: dimensions.buttonHeight,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  buttonPressed: {
    backgroundColor: colors.accentPressed,
  },
  buttonDisabled: {
    backgroundColor: colors.textDisabled,
  },
});
