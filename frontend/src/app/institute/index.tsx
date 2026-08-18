import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Card } from '../../components/Card';
import { Section } from '../../components/Section';
import { MaterialIcons } from '@expo/vector-icons';

const QUICK_ACTIONS = [
  { id: 'verify', icon: 'verified-user', label: 'Verify Profiles', route: '/institute/verification' },
  { id: 'students', icon: 'school', label: 'Manage Students', route: '/institute/students' },
  { id: 'alumni', icon: 'people', label: 'Manage Alumni', route: '/institute/alumni' },
  { id: 'opportunities', icon: 'work', label: 'Post Opportunity', route: '/institute/opportunities' },
  { id: 'announcements', icon: 'campaign', label: 'Announcements', route: '/institute/announcements' },
  { id: 'events', icon: 'event', label: 'Manage Events', route: '/institute/events' },
  { id: 'mentorships', icon: 'model-training', label: 'Mentorship', route: '/institute/mentorships' },
  { id: 'analytics', icon: 'insights', label: 'View Analytics', route: '/institute/analytics' },
];

export default function InstituteDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8 mt-2">
        <View>
          <Typography variant="body" color="muted">Institute Dashboard</Typography>
          <Typography variant="h1">Overview</Typography>
        </View>
        <TouchableOpacity className="p-3 bg-surface border border-border rounded-full relative" onPress={() => router.push('/institute/settings' as any)}>
          <MaterialIcons name="settings" size={24} color="#154539" />
        </TouchableOpacity>
      </View>

      {/* Primary Health Metrics */}
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Students</Typography>
          <Typography variant="h2" className="text-primary mb-1">4,250</Typography>
          <Typography variant="caption" className="text-status-success font-medium">120 Pending Verification</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Alumni</Typography>
          <Typography variant="h2" className="text-primary mb-1">1,890</Typography>
          <Typography variant="caption" className="text-status-warning font-medium">45 Pending Verification</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Active Mentorships</Typography>
          <Typography variant="h2" className="text-primary mb-1">320</Typography>
          <Typography variant="caption" color="muted">Across 5 Programs</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Opportunities</Typography>
          <Typography variant="h2" className="text-primary mb-1">85</Typography>
          <Typography variant="caption" className="text-status-success font-medium">Jobs, Internships & Referrals</Typography>
        </Card>
      </View>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            onPress={() => router.push(action.route as any)}
            className="items-center mb-4 w-[23%] md:w-[11%]"
          >
            <View className="w-14 h-14 bg-surface border border-border rounded-xl items-center justify-center mb-2 shadow-sm">
              <MaterialIcons name={action.icon as any} size={28} color="#154539" />
            </View>
            <Typography variant="caption" className="font-medium text-center">{action.label}</Typography>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-col md:flex-row justify-between">
          <View className="w-full md:w-[48%]">
            {/* Pending Approvals */}
            <Section title="Verification Queue" onSeeAll={() => router.push('/institute/verification' as any)}>
              <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
                  <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                      <MaterialIcons name="school" size={20} color="#154539" />
                  </View>
                  <View className="flex-1">
                      <Typography variant="body" className="font-semibold">Michael Smith</Typography>
                      <Typography variant="caption" color="muted">Alumni Profile Verification</Typography>
                  </View>
                  <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-md" onPress={() => router.push('/institute/verification' as any)}>
                      <Typography variant="caption" color="inverse">Review</Typography>
                  </TouchableOpacity>
              </Card>
              <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
                  <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                      <MaterialIcons name="person" size={20} color="#154539" />
                  </View>
                  <View className="flex-1">
                      <Typography variant="body" className="font-semibold">Sarah Johnson</Typography>
                      <Typography variant="caption" color="muted">Student Profile Verification</Typography>
                  </View>
                  <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-md" onPress={() => router.push('/institute/verification' as any)}>
                      <Typography variant="caption" color="inverse">Review</Typography>
                  </TouchableOpacity>
              </Card>
            </Section>
          </View>
          
          <View className="w-full md:w-[48%]">
            {/* Upcoming Events */}
            <Section title="Upcoming Events" onSeeAll={() => router.push('/institute/events' as any)}>
              <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
                  <View className="w-12 h-12 bg-surface border border-border rounded-md items-center justify-center mr-3">
                      <Typography variant="caption" className="font-bold text-primary">OCT</Typography>
                      <Typography variant="h3" className="leading-tight">15</Typography>
                  </View>
                  <View className="flex-1">
                      <Typography variant="body" className="font-semibold">Annual Alumni Meet 2026</Typography>
                      <Typography variant="caption" color="muted">350 Registrations</Typography>
                  </View>
              </Card>
              <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
                  <View className="w-12 h-12 bg-surface border border-border rounded-md items-center justify-center mr-3">
                      <Typography variant="caption" className="font-bold text-primary">NOV</Typography>
                      <Typography variant="h3" className="leading-tight">02</Typography>
                  </View>
                  <View className="flex-1">
                      <Typography variant="body" className="font-semibold">Tech Career Fair</Typography>
                      <Typography variant="caption" color="muted">120 Registrations</Typography>
                  </View>
              </Card>
            </Section>
          </View>
      </View>

    </ScreenContainer>
  );
}
