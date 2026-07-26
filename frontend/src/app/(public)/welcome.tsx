import { View, TouchableOpacity, Image } from 'react-native';
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
        <View className="items-center mb-8 w-full">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop' }} 
            className="w-full h-48 rounded-3xl mb-8"
            resizeMode="cover"
          />
          <Typography variant="h1" align="center" className="mb-3">
            Welcome to Alumni Connect
          </Typography>
          <Typography variant="body" color="muted" align="center" className="max-w-[280px]">
            Continue as
          </Typography>
        </View>

        <View className="w-full space-y-4">
          <Button 
            title="Student" 
            variant="outline"
            onPress={() => router.push('/register-student')} 
            className="mb-3"
          />
          <Button 
            title="Alumni" 
            variant="outline"
            onPress={() => router.push('/register')} 
            className="mb-3"
          />
          <Button 
            title="Institution" 
            variant="outline"
            onPress={() => router.push('/register')} 
            className="mb-3"
          />

        </View>
        
        <View className="w-full flex-row justify-center mt-6">
            <Typography variant="body" color="muted">
              Already have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Typography variant="body" color="primary" className="font-semibold">
                Sign In
              </Typography>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
