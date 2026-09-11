import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { Lead, LeadType } from '@/types/lead';
import { colors, radius, spacing } from '@/theme';

interface LeadCardProps {
  lead: Lead;
}

const TYPE_META: Record<LeadType, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  call: { icon: 'call-outline', label: 'Called' },
  whatsapp: { icon: 'logo-whatsapp', label: 'WhatsApp' },
  enquiry: { icon: 'chatbubble-ellipses-outline', label: 'Enquiry' },
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function LeadCard({ lead }: LeadCardProps) {
  const meta = TYPE_META[lead.type];

  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={meta.icon} size={16} color={colors.accent} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText preset="bodyMedium" numberOfLines={1} style={styles.name}>
            {lead.customerName}
          </AppText>
          {lead.isNew && <View style={styles.newDot} />}
        </View>
        <AppText preset="small" color={colors.textTertiary} numberOfLines={1}>
          {meta.label} · {lead.listingTitle}
        </AppText>
        {lead.message && (
          <AppText preset="small" color={colors.textSecondary} numberOfLines={1} style={styles.message}>
            "{lead.message}"
          </AppText>
        )}
      </View>

      <AppText preset="small" color={colors.textTertiary}>
        {timeAgo(lead.createdAt)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: radius.circle,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
  },
  newDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginLeft: spacing.xs,
  },
  message: {
    marginTop: 2,
    fontStyle: 'italic',
  },
});
