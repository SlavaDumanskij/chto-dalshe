import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingButton } from '../components/OnboardingButton';
import { WelcomeArtwork } from '../components/WelcomeArtwork';
import { BrandMark, BrandStar } from '../components/BrandMark';
import { onboarding as palette } from '../theme/onboarding';

export default function WelcomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <View style={styles.frame}>
        <View pointerEvents="none" style={styles.background} />
        <ScrollView contentContainerStyle={[styles.content, { minHeight: height, paddingTop: Math.max(50, insets.top + 16), paddingBottom: Math.max(38, insets.bottom + 16) }]}>
          <View style={styles.brand} accessibilityLabel="ЧтоДальше">
            <BrandMark />
            <Text style={styles.brandName}>ЧтоДальше</Text>
          </View>
          <View style={styles.artwork}><WelcomeArtwork /></View>
          <Text style={styles.question}>-Не знаешь чем заняться?</Text>
          <Text style={styles.description}>{'Расскажи,\nсколько у тебя времени\nи чего хочется,\nа мы предложим\nподходящий вариант'}</Text>
          <View style={styles.spacer} />
          <View style={styles.action}><OnboardingButton title="начать" large onPress={() => router.push('/interests')} /></View>
          <View style={styles.tagline} accessibilityLabel="Меньше выбора. Больше жизни">
            <Text style={styles.taglineText}>{'МЕНЬШЕ\nВЫБОРА.'}</Text>
            <View style={styles.star}><BrandStar /></View>
            <Text style={styles.taglineText}>{'БОЛЬШЕ\nЖИЗНИ'}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#EEEDF4', alignItems: 'center' },
  frame: { flex: 1, width: '100%', maxWidth: 430, overflow: 'hidden', backgroundColor: palette.lavender },
  background: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundImage: 'radial-gradient(ellipse at 83% 10%, #D5A3DA 0%, #D5A3DA 24%, transparent 49%), linear-gradient(40deg, #A5A5D2 0%, #A5A5D2 35%, #F6F6F2 53%, #F6F6F2 100%)' },
  content: { paddingHorizontal: 26 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 7 },
  brandName: { color: '#39396E', fontSize: 25, fontFamily: 'BulbasaurSP', flexShrink: 1 },
  artwork: { marginTop: 32 },
  question: { marginTop: 50, color: palette.plum, fontFamily: 'EtudeNoireBold', fontSize: 20, lineHeight: 26, textAlign: 'center' },
  description: { marginTop: 24, color: palette.ink, fontSize: 20, lineHeight: 21, fontFamily: 'EtudeNoireBold' },
  spacer: { flexGrow: 1, minHeight: 100 },
  action: { marginHorizontal: 17 },
  tagline: { alignItems: 'center', marginTop: 44 },
  taglineText: { color: '#F1F1EE', fontSize: 19, lineHeight: 18, fontFamily: 'BulbasaurSP', textAlign: 'center' },
  star: { marginVertical: -7 },
});
