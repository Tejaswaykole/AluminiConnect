import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';
import { useStudents } from '../../../hooks/queries/useStudents';

const DEPARTMENTS = ['All', 'Computer Science', 'Design', 'Finance', 'Engineering'];

export default function StudentDiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const { data: studentList = [], isLoading } = useStudents();

  const filteredStudents = studentList.filter(student => {
    const nameMatch = student.first_name ? (student.first_name + ' ' + student.last_name).toLowerCase() : '';
    const nameStr = student.name ? student.name.toLowerCase() : nameMatch;

    const matchesSearch = nameStr.includes(searchQuery.toLowerCase()) || 
                          (student.skills || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = selectedDept === 'All' || student.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Discover Students</Typography>
        <Typography variant="body" color="muted">Connect with students seeking mentorship.</Typography>
      </View>

      <View className="mb-6">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, skill..." 
        />
      </View>

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {DEPARTMENTS.map(dept => (
            <View key={dept} className="mr-2">
              <FilterChip 
                label={dept} 
                isSelected={selectedDept === dept} 
                onPress={() => setSelectedDept(dept)} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No students found</Typography>
            <Typography variant="caption" color="muted">Try adjusting your search or filters.</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/students/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row items-start mb-3">
                <Avatar url={item.avatar} fallbackInitials={(item.name || item.first_name || '?').charAt(0)} size="md" className="mr-4 mt-1" />
                <View className="flex-1">
                  <Typography variant="h3">{item.name || `${item.first_name || ''} ${item.last_name || ''}`}</Typography>
                  <Typography variant="caption" color="muted">{item.department || 'Student'} • Class of {item.graduationYear || '2025'}</Typography>
                  <Typography variant="caption" color="muted">{item.college || 'University'}</Typography>
                </View>
              </View>
              
              <View className="flex-row flex-wrap mt-2">
                {(item.skills || []).slice(0, 3).map((skill, index) => (
                  <View key={index} className="bg-secondary/10 px-2 py-1 rounded-md mr-2 mb-2">
                    <Typography variant="caption" color="primary" className="font-medium">{skill}</Typography>
                  </View>
                ))}
                {(item.skills || []).length > 3 && (
                  <View className="bg-secondary/10 px-2 py-1 rounded-md mr-2 mb-2">
                    <Typography variant="caption" color="primary" className="font-medium">+{(item.skills || []).length - 3}</Typography>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
