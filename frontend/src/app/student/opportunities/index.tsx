import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useOpportunities } from '../../../hooks/useOpportunities';

// Helper to format dates roughly
const timeAgo = (dateStr: string) => {
  const diffDays = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 3600 * 24));
  if (diffDays === 0) return 'Today';
  return `${diffDays}d ago`;
};

export default function StudentOpportunitiesHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  
  // Use the React Query hook to fetch live opportunities
  const { data: opportunities, isLoading } = useOpportunities({ 
    search: searchQuery || undefined 
  });

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
      {/* Header */}
      <View className="mb-8">
        <Text className="text-[32px] md:text-[48px] font-bold text-student-on-surface tracking-tight mb-2">Opportunities Hub</Text>
        <Text className="text-[18px] text-student-on-surface-variant">Discover internships, entry-level jobs, and exclusive alumni referrals.</Text>
      </View>

      {/* Search and Filters */}
      <View className="flex-col md:flex-row gap-4 mb-8">
        <View className="flex-1 relative">
          <View className="absolute left-4 top-3.5 z-10">
            <MaterialIcons name="search" size={24} color="#5c5f61" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by role, company, or keyword"
            placeholderTextColor="#777587"
            className="w-full bg-student-surface rounded-xl border border-student-outline-variant py-3.5 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary transition-colors shadow-sm"
          />
        </View>
        <TouchableOpacity className="bg-student-surface border border-student-outline-variant rounded-xl px-6 py-3.5 flex-row items-center justify-center gap-2 shadow-sm hover:bg-student-surface-container-high transition-colors">
          <MaterialIcons name="filter-list" size={20} color="#0b1c30" />
          <Text className="text-[16px] font-medium text-student-on-surface">Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-student-outline-variant mb-6">
        {['All', 'Internships', 'Entry Level', 'Referrals'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-3 px-6 border-b-2 ${activeTab === tab ? 'border-student-primary' : 'border-transparent'}`}
          >
            <Text className={`text-[16px] font-medium ${activeTab === tab ? 'text-student-primary' : 'text-student-secondary'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Job Grid */}
      <View className="flex-col md:flex-row flex-wrap -mx-3">
        {isLoading ? (
          <View className="w-full py-12 items-center justify-center">
            <ActivityIndicator size="large" color="#3525cd" />
            <Text className="mt-4 text-student-secondary font-medium">Loading opportunities...</Text>
          </View>
        ) : !opportunities || opportunities.length === 0 ? (
          <View className="w-full py-20 items-center justify-center">
            <View className="w-16 h-16 bg-student-surface-container-high rounded-full items-center justify-center mb-4">
              <MaterialIcons name="work-outline" size={32} color="#5c5f61" />
            </View>
            <Text className="text-[18px] font-medium text-student-on-surface mb-2">No opportunities found</Text>
            <Text className="text-[14px] text-student-secondary text-center max-w-sm">
              {searchQuery ? "We couldn't find any opportunities matching your search." : "There are currently no open opportunities available."}
            </Text>
          </View>
        ) : (
          opportunities.map((job) => (
            <View key={job.id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <View className="bg-student-surface rounded-xl border border-student-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow h-full flex-col">
                <View className="flex-row items-start justify-between mb-4">
                  <View className="w-12 h-12 bg-[#f8f9ff] border border-student-outline-variant rounded-lg flex items-center justify-center">
                    <MaterialIcons name="business" size={28} color="#3525cd" />
                  </View>
                  <View className="bg-student-surface-container-high px-2 py-1 rounded">
                    <Text className="text-[12px] font-medium text-student-on-surface">{timeAgo(job.created_at)}</Text>
                  </View>
                </View>
                <Text className="text-[20px] font-semibold text-student-on-surface mb-1" numberOfLines={2}>
                  {job.title}
                </Text>
                <Text className="text-[16px] text-student-primary font-medium mb-3">{job.company}</Text>
                
                <View className="flex-row items-center gap-4 mb-4 text-[14px]">
                  {job.location && (
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons name="location-on" size={16} color="#5c5f61" />
                      <Text className="text-student-secondary text-[14px]" numberOfLines={1}>{job.location}</Text>
                    </View>
                  )}
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="work" size={16} color="#5c5f61" />
                    <Text className="text-student-secondary text-[14px]">Full-time</Text>
                  </View>
                </View>

                {/* Just a static representation for referrers for now since backend doesn't attach them yet */}
                <View className="bg-student-surface-container-low rounded-lg p-3 mb-4 flex-row items-center gap-3 mt-auto">
                  <View className="w-8 h-8 rounded-full bg-student-tertiary-fixed border border-student-outline-variant items-center justify-center">
                    <Text className="text-student-on-tertiary-fixed font-bold">A</Text>
                  </View>
                  <View>
                    <Text className="text-[12px] text-student-on-surface font-medium">Shared by Alumni Network</Text>
                    <Text className="text-[10px] text-student-secondary">AlumniConnect</Text>
                  </View>
                </View>

                <TouchableOpacity className="w-full bg-student-surface border border-student-outline-variant rounded-lg py-2 items-center justify-center hover:bg-student-surface-container-high transition-colors">
                  <Text className="text-[14px] font-medium text-student-on-surface">View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
