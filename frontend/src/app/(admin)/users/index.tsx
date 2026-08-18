import { View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_USERS = [
  { id: '101', name: 'John Doe', type: 'Student', email: 'john@student.edu', status: 'Active', joined: 'Oct 10, 2026' },
  { id: '102', name: 'Tech University', type: 'Institute', email: 'admin@tech.edu', status: 'Active', joined: 'Oct 01, 2026' },
  { id: '103', name: 'Alice Smith', type: 'Alumni', email: 'alice@alumni.com', status: 'Suspended', joined: 'Sep 15, 2026' },
];

export default function UserManagement() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Platform Users</Typography>
          <Typography variant="h1">User Directory</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-admin-primary px-4 py-2 rounded-md">
          <MaterialIcons name="filter-list" size={20} color="white" />
          <Typography variant="body" className="ml-2 font-medium text-admin-on-primary">Filters</Typography>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="mb-6 bg-admin-surface-card p-4 rounded-xl border border-admin-border-subtle shadow-sm">
        <View className="flex-row items-center bg-admin-surface-container-low rounded-full px-4 py-2">
          <MaterialIcons name="search" size={20} color="#777587" />
          <TextInput 
            placeholder="Search by name, email or ID..." 
            className="flex-1 ml-2 font-medium text-admin-on-surface"
            placeholderTextColor="#777587"
          />
        </View>
        
        <View className="flex-row flex-wrap mt-4 space-x-2">
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-admin-primary bg-admin-primary-container">
                <Typography variant="caption" className="text-admin-on-primary-container font-medium">All Users</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-admin-border-subtle bg-admin-surface-container-lowest">
                <Typography variant="caption" className="text-admin-on-surface-variant">Students</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-admin-border-subtle bg-admin-surface-container-lowest">
                <Typography variant="caption" className="text-admin-on-surface-variant">Alumni</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1.5 rounded-full border border-admin-border-subtle bg-admin-surface-container-lowest">
                <Typography variant="caption" className="text-admin-on-surface-variant">Institutes</Typography>
            </TouchableOpacity>
        </View>
      </View>

      {/* User Grid/List */}
      <View className="flex-row flex-wrap justify-between">
        {MOCK_USERS.map(user => (
          <View key={user.id} className="w-full md:w-[48%] lg:w-[32%] mb-4 p-4 bg-admin-surface-card border border-admin-border-subtle rounded-xl flex-col justify-between shadow-sm">
            <View>
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center flex-1">
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
                      user.type === 'Institute' ? 'bg-admin-secondary-container' : 'bg-admin-primary-container'
                  }`}>
                    <Typography variant="h3" className={user.type === 'Institute' ? 'text-admin-on-secondary-container' : 'text-admin-on-primary-container'}>
                        {user.name.charAt(0)}
                    </Typography>
                  </View>
                  <View className="flex-1">
                    <Typography variant="h3" className="mb-0.5 text-admin-on-surface" numberOfLines={1}>{user.name}</Typography>
                    <Typography variant="caption" className="text-admin-on-surface-variant" numberOfLines={1}>{user.email}</Typography>
                  </View>
                </View>
              </View>
              
              <View className="mb-4 space-y-2 mt-1">
                <View className="flex-row justify-between items-center">
                  <Typography variant="caption" className="text-admin-on-surface-variant">Role</Typography>
                  <Typography variant="body" className="font-medium text-admin-on-surface">{user.type}</Typography>
                </View>
                <View className="flex-row justify-between items-center">
                  <Typography variant="caption" className="text-admin-on-surface-variant">Status</Typography>
                  <Badge variant={user.status === 'Active' ? 'success' : 'error'} label={user.status} />
                </View>
                <View className="flex-row justify-between items-center">
                  <Typography variant="caption" className="text-admin-on-surface-variant">Joined</Typography>
                  <Typography variant="caption" className="font-medium text-admin-on-surface">{user.joined}</Typography>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-end space-x-2 border-t border-admin-border-subtle pt-3 mt-2">
              <TouchableOpacity className="p-2 border border-admin-border-subtle rounded-md bg-admin-surface-container-lowest">
                <MaterialIcons name="block" size={18} color="#ba1a1a" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 border border-admin-border-subtle rounded-md bg-admin-surface-container-lowest">
                <MaterialIcons name="edit" size={18} color="#464555" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="px-4 py-1.5 bg-admin-primary rounded-md items-center justify-center ml-2"
                onPress={() => router.push(`/(admin)/users/${user.id}` as any)}
              >
                <Typography variant="caption" className="font-medium text-admin-on-primary">Details</Typography>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}
