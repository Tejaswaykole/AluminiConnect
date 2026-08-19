import { Tabs, useRouter, usePathname, Redirect } from 'expo-router';
import { View, useWindowDimensions, TouchableOpacity, Text, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../hooks/useUser';
import { ActivityIndicator, Text as RNText } from 'react-native';
export default function AlumniLayout() {
  const router = useRouter();
  const { data: ALUMNI_USER, isLoading } = useUser();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const isDesktop = width >= 1024;
  
  if (isLoading) return <ActivityIndicator className="m-auto" />;
  if (!ALUMNI_USER) {
    return <Redirect href="/login" />;
  }

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/alumni' },
    { name: 'Opportunities', icon: 'work', href: '/alumni/opportunities' },
    { name: 'Profile', icon: 'account_circle', href: '/alumni/profile' },
  ];

  return (
    <View className="flex-1 flex-row bg-alumni-background w-full h-full">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <View 
          className="w-[280px] h-full bg-alumni-surface-container-low border-r border-alumni-outline-variant flex-col p-4 z-40"
          style={Platform.OS === 'web' ? { position: 'sticky', top: 0, height: '100vh' } as any : {}}
        >
          {/* Header */}
          <View className="flex-row items-center gap-4 mb-4">
            <Image 
              source={{ uri: ALUMNI_USER.avatar }} 
              className="w-12 h-12 rounded-full border-2 border-alumni-surface"
              resizeMode="cover"
            />
            <View className="flex-col">
              <Text className="text-[20px] font-bold text-alumni-primary">{ALUMNI_USER.name}</Text>
              <Text className="text-[12px] text-alumni-on-surface-variant">Class of '18</Text>
            </View>
          </View>

          {/* Navigation Links */}
          <View className="flex-col gap-2 flex-grow mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/alumni' && pathname.startsWith(item.href));
              
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => router.push(item.href as any)}
                  className={`flex-row items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-alumni-primary-container' 
                      : 'hover:bg-alumni-surface-container-high'
                  }`}
                >
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={isActive ? '#dad7ff' : '#5b598c'} 
                  />
                  <Text 
                    className={`text-[14px] font-medium ${
                      isActive ? 'text-alumni-on-primary-container font-bold' : 'text-alumni-secondary'
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom Actions */}
          <View className="mt-auto pt-4 border-t border-alumni-outline-variant">
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              className="flex-row items-center gap-3 px-4 py-3 rounded-lg hover:bg-alumni-surface-container-high transition-colors"
            >
              <MaterialIcons name="logout" size={24} color="#5b598c" />
              <Text className="text-[14px] font-medium text-alumni-secondary">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content Area with Mobile Bottom Tabs */}
      <View className="flex-1 h-full w-full bg-alumni-background">
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
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
