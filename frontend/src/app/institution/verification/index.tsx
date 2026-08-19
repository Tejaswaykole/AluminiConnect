import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function VerificationCenter() {
  const [searchQuery, setSearchQuery] = useState('');

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
        <Text className="text-[32px] md:text-[48px] font-bold text-institute-on-surface tracking-tight mb-2">Verification Center</Text>
        <Text className="text-[18px] text-institute-on-surface-variant">Review and approve new alumni registration requests to maintain network integrity.</Text>
      </View>

      <View className="flex-col md:flex-row gap-4 mb-8">
        <View className="flex-1 relative">
          <View className="absolute left-4 top-3.5 z-10">
            <MaterialIcons name="search" size={24} color="#5c5f61" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, student ID, or graduation year"
            placeholderTextColor="#777587"
            className="w-full bg-institute-surface rounded-xl border border-institute-outline-variant py-3.5 pl-12 pr-4 text-[16px] text-institute-on-surface focus:border-institute-primary transition-colors shadow-sm"
          />
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-institute-surface border border-institute-outline-variant rounded-xl px-4 py-3.5 flex-row items-center justify-center shadow-sm hover:bg-institute-surface-container-high transition-colors">
            <MaterialIcons name="filter-list" size={20} color="#0b1c30" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-col gap-4">
        {/* Verification Request Card 1 */}
        <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow">
          <View className="flex-row gap-4">
            <View className="w-16 h-16 rounded-full bg-institute-surface-container-high items-center justify-center">
              <Text className="text-[24px] font-bold text-institute-secondary">MC</Text>
            </View>
            <View>
              <Text className="text-[20px] font-semibold text-institute-on-surface">Michael Chang</Text>
              <View className="flex-row flex-wrap gap-x-4 gap-y-1 mt-1 text-[14px]">
                <Text className="text-institute-secondary font-medium">ID: 102938475</Text>
                <Text className="text-institute-secondary font-medium">Class of 2017</Text>
                <Text className="text-institute-secondary font-medium">B.S. Business Admin</Text>
              </View>
              <Text className="text-[14px] text-institute-on-surface-variant mt-2">Currently: Product Manager at Stripe</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 md:self-center border-t md:border-t-0 border-institute-outline-variant pt-4 md:pt-0">
            <TouchableOpacity className="flex-1 md:flex-none bg-institute-surface border border-institute-outline-variant px-6 py-2 rounded-lg items-center hover:bg-institute-error-container transition-colors">
              <Text className="text-[14px] font-medium text-institute-error">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 md:flex-none bg-institute-primary border border-institute-primary px-6 py-2 rounded-lg items-center hover:bg-[#2c1ea3] transition-colors shadow-sm">
              <Text className="text-[14px] font-medium text-institute-on-primary">Verify & Approve</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verification Request Card 2 */}
        <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 shadow-sm flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow">
          <View className="flex-row gap-4">
            <View className="w-16 h-16 rounded-full bg-institute-surface-container-high items-center justify-center">
              <Text className="text-[24px] font-bold text-institute-secondary">EW</Text>
            </View>
            <View>
              <Text className="text-[20px] font-semibold text-institute-on-surface">Emily Wong</Text>
              <View className="flex-row flex-wrap gap-x-4 gap-y-1 mt-1 text-[14px]">
                <Text className="text-institute-secondary font-medium">ID: 948573612</Text>
                <Text className="text-institute-secondary font-medium">Class of 2021</Text>
                <Text className="text-institute-secondary font-medium">B.A. Graphic Design</Text>
              </View>
              <Text className="text-[14px] text-institute-on-surface-variant mt-2">Currently: Freelance Designer</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 md:self-center border-t md:border-t-0 border-institute-outline-variant pt-4 md:pt-0">
            <TouchableOpacity className="flex-1 md:flex-none bg-institute-surface border border-institute-outline-variant px-6 py-2 rounded-lg items-center hover:bg-institute-error-container transition-colors">
              <Text className="text-[14px] font-medium text-institute-error">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 md:flex-none bg-institute-primary border border-institute-primary px-6 py-2 rounded-lg items-center hover:bg-[#2c1ea3] transition-colors shadow-sm">
              <Text className="text-[14px] font-medium text-institute-on-primary">Verify & Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
