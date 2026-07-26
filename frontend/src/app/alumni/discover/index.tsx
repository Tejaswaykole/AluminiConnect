import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';

// Mock Alumni for networking
const NETWORK_MOCKS = [
  { id: '1', name: 'Sarah Jenkins', role: 'Staff Engineer', company: 'Stripe', location: 'San Francisco, CA', batch: '2015', department: 'Computer Science', skills: ['React', 'Node.js', 'System Design'] },
  { id: '2', name: 'Michael Chen', role: 'Product Manager', company: 'Google', location: 'New York, NY', batch: '2018', department: 'Business', skills: ['Product Strategy', 'Agile'] },
  { id: '3', name: 'Aisha Patel', role: 'UX Designer', company: 'Airbnb', location: 'Remote', batch: '2020', department: 'Design', skills: ['Figma', 'User Research'] },
];

const FILTERS = ['All', 'Same Company', 'Same Industry', 'My Batch', 'My Location'];

export default function AlumniNetworkScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredNetwork = NETWORK_MOCKS.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          person.company.toLowerCase().includes(searchQuery.toLowerCase());
    // In a real app, filters would apply complex logic against the current user's profile
    return matchesSearch;
  });

  return (
    <ScreenContainer>
      <View className="mb-6 mt-2">
        <Typography variant="h1" className="mb-2">Alumni Network</Typography>
        <Typography variant="body" color="muted">Connect with peers, mentors, and industry leaders.</Typography>
      </View>

      <View className="mb-4">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, company, or role..." 
        />
      </View>

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {FILTERS.map(filter => (
            <View key={filter} className="mr-2">
              <FilterChip 
                label={filter} 
                isSelected={activeFilter === filter} 
                onPress={() => setActiveFilter(filter)} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredNetwork}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No connections found</Typography>
            <Typography variant="caption" color="muted">Try adjusting your search or filters.</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/alumni/discover/${item.id}`)}>
            <Card className="mb-4 bg-surface border border-border">
              <View className="flex-row items-start mb-3">
                <Avatar url="" fallbackInitials={item.name.charAt(0)} size="md" className="mr-4 mt-1" />
                <View className="flex-1">
                  <Typography variant="h3">{item.name}</Typography>
                  <Typography variant="caption" className="font-semibold text-primary">{item.role} at {item.company}</Typography>
                  <Typography variant="caption" color="muted">{item.location} • Class of {item.batch}</Typography>
                </View>
                <TouchableOpacity className="bg-primary/10 px-3 py-1.5 rounded-lg ml-2">
                  <Typography variant="caption" color="primary" className="font-semibold">Connect</Typography>
                </TouchableOpacity>
              </View>
              
              <View className="flex-row flex-wrap mt-2">
                {item.skills.map((skill, index) => (
                  <View key={index} className="bg-surface border border-border px-2 py-1 rounded-md mr-2 mb-2">
                    <Typography variant="caption" color="muted" className="font-medium">{skill}</Typography>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
