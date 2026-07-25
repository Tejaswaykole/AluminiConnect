import { MaterialIcons } from '@expo/vector-icons';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { STUDENT_MOCKS } from '../../../mocks';

export default function AlumniMentorshipScreen() {
  const router = useRouter();

  // Mocking incoming requests and active mentorships using student mocks
  const requests = STUDENT_MOCKS.slice(0, 1);
  const activeMentorships = STUDENT_MOCKS.slice(1, 3);

  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2 flex-row justify-between items-center">
        <View>
            <Typography variant="h1" className="mb-1">Mentorship Center</Typography>
            <Typography variant="body" color="muted">Manage your mentees and availability.</Typography>
        </View>
        <TouchableOpacity className="bg-primary/10 px-3 py-2 rounded-lg">
          <Typography variant="caption" color="primary" className="font-semibold">Manage Availability</Typography>
        </TouchableOpacity>
      </View>

      {/* Analytics Summary */}
      <View className="flex-row justify-between mb-8 space-x-4">
        <Card className="flex-1 bg-surface border border-border items-center p-3">
          <Typography variant="h2" className="text-primary mb-1">12</Typography>
          <Typography variant="caption" color="muted">Total Mentees</Typography>
        </Card>
        <Card className="flex-1 bg-surface border border-border items-center p-3">
          <Typography variant="h2" className="text-primary mb-1">4.9</Typography>
          <Typography variant="caption" color="muted">Avg. Rating</Typography>
        </Card>
      </View>

      {/* Pending Requests */}
      <View className="mb-8">
        <Typography variant="h3" className="mb-4 flex-row items-center">
            Pending Requests <Typography variant="caption" className="bg-primary text-inverse px-2 py-0.5 rounded-full ml-2">{requests.length}</Typography>
        </Typography>
        {requests.length > 0 ? (
          requests.map(student => (
            <Card key={student.id} className="mb-4 border border-primary/30 bg-surface">
              <View className="flex-row items-center mb-3">
                <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="md" className="mr-4" />
                <View className="flex-1">
                  <Typography variant="h3">{student.name}</Typography>
                  <Typography variant="caption" color="muted">{student.college} • Class of {student.graduationYear}</Typography>
                </View>
                <View className="bg-primary/10 px-2 py-1 rounded-md">
                  <Typography variant="caption" color="primary" className="font-semibold">AI Matched <MaterialIcons name="auto-awesome" size={20} color="#154539" /></Typography>
                </View>
              </View>
              <Typography variant="body" numberOfLines={2} className="mb-4 italic text-muted">
                "I am extremely interested in your transition into Product Management and would love to hear your insights on the interview process."
              </Typography>
              <View className="flex-row gap-3">
                 <Button title="Accept Request" onPress={() => {}} className="flex-1" />
                 <Button title="Decline" variant="outline" onPress={() => {}} className="flex-1" />
              </View>
            </Card>
          ))
        ) : (
          <Typography variant="body" color="muted">No pending requests at the moment.</Typography>
        )}
      </View>

      {/* Active Mentees */}
      <View className="mb-6">
        <Typography variant="h3" className="mb-4">Active Mentees</Typography>
        {activeMentorships.length > 0 ? (
          activeMentorships.map(student => (
            <TouchableOpacity key={student.id} onPress={() => router.push(`/mentorship/${student.id}`)}>
              <Card className="mb-4 bg-surface border border-border">
                <View className="flex-row items-center mb-3">
                  <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="md" className="mr-4" />
                  <View className="flex-1">
                    <Typography variant="h3">{student.name}</Typography>
                    <Typography variant="caption" color="muted">{student.department}</Typography>
                  </View>
                  <View className="bg-status-success/10 px-3 py-1 rounded-full">
                    <Typography variant="caption" className="font-semibold text-status-success">Active</Typography>
                  </View>
                </View>
                
                <View className="flex-row justify-between border-t border-border pt-3">
                    <View>
                        <Typography variant="caption" color="muted">Next Session</Typography>
                        <Typography variant="body" className="font-semibold">Oct 24, 4:00 PM</Typography>
                    </View>
                    <TouchableOpacity className="justify-center">
                        <Typography variant="caption" color="primary" className="font-semibold">View Notes →</Typography>
                    </TouchableOpacity>
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
