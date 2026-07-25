import { View, FlatList } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Avatar } from '../../../components/Avatar';
import { ALUMNI_MOCKS, STUDENT_MOCKS } from '../../../mocks';

export default function AdminMentorshipScreen() {
  const activePairs = [
    { id: '1', mentor: ALUMNI_MOCKS[0], mentee: STUDENT_MOCKS[0], status: 'Active' },
    { id: '2', mentor: ALUMNI_MOCKS[1], mentee: STUDENT_MOCKS[1], status: 'Pending' }
  ];

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Mentorship Monitoring</Typography>
        <Typography variant="body" color="muted">View system-wide mentorship connections.</Typography>
      </View>

      <FlatList
        data={activePairs}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card className="mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <View className={`px-2 py-1 rounded-md ${item.status === 'Active' ? 'bg-status-success/10' : 'bg-status-warning/10'}`}>
                <Typography variant="caption" color="primary" className="font-medium">
                  {item.status}
                </Typography>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="items-center flex-1">
                <Avatar url={item.mentor.avatar} fallbackInitials={item.mentor.name.charAt(0)} size="md" className="mb-2" />
                <Typography variant="caption" className="font-semibold text-center">{item.mentor.name}</Typography>
                <Typography variant="caption" color="muted">Mentor</Typography>
              </View>
              <Typography className="text-2xl text-border-strong mx-4">↔</Typography>
              <View className="items-center flex-1">
                <Avatar url={item.mentee.avatar} fallbackInitials={item.mentee.name.charAt(0)} size="md" className="mb-2" />
                <Typography variant="caption" className="font-semibold text-center">{item.mentee.name}</Typography>
                <Typography variant="caption" color="muted">Mentee</Typography>
              </View>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
}
