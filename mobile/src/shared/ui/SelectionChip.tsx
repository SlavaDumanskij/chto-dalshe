import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { onboarding as palette } from '../theme/onboarding';

export type SelectionMode = 'single' | 'multiple';

type Props = {
  label: string;
  selected: boolean;
  mode: SelectionMode;
  onPress: () => void;
  width?: number;
};

export function SelectionChip({ label, selected, mode, onPress, width }: Props) {
  const chipWidth: ViewStyle | undefined = width ? { width } : undefined;

  return (
    <Pressable
      accessibilityRole={mode === 'single' ? 'radio' : 'checkbox'}
      accessibilityLabel={label.replace(/\n/g, ' ')}
      accessibilityState={{ checked: selected }}
      aria-checked={selected}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, chipWidth, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
      {selected && <Text accessible={false} style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 7,
  },
  selected: {
    borderColor: palette.plum,
    backgroundColor: '#FBF6FC',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  label: {
    flexShrink: 1,
    color: '#353A6F',
    fontFamily: 'EtudeNoireBold',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  check: {
    position: 'absolute',
    top: 2,
    right: 7,
    color: palette.plum,
    fontFamily: 'EtudeNoireBold',
    fontSize: 12,
  },
});
