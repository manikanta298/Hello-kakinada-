import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '@/theme';

interface FavoriteButtonProps {
  initial?: boolean;
  onToggle?: (value: boolean) => void;
}

export function FavoriteButton({ initial = false, onToggle }: FavoriteButtonProps) {
  const [active, setActive] = useState(initial);

  const handlePress = () => {
    const next = !active;
    setActive(next);
    onToggle?.(next);
  };

  return (
    <Pressable style={styles.button} onPress={handlePress} hitSlop={8}>
      <Ionicons
        name={active ? 'heart' : 'heart-outline'}
        size={18}
        color={active ? colors.accent : colors.textPrimary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: radius.circle,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
