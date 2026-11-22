import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const iconColor = '#460856';

export type BottomNavigationIconName = 'home' | 'favorites' | 'history' | 'profile';

type IconPath = {
  d: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
};

type IconDefinition = {
  width: number;
  height: number;
  viewBox: string;
  paths: IconPath[];
  circle?: { cx: number; cy: number; r: number; fill: string };
};

const icons: Record<BottomNavigationIconName, IconDefinition> = {
  home: {
    width: 41,
    height: 36,
    viewBox: '0 0 41 36',
    paths: [
      {
        d: 'M18.4123 1.2987C19.0606 -0.433035 21.5101 -0.433035 22.1584 1.2987L25.7487 10.8892C26.0411 11.6704 26.7877 12.188 27.6218 12.188H38.5671C40.5722 12.188 41.33 14.8102 39.6338 15.8798L31.289 21.1419C30.4871 21.6476 30.1504 22.6469 30.4828 23.5348L33.7805 32.3437C34.4521 34.1376 32.4609 35.7584 30.8407 34.7367L21.3521 28.7533C20.7003 28.3423 19.8703 28.3423 19.2185 28.7533L9.72995 34.7367C8.10971 35.7584 6.11855 34.1376 6.79011 32.3437L10.0879 23.5348C10.4203 22.6469 10.0836 21.6476 9.28159 21.1419L0.936783 15.8798C-0.759349 14.8102 -0.00162983 12.188 2.00357 12.188H12.9489C13.783 12.188 14.5295 11.6704 14.8219 10.8892L18.4123 1.2987Z',
        fill: iconColor,
      },
    ],
  },
  favorites: {
    width: 31,
    height: 32,
    viewBox: '0 0 31 32',
    paths: [
      {
        d: 'M4.23686 21.0145C2.09723 17.7205 0.415789 13.6871 0.0395986 9.74538C-0.41595 4.97148 3.09417 -1.9485 8.75495 0.514889C12.1216 1.97937 14.6572 5.54795 15.3478 9.1173C14.7641 6.08976 19.9911 1.41637 22.471 0.494478C25.8285 -0.753197 29.0219 0.637348 30.1932 4.10812C33.3866 13.5546 26.5038 23.8907 19.9949 30.1222C15.5386 34.3908 12.4508 30.5107 9.18149 27.1081C7.36807 25.2208 5.66684 23.2164 4.23686 21.0145Z',
        fill: iconColor,
      },
    ],
  },
  history: {
    width: 39,
    height: 39,
    viewBox: '0 0 39 39',
    circle: { cx: 19.5, cy: 19.5, r: 19.5, fill: iconColor },
    paths: [
      {
        d: 'M18.6137 8.42041C18.6137 8.42041 18.6138 19.5 18.6137 23.0454C18.6136 26.5909 28.3637 17.284 28.3637 17.284',
        fill: 'none',
        stroke: '#FFFFFF',
        strokeWidth: 5,
        strokeLinecap: 'round',
      },
    ],
  },
  profile: {
    width: 38,
    height: 39,
    viewBox: '0 0 38 39',
    paths: [
      {
        d: 'M27.5544 8.26632C27.5544 12.8317 23.6636 16.5326 18.8642 16.5326C14.0647 16.5326 10.1739 12.8317 10.1739 8.26632C10.1739 3.70096 14.0647 0 18.8642 0C23.6636 0 27.5544 3.70096 27.5544 8.26632Z',
        fill: iconColor,
      },
      {
        d: 'M37.3044 39.0001C26.2827 39.0001 28.9535 39.0001 18.6522 39.0001C8.35088 39.0001 16.9566 39.0001 0 39.0001C0 28.6988 8.35088 20.3479 18.6522 20.3479C28.9535 20.3479 37.3044 28.6988 37.3044 39.0001Z',
        fill: iconColor,
      },
    ],
  },
};

type Props = {
  name: BottomNavigationIconName;
  focused: boolean;
};

export function BottomNavigationIcon({ name, focused }: Props) {
  const icon = icons[name];

  return (
    <View
      style={[styles.frame, focused && styles.selectedFrame]}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width={icon.width} height={icon.height} viewBox={icon.viewBox}>
        {icon.circle && <Circle {...icon.circle} />}
        {icon.paths.map((path, index) => <Path key={`${name}-${index}`} {...path} />)}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFrame: {
    backgroundColor: '#CDB5D0',
  },
});
