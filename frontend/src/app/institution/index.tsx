import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Card } from '../../components/Card';
import { Section } from '../../components/Section';
import { MaterialIcons } from '@expo/vector-icons';

const QUICK_ACTIONS = [
  { id: 'students', icon: 'people', label: 'Students', route: '/students' },
  { id: 'alumni', icon: 'school', label: 'Alumni', route: '/alumni' },
  { id: 'placement', icon: 'work', label: 'Placement Drives', route: '/drives' },
  { id: 'reports', icon: 'analytics', label: 'Reports', route: '/analytics' },
];

export default function InstitutionDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8 mt-2">
        <View>
          <Typography variant="body" color="muted">Executive Dashboard</Typography>
          <Typography variant="h1">Tech University</Typography>
        </View>
        <TouchableOpacity className="p-3 bg-surface border border-border rounded-full relative">
          <MaterialIcons name="notifications" size={24} color="#154539" />
          <View className="absolute top-2 right-2 w-3 h-3 bg-status-error rounded-full border-2 border-surface" />
        </TouchableOpacity>
      </View>

      {/* AI Institutional Insight */}
      <Card className="mb-8 bg-surface border-l-4 border-l-primary border-t border-r border-b border-border">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="auto-awesome" size={20} color="#154539" style={{ marginRight: 8 }} />
          <Typography variant="h3">AI Executive Insight</Typography>
        </View>
        <Typography variant="body" color="muted" className="mb-3">
          Placement rates for Computer Science are tracking 15% higher than last year. However, Mechanical Engineering is showing a dip in recruiter engagement. Consider scheduling a targeted networking event.
        </Typography>
        <TouchableOpacity>
          <Typography variant="caption" color="primary" className="font-semibold">View Department Analytics →</Typography>
        </TouchableOpacity>
      </Card>

      {/* Primary Health Metrics */}
      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Total Students</Typography>
          <Typography variant="h2" className="text-primary mb-1">4,250</Typography>
          <Typography variant="caption" className="text-status-success font-medium">↑ 5% YoY</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Active Alumni</Typography>
          <Typography variant="h2" className="text-primary mb-1">1,890</Typography>
          <Typography variant="caption" className="text-status-success font-medium">↑ 12% YoY</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Placement Rate</Typography>
          <Typography variant="h2" className="text-primary mb-1">87%</Typography>
          <Typography variant="caption" color="muted">Class of 2024</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Partner Companies</Typography>
          <Typography variant="h2" className="text-primary mb-1">142</Typography>
          <Typography variant="caption" className="text-status-success font-medium">+15 New</Typography>
        </Card>
      </View>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {QUICK_ACTIONS.map((action) => (
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

      {/* Pending Approvals */}
      <Section title="Verification Queue" onSeeAll={() => {}}>
        <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                <MaterialIcons name="business" size={20} color="#154539" />
            </View>
            <View className="flex-1">
                <Typography variant="body" className="font-semibold">Tech Innovations Inc.</Typography>
                <Typography variant="caption" color="muted">New Company Registration</Typography>
            </View>
            <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-md">
                <Typography variant="caption" color="inverse">Review</Typography>
            </TouchableOpacity>
        </Card>
        <Card className="mb-3 bg-surface border border-border flex-row items-center p-3">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                <MaterialIcons name="school" size={20} color="#154539" />
            </View>
            <View className="flex-1">
                <Typography variant="body" className="font-semibold">Michael Smith</Typography>
                <Typography variant="caption" color="muted">Alumni Profile Verification</Typography>
            </View>
            <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-md">
                <Typography variant="caption" color="inverse">Review</Typography>
            </TouchableOpacity>
        </Card>
      </Section>

      {/* Placement Drives Overview */}
      <Section title="Active Placement Drives" onSeeAll={() => router.push('/institution/drives')}>
         <Card className="mb-8 bg-surface border border-border p-4">
            <View className="flex-row justify-between mb-3 border-b border-border pb-3">
                <View>
                    <Typography variant="body" className="font-bold">Google On-Campus 2024</Typography>
                    <Typography variant="caption" color="muted">Software Engineering Interns</Typography>
                </View>
                <View className="bg-status-success/10 px-2 py-1 rounded-md justify-center">
                    <Typography variant="caption" className="text-status-success font-semibold">Active</Typography>
                </View>
            </View>
            <View className="flex-row justify-between">
                <View className="items-center">
                    <Typography variant="h3">450</Typography>
                    <Typography variant="caption" color="muted">Applied</Typography>
                </View>
                <View className="items-center">
                    <Typography variant="h3">120</Typography>
                    <Typography variant="caption" color="muted">Shortlisted</Typography>
                </View>
                <View className="items-center">
                    <Typography variant="h3">45</Typography>
                    <Typography variant="caption" color="muted">Interviewing</Typography>
                </View>
                <View className="items-center">
                    <Typography variant="h3 text-primary">12</Typography>
                    <Typography variant="caption" color="primary" className="font-semibold">Offers</Typography>
                </View>
            </View>
         </Card>
      </Section>

    </ScreenContainer>
  );
}
