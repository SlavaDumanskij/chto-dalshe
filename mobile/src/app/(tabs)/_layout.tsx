import { Tabs } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarLabel: 'Главная',
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarLabel: 'Избранное',
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarLabel: 'История',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarLabel: 'Профиль',
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}