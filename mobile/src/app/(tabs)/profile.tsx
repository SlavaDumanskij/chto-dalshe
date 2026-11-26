import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { onboarding as palette } from '../../shared/theme/onboarding';
import { InterestGrid } from '../../shared/ui/InterestGrid';
import { SectionTitle } from '../../shared/ui/SectionTitle';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: Math.max(24, insets.top + 8) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.name}>ТВОЁ ИМЯ</Text>
        </View>
        <SectionTitle style={styles.interestsTitle}>ЧТО ТЕБЕ ИНТЕРЕСНО?</SectionTitle>
        <InterestGrid gap={10} style={styles.grid} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  scroll: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: palette.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 28,
  },
  avatarPlaceholder: {
    width: 98,
    height: 98,
    borderRadius: 11,
    backgroundColor: '#DFD2F2',
  },
  name: {
    flex: 1,
    color: palette.ink,
    fontFamily: 'BulbasaurSP',
    fontSize: 22,
    textAlign: 'center',
  },
  interestsTitle: {
    color: palette.ink,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    marginHorizontal: -6,
    marginBottom: 18,
  },
  grid: {
    marginHorizontal: 10,
  },
});
