import { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function LoginScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (!validate()) return;
    
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to a placeholder authenticated route
      router.replace('/(student)');
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
            <Typography variant="h1" className="mb-2">Welcome Back</Typography>
            <Typography variant="body" color="muted">
              Enter your credentials to access your account.
            </Typography>
          </View>

          <View className="space-y-4 mb-6">
            <Input 
              label="Email Address" 
              placeholder="name@university.edu" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            
            <View>
              <Input 
                label="Password" 
                placeholder="Enter your password" 
                isPassword
                value={password}
                onChangeText={setPassword}
                error={errors.password}
              />
              <TouchableOpacity 
                className="mt-2 self-end"
                onPress={() => router.push('/forgot-password')}
              >
                <Typography variant="caption" color="primary" className="font-medium">
                  Forgot Password?
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          <View className="space-y-4">
            <Button 
              title="Log In" 
              onPress={handleLogin} 
              isLoading={isLoading} 
              className="mb-4"
            />
            
            <Button 
              title="Continue as Guest" 
              variant="outline" 
              onPress={() => router.replace('/(public)')} 
              className="mb-6"
            />
          </View>

          <View className="flex-row justify-center mt-6">
            <Typography variant="body" color="muted">
              Don't have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={() => router.replace('/register')}>
              <Typography variant="body" color="primary" className="font-semibold">
                Sign Up
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
