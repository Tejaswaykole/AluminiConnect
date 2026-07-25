import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { PLACEMENT_USER, OPPORTUNITY_MOCKS, DRIVE_MOCKS, STUDENT_MOCKS } from '../../mocks';

export default function PlacementDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center flex-1">
          <Avatar url={PLACEMENT_USER.avatar} fallbackInitials="PC" size="md" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{PLACEMENT_USER.name}</Typography>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/notifications')} className="p-2 relative">
          <MaterialIcons name="notifications" size={24} color="#154539" />
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-status-error rounded-full" />
        </TouchableOpacity>
      </View>

      {/* Dashboard Stats */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { label: 'Active Jobs', value: OPPORTUNITY_MOCKS.length.toString(), color: 'text-primary' },
          { label: 'Students', value: STUDENT_MOCKS.length.toString(), color: 'text-text' },
          { label: 'Drives', value: DRIVE_MOCKS.length.toString(), color: 'text-status-success' },
        ].map((stat, i) => (
          <Card key={i} className="mb-4 items-center justify-center py-4" style={{ width: '31%' }}>
            <Typography variant="h2" className={`mb-1 ${stat.color}`}>{stat.value}</Typography>
            <Typography variant="caption" color="muted">{stat.label}</Typography>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'students', icon: 'school', label: 'Students', route: '/students' },
          { id: 'jobs', icon: 'work', label: 'Jobs', route: '/opportunities' },
          { id: 'drives', icon: 'business', label: 'Drives', route: '/drives' },
          { id: 'reports', icon: 'bar-chart', label: 'Reports', route: '/reports' },
        ].map((action) => (
          <TouchableOpacity 
            key={action.id} 
            onPress={() => router.push(action.route as any)}
            className="items-center mb-4"
            style={{ width: '23%' }}
          >
            <View className="w-14 h-14 bg-background border border-border-strong rounded-2xl items-center justify-center mb-2">
              <Typography className="text-2xl">{action.icon}</Typography>
            </View>
            <Typography variant="caption" className="font-medium text-center">{action.label}</Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upcoming Drives */}
      <Section title="Upcoming Drives" onSeeAll={() => router.push('/drives')}>
        {DRIVE_MOCKS.slice(0, 2).map((drive) => (
          <TouchableOpacity key={drive.id} onPress={() => router.push(`/drives/${drive.id}`)}>
            <Card className="mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <Typography variant="h3" className="flex-1">{drive.title}</Typography>
                <View className="bg-primary/10 px-2 py-1 rounded-md">
                  <Typography variant="caption" color="primary" className="font-medium">{drive.status}</Typography>
                </View>
              </View>
              <Typography variant="body" color="muted" className="mb-2">{drive.company}</Typography>
              <View className="flex-row justify-between">
                <Typography variant="caption" color="muted">Date: {drive.date}</Typography>
                <Typography variant="caption" color="muted">Registered: {drive.registeredCount}</Typography>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </Section>

      {/* Recent Opportunities */}
      <Section title="Recent Opportunities" onSeeAll={() => router.push('/opportunities')}>
        {OPPORTUNITY_MOCKS.slice(0, 2).map((opp) => (
          <TouchableOpacity key={opp.id} onPress={() => router.push(`/opportunities/${opp.id}`)}>
            <Card className="mb-3 flex-row items-center">
              <View className="w-12 h-12 bg-secondary/10 rounded-lg items-center justify-center mr-4">
                <MaterialIcons name="business" size={24} color="#154539" />
              </View>
              <View className="flex-1">
                <Typography variant="body" className="font-semibold mb-0.5">{opp.title}</Typography>
                <Typography variant="caption" color="muted">{opp.company} • {opp.type}</Typography>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </Section>

    </ScreenContainer>
  );
}
