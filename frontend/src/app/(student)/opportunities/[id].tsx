import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { OPPORTUNITY_MOCKS } from '../../../mocks';

export default function OpportunityDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const opp = OPPORTUNITY_MOCKS.find(o => o.id === id);

  if (!opp) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Opportunity not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Opportunities
        </Typography>
      </TouchableOpacity>

      <View className="mb-8">
        <Typography variant="h1" className="mb-2">{opp.title}</Typography>
        <Typography variant="h3" color="muted" className="mb-4">{opp.company}</Typography>
        
        <View className="flex-row flex-wrap gap-2 mb-6">
          <Badge label={opp.type} variant="primary" />
          <Badge label={opp.location} variant="outline" />
          <Badge label={`Deadline: ${new Date(opp.deadline).toLocaleDateString()}`} variant="warning" />
        </View>

        <Button title="Apply Now" onPress={() => {}} />
      </View>

      <Card className="mb-6">
        <Typography variant="h3" className="mb-3">Description</Typography>
        <Typography variant="body" color="muted" className="leading-relaxed">
          {opp.description}
        </Typography>
      </Card>
      
      <Card className="mb-6">
        <Typography variant="h3" className="mb-3">Requirements</Typography>
        <Typography variant="body" color="muted" className="leading-relaxed">
          • Currently enrolled in a relevant degree program{'\n'}
          • Strong problem-solving skills{'\n'}
          • Familiarity with modern web technologies
        </Typography>
      </Card>
    </ScreenContainer>
  );
}
