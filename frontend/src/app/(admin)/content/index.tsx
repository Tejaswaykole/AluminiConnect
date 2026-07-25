import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { FilterChip } from '../../../components/FilterChip';

const CONTENT_TYPES = ['Communities', 'Events', 'Opportunities'];

export default function AdminContentScreen() {
  const [selectedType, setSelectedType] = useState('Communities');

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Content Moderation</Typography>
        <Typography variant="body" color="muted">Review and manage platform content.</Typography>
      </View>

      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {CONTENT_TYPES.map(type => (
            <View key={type} className="mr-2">
              <FilterChip 
                label={type} 
                isSelected={selectedType === type} 
                onPress={() => setSelectedType(type)} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 items-center justify-center">
        <Typography variant="body" color="muted">
          All {selectedType.toLowerCase()} are currently compliant.
        </Typography>
      </View>
    </ScreenContainer>
  );
}
