import { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Switch, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ALUMNI_USER } from '../../../mocks';
import { TextInput } from 'react-native';

const InputField = ({ label, value, onChangeText, multiline = false, numberOfLines = 1, ...props }: any) => (
  <View className={`mb-4 ${props.className}`}>
    <Text className="text-[14px] font-medium text-alumni-on-surface mb-2">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
      className={`w-full bg-alumni-surface-container-low border border-alumni-outline-variant rounded-xl px-4 py-3 text-[16px] text-alumni-on-surface focus:border-alumni-primary ${multiline ? 'min-h-[100px]' : ''}`}
      {...props}
    />
  </View>
);

export default function AlumniProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailableForMentorship, setIsAvailableForMentorship] = useState(true);
  
  // Local state for editing
  const [formData, setFormData] = useState({
    name: ALUMNI_USER.name,
    position: ALUMNI_USER.position,
    company: ALUMNI_USER.company,
    bio: ALUMNI_USER.bio,
    location: ALUMNI_USER.location,
    linkedin: 'linkedin.com/in/sara',
    github: 'github.com/sara',
    avatarUrl: ALUMNI_USER.avatar || '',
    bannerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
  });

  const handleSave = () => {
    setIsEditing(false);
  };

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
      {/* Profile Header / Bento Top */}
      <View className="bg-alumni-surface-card rounded-xl border border-alumni-border-subtle shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden mb-6 relative">
        {/* Cover Photo */}
        <View className="h-48 md:h-64 w-full relative">
          <Image 
            source={{ uri: formData.bannerUrl || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80' }}
            className="w-full h-full absolute inset-0"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </View>

        {/* Profile Info Container */}
        <View className="px-6 pb-6 relative">
          {/* Avatar & Actions Row */}
          <View className="flex-row justify-between items-end -mt-16 mb-4">
            <View className="relative">
              <View className="w-32 h-32 border-4 border-alumni-surface-card rounded-full overflow-hidden relative z-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] bg-alumni-surface-container-highest">
                 {formData.avatarUrl ? (
                    <Image source={{ uri: formData.avatarUrl }} className="w-full h-full" resizeMode="cover" />
                 ) : (
                    <View className="w-full h-full items-center justify-center bg-alumni-surface-container-highest">
                       <Text className="text-[40px] text-alumni-on-surface-variant font-bold">{formData.name.charAt(0)}</Text>
                    </View>
                 )}
              </View>
              <View className="absolute bottom-1 right-1 bg-alumni-surface-card rounded-full p-1 z-20 shadow-sm border border-alumni-border-subtle">
                <MaterialIcons name="verified" size={20} color="#3525cd" />
              </View>
            </View>
            <View className="flex-row gap-4">
              <TouchableOpacity className="bg-alumni-surface-card border border-alumni-border-subtle px-4 py-2 rounded-lg hover:bg-alumni-surface-container-low transition-colors flex-row items-center gap-1">
                <MaterialIcons name="share" size={18} color="#3525cd" />
                <Text className="text-[14px] text-alumni-primary font-medium hidden sm:flex">Share Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing(!isEditing)} className="bg-alumni-primary px-4 py-2 rounded-lg hover:bg-alumni-primary-container flex-row items-center gap-1 transition-colors">
                <MaterialIcons name={isEditing ? "close" : "edit"} size={18} color="#ffffff" />
                <Text className="text-[14px] text-alumni-on-primary font-medium hidden sm:flex">{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Name & Title */}
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-[32px] font-semibold text-alumni-on-surface">{formData.name}</Text>
              <View className="bg-alumni-primary-fixed border border-alumni-primary-fixed-dim px-2 py-1 rounded-full">
                <Text className="text-[12px] text-alumni-on-primary-fixed-variant font-medium">Alumni '18</Text>
              </View>
            </View>
            <Text className="text-[20px] text-alumni-tertiary mt-1 font-semibold">{formData.position} @ {formData.company}</Text>
            
            <View className="flex-row items-center mt-2 gap-6">
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="location-on" size={16} color="#464555" />
                <Text className="text-[16px] text-alumni-on-surface-variant">{formData.location}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="link" size={16} color="#464555" />
                <Text className="text-[16px] text-alumni-on-surface-variant">sarahchen.dev</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Mentorship Availability Callout */}
      {!isEditing && (
        <View className="bg-alumni-surface-bright border border-alumni-border-subtle rounded-xl p-6 mb-6 flex-col md:flex-row justify-between items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <View className="flex-1 mr-4 mb-4 md:mb-0">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="handshake" size={24} color="#166534" />
              <Text className="text-[20px] font-semibold text-alumni-on-surface">Mentorship Status</Text>
            </View>
            <Text className="text-[16px] text-alumni-on-surface-variant mt-1">Sarah is currently available for resume reviews and 1:1 career chats.</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Switch 
              value={isAvailableForMentorship} 
              onValueChange={setIsAvailableForMentorship} 
              trackColor={{ false: '#e1e2e8', true: '#166534' }}
              thumbColor={'#ffffff'}
            />
            <Text className="text-[14px] text-alumni-on-surface font-medium">
              {isAvailableForMentorship ? 'Available' : 'Unavailable'}
            </Text>
          </View>
        </View>
      )}

      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="mb-6 bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Professional Details</Text>
            <InputField label="Full Name" value={formData.name} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, name: t }))} />
            <InputField label="Job Title" value={formData.position} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, position: t }))} />
            <InputField label="Company" value={formData.company} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, company: t }))} />
            <InputField label="Location" value={formData.location} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, location: t }))} />
            <InputField label="Professional Bio" value={formData.bio} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, bio: t }))} multiline numberOfLines={4} textAlignVertical="top" />
          </View>

          <View className="mb-6 bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
             <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Social Links</Text>
             <InputField label="LinkedIn URL" value={formData.linkedin} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, linkedin: t }))} />
             <InputField label="GitHub URL" value={formData.github} onChangeText={(t: string) => setFormData((p: any) => ({ ...p, github: t }))} />
          </View>

          <View className="flex-row gap-4 mb-8">
             <TouchableOpacity onPress={handleSave} className="flex-1 bg-alumni-primary rounded-lg py-3 items-center">
                 <Text className="text-white font-semibold">Save Changes</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => setIsEditing(false)} className="flex-1 bg-alumni-surface-card border border-alumni-border-subtle rounded-lg py-3 items-center">
                 <Text className="text-alumni-primary font-semibold">Cancel</Text>
             </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View className="flex-col md:flex-row gap-6">
          {/* Left Column */}
          <View className="flex-1 md:flex-[2] space-y-6 flex-col">
            {/* About */}
            <View className="bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
              <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">About</Text>
              <Text className="text-[16px] text-alumni-on-surface-variant leading-relaxed">
                Passionate software engineer with 5+ years of experience in building scalable cloud infrastructure and user-centric web applications. Specializing in distributed systems and functional programming. Active contributor to open-source projects and dedicated advocate for women in STEM. Always looking to connect with fellow alumni and support current students navigating the tech industry.
              </Text>
            </View>

            {/* Experience */}
            <View className="bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
              <Text className="text-[20px] font-semibold text-alumni-on-surface mb-6">Experience</Text>
              
              <View className="border-l-2 border-alumni-surface-container-high ml-4 space-y-8 flex-col relative">
                {/* Timeline Item 1 */}
                <View className="pl-6 relative mb-8">
                  <View className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-alumni-surface-card bg-alumni-primary" />
                  <View className="flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <View>
                      <Text className="text-[20px] text-alumni-on-surface font-semibold">Senior Software Engineer</Text>
                      <Text className="text-[16px] text-alumni-secondary font-medium">Google</Text>
                    </View>
                    <View className="bg-alumni-surface-container-low px-2 py-1 rounded mt-2 md:mt-0 self-start">
                      <Text className="text-[12px] text-alumni-on-surface-variant">2021 - Present</Text>
                    </View>
                  </View>
                  <Text className="text-[16px] text-alumni-on-surface-variant">Leading a team of 5 engineers in developing core microservices for Google Cloud Platform. Improved system latency by 20% through architectural optimizations.</Text>
                </View>

                {/* Timeline Item 2 */}
                <View className="pl-6 relative">
                  <View className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-alumni-surface-card bg-alumni-surface-variant" />
                  <View className="flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <View>
                      <Text className="text-[20px] text-alumni-on-surface font-semibold">Software Engineer II</Text>
                      <Text className="text-[16px] text-alumni-secondary font-medium">Amazon</Text>
                    </View>
                    <View className="bg-alumni-surface-container-low px-2 py-1 rounded mt-2 md:mt-0 self-start">
                      <Text className="text-[12px] text-alumni-on-surface-variant">2018 - 2021</Text>
                    </View>
                  </View>
                  <Text className="text-[16px] text-alumni-on-surface-variant">Developed and maintained high-throughput payment processing APIs handling millions of transactions daily.</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View className="flex-1 space-y-6 flex-col">
            {/* Education */}
            <View className="bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
              <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Education</Text>
              <View className="flex-row items-start gap-4">
                <View className="w-12 h-12 bg-alumni-surface-container-low rounded-lg flex items-center justify-center flex-shrink-0">
                  <MaterialIcons name="school" size={24} color="#3525cd" />
                </View>
                <View>
                  <Text className="text-[16px] text-alumni-on-surface font-semibold">University of Technology</Text>
                  <Text className="text-[14px] text-alumni-on-surface-variant">B.S. Computer Science</Text>
                  <Text className="text-[12px] text-alumni-outline mt-1">Class of 2018 • Summa Cum Laude</Text>
                </View>
              </View>
            </View>

            {/* Skills */}
            <View className="bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
              <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Skills</Text>
              <View className="flex-row flex-wrap gap-2">
                {['Go', 'Python', 'Distributed Systems', 'Kubernetes', 'AWS/GCP', 'System Architecture'].map((skill, i) => (
                  <View key={i} className="px-3 py-1 bg-alumni-surface-container-low rounded-full border border-alumni-border-subtle">
                    <Text className="text-[14px] text-alumni-on-surface font-medium">{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Certifications */}
            <View className="bg-alumni-surface-card border border-alumni-border-subtle rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
              <Text className="text-[20px] font-semibold text-alumni-on-surface mb-4">Certifications</Text>
              <View className="flex-col gap-3">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="workspace-premium" size={20} color="#3525cd" />
                  <Text className="text-[16px] text-alumni-on-surface">GCP Professional Cloud Architect</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="workspace-premium" size={20} color="#3525cd" />
                  <Text className="text-[16px] text-alumni-on-surface">AWS Certified Solutions Architect</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
