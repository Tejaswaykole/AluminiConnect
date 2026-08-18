import { Tabs, useRouter, usePathname } from 'expo-router';
import { View, useWindowDimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function InstituteLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/institution' },
    { name: 'Analytics', icon: 'insights', href: '/institution/analytics' },
    { name: 'Verification Center', icon: 'verified_user', href: '/institution/verification' },
  ];

  return (
    <View className="flex-1 flex-row bg-institute-background w-full h-full">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <View 
          className="w-[280px] h-full bg-institute-surface-container-low border-r border-institute-outline-variant flex-col p-4 z-40"
          style={Platform.OS === 'web' ? { position: 'sticky', top: 0, height: '100vh' } as any : {}}
        >
          {/* Header */}
          <View className="flex-col gap-1 mb-8 pt-4 px-2">
            <Text className="text-[20px] font-bold text-institute-primary">Institute Portal</Text>
            <Text className="text-[12px] text-institute-on-surface-variant">Alumni Connect</Text>
          </View>

          {/* Navigation Links */}
          <View className="flex-col gap-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/institution' && pathname.startsWith(item.href));
              
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => router.push(item.href as any)}
                  className={`flex-row items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-institute-primary-container' 
                      : 'hover:bg-institute-surface-container-high'
                  }`}
                >
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={isActive ? '#dad7ff' : '#5c5f61'} 
                  />
                  <Text 
                    className={`text-[14px] font-medium ${
                      isActive ? 'text-institute-on-primary-container font-bold' : 'text-institute-secondary'
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom Actions */}
          <View className="mt-auto pt-4 border-t border-institute-outline-variant">
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              className="flex-row items-center gap-3 px-4 py-3 rounded-lg hover:bg-institute-surface-container-high transition-colors"
            >
              <MaterialIcons name="logout" size={24} color="#5c5f61" />
              <Text className="text-[14px] font-medium text-institute-secondary">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content Area with Mobile Bottom Tabs */}
      <View className="flex-1 h-full w-full bg-institute-background">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : {
              backgroundColor: '#eff4ff',
              borderTopWidth: 1,
              borderTopColor: '#c7c4d8',
              elevation: 0,
              shadowOpacity: 0,
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#3525cd',
            tabBarInactiveTintColor: '#5c5f61',
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
              title: 'Overview',
              tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ color }) => <MaterialIcons name="insights" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="verification"
            options={{
              title: 'Verify',
              tabBarIcon: ({ color }) => <MaterialIcons name="verified-user" size={24} color={color} />,
            }}
          />
          {/* Hide any extraneous screens from tabs */}
          <Tabs.Screen name="audit" options={{ href: null }} />
          <Tabs.Screen name="drives" options={{ href: null }} />
          <Tabs.Screen name="settings" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
