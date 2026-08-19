import { Tabs, useRouter, usePathname } from 'expo-router';
import { View, useWindowDimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Platform Control', icon: 'dashboard', href: '/admin' },
    { name: 'User Management', icon: 'people', href: '/admin/users' },
    { name: 'System Settings', icon: 'settings', href: '/admin/settings' },
  ];

  return (
    <View className="flex-1 flex-row bg-admin-background w-full h-full">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <View 
          className="w-[280px] h-full bg-admin-surface-container-low border-r border-admin-outline-variant flex-col p-4 z-40"
          style={Platform.OS === 'web' ? { position: 'sticky', top: 0, height: '100vh' } as any : {}}
        >
          {/* Header */}
          <View className="flex-col gap-1 mb-8 pt-4 px-2">
            <Text className="text-[20px] font-bold text-admin-primary">System Admin</Text>
            <Text className="text-[12px] text-admin-on-surface-variant">AlumniConnect Control</Text>
          </View>

          {/* Navigation Links */}
          <View className="flex-col gap-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => router.push(item.href as any)}
                  className={`flex-row items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-admin-primary-container' 
                      : 'hover:bg-admin-surface-container-high'
                  }`}
                >
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={isActive ? '#dad7ff' : '#5b598c'} 
                  />
                  <Text 
                    className={`text-[14px] font-medium ${
                      isActive ? 'text-admin-on-primary-container font-bold' : 'text-admin-secondary'
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom Actions */}
          <View className="mt-auto pt-4 border-t border-admin-outline-variant">
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              className="flex-row items-center gap-3 px-4 py-3 rounded-lg hover:bg-admin-surface-container-high transition-colors"
            >
              <MaterialIcons name="logout" size={24} color="#5b598c" />
              <Text className="text-[14px] font-medium text-admin-secondary">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content Area with Mobile Bottom Tabs */}
      <View className="flex-1 h-full w-full bg-admin-background">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : {
              backgroundColor: '#f2f3f9',
              borderTopWidth: 1,
              borderTopColor: '#c3c4ca',
              elevation: 0,
              shadowOpacity: 0,
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#3525cd',
            tabBarInactiveTintColor: '#5b598c',
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
            name="users"
            options={{
              title: 'Users',
              tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
