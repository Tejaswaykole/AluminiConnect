import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { Section } from '../../components/Section';
import { ADMIN_USER, STUDENT_MOCKS, ALUMNI_MOCKS, COMMUNITY_MOCKS, EVENT_MOCKS } from '../../mocks';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center flex-1">
          <Avatar url={ADMIN_USER.avatar} fallbackInitials="AD" size="md" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{ADMIN_USER.name}</Typography>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/notifications')} className="p-2 relative">
          <Typography className="text-2xl">🔔</Typography>
        </TouchableOpacity>
      </View>

      {/* Platform Overview */}
      <Typography variant="h3" className="mb-4">Platform Overview</Typography>
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { label: 'Total Users', value: (STUDENT_MOCKS.length + ALUMNI_MOCKS.length).toString() },
          { label: 'Communities', value: COMMUNITY_MOCKS.length.toString() },
          { label: 'Active Events', value: EVENT_MOCKS.length.toString() },
          { label: 'System Status', value: 'Healthy' },
        ].map((stat, i) => (
          <Card key={i} className="mb-4 items-center justify-center py-4" style={{ width: '48%' }}>
            <Typography variant="h2" className={`mb-1 ${stat.value === 'Healthy' ? 'text-status-success' : 'text-primary'}`}>
              {stat.value}
            </Typography>
            <Typography variant="caption" color="muted">{stat.label}</Typography>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'users', icon: '👥', label: 'Users', route: '/users' },
          { id: 'content', icon: '📝', label: 'Content', route: '/content' },
          { id: 'analytics', icon: '📈', label: 'Analytics', route: '/analytics' },
          { id: 'settings', icon: '⚙️', label: 'Settings', route: '/settings' },
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

      <Section title="Recent Signups" onSeeAll={() => router.push('/users')}>
        {STUDENT_MOCKS.slice(0, 2).map((user) => (
          <Card key={user.id} className="mb-3 flex-row items-center">
            <Avatar url={user.avatar} fallbackInitials={user.name.charAt(0)} size="sm" className="mr-4" />
            <View className="flex-1">
              <Typography variant="body" className="font-semibold">{user.name}</Typography>
              <Typography variant="caption" color="muted">Student • Joined today</Typography>
            </View>
          </Card>
        ))}
      </Section>
    </ScreenContainer>
  );
}
