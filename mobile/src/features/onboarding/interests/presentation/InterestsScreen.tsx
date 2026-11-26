import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingButton } from '../../../../shared/ui/OnboardingButton';
import { InterestGrid } from '../../../../shared/ui/InterestGrid';
import { onboarding as palette } from '../../../../shared/theme/onboarding';

export default function InterestsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const insets = useSafeAreaInsets();

  function toggleInterest(id: string) {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  function openHome() {
    router.replace('/(tabs)/home');
  }

  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <ScrollView style={styles.frame} contentContainerStyle={[styles.content, { paddingTop: Math.max(60, insets.top + 16), paddingBottom: Math.max(60, insets.bottom + 16) }]}>
        <Text accessibilityRole="header" style={styles.title}>ЧТО ТЕБЕ ИНТЕРЕСНО?</Text>
        <InterestGrid selectedIds={selected} onToggle={toggleInterest} />
        <View style={styles.actions}>
          <OnboardingButton title="продолжить" onPress={openHome} />
          <OnboardingButton title="пропустить" secondary onPress={openHome} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#EEEDF4', alignItems: 'center' },
  frame: { width: '100%', maxWidth: 430, backgroundColor: palette.white },
  content: { paddingHorizontal: 32 },
  title: { color: '#29285F', fontSize: 24, lineHeight: 29, fontFamily: 'BulbasaurSP', textAlign: 'center', marginHorizontal: -20, marginBottom: 20 },
  actions: { marginTop: 16, marginHorizontal: 12, gap: 10 },
});
