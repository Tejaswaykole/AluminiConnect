import { View, TouchableOpacity, ScrollView, Image, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ALUMNI_USER } from '../../mocks';

export default function AlumniDashboard() {
  const router = useRouter();

  return (
    <ScrollView 
      className="flex-1 bg-alumni-surface"
      contentContainerStyle={{ 
        paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
        paddingTop: 32,
        paddingBottom: 96,
        maxWidth: 1280,
        alignSelf: 'center',
        width: '100%',
      }}
    >
      {/* Top Search Header */}
      <View className="flex-row items-center justify-between mb-8 bg-alumni-surface-card rounded-xl p-4 shadow-sm border border-alumni-border-subtle">
        <View className="relative w-full max-w-md hidden md:flex flex-row items-center">
          <MaterialIcons name="search" size={24} color="#777587" className="absolute left-4 z-10" />
          <View className="w-full bg-alumni-surface-container-low rounded-lg py-2 pl-12 pr-4">
            <Text className="text-alumni-on-surface text-base">Search alumni, jobs, or groups...</Text>
          </View>
        </View>
        
        {/* Mobile Header Title */}
        <Text className="md:hidden text-[24px] font-bold text-alumni-on-surface">Home</Text>
        
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="md:hidden p-2 rounded-full hover:bg-alumni-surface-container-high">
            <MaterialIcons name="search" size={24} color="#191c20" />
          </TouchableOpacity>
          <TouchableOpacity className="relative p-2 rounded-full hover:bg-alumni-surface-container-high">
            <MaterialIcons name="notifications" size={24} color="#191c20" />
            <View className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-alumni-surface-card" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/alumni/profile')} className="w-8 h-8 rounded-full overflow-hidden border border-alumni-border-subtle">
            <Image source={{ uri: ALUMNI_USER.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy7bNpwBMOJlQoN1foC0Qf_HbvQHqXTPCsMcNL7tBT81cZYU3w7mI3WCEp0B4XbFsBz8tp2qoGCmudb-whPY77DKI4Ba8fmbvD1mEjtM-lwhvSiac3rNETDvmpdmU5vKelFdf3r_ErmH98aLC9bgx59aIHAW6uJthoL_lpj0XnsyoDjPc5RzkqPZ9j--mYMdDHVzaMkvfnV6Dcl3lvZrkpLqc5kvRW09OdNh1L1Ab_GR_DfBrVLByN' }} className="w-full h-full" resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-col lg:flex-row gap-6">
        {/* Left/Main Column */}
        <View className="flex-1 lg:flex-[2] space-y-6 flex-col">
          
          {/* Welcome & Profile Completion */}
          <View className="bg-alumni-surface-card rounded-xl p-6 shadow-sm border border-alumni-border-subtle relative overflow-hidden mb-6">
            <View className="absolute inset-0 bg-alumni-primary/5 pointer-events-none rounded-xl" />
            <View className="flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <View>
                <Text className="text-[24px] font-semibold text-alumni-on-surface mb-1">Welcome back, Sarah</Text>
                <Text className="text-base text-alumni-on-surface-variant">Class of '18 • Product Designer at TechCorp</Text>
              </View>
              <View className="w-full md:w-auto bg-alumni-surface-container-low p-4 rounded-lg flex-row items-center gap-4 min-w-[200px]">
                <View className="relative w-12 h-12 flex items-center justify-center">
                  {/* SVG Circle Progress logic mapped to View border */}
                  <View className="w-12 h-12 rounded-full border-[3px] border-[#c3c0ff] absolute" />
                  <View className="w-12 h-12 rounded-full border-[3px] border-alumni-primary absolute border-l-transparent border-b-transparent" style={{ transform: [{ rotate: '-45deg' }] }} />
                  <Text className="text-[12px] font-bold text-alumni-primary">85%</Text>
                </View>
                <View>
                  <Text className="text-[12px] text-alumni-on-surface-variant mb-1">Profile Strength</Text>
                  <TouchableOpacity onPress={() => router.push('/alumni/profile')}>
                    <Text className="text-[14px] text-alumni-primary font-medium hover:text-[#3323cc]">Complete Profile →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions Bento */}
          <View className="mb-6">
            <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap -mx-2">
              <View className="w-1/2 sm:w-1/4 px-2 mb-4">
                <TouchableOpacity onPress={() => router.push('/alumni/opportunities/create' as any)} className="bg-alumni-surface-card hover:bg-alumni-surface-container-low border border-alumni-border-subtle p-4 rounded-xl shadow-sm hover:shadow-md flex-col items-center justify-center gap-2 h-full transition-all">
                  <View className="w-10 h-10 rounded-full bg-alumni-secondary-fixed/50 flex items-center justify-center">
                    <MaterialIcons name="work-outline" size={20} color="#181445" />
                  </View>
                  <Text className="text-[14px] text-alumni-on-surface font-medium text-center">Post Job</Text>
                </TouchableOpacity>
              </View>
              <View className="w-1/2 sm:w-1/4 px-2 mb-4">
                <TouchableOpacity onPress={() => router.push('/alumni/opportunities/create' as any)} className="bg-alumni-surface-card hover:bg-alumni-surface-container-low border border-alumni-border-subtle p-4 rounded-xl shadow-sm hover:shadow-md flex-col items-center justify-center gap-2 h-full transition-all">
                  <View className="w-10 h-10 rounded-full bg-alumni-tertiary-fixed/50 flex items-center justify-center">
                    <MaterialIcons name="school" size={20} color="#0b1c30" />
                  </View>
                  <Text className="text-[14px] text-alumni-on-surface font-medium text-center">Post Intern</Text>
                </TouchableOpacity>
              </View>
              <View className="w-1/2 sm:w-1/4 px-2 mb-4">
                <TouchableOpacity onPress={() => router.push('/alumni/opportunities/create' as any)} className="bg-alumni-surface-card hover:bg-alumni-surface-container-low border border-alumni-border-subtle p-4 rounded-xl shadow-sm hover:shadow-md flex-col items-center justify-center gap-2 h-full transition-all">
                  <View className="w-10 h-10 rounded-full bg-alumni-surface-container-highest flex items-center justify-center">
                    <MaterialIcons name="group-add" size={20} color="#464555" />
                  </View>
                  <Text className="text-[14px] text-alumni-on-surface font-medium text-center">Referral</Text>
                </TouchableOpacity>
              </View>
              <View className="w-1/2 sm:w-1/4 px-2 mb-4">
                <TouchableOpacity onPress={() => router.push('/alumni/events')} className="bg-alumni-surface-card hover:bg-alumni-surface-container-low border border-alumni-border-subtle p-4 rounded-xl shadow-sm hover:shadow-md flex-col items-center justify-center gap-2 h-full transition-all">
                  <View className="w-10 h-10 rounded-full bg-alumni-primary-container/10 flex items-center justify-center">
                    <MaterialIcons name="event" size={20} color="#3525cd" />
                  </View>
                  <Text className="text-[14px] text-alumni-on-surface font-medium text-center">Create Event</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Mentorship Overview */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[20px] font-semibold text-alumni-on-surface">Mentorship Overview</Text>
              <TouchableOpacity onPress={() => router.push('/alumni/mentorship')}>
                <Text className="text-[14px] text-alumni-primary hover:underline">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-col gap-4">
              {/* Mentee Card 1 */}
              <View className="bg-alumni-surface-card rounded-xl p-4 border border-alumni-border-subtle shadow-sm flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-full overflow-hidden border border-alumni-border-subtle flex-shrink-0">
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFmkpjrgd5SccTp6Dk9APmWr0S5rv3yORKaw5DeVhUUiLcvhU4uGwYmruObFaZZGH2wycvIAtLWXSwzSHs4g-th6DCmbG7PxGIwONDKLL60Xkhm8O_9bcWLzn57lpx45OgjNRD1kj_skdsVO5Ss3oacKuYeJgxCYePL-pbKoSYerskVo-6T8PwTiG5gXKvpLv2pDXN_lKGDI3jFxvEVihOPjcvVpj1WXk-rrJ_dy6nfplNy_YZrNwX' }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="text-[14px] font-semibold text-alumni-on-surface truncate" numberOfLines={1}>James Peterson</Text>
                  <Text className="text-[12px] text-alumni-on-surface-variant truncate" numberOfLines={1}>Computer Science • Senior Year</Text>
                </View>
                <View className="flex-row items-center gap-2 flex-shrink-0">
                  <View className="hidden sm:flex px-2 py-1 bg-alumni-status-success-bg rounded-full">
                    <Text className="text-[10px] text-alumni-status-success-text uppercase font-bold tracking-wider">Active</Text>
                  </View>
                  <TouchableOpacity className="p-2 rounded-full hover:bg-alumni-surface-container-high">
                    <MaterialIcons name="chat-bubble-outline" size={16} color="#464555" />
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Mentee Card 2 */}
              <View className="bg-alumni-surface-card rounded-xl p-4 border border-alumni-border-subtle shadow-sm flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-full overflow-hidden border border-alumni-border-subtle flex-shrink-0">
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH2AKx_imvwvjcHghG0NtfyzMssn3hj98i-EZnsR__KmuWGQiJ-9HaQ99OE5bvG8WLu9KpaGLtNAER92lCmhAl3ku-Ry6KMo813A4sT7lcRsAZbvVbNmRbzPuvJIQMd0ZqRC-dUCV21NwekpkxpyFs2078LSgIiTr5tKFi8yGiDnAkTEvYPHoeUf1tiIag--BJcooxdG11ReNKGEoLCuUnVcMO83-xkmLGa6g2LykmeV1cUYy9O4zy' }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="text-[14px] font-semibold text-alumni-on-surface truncate" numberOfLines={1}>Alicia Reyes</Text>
                  <Text className="text-[12px] text-alumni-on-surface-variant truncate" numberOfLines={1}>Marketing • Class of '23</Text>
                </View>
                <View className="flex-row items-center gap-2 flex-shrink-0">
                  <View className="hidden sm:flex px-2 py-1 bg-alumni-surface-container-high rounded-full">
                    <Text className="text-[10px] text-alumni-on-surface-variant uppercase font-bold tracking-wider">Reviewing</Text>
                  </View>
                  <TouchableOpacity className="p-2 rounded-full hover:bg-alumni-surface-container-high">
                    <MaterialIcons name="chat-bubble-outline" size={16} color="#464555" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Right Column */}
        <View className="flex-1 lg:flex-1 space-y-6 flex-col">
          {/* Stats Summary */}
          <View className="flex-row flex-wrap -mx-2 mb-6">
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-alumni-surface-card p-4 rounded-xl border border-alumni-border-subtle shadow-sm flex-col items-center text-center">
                <MaterialIcons name="hub" size={24} color="#3525cd" className="mb-1" />
                <Text className="text-[24px] font-bold text-alumni-on-surface">1.2k</Text>
                <Text className="text-[12px] text-alumni-on-surface-variant">Connections</Text>
              </View>
            </View>
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-alumni-surface-card p-4 rounded-xl border border-alumni-border-subtle shadow-sm flex-col items-center text-center">
                <MaterialIcons name="assignment" size={24} color="#5b598c" className="mb-1" />
                <Text className="text-[24px] font-bold text-alumni-on-surface">12</Text>
                <Text className="text-[12px] text-alumni-on-surface-variant">Jobs Posted</Text>
              </View>
            </View>
            <View className="w-full px-2">
              <View className="bg-alumni-surface-card p-4 rounded-xl border border-alumni-border-subtle shadow-sm flex-col items-center text-center">
                <View className="flex-row items-center gap-2 mb-1">
                  <MaterialIcons name="diversity-3" size={24} color="#3a495f" />
                  <Text className="text-[24px] font-bold text-alumni-on-surface">3</Text>
                </View>
                <Text className="text-[12px] text-alumni-on-surface-variant">Active Mentorship Requests</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity Feed */}
          <View className="bg-alumni-surface-card rounded-xl border border-alumni-border-subtle shadow-sm flex-col h-[400px]">
            <View className="p-4 border-b border-alumni-border-subtle flex-row items-center justify-between">
              <Text className="text-[20px] font-semibold text-alumni-on-surface">Recent Activity</Text>
              <TouchableOpacity className="text-alumni-on-surface-variant hover:text-alumni-primary transition-colors">
                <MaterialIcons name="filter-list" size={24} color="#464555" />
              </TouchableOpacity>
            </View>
            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
              {/* Feed Item */}
              <View className="flex-row gap-4 relative mb-6">
                <View className="absolute left-[15px] top-[32px] bottom-[-24px] w-[1px] bg-alumni-border-subtle z-0" />
                <View className="w-8 h-8 rounded-full bg-[#4f46e5]/10 flex items-center justify-center flex-shrink-0 z-10">
                  <MaterialIcons name="thumb-up" size={16} color="#3525cd" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] text-alumni-on-surface mb-1 leading-5">
                    <Text className="font-medium">David Chen</Text> endorsed you for <Text className="font-medium text-alumni-secondary">UX Design</Text>.
                  </Text>
                  <Text className="text-[12px] text-alumni-on-surface-variant">2 hours ago</Text>
                </View>
              </View>
              
              {/* Feed Item */}
              <View className="flex-row gap-4 relative mb-6">
                <View className="absolute left-[15px] top-[32px] bottom-[-24px] w-[1px] bg-alumni-border-subtle z-0" />
                <View className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 z-10 border border-alumni-border-subtle">
                   <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvz-NVL7qoKHB-Ibb6x_io9YoIDAKwg9KQ9_L411BEdg0SzucQQX5QqaDhqIjfIJVr04hBEhyzrya-7lw6wt1ob_tQHtII9A4QDaFXULmInNJZJ875fcnrCXrc68IPUQ2khJRP0AG7jAUQRmH6IxR1etkgxSIgL3dOb1JIykNpucYjuZjwtii_zBXov1BFjWLOtsF5cVkVq6AduEKO3Kwz1lpTnzYXnbspEmCDkjdcg1yg4bgoWwd7' }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] text-alumni-on-surface mb-1 leading-5">
                    <Text className="font-medium">Prof. Miller</Text> commented on your recent job posting.
                  </Text>
                  <View className="bg-alumni-surface-container-low p-2 rounded-md mt-1 mb-1">
                    <Text className="text-[14px] text-alumni-on-surface-variant italic">"Great opportunity for our recent grads!"</Text>
                  </View>
                  <Text className="text-[12px] text-alumni-on-surface-variant">5 hours ago</Text>
                </View>
              </View>
              
              {/* Feed Item */}
              <View className="flex-row gap-4 relative mb-2">
                <View className="w-8 h-8 rounded-full bg-alumni-status-success-bg flex items-center justify-center flex-shrink-0 z-10">
                  <MaterialIcons name="check-circle" size={16} color="#166534" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] text-alumni-on-surface mb-1 leading-5">
                    Your event <Text className="font-medium">Alumni Tech Mixer '24</Text> was approved.
                  </Text>
                  <Text className="text-[12px] text-alumni-on-surface-variant">1 day ago</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
