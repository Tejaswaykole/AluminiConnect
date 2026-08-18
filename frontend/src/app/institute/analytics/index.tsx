import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

export default function AnalyticsDashboard() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="body" color="muted">Insights</Typography>
        <Typography variant="h1">Analytics</Typography>
      </View>

      <Typography variant="h3" className="mb-4">Student Overview</Typography>
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Students</Typography>
          <Typography variant="h2" className="text-primary mb-1">4,250</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Verified Students</Typography>
          <Typography variant="h2" className="text-status-success mb-1">4,130</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">CS Dept</Typography>
          <Typography variant="h2" className="text-primary mb-1">1,200</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Engagement</Typography>
          <Typography variant="h2" className="text-primary mb-1">78%</Typography>
        </Card>
      </View>

      <Typography variant="h3" className="mb-4">Alumni Overview</Typography>
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Alumni</Typography>
          <Typography variant="h2" className="text-primary mb-1">1,890</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Verified Alumni</Typography>
          <Typography variant="h2" className="text-status-success mb-1">1,845</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Top Industry</Typography>
          <Typography variant="h3" className="text-primary mb-1 mt-1">IT/Software</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Active Mentors</Typography>
          <Typography variant="h2" className="text-primary mb-1">45</Typography>
        </Card>
      </View>

      <Typography variant="h3" className="mb-4">Opportunities & Events</Typography>
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Jobs Posted</Typography>
              <Typography variant="h2" className="text-primary mb-1">120</Typography>
            </View>
            <MaterialIcons name="work" size={40} color="#e2e8f0" />
        </Card>
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Event Registrations</Typography>
              <Typography variant="h2" className="text-primary mb-1">470</Typography>
            </View>
            <MaterialIcons name="event" size={40} color="#e2e8f0" />
        </Card>
      </View>
    </ScreenContainer>
  );
}
