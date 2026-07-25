import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { STUDENT_MOCKS } from '../../../mocks';

export default function AlumniMentorshipScreen() {
  const router = useRouter();

  // Mocking incoming requests and active mentorships using student mocks
  const requests = STUDENT_MOCKS.slice(0, 1);
  const activeMentorships = STUDENT_MOCKS.slice(1, 3);

  return (
    <ScreenContainer>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Dashboard
        </Typography>
      </TouchableOpacity>

      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Mentorship</Typography>
        <Typography variant="body" color="muted">Manage your student mentees and requests.</Typography>
      </View>

      <View className="mb-6">
        <Typography variant="h3" className="mb-4">Pending Requests ({requests.length})</Typography>
        {requests.length > 0 ? (
          requests.map(student => (
            <TouchableOpacity key={student.id} onPress={() => router.push(`/mentorship/${student.id}`)}>
              <Card className="mb-4 border-primary/20 bg-primary/5">
                <View className="flex-row items-center mb-3">
                  <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="md" className="mr-4" />
                  <View className="flex-1">
                    <Typography variant="h3">{student.name}</Typography>
                    <Typography variant="caption" color="muted">{student.college}</Typography>
                  </View>
                  <View className="bg-status-warning/10 px-2 py-1 rounded-md">
                    <Typography variant="caption" color="primary" className="font-medium">New</Typography>
                  </View>
                </View>
                <Typography variant="body" numberOfLines={2} className="mb-3">
                  "Hi! I'm really interested in your background in {student.interests[0]} and would love some career guidance."
                </Typography>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Typography variant="body" color="muted">No pending requests at the moment.</Typography>
        )}
      </View>

      <View>
        <Typography variant="h3" className="mb-4">Active Mentees ({activeMentorships.length})</Typography>
        {activeMentorships.length > 0 ? (
          activeMentorships.map(student => (
            <TouchableOpacity key={student.id} onPress={() => router.push(`/mentorship/${student.id}`)}>
              <Card className="mb-4">
                <View className="flex-row items-center">
                  <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="md" className="mr-4" />
                  <View className="flex-1">
                    <Typography variant="h3">{student.name}</Typography>
                    <Typography variant="caption" color="muted">{student.department}</Typography>
                  </View>
                  <View className="bg-status-success/10 px-2 py-1 rounded-md">
                    <Typography variant="caption" color="primary" className="font-medium">Active</Typography>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Typography variant="body" color="muted">You don't have any active mentees.</Typography>
        )}
      </View>
    </ScreenContainer>
  );
}
