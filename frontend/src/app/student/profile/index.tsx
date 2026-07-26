import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { useCurrentUser } from '../../../hooks/queries';

export default function StudentProfileScreen() {
  const { data: user } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const [bio, setBio] = useState('Aspiring software engineer passionate about building scalable backend systems.');
  const [skills, setSkills] = useState('Python, React, TypeScript, SQL');
  const [careerInterests, setCareerInterests] = useState('Backend Development, Cloud Infrastructure');
  const [githubUrl, setGithubUrl] = useState('https://github.com/alexj');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alexj');

  useEffect(() => {
    if (user) {
      if (user.bio) setBio(user.bio);
      if (user.skills) setSkills(user.skills.join(', '));
    }
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6">
        <Typography variant="h1">My Profile</Typography>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-primary/10 px-4 py-2 rounded-lg">
            <Typography variant="body" color="primary" className="font-semibold">Edit Profile</Typography>
          </TouchableOpacity>
        )}
      </View>

      {/* Header Info */}
      <View className="items-center mb-8 bg-surface border border-border p-6 rounded-2xl">
        <Avatar url={user.avatar} fallbackInitials={user.name?.charAt(0) || 'U'} size="xl" className="mb-4" />
        <Typography variant="h2" className="mb-1">{user.name}</Typography>
        <Typography variant="body" className="font-medium text-center mb-1 text-primary">
          {user.department}
        </Typography>
        <Typography variant="caption" color="muted" className="text-center mb-4">
          {user.college} • Class of {user.graduationYear}
        </Typography>
        <View className="flex-row gap-2">
            <Badge label="Looking for Internships" variant="secondary" />
            <Badge label="Public Profile" variant="outline" />
        </View>
      </View>

      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          
          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Academic Information</Typography>
            <Typography variant="caption" color="muted" className="mb-4">These fields are verified by your institution and cannot be changed.</Typography>
            <Input label="Institution" value={user.college} editable={false} className="mb-3 opacity-70" />
            <Input label="Department" value={user.department} editable={false} className="mb-3 opacity-70" />
            <Input label="Enrollment Number" value="ENR-2023-4491" editable={false} className="mb-3 opacity-70" />
          </Card>

          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Personal Details</Typography>
            <Input label="Bio" value={bio} onChangeText={setBio} multiline numberOfLines={4} className="mb-4" textAlignVertical="top" />
            <Input label="Skills (comma separated)" value={skills} onChangeText={setSkills} className="mb-4" />
            <Input label="Career Interests" value={careerInterests} onChangeText={setCareerInterests} className="mb-4" />
          </Card>

          <Card className="mb-6 bg-surface border border-border">
             <Typography variant="h3" className="mb-4">Social Links</Typography>
             <Input label="GitHub URL" value={githubUrl} onChangeText={setGithubUrl} className="mb-3" />
             <Input label="LinkedIn URL" value={linkedinUrl} onChangeText={setLinkedinUrl} className="mb-3" />
          </Card>

          <View className="flex-row gap-4 mb-8">
             <Button title="Save Changes" onPress={handleSave} className="flex-1" />
             <Button title="Cancel" variant="outline" onPress={() => setIsEditing(false)} className="flex-1" />
          </View>

        </KeyboardAvoidingView>
      ) : (
        <>
          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-3">About</Typography>
            <Typography variant="body" color="muted" className="leading-relaxed">{bio}</Typography>
          </Card>

          <View className="flex-row gap-4 mb-6">
              <Card className="flex-1 bg-surface border border-border">
                <Typography variant="h3" className="mb-4">Skills</Typography>
                <View className="flex-row flex-wrap gap-2">
                  {skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                    <Badge key={skill} label={skill} variant="secondary" />
                  ))}
                </View>
              </Card>

              <Card className="flex-1 bg-surface border border-border">
                <Typography variant="h3" className="mb-4">Career Interests</Typography>
                <View className="flex-row flex-wrap gap-2">
                  {careerInterests.split(',').map(s => s.trim()).filter(Boolean).map(interest => (
                    <Badge key={interest} label={interest} variant="outline" />
                  ))}
                </View>
              </Card>
          </View>

          <Card className="mb-6 bg-surface border border-border">
            <Typography variant="h3" className="mb-4">Projects & Achievements</Typography>
            <View className="mb-4 border-b border-border pb-4">
                <Typography variant="body" className="font-semibold mb-1">AlmaBridge Mobile App</Typography>
                <Typography variant="caption" color="muted" className="mb-2">Oct 2023 - Present</Typography>
                <Typography variant="body" color="muted">Built the React Native mobile app bridging students and alumni.</Typography>
            </View>
            <View>
                <Typography variant="body" className="font-semibold mb-1">AWS Certified Developer - Associate</Typography>
                <Typography variant="caption" color="muted" className="mb-2">Issued Jan 2024</Typography>
            </View>
          </Card>
          
          <Card className="mb-6 bg-surface border border-border">
            <View className="flex-row justify-between items-center">
              <View>
                <Typography variant="h3" className="mb-1">Primary Resume</Typography>
                <Typography variant="caption" color="status-success">ATS Score: 92% • Last updated 2 days ago</Typography>
              </View>
              <Button title="Manage Resumes" variant="outline" onPress={() => {}} />
            </View>
          </Card>
        </>
      )}
    </ScreenContainer>
  );
}
