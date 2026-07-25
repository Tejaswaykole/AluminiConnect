import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
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
  });

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
  };

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6">
        <Typography variant="h2">My Profile</Typography>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
          <Typography variant="body" color="primary" className="font-medium">
            {isEditing ? 'Save' : 'Edit'}
          </Typography>
        </TouchableOpacity>
      </View>

      <View className="items-center mb-8">
        <Avatar url={ALUMNI_USER.avatar} fallbackInitials="JD" size="lg" className="mb-4" />
        {isEditing ? (
          <TouchableOpacity className="bg-secondary/10 px-4 py-2 rounded-full">
            <Typography variant="caption" color="primary" className="font-medium">Change Photo</Typography>
          </TouchableOpacity>
        ) : null}
      </View>

      <Card className="mb-6">
        {isEditing ? (
          <View className="space-y-4">
            <Input 
              label="Full Name" 
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            />
            <Input 
              label="Job Title" 
              value={formData.position}
              onChangeText={(text) => setFormData(prev => ({ ...prev, position: text }))}
            />
            <Input 
              label="Company" 
              value={formData.company}
              onChangeText={(text) => setFormData(prev => ({ ...prev, company: text }))}
            />
            <Input 
              label="Location" 
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
            />
            <Input 
              label="Bio" 
              value={formData.bio}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
              multiline
              numberOfLines={4}
            />
          </View>
        ) : (
          <View>
            <View className="mb-6 border-b border-border-strong pb-6">
              <Typography variant="h3" className="mb-1">{formData.name}</Typography>
              <Typography variant="body" color="muted" className="mb-2">{formData.position} at {formData.company}</Typography>
              <Typography variant="caption" color="muted">{formData.location}</Typography>
            </View>
            
            <View className="mb-6 border-b border-border-strong pb-6">
              <Typography variant="h3" className="mb-2">About Me</Typography>
              <Typography variant="body">{formData.bio}</Typography>
            </View>

            <View className="mb-6 border-b border-border-strong pb-6">
              <Typography variant="h3" className="mb-2">Skills & Expertise</Typography>
              <View className="flex-row flex-wrap mt-2">
                {ALUMNI_USER.skills.map((skill, index) => (
                  <View key={index} className="mr-2 mb-2">
                    <Badge label={skill} variant="secondary" />
                  </View>
                ))}
              </View>
            </View>

            <View>
              <Typography variant="h3" className="mb-2">Education</Typography>
              <Typography variant="body">{ALUMNI_USER.education}</Typography>
              <Typography variant="caption" color="muted">Class of {ALUMNI_USER.graduationYear}</Typography>
            </View>
          </View>
        )}
      </Card>

      {!isEditing && (
        <Button 
          title="Log Out" 
          variant="outline" 
          onPress={() => router.replace('/login')} 
          className="mt-4 border-status-error"
        />
      )}
    </ScreenContainer>
  );
}
