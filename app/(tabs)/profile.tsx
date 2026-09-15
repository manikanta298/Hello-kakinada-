import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/common/AppText';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth';
import { colors, radius, spacing } from '@/theme';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accent?: boolean;
}

export default function ProfileScreen() {
  const { user, isAuthenticated } = useAuth();

  const menuItems: MenuItem[] = [
    { icon: 'storefront-outline', label: 'My Business Dashboard', onPress: () => router.push('/owner'), accent: true },
    { icon: 'list-outline', label: 'My Listings', onPress: () => router.push('/profile/my-listings') },
    { icon: 'time-outline', label: 'Recently Viewed', onPress: () => router.push('/profile/recently-viewed') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => router.push('/profile/notifications') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => router.push('/profile/settings') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => router.push('/profile/help') },
  ];

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.replace('/(auth)/login');
    } catch (err) {
      Alert.alert('Could not log out', err instanceof Error ? err.message : 'Please try again.');
    }
  };

  return (
    <Screen edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Pressable
          style={styles.profileRow}
          onPress={() => isAuthenticated && router.push('/profile/edit')}
          disabled={!isAuthenticated}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={26} color={colors.white} />
          </View>
          <View style={styles.profileText}>
            <AppText preset="h3">{isAuthenticated ? user?.name : 'Guest'}</AppText>
            <AppText preset="caption" color={colors.textSecondary}>
              {isAuthenticated ? user?.phone : 'Log in to save listings & post'}
            </AppText>
          </View>
          {!isAuthenticated && (
            <Pressable style={styles.loginButton} onPress={() => router.push('/(auth)/login')}>
              <AppText preset="small" color={colors.white} style={styles.loginLabel}>
                Log In
              </AppText>
            </Pressable>
          )}
        </Pressable>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.label}
              style={[styles.menuRow, index === menuItems.length - 1 && styles.menuRowLast]}
              onPress={item.onPress}
            >
              <View style={[styles.menuIcon, item.accent && styles.menuIconAccent]}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={item.accent ? colors.accent : colors.textPrimary}
                />
              </View>
              <AppText preset="body" style={styles.menuLabel}>
                {item.label}
              </AppText>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </Pressable>
          ))}
        </View>

        {isAuthenticated && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color={colors.error} />
            <AppText preset="bodyMedium" color={colors.error} style={styles.logoutLabel}>
              Log Out
            </AppText>
          </Pressable>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.circle,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  loginButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  loginLabel: {
    fontWeight: '600',
  },
  menu: {
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconAccent: {
    backgroundColor: colors.accentLight,
  },
  menuLabel: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },
  logoutLabel: {
    marginLeft: spacing.xs,
  },
});
