import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { STUDENT_MOCKS } from '../../../mocks';

export default function StudentProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const student = STUDENT_MOCKS.find(s => s.id === id);

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
        <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="lg" className="mb-4" />
        <Typography variant="h2" className="mb-1">{student.name}</Typography>
        <Typography variant="body" color="muted" className="text-center">{student.department}</Typography>
        <Typography variant="caption" color="muted" className="text-center">{student.college} • Class of {student.graduationYear}</Typography>
      </View>

      <View className="flex-row space-x-4 mb-8">
        <View className="flex-1 mr-2">
          <Button title="Connect" variant="primary" />
        </View>
        <View className="flex-1 ml-2">
          <Button title="Offer Mentorship" variant="outline" />
        </View>
      </View>

      <Card className="mb-6">
        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Career Goals</Typography>
          <Typography variant="body">{student.careerGoals}</Typography>
        </View>

        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Skills</Typography>
          <View className="flex-row flex-wrap mt-2">
            {student.skills.map((skill, index) => (
              <View key={index} className="mr-2 mb-2">
                <Badge label={skill} variant="secondary" />
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 border-b border-border-strong pb-6">
          <Typography variant="h3" className="mb-2">Interests</Typography>
          <View className="flex-row flex-wrap mt-2">
            {student.interests.map((interest, index) => (
              <View key={index} className="mr-2 mb-2">
                <Badge label={interest} variant="primary" />
              </View>
            ))}
          </View>
        </View>

        <View>
          <Typography variant="h3" className="mb-2">Projects</Typography>
          {student.projects.map((project, index) => (
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
        <TouchableOpacity className="bg-primary px-3 py-2 rounded-md">
          <Typography variant="caption" color="inverse" className="font-medium">View Resume</Typography>
        </TouchableOpacity>
      </Card>

    </ScreenContainer>
  );
}
