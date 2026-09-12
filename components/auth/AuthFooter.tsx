import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface AuthFooterProps {
  question: string;
  actionLabel: string;
  onPress: () => void;
}

export function AuthFooter({ question, actionLabel, onPress }: AuthFooterProps) {
  return (
    <View style={styles.row}>
      <AppText preset="caption" color={colors.textSecondary}>
        {question}{' '}
      </AppText>
      <Pressable onPress={onPress} hitSlop={8}>
        <AppText preset="caption" color={colors.accent} style={styles.action}>
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  action: {
    fontWeight: '600',
  },
});
