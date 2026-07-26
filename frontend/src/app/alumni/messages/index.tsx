import { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { FilterChip } from '../../../components/FilterChip';
import { SearchBar } from '../../../components/SearchBar';
import { STUDENT_MOCKS } from '../../../mocks';

const MESSAGE_CONTEXTS = ['All', 'Direct', 'Mentorship', 'Recruiter'];

const MOCK_INBOX = [
  { id: '1', name: 'John Doe', avatar: '', context: 'Mentorship', lastMessage: 'Thank you for reviewing my resume! I updated the bullet points as you suggested.', time: '2h ago', unread: true },
  { id: '2', name: 'Sarah Jenkins', avatar: '', context: 'Direct', lastMessage: 'Are you attending the Google Cloud event next week?', time: 'Yesterday', unread: false },
  { id: '3', name: 'Alex Smith', avatar: STUDENT_MOCKS[0].avatar, context: 'Mentorship', lastMessage: 'Could we schedule a mock interview for Friday?', time: 'Mon', unread: false },
  { id: '4', name: 'Tech Innovations HR', avatar: '', context: 'Recruiter', lastMessage: 'We saw your profile and would love to discuss a Senior PM role.', time: 'Last Week', unread: true },
];

export default function ProfessionalMessagesScreen() {
  const router = useRouter();
  const [activeContext, setActiveContext] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = MOCK_INBOX.filter(msg => {
    const matchesContext = activeContext === 'All' || msg.context === activeContext;
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContext && matchesSearch;
  });

  return (
    <ScreenContainer>
      <View className="mb-6 mt-2 flex-row justify-between items-center">
        <Typography variant="h1">Messages</Typography>
        <TouchableOpacity className="bg-primary/10 px-3 py-2 rounded-lg">
          <Typography variant="caption" color="primary" className="font-semibold">+ New Message</Typography>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search conversations..." 
        />
      </View>

      <View className="mb-4 border-b border-border pb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
          {MESSAGE_CONTEXTS.map(context => (
            <View key={context} className="mr-2">
              <FilterChip 
                label={context} 
                isSelected={activeContext === context} 
                onPress={() => setActiveContext(context)} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className={`flex-row items-center py-4 border-b border-border ${item.unread ? 'bg-primary/5' : ''}`}
            onPress={() => {}}
          >
            <Avatar url={item.avatar} fallbackInitials={item.name.charAt(0)} size="md" className="mr-4 ml-2" />
            <View className="flex-1 mr-2">
              <View className="flex-row justify-between items-baseline mb-1">
                <Typography variant="body" className={`font-semibold ${item.unread ? 'text-primary' : ''}`}>
                  {item.name}
                </Typography>
                <Typography variant="caption" color={item.unread ? 'primary' : 'muted'} className={item.unread ? 'font-semibold' : ''}>
                  {item.time}
                </Typography>
              </View>
              <Typography variant="caption" color="muted" numberOfLines={2} className={item.unread ? 'font-medium text-on-surface' : ''}>
                {item.context !== 'Direct' && <Typography variant="caption" className="font-semibold text-primary">[{item.context}] </Typography>}
                {item.lastMessage}
              </Typography>
            </View>
            {item.unread && (
              <View className="w-2.5 h-2.5 bg-primary rounded-full mr-2" />
            )}
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
