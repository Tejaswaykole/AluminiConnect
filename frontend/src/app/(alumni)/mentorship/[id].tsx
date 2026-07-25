import { View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { STUDENT_MOCKS } from '../../../mocks';

export default function AlumniMentorshipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const student = STUDENT_MOCKS.find(s => s.id === id);

  if (!student) {
    return (
      <ScreenContainer>
        <Typography>Request not found.</Typography>
      </ScreenContainer>
    );
  }

  // Determine if it's a pending request or active mentorship based on mock logic
  // Just a simple mock condition
  const isPending = id === 's1';

  return (
    <ScreenContainer scrollable>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Mentorship
        </Typography>
      </TouchableOpacity>

      <Card className="mb-6 items-center py-8">
        <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="lg" className="mb-4" />
        <Typography variant="h2" className="mb-1">{student.name}</Typography>
        <Typography variant="body" color="muted" className="mb-2">{student.college}</Typography>
        <View className={`px-3 py-1 rounded-md ${isPending ? 'bg-status-warning/10' : 'bg-status-success/10'}`}>
          <Typography variant="caption" color={isPending ? 'primary' : 'primary'} className="font-medium">
            {isPending ? 'Pending Request' : 'Active Mentee'}
          </Typography>
        </View>
      </Card>

      {isPending ? (
        <View className="mb-6">
          <Typography variant="h3" className="mb-2">Request Message</Typography>
          <Card className="bg-secondary/5 border-secondary/20">
            <Typography variant="body" className="italic text-text-muted">
              "Hi! I'm really interested in your background in {student.interests[0]} and would love some career guidance."
            </Typography>
          </Card>
          
          <View className="flex-row space-x-4 mt-6">
            <View className="flex-1 mr-2">
              <Button title="Accept" variant="primary" onPress={() => router.back()} />
            </View>
            <View className="flex-1 ml-2">
              <Button title="Decline" variant="outline" onPress={() => router.back()} />
            </View>
          </View>
        </View>
      ) : (
        <View className="mb-6">
          <View className="flex-row space-x-4 mb-6">
            <View className="flex-1 mr-2">
              <Button title="Message" variant="primary" />
            </View>
            <View className="flex-1 ml-2">
              <Button title="Schedule Meeting" variant="outline" />
            </View>
          </View>
          
          <Card>
            <Typography variant="h3" className="mb-4">Mentorship Goals</Typography>
            <Typography variant="body" className="mb-2">• Resume review and feedback</Typography>
            <Typography variant="body" className="mb-2">• Interview preparation</Typography>
            <Typography variant="body">• Career planning</Typography>
          </Card>
        </View>
      )}

      <TouchableOpacity onPress={() => router.push(`/discover/${student.id}`)} className="mt-4">
        <Typography variant="body" color="primary" className="text-center font-medium">View Full Profile</Typography>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
