import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { Section } from '../../../components/Section';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock specific user
  const user = {
    id: id || '101',
    name: 'John Doe',
    type: 'Student',
    email: 'john@student.edu',
    status: 'Active',
    joined: 'Oct 10, 2026',
    department: 'Computer Science',
    batch: '2025',
    institute: 'Tech University',
    reports: 0
  };

  return (
    <ScreenContainer scrollable>
      {/* Header with Back Button */}
      <View className="flex-row items-center mb-6 mt-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2 bg-surface border border-border rounded-full">
            <MaterialIcons name="arrow-back" size={20} color="#1e293b" />
        </TouchableOpacity>
        <View>
          <Typography variant="body" color="muted">User Profile</Typography>
          <Typography variant="h1">{user.name}</Typography>
        </View>
      </View>

      <View className="flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        
        {/* Left Column: Profile Card & Actions */}
        <View className="w-full md:w-1/3">
            <Card className="p-6 bg-surface border border-border mb-6 items-center">
                <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4">
                    <Typography variant="h1" className="text-primary">{user.name.charAt(0)}</Typography>
                </View>
                <Typography variant="h2" className="mb-1">{user.name}</Typography>
                <Typography variant="body" color="muted" className="mb-3">{user.email}</Typography>
                <Badge variant={user.status === 'Active' ? 'success' : 'error'} label={user.status} />
                
                <View className="w-full mt-6 pt-4 border-t border-border space-y-3">
                    <View className="flex-row justify-between">
                        <Typography variant="caption" color="muted">Role</Typography>
                        <Typography variant="caption" className="font-medium">{user.type}</Typography>
                    </View>
                    <View className="flex-row justify-between">
                        <Typography variant="caption" color="muted">Joined</Typography>
                        <Typography variant="caption" className="font-medium">{user.joined}</Typography>
                    </View>
                </View>
            </Card>

            <Card className="p-4 bg-surface border border-border">
                <Typography variant="h3" className="mb-4">Admin Actions</Typography>
                <TouchableOpacity className="flex-row items-center p-3 border-b border-border">
                    <MaterialIcons name="edit" size={20} color="#64748b" className="mr-3" />
                    <Typography variant="body" className="font-medium text-text">Edit Profile Details</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-3 border-b border-border">
                    <MaterialIcons name="lock-reset" size={20} color="#64748b" className="mr-3" />
                    <Typography variant="body" className="font-medium text-text">Reset Password</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-3 border-b border-border">
                    <MaterialIcons name="block" size={20} color="#ef4444" className="mr-3" />
                    <Typography variant="body" className="font-medium text-status-error">Suspend Account</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-3">
                    <MaterialIcons name="delete" size={20} color="#ef4444" className="mr-3" />
                    <Typography variant="body" className="font-medium text-status-error">Delete Account</Typography>
                </TouchableOpacity>
            </Card>
        </View>

        {/* Right Column: Activity & Details */}
        <View className="w-full md:w-2/3">
            <Card className="p-6 bg-surface border border-border mb-6">
                <Typography variant="h3" className="mb-4">Academic Information</Typography>
                <View className="flex-row flex-wrap">
                    <View className="w-1/2 mb-4">
                        <Typography variant="caption" color="muted">Institute</Typography>
                        <Typography variant="body" className="font-medium mt-1">{user.institute}</Typography>
                    </View>
                    <View className="w-1/2 mb-4">
                        <Typography variant="caption" color="muted">Department</Typography>
                        <Typography variant="body" className="font-medium mt-1">{user.department}</Typography>
                    </View>
                    <View className="w-1/2">
                        <Typography variant="caption" color="muted">Batch</Typography>
                        <Typography variant="body" className="font-medium mt-1">Class of {user.batch}</Typography>
                    </View>
                </View>
            </Card>

            <Section title="Recent Activity" onSeeAll={() => {}}>
                <Card className="mb-3 p-4 bg-surface border border-border flex-row items-center">
                    <View className="w-10 h-10 bg-surface border border-border rounded-full items-center justify-center mr-4">
                        <MaterialIcons name="login" size={18} color="#64748b" />
                    </View>
                    <View>
                        <Typography variant="body" className="font-medium">Logged in</Typography>
                        <Typography variant="caption" color="muted">Today, 10:45 AM from Chrome/Windows</Typography>
                    </View>
                </Card>
                <Card className="p-4 bg-surface border border-border flex-row items-center">
                    <View className="w-10 h-10 bg-surface border border-border rounded-full items-center justify-center mr-4">
                        <MaterialIcons name="article" size={18} color="#64748b" />
                    </View>
                    <View>
                        <Typography variant="body" className="font-medium">Posted in Community</Typography>
                        <Typography variant="caption" color="muted">Yesterday, 04:20 PM</Typography>
                    </View>
                </Card>
            </Section>
        </View>

      </View>
    </ScreenContainer>
  );
}
