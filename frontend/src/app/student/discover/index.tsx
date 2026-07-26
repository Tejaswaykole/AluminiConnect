import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { Badge } from '../../../components/Badge';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { ALUMNI_MOCKS } from '../../../mocks';

const FILTERS = ['All', 'Mentors', 'Software Engineering', 'Data Science', 'Design'];

export default function DiscoverAlumniScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Basic mock search/filter logic
  const filteredAlumni = ALUMNI_MOCKS.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(search.toLowerCase()) || 
                          alumni.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                          (activeFilter === 'Mentors' && alumni.availableForMentorship) ||
                          alumni.skills.some(skill => skill.includes(activeFilter));
    return matchesSearch && matchesFilter;
  });

  return (
    <ScreenContainer>
      <View className="mb-4">
        <Typography variant="h1" className="mb-2">Discover Alumni</Typography>
        <Typography variant="body" color="muted">Find mentors and expand your network.</Typography>
      </View>

      <SearchBar 
        value={search} 
        onChangeText={setSearch} 
        placeholder="Search by name, company, or role..." 
        className="mb-4"
      />

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {FILTERS.map(filter => (
            <FilterChip 
              key={filter}
              label={filter}
              isSelected={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
              className="mr-2"
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredAlumni}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No results found</Typography>
            <Typography variant="caption" color="muted">Try adjusting your search or filters.</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/student/discover/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row">
                <Avatar url={item.avatar} fallbackInitials={item.name.charAt(0)} size="lg" className="mr-4" />
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <Typography variant="h3" className="mb-1">{item.name}</Typography>
                    {item.availableForMentorship && (
                      <Badge label="Mentor" variant="success" />
                    )}
                  </View>
                  <Typography variant="body" className="font-medium mb-1">{item.position}</Typography>
                  <Typography variant="caption" color="muted" className="mb-2">
                    {item.company} • {item.location}
                  </Typography>
                  <View className="flex-row flex-wrap">
                    {item.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} label={skill} variant="secondary" className="mr-2 mb-2" />
                    ))}
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
