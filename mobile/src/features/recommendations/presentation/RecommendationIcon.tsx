import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type RecommendationIconName = 'heart' | 'clock' | 'participants' | 'budget' | 'place' | 'check' | 'back' | 'shuffle' | 'arrow-right';

type Props = {
  name: RecommendationIconName;
  size?: number;
  color?: string;
};

export function RecommendationIcon({ name, size = 26, color = '#FFFFFF' }: Props) {
  if (name === 'heart') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Path
          d="M16 27.2 4.6 16.4C-1 11 6.6 2.2 13.1 6.2c1.2.7 2.1 1.7 2.9 2.8.8-1.1 1.7-2.1 2.9-2.8 6.5-4 14.1 4.8 8.5 10.2L16 27.2Z"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === 'clock') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Circle cx={16} cy={16} r={15} fill={color} />
        <Path d="M16 8v8l5-3" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (name === 'participants') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Circle cx={12} cy={10} r={5} fill={color} />
        <Circle cx={23} cy={13} r={4} fill={color} opacity={0.82} />
        <Path d="M2 29c0-6.2 4.5-10 10-10s10 3.8 10 10H2Z" fill={color} />
        <Path d="M21 21c4.8 0 8 3.1 8 8h-6.4c0-3-1.1-5.5-3.2-7.1.5-.5 1-.9 1.6-.9Z" fill={color} opacity={0.82} />
      </Svg>
    );
  }

  if (name === 'budget') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Rect x={1} y={6} width={30} height={21} rx={3} fill={color} />
        <Path d="M1 12h30" stroke="#6D438C" strokeWidth={3} opacity={0.58} />
      </Svg>
    );
  }

  if (name === 'place') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path d="M16 30s12-12.2 12-19A12 12 0 1 0 4 11c0 6.8 12 19 12 19Z" fill={color} />
        <Circle cx={16} cy={11} r={4} fill="#D0A0D9" />
      </Svg>
    );
  }

  if (name === 'check') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path d="m4 16 8 8L28 6" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (name === 'back') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path d="M14 5 3 16l11 11M4 16h25" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (name === 'shuffle') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path d="m5 6 22 21M27 6 5 27M22 6h5v5M22 27h5v-5" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path d="M4 16h23M18 7l9 9-9 9" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
