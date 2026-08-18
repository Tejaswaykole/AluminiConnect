import { View, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';

export default function AdminSettingsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Settings</Typography>
        <Typography variant="body" color="muted">Platform configuration and preferences.</Typography>
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">System Preferences</Typography>
        
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-1 mr-4">
            <Typography variant="body" className="font-medium">Maintenance Mode</Typography>
            <Typography variant="caption" color="muted">Disable access to the platform for all non-admin users.</Typography>
          </View>
          <Switch value={false} />
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-1 mr-4">
            <Typography variant="body" className="font-medium">New User Registration</Typography>
            <Typography variant="caption" color="muted">Allow new students and alumni to create accounts.</Typography>
          </View>
          <Switch value={true} />
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-1 mr-4">
            <Typography variant="body" className="font-medium">Email Notifications</Typography>
            <Typography variant="caption" color="muted">Send system-wide email updates.</Typography>
          </View>
          <Switch value={true} />
        </View>
      </Card>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Data Management</Typography>
        <TouchableOpacity className="py-3 border-b border-border-strong">
          <Typography variant="body" color="primary" className="font-medium">Export User Data (CSV)</Typography>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 border-b border-border-strong">
          <Typography variant="body" color="primary" className="font-medium">View System Logs</Typography>
        </TouchableOpacity>
        <TouchableOpacity className="py-3">
          <Typography variant="body" color="primary" className="font-medium">Database Backup Options</Typography>
        </TouchableOpacity>
      </Card>

      <Button 
        title="Log Out" 
        variant="outline" 
        onPress={() => router.replace('/login')} 
        className="mt-4 border-status-error"
      />
    </ScreenContainer>
  );
}
