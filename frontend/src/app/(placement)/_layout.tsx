import { Tabs } from 'expo-router';
import { Typography } from '../../components/Typography';

export default function PlacementLayout() {
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
          title: 'Home',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">🏠</Typography>,
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">🎓</Typography>,
        }}
      />
      <Tabs.Screen
        name="opportunities"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">💼</Typography>,
        }}
      />
      <Tabs.Screen
        name="drives"
        options={{
          title: 'Drives',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">🏢</Typography>,
        }}
      />
      
      {/* Hidden from tabs but available in stack */}
      <Tabs.Screen name="alumni" options={{ href: null }} />
      <Tabs.Screen name="reports" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
