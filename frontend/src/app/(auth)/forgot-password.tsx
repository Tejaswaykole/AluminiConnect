import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, an email is sent. Here we offer a link to the reset-password mock screen.
    }, 1500);
  };

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center"
      >
        <View className="w-full max-w-md mx-auto py-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
            <Typography variant="body" color="primary" className="font-medium">
              ← Back to Login
            </Typography>
          </TouchableOpacity>

          <View className="mb-8">
            <Typography variant="h2" className="mb-2">Reset Password</Typography>
            <Typography variant="body" color="muted">
              Enter your email address and we'll send you instructions to reset your password.
            </Typography>
          </View>

          {isSuccess ? (
            <View className="space-y-6">
              <View className="p-4 bg-status-success/10 rounded-lg border border-status-success/20">
                <Typography variant="body" color="default" className="text-center font-medium">
                  If an account exists for {email}, a recovery link has been sent.
                </Typography>
              </View>
              {/* Mock button to jump to reset screen for flow testing */}
              <Button 
                title="[Mock] Open Reset Link" 
                variant="outline"
                onPress={() => router.push('/reset-password')} 
              />
            </View>
          ) : (
            <View className="space-y-6">
              <Input 
                label="Email Address" 
                placeholder="name@university.edu" 
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={error}
                className="mb-6"
              />

              <Button 
                title="Send Recovery Link" 
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
