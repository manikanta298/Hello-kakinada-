import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface FormFieldProps extends TextInputProps {
  label: string;
  optional?: boolean;
}

export function FormField({ label, optional, style, ...rest }: FormFieldProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <AppText preset="bodyMedium">{label}</AppText>
        {optional && (
          <AppText preset="small" color={colors.textTertiary}>
            {' '}
            (optional)
          </AppText>
        )}
      </View>
      <TextInput
        placeholderTextColor={colors.textTertiary}
        style={[styles.input, rest.multiline && styles.multiline, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundAlt,
  },
  multiline: {
    height: 110,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
});
