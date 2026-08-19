import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCommunities, useJoinCommunity } from '../../hooks/queries/useCommunity';

export default function StudentCommunity() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: communities, isLoading, isError } = useCommunities();
  const joinMutation = useJoinCommunity();

  const handleJoin = (communityId: string) => {
    joinMutation.mutate(communityId);
  };

  return (
    <ScrollView 
      className="flex-1 bg-student-background"
      contentContainerStyle={{ 
        paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
        paddingTop: 32,
        paddingBottom: 96,
        maxWidth: 1280,
        alignSelf: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-[32px] md:text-[48px] font-bold text-student-on-surface tracking-tight mb-2">Communities</Text>
        <Text className="text-[18px] text-student-on-surface-variant">Join groups based on your interests, major, or career goals.</Text>
      </View>

      <View className="flex-col md:flex-row gap-4 mb-8">
        <View className="flex-1 relative">
          <View className="absolute left-4 top-3.5 z-10">
            <MaterialIcons name="search" size={24} color="#5c5f61" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search communities..."
            placeholderTextColor="#777587"
            className="w-full bg-student-surface rounded-xl border border-student-outline-variant py-3.5 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary transition-colors shadow-sm"
          />
        </View>
        <TouchableOpacity className="bg-student-primary rounded-xl px-6 py-3.5 flex-row items-center justify-center shadow-sm hover:bg-student-primary/90 transition-colors">
          <Text className="text-[16px] font-medium text-student-on-primary">Create Group</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-8">
        <Text className="text-[24px] font-semibold text-student-on-surface mb-4">Discover Groups</Text>
        
        {isLoading ? (
          <View className="items-center py-12">
            <ActivityIndicator size="large" color="#0b1c30" />
            <Text className="mt-4 text-student-on-surface-variant">Loading communities...</Text>
          </View>
        ) : isError ? (
          <View className="items-center py-12 bg-student-error-container rounded-xl">
            <MaterialIcons name="error-outline" size={48} color="#ba1a1a" />
            <Text className="mt-4 text-student-error">Failed to load communities.</Text>
          </View>
        ) : !communities || communities.length === 0 ? (
          <View className="items-center py-12 bg-student-surface rounded-xl border border-student-outline-variant">
            <MaterialIcons name="groups" size={48} color="#5c5f61" />
            <Text className="mt-4 text-student-on-surface-variant">No communities found.</Text>
          </View>
        ) : (
          <View className="flex-col md:flex-row flex-wrap -mx-3">
            {communities.map((community) => (
              <View key={community.id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm flex-col hover:shadow-md transition-shadow">
                  <View className="flex-row items-start justify-between mb-4">
                    <View className="w-12 h-12 rounded-lg bg-student-primary-container items-center justify-center">
                      <MaterialIcons name="forum" size={24} color="#2c1ea3" />
                    </View>
                    <View className="bg-student-surface-container-low px-2 py-1 rounded-full border border-student-outline-variant flex-row items-center gap-1">
                      <MaterialIcons name="people" size={14} color="#5c5f61" />
                      <Text className="text-[12px] font-medium text-student-on-surface-variant">{community.member_count || 0} members</Text>
                    </View>
                  </View>

                  <Text className="text-[20px] font-semibold text-student-on-surface mb-2">{community.name}</Text>
                  
                  <Text className="text-[14px] text-student-on-surface-variant mb-4" numberOfLines={3}>
                    {community.description || "A community group."}
                  </Text>

                  <View className="flex-row flex-wrap gap-2 mb-6 mt-auto">
                    {(community.tags || ['Technology', 'Networking']).map((tag, idx) => (
                      <View key={idx} className="bg-student-surface-container-low border border-student-outline-variant px-3 py-1 rounded-full">
                        <Text className="text-[12px] font-medium text-student-on-surface">{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity 
                    className="w-full bg-student-primary py-2.5 rounded-lg items-center justify-center hover:bg-student-primary/90 transition-colors"
                    onPress={() => handleJoin(community.id)}
                  >
                    <Text className="text-[14px] font-medium text-student-on-primary">Join Community</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
