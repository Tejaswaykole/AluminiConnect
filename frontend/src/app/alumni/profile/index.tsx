import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Avatar } from '../../../components/Avatar';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Badge } from '../../../components/Badge';
import { ALUMNI_USER } from '../../../mocks';

export default function AlumniProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing
  const [formData, setFormData] = useState({
    name: ALUMNI_USER.name,
    position: ALUMNI_USER.position,
    company: ALUMNI_USER.company,
    bio: ALUMNI_USER.bio,
    location: ALUMNI_USER.location,
    linkedin: 'linkedin.com/in/jd',
    github: 'github.com/jd',
    avatarUrl: ALUMNI_USER.avatar || '',
    bannerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <Typography variant="h1">Professional Profile</Typography>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-primary/10 px-4 py-2 rounded-lg">
            <Typography variant="body" color="primary" className="font-semibold">Edit Profile</Typography>
          </TouchableOpacity>
        )}
      </View>

      <View className="mb-8 bg-surface border border-border rounded-2xl overflow-hidden relative">
        <Image 
          source={{ uri: formData.bannerUrl || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80' }} 
          className="w-full h-32 bg-primary/20"
          resizeMode="cover"
        />
        <View className="px-6 pb-6 pt-14 relative items-center">
          <View className="absolute -top-12 border-4 border-surface rounded-full">
            <Avatar url={formData.avatarUrl} fallbackInitials={ALUMNI_USER.name.charAt(0)} size="xl" />
          </View>
          <Typography variant="h2" className="mb-1 mt-2 text-center">{formData.name}</Typography>
          <Typography variant="body" className="font-medium text-center mb-1 text-primary">
            {formData.position} at {formData.company}
          </Typography>
          <Typography variant="caption" color="muted" className="text-center mb-4">
            {formData.location} • Verified Alumni <MaterialIcons name="check" size={20} color="#154539" />
          </Typography>
        </View>
      </View>

      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Academic Background</Typography>
            <Typography variant="caption" color="muted" className="mb-4">Verified by Institution.</Typography>
            <Input label="Institution" value={ALUMNI_USER.education} editable={false} className="mb-3 opacity-70" />
            <Input label="Graduation Year" value={ALUMNI_USER.graduationYear.toString()} editable={false} className="mb-3 opacity-70" />
          </Card>

          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Professional Details</Typography>
            <Input label="Full Name" value={formData.name} onChangeText={(t) => setFormData(p => ({ ...p, name: t }))} className="mb-3" />
            <Input label="Job Title" value={formData.position} onChangeText={(t) => setFormData(p => ({ ...p, position: t }))} className="mb-3" />
            <Input label="Company" value={formData.company} onChangeText={(t) => setFormData(p => ({ ...p, company: t }))} className="mb-3" />
            <Input label="Location" value={formData.location} onChangeText={(t) => setFormData(p => ({ ...p, location: t }))} className="mb-3" />
            <Input label="Professional Bio" value={formData.bio} onChangeText={(t) => setFormData(p => ({ ...p, bio: t }))} multiline numberOfLines={4} className="mb-3" textAlignVertical="top" />
          </Card>

          <Card className="mb-6 bg-surface border border-border">
             <Typography variant="h3" className="mb-4">Profile Images</Typography>
             <Input label="Profile Picture URL" value={formData.avatarUrl} onChangeText={(t) => setFormData(p => ({ ...p, avatarUrl: t }))} className="mb-3" />
             <Input label="Cover Banner URL" value={formData.bannerUrl} onChangeText={(t) => setFormData(p => ({ ...p, bannerUrl: t }))} className="mb-3" />
          </Card>

          <Card className="mb-6 bg-surface border border-border">
             <Typography variant="h3" className="mb-4">Social Links</Typography>
             <Input label="LinkedIn URL" value={formData.linkedin} onChangeText={(t) => setFormData(p => ({ ...p, linkedin: t }))} className="mb-3" />
             <Input label="GitHub URL" value={formData.github} onChangeText={(t) => setFormData(p => ({ ...p, github: t }))} className="mb-3" />
          </Card>

          <View className="flex-row gap-4 mb-8">
             <Button title="Save Changes" onPress={handleSave} className="flex-1" />
             <Button title="Cancel" variant="outline" onPress={() => setIsEditing(false)} className="flex-1" />
          </View>
        </KeyboardAvoidingView>
      ) : (
        <>
          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-3">About Me</Typography>
            <Typography variant="body" color="muted" className="leading-relaxed">
              {formData.bio}
            </Typography>
          </Card>

          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Skills & Expertise</Typography>
            <View className="flex-row flex-wrap gap-2">
              {ALUMNI_USER.skills.map((skill, index) => (
                <Badge key={index} label={skill} variant="secondary" />
              ))}
            </View>
          </Card>

          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Education</Typography>
            <View className="flex-row items-center border-b border-border pb-4 mb-4">
               <View className="w-12 h-12 bg-secondary/10 rounded-lg items-center justify-center mr-4">
                  <MaterialIcons name="school" size={24} color="#154539" />
               </View>
               <View>
                  <Typography variant="body" className="font-semibold">{ALUMNI_USER.education}</Typography>
                  <Typography variant="caption" color="muted">Class of {ALUMNI_USER.graduationYear}</Typography>
               </View>
            </View>
          </Card>

          <Card className="mb-6 bg-surface border border-border">
            <View className="flex-row justify-between items-center">
              <View>
                <Typography variant="h3" className="mb-1">Primary Resume</Typography>
                <Typography variant="caption" color="muted">Last updated 6 months ago</Typography>
              </View>
              <Button title="Manage Resumes" variant="outline" onPress={() => {}} />
            </View>
          </Card>
        </>
      )}
    </ScreenContainer>
  );
}
