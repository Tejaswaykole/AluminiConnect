import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { OPPORTUNITY_MOCKS } from '../../../mocks';

const CATEGORIES = ['All', 'Internship', 'Full-time', 'Part-time', 'Remote'];

export default function OpportunitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredOpportunities = OPPORTUNITY_MOCKS.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) || 
                          opp.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                          opp.type === activeFilter ||
                          (activeFilter === 'Remote' && opp.location.includes('Remote'));
    return matchesSearch && matchesFilter;
  });

  return (
    <ScreenContainer>
      <View className="mb-4">
        <Typography variant="h1" className="mb-2">Opportunities</Typography>
        <Typography variant="body" color="muted">Discover jobs and internships from our network.</Typography>
      </View>

      <SearchBar 
        value={search} 
        onChangeText={setSearch} 
        placeholder="Search jobs, internships, companies..." 
        className="mb-4"
      />

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {CATEGORIES.map(category => (
            <FilterChip 
              key={category}
              label={category}
              isSelected={activeFilter === category}
              onPress={() => setActiveFilter(category)}
              className="mr-2"
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOpportunities}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No opportunities found</Typography>
            <Typography variant="caption" color="muted">Try adjusting your filters.</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/opportunities/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <Typography variant="h3" className="flex-1 mr-2">{item.title}</Typography>
                <Typography variant="caption" color="muted">Ends {new Date(item.deadline).toLocaleDateString()}</Typography>
              </View>
              
              <Typography variant="body" className="font-medium mb-3">{item.company}</Typography>
              
              <View className="flex-row flex-wrap gap-2">
                <Badge label={item.type} variant={item.type === 'Internship' ? 'primary' : 'secondary'} />
                <Badge label={item.location} variant="outline" />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
