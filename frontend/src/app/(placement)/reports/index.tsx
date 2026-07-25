import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { STUDENT_MOCKS, ALUMNI_MOCKS, OPPORTUNITY_MOCKS } from '../../../mocks';

export default function PlacementReportsScreen() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Reports & Analytics</Typography>
        <Typography variant="body" color="muted">Overview of placement statistics.</Typography>
      </View>

      <Card className="mb-6 bg-primary/5 border-primary/20">
        <Typography variant="h3" className="mb-4 text-primary">Overview</Typography>
        <View className="flex-row justify-between mb-2">
          <Typography variant="body">Total Registered Students</Typography>
          <Typography variant="body" className="font-bold">{STUDENT_MOCKS.length}</Typography>
        </View>
        <View className="flex-row justify-between mb-2">
          <Typography variant="body">Total Alumni Mentors</Typography>
          <Typography variant="body" className="font-bold">{ALUMNI_MOCKS.filter(a => a.availableForMentorship).length}</Typography>
        </View>
        <View className="flex-row justify-between">
          <Typography variant="body">Total Opportunities</Typography>
          <Typography variant="body" className="font-bold">{OPPORTUNITY_MOCKS.length}</Typography>
        </View>
      </Card>

      <Typography variant="h3" className="mb-4">Placement Rates (Mock Data)</Typography>
      <View className="flex-row justify-between space-x-4 mb-6">
        <Card className="flex-1 items-center py-6">
          <Typography variant="h2" color="primary" className="mb-2">85%</Typography>
          <Typography variant="caption" color="muted" className="text-center">Full-Time Offers</Typography>
        </Card>
        <Card className="flex-1 items-center py-6">
          <Typography variant="h2" color="primary" className="mb-2">60%</Typography>
          <Typography variant="caption" color="muted" className="text-center">Internships</Typography>
        </Card>
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Top Departments</Typography>
        <View className="space-y-4">
          <View>
            <View className="flex-row justify-between mb-1">
              <Typography variant="caption" className="font-medium">Computer Science</Typography>
              <Typography variant="caption">95% Placed</Typography>
            </View>
            <View className="h-2 bg-secondary/20 rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: '95%' }} />
            </View>
          </View>
          <View>
            <View className="flex-row justify-between mb-1">
              <Typography variant="caption" className="font-medium">Finance</Typography>
              <Typography variant="caption">88% Placed</Typography>
            </View>
            <View className="h-2 bg-secondary/20 rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: '88%' }} />
            </View>
          </View>
          <View>
            <View className="flex-row justify-between mb-1">
              <Typography variant="caption" className="font-medium">Design</Typography>
              <Typography variant="caption">75% Placed</Typography>
            </View>
            <View className="h-2 bg-secondary/20 rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: '75%' }} />
            </View>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
}
