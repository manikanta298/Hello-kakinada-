import React from 'react';
import { Share, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { ActionSheet, ActionSheetOption } from '@/components/modals/ActionSheet';
import { LoadingState } from '@/components/common/LoadingState';
import { listingService } from '@/services';
import { useAsync } from '@/hooks/useAsync';

// Prototype deep link — swap for the real published app/web URL scheme later.
const buildShareLink = (listingId: string) => `https://hellokakinada.in/listing/${listingId}`;

export default function ShareModal() {
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

  const link = buildShareLink(listing.id);

  const options: ActionSheetOption[] = [
    {
      icon: 'share-social-outline',
      label: 'Share via…',
      sublabel: 'Open the system share sheet',
      onPress: async () => {
        await Share.share({ message: `Check out ${listing.title} on Hello Kakinada: ${link}` });
        close();
      },
    },
    {
      icon: 'logo-whatsapp',
      label: 'Share to WhatsApp',
      onPress: async () => {
        await Share.share({ message: `Check out ${listing.title} on Hello Kakinada: ${link}` });
        close();
      },
    },
    {
      icon: 'copy-outline',
      label: 'Copy link',
      onPress: async () => {
        await Clipboard.setStringAsync(link);
        close();
      },
    },
  ];

  return (
    <ActionSheet title="Share Listing" subtitle={listing.title} options={options} onClose={close} />
  );
}
