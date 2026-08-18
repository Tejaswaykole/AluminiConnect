import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreateOpportunity() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-alumni-background"
    >
      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
          paddingTop: 32,
          paddingBottom: 96,
          maxWidth: 800,
          alignSelf: 'center',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-4 mb-8">
          <TouchableOpacity onPress={() => router.back()} className="p-2 border border-alumni-outline-variant rounded-full hover:bg-alumni-surface-container-high transition-colors">
            <MaterialIcons name="arrow-back" size={24} color="#191c20" />
          </TouchableOpacity>
          <View>
            <Text className="text-[32px] font-bold text-alumni-on-surface tracking-tight mb-1">Post Opportunity</Text>
            <Text className="text-[16px] text-alumni-on-surface-variant">Share a job, internship, or referral with the alumni network.</Text>
          </View>
        </View>

        <View className="bg-alumni-surface rounded-xl border border-alumni-outline-variant p-6 md:p-8 shadow-sm flex-col gap-6">
          
          <View className="flex-col gap-2">
            <Text className="text-[16px] font-semibold text-alumni-on-surface">Opportunity Type *</Text>
            <View className="flex-row flex-wrap gap-4">
              <TouchableOpacity className="flex-1 min-w-[120px] items-center justify-center py-3 border-2 border-alumni-primary bg-alumni-primary-container/10 rounded-xl">
                <Text className="text-[14px] font-bold text-alumni-primary">Full Time</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 min-w-[120px] items-center justify-center py-3 border border-alumni-outline-variant rounded-xl hover:bg-alumni-surface-container-high transition-colors">
                <Text className="text-[14px] font-medium text-alumni-on-surface-variant">Internship</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 min-w-[120px] items-center justify-center py-3 border border-alumni-outline-variant rounded-xl hover:bg-alumni-surface-container-high transition-colors">
                <Text className="text-[14px] font-medium text-alumni-on-surface-variant">Referral</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">Job Title *</Text>
            <TextInput
              placeholder="e.g. Software Engineer"
              placeholderTextColor="#777587"
              className="w-full bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl py-3 px-4 text-[16px] text-alumni-on-surface focus:border-alumni-primary focus:bg-alumni-surface transition-colors shadow-sm"
            />
          </View>
          
          <View>
            <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">Company Name *</Text>
            <TextInput
              placeholder="e.g. Google"
              placeholderTextColor="#777587"
              className="w-full bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl py-3 px-4 text-[16px] text-alumni-on-surface focus:border-alumni-primary focus:bg-alumni-surface transition-colors shadow-sm"
            />
          </View>
          
          <View>
            <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">Location</Text>
            <TextInput
              placeholder="e.g. Remote, or San Francisco, CA"
              placeholderTextColor="#777587"
              className="w-full bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl py-3 px-4 text-[16px] text-alumni-on-surface focus:border-alumni-primary focus:bg-alumni-surface transition-colors shadow-sm"
            />
          </View>

          <View>
            <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">Description</Text>
            <TextInput
              placeholder="Provide a brief overview of the role, requirements, and how you can help."
              placeholderTextColor="#777587"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="w-full min-h-[120px] bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl py-3 px-4 text-[16px] text-alumni-on-surface focus:border-alumni-primary focus:bg-alumni-surface transition-colors shadow-sm"
            />
          </View>
          
          <View>
            <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">Application Link (Optional)</Text>
            <TextInput
              placeholder="https://"
              placeholderTextColor="#777587"
              className="w-full bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl py-3 px-4 text-[16px] text-alumni-on-surface focus:border-alumni-primary focus:bg-alumni-surface transition-colors shadow-sm"
            />
          </View>

          <View className="flex-row justify-end gap-4 mt-4 border-t border-alumni-outline-variant pt-6">
            <TouchableOpacity onPress={() => router.back()} className="bg-alumni-surface border border-alumni-outline-variant px-6 py-3 rounded-lg hover:bg-alumni-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-alumni-on-surface">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('/alumni/opportunities')} className="bg-alumni-primary border border-alumni-primary px-8 py-3 rounded-lg hover:bg-[#2c1ea3] transition-colors shadow-sm">
              <Text className="text-[14px] font-medium text-alumni-on-primary">Post Opportunity</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
