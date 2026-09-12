import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { LoadingState } from '@/components/common/LoadingState';
import { useNotifications } from '@/hooks/useNotifications';
import { AppNotification, NotificationType } from '@/types/notification';
import { colors, radius, spacing } from '@/theme';

const ICONS: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  lead: 'call-outline',
  listing: 'storefront-outline',
  system: 'information-circle-outline',
  promo: 'pricetag-outline',
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationsScreen() {
  const { items, loading, markRead, markAllRead, unreadCount } = useNotifications();

  const handlePress = (item: AppNotification) => {
    if (!item.isRead) markRead(item.id);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Notifications</AppText>
        <Pressable onPress={markAllRead} hitSlop={8} disabled={unreadCount === 0}>
          <AppText
            preset="small"
            color={unreadCount === 0 ? colors.textDisabled : colors.accent}
            style={styles.markAllLabel}
          >
            Mark all read
          </AppText>
        </Pressable>
      </SafeAreaView>

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="notifications-outline" size={40} color={colors.textTertiary} />
          <AppText preset="body" color={colors.textSecondary} style={styles.emptyText}>
            You're all caught up.
          </AppText>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => handlePress(item)}>
              <View style={[styles.icon, !item.isRead && styles.iconUnread]}>
                <Ionicons
                  name={ICONS[item.type]}
                  size={18}
                  color={item.isRead ? colors.textSecondary : colors.accent}
                />
              </View>
              <View style={styles.body}>
                <AppText preset="bodyMedium">{item.title}</AppText>
                <AppText preset="small" color={colors.textSecondary} style={styles.itemBody}>
                  {item.body}
                </AppText>
                <AppText preset="small" color={colors.textTertiary}>
                  {timeAgo(item.createdAt)}
                </AppText>
              </View>
              {!item.isRead && <View style={styles.dot} />}
            </Pressable>
          )}
        />
      )}
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
  markAllLabel: {
    fontWeight: '600',
  },
  list: {
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUnread: {
    backgroundColor: colors.accentLight,
  },
  body: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  itemBody: {
    marginTop: 2,
    marginBottom: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.circle,
    backgroundColor: colors.accent,
    marginTop: 6,
    marginLeft: spacing.xs,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
