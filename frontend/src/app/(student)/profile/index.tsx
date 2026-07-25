import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { CURRENT_USER } from '../../../mocks';

export default function StudentProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(CURRENT_USER.bio);
  const [skills, setSkills] = useState(CURRENT_USER.skills.join(', '));
  
  const handleSave = () => {
    // In a real app, this would mutate backend state
    setIsEditing(false);
  };

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6">
        <Typography variant="h1">My Profile</Typography>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Typography variant="body" color="primary" className="font-semibold">Edit</Typography>
          </TouchableOpacity>
        )}
      </View>

      <View className="items-center mb-8">
        <Avatar url={CURRENT_USER.avatar} fallbackInitials="AJ" size="xl" className="mb-4" />
        <Typography variant="h2" className="mb-1">{CURRENT_USER.name}</Typography>
        <Typography variant="body" className="font-medium text-center mb-1">
          {CURRENT_USER.department}
        </Typography>
        <Typography variant="caption" color="muted" className="text-center">
          {CURRENT_USER.college} • Class of {CURRENT_USER.graduationYear}
        </Typography>
      </View>

      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Card className="mb-6">
            <Input 
              label="Bio"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              className="mb-4"
              textAlignVertical="top"
            />
            <Input 
              label="Skills (comma separated)"
              value={skills}
              onChangeText={setSkills}
              className="mb-4"
            />
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Cancel" variant="ghost" onPress={() => setIsEditing(false)} className="mt-2" />
          </Card>
        </KeyboardAvoidingView>
      ) : (
        <>
          <Card className="mb-6">
            <Typography variant="h3" className="mb-3">About</Typography>
            <Typography variant="body" color="muted" className="leading-relaxed">
              {bio}
            </Typography>
          </Card>

          <Card className="mb-6">
            <Typography variant="h3" className="mb-4">Skills</Typography>
            <View className="flex-row flex-wrap gap-2">
              {skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                <Badge key={skill} label={skill} variant="secondary" />
              ))}
            </View>
          </Card>

          <Card className="mb-6">
            <Typography variant="h3" className="mb-4">Interests</Typography>
            <View className="flex-row flex-wrap gap-2">
              {CURRENT_USER.interests.map(interest => (
                <Badge key={interest} label={interest} variant="outline" />
              ))}
            </View>
          </Card>
          
          <Card className="mb-6">
            <View className="flex-row justify-between items-center">
              <View>
                <Typography variant="h3" className="mb-1">Resume</Typography>
                <Typography variant="caption" color="muted">Last updated 2 days ago</Typography>
              </View>
              <Button title="Upload New" variant="outline" onPress={() => {}} />
            </View>
          </Card>
        </>
      )}
    </ScreenContainer>
  );
}
