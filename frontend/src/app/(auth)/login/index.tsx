import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { ScreenContainer } from '../../../components/ScreenContainer';

export default function LoginRoleSelectionScreen() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable={false} className="justify-center items-center">
      <View className="flex-1 w-full max-w-md justify-center py-12">
        <View className="items-center mb-12">
          {/* Logo Placeholder */}
          <View className="w-24 h-24 bg-primary rounded-2xl items-center justify-center mb-6">
            <Typography variant="h1" color="inverse" className="font-bold">
              AB
            </Typography>
          </View>
          
          <Typography variant="h1" align="center" className="mb-3">
            Welcome Back
          </Typography>
          <Typography variant="body" color="muted" align="center" className="max-w-[280px]">
            Sign In As
          </Typography>
        </View>

        <View className="w-full space-y-4">
          <Button 
            title="Student" 
            variant="outline"
            onPress={() => router.replace('/(student)')} 
            className="mb-3"
          />
          <Button 
            title="Alumni" 
            variant="outline"
            onPress={() => router.replace('/(alumni)')} 
            className="mb-3"
          />
          <Button 
            title="Institution Staff" 
            variant="outline"
            onPress={() => router.replace('/(institution)')} 
            className="mb-3"
          />
          <Button 
            title="Company Recruiter" 
            variant="outline"
            onPress={() => alert('Recruiter portal coming soon!')} 
            className="mb-6"
          />
        </View>
        
        <View className="w-full flex-row justify-center mt-6">
            <Typography variant="body" color="muted">
              Don't have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={() => router.push('/(public)/welcome')}>
              <Typography variant="body" color="primary" className="font-semibold">
                Sign Up
              </Typography>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
