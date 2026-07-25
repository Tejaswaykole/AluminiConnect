import { Tabs } from 'expo-router';
import { Typography } from '../../components/Typography';

export default function AlumniLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0', // border-border
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563eb', // primary
        tabBarInactiveTintColor: '#64748b', // text-muted
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
        name="discover"
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
        name="communities"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">💬</Typography>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Typography color={color === '#2563eb' ? 'primary' : 'muted'} className="text-xl">👤</Typography>,
        }}
      />

      {/* Hide these from bottom tabs but allow stack navigation to them */}
      <Tabs.Screen name="events" options={{ href: null }} />
      <Tabs.Screen name="mentorship" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
