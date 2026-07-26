import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';

export default function CompanyLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'dashboard', label: 'Overview', icon: 'dashboard', href: '/company' },
    { name: 'recruiters', label: 'Recruiters', icon: 'group', href: '/company/recruiters' },
    { name: 'analytics', label: 'Analytics', icon: 'bar-chart', href: '/company/analytics' },
    { name: 'settings', label: 'Settings', icon: 'settings', href: '/company/settings' },
  ];

  const user = { name: 'Company Admin', role: 'Organization', avatar: '' };

  return (
    <View className="flex-1 flex-row bg-background w-full h-full">
      {isDesktop && <Sidebar items={sidebarItems} user={user} />}
      <View className="flex-1 h-full w-full">
        <Tabs screenOptions={{ headerShown: false, tabBarStyle: isDesktop ? { display: 'none' } : {} }}>
          <Tabs.Screen name="index" options={{ title: 'Overview', tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} /> }} />
          <Tabs.Screen name="recruiters" options={{ title: 'Recruiters', tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} /> }} />
          <Tabs.Screen name="analytics" options={{ title: 'Analytics', tabBarIcon: ({ color }) => <MaterialIcons name="bar-chart" size={24} color={color} /> }} />
          <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }} />
        </Tabs>
      </View>
    </View>
  );
}
