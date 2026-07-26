import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { useAlumni } from '../../../hooks/queries/useAlumni';

export default function AlumniProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { data: alumniList = [] } = useAlumni();
  const alumni = alumniList.find(a => a.id === id);

  if (!alumni) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Alumni not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Directory
        </Typography>
      </TouchableOpacity>

      <View className="items-center mb-8">
        <Avatar url={alumni.avatar} fallbackInitials={(alumni.name || alumni.first_name || '?').charAt(0)} size="xl" className="mb-4" />
        <Typography variant="h1" className="mb-1 text-center">{alumni.name || `${alumni.first_name || ''} ${alumni.last_name || ''}`}</Typography>
        <Typography variant="body" className="font-medium text-center mb-1">{alumni.position || 'Alumni'} at {alumni.company || 'Unknown Company'}</Typography>
        <Typography variant="caption" color="muted" className="text-center mb-4">
          Class of {alumni.graduationYear || '2020'} • {alumni.location || 'Unknown Location'}
        </Typography>
        {alumni.availableForMentorship && (
          <Badge label="Available for Mentorship" variant="success" />
        )}
      </View>

      <View className="flex-row space-x-4 mb-8">
        <View className="flex-1 mr-2">
          <Button title="Message" variant="outline" onPress={() => router.push(`/student/messages/${alumni.id}`)} />
        </View>
        <View className="flex-1 ml-2">
          {alumni.availableForMentorship ? (
            <Button title="Request Mentorship" onPress={() => router.push(`/student/mentorship/${alumni.id}` as any)} />
          ) : (
            <Button title="Connect" onPress={() => { typeof window !== 'undefined' ? window.alert(`You have successfully requested to connect with ${alumni.name || alumni.first_name}.`) : Alert.alert('Connection Request Sent', `You have successfully requested to connect with ${alumni.name || alumni.first_name}.`)}} />
          )}
        </View>
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-3">About</Typography>
        <Typography variant="body" color="muted" className="leading-relaxed">
          {alumni.about || 'No description provided.'}
        </Typography>
      </Card>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Skills & Expertise</Typography>
        <View className="flex-row flex-wrap">
          {(alumni.skills || []).map((skill: string) => (
            <Badge key={skill} label={skill} variant="secondary" className="mr-2 mb-2" />
          ))}
        </View>
      </Card>
      
      {/* Experience mock section */}
      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Experience</Typography>
        <View className="mb-4">
          <Typography variant="body" className="font-semibold">{alumni.position || 'Alumni'}</Typography>
          <Typography variant="body">{alumni.company || 'Unknown Company'}</Typography>
          <Typography variant="caption" color="muted">2020 - Present</Typography>
        </View>
      </Card>
    </ScreenContainer>
  );
}
