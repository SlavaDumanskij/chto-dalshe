import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '../../../shared/ui/ActionButton';
import { BackButton } from '../../../shared/ui/BackButton';
import { ParticipantStepper } from '../../../shared/ui/ParticipantStepper';
import { SelectionSection, type SelectionOption } from '../../../shared/ui/SelectionSection';

type SelectionGroup = 'time' | 'budget' | 'place' | 'mood';
type SelectionState = Record<SelectionGroup, string[]>;

const options: Record<SelectionGroup, SelectionOption[]> = {
  time: [
    { id: 'under-30-minutes', label: 'до 30 минут' },
    { id: 'about-an-hour', label: 'около часа' },
    { id: 'one-and-half-to-two-hours', label: '1,5 – 2 часа' },
    { id: 'two-to-three-hours', label: '2 – 3 часа' },
    { id: 'over-three-hours', label: 'больше 3 часов' },
    { id: 'any-time', label: 'без ограничений' },
  ],
  budget: [
    { id: 'free', label: 'бесплатно' },
    { id: 'under-500', label: 'до 500 ₽' },
    { id: 'under-1500', label: 'до 1500 ₽' },
    { id: 'under-3000', label: 'до 3000 ₽' },
    { id: 'any-budget', label: 'без ограничений' },
  ],
  place: [
    { id: 'home', label: 'дома' },
    { id: 'outside', label: 'на улице' },
    { id: 'somewhere-to-go', label: 'куда-нибудь\nсходить' },
    { id: 'any-place', label: 'неважно' },
  ],
  mood: [
    { id: 'socializing', label: 'общения' },
    { id: 'quiet-rest', label: 'спокойного\nотдыха' },
    { id: 'creativity', label: 'творчества' },
    { id: 'new-impressions', label: 'новых\nвпечатлений' },
    { id: 'activity', label: 'активности' },
    { id: 'socializing-more', label: 'общения' },
    { id: 'new-acquaintances', label: 'новых\nзнакомств' },
  ],
};

export default function ParametersScreen() {
  const [participants, setParticipants] = useState(1);
  const [selected, setSelected] = useState<SelectionState>({
    time: [],
    budget: [],
    place: [],
    mood: [],
  });
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentWidth = Math.min(width - 40, 440);
  const gridChipWidth = (contentWidth - 18) / 4;
  const pageTitleFontSize = Math.min(29, Math.max(22, contentWidth * 0.07));

  function updateSelection(group: SelectionGroup, id: string) {
    setSelected(current => {
      const values = current[group];
      const isSingleChoice = group === 'time' || group === 'budget';
      const nextValues = isSingleChoice
        ? [id]
        : values.includes(id) ? values.filter(value => value !== id) : [...values, id];

      return { ...current, [group]: nextValues };
    });
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            width: contentWidth,
            paddingTop: Math.max(12, insets.top + 8),
            paddingBottom: 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => router.back()} />
        <Text
          accessibilityRole="header"
          style={[styles.title, { fontSize: pageTitleFontSize, lineHeight: pageTitleFontSize * 1.24 }]}
        >
          Какой план сегодня?
        </Text>
        <ParticipantStepper value={participants} min={1} max={10} onChange={setParticipants} />
        <SelectionSection
          title="Сколько есть времени?"
          options={options.time}
          selectedIds={selected.time}
          mode="single"
          layout="horizontal"
          onSelect={id => updateSelection('time', id)}
        />
        <SelectionSection
          title="Какой бюджет?"
          options={options.budget}
          selectedIds={selected.budget}
          mode="single"
          layout="horizontal"
          onSelect={id => updateSelection('budget', id)}
        />
        <SelectionSection
          title="Где хочется провести время?"
          options={options.place}
          selectedIds={selected.place}
          mode="multiple"
          layout="wrap"
          onSelect={id => updateSelection('place', id)}
          chipWidth={gridChipWidth}
        />
        <SelectionSection
          title="Чего хочется сейчас?"
          options={options.mood}
          selectedIds={selected.mood}
          mode="multiple"
          layout="wrap"
          onSelect={id => updateSelection('mood', id)}
          chipWidth={gridChipWidth}
        />
        <ActionButton
          title="ПРЕДЛОЖИТЬ ЗАНЯТИЕ"
          variant="indigo"
          onPress={() => router.push('/(tabs)/home/recommendation')}
          style={styles.submitButton}
          labelStyle={styles.submitLabel}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7DFF0',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignSelf: 'center',
    flexGrow: 1,
  },
  title: {
    marginTop: 24,
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    fontSize: 29,
    lineHeight: 36,
    textAlign: 'center',
  },
  submitButton: {
    minHeight: 48,
    marginTop: 22,
    marginHorizontal: 18,
  },
  submitLabel: {
    fontFamily: 'BulbasaurSP',
    fontSize: 19,
  },
});
