import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { login } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await login(email, password);
      
      if (response && response.access_token) {
        setToken(response.access_token);
        
        // Route based on role
        const role = response.user?.role?.toLowerCase();
        if (role === 'student') router.replace('/student');
        else if (role === 'alumni') router.replace('/alumni');
        else if (role === 'admin') router.replace('/admin');
        else if (role === 'institute') router.replace('/institution');
        else router.replace('/student');
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-student-surface items-center justify-center p-4 md:p-8"
    >
      <View className="w-full max-w-[440px] bg-student-surface-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-student-border-subtle p-8 md:p-10">
        
        {/* Logo/Brand */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-student-primary-container rounded-2xl items-center justify-center mb-4 transform rotate-3">
             <MaterialIcons name="school" size={32} color="#ffffff" />
          </View>
          <Text className="text-[28px] font-bold text-student-on-surface mb-2 tracking-tight">Welcome back</Text>
          <Text className="text-[16px] text-student-on-surface-variant text-center">Enter your details to access your AlumniConnect account.</Text>
        </View>

        {error && (
          <View className="bg-student-error-container p-4 rounded-xl mb-6 flex-row items-center gap-3">
            <MaterialIcons name="error-outline" size={20} color="#ba1a1a" />
            <Text className="text-[14px] text-student-error flex-1">{error}</Text>
          </View>
        )}

        <View className="space-y-5 flex-col">
          {/* Email Input */}
          <View>
            <Text className="text-[14px] font-medium text-student-on-surface mb-2">Email Address</Text>
            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <MaterialIcons name="mail-outline" size={20} color="#777587" />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@university.edu"
                placeholderTextColor="#777587"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[14px] font-medium text-student-on-surface">Password</Text>
              <TouchableOpacity>
                <Text className="text-[14px] font-medium text-student-primary hover:text-student-on-primary-fixed-variant">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <MaterialIcons name="lock-outline" size={20} color="#777587" />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#777587"
                secureTextEntry
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 pl-12 pr-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            className={`w-full rounded-xl py-3.5 flex-row items-center justify-center mt-8 ${loading ? 'bg-student-primary/70' : 'bg-student-primary hover:bg-[#2c1ea3]'}`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white text-[16px] font-semibold">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Registration Links */}
        <View className="mt-8 pt-6 border-t border-student-border-subtle items-center">
          <Text className="text-[14px] text-student-on-surface-variant mb-4">Don't have an account?</Text>
          <View className="flex-row flex-wrap justify-center gap-3">
            <TouchableOpacity onPress={() => router.push('/register/student')} className="bg-student-surface-container-low px-4 py-2 rounded-lg border border-student-border-subtle hover:bg-student-surface-container-highest">
              <Text className="text-[14px] font-medium text-student-on-surface">Join as Student</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/register/alumni')} className="bg-student-surface-container-low px-4 py-2 rounded-lg border border-student-border-subtle hover:bg-student-surface-container-highest">
              <Text className="text-[14px] font-medium text-student-on-surface">Join as Alumni</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
