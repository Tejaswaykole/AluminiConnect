import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InstituteDashboard() {
  const router = useRouter();

  return (
    <ScrollView 
      className="flex-1 bg-institute-background"
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
        <Text className="text-[32px] md:text-[48px] font-bold text-institute-on-surface tracking-tight mb-2">Institute Overview</Text>
        <Text className="text-[18px] text-institute-on-surface-variant">Monitor alumni engagement, verification requests, and overall platform health.</Text>
      </View>

      {/* KPI Cards */}
      <View className="flex-col md:flex-row flex-wrap -mx-3 mb-8">
        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-institute-primary-container/20 rounded-full items-center justify-center">
                <MaterialIcons name="group" size={20} color="#3525cd" />
              </View>
              <Text className="text-[16px] font-semibold text-institute-on-surface">Total Alumni</Text>
            </View>
            <View className="flex-row items-end gap-2">
              <Text className="text-[32px] font-bold text-institute-on-surface leading-none">12,450</Text>
              <Text className="text-[14px] font-medium text-institute-status-success-text mb-1 flex-row items-center">
                <MaterialIcons name="arrow-upward" size={14} color="#166534" /> +124
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-institute-tertiary-container/20 rounded-full items-center justify-center">
                <MaterialIcons name="pending-actions" size={20} color="#566175" />
              </View>
              <Text className="text-[16px] font-semibold text-institute-on-surface">Pending Verifications</Text>
            </View>
            <View className="flex-row items-end justify-between">
              <Text className="text-[32px] font-bold text-institute-on-surface leading-none">45</Text>
              <TouchableOpacity onPress={() => router.push('/institution/verification')} className="text-institute-primary hover:underline">
                <Text className="text-[14px] font-medium text-institute-primary">Review All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-[#f0fdf4] rounded-full items-center justify-center">
                <MaterialIcons name="handshake" size={20} color="#166534" />
              </View>
              <Text className="text-[16px] font-semibold text-institute-on-surface">Active Mentorships</Text>
            </View>
            <View className="flex-row items-end gap-2">
              <Text className="text-[32px] font-bold text-institute-on-surface leading-none">342</Text>
              <Text className="text-[14px] font-medium text-institute-status-success-text mb-1 flex-row items-center">
                <MaterialIcons name="arrow-upward" size={14} color="#166534" /> +12%
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 bg-institute-surface-container-high rounded-full items-center justify-center">
                <MaterialIcons name="work" size={20} color="#0b1c30" />
              </View>
              <Text className="text-[16px] font-semibold text-institute-on-surface">Jobs Posted (30d)</Text>
            </View>
            <View className="flex-row items-end gap-2">
              <Text className="text-[32px] font-bold text-institute-on-surface leading-none">128</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-col lg:flex-row gap-6">
        {/* Quick Actions */}
        <View className="flex-1 lg:flex-[1]">
          <Text className="text-[20px] font-semibold text-institute-on-surface mb-4">Quick Actions</Text>
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant shadow-sm divide-y divide-institute-outline-variant">
            <TouchableOpacity onPress={() => router.push('/institution/verification')} className="flex-row items-center justify-between p-4 hover:bg-institute-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="verified" size={24} color="#3525cd" />
                <Text className="text-[16px] font-medium text-institute-on-surface">Verify Alumni</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/institution/analytics')} className="flex-row items-center justify-between p-4 hover:bg-institute-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="insert-chart" size={24} color="#5c5f61" />
                <Text className="text-[16px] font-medium text-institute-on-surface">View Reports</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between p-4 hover:bg-institute-surface-container-low transition-colors">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="campaign" size={24} color="#5c5f61" />
                <Text className="text-[16px] font-medium text-institute-on-surface">Broadcast Message</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#777587" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Activity */}
        <View className="flex-1 lg:flex-[2]">
          <Text className="text-[20px] font-semibold text-institute-on-surface mb-4">Recent Platform Activity</Text>
          <View className="bg-institute-surface rounded-xl border border-institute-outline-variant shadow-sm p-2">
            {/* Activity 1 */}
            <View className="flex-row items-start gap-4 p-4 border-b border-institute-outline-variant">
               <View className="bg-institute-primary-container/20 w-10 h-10 rounded-full items-center justify-center">
                 <MaterialIcons name="person-add" size={20} color="#3525cd" />
               </View>
               <View className="flex-1">
                 <Text className="text-[16px] text-institute-on-surface mb-1"><Text className="font-semibold">Michael Chang</Text> registered as Alumni (Class of '17).</Text>
                 <Text className="text-[12px] text-institute-on-surface-variant">10 minutes ago</Text>
               </View>
               <TouchableOpacity className="bg-institute-surface border border-institute-outline-variant px-3 py-1.5 rounded-lg">
                 <Text className="text-[12px] font-medium text-institute-on-surface">Review</Text>
               </TouchableOpacity>
            </View>

            {/* Activity 2 */}
            <View className="flex-row items-start gap-4 p-4 border-b border-institute-outline-variant">
               <View className="bg-institute-surface-container-high w-10 h-10 rounded-full items-center justify-center">
                 <MaterialIcons name="work" size={20} color="#0b1c30" />
               </View>
               <View className="flex-1">
                 <Text className="text-[16px] text-institute-on-surface mb-1"><Text className="font-semibold">Sarah Jenkins</Text> posted a new opportunity: <Text className="font-medium">Software Engineer Intern</Text></Text>
                 <Text className="text-[12px] text-institute-on-surface-variant">2 hours ago</Text>
               </View>
            </View>

            <TouchableOpacity className="p-4 items-center justify-center hover:bg-institute-surface-container-low transition-colors rounded-b-xl">
               <Text className="text-[14px] font-medium text-institute-primary">View All Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
