import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function PendingApprovalScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View className="flex-1 justify-center w-full max-w-md mx-auto py-8 text-center items-center">
        <Typography variant="h1" className="mb-4 text-center">Pending Approval</Typography>
        <Typography variant="body" color="muted" className="text-center mb-8">
          Your account is currently under review by an administrator. You will receive an email once your account has been verified and approved.
        </Typography>

        <Button 
          title="Return to Login" 
          onPress={() => router.replace('/login')} 
          className="w-full"
        />
      </View>
    </ScreenContainer>
  );
}
