import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { COMMUNITY_MOCKS } from '../../../mocks';

export default function CommunityDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const comm = COMMUNITY_MOCKS.find(c => c.id === id);

  if (!comm) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Community not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Communities
        </Typography>
      </TouchableOpacity>

      <View className="mb-8">
        <View className="w-16 h-16 bg-primary/10 rounded-xl items-center justify-center mb-4">
          <MaterialIcons name="forum" size={24} color="#154539" />
        </View>
        <Typography variant="h1" className="mb-2">{comm.name}</Typography>
        <Typography variant="body" color="muted" className="mb-4">
          {comm.members.toLocaleString()} members • Active {comm.recentActivity}
        </Typography>
        
        <Button title="Join Community" onPress={() => { typeof window !== 'undefined' ? window.alert(`You have successfully joined the ${comm.name} community.`) : Alert.alert('Community Joined', `You have successfully joined the ${comm.name} community.`) }} />
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-3">About</Typography>
        <Typography variant="body" color="muted" className="leading-relaxed">
          {comm.description}
        </Typography>
      </Card>
      
      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Recent Posts</Typography>
        <View className="mb-4 pb-4 border-b border-border">
          <Typography variant="body" className="font-semibold mb-1">Upcoming Meetup Details</Typography>
          <Typography variant="caption" color="muted">Posted by Admin • 2 hours ago</Typography>
        </View>
        <View className="mb-4 pb-4 border-b border-border">
          <Typography variant="body" className="font-semibold mb-1">Resource Sharing: Top React Native Libraries</Typography>
          <Typography variant="caption" color="muted">Posted by Alex • 1 day ago</Typography>
        </View>
        <View>
          <Typography variant="body" className="font-semibold mb-1">Looking for study partners!</Typography>
          <Typography variant="caption" color="muted">Posted by Sam • 2 days ago</Typography>
        </View>
      </Card>
    </ScreenContainer>
  );
}
