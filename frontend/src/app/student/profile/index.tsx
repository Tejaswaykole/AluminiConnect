import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../../hooks/useUser';
import { ActivityIndicator, Text as RNText } from 'react-native';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: STUDENT_USER, isLoading } = useUser();
  if (isLoading || !STUDENT_USER) return <ActivityIndicator className="m-auto" />;

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
      <View className="mb-8 flex-row items-center justify-between">
        <Text className="text-[32px] md:text-[48px] font-bold text-student-on-surface tracking-tight">My Profile</Text>
        <TouchableOpacity 
          onPress={() => setIsEditing(!isEditing)}
          className="bg-student-surface border border-student-outline-variant px-4 py-2 rounded-lg flex-row items-center gap-2 hover:bg-student-surface-container-high transition-colors"
        >
          <MaterialIcons name={isEditing ? 'check' : 'edit'} size={20} color="#0b1c30" />
          <Text className="text-[14px] font-medium text-student-on-surface">{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-6">
        {/* Left Column - Core Identity */}
        <View className="w-full md:w-1/3 flex-col gap-6">
          <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm items-center">
            <View className="relative w-32 h-32 mb-4">
              <Image 
                source={{ uri: STUDENT_USER.avatar }}
                className="w-full h-full rounded-full border-4 border-student-surface-container-low"
              />
              {isEditing && (
                <TouchableOpacity className="absolute bottom-0 right-0 bg-student-primary p-2 rounded-full border-2 border-student-surface">
                  <MaterialIcons name="camera-alt" size={16} color="#ffffff" />
                </TouchableOpacity>
              )}
            </View>
            
            {isEditing ? (
              <TextInput 
                value={STUDENT_USER.name}
                className="text-[24px] font-bold text-student-on-surface mb-2 border-b border-student-outline-variant w-full text-center pb-1"
              />
            ) : (
              <Text className="text-[24px] font-bold text-student-on-surface mb-1">{STUDENT_USER.name}</Text>
            )}
            
            <Text className="text-[16px] text-student-on-surface-variant font-medium text-center">B.S. Computer Science</Text>
            <Text className="text-[14px] text-student-secondary text-center mt-1">Class of 2024</Text>

            <View className="flex-row items-center gap-2 mt-4 text-student-secondary">
              <MaterialIcons name="location-on" size={16} color="#5c5f61" />
              <Text className="text-[14px] text-student-secondary">San Francisco, CA</Text>
            </View>
          </View>
          
          <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm">
            <Text className="text-[18px] font-semibold text-student-on-surface mb-4">Profile Completeness</Text>
            <View className="flex-row items-end justify-between mb-2">
              <Text className="text-[24px] font-bold text-student-primary">70%</Text>
            </View>
            <View className="w-full bg-student-secondary-fixed h-2 rounded-full overflow-hidden mb-4">
              <View className="bg-student-primary-container h-full rounded-full w-[70%]" />
            </View>
            <Text className="text-[14px] text-student-on-surface-variant">Add your Resume to reach 100%.</Text>
            <TouchableOpacity className="w-full mt-4 bg-student-surface border border-student-outline-variant py-2 rounded-lg items-center justify-center hover:bg-student-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-student-on-surface">Upload Resume</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Column - Details */}
        <View className="w-full md:flex-1 flex-col gap-6">
          <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm">
            <Text className="text-[20px] font-semibold text-student-on-surface mb-4">About Me</Text>
            {isEditing ? (
              <TextInput 
                multiline
                numberOfLines={4}
                value="I'm a senior CS student passionate about building scalable web applications and exploring artificial intelligence. Actively seeking full-time software engineering roles for Fall 2024."
                className="w-full bg-student-surface-container-low border border-student-outline-variant rounded-lg p-3 text-[16px] text-student-on-surface"
                textAlignVertical="top"
              />
            ) : (
              <Text className="text-[16px] text-student-on-surface-variant leading-relaxed">
                I'm a senior CS student passionate about building scalable web applications and exploring artificial intelligence. Actively seeking full-time software engineering roles for Fall 2024.
              </Text>
            )}
          </View>

          <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[20px] font-semibold text-student-on-surface">Skills</Text>
              {isEditing && (
                <TouchableOpacity>
                  <Text className="text-[14px] font-medium text-student-primary hover:underline">Add Skill</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-row flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning', 'Git'].map(skill => (
                <View key={skill} className="bg-student-surface-container-low border border-student-outline-variant px-3 py-1.5 rounded-full flex-row items-center gap-1">
                  <Text className="text-[14px] font-medium text-student-on-surface">{skill}</Text>
                  {isEditing && (
                    <TouchableOpacity>
                      <MaterialIcons name="close" size={14} color="#5c5f61" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-[20px] font-semibold text-student-on-surface">Experience</Text>
              {isEditing && (
                <TouchableOpacity>
                  <Text className="text-[14px] font-medium text-student-primary hover:underline">Add Experience</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-col gap-6 border-l-2 border-student-surface-container-high ml-2 pl-6 relative">
              
              <View className="relative">
                <View className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-student-primary border-4 border-student-surface" />
                <Text className="text-[18px] font-semibold text-student-on-surface">Software Engineering Intern</Text>
                <Text className="text-[16px] text-student-secondary font-medium">TechStart Inc.</Text>
                <Text className="text-[14px] text-student-on-surface-variant mt-1 mb-2">May 2023 - Aug 2023</Text>
                <Text className="text-[16px] text-student-on-surface-variant leading-relaxed">
                  Developed and tested RESTful APIs using Node.js and Express. Improved query performance by 20% through database indexing.
                </Text>
              </View>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


