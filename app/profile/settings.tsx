import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { authService } from '@/services/auth';
import { colors, radius, spacing } from '@/theme';

function SectionHeader({ label }: { label: string }) {
  return (
    <AppText preset="small" color={colors.textTertiary} style={styles.sectionHeader}>
      {label.toUpperCase()}
    </AppText>
  );
}

function ToggleRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <AppText preset="body" style={styles.rowLabel}>
        {label}
      </AppText>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.accent, false: colors.border }}
        thumbColor={colors.white}
      />
    </View>
  );
}

function LinkRow({
  label,
  onPress,
  destructive,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <AppText preset="body" color={destructive ? colors.error : colors.textPrimary} style={styles.rowLabel}>
        {label}
      </AppText>
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account?',
      'This will permanently remove your profile, listings, and saved items.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.signOut();
              router.replace('/(auth)/login');
            } catch (err) {
              Alert.alert('Something went wrong', err instanceof Error ? err.message : 'Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Settings</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader label="Notifications" />
        <View style={styles.card}>
          <ToggleRow label="Push notifications" value={pushEnabled} onValueChange={setPushEnabled} />
          <ToggleRow label="New lead alerts" value={leadAlerts} onValueChange={setLeadAlerts} />
          <ToggleRow label="Email updates" value={emailUpdates} onValueChange={setEmailUpdates} />
        </View>

        <SectionHeader label="Account" />
        <View style={styles.card}>
          <LinkRow label="Edit profile" onPress={() => router.push('/profile/edit')} />
          <LinkRow label="Change password" onPress={() => router.push('/(auth)/forgot-password')} />
          <LinkRow label="Language — English" onPress={() => {}} />
        </View>

        <SectionHeader label="About" />
        <View style={styles.card}>
          <LinkRow label="Help & Support" onPress={() => router.push('/profile/help')} />
          <LinkRow label="Terms of Service" onPress={() => {}} />
          <LinkRow label="Privacy Policy" onPress={() => {}} />
          <View style={[styles.row, styles.rowLast]}>
            <AppText preset="body" color={colors.textSecondary} style={styles.rowLabel}>
              App version
            </AppText>
            <AppText preset="small" color={colors.textTertiary}>
              1.0.0
            </AppText>
          </View>
        </View>

        <View style={[styles.card, styles.dangerCard]}>
          <LinkRow label="Delete account" onPress={handleDeleteAccount} destructive />
        </View>
      </ScrollView>
    </View>
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
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  dangerCard: {
    marginTop: spacing.lg,
    borderColor: colors.errorLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    flex: 1,
  },
});
