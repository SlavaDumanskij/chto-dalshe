import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
};

export function SectionTitle({ children, style }: Props) {
  return <Text accessibilityRole="header" style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    fontSize: 18,
    lineHeight: 22,
  },
});
