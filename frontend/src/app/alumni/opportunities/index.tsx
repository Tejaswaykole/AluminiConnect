import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ManageOpportunities() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Active Postings');

  return (
    <ScrollView 
      className="flex-1 bg-alumni-background"
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
      <View className="flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <View>
          <Text className="text-[32px] md:text-[40px] font-bold text-alumni-on-surface tracking-tight mb-2">Manage Opportunities</Text>
          <Text className="text-[18px] text-alumni-on-surface-variant">Track your referrals, job postings, and applicant pipeline.</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/alumni/opportunities/create')}
          className="bg-alumni-primary border border-alumni-border-subtle px-6 py-3 rounded-lg flex-row items-center gap-2 hover:bg-[#2c1ea3] transition-colors shadow-sm"
        >
          <MaterialIcons name="add" size={20} color="#ffffff" />
          <Text className="text-[14px] font-medium text-alumni-on-primary">Post New Role</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row border-b border-alumni-outline-variant mb-6">
        {['Active Postings', 'Drafts', 'Closed'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-3 px-6 border-b-2 ${activeTab === tab ? 'border-alumni-primary' : 'border-transparent'}`}
          >
            <Text className={`text-[16px] font-medium ${activeTab === tab ? 'text-alumni-primary' : 'text-alumni-secondary'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid of postings */}
      <View className="flex-col gap-6">
        {/* Posting 1 */}
        <View className="bg-alumni-surface rounded-xl border border-alumni-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow">
          <View className="flex-col md:flex-row justify-between gap-4 mb-4">
            <View>
              <View className="flex-row items-center gap-3 mb-2">
                <Text className="text-[20px] font-semibold text-alumni-on-surface">Software Engineering Intern</Text>
                <View className="bg-alumni-status-success-bg px-2 py-1 rounded">
                  <Text className="text-[12px] font-bold text-alumni-status-success-text uppercase">Active</Text>
                </View>
              </View>
              <Text className="text-[16px] text-alumni-on-surface-variant">TechCorp • San Francisco, CA</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="p-2 border border-alumni-outline-variant rounded-lg hover:bg-alumni-surface-container-high transition-colors">
                <MaterialIcons name="edit" size={20} color="#3a495f" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 border border-alumni-outline-variant rounded-lg hover:bg-alumni-surface-container-high transition-colors">
                <MaterialIcons name="more-horiz" size={20} color="#3a495f" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row items-center gap-6 border-t border-alumni-outline-variant pt-4">
            <View className="flex-col">
              <Text className="text-[24px] font-bold text-alumni-primary">24</Text>
              <Text className="text-[14px] text-alumni-on-surface-variant">Views</Text>
            </View>
            <View className="flex-col">
              <Text className="text-[24px] font-bold text-alumni-primary">12</Text>
              <Text className="text-[14px] text-alumni-on-surface-variant">Applicants</Text>
            </View>
            <TouchableOpacity className="ml-auto bg-alumni-surface-container-low border border-alumni-outline-variant px-4 py-2 rounded-lg hover:bg-alumni-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-alumni-on-surface">View Applicants</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posting 2 */}
        <View className="bg-alumni-surface rounded-xl border border-alumni-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow">
          <View className="flex-col md:flex-row justify-between gap-4 mb-4">
            <View>
              <View className="flex-row items-center gap-3 mb-2">
                <Text className="text-[20px] font-semibold text-alumni-on-surface">Senior Product Manager (Referral)</Text>
                <View className="bg-alumni-status-success-bg px-2 py-1 rounded">
                  <Text className="text-[12px] font-bold text-alumni-status-success-text uppercase">Active</Text>
                </View>
              </View>
              <Text className="text-[16px] text-alumni-on-surface-variant">Stripe • Remote</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="p-2 border border-alumni-outline-variant rounded-lg hover:bg-alumni-surface-container-high transition-colors">
                <MaterialIcons name="edit" size={20} color="#3a495f" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 border border-alumni-outline-variant rounded-lg hover:bg-alumni-surface-container-high transition-colors">
                <MaterialIcons name="more-horiz" size={20} color="#3a495f" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row items-center gap-6 border-t border-alumni-outline-variant pt-4">
            <View className="flex-col">
              <Text className="text-[24px] font-bold text-alumni-primary">156</Text>
              <Text className="text-[14px] text-alumni-on-surface-variant">Views</Text>
            </View>
            <View className="flex-col">
              <Text className="text-[24px] font-bold text-alumni-primary">45</Text>
              <Text className="text-[14px] text-alumni-on-surface-variant">Applicants</Text>
            </View>
            <TouchableOpacity className="ml-auto bg-alumni-surface-container-low border border-alumni-outline-variant px-4 py-2 rounded-lg hover:bg-alumni-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-alumni-on-surface">View Applicants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
