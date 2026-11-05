import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});