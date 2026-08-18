import { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

const PERMISSION_GROUPS = [
  {
    id: 'networking',
    title: 'Networking & Connections',
    description: 'Controls for discovering and connecting with other users.',
    permissions: [
      { id: 'p1', label: 'Send Connection Requests', enabled: true },
      { id: 'p2', label: 'View Full Profiles', enabled: true },
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging',
    description: 'Controls for direct messaging and group chats.',
    permissions: [
      { id: 'p3', label: 'Send Direct Messages', enabled: true },
      { id: 'p4', label: 'Create Group Chats', enabled: false },
    ]
  },
  {
    id: 'community',
    title: 'Community & Content',
    description: 'Controls for creating and interacting with posts.',
    permissions: [
      { id: 'p5', label: 'Create Posts', enabled: true },
      { id: 'p6', label: 'Comment on Posts', enabled: true },
      { id: 'p7', label: 'Create Events', enabled: false },
    ]
  }
];

export default function RolesAndPermissions() {
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Alumni'>('Student');
  
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Access Control</Typography>
          <Typography variant="h1">Roles & Permissions</Typography>
        </View>
        <TouchableOpacity className="px-4 py-2 bg-primary rounded-md">
            <Typography variant="body" color="inverse" className="font-medium">Save Changes</Typography>
        </TouchableOpacity>
      </View>

      <Card className="p-1 mb-6 bg-surface border border-border flex-row">
        <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-md ${selectedRole === 'Student' ? 'bg-primary/10' : ''}`}
            onPress={() => setSelectedRole('Student')}
        >
            <Typography variant="body" className={`font-semibold ${selectedRole === 'Student' ? 'text-primary' : 'text-text-muted'}`}>Student</Typography>
        </TouchableOpacity>
        <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-md ${selectedRole === 'Alumni' ? 'bg-primary/10' : ''}`}
            onPress={() => setSelectedRole('Alumni')}
        >
            <Typography variant="body" className={`font-semibold ${selectedRole === 'Alumni' ? 'text-primary' : 'text-text-muted'}`}>Alumni</Typography>
        </TouchableOpacity>
      </Card>

      <View className="p-4 bg-status-warning/10 border border-status-warning/20 rounded-md mb-6 flex-row items-center">
        <MaterialIcons name="info" size={20} color="#eab308" className="mr-3" />
        <Typography variant="body" className="flex-1">
            Modifying {selectedRole} permissions will affect all active and future users with this role immediately.
        </Typography>
      </View>

      {PERMISSION_GROUPS.map(group => (
          <Card key={group.id} className="mb-4 bg-surface border border-border overflow-hidden">
            <View className="p-4 border-b border-border bg-background">
                <Typography variant="h3" className="mb-1">{group.title}</Typography>
                <Typography variant="caption" color="muted">{group.description}</Typography>
            </View>
            <View className="p-2">
                {group.permissions.map((perm, idx) => (
                    <View key={perm.id} className={`flex-row justify-between items-center p-3 ${idx !== group.permissions.length - 1 ? 'border-b border-border' : ''}`}>
                        <Typography variant="body" className="font-medium">{perm.label}</Typography>
                        <TouchableOpacity className={`w-12 h-6 rounded-full p-1 justify-center ${perm.enabled ? 'bg-primary' : 'bg-surface border border-border'}`}>
                            <View className={`w-4 h-4 rounded-full bg-white shadow-sm ${perm.enabled ? 'self-end' : 'self-start bg-border-strong'}`} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
          </Card>
      ))}
      
    </ScreenContainer>
  );
}
