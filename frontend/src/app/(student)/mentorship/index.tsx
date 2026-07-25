import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { ALUMNI_MOCKS } from '../../../mocks';

export default function MentorshipScreen() {
  const router = useRouter();

  // For mock purposes, just assume all alumni who are available for mentorship are active requests/mentors
  const mentors = ALUMNI_MOCKS.filter(a => a.availableForMentorship);

  return (
    <ScreenContainer>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Dashboard
        </Typography>
      </TouchableOpacity>

      <View className="mb-6">
        <Typography variant="h1" className="mb-2">My Mentors</Typography>
        <Typography variant="body" color="muted">Manage your mentorship connections and requests.</Typography>
      </View>

      <FlatList
        data={mentors}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No active mentors</Typography>
            <Typography variant="caption" color="muted">Discover alumni to request mentorship.</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/discover/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row items-center mb-3">
                <Avatar url={item.avatar} fallbackInitials={item.name.charAt(0)} size="md" className="mr-4" />
                <View className="flex-1">
                  <Typography variant="h3">{item.name}</Typography>
                  <Typography variant="caption" color="muted">{item.position} at {item.company}</Typography>
                </View>
                <View className="bg-status-success/10 px-2 py-1 rounded-md">
                  <Typography variant="caption" color="primary" className="font-medium">Active</Typography>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
