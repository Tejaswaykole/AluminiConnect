import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { SearchBar } from '../../../components/SearchBar';

const MOCK_DRIVES = [
  { id: '1', title: 'Google On-Campus 2024', company: 'Google', roles: 'SDE, PM', date: '2023-11-15', status: 'ACTIVE', applied: 450, shortlisted: 120, offers: 12 },
  { id: '2', title: 'Stripe FinTech Recruitment', company: 'Stripe', roles: 'Backend Engineer', date: '2023-12-01', status: 'PUBLISHED', applied: 320, shortlisted: 0, offers: 0 },
  { id: '3', title: 'Microsoft Azure Internships', company: 'Microsoft', roles: 'Cloud Intern', date: '2023-10-10', status: 'COMPLETED', applied: 800, shortlisted: 200, offers: 45 },
];

export default function PlacementDrivesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrives = MOCK_DRIVES.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <View className="mb-6 mt-2 flex-row justify-between items-center">
        <View>
            <Typography variant="h1" className="mb-1">Placement Drives</Typography>
            <Typography variant="body" color="muted">Manage recruitment events and track offers.</Typography>
        </View>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
          <Typography variant="caption" color="inverse" className="font-semibold">+ Create Drive</Typography>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mb-6 space-x-4">
        <Card className="flex-1 bg-surface border border-border p-3">
          <Typography variant="h2" className="text-primary mb-1">12</Typography>
          <Typography variant="caption" color="muted">Active Drives</Typography>
        </Card>
        <Card className="flex-1 bg-surface border border-border p-3">
          <Typography variant="h2" className="text-primary mb-1">1,250</Typography>
          <Typography variant="caption" color="muted">Total Applicants</Typography>
        </Card>
        <Card className="flex-1 bg-surface border border-border p-3">
          <Typography variant="h2" className="text-status-success mb-1">142</Typography>
          <Typography variant="caption" color="muted">Offers Extended</Typography>
        </Card>
      </View>

      <View className="mb-6">
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search drives by name or company..." 
        />
      </View>

      <FlatList
        data={filteredDrives}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Card className="mb-4 bg-surface border border-border">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-4">
                  <Typography variant="h3">{item.title}</Typography>
                  <Typography variant="caption" color="muted">{item.company} • {item.roles}</Typography>
                </View>
                <View className={`px-2 py-1 rounded-md ${item.status === 'ACTIVE' ? 'bg-status-success/10' : item.status === 'PUBLISHED' ? 'bg-primary/10' : 'bg-surface border border-border'}`}>
                  <Typography variant="caption" className={`font-semibold ${item.status === 'ACTIVE' ? 'text-status-success' : item.status === 'PUBLISHED' ? 'text-primary' : 'text-muted'}`}>
                    {item.status}
                  </Typography>
                </View>
              </View>

              <View className="flex-row justify-between border-t border-border pt-4">
                <View className="items-center">
                    <Typography variant="body" className="font-bold">{item.applied}</Typography>
                    <Typography variant="caption" color="muted">Applied</Typography>
                </View>
                <View className="items-center">
                    <Typography variant="body" className="font-bold">{item.shortlisted}</Typography>
                    <Typography variant="caption" color="muted">Shortlisted</Typography>
                </View>
                <View className="items-center">
                    <Typography variant="body" className="font-bold text-primary">{item.offers}</Typography>
                    <Typography variant="caption" color="primary" className="font-semibold">Offers</Typography>
                </View>
                <View className="items-center justify-center">
                    <Typography variant="caption" color="muted">Date</Typography>
                    <Typography variant="caption" className="font-semibold">{item.date}</Typography>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
