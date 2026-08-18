import { Tabs, useRouter, usePathname } from 'expo-router';
import { View, useWindowDimensions, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { STUDENT_USER } from '../../mocks';

export default function StudentLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024; // lg breakpoint
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/student' },
    { name: 'Opportunities', icon: 'work', href: '/student/opportunities' },
    { name: 'Mentorship', icon: 'handshake', href: '/student/mentorship' },
    { name: 'Connections', icon: 'group', href: '/student/connections' },
    { name: 'Community', icon: 'forum', href: '/student/community' },
    { name: 'Profile', icon: 'account_circle', href: '/student/profile' },
  ];

  return (
    <View className="flex-1 flex-row bg-student-background w-full h-full">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <View 
          className="w-[280px] h-full bg-student-surface border-r border-student-outline-variant flex-col p-4 z-40"
          style={Platform.OS === 'web' ? { position: 'sticky', top: 0, height: '100vh' } as any : {}}
        >
          {/* Header */}
          <View className="flex-row items-center gap-4 mb-4">
            <Image 
              source={{ uri: STUDENT_USER.avatar }} 
              className="w-12 h-12 rounded-full border-2 border-student-surface"
              resizeMode="cover"
            />
            <View className="flex-col">
              <Text className="text-[24px] font-bold text-student-primary">{STUDENT_USER.name}</Text>
              <Text className="text-[12px] text-student-on-surface-variant">Computer Science Senior</Text>
            </View>
          </View>

          {/* Navigation Links */}
          <View className="flex-col gap-2 flex-grow mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));
              
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => router.push(item.href as any)}
                  className={`flex-row items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-student-primary-container' 
                      : 'hover:bg-student-surface-container-high'
                  }`}
                >
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={isActive ? '#dad7ff' : '#5c5f61'} 
                  />
                  <Text 
                    className={`text-[14px] font-medium ${
                      isActive ? 'text-student-on-primary-container font-bold' : 'text-student-secondary'
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom Actions */}
          <View className="mt-auto pt-4 border-t border-student-outline-variant">
            <TouchableOpacity 
              onPress={() => router.push('/student/settings')}
              className="flex-row items-center gap-3 px-4 py-3 rounded-lg hover:bg-student-surface-container-high transition-colors"
            >
              <MaterialIcons name="settings" size={24} color="#5c5f61" />
              <Text className="text-[14px] font-medium text-student-secondary">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content Area with Mobile Bottom Tabs */}
      <View className="flex-1 h-full w-full bg-student-background">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : {
              backgroundColor: '#eff4ff', // surface-container-low
              borderTopWidth: 1,
              borderTopColor: '#c7c4d8', // outline-variant
              elevation: 0,
              shadowOpacity: 0,
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#3525cd', // primary
            tabBarInactiveTintColor: '#5c5f61', // secondary
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
              tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
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
            name="mentorship"
            options={{
              title: 'Mentors',
              tabBarIcon: ({ color }) => <MaterialIcons name="handshake" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />,
            }}
          />
          {/* Hide these from bottom tabs to save space, accessible via other means or a 'More' tab if needed */}
          <Tabs.Screen name="connections" options={{ href: null }} />
          <Tabs.Screen name="community" options={{ href: null }} />
          <Tabs.Screen name="settings" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
