import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_MENTORSHIPS = [
  { id: 1, name: 'Senior to Freshman Tech Mentorship 2026', duration: '6 Months', students: 120, alumni: 45, status: 'Active', progress: 65 },
  { id: 2, title: 'Career Prep for Core Engineering', duration: '3 Months', students: 80, alumni: 20, status: 'Upcoming', progress: 0 },
];

export default function MentorshipPrograms() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Programs</Typography>
          <Typography variant="h1">Mentorships</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-primary px-4 py-2 rounded-md">
          <MaterialIcons name="add" size={20} color="white" />
          <Typography variant="body" color="inverse" className="ml-2 font-medium">Create Program</Typography>
        </TouchableOpacity>
      </View>

      <View className="w-full">
        {MOCK_MENTORSHIPS.map(program => (
          <Card key={program.id} className="mb-4 bg-surface border border-border p-4">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 mr-4">
                <Typography variant="h3" className="mb-1">{program.name || program.title}</Typography>
                <Typography variant="caption" color="muted">Duration: {program.duration}</Typography>
              </View>
              <Badge variant={program.status === 'Active' ? 'success' : 'outline'} label={program.status} />
            </View>
            
            <View className="flex-row justify-between mb-4">
               <View className="items-center">
                 <Typography variant="h3" className="text-primary">{program.students}</Typography>
                 <Typography variant="caption" color="muted">Mentees</Typography>
               </View>
               <View className="items-center">
                 <Typography variant="h3" className="text-primary">{program.alumni}</Typography>
                 <Typography variant="caption" color="muted">Mentors</Typography>
               </View>
               <View className="items-center">
                 <Typography variant="h3">{program.progress}%</Typography>
                 <Typography variant="caption" color="muted">Completion</Typography>
               </View>
            </View>

            <View className="bg-background h-2 w-full rounded-full overflow-hidden mb-4 border border-border">
                <View className="bg-primary h-full" style={{ width: `${program.progress}%` }} />
            </View>

            <View className="flex-row justify-end border-t border-border pt-3">
              <TouchableOpacity className="px-3 py-1.5 border border-border rounded-md mr-2">
                <Typography variant="caption" className="font-medium">Manage</Typography>
              </TouchableOpacity>
              {program.status === 'Active' ? (
                <TouchableOpacity className="px-3 py-1.5 bg-surface border border-status-error rounded-md">
                  <Typography variant="caption" className="font-medium text-status-error">Close Program</Typography>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="px-3 py-1.5 bg-primary rounded-md">
                  <Typography variant="caption" color="inverse" className="font-medium">Open Program</Typography>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
