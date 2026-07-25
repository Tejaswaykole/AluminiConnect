import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { DRIVE_MOCKS } from '../../../mocks';

export default function PlacementDrivesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-1">
          <Typography variant="h1" className="mb-2">Placement Drives</Typography>
          <Typography variant="body" color="muted">Manage recruitment drives and interviews.</Typography>
        </View>
      </View>

      <Button 
        title="Create New Drive" 
        onPress={() => router.push('/drives/new' as any)} 
        className="mb-6"
      />

      <FlatList
        data={DRIVE_MOCKS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted">No drives scheduled</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/drives/${item.id}` as any)}>
            <Card className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <Typography variant="h3" className="flex-1 mr-2">{item.title}</Typography>
                <View className="bg-primary/10 px-2 py-1 rounded-md">
                  <Typography variant="caption" color="primary" className="font-medium">{item.status}</Typography>
                </View>
              </View>
              <Typography variant="body" className="mb-2">{item.company}</Typography>
              <View className="flex-row justify-between">
                <Typography variant="caption" color="muted">Date: {item.date}</Typography>
                <Typography variant="caption" color="muted">Registered: {item.registeredCount}</Typography>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
