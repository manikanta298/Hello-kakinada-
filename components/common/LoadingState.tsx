import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';

interface LoadingStateProps {
  /** Fills the screen when true (default). Pass false to inline it, e.g. below a header that already rendered. */
  fill?: boolean;
}

export function LoadingState({ fill = true }: LoadingStateProps) {
  return (
    <View style={[styles.container, fill && styles.fill]}>
      <ActivityIndicator color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  fill: {
    flex: 1,
  },
});
