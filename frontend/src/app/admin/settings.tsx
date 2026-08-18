import { View, Text, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

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
        <Text className="text-[32px] md:text-[48px] font-bold text-admin-on-surface tracking-tight mb-2">System Settings</Text>
        <Text className="text-[18px] text-admin-on-surface-variant">Configure platform-wide settings and maintenance options.</Text>
      </View>

      <View className="flex-col gap-6">
        {/* Global Flags */}
        <View className="bg-admin-surface rounded-xl border border-admin-outline-variant p-6 shadow-sm">
          <Text className="text-[20px] font-semibold text-admin-on-surface mb-6">Global Configuration</Text>
          
          <View className="flex-row items-center justify-between py-4 border-b border-admin-outline-variant">
            <View className="flex-1 pr-4">
              <Text className="text-[16px] font-medium text-admin-on-surface mb-1">Maintenance Mode</Text>
              <Text className="text-[14px] text-admin-on-surface-variant">Disable access for non-admin users across the entire platform.</Text>
            </View>
            <Switch
              value={maintenanceMode}
              onValueChange={setMaintenanceMode}
              trackColor={{ false: '#d8dae0', true: '#3525cd' }}
              thumbColor={'#ffffff'}
            />
          </View>
          
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-1 pr-4">
              <Text className="text-[16px] font-medium text-admin-on-surface mb-1">Allow New Registrations</Text>
              <Text className="text-[14px] text-admin-on-surface-variant">Open the platform for new student and alumni sign-ups.</Text>
            </View>
            <Switch
              value={allowRegistration}
              onValueChange={setAllowRegistration}
              trackColor={{ false: '#d8dae0', true: '#3525cd' }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View className="bg-[#fef2f2] rounded-xl border border-[#fecaca] p-6 shadow-sm mt-4">
          <Text className="text-[20px] font-semibold text-[#991b1b] mb-2">Danger Zone</Text>
          <Text className="text-[14px] text-[#991b1b] mb-6">These actions are destructive and cannot be easily reversed.</Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-[16px] font-medium text-[#991b1b]">Purge Audit Logs</Text>
              <Text className="text-[14px] text-[#991b1b]/80">Permanently delete all system logs older than 90 days.</Text>
            </View>
            <TouchableOpacity className="bg-white border border-[#fecaca] px-4 py-2 rounded-lg items-center">
              <Text className="text-[14px] font-medium text-[#dc2626]">Purge Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
