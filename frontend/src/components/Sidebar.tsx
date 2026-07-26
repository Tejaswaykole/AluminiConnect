import { View, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from './Typography';
import { Avatar } from './Avatar';

export interface SidebarItem {
  name: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: string;
}

export function Sidebar({ items, user }: { items: SidebarItem[], user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  if (width < 768) return null; // Hidden on mobile

  return (
    <View 
       className="bg-surface border-r border-border py-6 flex-col justify-between hidden md:flex"
       style={{ 
         width: 260, 
         height: Platform.OS === 'web' ? '100vh' : '100%',
         position: Platform.OS === 'web' ? ('sticky' as any) : 'relative', 
         top: 0 
       }}
    >
      <View>
        <View className="px-6 mb-8 flex-row items-center">
            <Typography variant="h2" className="text-primary font-bold">Alumni Connect</Typography>
        </View>
        <View className="px-3">
          {items.map(item => {
            const isActive = pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/');
            return (
              <TouchableOpacity 
                key={item.name}
                onPress={() => router.push(item.href as any)}
                className={`flex-row items-center px-3 py-3 mb-1 rounded-lg ${isActive ? 'bg-primary/10' : ''}`}
              >
                <MaterialIcons name={item.icon} size={24} color={isActive ? "#154539" : "#64748b"} />
                <Typography variant="body" className={`ml-3 font-medium ${isActive ? 'text-primary' : 'text-muted'}`}>
                  {item.label}
                </Typography>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      {user && (
        <View className="px-6 border-t border-border pt-4">
           <View className="flex-row items-center">
             <Avatar url={user.avatar} fallbackInitials={user.name?.charAt(0) || 'U'} size="md" />
             <View className="ml-3 flex-1">
               <Typography variant="caption" className="font-semibold" numberOfLines={1}>{user.name}</Typography>
               <Typography variant="caption" color="muted" numberOfLines={1}>{user.role || 'User'}</Typography>
             </View>
           </View>
        </View>
      )}
    </View>
  )
}
