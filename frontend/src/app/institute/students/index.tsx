import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_STUDENTS = [
  { id: 1, name: 'John Doe', department: 'Computer Science', batch: '2025', status: 'Verified' },
  { id: 2, name: 'Jane Smith', department: 'Mechanical Engineering', batch: '2026', status: 'Pending' },
  { id: 3, name: 'Sam Wilson', department: 'Electrical Engineering', batch: '2024', status: 'Suspended' },
];

export default function StudentManagement() {
  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Directory</Typography>
          <Typography variant="h1">Student Management</Typography>
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
            placeholder="Search students by name, email or ID..." 
            className="flex-1 ml-2 font-medium"
          />
        </View>
        
        <View className="flex-row flex-wrap mt-4">
          <View className="bg-primary/10 px-3 py-1.5 rounded-full mr-2 mb-2">
            <Typography variant="caption" className="text-primary font-medium">Dept: Computer Science ✕</Typography>
          </View>
          <View className="bg-primary/10 px-3 py-1.5 rounded-full mr-2 mb-2">
            <Typography variant="caption" className="text-primary font-medium">Batch: 2025 ✕</Typography>
          </View>
        </View>
      </View>

      {/* Student List Grid */}
      <View className="flex-row flex-wrap justify-between">
        {MOCK_STUDENTS.map(student => (
          <Card key={student.id} className="w-full md:w-[48%] lg:w-[32%] mb-4 p-4 bg-surface border border-border flex-col justify-between">
            <View>
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
                    <Typography variant="h3" className="text-primary">{student.name.charAt(0)}</Typography>
                  </View>
                  <View>
                    <Typography variant="h3" className="mb-0.5">{student.name}</Typography>
                    <Typography variant="caption" color="muted">ID: STU-{student.id}000{student.id}</Typography>
                  </View>
                </View>
                <Badge variant={student.status === 'Verified' ? 'success' : student.status === 'Pending' ? 'warning' : 'error'} label={student.status} />
              </View>
              
              <View className="mb-4 space-y-1">
                <View className="flex-row items-center">
                  <MaterialIcons name="menu-book" size={16} color="#64748b" className="mr-2" />
                  <Typography variant="body" color="muted">{student.department}</Typography>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons name="date-range" size={16} color="#64748b" className="mr-2" />
                  <Typography variant="body" color="muted">Class of {student.batch}</Typography>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-end space-x-2 border-t border-border pt-3 mt-2">
              <TouchableOpacity className="px-3 py-1.5 border border-border rounded-md">
                <Typography variant="caption" className="font-medium">View Profile</Typography>
              </TouchableOpacity>
              {student.status === 'Pending' && (
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
