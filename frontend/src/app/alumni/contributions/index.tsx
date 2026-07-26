import { MaterialIcons } from '@expo/vector-icons';
import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { Section } from '../../../components/Section';

const MOCK_CONTRIBUTIONS = [
  { id: '1', type: 'MENTORSHIP', description: 'Mentorship Session with Sarah Jenkins', points: 20, date: 'Oct 15, 2023' },
  { id: '2', type: 'JOB_REFERRAL', description: 'Referred Michael Chen to Google', points: 50, date: 'Oct 12, 2023' },
  { id: '3', type: 'JOB_POSTED', description: 'Posted Senior PM role at Google', points: 30, date: 'Sep 28, 2023' },
];

export default function ContributionsAnalyticsScreen() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="h1">Impact & Analytics</Typography>
        <Typography variant="body" color="muted">Track your engagement and network growth.</Typography>
      </View>

      {/* Primary Analytics */}
      <View className="flex-row justify-between mb-6 space-x-4">
        <Card className="flex-1 bg-surface border border-border items-center p-4">
          <Typography variant="h2" className="text-primary mb-1">128</Typography>
          <Typography variant="caption" color="muted">Profile Views (30d)</Typography>
        </Card>
        <Card className="flex-1 bg-surface border border-border items-center p-4">
          <Typography variant="h2" className="text-primary mb-1">+14</Typography>
          <Typography variant="caption" color="muted">New Connections</Typography>
        </Card>
      </View>

      {/* Contribution Score */}
      <Card className="mb-8 bg-primary border border-primary-dark p-6 items-center">
        <MaterialIcons name="emoji-events" size={24} color="#154539" />
        <Typography variant="h1" color="inverse" className="mb-1 text-4xl">450</Typography>
        <Typography variant="body" color="inverse" className="mb-4">Total Impact Score</Typography>
        
        <View className="w-full bg-surface/20 rounded-full h-2 mb-2">
          <View className="bg-white h-2 rounded-full" style={{ width: '70%' }} />
        </View>
        <Typography variant="caption" color="inverse">Top 15% of Alumni this year</Typography>
      </Card>

      {/* Contribution Breakdown */}
      <Section title="Contribution Breakdown" onSeeAll={() => {}}>
        <View className="flex-row justify-between mb-2">
            <Card className="flex-1 mr-2 bg-surface border border-border items-center p-3">
                <Typography variant="h3" className="mb-1">12 hrs</Typography>
                <Typography variant="caption" color="muted">Mentorship</Typography>
            </Card>
            <Card className="flex-1 mx-2 bg-surface border border-border items-center p-3">
                <Typography variant="h3" className="mb-1">3</Typography>
                <Typography variant="caption" color="muted">Jobs Posted</Typography>
            </Card>
            <Card className="flex-1 ml-2 bg-surface border border-border items-center p-3">
                <Typography variant="h3" className="mb-1">5</Typography>
                <Typography variant="caption" color="muted">Referrals</Typography>
            </Card>
        </View>
      </Section>

      {/* Recent Activity Log */}
      <Section title="Recent Activity" onSeeAll={() => {}}>
        <Card className="bg-surface border border-border p-0 overflow-hidden">
            {MOCK_CONTRIBUTIONS.map((item, index) => (
                <View 
                    key={item.id} 
                    className={`flex-row items-center p-4 ${index !== MOCK_CONTRIBUTIONS.length - 1 ? 'border-b border-border' : ''}`}
                >
                    <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                        <Typography className="text-lg">
                            {item.type === 'MENTORSHIP' ? 'handshake' : item.type === 'JOB_REFERRAL' ? '<MaterialIcons name="mail" size={24} color="#154539" />️' : 'work'}
                        </Typography>
                    </View>
                    <View className="flex-1 mr-2">
                        <Typography variant="body" className="font-semibold mb-0.5">{item.description}</Typography>
                        <Typography variant="caption" color="muted">{item.date}</Typography>
                    </View>
                    <Typography variant="body" className="font-bold text-status-success">+{item.points}</Typography>
                </View>
            ))}
        </Card>
      </Section>

    </ScreenContainer>
  );
}
