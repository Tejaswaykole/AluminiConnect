import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentMentorshipCenter() {
  const [searchQuery, setSearchQuery] = useState('');

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
        <TouchableOpacity className="bg-student-surface border border-student-outline-variant rounded-xl px-6 py-3.5 flex-row items-center justify-center gap-2 shadow-sm hover:bg-student-surface-container-high transition-colors">
          <MaterialIcons name="tune" size={20} color="#0b1c30" />
          <Text className="text-[16px] font-medium text-student-on-surface">Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Suggested Mentors */}
      <View className="mb-8">
        <Text className="text-[24px] font-semibold text-student-on-surface mb-4">Suggested Mentors</Text>
        <View className="flex-col md:flex-row flex-wrap -mx-3">
          
          {/* Mentor 1 */}
          <View className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
            <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-col hover:shadow-md transition-shadow">
              <View className="flex-row items-start gap-4 mb-4">
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgayeSHcBMoAtIOpWS24klStw0Vf64BsRHLNFHEmRMGR7H5zguzxCOekDn9YJEoFcJAxKRKClA62gZeomLFerwU2yVgiLRv6WhLXTg0fSmHvqB3T0D-t9w6vIyUnAmr0FuwRZzpdks7M4xI4haQCnKiQl7IRyFGrnqhzPDo3Vd0wczzKb98zqSBeLwuolYIUPH3JbsnnFGaP-hpG8bIa4dXvq9W2IDyTggBXpOZDfYI7z4uFoF8Qgb' }}
                  className="w-16 h-16 rounded-full border border-student-outline-variant"
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[20px] font-semibold text-student-on-surface">Elena Rodriguez</Text>
                    <View className="bg-student-primary-container px-2 py-0.5 rounded flex-row items-center gap-1">
                      <MaterialIcons name="workspace-premium" size={14} color="#dad7ff" />
                      <Text className="text-[12px] font-medium text-student-on-primary-container">Top Mentor</Text>
                    </View>
                  </View>
                  <Text className="text-[16px] text-student-secondary font-medium">Senior UX Designer @ Apple</Text>
                  <Text className="text-[12px] text-student-on-surface-variant mt-1">Class of '16 • Design</Text>
                </View>
              </View>

              <Text className="text-[14px] text-student-on-surface-variant mb-4" numberOfLines={2}>
                Passionate about helping students transition into product design. Can help with portfolio reviews and interview prep.
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-6 mt-auto">
                {['Portfolio Review', 'Career Advice', 'Resume Help'].map(tag => (
                  <View key={tag} className="bg-student-surface-container-low border border-student-outline-variant px-3 py-1 rounded-full">
                    <Text className="text-[12px] font-medium text-student-on-surface">{tag}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-student-primary py-2.5 rounded-lg items-center justify-center hover:bg-student-primary/90 transition-colors">
                  <Text className="text-[14px] font-medium text-student-on-primary">Request Mentor</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-student-surface border border-student-outline-variant p-2.5 rounded-lg items-center justify-center hover:bg-student-surface-container-high transition-colors">
                  <MaterialIcons name="bookmark-border" size={20} color="#5c5f61" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Mentor 2 */}
          <View className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
            <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-col hover:shadow-md transition-shadow">
              <View className="flex-row items-start gap-4 mb-4">
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxC3gS151h7yS_uU7gTqK8x3k9W01zH4p2mO4nU5v3gQ-R9_r-nFhL82O4d1wYfGj5Kx4P4y1tQhW8s-yP85f9q1aD6_rE72V1eX-Ww2kG2yGqGfJ4X-rO-w1T_7GqR0V-0mI6F-rGg-fR9yMhFk9BwYx9cE-wB9_qfB5gY5m-P_R' }}
                  className="w-16 h-16 rounded-full border border-student-outline-variant"
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[20px] font-semibold text-student-on-surface">Michael Chang</Text>
                  </View>
                  <Text className="text-[16px] text-student-secondary font-medium">Product Manager @ Stripe</Text>
                  <Text className="text-[12px] text-student-on-surface-variant mt-1">Class of '17 • Business</Text>
                </View>
              </View>

              <Text className="text-[14px] text-student-on-surface-variant mb-4" numberOfLines={2}>
                Happy to chat about transitioning from engineering to product management and tech strategy.
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-6 mt-auto">
                {['PM Interviews', 'Career Switch', 'Startup Advice'].map(tag => (
                  <View key={tag} className="bg-student-surface-container-low border border-student-outline-variant px-3 py-1 rounded-full">
                    <Text className="text-[12px] font-medium text-student-on-surface">{tag}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-student-primary py-2.5 rounded-lg items-center justify-center hover:bg-student-primary/90 transition-colors">
                  <Text className="text-[14px] font-medium text-student-on-primary">Request Mentor</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-student-surface border border-student-outline-variant p-2.5 rounded-lg items-center justify-center hover:bg-student-surface-container-high transition-colors">
                  <MaterialIcons name="bookmark-border" size={20} color="#5c5f61" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}
