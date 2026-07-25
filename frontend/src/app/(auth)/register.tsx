import { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (!validate()) return;
    
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Role Selection
      router.push('/role-selection');
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center"
      >
        <View className="w-full max-w-md mx-auto py-8">
          <View className="mb-8">
            <Typography variant="h1" className="mb-2">Create Account</Typography>
            <Typography variant="body" color="muted">
              Join the Alumni Connect community today.
            </Typography>
          </View>

          <View className="space-y-4 mb-8">
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              value={formData.fullName}
              onChangeText={(text) => updateField('fullName', text)}
              error={errors.fullName}
            />
            
            <Input 
              label="Email Address" 
              placeholder="name@university.edu" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              error={errors.email}
            />
            
            <Input 
              label="Password" 
              placeholder="Create a password" 
              isPassword
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              error={errors.password}
            />

            <Input 
              label="Confirm Password" 
              placeholder="Confirm your password" 
              isPassword
              value={formData.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              error={errors.confirmPassword}
            />
          </View>

          <View className="space-y-4">
            <Button 
              title="Continue" 
              onPress={handleRegister} 
              isLoading={isLoading} 
              className="mb-4"
            />
          </View>

          <View className="flex-row justify-center mt-6">
            <Typography variant="body" color="muted">
              Already have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Typography variant="body" color="primary" className="font-semibold">
                Log In
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
