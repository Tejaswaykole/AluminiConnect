import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { LoadingState, ErrorState } from '../../components';
import { useCurrentUser, useEvents, useOpportunities } from '../../hooks/queries';
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentDashboard() {
  const router = useRouter();
  
  const { data: user, isLoading: userLoading, isError: userError, refetch: refetchUser } = useCurrentUser();
  const { data: events, isLoading: eventsLoading, isError: eventsError, refetch: refetchEvents } = useEvents();
  const { data: opportunities, isLoading: oppsLoading, isError: oppsError, refetch: refetchOpps } = useOpportunities();

  if (userLoading || eventsLoading || oppsLoading) return <LoadingState message="Loading enterprise dashboard..." />;
  if (userError || eventsError || oppsError) return <ErrorState onRetry={() => { refetchUser(); refetchEvents(); refetchOpps(); }} message="Failed to load dashboard." />;
  if (!user) return null;

  return (
    <ScreenContainer scrollable>
      {/* Header & Notifications */}
      <View className="flex-row justify-between items-center mb-8 mt-2">
        <View className="flex-row items-center flex-1">
          <Avatar url={user.avatar} fallbackInitials="ST" size="lg" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{user.name}</Typography>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/student/notifications')} className="p-3 bg-surface border border-border rounded-full relative">
          <MaterialIcons name="notifications" size={24} color="#154539" />
          <View className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full border-2 border-surface" />
        </TouchableOpacity>
      </View>

      {/* Completion & Readiness Metrics */}
      <View className="flex-row justify-between mb-8 space-x-4">
        <Card className="flex-1 bg-surface border border-border items-center py-4">
          <Typography variant="h2" className="text-primary mb-1">85%</Typography>
          <Typography variant="caption" color="muted">Profile</Typography>
        </Card>
        <Card className="flex-1 bg-surface border border-border items-center py-4">
          <Typography variant="h2" className="text-primary mb-1">92%</Typography>
          <Typography variant="caption" color="muted">Resume ATS</Typography>
        </Card>
        <Card className="flex-1 bg-primary border border-primary-dark items-center py-4">
          <Typography variant="h2" color="inverse" className="mb-1">A-</Typography>
          <Typography variant="caption" color="inverse">Placement Ready</Typography>
        </Card>
      </View>

      {/* Quick Actions (Enterprise Minimal) */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'jobs', icon: 'work', label: 'Jobs', route: '/student/opportunities' },
          { id: 'resume', icon: 'description', label: 'Resume', route: '/student/profile' },
          { id: 'tracker', icon: 'bar-chart', label: 'Tracker', route: '/student/profile' },
          { id: 'ai', icon: 'psychology', label: 'AI Center', route: '/student/profile' },
          { id: 'portfolio', icon: 'folder', label: 'Portfolio', route: '/student/profile' },
        ].map((action) => (
          <TouchableOpacity 
            key={action.id} 
            onPress={() => router.push(action.route as any)}
            className="items-center mb-4 w-[23%] md:w-[15%]"
          >
            <View className="w-14 h-14 bg-surface border border-border rounded-xl items-center justify-center mb-2 shadow-sm">
              <MaterialIcons name={action.icon as any} size={28} color="#154539" />
            </View>
            <Typography variant="caption" className="font-medium text-center">{action.label}</Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* AI Career Insights */}
      <Card className="mb-8 bg-surface border-l-4 border-l-primary border-t border-r border-b border-border">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="auto-awesome" size={20} color="#154539" style={{ marginRight: 8 }} />
          <Typography variant="h3">AI Career Insight</Typography>
        </View>
        <Typography variant="body" color="muted" className="mb-3">
          Based on your recent interest in "Frontend Engineering", taking the upcoming "Advanced React Native Workshop" will boost your placement readiness score by 5%.
        </Typography>
        <TouchableOpacity>
          <Typography variant="caption" color="primary" className="font-semibold">View Learning Roadmap →</Typography>
        </TouchableOpacity>
      </Card>

      {/* Recent Applications & Interviews */}
      <Section title="Application Tracker" onSeeAll={() => {}}>
        <Card className="mb-3 flex-row justify-between items-center border border-border bg-surface">
          <View>
            <Typography variant="body" className="font-semibold mb-1">Software Engineer Intern</Typography>
            <Typography variant="caption" color="muted">Google • Applied 2d ago</Typography>
          </View>
          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Typography variant="caption" className="text-primary font-semibold">Under Review</Typography>
          </View>
        </Card>
        <Card className="mb-6 flex-row justify-between items-center border border-border bg-surface">
          <View>
            <Typography variant="body" className="font-semibold mb-1">Frontend Developer</Typography>
            <Typography variant="caption" color="muted">Stripe • Interview scheduled</Typography>
          </View>
          <View className="bg-status-success/10 px-3 py-1 rounded-full">
            <Typography variant="caption" className="text-status-success font-semibold">Tomorrow, 10 AM</Typography>
          </View>
        </Card>
      </Section>

      {/* Mentorship Summary */}
      <Section title="Mentorship" onSeeAll={() => router.push('/student/mentorship')}>
        <Card className="mb-8 flex-row items-center border border-border bg-surface">
          <Avatar url="" fallbackInitials="SJ" size="md" className="mr-4" />
          <View className="flex-1">
            <Typography variant="body" className="font-semibold mb-0.5">Upcoming Session with Sarah Jenkins</Typography>
            <Typography variant="caption" color="muted">Mock Interview • Friday, 2 PM</Typography>
          </View>
          <TouchableOpacity className="p-2 bg-surface border border-border rounded-lg">
             <Typography variant="caption" className="font-semibold">Join</Typography>
          </TouchableOpacity>
        </Card>
      </Section>

      {/* Recommended Opportunities */}
      <Section title="Recommended Jobs" onSeeAll={() => router.push('/student/opportunities')}>
        {(opportunities || []).slice(0, 2).map((opp) => (
          <TouchableOpacity key={opp.id} onPress={() => router.push(`/student/opportunities/${opp.id}`)}>
            <Card className="mb-3 flex-row items-center border border-border bg-surface">
              <View className="w-12 h-12 bg-surface border border-border rounded-lg items-center justify-center mr-4">
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
