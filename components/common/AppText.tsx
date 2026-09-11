import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { colors, typography } from '@/theme';

type Preset = keyof typeof typography.preset;

interface AppTextProps extends TextProps {
  preset?: Preset;
  color?: string;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
}

export function AppText({
  preset = 'body',
  color = colors.textPrimary,
  align,
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[typography.preset[preset], { color, textAlign: align }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
