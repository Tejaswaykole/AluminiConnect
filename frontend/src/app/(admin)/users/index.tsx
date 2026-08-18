import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';
import { useStudents } from '../../../hooks/queries/useStudents';
import { useAlumni } from '../../../hooks/queries/useAlumni';

const ROLES = ['All', 'Student', 'Alumni', 'Placement'];

export default function AdminUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const { data: studentList = [] } = useStudents();
  const { data: alumniList = [] } = useAlumni();

  // Combine data for admin view
  const allUsers = [
    ...studentList.map(s => ({ ...s, role: 'Student' })),
    ...alumniList.map(a => ({ ...a, role: 'Alumni' }))
  ];

  const filteredUsers = allUsers.filter(user => {
    const nameMatch = user.first_name ? (user.first_name + ' ' + user.last_name).toLowerCase() : '';
    const nameStr = user.name ? user.name.toLowerCase() : nameMatch;
    
    const matchesSearch = nameStr.includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">User Management</Typography>
        <Typography variant="body" color="muted">Manage all platform users.</Typography>
      </View>

      <View className="mb-6">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name..." 
        />
      </View>

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {ROLES.map(role => (
            <View key={role} className="mr-2">
              <FilterChip 
                label={role} 
                isSelected={selectedRole === role} 
                onPress={() => setSelectedRole(role)} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted">No users found</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <Card className="mb-4">
            <View className="flex-row items-center">
              <Avatar url={item.avatar} fallbackInitials={(item.name || item.first_name || '?').charAt(0)} size="md" className="mr-4" />
              <View className="flex-1">
                <Typography variant="h3" className="mb-1">{item.name || `${item.first_name || ''} ${item.last_name || ''}`}</Typography>
                <Typography variant="caption" color="muted">{item.role}</Typography>
              </View>
              <View className="bg-status-success/10 px-2 py-1 rounded-md">
                <Typography variant="caption" color="primary" className="font-medium">Active</Typography>
              </View>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
}
