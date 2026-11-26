import { useState, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { interests, type Interest } from '../data/interests';
import { onboarding as palette } from '../theme/onboarding';

type Props = {
  selectedIds?: readonly string[];
  onToggle?: (id: string) => void;
  gap?: number;
  style?: StyleProp<ViewStyle>;
};

const emptySelection: readonly string[] = [];

export function InterestGrid({ selectedIds = emptySelection, onToggle, gap = 12, style }: Props) {
  const [gridWidth, setGridWidth] = useState(0);
  const cardSize = Math.max(0, (gridWidth - gap * 2) / 3);

  function measureGrid(event: LayoutChangeEvent) {
    const nextWidth = event.nativeEvent.layout.width;
    setGridWidth(current => current === nextWidth ? current : nextWidth);
  }

  return (
    <View onLayout={measureGrid} style={[styles.grid, { gap }, style]}>
      {interests.map((interest, index) => (
        <InterestTile
          key={interest.id}
          interest={interest}
          index={index}
          size={cardSize}
          selected={selectedIds.includes(interest.id)}
          onPress={onToggle ? () => onToggle(interest.id) : undefined}
        />
      ))}
    </View>
  );
}

type TileProps = {
  interest: Interest;
  index: number;
  size: number;
  selected: boolean;
  onPress?: () => void;
};

function InterestTile({ interest, index, size, selected, onPress }: TileProps) {
  const cardStyle = [
    styles.card,
    { width: size, minHeight: size },
    index < 3 && styles.topCard,
    selected && styles.selectedCard,
  ];
  const content = (
    <>
      {selected && <Text style={styles.check} accessible={false}>✓</Text>}
      <Text style={[styles.cardText, { fontSize: Math.min(12, size / 8.5) }]}>{interest.label}</Text>
    </>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={interest.label.replace('\n', ' ')} style={cardStyle}>
        {content}
      </View>
    );
  }

  const checked = selected;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={interest.label.replace('\n', ' ')}
      accessibilityState={{ checked }}
      aria-checked={checked}
      onPress={onPress}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { borderRadius: 23, backgroundColor: palette.card, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, paddingVertical: 16, overflow: 'hidden', boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.23)' },
  topCard: { backgroundImage: 'linear-gradient(to bottom, #EBDDFA 0%, #D8BFF6 18%, #CCADF5 44%, #CCADF5 100%)' },
  selectedCard: { backgroundColor: palette.selected, backgroundImage: 'linear-gradient(to bottom, #AE8CE3, #AE8CE3)', boxShadow: 'inset 0px 0px 0px 2px #48075B, 0px 4px 5px rgba(0, 0, 0, 0.23)' },
  pressed: { transform: [{ scale: 0.96 }] },
  cardText: { color: palette.white, fontSize: 12, lineHeight: 14, fontFamily: 'EtudeNoireBold', textAlign: 'center' },
  check: { position: 'absolute', right: 7, top: 3, color: palette.plum, fontSize: 15, fontWeight: '900' },
});
