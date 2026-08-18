import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_REPORTS = [
  { id: 1, type: 'Post', reportedBy: 'John Doe', target: 'Spam Comment', status: 'Pending', date: 'Oct 15, 2026' },
  { id: 2, type: 'User', reportedBy: 'Jane Smith', target: 'Fake Alumni Profile', status: 'Reviewing', date: 'Oct 14, 2026' },
];

export default function ReportsManagement() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Moderation</Typography>
          <Typography variant="h1">Reports Center</Typography>
        </View>
      </View>

      <View className="w-full">
        {MOCK_REPORTS.map(report => (
          <Card key={report.id} className="mb-4 bg-surface border border-border p-4 flex-col md:flex-row justify-between items-start md:items-center">
            <View className="flex-row items-center mb-4 md:mb-0">
              <View className="w-12 h-12 bg-status-error/10 rounded-full items-center justify-center mr-4">
                <MaterialIcons name="flag" size={24} color="#ef4444" />
              </View>
              <View>
                <View className="flex-row items-center mb-1">
                    <Typography variant="h3" className="mr-2">Reported {report.type}</Typography>
                    <Badge variant={report.status === 'Pending' ? 'warning' : 'outline'} label={report.status} />
                </View>
                <Typography variant="body" className="font-medium">{report.target}</Typography>
                <Typography variant="caption" color="muted">Reported by {report.reportedBy} on {report.date}</Typography>
              </View>
            </View>

            <View className="flex-row items-center w-full md:w-auto justify-end border-t border-border md:border-t-0 pt-3 md:pt-0">
              <TouchableOpacity className="px-3 py-2 bg-surface border border-border rounded-md mr-2">
                  <Typography variant="caption" className="font-medium text-status-error">Reject</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 bg-primary rounded-md">
                  <Typography variant="caption" color="inverse" className="font-medium">Resolve</Typography>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
