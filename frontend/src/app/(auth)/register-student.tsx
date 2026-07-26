import { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function RegisterStudentScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    enrollmentNumber: '',
    academicYear: '',
    graduationYear: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.enrollmentNumber) newErrors.enrollmentNumber = 'Enrollment Number is required';
    if (!formData.academicYear) newErrors.academicYear = 'Academic Year is required';
    if (!formData.graduationYear) newErrors.graduationYear = 'Graduation Year is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.fullName.split(' ')[0] || formData.fullName,
          last_name: formData.fullName.split(' ').slice(1).join(' ') || 'User',
          email: formData.email,
          password: formData.password,
          // Passing a random UUID to satisfy the Pydantic validation for institution_id
          institution_id: '123e4567-e89b-12d3-a456-426614174000',
          enrollment_number: formData.enrollmentNumber,
          academic_year: formData.academicYear,
          graduation_year: parseInt(formData.graduationYear) || 2026,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      
      // Navigate to pending approval or login
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <Typography variant="h1" className="mb-2">Student Registration</Typography>
            <Typography variant="body" color="muted">
              Join your institution's alumni network.
            </Typography>
          </View>

          <View className="space-y-4 mb-8">
            <Typography variant="h3" className="mb-2 mt-4">Personal Details</Typography>
            <Input label="Full Name" placeholder="John Doe" value={formData.fullName} onChangeText={(t) => updateField('fullName', t)} error={errors.fullName} />
            <Input label="College Email" placeholder="name@university.edu" keyboardType="email-address" autoCapitalize="none" value={formData.email} onChangeText={(t) => updateField('email', t)} error={errors.email} />
            <Input label="Password" placeholder="Create a password" isPassword value={formData.password} onChangeText={(t) => updateField('password', t)} error={errors.password} />
            <Input label="Confirm Password" placeholder="Confirm your password" isPassword value={formData.confirmPassword} onChangeText={(t) => updateField('confirmPassword', t)} error={errors.confirmPassword} />
            
            <Typography variant="h3" className="mb-2 mt-6">Academic Details</Typography>
            <Input label="Enrollment Number" placeholder="e.g. 12345678" value={formData.enrollmentNumber} onChangeText={(t) => updateField('enrollmentNumber', t)} error={errors.enrollmentNumber} />
            <Input label="Academic Year" placeholder="e.g. 3rd Year" value={formData.academicYear} onChangeText={(t) => updateField('academicYear', t)} error={errors.academicYear} />
            <Input label="Graduation Year" placeholder="e.g. 2026" keyboardType="numeric" value={formData.graduationYear} onChangeText={(t) => updateField('graduationYear', t)} error={errors.graduationYear} />
          </View>

          <View className="space-y-4">
            <Button title="Register as Student" onPress={handleRegister} isLoading={isLoading} className="mb-4" />
          </View>

          <View className="flex-row justify-center mt-6 mb-8">
            <Typography variant="body" color="muted">Already have an account? </Typography>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Typography variant="body" color="primary" className="font-semibold">Log In</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
