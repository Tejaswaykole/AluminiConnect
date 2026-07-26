import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { SearchBar } from '../../../components/SearchBar';
import { useAlumni } from '../../../hooks/queries/useAlumni';

export default function PlacementAlumniScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: alumniList = [], isLoading } = useAlumni();

  const filteredAlumni = alumniList.filter(alumni => {
    const nameMatch = alumni.first_name ? (alumni.first_name + ' ' + alumni.last_name).toLowerCase() : '';
    const nameStr = alumni.name ? alumni.name.toLowerCase() : nameMatch;
    
    return nameStr.includes(searchQuery.toLowerCase()) || 
           (alumni.company || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Alumni Directory</Typography>
        <Typography variant="body" color="muted">Browse and manage alumni mentors.</Typography>
      </View>

      <View className="mb-6">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, company..." 
        />
      </View>

      <FlatList
        data={filteredAlumni}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No alumni found</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/alumni/${item.id}` as any)}>
            <Card className="mb-4">
              <View className="flex-row items-start mb-3">
                <Avatar url={item.avatar} fallbackInitials={(item.name || item.first_name || '?').charAt(0)} size="md" className="mr-4 mt-1" />
                <View className="flex-1">
                  <Typography variant="h3">{item.name || `${item.first_name || ''} ${item.last_name || ''}`}</Typography>
                  <Typography variant="caption" color="muted">{item.position || 'Alumni'} at {item.company || 'Unknown Company'}</Typography>
                  <Typography variant="caption" color="muted">Class of {item.graduationYear || '2021'}</Typography>
                </View>
                {item.availableForMentorship && (
                  <View className="bg-status-success/10 px-2 py-1 rounded-md">
                    <Typography variant="caption" color="primary" className="font-medium">Mentor</Typography>
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
