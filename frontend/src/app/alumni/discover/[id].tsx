import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { useStudents } from '../../../hooks/queries/useStudents';

export default function StudentProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { data: studentList = [] } = useStudents();
  const student = studentList.find(s => s.id === id);

  if (!student) {
    return (
      <ScreenContainer>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Typography variant="body" color="primary" className="font-medium">
            ← Back
          </Typography>
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <Typography variant="h3" color="muted">Student not found</Typography>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Students
        </Typography>
      </TouchableOpacity>

      <View className="items-center mb-8">
        <Avatar url={student.avatar} fallbackInitials={(student.name || student.first_name || '?').charAt(0)} size="lg" className="mb-4" />
        <Typography variant="h2" className="mb-1">{student.name || `${student.first_name || ''} ${student.last_name || ''}`}</Typography>
        <Typography variant="body" color="muted" className="text-center">{student.department || 'Student'}</Typography>
        <Typography variant="caption" color="muted" className="text-center">{student.college || 'University'} • Class of {student.graduationYear || '2025'}</Typography>
      </View>

      <View className="flex-row space-x-2 mb-8">
        <View className="flex-1">
          <Button title="Connect" variant="primary" onPress={() => { typeof window !== 'undefined' ? window.alert(`You have successfully requested to connect with ${student.name || student.first_name}.`) : Alert.alert('Connection Request Sent', `You have successfully requested to connect with ${student.name || student.first_name}.`)}} />
        </View>
        <View className="flex-1">
          <Button title="Message" variant="outline" onPress={() => router.push(`/alumni/messages/${student.id}`)} />
        </View>
        <View className="flex-1">
          <Button title="Mentor" variant="outline" onPress={() => { typeof window !== 'undefined' ? window.alert(`You have offered to mentor ${student.name || student.first_name}.`) : Alert.alert('Mentorship Offer Sent', `You have offered to mentor ${student.name || student.first_name}.`)}} />
        </View>
      </View>

      <Card className="mb-6">
        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Career Goals</Typography>
          <Typography variant="body">{student.careerGoals || 'Not specified'}</Typography>
        </View>

        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Skills</Typography>
          <View className="flex-row flex-wrap mt-2">
            {(student.skills || []).map((skill: string, index: number) => (
              <View key={index} className="mr-2 mb-2">
                <Badge label={skill} variant="secondary" />
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Interests</Typography>
          <View className="flex-row flex-wrap mt-2">
            {(student.interests || []).map((interest: string, index: number) => (
              <View key={index} className="mr-2 mb-2">
                <Badge label={interest} variant="primary" />
              </View>
            ))}
          </View>
        </View>

        <View>
          <Typography variant="h3" className="mb-2">Projects</Typography>
          {(student.projects || []).map((project: string, index: number) => (
            <View key={index} className="mb-2">
              <Typography variant="body" className="font-medium">• {project}</Typography>
            </View>
          ))}
        </View>
      </Card>
      
      <Card className="mb-6 bg-primary/5 border-primary/20 flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Typography variant="h3" className="mb-1">Resume</Typography>
          <Typography variant="caption" color="muted">View detailed academic and professional history.</Typography>
        </View>
        <TouchableOpacity 
          className="bg-primary px-3 py-2 rounded-md" 
          onPress={() => { typeof window !== 'undefined' ? window.alert('The user has not uploaded a resume yet.') : Alert.alert('Resume Unavailable', 'The user has not uploaded a resume yet.')}}
        >
          <Typography variant="caption" color="inverse" className="font-medium">View Resume</Typography>
        </TouchableOpacity>
      </Card>

    </ScreenContainer>
  );
}
