import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function ResetPasswordScreen() {
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = () => {
    let isValid = true;
    const newErrors = { password: '', confirmPassword: '' };

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) return;

    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center"
      >
        <View className="w-full max-w-md mx-auto py-8">
          <View className="mb-8">
            <Typography variant="h2" className="mb-2">Create New Password</Typography>
            <Typography variant="body" color="muted">
              Please enter your new password below.
            </Typography>
          </View>

          {isSuccess ? (
            <View className="space-y-6">
              <View className="p-4 bg-status-success/10 rounded-lg border border-status-success/20">
                <Typography variant="body" color="default" className="text-center font-medium">
                  Your password has been successfully reset.
                </Typography>
              </View>
              <Button 
                title="Go to Login" 
                onPress={() => router.replace('/login')} 
              />
            </View>
          ) : (
            <View className="space-y-6">
              <Input 
                label="New Password" 
                placeholder="Enter new password" 
                isPassword
                value={password}
                onChangeText={setPassword}
                error={errors.password}
              />
              
              <Input 
                label="Confirm New Password" 
                placeholder="Confirm new password" 
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={errors.confirmPassword}
                className="mb-6"
              />

              <Button 
                title="Save Password" 
                onPress={handleReset} 
                isLoading={isLoading} 
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
