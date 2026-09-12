import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  // Browsing doesn't require login — only posting/owner features gate on auth.
  // Swap this to `(auth)/login` if the product wants a hard login wall instead.
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(tabs)'} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
