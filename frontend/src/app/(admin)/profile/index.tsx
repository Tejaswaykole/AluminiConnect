import { View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminProfile() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="body" color="muted">Super Admin</Typography>
        <Typography variant="h1">Account Profile</Typography>
      </View>

      <Card className="p-6 mb-6 bg-surface border border-border flex-col md:flex-row items-center md:items-start">
        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4 md:mb-0 md:mr-6">
            <MaterialIcons name="admin-panel-settings" size={48} color="#2563eb" />
        </View>
        <View className="flex-1">
            <Typography variant="h2" className="mb-1 text-center md:text-left">Super Admin</Typography>
            <Typography variant="body" color="muted" className="mb-4 text-center md:text-left">admin@alumniconnect.com</Typography>
            <View className="flex-row justify-center md:justify-start">
                <TouchableOpacity className="px-4 py-2 border border-border bg-surface rounded-md mr-3">
                    <Typography variant="caption" className="font-medium">Change Email</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 border border-border bg-surface rounded-md">
                    <Typography variant="caption" className="font-medium">Update Password</Typography>
                </TouchableOpacity>
            </View>
        </View>
      </Card>

      <Card className="p-6 mb-6 bg-surface border border-border">
        <Typography variant="h3" className="mb-4">Active Sessions</Typography>
        
        <View className="flex-row justify-between items-center border-b border-border py-3">
            <View className="flex-row items-center">
                <MaterialIcons name="computer" size={24} color="#64748b" className="mr-4" />
                <View>
                    <View className="flex-row items-center">
                        <Typography variant="body" className="font-medium mr-2">Windows PC • Chrome</Typography>
                        <View className="bg-status-success/10 px-2 py-0.5 rounded-full border border-status-success/20">
                            <Typography variant="caption" className="text-status-success font-semibold" style={{ fontSize: 10 }}>Current Session</Typography>
                        </View>
                    </View>
                    <Typography variant="caption" color="muted">IP: 192.168.1.100 • Last active: Just now</Typography>
                </View>
            </View>
        </View>

        <View className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
                <MaterialIcons name="smartphone" size={24} color="#64748b" className="mr-4" />
                <View>
                    <Typography variant="body" className="font-medium">iPhone 14 • Safari</Typography>
                    <Typography variant="caption" color="muted">IP: 10.0.0.45 • Last active: 2 hours ago</Typography>
                </View>
            </View>
            <TouchableOpacity className="p-2 border border-border rounded-md bg-surface">
                <Typography variant="caption" className="text-status-error font-medium">Revoke</Typography>
            </TouchableOpacity>
        </View>
      </Card>

      <View className="flex-row mt-2">
          <TouchableOpacity 
            className="flex-row items-center px-6 py-3 bg-status-error/10 border border-status-error/20 rounded-md"
            onPress={() => router.replace('/')}
          >
              <MaterialIcons name="logout" size={20} color="#ef4444" className="mr-2" />
              <Typography variant="body" className="font-medium text-status-error">Sign Out Completely</Typography>
          </TouchableOpacity>
      </View>

    </ScreenContainer>
  );
}
