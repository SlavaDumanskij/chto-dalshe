import { useCallback, useMemo, useRef, useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '../../../shared/ui/ActionButton';
import { RecommendationIcon, type RecommendationIconName } from './RecommendationIcon';

type Activity = {
  id: string;
  title: string;
  duration: string;
  participants: string;
  budget: string;
  place: string;
};

type SwipeDirection = 'left' | 'right';

const activities: Activity[] = [
  {
    id: 'conversation-without-phones',
    title: 'Разговор без телефонов',
    duration: 'от 25 минут',
    participants: '2–10 человек',
    budget: 'бесплатно',
    place: 'дома / на улице /\nкуда-нибудь сходить',
  },
  {
    id: 'board-game-tournament',
    title: 'Домашний турнир в настольные игры',
    duration: 'от 40 минут',
    participants: '2–6 человек',
    budget: 'бесплатно',
    place: 'дома',
  },
  {
    id: 'walk-without-route',
    title: 'Прогулка без маршрута',
    duration: 'от 30 минут',
    participants: '1–10 человек',
    budget: 'бесплатно',
    place: 'на улице',
  },
  {
    id: 'cook-together',
    title: 'Приготовить ужин вместе',
    duration: 'около часа',
    participants: '2–8 человек',
    budget: 'до 1500 ₽',
    place: 'дома',
  },
  {
    id: 'photo-hunt',
    title: 'Фотоохота в своём городе',
    duration: 'от 45 минут',
    participants: '2–10 человек',
    budget: 'бесплатно',
    place: 'на улице / куда-нибудь сходить',
  },
];

const iconFacts: { icon: RecommendationIconName; key: keyof Pick<Activity, 'duration' | 'participants' | 'budget' | 'place'> }[] = [
  { icon: 'clock', key: 'duration' },
  { icon: 'participants', key: 'participants' },
  { icon: 'budget', key: 'budget' },
  { icon: 'place', key: 'place' },
];

export default function RecommendationScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentWidth = Math.min(width - 28, 420);
  const titleSize = Math.min(35, Math.max(28, contentWidth * 0.084));
  const cardScale = Math.max(0.8, contentWidth / 420);
  const cardHeight = contentWidth * 1.28 + Math.max(0, 330 - contentWidth) * 0.8;
  const imageHeight = contentWidth * 0.46;
  const footerButtonWidth = (contentWidth * 0.8 - 12) / 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const position = useRef(new Animated.ValueXY()).current;

  const advanceCard = useCallback((direction: SwipeDirection) => {
    if (isAnimating.current || currentIndexRef.current >= activities.length) {
      return;
    }

    isAnimating.current = true;
    const sign = direction === 'right' ? 1 : -1;

    Animated.timing(position, {
      toValue: { x: sign * (width + 100), y: 0 },
      duration: 260,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        position.setValue({ x: 0, y: 0 });
        isAnimating.current = false;
        return;
      }

      const nextIndex = currentIndexRef.current + 1;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      position.setValue({ x: 0, y: 0 });
      isAnimating.current = false;
    });
  }, [position, width]);

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_event, gesture) =>
      Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderMove: (_event, gesture) => {
      position.setValue({ x: gesture.dx, y: Math.max(-40, Math.min(40, gesture.dy * 0.16)) });
    },
    onPanResponderRelease: (_event, gesture) => {
      const threshold = Math.max(86, width * 0.22);
      const hasFastHorizontalSwipe = Math.abs(gesture.dx) > 30 && Math.abs(gesture.vx) > 0.8;

      if (gesture.dx > threshold || (hasFastHorizontalSwipe && gesture.vx > 0)) {
        advanceCard('right');
        return;
      }

      if (gesture.dx < -threshold || (hasFastHorizontalSwipe && gesture.vx < 0)) {
        advanceCard('left');
        return;
      }

      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        tension: 82,
        friction: 10,
      }).start();
    },
  }), [advanceCard, position, width]);

  const rotation = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });
  const activeCardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate: rotation },
    ],
  };
  const stackedActivities = activities.slice(currentIndex, currentIndex + 3).reverse();
  const finished = currentIndex >= activities.length;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            width: contentWidth,
            paddingTop: Math.max(24, insets.top + 8),
            paddingBottom: 16,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text accessibilityRole="header" style={[styles.pageTitle, { fontSize: titleSize, lineHeight: titleSize * 1.2 }]}>
          Вот твоя идея!
        </Text>

        {finished ? (
          <View style={[styles.finishedState, { minHeight: cardHeight }]}>
            <Text style={styles.finishedTitle}>Идеи закончились</Text>
            <Text style={styles.finishedText}>В этой серии больше нет вариантов.</Text>
            <ActionButton
              title="Назад к параметрам"
              variant="indigo"
              onPress={() => router.back()}
              style={styles.restartButton}
              labelStyle={styles.acceptLabel}
            />
          </View>
        ) : (
          <>
            <View style={[styles.cardStack, { width: contentWidth, height: cardHeight + 22 }]}>
              {stackedActivities.map((activity, layerIndex) => {
                const depth = stackedActivities.length - layerIndex - 1;
                const isFront = depth === 0;

                return (
                  <Animated.View
                    key={activity.id}
                    {...(isFront ? panResponder.panHandlers : {})}
                    pointerEvents={isFront ? 'auto' : 'none'}
                    style={[
                      styles.cardLayer,
                      {
                        zIndex: layerIndex + 1,
                        elevation: layerIndex + 1,
                        transform: [{ translateY: depth * 10 }, { scale: 1 - depth * 0.035 }],
                      },
                      isFront ? activeCardStyle : undefined,
                    ]}
                  >
                    <ActivityCard activity={activity} cardHeight={cardHeight} imageHeight={imageHeight} scale={cardScale} />
                  </Animated.View>
                );
              })}
            </View>

            <View style={styles.cardActions}>
              <ActionButton
                title="Займусь этим"
                variant="plum"
                icon={<RecommendationIcon name="check" size={29} />}
                onPress={() => advanceCard('right')}
                style={styles.acceptButton}
                labelStyle={styles.acceptLabel}
              />
              <View style={styles.footerButtons}>
                <ActionButton
                  title="Назад"
                  variant="indigo"
                  icon={<RecommendationIcon name="back" size={27} />}
                  onPress={() => router.back()}
                  style={[styles.footerButton, { width: footerButtonWidth }]}
                  labelStyle={styles.footerLabel}
                />
                <ActionButton
                  title="Другое"
                  variant="indigo"
                  icon={<RecommendationIcon name="shuffle" size={27} />}
                  onPress={() => advanceCard('left')}
                  style={[styles.footerButton, { width: footerButtonWidth }]}
                  labelStyle={styles.footerLabel}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

type ActivityCardProps = {
  activity: Activity;
  cardHeight: number;
  imageHeight: number;
  scale: number;
};

function ActivityCard({ activity, cardHeight, imageHeight, scale }: ActivityCardProps) {
  return (
    <View style={[styles.card, { height: cardHeight }]}>
      <View style={[styles.imageFrame, { height: imageHeight }]}>
        <Image
          source={require('../../../../assets/images/recommendation-dummy.png')}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.favorite}>
          <RecommendationIcon name="heart" size={38} />
        </View>
      </View>

      <View style={[styles.cardBody, { paddingHorizontal: 17 * scale, paddingTop: 20 * scale, paddingBottom: 20 * scale }]}>
        <Text
          style={[styles.activityTitle, { fontSize: 22 * scale, lineHeight: 28 * scale }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {activity.title}
        </Text>
        <View style={[styles.facts, { marginTop: 20 * scale, gap: 8 * scale }]}>
          {iconFacts.map(({ icon, key }) => (
            <View key={key} style={[styles.factRow, { minHeight: 38 * scale, gap: 13 * scale }]}>
              <View style={[styles.factIcon, { width: 34 * scale }]}>
                <RecommendationIcon name={icon} size={24 * scale} color="#A063B1" />
              </View>
              <Text style={[styles.factLabel, { fontSize: 16 * scale, lineHeight: 19 * scale }]}>{activity[key]}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.detailsRow, { minHeight: 50 * scale, gap: 8 * scale, marginTop: 22 * scale }]}>
          <Text style={[styles.detailsText, { fontSize: 11 * scale, lineHeight: 13 * scale }]}>подробнее расскажем о правилах и подготовке</Text>
          <ActionButton
            title="Хочу узнать подробнее"
            variant="plum"
            icon={<RecommendationIcon name="arrow-right" size={28} />}
            style={[styles.moreButton, { minHeight: 52 * scale, paddingHorizontal: 9 * scale }]}
            labelStyle={[styles.moreLabel, { fontSize: 14 * scale, lineHeight: 15 * scale }]}
          />
        </View>
      </View>
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
  pageTitle: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    textAlign: 'center',
    marginBottom: 42,
  },
  cardStack: {
    alignSelf: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  cardLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  card: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#D0A0D9',
  },
  imageFrame: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  cardBody: {
    flex: 1,
  },
  activityTitle: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    fontSize: 22,
    lineHeight: 28,
  },
  facts: {
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factIcon: {
    alignItems: 'center',
  },
  factLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'BulbasaurSP',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    flex: 1,
    color: '#A063B1',
    fontFamily: 'EtudeNoireBold',
  },
  moreButton: {
    width: '49%',
  },
  moreLabel: {
    fontFamily: 'BulbasaurSP',
    textAlign: 'left',
  },
  cardActions: {
    marginTop: 20,
  },
  acceptButton: {
    width: '80%',
    alignSelf: 'center',
    minHeight: 45,
  },
  acceptLabel: {
    fontFamily: 'BulbasaurSP',
    fontSize: 16,
  },
  footerButtons: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  footerButton: {
    minHeight: 44,
    backgroundColor: '#6872BA',
    paddingHorizontal: 10,
  },
  footerLabel: {
    fontFamily: 'BulbasaurSP',
    fontSize: 15,
  },
  finishedState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#D0A0D9',
  },
  finishedTitle: {
    color: '#101014',
    fontFamily: 'BulbasaurSP',
    fontSize: 26,
    textAlign: 'center',
  },
  finishedText: {
    marginTop: 12,
    marginBottom: 24,
    color: '#FFFFFF',
    fontFamily: 'EtudeNoireBold',
    fontSize: 16,
    textAlign: 'center',
  },
  restartButton: {
    width: '90%',
    minHeight: 48,
  },
});
