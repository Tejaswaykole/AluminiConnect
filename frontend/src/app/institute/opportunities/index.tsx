import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';
import { OpportunityForm } from '../../../components/institute/OpportunityForm';

const MOCK_OPPS = [
  { id: 1, title: 'Software Engineer', type: 'Job', company: 'Google', location: 'Remote', status: 'Active' },
  { id: 2, title: 'Marketing Intern', type: 'Internship', company: 'TechStartup', location: 'New York', status: 'Draft' },
];

export default function OpportunitiesManagement() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Careers</Typography>
          <Typography variant="h1">Opportunities</Typography>
        </View>
        {!isCreating && (
            <TouchableOpacity 
                className="flex-row items-center bg-primary px-4 py-2 rounded-md"
                onPress={() => setIsCreating(true)}
            >
            <MaterialIcons name="add" size={20} color="white" />
            <Typography variant="body" color="inverse" className="ml-2 font-medium">Create</Typography>
            </TouchableOpacity>
        )}
      </View>

      {isCreating ? (
          <OpportunityForm 
            onSubmit={() => setIsCreating(false)} 
            onCancel={() => setIsCreating(false)} 
          />
      ) : (
          <View className="w-full">
            {MOCK_OPPS.map(opp => (
            <Card key={opp.id} className="mb-4 bg-surface border border-border p-4 flex-col justify-between">
                <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 mr-4">
                    <Typography variant="h3" className="mb-1">{opp.title}</Typography>
                    <Typography variant="body" className="font-medium">{opp.company}</Typography>
                </View>
                <Badge variant={opp.status === 'Active' ? 'success' : 'outline'} label={opp.status} />
                </View>
                
                <View className="flex-row justify-between items-center border-t border-border mt-3 pt-3">
                <View className="flex-row items-center space-x-4">
                    <View className="flex-row items-center mr-4">
                    <MaterialIcons name="work" size={16} color="#64748b" className="mr-1" />
                    <Typography variant="caption" color="muted">{opp.type}</Typography>
                    </View>
                    <View className="flex-row items-center">
                    <MaterialIcons name="location-on" size={16} color="#64748b" className="mr-1" />
                    <Typography variant="caption" color="muted">{opp.location}</Typography>
                    </View>
                </View>

                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity className="p-2 border border-border bg-surface rounded-md">
                        <Typography variant="caption" className="font-medium">Manage</Typography>
                    </TouchableOpacity>
                </View>
                </View>
            </Card>
            ))}
          </View>
      )}
    </ScreenContainer>
  );
}
