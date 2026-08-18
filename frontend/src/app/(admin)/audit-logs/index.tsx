import { View, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_LOGS = [
  { id: 1, actor: 'Super Admin', action: 'Suspended User', target: 'Alice Smith (ID: 103)', date: 'Oct 15, 2026 14:30', status: 'Success' },
  { id: 2, actor: 'Tech University', action: 'Approved Student', target: 'John Doe (ID: 101)', date: 'Oct 14, 2026 09:15', status: 'Success' },
  { id: 3, actor: 'System', action: 'Database Backup', target: 'Main DB', date: 'Oct 14, 2026 03:00', status: 'Success' },
];

export default function AuditLogs() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Tracking</Typography>
          <Typography variant="h1">Audit Logs</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-surface border border-border px-4 py-2 rounded-md">
          <MaterialIcons name="file-download" size={20} color="#1e293b" />
          <Typography variant="body" className="ml-2 font-medium">Export CSV</Typography>
        </TouchableOpacity>
      </View>

      <View className="mb-6 bg-surface p-4 rounded-xl border border-border">
        <View className="flex-row items-center bg-background rounded-md px-3 py-2 border border-border">
          <MaterialIcons name="search" size={20} color="#64748b" />
          <TextInput 
            placeholder="Search logs by actor, action, or target..." 
            className="flex-1 ml-2 font-medium"
          />
        </View>
        <View className="flex-row flex-wrap mt-4 space-x-2">
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-border bg-background">
                <Typography variant="caption" color="muted">Last 7 Days</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-border bg-background">
                <Typography variant="caption" color="muted">Filter by Action</Typography>
            </TouchableOpacity>
        </View>
      </View>

      <View className="w-full">
        {MOCK_LOGS.map(log => (
          <Card key={log.id} className="mb-3 p-4 bg-surface border border-border flex-col md:flex-row justify-between md:items-center">
            <View className="mb-3 md:mb-0">
                <View className="flex-row items-center mb-1">
                    <Typography variant="h3" className="mr-2">{log.action}</Typography>
                    <Badge variant="outline" label={log.status} />
                </View>
                <View className="flex-row items-center">
                    <Typography variant="body" color="muted">Target: </Typography>
                    <Typography variant="body" className="font-medium">{log.target}</Typography>
                </View>
            </View>
            <View className="flex-row items-center justify-between md:flex-col md:items-end">
                <View className="flex-row items-center mb-1">
                    <MaterialIcons name="person" size={14} color="#64748b" className="mr-1" />
                    <Typography variant="caption" className="font-medium">{log.actor}</Typography>
                </View>
                <Typography variant="caption" color="muted">{log.date}</Typography>
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
