import { View, TextInput, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_ALUMNI = [
  { id: 1, name: 'Alice Walker', department: 'Computer Science', batch: '2020', company: 'Google', designation: 'Software Engineer', status: 'Verified' },
  { id: 2, name: 'Bob Harris', department: 'Mechanical Engineering', batch: '2019', company: 'Tesla', designation: 'Design Engineer', status: 'Pending' },
];

export default function AlumniManagement() {
  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Directory</Typography>
          <Typography variant="h1">Alumni Management</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-primary px-4 py-2 rounded-md">
          <MaterialIcons name="filter-list" size={20} color="white" />
          <Typography variant="body" color="inverse" className="ml-2 font-medium">Filter</Typography>
        </TouchableOpacity>
      </View>

      {/* Search and Filters Placeholder */}
      <View className="mb-6 bg-surface p-4 rounded-xl border border-border">
        <View className="flex-row items-center bg-background rounded-md px-3 py-2 border border-border">
          <MaterialIcons name="search" size={20} color="#64748b" />
          <TextInput 
            placeholder="Search alumni by name, company, or industry..." 
            className="flex-1 ml-2 font-medium"
          />
        </View>
      </View>

      {/* Alumni List Grid */}
      <View className="flex-row flex-wrap justify-between">
        {MOCK_ALUMNI.map(alumnus => (
          <Card key={alumnus.id} className="w-full md:w-[48%] lg:w-[32%] mb-4 p-4 bg-surface border border-border flex-col justify-between">
            <View>
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
                    <Typography variant="h3" className="text-primary">{alumnus.name.charAt(0)}</Typography>
                  </View>
                  <View>
                    <Typography variant="h3" className="mb-0.5">{alumnus.name}</Typography>
                    <Typography variant="caption" color="muted">{alumnus.designation} at {alumnus.company}</Typography>
                  </View>
                </View>
                <Badge variant={alumnus.status === 'Verified' ? 'success' : alumnus.status === 'Pending' ? 'warning' : 'error'} label={alumnus.status} />
              </View>
              
              <View className="mb-4 space-y-1 mt-2">
                <View className="flex-row items-center">
                  <MaterialIcons name="menu-book" size={16} color="#64748b" className="mr-2" />
                  <Typography variant="body" color="muted">{alumnus.department}</Typography>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons name="date-range" size={16} color="#64748b" className="mr-2" />
                  <Typography variant="body" color="muted">Class of {alumnus.batch}</Typography>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-end space-x-2 border-t border-border pt-3 mt-2">
              <TouchableOpacity className="px-3 py-1.5 border border-border rounded-md">
                <Typography variant="caption" className="font-medium">View Profile</Typography>
              </TouchableOpacity>
              {alumnus.status === 'Pending' && (
                <TouchableOpacity className="px-3 py-1.5 bg-primary rounded-md">
                  <Typography variant="caption" color="inverse" className="font-medium">Verify</Typography>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
