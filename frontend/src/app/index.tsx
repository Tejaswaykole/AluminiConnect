import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../components/Typography';
import { APP_CONFIG } from '../utils/constants';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate initial loading (e.g., auth check, asset loading)
    const timer = setTimeout(() => {
      // In this Phase 2 mock, we always redirect to the Welcome screen
      router.replace('/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="items-center">
        {/* Placeholder for actual logo */}
        <View className="w-20 h-20 bg-white rounded-lg items-center justify-center mb-6">
          <Typography variant="h2" color="primary" className="font-bold">
            AC
          </Typography>
        </View>
        <Typography variant="h2" color="inverse" className="mb-8 font-bold">
          {APP_CONFIG.name}
        </Typography>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
}
