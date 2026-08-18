import { View, useWindowDimensions } from 'react-native';
import { Sidebar, SidebarItem } from './Sidebar';

export function ResponsiveLayout({ children, sidebarItems, user }: { children: any, sidebarItems: SidebarItem[], user: any }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  if (isDesktop) {
    return (
      <View className="flex-row flex-1 bg-background h-full w-full">
         <Sidebar items={sidebarItems} user={user} />
         <View className="flex-1 bg-background h-full">
            {children}
         </View>
      </View>
    )
  }

  return children;
}
