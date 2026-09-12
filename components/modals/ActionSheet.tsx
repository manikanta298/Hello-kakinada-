import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

export interface ActionSheetOption {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  title: string;
  subtitle?: string;
  options: ActionSheetOption[];
  onClose: () => void;
}

export function ActionSheet({ title, subtitle, options, onClose }: ActionSheetProps) {
  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.grabber} />

        <AppText preset="h3" align="center" style={styles.title}>
          {title}
        </AppText>
        {subtitle && (
          <AppText preset="caption" color={colors.textSecondary} align="center" style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}

        <View style={styles.options}>
          {options.map((option, index) => (
            <Pressable
              key={option.label}
              style={[styles.option, index === options.length - 1 && styles.optionLast]}
              onPress={option.onPress}
            >
              <View style={[styles.iconCircle, option.destructive && styles.iconCircleDestructive]}>
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={option.destructive ? colors.error : colors.accent}
                />
              </View>
              <View style={styles.optionText}>
                <AppText preset="bodyMedium" color={option.destructive ? colors.error : colors.textPrimary}>
                  {option.label}
                </AppText>
                {option.sublabel && (
                  <AppText preset="small" color={colors.textTertiary}>
                    {option.sublabel}
                  </AppText>
                )}
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.cancelButton} onPress={onClose}>
          <AppText preset="bodyMedium" color={colors.textPrimary}>
            Cancel
          </AppText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xxs,
  },
  subtitle: {
    marginBottom: spacing.sm,
  },
  options: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleDestructive: {
    backgroundColor: colors.errorLight,
  },
  optionText: {
    marginLeft: spacing.sm,
  },
  cancelButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});
