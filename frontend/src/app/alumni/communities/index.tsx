import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { SearchBar } from '../../../components/SearchBar';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { COMMUNITY_MOCKS } from '../../../mocks';

export default function CommunitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredCommunities = COMMUNITY_MOCKS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenContainer>
      <View className="mb-4">
        <Typography variant="h1" className="mb-2">Communities</Typography>
        <Typography variant="body" color="muted">Join groups matching your interests.</Typography>
      </View>

      <SearchBar 
        value={search} 
        onChangeText={setSearch} 
        placeholder="Search communities..." 
        className="mb-6"
      />

      <FlatList
        data={filteredCommunities}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted">No communities found</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/alumni/communities/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
                  <MaterialIcons name="forum" size={24} color="#154539" />
                </View>
                <View className="flex-1">
                  <Typography variant="h3">{item.name}</Typography>
                  <Typography variant="caption" color="muted">{item.members.toLocaleString()} members</Typography>
                </View>
              </View>
              <Typography variant="body" color="muted" numberOfLines={2}>
                {item.description}
              </Typography>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
