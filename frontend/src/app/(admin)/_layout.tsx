import { Tabs } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Sidebar, SidebarItem } from '../../components/Sidebar';

export default function AdminLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const sidebarItems: SidebarItem[] = [
    { name: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/(admin)' },
    { name: 'users', label: 'User Management', icon: 'groups', href: '/(admin)/users' },
    { name: 'permissions', label: 'Roles & Permissions', icon: 'admin-panel-settings', href: '/(admin)/permissions' },
    { name: 'moderation', label: 'Moderation', icon: 'gavel', href: '/(admin)/moderation' },
    { name: 'announcements', label: 'Announcements', icon: 'campaign', href: '/(admin)/announcements' },
    { name: 'analytics', label: 'Analytics', icon: 'insights', href: '/(admin)/analytics' },
    { name: 'audit-logs', label: 'Audit Logs', icon: 'manage-search', href: '/(admin)/audit-logs' },
    { name: 'security', label: 'Security', icon: 'security', href: '/(admin)/security' },
    { name: 'system', label: 'System Health', icon: 'dns', href: '/(admin)/system' },
    { name: 'settings', label: 'Settings', icon: 'settings', href: '/(admin)/settings' },
  ];

  const user = {
    name: 'Super Admin',
    role: 'Admin',
    avatar: ''
  };

  return (
    <View className="flex-1 flex-row bg-admin-background w-full h-full">
      {isDesktop && <Sidebar items={sidebarItems} user={user} className="bg-admin-surface-card" activeBgColor="bg-admin-primary-container" activeTextColor="text-admin-on-primary-container" inactiveHoverColor="hover:bg-admin-surface-container" />}
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
            tabBarActiveTintColor: '#3525cd', // admin-primary
            tabBarInactiveTintColor: '#464555', // admin-on-surface-variant
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
            name="users"
            options={{
              title: 'Users',
              tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="moderation"
            options={{
              title: 'Moderate',
              tabBarIcon: ({ color }) => <MaterialIcons name="gavel" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Menu',
              tabBarIcon: ({ color }) => <MaterialIcons name="menu" size={24} color={color} />,
            }}
          />
          
          {/* Hidden from bottom tab bar on mobile */}
          <Tabs.Screen name="permissions/index" options={{ href: null }} />
          <Tabs.Screen name="announcements/index" options={{ href: null }} />
          <Tabs.Screen name="analytics/index" options={{ href: null }} />
          <Tabs.Screen name="audit-logs/index" options={{ href: null }} />
          <Tabs.Screen name="security/index" options={{ href: null }} />
          <Tabs.Screen name="system/index" options={{ href: null }} />
          <Tabs.Screen name="profile/index" options={{ href: null }} />
          
          <Tabs.Screen name="users/[id]" options={{ href: null }} />
          
          {/* Legacy routes, hidden */}
          <Tabs.Screen name="content" options={{ href: null }} />
          <Tabs.Screen name="mentorship" options={{ href: null }} />
          <Tabs.Screen name="notifications" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}
