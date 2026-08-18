import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ScrollView 
      className="flex-1 bg-admin-background"
      contentContainerStyle={{ 
        paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
        paddingTop: 32,
        paddingBottom: 96,
        maxWidth: 1280,
        alignSelf: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-[32px] md:text-[48px] font-bold text-admin-on-surface tracking-tight mb-2">Platform Control</Text>
        <Text className="text-[18px] text-admin-on-surface-variant">Global system status, performance metrics, and rapid moderation tools.</Text>
      </View>

      {/* System Health Cards */}
      <View className="flex-col md:flex-row flex-wrap -mx-3 mb-8">
        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-admin-surface rounded-xl border border-admin-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-admin-primary-container/20 rounded-full items-center justify-center">
                <MaterialIcons name="memory" size={20} color="#3525cd" />
              </View>
              <Text className="text-[16px] font-semibold text-admin-on-surface">API Status</Text>
            </View>
            <View className="flex-row items-end gap-2">
              <Text className="text-[32px] font-bold text-admin-on-surface leading-none">Healthy</Text>
              <Text className="text-[14px] font-medium text-admin-status-success-text mb-1">99.9% Uptime</Text>
            </View>
          </View>
        </View>

        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-admin-surface rounded-xl border border-admin-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-admin-surface-container-high rounded-full items-center justify-center">
                <MaterialIcons name="people" size={20} color="#0b1c30" />
              </View>
              <Text className="text-[16px] font-semibold text-admin-on-surface">Total Users</Text>
            </View>
            <View className="flex-row items-end gap-2">
              <Text className="text-[32px] font-bold text-admin-on-surface leading-none">42,891</Text>
              <Text className="text-[14px] font-medium text-admin-status-success-text mb-1 flex-row items-center">
                <MaterialIcons name="arrow-upward" size={14} color="#166534" /> +842
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-admin-surface rounded-xl border border-admin-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-[#fef2f2] rounded-full items-center justify-center">
                <MaterialIcons name="report" size={20} color="#dc2626" />
              </View>
              <Text className="text-[16px] font-semibold text-admin-on-surface">Reported Content</Text>
            </View>
            <View className="flex-row items-end justify-between">
              <Text className="text-[32px] font-bold text-admin-on-surface leading-none">12</Text>
              <TouchableOpacity className="text-admin-primary hover:underline">
                <Text className="text-[14px] font-medium text-[#dc2626]">Requires Action</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-col lg:flex-row gap-6">
        {/* Quick Actions */}
        <View className="flex-1 lg:flex-[1]">
          <Text className="text-[20px] font-semibold text-admin-on-surface mb-4">System Actions</Text>
          <View className="bg-admin-surface rounded-xl border border-admin-outline-variant shadow-sm divide-y divide-admin-outline-variant">
            <TouchableOpacity onPress={() => router.push('/admin/users')} className="flex-row items-center justify-between p-4 hover:bg-admin-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="manage-accounts" size={24} color="#3525cd" />
                <Text className="text-[16px] font-medium text-admin-on-surface">Manage Users</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between p-4 hover:bg-admin-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="admin-panel-settings" size={24} color="#5b598c" />
                <Text className="text-[16px] font-medium text-admin-on-surface">Role Permissions</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/admin/settings')} className="flex-row items-center justify-between p-4 hover:bg-admin-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="settings-applications" size={24} color="#5b598c" />
                <Text className="text-[16px] font-medium text-admin-on-surface">App Configuration</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* System Logs */}
        <View className="flex-1 lg:flex-[2]">
          <Text className="text-[20px] font-semibold text-admin-on-surface mb-4">System Event Log</Text>
          <View className="bg-admin-surface rounded-xl border border-admin-outline-variant shadow-sm p-2">
            
            {/* Log 1 */}
            <View className="flex-row items-start gap-4 p-4 border-b border-admin-outline-variant">
               <View className="bg-admin-primary-container/20 w-8 h-8 rounded-full items-center justify-center mt-1">
                 <MaterialIcons name="info" size={16} color="#3525cd" />
               </View>
               <View className="flex-1">
                 <View className="flex-row justify-between items-center mb-1">
                   <Text className="text-[16px] font-semibold text-admin-on-surface">Database Backup Completed</Text>
                   <Text className="text-[12px] text-admin-on-surface-variant">10:00 AM</Text>
                 </View>
                 <Text className="text-[14px] text-admin-on-surface-variant">Automated daily backup finished successfully in 4m 23s.</Text>
               </View>
            </View>

            {/* Log 2 */}
            <View className="flex-row items-start gap-4 p-4 border-b border-admin-outline-variant">
               <View className="bg-[#fef2f2] w-8 h-8 rounded-full items-center justify-center mt-1">
                 <MaterialIcons name="warning" size={16} color="#dc2626" />
               </View>
               <View className="flex-1">
                 <View className="flex-row justify-between items-center mb-1">
                   <Text className="text-[16px] font-semibold text-admin-on-surface">Failed Login Attempts Spike</Text>
                   <Text className="text-[12px] text-admin-on-surface-variant">08:45 AM</Text>
                 </View>
                 <Text className="text-[14px] text-admin-on-surface-variant">Detected 50+ failed login attempts from IP range 192.168.x.x.</Text>
               </View>
            </View>

            <TouchableOpacity className="p-4 items-center justify-center hover:bg-admin-surface-container-low transition-colors rounded-b-xl">
               <Text className="text-[14px] font-medium text-admin-primary">View Full Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
