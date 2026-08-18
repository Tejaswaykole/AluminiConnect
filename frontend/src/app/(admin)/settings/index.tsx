import { View, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

export default function PlatformSettings() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="body" color="muted">Configuration</Typography>
        <Typography variant="h1">Platform Settings</Typography>
      </View>

      <Card className="p-6 mb-6 bg-surface border border-border">
        <Typography variant="h3" className="mb-4">General Configuration</Typography>
        
        <View className="mb-4">
            <Typography variant="caption" className="font-medium mb-1">Platform Name</Typography>
            <TextInput 
                value="AlumniConnect" 
                className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
                editable={false} 
            />
        </View>

        <View className="mb-4">
            <Typography variant="caption" className="font-medium mb-1">Support Email</Typography>
            <TextInput 
                value="support@alumniconnect.com" 
                className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
                editable={false} 
            />
        </View>
      </Card>

      <Card className="p-6 mb-6 bg-surface border border-border">
        <Typography variant="h3" className="mb-4">Authentication & Security</Typography>
        
        <View className="flex-row justify-between items-center border-b border-border py-3">
            <View>
                <Typography variant="body" className="font-medium">Require Email Verification</Typography>
                <Typography variant="caption" color="muted">New users must verify email to access platform</Typography>
            </View>
            <TouchableOpacity className="w-12 h-6 rounded-full bg-primary p-1 justify-center">
                <View className="w-4 h-4 rounded-full bg-white shadow-sm self-end" />
            </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center py-3">
            <View>
                <Typography variant="body" className="font-medium">Enable 2FA for Institute/Admin</Typography>
                <Typography variant="caption" color="muted">Enforce two-factor authentication for high-privilege roles</Typography>
            </View>
            <TouchableOpacity className="w-12 h-6 rounded-full bg-primary p-1 justify-center">
                <View className="w-4 h-4 rounded-full bg-white shadow-sm self-end" />
            </TouchableOpacity>
        </View>
      </Card>

      <View className="flex-row justify-end mt-4">
          <TouchableOpacity className="px-6 py-3 bg-primary rounded-md">
              <Typography variant="body" color="inverse" className="font-medium">Save All Settings</Typography>
          </TouchableOpacity>
      </View>

    </ScreenContainer>
  );
}
