import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_VERIFICATIONS = [
  { id: 1, type: 'STUDENT', name: 'James Doe', department: 'Civil Engineering', batch: '2025', date: 'Oct 15, 2026', status: 'Pending' },
  { id: 2, type: 'ALUMNI', name: 'Laura Smith', department: 'Computer Science', batch: '2018', date: 'Oct 14, 2026', status: 'Pending' },
  { id: 3, type: 'STUDENT', name: 'Michael Johnson', department: 'Mechanical Engineering', batch: '2027', date: 'Oct 13, 2026', status: 'Correction Required' },
];

export default function VerificationCenter() {
  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Administration</Typography>
          <Typography variant="h1">Verification Center</Typography>
        </View>
        <View className="flex-row space-x-2">
            <TouchableOpacity className="px-4 py-2 bg-surface border border-border rounded-md">
            <Typography variant="body" className="font-medium">History</Typography>
            </TouchableOpacity>
        </View>
      </View>

      {/* Verification List */}
      <View className="w-full">
        {MOCK_VERIFICATIONS.map(req => (
          <Card key={req.id} className="mb-4 bg-surface border border-border p-4 flex-col md:flex-row justify-between items-start md:items-center">
            
            <View className="flex-row items-center mb-4 md:mb-0">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
                <MaterialIcons name={req.type === 'STUDENT' ? 'school' : 'person'} size={24} color="#154539" />
              </View>
              <View>
                <View className="flex-row items-center mb-1">
                    <Typography variant="h3" className="mr-2">{req.name}</Typography>
                    <Badge variant="outline" label={req.type} />
                </View>
                <Typography variant="caption" color="muted">{req.department} • Batch of {req.batch}</Typography>
                <Typography variant="caption" color="muted" className="mt-1">Submitted: {req.date}</Typography>
              </View>
            </View>

            <View className="flex-row items-center w-full md:w-auto justify-end border-t border-border md:border-t-0 pt-3 md:pt-0">
              {req.status === 'Pending' ? (
                  <>
                    <TouchableOpacity className="px-3 py-2 bg-surface border border-border rounded-md mr-2">
                        <Typography variant="caption" className="font-medium text-status-error">Reject</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-3 py-2 bg-surface border border-border rounded-md mr-2">
                        <Typography variant="caption" className="font-medium">Request Correction</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-4 py-2 bg-primary rounded-md">
                        <Typography variant="caption" color="inverse" className="font-medium">Approve</Typography>
                    </TouchableOpacity>
                  </>
              ) : (
                  <Badge variant="warning" label={req.status} />
              )}
            </View>

          </Card>
        ))}
      </View>

    </ScreenContainer>
  );
}
