import { View, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: 'Platform Maintenance Notice', preview: 'The platform will be down for scheduled maintenance...', audience: 'Everyone', date: 'Oct 20, 2026', status: 'Published' },
  { id: 2, title: 'New Student Guidelines', preview: 'Please review the updated guidelines for community conduct...', audience: 'Students', date: 'Oct 15, 2026', status: 'Published' },
  { id: 3, title: 'Alumni Network Expansion', preview: 'We are expanding our professional network features...', audience: 'Alumni', date: '-', status: 'Draft' },
];

export default function PlatformAnnouncements() {
  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Communication</Typography>
          <Typography variant="h1">Platform Announcements</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-primary px-4 py-2 rounded-md">
          <MaterialIcons name="add" size={20} color="white" />
          <Typography variant="body" color="inverse" className="ml-2 font-medium">Create</Typography>
        </TouchableOpacity>
      </View>

      {/* List */}
      <View className="w-full">
        {MOCK_ANNOUNCEMENTS.map(ann => (
          <Card key={ann.id} className="mb-4 bg-surface border border-border p-4 flex-col justify-between">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 mr-4">
                <Typography variant="h3" className="mb-1">{ann.title}</Typography>
                <Typography variant="body" color="muted" numberOfLines={2}>{ann.preview}</Typography>
              </View>
              <Badge variant={ann.status === 'Published' ? 'success' : 'outline'} label={ann.status} />
            </View>
            
            <View className="flex-row justify-between items-center border-t border-border mt-3 pt-3">
              <View className="flex-row items-center space-x-4">
                <View className="flex-row items-center mr-4">
                  <MaterialIcons name="groups" size={16} color="#64748b" className="mr-1" />
                  <Typography variant="caption" color="muted">{ann.audience}</Typography>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons name="event" size={16} color="#64748b" className="mr-1" />
                  <Typography variant="caption" color="muted">{ann.status === 'Published' ? `Published: ${ann.date}` : 'Unpublished'}</Typography>
                </View>
              </View>

              <View className="flex-row items-center space-x-2">
                <TouchableOpacity className="p-2 border border-border bg-surface rounded-md">
                  <MaterialIcons name="edit" size={20} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 border border-border bg-surface rounded-md">
                  <MaterialIcons name="delete" size={20} color="#ef4444" />
                </TouchableOpacity>
                {ann.status === 'Draft' && (
                  <TouchableOpacity className="px-3 py-1.5 bg-primary rounded-md ml-2">
                    <Typography variant="caption" color="inverse" className="font-medium">Publish</Typography>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
