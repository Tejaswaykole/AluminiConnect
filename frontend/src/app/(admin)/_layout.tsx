import { Tabs } from 'expo-router';
import { Typography } from '../../components/Typography';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563eb',
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
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">📊</Typography>,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">👥</Typography>,
        }}
      />
      <Tabs.Screen
        name="content"
        options={{
          title: 'Content',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">📝</Typography>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">⚙️</Typography>,
        }}
      />
      
      {/* Hidden */}
      <Tabs.Screen name="mentorship" options={{ href: null }} />
      <Tabs.Screen name="analytics" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
