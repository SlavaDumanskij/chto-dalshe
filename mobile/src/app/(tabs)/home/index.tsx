import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '../../../shared/ui/ActionButton';
import { BrandMark } from '../../../shared/ui/BrandMark';
import { HomeArtwork } from '../../../shared/ui/HomeArtwork';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentWidth = Math.min(width - 32, 440);
  const artworkHeight = contentWidth * 0.92;
  const brandNameSize = Math.min(31, Math.max(24, contentWidth * 0.075));
  const titleSize = Math.min(25, Math.max(20, contentWidth * 0.057));
  const subtitleSize = Math.min(14, Math.max(11, contentWidth * 0.032));
  const sloganSize = Math.min(27, Math.max(20, contentWidth * 0.06));
  const descriptionSize = Math.min(13, Math.max(11, contentWidth * 0.03));
  const buttonHeight = Math.min(52, contentWidth * 0.116);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(20, insets.top + 4),
            paddingBottom: Math.max(20, insets.bottom + 12),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: contentWidth }}>
          <View style={styles.brand}>
            <BrandMark size={52} />
            <Text style={[styles.brandName, { fontSize: brandNameSize }]}>
              ЧтоДальше
            </Text>
          </View>

          <View style={styles.intro}>
            <Text
              style={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.2 }]}
              numberOfLines={1}
            >
              Чем займемся сегодня?
            </Text>
            <Text style={[styles.subtitle, { fontSize: subtitleSize, lineHeight: subtitleSize * 1.2 }]}>
              подберём занятие под твои планы
            </Text>
          </View>

          <View style={[styles.card, { height: contentWidth * 1.4 }]}>
            <HomeArtwork width={contentWidth} height={artworkHeight} />
            <View style={[styles.cardBody, { paddingHorizontal: contentWidth * 0.078, paddingBottom: contentWidth * 0.045 }]}>
              <Text style={[styles.slogan, { fontSize: sloganSize, lineHeight: sloganSize * 0.94 }]}>
                {'ВРЕМЯ ЕСТЬ.\nИДЕЯ НАЙДЁТСЯ'}
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    marginTop: contentWidth * 0.025,
                    fontSize: descriptionSize,
                    lineHeight: descriptionSize * 1.05,
                  },
                ]}
              >
                {'немного о твоём настроении —\nи один вариант, который\nзахочется попробовать'}
              </Text>
              <ActionButton
                title="ПОДОБРАТЬ ЗАНЯТИЕ"
                onPress={() => router.push('/(tabs)/home/parameters')}
                style={[styles.primaryButton, { height: buttonHeight, marginTop: contentWidth * 0.035 }]}
                labelStyle={{ fontSize: Math.min(21, contentWidth * 0.048) }}
              />
            </View>
          </View>

          <ActionButton
            title="УДИВИ МЕНЯ"
            variant="white"
            onPress={() => router.push('/(tabs)/home/recommendation')}
            style={[styles.secondaryButton, { height: buttonHeight }]}
            labelStyle={{ fontSize: Math.min(22, contentWidth * 0.05) }}
          />
          <Text style={[styles.hint, { fontSize: Math.min(13, Math.max(11, contentWidth * 0.03)) }]}>
            Подбор активности без условий.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E7DFF0',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  brandName: {
    color: '#39396E',
    fontFamily: 'BulbasaurSP',
    flexShrink: 1,
  },
  intro: {
    alignItems: 'center',
    marginTop: 18,
  },
  title: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    textAlign: 'center',
  },
  subtitle: {
    color: '#101014',
    fontFamily: 'EtudeNoireBold',
    marginTop: 2,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    marginTop: 11,
    borderRadius: 31,
    backgroundColor: '#D0A0D9',
    overflow: 'hidden',
  },
  cardBody: {
    flex: 1,
    width: '100%',
  },
  slogan: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
  },
  description: {
    color: '#101014',
    fontFamily: 'EtudeNoireBold',
  },
  primaryButton: {
    minHeight: 48,
    width: '100%',
    borderRadius: 999,
    paddingHorizontal: 8,
  },
  secondaryButton: {
    minHeight: 48,
    width: '86%',
    alignSelf: 'center',
    borderRadius: 999,
    marginTop: 14,
  },
  hint: {
    color: '#8062AA',
    fontFamily: 'EtudeNoireBold',
    textAlign: 'center',
    marginTop: 8,
  },
});
