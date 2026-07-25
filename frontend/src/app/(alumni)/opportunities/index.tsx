import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { OPPORTUNITY_MOCKS } from '../../../mocks';
import { Button } from '../../../components/Button';

export default function AlumniOpportunitiesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-1">
          <Typography variant="h1" className="mb-2">Opportunities</Typography>
          <Typography variant="body" color="muted">Manage jobs and internships you've posted.</Typography>
        </View>
      </View>

      <Button 
        title="Post New Opportunity" 
        onPress={() => router.push('/opportunities/new' as any)} 
        className="mb-6"
      />

      <FlatList
        data={OPPORTUNITY_MOCKS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted" className="mb-2">No opportunities posted</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/opportunities/${item.id}`)}>
            <Card className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <Typography variant="h3" className="flex-1 mr-2">{item.title}</Typography>
                <View className="bg-secondary/10 px-2 py-1 rounded-md">
                  <Typography variant="caption" color="primary" className="font-medium">{item.type}</Typography>
                </View>
              </View>
              <Typography variant="body" className="mb-2">{item.company}</Typography>
              <View className="flex-row justify-between items-center">
                <Typography variant="caption" color="muted">{item.location}</Typography>
                <Typography variant="caption" color="muted">Posted: {item.postedAt}</Typography>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
