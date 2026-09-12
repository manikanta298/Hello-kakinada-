import React from 'react';
import { Linking, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { ActionSheet, ActionSheetOption } from '@/components/modals/ActionSheet';
import { LoadingState } from '@/components/common/LoadingState';
import { listingService } from '@/services';
import { useAsync } from '@/hooks/useAsync';

export default function ContactModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: listing, loading } = useAsync(() => listingService.getById(id), [id]);

  const close = () => router.back();

  if (loading || !listing) {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <LoadingState fill={false} />
      </View>
    );
  }

  const options: ActionSheetOption[] = [
    {
      icon: 'call',
      label: 'Call',
      sublabel: listing.phone ?? 'Not available',
      onPress: () => {
        if (listing.phone) Linking.openURL(`tel:${listing.phone}`);
        close();
      },
    },
  ];

  if (listing.whatsapp && listing.phone) {
    options.push({
      icon: 'logo-whatsapp',
      label: 'Message on WhatsApp',
      onPress: () => {
        Linking.openURL(`https://wa.me/${listing.phone!.replace(/\D/g, '')}`);
        close();
      },
    });
  }

  if (listing.phone) {
    options.push({
      icon: 'copy-outline',
      label: 'Copy phone number',
      onPress: async () => {
        await Clipboard.setStringAsync(listing.phone!);
        close();
      },
    });
  }

  return (
    <ActionSheet title={listing.title} subtitle="Choose how you'd like to get in touch" options={options} onClose={close} />
  );
}
