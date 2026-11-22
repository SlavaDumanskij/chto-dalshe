import { Pressable, StyleSheet, Text, View } from 'react-native';

import { onboarding as palette } from '../theme/onboarding';
import { SectionTitle } from './SectionTitle';

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function ParticipantStepper({ value, min, max, onChange }: Props) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.section}>
      <SectionTitle>Сколько человек участвует?</SectionTitle>
      <View style={styles.counter}>
        <Text style={styles.range}>от {min} до {max} участников</Text>
        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Уменьшить количество участников"
            accessibilityState={{ disabled: value <= min }}
            disabled={value <= min}
            onPress={decrease}
            style={styles.controlButton}
          >
            <Text style={[styles.operator, value <= min && styles.disabledOperator]}>−</Text>
          </Pressable>
          <View style={styles.valueCircle}>
            <Text style={styles.value}>{value}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Увеличить количество участников"
            accessibilityState={{ disabled: value >= max }}
            disabled={value >= max}
            onPress={increase}
            style={styles.controlButton}
          >
            <Text style={[styles.operator, value >= max && styles.disabledOperator]}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  counter: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    marginTop: 11,
    paddingHorizontal: 19,
    paddingVertical: 10,
  },
  range: {
    flexShrink: 1,
    color: '#353A6F',
    fontFamily: 'EtudeNoireBold',
    fontSize: 13,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  controlButton: {
    width: 36,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operator: {
    color: palette.plum,
    fontFamily: 'BulbasaurSP',
    fontSize: 29,
    lineHeight: 34,
  },
  disabledOperator: {
    opacity: 0.38,
  },
  valueCircle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: palette.plum,
    backgroundColor: '#FBF6FC',
  },
  value: {
    color: palette.plum,
    fontFamily: 'EtudeNoireBold',
    fontSize: 16,
  },
});
