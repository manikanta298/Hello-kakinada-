import React from 'react';
import { Linking, Platform, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { ActionSheet, ActionSheetOption } from '@/components/modals/ActionSheet';
import { LoadingState } from '@/components/common/LoadingState';
import { listingService } from '@/services';
import { useAsync } from '@/hooks/useAsync';

export default function DirectionsModal() {
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

  const query = encodeURIComponent(listing.location);
  const options: ActionSheetOption[] = [
    {
      icon: 'logo-google',
      label: 'Open in Google Maps',
      onPress: () => {
        Linking.openURL(`https://maps.google.com/?q=${query}`);
        close();
      },
    },
  ];

  if (Platform.OS === 'ios') {
    options.push({
      icon: 'map-outline',
      label: 'Open in Apple Maps',
      onPress: () => {
        Linking.openURL(`https://maps.apple.com/?q=${query}`);
        close();
      },
    });
  }

  options.push({
    icon: 'copy-outline',
    label: 'Copy address',
    onPress: async () => {
      await Clipboard.setStringAsync(listing.location);
      close();
    },
  });

  return (
    <ActionSheet title="Get Directions" subtitle={listing.location} options={options} onClose={close} />
  );
}
