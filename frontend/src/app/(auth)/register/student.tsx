import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { registerStudent } from '../../../api/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function StudentRegistrationScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    department: '',
    enrollment_year: new Date().getFullYear(),
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.full_name) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await registerStudent({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        department: formData.department,
        enrollment_year: formData.enrollment_year,
      });
      
      if (response && response.access_token) {
        setToken(response.access_token);
        router.replace('/student');
      } else {
        setError('Registration succeeded, but failed to log in automatically.');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-student-surface items-center justify-center p-4 md:p-8"
    >
      <ScrollView className="w-full" contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
        <View className="w-full max-w-[500px] bg-student-surface-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-student-border-subtle p-8 md:p-10 my-8">
          
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-student-primary-container rounded-2xl items-center justify-center mb-4">
               <MaterialIcons name="person-add" size={32} color="#ffffff" />
            </View>
            <Text className="text-[28px] font-bold text-student-on-surface mb-2 tracking-tight">Join as Student</Text>
            <Text className="text-[16px] text-student-on-surface-variant text-center">Create your AlumniConnect student account to start networking.</Text>
          </View>

          {error && (
            <View className="bg-student-error-container p-4 rounded-xl mb-6 flex-row items-center gap-3">
              <MaterialIcons name="error-outline" size={20} color="#ba1a1a" />
              <Text className="text-[14px] text-student-error flex-1">{error}</Text>
            </View>
          )}

          <View className="space-y-4 flex-col">
            <View>
              <Text className="text-[14px] font-medium text-student-on-surface mb-2">Full Name *</Text>
              <TextInput
                value={formData.full_name}
                onChangeText={(t) => setFormData(p => ({...p, full_name: t}))}
                placeholder="John Doe"
                placeholderTextColor="#777587"
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>
            
            <View className="mt-4">
              <Text className="text-[14px] font-medium text-student-on-surface mb-2">University Email *</Text>
              <TextInput
                value={formData.email}
                onChangeText={(t) => setFormData(p => ({...p, email: t}))}
                placeholder="student@university.edu"
                placeholderTextColor="#777587"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>
            
            <View className="flex-row gap-4 mt-4">
              <View className="flex-1">
                <Text className="text-[14px] font-medium text-student-on-surface mb-2">Department</Text>
                <TextInput
                  value={formData.department}
                  onChangeText={(t) => setFormData(p => ({...p, department: t}))}
                  placeholder="Computer Science"
                  placeholderTextColor="#777587"
                  className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
                />
              </View>
              <View className="w-[120px]">
                <Text className="text-[14px] font-medium text-student-on-surface mb-2">Class Of</Text>
                <TextInput
                  value={formData.enrollment_year.toString()}
                  onChangeText={(t) => setFormData(p => ({...p, enrollment_year: parseInt(t) || new Date().getFullYear()}))}
                  keyboardType="numeric"
                  className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-[14px] font-medium text-student-on-surface mb-2">Password *</Text>
              <TextInput
                value={formData.password}
                onChangeText={(t) => setFormData(p => ({...p, password: t}))}
                placeholder="••••••••"
                placeholderTextColor="#777587"
                secureTextEntry
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>
            
            <View className="mt-4">
              <Text className="text-[14px] font-medium text-student-on-surface mb-2">Confirm Password *</Text>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(t) => setFormData(p => ({...p, confirmPassword: t}))}
                placeholder="••••••••"
                placeholderTextColor="#777587"
                secureTextEntry
                className="w-full bg-student-surface-container-low border border-student-border-subtle rounded-xl py-3 px-4 text-[16px] text-student-on-surface focus:border-student-primary focus:bg-student-surface-card transition-colors"
              />
            </View>

            <TouchableOpacity 
              onPress={handleRegister}
              disabled={loading}
              className={`w-full rounded-xl py-3.5 flex-row items-center justify-center mt-8 ${loading ? 'bg-student-primary/70' : 'bg-student-primary hover:bg-[#2c1ea3]'}`}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text className="text-white text-[16px] font-semibold">Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-8 pt-6 border-t border-student-border-subtle items-center">
            <Text className="text-[14px] text-student-on-surface-variant mb-4">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')} className="bg-student-surface-container-low px-6 py-2 rounded-lg border border-student-border-subtle hover:bg-student-surface-container-highest">
              <Text className="text-[14px] font-medium text-student-on-surface">Sign In instead</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
