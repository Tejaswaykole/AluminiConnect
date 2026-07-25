import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';
import { useCurrentUser } from '../../hooks/queries';

export default function StudentLayout() {
  const { data: user } = useCurrentUser();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'home', label: 'Home', icon: 'home', href: '/(student)' },
    { name: 'alumni', label: 'Alumni Network', icon: 'groups', href: '/(student)/discover' },
    { name: 'jobs', label: 'Jobs & Internships', icon: 'work', href: '/(student)/opportunities' },
    { name: 'groups', label: 'Communities', icon: 'forum', href: '/(student)/communities' },
    { name: 'profile', label: 'My Profile', icon: 'person', href: '/(student)/profile' },
  ];

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
              title: 'Home',
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="discover"
            options={{
              title: 'Alumni',
              tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="opportunities"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color }) => <MaterialIcons name="work" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="communities"
            options={{
              title: 'Groups',
              tabBarIcon: ({ color }) => <MaterialIcons name="forum" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
            }}
          />

          {/* Hide these from bottom tabs but allow stack navigation to them */}
          <Tabs.Screen name="events" options={{ href: null }} />
          <Tabs.Screen name="mentorship" options={{ href: null }} />
          <Tabs.Screen name="notifications" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
