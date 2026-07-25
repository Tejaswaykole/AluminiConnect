import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';
import { APP_CONFIG } from '../../utils/constants';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable={false} className="justify-center items-center">
      <View className="flex-1 w-full max-w-md justify-center py-12">
        <View className="items-center mb-12">
          {/* Logo Placeholder */}
          <View className="w-24 h-24 bg-primary rounded-2xl items-center justify-center mb-6">
            <Typography variant="h1" color="inverse" className="font-bold">
              AC
            </Typography>
          </View>
          
          <Typography variant="h1" align="center" className="mb-3">
            {APP_CONFIG.name}
          </Typography>
          <Typography variant="body" color="muted" align="center" className="max-w-[280px]">
            Connect, mentor, and grow with your academic community.
          </Typography>
        </View>

        <View className="w-full space-y-4">
          <Button 
            title="Login" 
            onPress={() => router.push('/login')} 
            className="mb-4"
          />
          <Button 
            title="Create Account" 
            variant="outline" 
            onPress={() => router.push('/register')} 
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
