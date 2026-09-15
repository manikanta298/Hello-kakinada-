import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/AppProvider';
import { AppText } from '@/components/common/AppText';
import { isSupabaseConfigured } from '@/lib/supabase';
import { colors, spacing } from '@/theme';

function ConfigErrorScreen() {
  return (
    <View style={styles.errorRoot}>
      <AppText preset="h2" align="center">
        Configuration missing
      </AppText>
      <AppText preset="body" color={colors.textSecondary} align="center" style={styles.errorBody}>
        This build is missing EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.{'\n\n'}
        Set them as environment variables in your EAS build profile (eas.json or `eas env:create`), then rebuild.
      </AppText>
    </View>
  );
}

export default function RootLayout() {
  if (!isSupabaseConfigured) {
    return <ConfigErrorScreen />;
  }

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="listing/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="listing/reviews" options={{ presentation: 'card' }} />
        <Stack.Screen name="listing/report" options={{ presentation: 'modal' }} />
        <Stack.Screen name="categories" options={{ presentation: 'card' }} />
        <Stack.Screen name="search" options={{ presentation: 'card' }} />
        <Stack.Screen name="post-listing" options={{ presentation: 'modal' }} />
        <Stack.Screen name="owner" options={{ presentation: 'card' }} />
        <Stack.Screen name="profile" options={{ presentation: 'card' }} />
        <Stack.Screen name="business/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="jobs/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="properties/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="hotels/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="services/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="map" options={{ presentation: 'card' }} />
        <Stack.Screen name="modal" options={{ presentation: 'transparentModal' }} />
      </Stack>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  errorRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorBody: {
    marginTop: spacing.md,
    lineHeight: 21,
  },
});
