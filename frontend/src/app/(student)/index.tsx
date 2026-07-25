import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { CURRENT_USER, EVENT_MOCKS, OPPORTUNITY_MOCKS } from '../../mocks';

export default function StudentDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center flex-1">
          <Avatar url={CURRENT_USER.avatar} fallbackInitials="AJ" size="md" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{CURRENT_USER.name}</Typography>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/notifications')} className="p-2 relative">
          <Typography className="text-2xl">🔔</Typography>
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-status-error rounded-full" />
        </TouchableOpacity>
      </View>

      {/* Profile Summary Card */}
      <Card className="mb-8 bg-primary/5 border-primary/20 flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Typography variant="h3" className="mb-1 text-primary">Your Profile is 80% Complete</Typography>
          <Typography variant="caption" color="muted">Add your resume to reach 100% and get better recommendations.</Typography>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')} className="bg-primary px-3 py-2 rounded-md">
          <Typography variant="caption" color="inverse" className="font-medium">Update</Typography>
        </TouchableOpacity>
      </Card>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'mentors', icon: '🎓', label: 'Mentors', route: '/mentorship' },
          { id: 'alumni', icon: '👥', label: 'Alumni', route: '/discover' },
          { id: 'jobs', icon: '💼', label: 'Jobs', route: '/opportunities' },
          { id: 'events', icon: '📅', label: 'Events', route: '/events' },
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

      {/* Upcoming Events */}
      <Section title="Upcoming Events" onSeeAll={() => router.push('/events')}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 pb-2">
          {EVENT_MOCKS.map((event) => (
            <TouchableOpacity 
              key={event.id}
              onPress={() => router.push(`/events/${event.id}`)}
              className="mr-4 w-64"
            >
              <Card className="p-0 overflow-hidden">
                <Image source={{ uri: event.image }} className="w-full h-32" />
                <View className="p-3">
                  <Typography variant="caption" color="primary" className="font-medium mb-1">{event.date}</Typography>
                  <Typography variant="body" className="font-bold mb-1" numberOfLines={1}>{event.title}</Typography>
                  <Typography variant="caption" color="muted" numberOfLines={1}>{event.organizer}</Typography>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Section>

      {/* Recommended Opportunities */}
      <Section title="Recommended For You" onSeeAll={() => router.push('/opportunities')}>
        {OPPORTUNITY_MOCKS.slice(0, 2).map((opp) => (
          <TouchableOpacity key={opp.id} onPress={() => router.push(`/opportunities/${opp.id}`)}>
            <Card className="mb-3 flex-row items-center">
              <View className="w-12 h-12 bg-secondary/10 rounded-lg items-center justify-center mr-4">
                <Typography className="text-xl">🏢</Typography>
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
