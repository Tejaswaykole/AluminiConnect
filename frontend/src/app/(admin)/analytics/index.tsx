import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { STUDENT_MOCKS, ALUMNI_MOCKS, COMMUNITY_MOCKS, OPPORTUNITY_MOCKS } from '../../../mocks';

export default function AdminAnalyticsScreen() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Platform Analytics</Typography>
        <Typography variant="body" color="muted">System-wide usage and engagement metrics.</Typography>
      </View>

      <Typography variant="h3" className="mb-4">User Growth</Typography>
      <View className="flex-row justify-between space-x-4 mb-6">
        <Card className="flex-1 items-center py-6 border-primary/20 bg-primary/5">
          <Typography variant="h2" color="primary" className="mb-2">+{STUDENT_MOCKS.length}</Typography>
          <Typography variant="caption" color="muted" className="text-center">New Students This Month</Typography>
        </Card>
        <Card className="flex-1 items-center py-6 border-status-success/20 bg-status-success/5">
          <Typography variant="h2" color="primary" className="mb-2">+{ALUMNI_MOCKS.length}</Typography>
          <Typography variant="caption" color="muted" className="text-center">New Alumni This Month</Typography>
        </Card>
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Engagement</Typography>
        <View className="space-y-4">
          <View className="flex-row justify-between items-center border-b border-border-strong pb-4">
            <Typography variant="body" className="font-medium">Active Communities</Typography>
            <Typography variant="h3" color="primary">{COMMUNITY_MOCKS.length}</Typography>
          </View>
          <View className="flex-row justify-between items-center border-b border-border-strong pb-4">
            <Typography variant="body" className="font-medium">Job Postings</Typography>
            <Typography variant="h3" color="primary">{OPPORTUNITY_MOCKS.length}</Typography>
          </View>
          <View className="flex-row justify-between items-center">
            <Typography variant="body" className="font-medium">Mentorship Matches</Typography>
            <Typography variant="h3" color="primary">45</Typography>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
}
