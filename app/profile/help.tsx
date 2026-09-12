import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'How do I post a listing?',
    answer:
      'Tap the Post button in the center of the bottom tab bar, choose a category, and follow the steps to add details, location, and photos.',
  },
  {
    question: 'How long does listing approval take?',
    answer: 'Most listings go live within a few hours. You\u2019ll get a notification once it\u2019s approved.',
  },
  {
    question: 'How do I edit or remove a listing?',
    answer:
      'Open My Business Dashboard from your profile, find the listing, and use the edit or delete icons.',
  },
  {
    question: 'Is Hello Kakinada free to use?',
    answer:
      'Browsing and posting a basic listing is free. Owners can upgrade to a paid plan for featured placement.',
  },
  {
    question: 'How do I contact a business?',
    answer: 'Open any listing and use the Call or WhatsApp buttons on the listing page.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Pressable style={styles.faqItem} onPress={() => setOpen((prev) => !prev)}>
      <View style={styles.faqHeader}>
        <AppText preset="bodyMedium" style={styles.faqQuestion}>
          {question}
        </AppText>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textTertiary} />
      </View>
      {open && (
        <AppText preset="small" color={colors.textSecondary} style={styles.faqAnswer}>
          {answer}
        </AppText>
      )}
    </Pressable>
  );
}

export default function HelpScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <AppText preset="h3">Help & Support</AppText>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <AppText preset="small" color={colors.textTertiary} style={styles.sectionHeader}>
          FREQUENTLY ASKED QUESTIONS
        </AppText>
        <View style={styles.card}>
          {FAQS.map((faq, index) => (
            <View key={faq.question}>
              <FaqItem {...faq} />
              {index < FAQS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <AppText preset="small" color={colors.textTertiary} style={styles.sectionHeader}>
          CONTACT US
        </AppText>
        <View style={styles.card}>
          <Pressable style={styles.contactRow} onPress={() => Linking.openURL('tel:+911234567890')}>
            <View style={styles.contactIcon}>
              <Ionicons name="call-outline" size={18} color={colors.accent} />
            </View>
            <View style={styles.contactBody}>
              <AppText preset="bodyMedium">Call support</AppText>
              <AppText preset="small" color={colors.textSecondary}>
                Mon–Sat, 9 AM–7 PM
              </AppText>
            </View>
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            style={styles.contactRow}
            onPress={() => Linking.openURL('mailto:support@hellokakinada.com')}
          >
            <View style={styles.contactIcon}>
              <Ionicons name="mail-outline" size={18} color={colors.accent} />
            </View>
            <View style={styles.contactBody}>
              <AppText preset="bodyMedium">Email us</AppText>
              <AppText preset="small" color={colors.textSecondary}>
                support@hellokakinada.com
              </AppText>
            </View>
          </Pressable>
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
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  faqItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    marginRight: spacing.sm,
  },
  faqAnswer: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBody: {
    marginLeft: spacing.sm,
  },
});
