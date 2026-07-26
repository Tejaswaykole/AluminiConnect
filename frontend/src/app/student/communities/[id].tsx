import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { COMMUNITY_MOCKS } from '../../../mocks';

export default function CommunityDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const comm = COMMUNITY_MOCKS.find(c => c.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  if (!comm) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Community not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  const handleJoin = () => {
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsJoined(true);
    }, 1500);
  };

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
        
        {isJoined ? (
          <View className="bg-status-success/10 py-3 px-4 rounded-xl flex-row items-center justify-center">
            <MaterialIcons name="check-circle" size={20} color="#154539" className="mr-2" />
            <Typography variant="body" className="font-medium text-status-success">
               You joined this community
            </Typography>
          </View>
        ) : (
          <Button title="Join Community" onPress={handleJoin} isLoading={isSubmitting} />
        )}
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
