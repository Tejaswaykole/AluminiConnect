import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { EVENT_MOCKS } from '../../../mocks';

export default function EventsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Typography variant="body" color="primary" className="font-medium">
          ← Back to Dashboard
        </Typography>
      </TouchableOpacity>

      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Events</Typography>
        <Typography variant="body" color="muted">Upcoming workshops, seminars, and networking sessions.</Typography>
      </View>

      <FlatList
        data={EVENT_MOCKS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/events/${item.id}`)}>
            <Card className="mb-4 p-0 overflow-hidden">
              <Image source={{ uri: item.image }} className="w-full h-40" />
              <View className="p-4">
                <Typography variant="caption" color="primary" className="font-medium mb-1">
                  {item.date} • {item.time}
                </Typography>
                <Typography variant="h3" className="mb-2">{item.title}</Typography>
                <Typography variant="caption" color="muted">
                  Organized by {item.organizer}
                </Typography>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}
