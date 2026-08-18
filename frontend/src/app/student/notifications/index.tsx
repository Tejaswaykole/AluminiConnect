import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { ListItem } from '../../../components/ListItem';
import { NOTIFICATION_MOCKS } from '../../../mocks';

export default function NotificationsScreen() {
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'mentorship': return 'handshake';
      case 'event': return 'event';
      default: return 'notifications';
    }
  };

  return (
    <ScreenContainer>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <View className="flex-row items-center"><MaterialIcons name="arrow-back" size={20} color="#154539" /><Typography variant="body" color="primary" className="font-medium ml-1">Back to Dashboard</Typography></View>
      </TouchableOpacity>

      <View className="mb-6">
        <Typography variant="h1" className="mb-2">Notifications</Typography>
        <Typography variant="body" color="muted">Stay updated on your activities.</Typography>
      </View>

      <FlatList
        data={NOTIFICATION_MOCKS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Typography variant="h3" color="muted">No notifications</Typography>
          </View>
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.message}
            subtitle={item.time}
            className={!item.read ? 'bg-primary/5 border-primary/20' : ''}
            leftElement={
              <View className="w-10 h-10 bg-background rounded-full items-center justify-center border border-border">
                <Typography className="text-lg">{getIcon(item.type)}</Typography>
              </View>
            }
            rightElement={
              !item.read && <View className="w-2.5 h-2.5 bg-primary rounded-full" />
            }
          />
        )}
      />
    </ScreenContainer>
  );
}
