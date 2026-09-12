import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { FormField } from '@/components/forms/FormField';
import { useReportListing } from '@/hooks/useReportListing';
import { REPORT_REASONS, ReportReason } from '@/types/report';
import { colors, radius, spacing } from '@/theme';

export default function ReportListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { reason, setReason, details, setDetails, submitting, submitted, submit } = useReportListing(id);

  if (submitted) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={32} color={colors.white} />
          </View>
          <AppText preset="h2" style={styles.successTitle}>
            Report submitted
          </AppText>
          <AppText preset="body" color={colors.textSecondary} style={styles.successBody}>
            Thanks for letting us know. Our team will review this listing shortly.
          </AppText>
          <Pressable style={styles.doneButton} onPress={() => router.back()}>
            <AppText preset="bodyMedium" color={colors.white}>
              Done
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Report Listing</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppText preset="bodyMedium" style={styles.sectionLabel}>
          Why are you reporting this listing?
        </AppText>

        <View style={styles.reasonList}>
          {REPORT_REASONS.map((option) => (
            <ReasonRow key={option} label={option} selected={reason === option} onPress={() => setReason(option)} />
          ))}
        </View>

        <FormField
          label="Additional details"
          optional
          value={details}
          onChangeText={setDetails}
          placeholder="Tell us more about the issue"
          multiline
          numberOfLines={4}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.submitButton, !reason && styles.submitButtonDisabled]}
          onPress={submit}
          disabled={!reason || submitting}
        >
          <AppText preset="bodyMedium" color={colors.white}>
            {submitting ? 'Submitting…' : 'Submit report'}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

function ReasonRow({
  label,
  selected,
  onPress,
}: {
  label: ReportReason;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.reasonRow} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <AppText preset="body" style={styles.reasonLabel}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  reasonList: {
    marginBottom: spacing.lg,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.circle,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: radius.circle,
    backgroundColor: colors.accent,
  },
  reasonLabel: {
    marginLeft: spacing.sm,
  },
  footer: {
    padding: spacing.screenPadding,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.textDisabled,
  },
  successWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.circle,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: {
    textAlign: 'center',
  },
  successBody: {
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  doneButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
});
