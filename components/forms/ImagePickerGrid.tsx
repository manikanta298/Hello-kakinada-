import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors, radius, spacing } from '@/theme';

interface ImagePickerGridProps {
  photos: string[];
  onAdd: (uri: string) => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}

export function ImagePickerGrid({ photos, onAdd, onRemove, maxPhotos = 8 }: ImagePickerGridProps) {
  const handleAdd = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      onAdd(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.grid}>
      {photos.map((uri, index) => (
        <View key={uri + index} style={styles.slot}>
          <Image source={{ uri }} style={styles.image} />
          <Pressable style={styles.removeButton} onPress={() => onRemove(index)} hitSlop={6}>
            <Ionicons name="close" size={14} color={colors.white} />
          </Pressable>
          {index === 0 && (
            <View style={styles.coverBadge}>
              <AppText preset="small" color={colors.white}>
                Cover
              </AppText>
            </View>
          )}
        </View>
      ))}

      {photos.length < maxPhotos && (
        <Pressable style={styles.addSlot} onPress={handleAdd}>
          <Ionicons name="camera-outline" size={22} color={colors.accent} />
          <AppText preset="small" color={colors.accent} style={styles.addLabel}>
            Add photo
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const SLOT_SIZE = 100;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.skeleton,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: colors.accent,
    borderRadius: radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  addSlot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentLight,
  },
  addLabel: {
    marginTop: 4,
    fontWeight: '500',
  },
});
