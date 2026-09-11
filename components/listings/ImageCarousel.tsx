import React, { useState } from 'react';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, dimensions, spacing } from '@/theme';

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

export function ImageCarousel({ images, height = 280 }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = images.length > 0 ? images : ['placeholder'];

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / dimensions.screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={[styles.wrapper, { height }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {photos.map((uri, index) => (
          <View key={index} style={[styles.slide, { height }]}>
            {uri === 'placeholder' ? (
              <View style={styles.placeholder}>
                <Ionicons name="image-outline" size={40} color={colors.textTertiary} />
              </View>
            ) : (
              <Image source={{ uri }} style={styles.image} />
            )}
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </Pressable>

      {photos.length > 1 && (
        <View style={styles.dots}>
          {photos.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: dimensions.screenWidth,
    backgroundColor: colors.skeleton,
  },
  slide: {
    width: dimensions.screenWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
  },
  backButton: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 16,
  },
});
