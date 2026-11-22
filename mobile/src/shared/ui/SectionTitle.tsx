import { StyleSheet, Text } from 'react-native';

type Props = {
  children: string;
};

export function SectionTitle({ children }: Props) {
  return <Text accessibilityRole="header" style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    fontSize: 18,
    lineHeight: 22,
  },
});
