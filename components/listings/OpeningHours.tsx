import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { DayHours } from '@/types/workingHours';
import { colors, spacing } from '@/theme';

interface OpeningHoursProps {
  hours: DayHours[];
}

const TODAY = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export function OpeningHours({ hours }: OpeningHoursProps) {
  const [expanded, setExpanded] = useState(false);
  const today = hours.find((h) => h.day === TODAY);

  return (
    <View style={styles.container}>
      <Pressable style={styles.summaryRow} onPress={() => setExpanded((v) => !v)}>
        <View style={styles.summaryLeft}>
          <Ionicons name="time-outline" size={18} color={colors.textPrimary} />
          <AppText preset="bodyMedium" style={styles.summaryText}>
            {today && today.hours !== 'Closed' ? `Open now · ${today.hours}` : 'Closed now'}
          </AppText>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textSecondary}
        />
      </Pressable>

      {expanded && (
        <View style={styles.list}>
          {hours.map((item) => (
            <View key={item.day} style={styles.row}>
              <AppText
                preset="caption"
                color={item.day === TODAY ? colors.textPrimary : colors.textSecondary}
                style={item.day === TODAY ? styles.todayLabel : undefined}
              >
                {item.day}
              </AppText>
              <AppText
                preset="caption"
                color={item.day === TODAY ? colors.textPrimary : colors.textSecondary}
                style={item.day === TODAY ? styles.todayLabel : undefined}
              >
                {item.hours}
              </AppText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: spacing.sm,
  },
  list: {
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },
  todayLabel: {
    fontWeight: '600',
  },
});
