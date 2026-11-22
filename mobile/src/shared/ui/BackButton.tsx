import { Pressable, StyleSheet, Text } from 'react-native';

import { onboarding as palette } from '../theme/onboarding';

type Props = {
  onPress: () => void;
};

export function BackButton({ onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Назад"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.arrow}>←</Text>
      <Text style={styles.label}>Назад</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  pressed: {
    opacity: 0.82,
  },
  arrow: {
    color: palette.plum,
    fontSize: 22,
    lineHeight: 24,
    fontFamily: 'EtudeNoireBold',
  },
  label: {
    color: palette.ink,
    fontFamily: 'EtudeNoireBold',
    fontSize: 14,
  },
});
