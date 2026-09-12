import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, dimensions, radius, spacing } from '@/theme';

interface SocialLoginButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export function SocialLoginButton({ label, icon, onPress }: SocialLoginButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={colors.textPrimary} />
      <AppText preset="bodyMedium" style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.buttonHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  pressed: {
    backgroundColor: colors.backgroundAlt,
  },
  label: {
    marginLeft: spacing.sm,
  },
});
