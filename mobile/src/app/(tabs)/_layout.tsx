import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNavigationIcon } from '../../shared/ui/BottomNavigationIcon';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#460856',
        tabBarInactiveTintColor: '#460856',
        tabBarStyle: [
          styles.tabBar,
          {
            height: 62 + insets.bottom,
            paddingBottom: insets.bottom || 5,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Главная',
          tabBarAccessibilityLabel: 'Главная',
          tabBarIcon: ({ focused }) => <BottomNavigationIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarAccessibilityLabel: 'Избранное',
          tabBarIcon: ({ focused }) => <BottomNavigationIcon name="favorites" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarAccessibilityLabel: 'История',
          tabBarIcon: ({ focused }) => <BottomNavigationIcon name="history" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarAccessibilityLabel: 'Профиль',
          tabBarIcon: ({ focused }) => <BottomNavigationIcon name="profile" focused={focused} />,
        }}
      />
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F0EDF2',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 7,
    elevation: 0,
  },
});
