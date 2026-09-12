import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <SafeAreaProvider style={{ backgroundColor: colors.background }}>{children}</SafeAreaProvider>;
}
