import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
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
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center flex-1">
          <Avatar url={ALUMNI_USER.avatar} fallbackInitials="JD" size="md" className="mr-4" />
          <View>
            <Typography variant="body" color="muted">Welcome back,</Typography>
            <Typography variant="h2">{ALUMNI_USER.name}</Typography>
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
          <Typography variant="h3" className="mb-1 text-primary">Mentorship Status</Typography>
          <Typography variant="caption" color="muted">You are currently available to mentor students.</Typography>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')} className="bg-primary px-3 py-2 rounded-md">
          <Typography variant="caption" color="inverse" className="font-medium">Settings</Typography>
        </TouchableOpacity>
      </Card>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {[
          { id: 'students', icon: '🎓', label: 'Students', route: '/discover' },
          { id: 'mentorship', icon: '🤝', label: 'Mentorship', route: '/mentorship' },
          { id: 'jobs', icon: '💼', label: 'Post Job', route: '/opportunities' },
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

      {/* Recommended Students */}
      <Section title="Students Looking For Mentorship" onSeeAll={() => router.push('/discover')}>
        {STUDENT_MOCKS.slice(0, 2).map((student) => (
          <TouchableOpacity key={student.id} onPress={() => router.push(`/discover/${student.id}`)}>
            <Card className="mb-3 flex-row items-center">
              <Avatar url={student.avatar} fallbackInitials={student.name.charAt(0)} size="sm" className="mr-4" />
              <View className="flex-1">
                <Typography variant="body" className="font-semibold mb-0.5">{student.name}</Typography>
                <Typography variant="caption" color="muted">{student.college} • {student.graduationYear}</Typography>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </Section>

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

    </ScreenContainer>
  );
}
