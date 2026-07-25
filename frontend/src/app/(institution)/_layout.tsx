import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';

export default function AdminLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'dashboard', label: 'Dashboard', icon: 'bar-chart', href: '/(institution)' },
    { name: 'users', label: 'User Directory', icon: 'groups', href: '/(institution)/users' },
    { name: 'content', label: 'Content Hub', icon: 'article', href: '/(institution)/content' },
    { name: 'settings', label: 'Settings', icon: 'settings', href: '/(institution)/settings' },
  ];

  const user = {
    name: 'Institution Admin',
    role: 'Administrator',
    avatar: ''
  };

  return (
    <View className="flex-1 flex-row bg-background w-full h-full">
      {isDesktop && <Sidebar items={sidebarItems} user={user} />}
      <View className="flex-1 h-full w-full">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e2e8f0',
              elevation: 0,
              shadowOpacity: 0,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#154539',
            tabBarInactiveTintColor: '#64748b',
            tabBarLabelStyle: {
              fontFamily: 'System',
              fontWeight: '500',
              fontSize: 12,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }) => <MaterialIcons name="bar-chart" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="users"
            options={{
              title: 'Users',
              tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="content"
            options={{
              title: 'Content',
              tabBarIcon: ({ color }) => <MaterialIcons name="article" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
            }}
          />
          
          {/* Hidden */}
          <Tabs.Screen name="mentorship" options={{ href: null }} />
          <Tabs.Screen name="analytics" options={{ href: null }} />
          <Tabs.Screen name="notifications" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
