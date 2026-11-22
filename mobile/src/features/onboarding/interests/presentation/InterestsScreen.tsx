import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingButton } from '../../../../shared/ui/OnboardingButton';
import { onboarding as palette } from '../../../../shared/theme/onboarding';

// Keep stable IDs separate from the text displayed on each card.
const interests = [
  { id: 'movies', label: 'кино,\nсериалы' },
  { id: 'video-games', label: 'видеоигры' },
  { id: 'board-games', label: 'настольные\nигры' },
  { id: 'sport', label: 'спорт' },
  { id: 'walks', label: 'прогулки' },
  { id: 'music', label: 'музыка' },
  { id: 'creativity', label: 'творчество' },
  { id: 'cooking', label: 'кулинария' },
  { id: 'reading', label: 'чтфение' },
  { id: 'culture', label: 'культура и\nмероприятия' },
  { id: 'social', label: 'общение' },
  { id: 'crafts', label: 'рукоделие' },
  { id: 'museums', label: 'музеи\nи выставки' },
  { id: 'drawing', label: 'рисование' },
  { id: 'architecture', label: 'архитектура' },
];

export default function InterestsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardSize = (Math.min(width, 430) - 64 - 24) / 3;

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
        <View style={styles.grid}>
          {interests.map(({ id, label }, index) => {
            const checked = selected.includes(id);
            return (
              <Pressable
                key={id}
                accessibilityRole="checkbox"
                accessibilityLabel={label.replace('\n', ' ')}
                accessibilityState={{ checked }}
                aria-checked={checked}
                onPress={() => toggleInterest(id)}
                style={({ pressed }) => [styles.card, { width: cardSize, minHeight: cardSize }, index < 3 && styles.topCard, checked && styles.selectedCard, pressed && styles.pressed]}
              >
                {checked && <Text style={styles.check} accessible={false}>✓</Text>}
                <Text style={[styles.cardText, { fontSize: Math.min(12, cardSize / 8.5) }]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { borderRadius: 23, backgroundColor: palette.card, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, paddingVertical: 16, overflow: 'hidden', boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.23)' },
  topCard: { backgroundImage: 'linear-gradient(to bottom, #EBDDFA 0%, #D8BFF6 18%, #CCADF5 44%, #CCADF5 100%)' },
  selectedCard: { backgroundColor: palette.selected, backgroundImage: 'linear-gradient(to bottom, #AE8CE3, #AE8CE3)', boxShadow: 'inset 0px 0px 0px 2px #48075B, 0px 4px 5px rgba(0, 0, 0, 0.23)' },
  pressed: { transform: [{ scale: 0.96 }] },
  cardText: { color: palette.white, fontSize: 12, lineHeight: 14, fontFamily: 'EtudeNoireBold', textAlign: 'center' },
  check: { position: 'absolute', right: 7, top: 3, color: palette.plum, fontSize: 15, fontWeight: '900' },
  actions: { marginTop: 16, marginHorizontal: 12, gap: 10 },
});
