import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  clockSvg,
  heartSvg,
  homeRecommendationSvg,
  locationSvg,
  todoSvg,
} from './homeIllustrationSvg';

type IllustrationIcon = {
  name: string;
  xml: string;
  width: number;
  height: number;
  left: number;
  top: number;
};

const icons: IllustrationIcon[] = [
  { name: 'clock', xml: clockSvg, width: 0.275, height: 0.257, left: 0.12, top: 0.27 },
  { name: 'todo', xml: todoSvg, width: 0.25, height: 0.239, left: 0.5, top: 0.12 },
  { name: 'heart', xml: heartSvg, width: 0.24, height: 0.195, left: 0.5, top: 0.53 },
  { name: 'location', xml: locationSvg, width: 0.2, height: 0.193, left: 0.24, top: 0.6 },
];

type Props = {
  width: number;
  height: number;
};

export function HomeArtwork({ width, height }: Props) {
  return (
    <View
      style={[styles.stage, { width, height }]}
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View
        style={[
          styles.glow,
          {
            width: width * 0.86,
            height: width * 0.89,
            left: width * 0.07,
            top: width * 0.01,
          },
        ]}
      >
        <SvgXml xml={homeRecommendationSvg} width="100%" height="100%" />
      </View>
      {icons.map(icon => (
        <View
          key={icon.name}
          style={[
            styles.icon,
            {
              width: width * icon.width,
              height: width * icon.height,
              left: width * icon.left,
              top: width * icon.top,
            },
          ]}
        >
          <SvgXml xml={icon.xml} width="100%" height="100%" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    position: 'relative',
    alignSelf: 'center',
  },
  glow: {
    position: 'absolute',
  },
  icon: {
    position: 'absolute',
  },
});
