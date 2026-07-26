import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { ALUMNI_USER, EVENT_MOCKS, STUDENT_MOCKS } from '../../mocks';

export default function AlumniDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header & Notifications */}
      <View className="flex-row justify-between items-center mb-8 mt-2">
        <View className="flex-row items-center flex-1">
          <Avatar url={ALUMNI_USER.avatar} fallbackInitials="JD" size="lg" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{ALUMNI_USER.name}</Typography>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/alumni/notifications')} className="p-3 bg-surface border border-border rounded-full relative">
          <MaterialIcons name="notifications" size={24} color="#154539" />
          <View className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full border-2 border-surface" />
        </TouchableOpacity>
      </View>

      {/* Professional Summary & Impact Score */}
      <View className="flex-row justify-between mb-8 space-x-4">
        <Card className="flex-1 bg-surface border border-border p-4">
          <Typography variant="caption" color="muted" className="mb-1">Current Role</Typography>
          <Typography variant="body" className="font-semibold text-primary" numberOfLines={1}>Sr. Product Manager</Typography>
          <Typography variant="caption" color="muted" className="mt-1" numberOfLines={1}>Google • 8 YOE</Typography>
        </Card>
        <Card className="flex-1 bg-primary border border-primary-dark items-center justify-center p-4">
          <Typography variant="h2" color="inverse" className="mb-1">450</Typography>
          <Typography variant="caption" color="inverse">Impact Score</Typography>
        </Card>
      </View>

      {/* Quick Actions (Enterprise Minimal) */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'network', icon: 'groups', label: 'Network', route: '/discover' },
          { id: 'mentorship', icon: 'handshake', label: 'Mentoring', route: '/mentorship' },
          { id: 'jobs', icon: 'work', label: 'Post Job', route: '/opportunities' },
          { id: 'events', icon: 'event', label: 'Events', route: '/events' },
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

      {/* AI Networking Suggestion */}
      <Card className="mb-8 bg-surface border-l-4 border-l-primary border-t border-r border-b border-border">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="auto-awesome" size={20} color="#154539" />
          <Typography variant="h3">AI Networking Insight</Typography>
        </View>
        <Typography variant="body" color="muted" className="mb-3">
          3 students from your alma mater are currently interviewing for Product Management roles at Google. Offering a mock interview could boost your impact score by 50 points.
        </Typography>
        <TouchableOpacity>
          <Typography variant="caption" color="primary" className="font-semibold">Review Pending Requests →</Typography>
        </TouchableOpacity>
      </Card>

      {/* Mentorship & Networking Activity */}
      <Section title="Upcoming Mentorship" onSeeAll={() => router.push('/alumni/mentorship')}>
        <Card className="mb-6 flex-row items-center border border-border bg-surface">
          <Avatar url={STUDENT_MOCKS[0].avatar} fallbackInitials="SJ" size="md" className="mr-4" />
          <View className="flex-1">
            <Typography variant="body" className="font-semibold mb-0.5">Resume Review with {STUDENT_MOCKS[0].name}</Typography>
            <Typography variant="caption" color="muted">Class of {STUDENT_MOCKS[0].graduationYear} • Tomorrow, 4 PM</Typography>
          </View>
          <TouchableOpacity className="p-2 bg-surface border border-border rounded-lg">
             <Typography variant="caption" className="font-semibold">Join</Typography>
          </TouchableOpacity>
        </Card>
      </Section>

      {/* Contributions Summary */}
      <Section title="My Contributions" onSeeAll={() => {}}>
        <View className="flex-row justify-between mb-4">
            <Card className="flex-1 mr-2 bg-surface border border-border items-center p-3">
                <Typography variant="body" className="font-bold mb-1">12 hrs</Typography>
                <Typography variant="caption" color="muted" className="text-center">Mentorship</Typography>
            </Card>
            <Card className="flex-1 mx-2 bg-surface border border-border items-center p-3">
                <Typography variant="body" className="font-bold mb-1">3</Typography>
                <Typography variant="caption" color="muted" className="text-center">Jobs Posted</Typography>
            </Card>
            <Card className="flex-1 ml-2 bg-surface border border-border items-center p-3">
                <Typography variant="body" className="font-bold mb-1">5</Typography>
                <Typography variant="caption" color="muted" className="text-center">Referrals</Typography>
            </Card>
        </View>
      </Section>

      {/* Upcoming Events */}
      <Section title="Alumni Events" onSeeAll={() => router.push('/alumni/events')}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 pb-2">
          {EVENT_MOCKS.map((event) => (
            <TouchableOpacity 
              key={event.id}
              onPress={() => router.push(`/alumni/events/${event.id}`)}
              className="mr-4 w-64"
            >
              <Card className="p-0 overflow-hidden border border-border bg-surface">
                <Image source={{ uri: event.image }} className="w-full h-32" resizeMode="cover" />
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

    </ScreenContainer>
  );
}
