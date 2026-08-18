import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';

export default function InstituteLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/institute' },
    { name: 'verification', label: 'Verification Center', icon: 'verified-user', href: '/institute/verification' },
    { name: 'students', label: 'Students', icon: 'school', href: '/institute/students' },
    { name: 'alumni', label: 'Alumni', icon: 'people', href: '/institute/alumni' },
    { name: 'announcements', label: 'Announcements', icon: 'campaign', href: '/institute/announcements' },
    { name: 'events', label: 'Events', icon: 'event', href: '/institute/events' },
    { name: 'mentorships', label: 'Mentorship Programs', icon: 'model-training', href: '/institute/mentorships' },
    { name: 'opportunities', label: 'Opportunities', icon: 'work', href: '/institute/opportunities' },
    { name: 'analytics', label: 'Analytics', icon: 'insights', href: '/institute/analytics' },
    { name: 'reports', label: 'Reports', icon: 'flag', href: '/institute/reports' },
    { name: 'settings', label: 'Settings', icon: 'settings', href: '/institute/settings' },
  ];

  const user = {
    name: 'College Admin',
    role: 'Institute',
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
              tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="verification"
            options={{
              title: 'Verify',
              tabBarIcon: ({ color }) => <MaterialIcons name="verified-user" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="opportunities"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color }) => <MaterialIcons name="work" size={24} color={color} />,
            }}
          />
          {/* Hide other screens from the mobile bottom tab bar */}
          <Tabs.Screen name="students" options={{ href: null }} />
          <Tabs.Screen name="alumni" options={{ href: null }} />
          <Tabs.Screen name="announcements" options={{ href: null }} />
          <Tabs.Screen name="events" options={{ href: null }} />
          <Tabs.Screen name="mentorships" options={{ href: null }} />
          <Tabs.Screen name="analytics" options={{ href: null }} />
          <Tabs.Screen name="reports" options={{ href: null }} />
          <Tabs.Screen name="settings" options={{ href: null }} />
          {/* We had audit and drives previously, hide them if they still exist momentarily */}
          <Tabs.Screen name="audit" options={{ href: null }} />
          <Tabs.Screen name="drives" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
