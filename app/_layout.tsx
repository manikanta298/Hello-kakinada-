import React from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/AppProvider';
import { colors } from '@/theme';

export default function RootLayout() {
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
