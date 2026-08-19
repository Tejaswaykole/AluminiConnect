import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../hooks/useUser';
import { ActivityIndicator, Text as RNText } from 'react-native';

export default function StudentDashboard() {
  const router = useRouter();
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
      {/* Header Section */}
      <View className="flex-col gap-2 pt-4 mb-8">
        <Text className="text-[48px] font-bold text-student-on-surface tracking-tight">Good morning, {STUDENT_USER.name.split(' ')[0]} 👋</Text>
        <Text className="text-[18px] text-student-on-surface-variant">Here's what's happening in your network today.</Text>
      </View>

      {/* Top Bento Grid */}
      <View className="flex-col lg:flex-row gap-6 mb-8">
        {/* Profile Completion Card */}
        <View className="flex-1 lg:flex-[1] bg-student-surface rounded-xl p-6 border border-student-outline-variant shadow-sm flex-col justify-between hover:shadow-md transition-shadow">
          <View className="flex-row items-start justify-between mb-4">
            <Text className="text-[20px] font-semibold text-student-on-surface">Profile Setup</Text>
            <MaterialIcons name="person" size={24} color="#3525cd" />
          </View>
          <View className="flex-grow flex-col justify-center gap-4">
            <View className="flex-row items-end justify-between">
              <Text className="text-[32px] font-bold text-student-primary">70%</Text>
              <Text className="text-[12px] font-medium text-student-on-surface-variant mb-1">Complete</Text>
            </View>
            {/* Progress Bar */}
            <View className="w-full bg-student-secondary-fixed h-2 rounded-full overflow-hidden">
              <View className="bg-student-primary-container h-full rounded-full w-[70%]" />
            </View>
            <Text className="text-[16px] text-student-on-surface-variant">Add your past internship details to reach 100% and boost your visibility.</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/student/profile')}
            className="mt-4 w-full bg-student-primary-container py-2 rounded-lg items-center justify-center hover:bg-student-surface-tint transition-colors"
          >
            <Text className="text-[14px] font-medium text-student-on-primary">Complete Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Container */}
        <View className="flex-[2] flex-col sm:flex-row gap-6">
          {/* Action 1: Find Mentor */}
          <TouchableOpacity 
            onPress={() => router.push('/student/mentorship')}
            className="flex-1 bg-student-surface-container-low rounded-xl p-6 border border-student-outline-variant shadow-sm hover:shadow-md transition-shadow flex-col justify-center items-start gap-4 group"
          >
            <View className="w-12 h-12 bg-student-primary-container/10 rounded-full flex items-center justify-center">
              <MaterialIcons name="school" size={24} color="#3525cd" />
            </View>
            <View>
              <Text className="text-[20px] font-semibold text-student-on-surface">Find a Mentor</Text>
              <Text className="text-[16px] text-student-on-surface-variant mt-1">Connect with alumni in your desired field.</Text>
            </View>
            <View className="mt-auto flex-row items-center gap-1">
              <Text className="text-[14px] font-medium text-student-primary">Browse Mentors</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#3525cd" />
            </View>
          </TouchableOpacity>

          {/* Action 2: Browse Jobs */}
          <TouchableOpacity 
            onPress={() => router.push('/student/opportunities')}
            className="flex-1 bg-student-surface-container-low rounded-xl p-6 border border-student-outline-variant shadow-sm hover:shadow-md transition-shadow flex-col justify-center items-start gap-4 group"
          >
            <View className="w-12 h-12 bg-student-tertiary-container/10 rounded-full flex items-center justify-center">
              <MaterialIcons name="business-center" size={24} color="#566175" />
            </View>
            <View>
              <Text className="text-[20px] font-semibold text-student-on-surface">Browse Jobs</Text>
              <Text className="text-[16px] text-student-on-surface-variant mt-1">Exclusive entry-level roles for alumni.</Text>
            </View>
            <View className="mt-auto flex-row items-center gap-1">
              <Text className="text-[14px] font-medium text-student-tertiary-container">View Board</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#566175" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommended Alumni */}
      <View className="flex-col gap-4 mb-8">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-[24px] font-semibold text-student-on-surface">Recommended Alumni</Text>
          <TouchableOpacity>
            <Text className="text-[14px] font-medium text-student-primary hover:underline">View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 24, paddingBottom: 16 }}>
          {/* Card 1 */}
          <View className="w-[320px] md:w-[400px] bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-row items-center gap-4">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgayeSHcBMoAtIOpWS24klStw0Vf64BsRHLNFHEmRMGR7H5zguzxCOekDn9YJEoFcJAxKRKClA62gZeomLFerwU2yVgiLRv6WhLXTg0fSmHvqB3T0D-t9w6vIyUnAmr0FuwRZzpdks7M4xI4haQCnKiQl7IRyFGrnqhzPDo3Vd0wczzKb98zqSBeLwuolYIUPH3JbsnnFGaP-hpG8bIa4dXvq9W2IDyTggBXpOZDfYI7z4uFoF8Qgb' }} 
              className="w-16 h-16 rounded-full bg-student-surface-variant border border-student-outline-variant"
            />
            <View className="flex-1">
              <Text className="text-[20px] font-semibold text-student-on-surface">Sarah Jenkins</Text>
              <Text className="text-[16px] text-student-on-surface-variant">Software Engineer at Google</Text>
              <Text className="text-[12px] font-medium text-student-secondary mt-1">Class of '19 • CS Major</Text>
            </View>
            <TouchableOpacity className="bg-student-surface border border-student-outline-variant px-4 py-2 rounded-lg hover:bg-student-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-student-on-surface">Connect</Text>
            </TouchableOpacity>
          </View>
          
          {/* Card 2 */}
          <View className="w-[320px] md:w-[400px] bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-row items-center gap-4">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxC3gS151h7yS_uU7gTqK8x3k9W01zH4p2mO4nU5v3gQ-R9_r-nFhL82O4d1wYfGj5Kx4P4y1tQhW8s-yP85f9q1aD6_rE72V1eX-Ww2kG2yGqGfJ4X-rO-w1T_7GqR0V-0mI6F-rGg-fR9yMhFk9BwYx9cE-wB9_qfB5gY5m-P_R' }} 
              className="w-16 h-16 rounded-full bg-student-surface-variant border border-student-outline-variant"
            />
            <View className="flex-1">
              <Text className="text-[20px] font-semibold text-student-on-surface">Michael Chang</Text>
              <Text className="text-[16px] text-student-on-surface-variant">Product Manager at Stripe</Text>
              <Text className="text-[12px] font-medium text-student-secondary mt-1">Class of '17 • Business</Text>
            </View>
            <TouchableOpacity className="bg-student-surface border border-student-outline-variant px-4 py-2 rounded-lg hover:bg-student-surface-container-high transition-colors">
              <Text className="text-[14px] font-medium text-student-on-surface">Connect</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Upcoming Events */}
      <View className="flex-col gap-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-[24px] font-semibold text-student-on-surface">Upcoming Events</Text>
          <TouchableOpacity>
            <Text className="text-[14px] font-medium text-student-primary hover:underline">See Calendar</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-student-surface rounded-xl border border-student-outline-variant divide-y divide-student-outline-variant">
          {/* Event 1 */}
          <View className="p-6 flex-col md:flex-row gap-6 items-start md:items-center hover:bg-student-surface-container-low transition-colors cursor-pointer">
            <View className="bg-student-secondary-fixed/50 rounded-lg p-3 w-16 text-center border border-student-outline-variant items-center justify-center">
              <Text className="text-[14px] font-medium text-student-on-surface-variant uppercase">Oct</Text>
              <Text className="text-[24px] font-bold text-student-on-surface">14</Text>
            </View>
            <View className="flex-grow">
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-[20px] font-semibold text-student-on-surface">Tech Industry Mixer 2024</Text>
                <View className="bg-student-primary-container px-2 py-0.5 rounded text-[12px] font-medium text-student-on-primary-container">
                  <Text className="text-[12px] text-student-on-primary-container">Virtual</Text>
                </View>
              </View>
              <Text className="text-[16px] text-student-on-surface-variant mb-2">Networking event with alumni from top tech companies including Apple, Meta, and Netflix.</Text>
              <View className="flex-row items-center gap-4 text-[14px] text-student-secondary">
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="schedule" size={16} color="#5c5f61" />
                  <Text className="text-[14px] text-student-secondary">6:00 PM - 8:00 PM EST</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="group" size={16} color="#5c5f61" />
                  <Text className="text-[14px] text-student-secondary">142 Registered</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="w-full md:w-auto mt-4 md:mt-0 bg-student-surface border border-student-outline-variant px-6 py-2 rounded-lg font-medium text-student-on-surface hover:bg-student-surface-container-high transition-colors items-center justify-center">
              <Text className="text-[14px] font-medium text-student-on-surface">RSVP</Text>
            </TouchableOpacity>
          </View>
          
          {/* Event 2 */}
          <View className="p-6 flex-col md:flex-row gap-6 items-start md:items-center hover:bg-student-surface-container-low transition-colors cursor-pointer">
            <View className="bg-student-secondary-fixed/50 rounded-lg p-3 w-16 text-center border border-student-outline-variant items-center justify-center">
              <Text className="text-[14px] font-medium text-student-on-surface-variant uppercase">Oct</Text>
              <Text className="text-[24px] font-bold text-student-on-surface">18</Text>
            </View>
            <View className="flex-grow">
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-[20px] font-semibold text-student-on-surface">Resume Review Workshop</Text>
                <View className="bg-student-surface-variant px-2 py-0.5 rounded text-[12px] font-medium text-student-on-surface">
                  <Text className="text-[12px] text-student-on-surface">On-Campus</Text>
                </View>
              </View>
              <Text className="text-[16px] text-student-on-surface-variant mb-2">1-on-1 resume reviews with alumni recruiters from various industries.</Text>
              <View className="flex-row items-center gap-4 text-[14px] text-student-secondary">
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="schedule" size={16} color="#5c5f61" />
                  <Text className="text-[14px] text-student-secondary">2:00 PM - 5:00 PM EST</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="location-on" size={16} color="#5c5f61" />
                  <Text className="text-[14px] text-student-secondary">Student Center, Room 204</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="w-full md:w-auto mt-4 md:mt-0 bg-student-surface border border-student-outline-variant px-6 py-2 rounded-lg font-medium text-student-on-surface hover:bg-student-surface-container-high transition-colors items-center justify-center">
              <Text className="text-[14px] font-medium text-student-on-surface">RSVP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

