import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_REPORTS = [
  { id: 1, type: 'Post', reportedBy: 'John Doe', target: 'Spam Comment', status: 'Pending', date: 'Oct 15, 2026', severity: 'Medium' },
  { id: 2, type: 'User', reportedBy: 'Jane Smith', target: 'Inappropriate Profile Picture', status: 'Reviewing', date: 'Oct 14, 2026', severity: 'High' },
  { id: 3, type: 'Job', reportedBy: 'Mike Ross', target: 'Fake Opportunity Listing', status: 'Pending', date: 'Oct 13, 2026', severity: 'Critical' },
];

export default function ModerationCenter() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Content Safety</Typography>
          <Typography variant="h1">Moderation Center</Typography>
        </View>
        <View className="flex-row border border-border rounded-md bg-surface overflow-hidden">
            <TouchableOpacity className="px-4 py-2 bg-primary">
                <Typography variant="body" color="inverse" className="font-medium">Pending</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2">
                <Typography variant="body" className="font-medium text-text-muted">Resolved</Typography>
            </TouchableOpacity>
        </View>
      </View>

      <View className="w-full">
        {MOCK_REPORTS.map(report => (
          <Card key={report.id} className="mb-4 bg-surface border border-border p-4 flex-col justify-between">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-status-error/10 rounded-full items-center justify-center mr-4">
                  <MaterialIcons name="flag" size={24} color="#ef4444" />
                </View>
                <View className="flex-1 mr-2">
                  <View className="flex-row items-center mb-1">
                      <Typography variant="h3" className="mr-2">Reported {report.type}</Typography>
                      <Badge variant="outline" label={report.severity} className="mr-2" />
                  </View>
                  <Typography variant="body" className="font-medium mb-1">{report.target}</Typography>
                  <Typography variant="caption" color="muted">Reported by {report.reportedBy} on {report.date}</Typography>
                </View>
              </View>
              <Badge variant={report.status === 'Pending' ? 'warning' : 'outline'} label={report.status} />
            </View>

            <View className="bg-background p-3 rounded-md border border-border mb-4">
                <Typography variant="caption" className="font-bold mb-1">Report Reason provided by User:</Typography>
                <Typography variant="body" color="muted">"This looks like a spam or scam post. It contains suspicious links and asks for money."</Typography>
            </View>

            <View className="flex-row items-center justify-end border-t border-border pt-3">
              <TouchableOpacity className="px-3 py-2 bg-surface border border-border rounded-md mr-2">
                  <Typography variant="caption" className="font-medium text-text-muted">Dismiss Report</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="px-3 py-2 bg-surface border border-status-error rounded-md mr-2">
                  <Typography variant="caption" className="font-medium text-status-error">Remove Content</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 bg-status-error rounded-md">
                  <Typography variant="caption" color="inverse" className="font-medium">Suspend User</Typography>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
