import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

// Scalable reconstruction of the three decorative icons in the Figma reference.
export function WelcomeArtwork() {
  const prefix = useId().replace(/:/g, '');
  const clock = `${prefix}-clock`;
  const heart = `${prefix}-heart`;
  const check = `${prefix}-check`;
  const edge = `${prefix}-edge`;

  return (
    <View style={styles.panel} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%" viewBox="0 0 345 159" aria-hidden={true}>
        <Defs>
          <LinearGradient id={clock} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#9560A7" /><Stop offset="1" stopColor="#B68CC1" />
          </LinearGradient>
          <LinearGradient id={heart} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#EAA5D4" /><Stop offset="0.6" stopColor="#E88AC3" /><Stop offset="1" stopColor="#ED73B2" />
          </LinearGradient>
          <RadialGradient id={check} cx="0.35" cy="0.3" rx="0.9" ry="0.9">
            <Stop offset="0" stopColor="#4C4D89" /><Stop offset="0.65" stopColor="#656097" /><Stop offset="1" stopColor="#A099C3" />
          </RadialGradient>
          <LinearGradient id={edge} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#E2D8EF" stopOpacity="0.6" /><Stop offset="1" stopColor="#C5AAD8" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        <G transform="translate(29 54)">
          <Rect x="7" y="4" width="39" height="39" rx="10" fill="#90519E" transform="rotate(-38 26 24)" />
          <G transform="rotate(-20 39 30)">
            <Rect x="18" y="9" width="45" height="45" rx="11" fill={`url(#${clock})`} stroke={`url(#${edge})`} />
            <Path d="M39 22L39 34L49 39" fill="none" stroke="#DED1E7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </G>
        </G>
        <G transform="translate(137 52)">
          <Path d="M35 51C52 55 71 47 72 37C73 29 65 23 57 25C55 18 48 17 43 21Z" fill="#FF68A6" />
          <Path d="M34 57C25 51 4 43 2 27C0 10 11 3 26 9C35-1 50 2 55 13C63 30 48 46 34 57Z" fill={`url(#${heart})`} stroke="#F3B6DE" strokeWidth="0.8" />
          <Path d="M41 13C45 13 47 16 47 20" stroke="#FFE5F3" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Path d="M61 17C56 13 59 8 62 11C66 9 69 14 64 17Z" fill="#FF69A6" />
        </G>
        <G transform="translate(260 53)">
          <Rect x="3" y="2" width="45" height="45" rx="11" fill="#8C77AA" transform="rotate(-16 25 24)" />
          <Rect x="9" y="10" width="46" height="46" rx="13" fill={`url(#${check})`} stroke={`url(#${edge})`} strokeWidth="1.2" />
          <Path d="M25 29L32 36L39 29" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="58" cy="10" r="3.3" fill="#696BA4" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { height: 159, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.75)', backgroundColor: 'rgba(255,255,255,0.13)', overflow: 'hidden' },
});
