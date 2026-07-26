import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';
import { ALUMNI_USER } from '../../mocks';

export default function AlumniLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'home', label: 'Dashboard', icon: 'home', href: '/alumni' },
    { name: 'network', label: 'Network', icon: 'groups', href: '/alumni/discover' },
    { name: 'mentorship', label: 'Mentoring', icon: 'handshake', href: '/alumni/mentorship' },
    { name: 'jobs', label: 'Job Board', icon: 'work', href: '/alumni/opportunities' },
    { name: 'events', label: 'Events', icon: 'event', href: '/alumni/events' },
    { name: 'profile', label: 'My Profile', icon: 'person', href: '/alumni/profile' },
  ];

  return (
    <View className="flex-1 flex-row bg-background w-full h-full">
      {isDesktop && <Sidebar items={sidebarItems} user={ALUMNI_USER} />}
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
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="discover"
            options={{
              title: 'Network',
              tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="mentorship"
            options={{
              title: 'Mentoring',
              tabBarIcon: ({ color }) => <MaterialIcons name="handshake" size={24} color={color} />,
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
            name="events"
            options={{
              title: 'Events',
              tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} />,
            }}
          />

          <Tabs.Screen name="profile" options={{ href: null }} />
          <Tabs.Screen name="settings" options={{ href: null }} />
          <Tabs.Screen name="communities" options={{ href: null }} />
          <Tabs.Screen name="contributions" options={{ href: null }} />
          <Tabs.Screen name="notifications" options={{ href: null }} />
          <Tabs.Screen name="messages" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
