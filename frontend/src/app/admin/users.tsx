import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

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
      <View className="mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-[32px] md:text-[48px] font-bold text-admin-on-surface tracking-tight mb-2">User Management</Text>
          <Text className="text-[18px] text-admin-on-surface-variant">Manage roles, permissions, and account status across the platform.</Text>
        </View>
        <TouchableOpacity className="bg-admin-primary border border-admin-primary px-4 py-2 rounded-lg flex-row items-center gap-2 hover:bg-[#2c1ea3] transition-colors shadow-sm hidden md:flex">
          <MaterialIcons name="person-add" size={20} color="#ffffff" />
          <Text className="text-[14px] font-medium text-admin-on-primary">Add Admin</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-4 mb-6">
        <View className="flex-1 relative">
          <View className="absolute left-4 top-3.5 z-10">
            <MaterialIcons name="search" size={24} color="#5c5f61" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search users by name, email, or role"
            placeholderTextColor="#777587"
            className="w-full bg-admin-surface rounded-xl border border-admin-outline-variant py-3.5 pl-12 pr-4 text-[16px] text-admin-on-surface focus:border-admin-primary transition-colors shadow-sm"
          />
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-admin-surface border border-admin-outline-variant rounded-xl px-4 py-3.5 flex-row items-center justify-center shadow-sm hover:bg-admin-surface-container-high transition-colors">
            <MaterialIcons name="filter-list" size={20} color="#0b1c30" />
            <Text className="text-[16px] font-medium text-admin-on-surface ml-2">Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-admin-surface rounded-xl border border-admin-outline-variant shadow-sm overflow-hidden">
        {/* Table Header (Desktop only ideally, simplified here) */}
        <View className="flex-row items-center p-4 border-b border-admin-outline-variant bg-admin-surface-container-low hidden md:flex">
          <Text className="flex-1 text-[14px] font-semibold text-admin-on-surface">Name / Email</Text>
          <Text className="w-32 text-[14px] font-semibold text-admin-on-surface">Role</Text>
          <Text className="w-32 text-[14px] font-semibold text-admin-on-surface">Status</Text>
          <Text className="w-24 text-[14px] font-semibold text-admin-on-surface text-center">Actions</Text>
        </View>
        
        {/* User Row 1 */}
        <View className="flex-col md:flex-row md:items-center p-4 border-b border-admin-outline-variant hover:bg-admin-surface-container-low transition-colors">
          <View className="flex-1 mb-2 md:mb-0">
            <Text className="text-[16px] font-semibold text-admin-on-surface">Alex Morgan</Text>
            <Text className="text-[14px] text-admin-on-surface-variant">alex.m@university.edu</Text>
          </View>
          <View className="w-32 mb-2 md:mb-0">
            <View className="bg-[#eff4ff] self-start px-2 py-1 rounded border border-[#cbdbf5]">
              <Text className="text-[12px] font-medium text-[#3525cd]">Student</Text>
            </View>
          </View>
          <View className="w-32 mb-4 md:mb-0">
            <View className="flex-row items-center gap-1">
              <View className="w-2 h-2 rounded-full bg-[#166534]" />
              <Text className="text-[14px] text-admin-on-surface">Active</Text>
            </View>
          </View>
          <View className="w-24 flex-row items-center justify-center md:justify-end gap-2">
            <TouchableOpacity className="p-2 hover:bg-admin-surface-container-high rounded-full">
              <MaterialIcons name="edit" size={20} color="#5b598c" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 hover:bg-admin-surface-container-high rounded-full">
              <MaterialIcons name="block" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Row 2 */}
        <View className="flex-col md:flex-row md:items-center p-4 border-b border-admin-outline-variant hover:bg-admin-surface-container-low transition-colors">
          <View className="flex-1 mb-2 md:mb-0">
            <Text className="text-[16px] font-semibold text-admin-on-surface">Elena Rodriguez</Text>
            <Text className="text-[14px] text-admin-on-surface-variant">elena.r@apple.com</Text>
          </View>
          <View className="w-32 mb-2 md:mb-0">
            <View className="bg-admin-primary-container/20 self-start px-2 py-1 rounded border border-admin-primary-container/50">
              <Text className="text-[12px] font-medium text-admin-primary">Alumni</Text>
            </View>
          </View>
          <View className="w-32 mb-4 md:mb-0">
            <View className="flex-row items-center gap-1">
              <View className="w-2 h-2 rounded-full bg-[#166534]" />
              <Text className="text-[14px] text-admin-on-surface">Active</Text>
            </View>
          </View>
          <View className="w-24 flex-row items-center justify-center md:justify-end gap-2">
            <TouchableOpacity className="p-2 hover:bg-admin-surface-container-high rounded-full">
              <MaterialIcons name="edit" size={20} color="#5b598c" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 hover:bg-admin-surface-container-high rounded-full">
              <MaterialIcons name="block" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
