import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { SearchBar } from '../../../components/SearchBar';
import { FilterChip } from '../../../components/FilterChip';

const MOCK_LOGS = [
  { id: '1', action: 'APPROVED_DRIVE', resource: 'DRIVE', user: 'Admin User', date: '2023-10-24 14:30:00', details: 'Approved Google On-Campus Drive' },
  { id: '2', action: 'CHANGED_ROLE', resource: 'USER', user: 'Admin User', date: '2023-10-24 12:15:00', details: 'Changed John Doe from Student to Alumni' },
  { id: '3', action: 'VERIFIED_PROFILE', resource: 'ALUMNI', user: 'System', date: '2023-10-23 09:00:00', details: 'Auto-verified Sarah Jenkins' },
  { id: '4', action: 'DELETED_EVENT', resource: 'EVENT', user: 'Placement Officer', date: '2023-10-22 16:45:00', details: 'Deleted Workshop: Resume Building' },
];

export default function AuditCenterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || log.resource === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ScreenContainer>
      <View className="mb-6 mt-2 flex-row justify-between items-center">
        <View>
            <Typography variant="h1" className="mb-1">Audit Center</Typography>
            <Typography variant="body" color="muted">Monitor system activity and administrative actions.</Typography>
        </View>
        <TouchableOpacity className="bg-surface border border-border px-3 py-2 rounded-lg">
          <Typography variant="caption" className="font-semibold">Export CSV</Typography>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search logs by action, user, or details..." 
        />
      </View>

      <View className="flex-row mb-6">
        {['All', 'DRIVE', 'USER', 'ALUMNI', 'EVENT'].map(filter => (
          <View key={filter} className="mr-2">
            <FilterChip 
              label={filter} 
              isSelected={activeFilter === filter} 
              onPress={() => setActiveFilter(filter)} 
            />
          </View>
        ))}
      </View>

      <Card className="bg-surface border border-border p-0 overflow-hidden flex-1 mb-6">
        <View className="flex-row bg-primary/5 p-4 border-b border-border">
            <Typography variant="caption" className="font-bold flex-1">Timestamp</Typography>
            <Typography variant="caption" className="font-bold flex-[1.5]">Action</Typography>
            <Typography variant="caption" className="font-bold flex-[2]">Details</Typography>
            <Typography variant="caption" className="font-bold flex-1 text-right">User</Typography>
        </View>
        <FlatList
            data={filteredLogs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View className="flex-row p-4 border-b border-border items-center">
                    <Typography variant="caption" color="muted" className="flex-1">{item.date}</Typography>
                    <View className="flex-[1.5]">
                        <View className="bg-secondary/10 self-start px-2 py-1 rounded-md mb-1">
                            <Typography variant="caption" color="primary" className="font-semibold">{item.action}</Typography>
                        </View>
                        <Typography variant="caption" color="muted">{item.resource}</Typography>
                    </View>
                    <Typography variant="body" className="flex-[2] pr-2">{item.details}</Typography>
                    <Typography variant="caption" className="flex-1 font-medium text-right">{item.user}</Typography>
                </View>
            )}
        />
      </Card>
    </ScreenContainer>
  );
}
