import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { onboarding as palette } from '../theme/onboarding';

export type ActionButtonVariant = 'plum' | 'indigo' | 'white';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: ActionButtonVariant;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
};

export function ActionButton({
  title,
  onPress,
  variant = 'plum',
  style,
  labelStyle,
  icon,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[variant], style, pressed && onPress ? styles.pressed : undefined]}
    >
      {icon ? (
        <View style={styles.iconContent}>
          {icon}
          <Text style={[styles.label, variant === 'white' && styles.whiteLabel, labelStyle]}>{title}</Text>
        </View>
      ) : (
        <Text style={[styles.label, variant === 'white' && styles.whiteLabel, labelStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  plum: {
    backgroundColor: palette.plum,
  },
  indigo: {
    backgroundColor: '#393D76',
  },
  white: {
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  label: {
    flexShrink: 1,
    color: '#FFFFFF',
    fontFamily: 'EtudeNoireBold',
    textAlign: 'center',
  },
  whiteLabel: {
    color: '#39396E',
    fontFamily: 'BulbasaurSP',
  },
  iconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
});
