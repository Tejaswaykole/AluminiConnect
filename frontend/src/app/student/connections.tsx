import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useConnections, usePendingRequests, useSendConnectionRequest, useAcceptConnectionRequest } from '../../hooks/queries/useConnections';

export default function StudentConnections() {
  const [activeTab, setActiveTab] = useState<'connections' | 'requests'>('connections');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: connections, isLoading: isLoadingConnections, isError: isErrorConnections } = useConnections();
  const { data: requests, isLoading: isLoadingRequests, isError: isErrorRequests } = usePendingRequests();
  
  const acceptMutation = useAcceptConnectionRequest();

  const handleAcceptRequest = (connectionId: string) => {
    acceptMutation.mutate(connectionId);
  };

  const renderConnections = () => {
    if (isLoadingConnections) {
      return (
        <View className="items-center py-12">
          <ActivityIndicator size="large" color="#0b1c30" />
          <Text className="mt-4 text-student-on-surface-variant">Loading connections...</Text>
        </View>
      );
    }
    
    if (isErrorConnections) {
      return (
        <View className="items-center py-12 bg-student-error-container rounded-xl">
          <MaterialIcons name="error-outline" size={48} color="#ba1a1a" />
          <Text className="mt-4 text-student-error">Failed to load connections.</Text>
        </View>
      );
    }

    if (!connections || connections.length === 0) {
      return (
        <View className="items-center py-12 bg-student-surface rounded-xl border border-student-outline-variant">
          <MaterialIcons name="people-outline" size={48} color="#5c5f61" />
          <Text className="mt-4 text-student-on-surface-variant text-[16px]">You don't have any connections yet.</Text>
          <Text className="mt-2 text-student-on-surface-variant text-[14px]">Go to Discovery to find alumni and students to connect with!</Text>
        </View>
      );
    }

    return (
      <View className="flex-col gap-4">
        {connections.map((connection) => (
          <View key={connection.id} className="bg-student-surface rounded-xl border border-student-outline-variant p-4 shadow-sm flex-row items-center justify-between hover:bg-student-surface-container-low transition-colors">
            <View className="flex-row items-center gap-4">
              <Image 
                source={{ uri: connection.user.avatar || 'https://i.pravatar.cc/150?u=' + connection.user.id }}
                className="w-12 h-12 rounded-full border border-student-outline-variant"
              />
              <View>
                <Text className="text-[16px] font-semibold text-student-on-surface">{connection.user.first_name} {connection.user.last_name}</Text>
                <Text className="text-[14px] text-student-secondary">{connection.user.profession || 'Student'}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-student-surface-container-high p-2 rounded-full border border-student-outline-variant">
              <MaterialIcons name="chat-bubble-outline" size={20} color="#0b1c30" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderRequests = () => {
    if (isLoadingRequests) {
      return (
        <View className="items-center py-12">
          <ActivityIndicator size="large" color="#0b1c30" />
        </View>
      );
    }

    if (!requests || requests.length === 0) {
      return (
        <View className="items-center py-12 bg-student-surface rounded-xl border border-student-outline-variant">
          <MaterialIcons name="mark-email-read" size={48} color="#5c5f61" />
          <Text className="mt-4 text-student-on-surface-variant text-[16px]">No pending requests.</Text>
        </View>
      );
    }

    return (
      <View className="flex-col gap-4">
        {requests.map((request) => (
          <View key={request.id} className="bg-student-surface rounded-xl border border-student-outline-variant p-4 shadow-sm flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <Image 
                source={{ uri: request.user.avatar || 'https://i.pravatar.cc/150?u=' + request.user.id }}
                className="w-12 h-12 rounded-full border border-student-outline-variant"
              />
              <View>
                <Text className="text-[16px] font-semibold text-student-on-surface">{request.user.first_name} {request.user.last_name}</Text>
                <Text className="text-[14px] text-student-secondary">{request.user.profession || 'Student'}</Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity 
                className="bg-student-primary px-4 py-2 rounded-lg items-center justify-center hover:bg-student-primary/90"
                onPress={() => handleAcceptRequest(request.id)}
              >
                <Text className="text-[14px] font-medium text-student-on-primary">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-student-error-container px-4 py-2 rounded-lg items-center justify-center">
                <Text className="text-[14px] font-medium text-student-error">Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView 
      className="flex-1 bg-student-background"
      contentContainerStyle={{ 
        paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
        paddingTop: 32,
        paddingBottom: 96,
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-[32px] md:text-[48px] font-bold text-student-on-surface tracking-tight mb-2">Network</Text>
        <Text className="text-[18px] text-student-on-surface-variant">Manage your professional connections.</Text>
      </View>

      <View className="flex-row gap-4 border-b border-student-outline-variant mb-6">
        <TouchableOpacity 
          className={`pb-3 px-2 ${activeTab === 'connections' ? 'border-b-2 border-student-primary' : ''}`}
          onPress={() => setActiveTab('connections')}
        >
          <Text className={`text-[16px] font-medium ${activeTab === 'connections' ? 'text-student-primary' : 'text-student-on-surface-variant'}`}>
            My Connections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`pb-3 px-2 ${activeTab === 'requests' ? 'border-b-2 border-student-primary' : ''}`}
          onPress={() => setActiveTab('requests')}
        >
          <Text className={`text-[16px] font-medium ${activeTab === 'requests' ? 'text-student-primary' : 'text-student-on-surface-variant'}`}>
            Pending Requests {requests && requests.length > 0 && `(${requests.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'connections' ? (
        <>
          <View className="relative mb-6">
            <View className="absolute left-4 top-3.5 z-10">
              <MaterialIcons name="search" size={24} color="#5c5f61" />
            </View>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search connections..."
              placeholderTextColor="#777587"
              className="w-full bg-student-surface rounded-xl border border-student-outline-variant py-3 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary transition-colors shadow-sm"
            />
          </View>
          {renderConnections()}
        </>
      ) : (
        renderRequests()
      )}
    </ScrollView>
  );
}
