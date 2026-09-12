import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MapPlaceholder } from './MapPlaceholder';
import { MapPin } from './MapPin';
import { MapListingPreview } from './MapListingPreview';
import { Listing } from '@/types/listing';

interface ListingsMapViewProps {
  listings: Listing[];
}

const CATEGORY_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  Restaurants: 'restaurant',
  Hotels: 'bed',
  'Real Estate': 'home',
  Jobs: 'briefcase',
  Services: 'construct',
  Healthcare: 'medkit',
};

/** Small deterministic hash so the same listing always lands in the same spot. */
function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function ListingsMapView({ listings }: ListingsMapViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  const selected = listings.find((l) => l.id === selectedId) ?? null;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <MapPlaceholder>
        {size.width > 0 &&
          listings.map((listing) => {
            const hash = hashString(listing.id);
            const angle = (hash % 360) * (Math.PI / 180);
            const radiusPx = Math.min(24 + (listing.distance ?? 2) * 22, Math.min(size.width, size.height) / 2 - 30);
            const x = size.width / 2 + radiusPx * Math.cos(angle) - 16;
            const y = size.height / 2 + radiusPx * Math.sin(angle) - 32;

            return (
              <View key={listing.id} style={{ position: 'absolute', left: x, top: y }}>
                <MapPin
                  icon={CATEGORY_ICON[listing.categoryName] ?? 'location'}
                  active={listing.id === selectedId}
                  onPress={() => setSelectedId(listing.id)}
                />
              </View>
            );
          })}
      </MapPlaceholder>

      {selected && <MapListingPreview listing={selected} onClose={() => setSelectedId(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
