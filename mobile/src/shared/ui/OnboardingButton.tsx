import { Pressable, StyleSheet, Text } from 'react-native';
import { onboarding as palette } from '../theme/onboarding';

type Props = {
  title: string;
  onPress?: () => void;
  secondary?: boolean;
  large?: boolean;
};

export function OnboardingButton({ title, onPress, secondary = false, large = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      accessibilityState={{ disabled: !onPress }}
      onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.secondary, pressed && styles.pressed]}
    >
      <Text style={[styles.label, secondary && styles.secondaryLabel, large && styles.large]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 44, borderRadius: 999, backgroundColor: palette.plum, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 4 },
  secondary: { backgroundColor: palette.lavender },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  label: { color: palette.white, fontFamily: 'EtudeNoireBold', fontSize: 18, textAlign: 'center' },
  secondaryLabel: { color: palette.ink },
  large: { fontSize: 36, lineHeight: 40 },
});
