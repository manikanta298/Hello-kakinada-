import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, spacing } from '@/theme';

interface SearchEmptyStateProps {
  query?: string;
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={40} color={colors.textTertiary} />
      <AppText preset="bodyMedium" style={styles.title}>
        No results found
      </AppText>
      <AppText preset="caption" color={colors.textTertiary} align="center" style={styles.subtitle}>
        {query
          ? `We couldn't find anything for "${query}". Try a different search or adjust your filters.`
          : 'Try adjusting your filters to see more results.'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
  },
  subtitle: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
});
