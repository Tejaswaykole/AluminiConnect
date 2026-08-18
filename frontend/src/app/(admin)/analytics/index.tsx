import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

export default function PlatformAnalytics() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="body" color="muted">Platform Insights</Typography>
        <Typography variant="h1">Global Analytics</Typography>
      </View>

      <Typography variant="h3" className="mb-4">User Growth</Typography>
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Users</Typography>
          <Typography variant="h2" className="text-primary mb-1">12,450</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Students</Typography>
          <Typography variant="h2" className="text-primary mb-1">8,200</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Alumni</Typography>
          <Typography variant="h2" className="text-primary mb-1">4,200</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Institute Users</Typography>
          <Typography variant="h2" className="text-primary mb-1">50</Typography>
        </Card>
      </View>

      <Typography variant="h3" className="mb-4">Engagement & Opportunities</Typography>
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Total Connections</Typography>
              <Typography variant="h2" className="text-primary mb-1">145k</Typography>
            </View>
            <MaterialIcons name="people-alt" size={40} color="#e2e8f0" />
        </Card>
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Active Mentorships</Typography>
              <Typography variant="h2" className="text-primary mb-1">1,240</Typography>
            </View>
            <MaterialIcons name="model-training" size={40} color="#e2e8f0" />
        </Card>
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Total Opportunities</Typography>
              <Typography variant="h2" className="text-primary mb-1">850</Typography>
            </View>
            <MaterialIcons name="work" size={40} color="#e2e8f0" />
        </Card>
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4 flex-row items-center justify-between">
            <View>
              <Typography variant="caption" color="muted" className="mb-1">Community Posts</Typography>
              <Typography variant="h2" className="text-primary mb-1">12.5k</Typography>
            </View>
            <MaterialIcons name="forum" size={40} color="#e2e8f0" />
        </Card>
      </View>
    </ScreenContainer>
  );
}
