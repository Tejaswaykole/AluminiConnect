import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMentors, useRequestMentorship } from '../../../hooks/queries/useMentorship';

export default function StudentMentorshipCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: mentors, isLoading, isError } = useMentors();
  const requestMutation = useRequestMentorship();

  const handleRequestMentorship = (mentorId: string) => {
    requestMutation.mutate({ mentorId, message: "Hi! I would love to connect." });
  };

  return (
    <ScrollView 
      className="flex-1 bg-student-background"
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
        <Text className="text-[32px] md:text-[48px] font-bold text-student-on-surface tracking-tight mb-2">Mentorship Center</Text>
        <Text className="text-[18px] text-student-on-surface-variant">Find alumni mentors in your field for guidance and career support.</Text>
      </View>

      <View className="flex-col md:flex-row gap-4 mb-8">
        <View className="flex-1 relative">
          <View className="absolute left-4 top-3.5 z-10">
            <MaterialIcons name="search" size={24} color="#5c5f61" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by industry, company, or skills"
            placeholderTextColor="#777587"
            className="w-full bg-student-surface rounded-xl border border-student-outline-variant py-3.5 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary transition-colors shadow-sm"
          />
        </View>
        <TouchableOpacity 
          onPress={() => Alert.alert('Filters', 'Advanced filtering options coming soon!')}
          className="bg-student-surface border border-student-outline-variant rounded-xl px-6 py-3.5 flex-row items-center justify-center gap-2 shadow-sm hover:bg-student-surface-container-high transition-colors"
        >
          <MaterialIcons name="tune" size={20} color="#0b1c30" />
          <Text className="text-[16px] font-medium text-student-on-surface">Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Suggested Mentors */}
      <View className="mb-8">
        <Text className="text-[24px] font-semibold text-student-on-surface mb-4">Suggested Mentors</Text>
        
        {isLoading ? (
          <View className="items-center py-12">
            <ActivityIndicator size="large" color="#0b1c30" />
            <Text className="mt-4 text-student-on-surface-variant">Loading mentors...</Text>
          </View>
        ) : isError ? (
          <View className="items-center py-12 bg-student-error-container rounded-xl">
            <MaterialIcons name="error-outline" size={48} color="#ba1a1a" />
            <Text className="mt-4 text-student-error">Failed to load mentors. Please try again.</Text>
          </View>
        ) : mentors?.length === 0 ? (
          <View className="items-center py-12 bg-student-surface rounded-xl border border-student-outline-variant">
            <MaterialIcons name="people-outline" size={48} color="#5c5f61" />
            <Text className="mt-4 text-student-on-surface-variant">No mentors found matching your criteria.</Text>
          </View>
        ) : (
          <View className="flex-col md:flex-row flex-wrap -mx-3">
            {mentors?.map((mentor) => (
              <View key={mentor.id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-col hover:shadow-md transition-shadow">
                  <View className="flex-row items-start gap-4 mb-4">
                    <Image 
                      source={{ uri: mentor.avatar || 'https://i.pravatar.cc/150?u=' + mentor.id }}
                      className="w-16 h-16 rounded-full border border-student-outline-variant"
                    />
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-[20px] font-semibold text-student-on-surface">{mentor.first_name} {mentor.last_name}</Text>
                        <View className="bg-student-primary-container px-2 py-0.5 rounded flex-row items-center gap-1">
                          <MaterialIcons name="workspace-premium" size={14} color="#dad7ff" />
                          <Text className="text-[12px] font-medium text-student-on-primary-container">Top Mentor</Text>
                        </View>
                      </View>
                      <Text className="text-[16px] text-student-secondary font-medium">{mentor.profession || 'Professional'} {mentor.company ? `@ ${mentor.company}` : ''}</Text>
                      <Text className="text-[12px] text-student-on-surface-variant mt-1">Class of '16 • Design</Text>
                    </View>
                  </View>

                  <Text className="text-[14px] text-student-on-surface-variant mb-4" numberOfLines={2}>
                    {mentor.bio || "Passionate about helping students transition into their careers. Can help with portfolio reviews and interview prep."}
                  </Text>

                  <View className="flex-row flex-wrap gap-2 mb-6 mt-auto">
                    {(mentor.expertise || ['Portfolio Review', 'Career Advice', 'Resume Help']).map((tag, index) => (
                      <View key={index} className="bg-student-surface-container-low border border-student-outline-variant px-3 py-1 rounded-full">
                        <Text className="text-[12px] font-medium text-student-on-surface">{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity 
                      onPress={() => handleRequestMentorship(mentor.id)}
                      className="flex-1 bg-student-primary py-2.5 rounded-lg items-center justify-center hover:bg-student-primary/90 transition-colors"
                    >
                      <Text className="text-[14px] font-medium text-student-on-primary">Request Mentor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-student-surface border border-student-outline-variant p-2.5 rounded-lg items-center justify-center hover:bg-student-surface-container-high transition-colors">
                      <MaterialIcons name="bookmark-border" size={20} color="#5c5f61" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
