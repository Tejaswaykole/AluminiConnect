import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { EVENT_MOCKS } from '../../../mocks';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event = EVENT_MOCKS.find(e => e.id === id);

  if (!event) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Event not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <Image source={{ uri: event.image }} className="w-full h-64" resizeMode="cover" />
      
      <View className="px-4 py-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Typography variant="body" color="primary" className="font-medium">
            ← Back to Events
          </Typography>
        </TouchableOpacity>

        <Typography variant="h1" className="mb-4">{event.title}</Typography>
        
        <Card className="mb-6 bg-secondary/5 border-secondary/20">
          <View className="mb-3">
            <Typography variant="caption" color="muted">Date & Time</Typography>
            <Typography variant="body" className="font-medium">{event.date} • {event.time}</Typography>
          </View>
          <View className="mb-3">
            <Typography variant="caption" color="muted">Venue</Typography>
            <Typography variant="body" className="font-medium">{event.venue}</Typography>
          </View>
          <View>
            <Typography variant="caption" color="muted">Organizer</Typography>
            <Typography variant="body" className="font-medium">{event.organizer}</Typography>
          </View>
        </Card>

        <View className="mb-8">
          <Button title="Register for Event" onPress={() => {}} />
        </View>

        <Typography variant="h3" className="mb-3">About the Event</Typography>
        <Typography variant="body" color="muted" className="leading-relaxed mb-8">
          {event.description}
        </Typography>
      </View>
    </ScrollView>
  );
}
