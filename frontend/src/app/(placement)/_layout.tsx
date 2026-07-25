import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';

export default function PlacementLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'dashboard', label: 'Dashboard', icon: 'bar-chart', href: '/(placement)' },
    { name: 'opportunities', label: 'Opportunities', icon: 'work', href: '/(placement)/opportunities' },
    { name: 'students', label: 'Students', icon: 'school', href: '/(placement)/students' },
    { name: 'drives', label: 'Drives', icon: 'event', href: '/(placement)/drives' },
  ];

  const user = {
    name: 'Placement Cell',
    role: 'Officer',
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
            name="opportunities"
            options={{
              title: 'Opportunities',
              tabBarIcon: ({ color }) => <MaterialIcons name="work" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="students"
            options={{
              title: 'Students',
              tabBarIcon: ({ color }) => <MaterialIcons name="school" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="drives"
            options={{
              title: 'Drives',
              tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} />,
            }}
          />
          
          {/* Hidden */}
          <Tabs.Screen name="notifications" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
