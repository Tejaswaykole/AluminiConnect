import React from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { CURRENT_USER } from '../../../mocks';

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleRoleSelection = (role: string) => {
    // Store mock user profile in local storage for useCurrentUser hook
    localStorage.setItem('currentUser', JSON.stringify({
        id: CURRENT_USER.id,
        name: CURRENT_USER.name,
        email: CURRENT_USER.email,
        role: role.toLowerCase(),
        avatar: CURRENT_USER.avatar,
        college: CURRENT_USER.college,
        department: CURRENT_USER.department,
        graduationYear: CURRENT_USER.graduationYear,
        bio: CURRENT_USER.bio,
        skills: CURRENT_USER.skills,
        interests: CURRENT_USER.interests
    }));

    if (role === 'STUDENT') {
      router.push('/student');
    } else if (role === 'ALUMNI') {
      router.push('/alumni');
    } else if (role === 'INSTITUTION') {
      router.push('/institution');
    } else if (role === 'COMPANY') {
      router.push('/company');
    }
  };

  return (
    <View className="flex-1 flex-row bg-background w-full h-full">
      {/* Left side: Login Form */}
      <View className="flex-1">
        <ScreenContainer scrollable={false} className="justify-center items-center">
          <View className="flex-1 w-full max-w-md justify-center py-12 px-6">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-6">
                <Typography variant="h2" color="inverse" className="font-bold">
                  AC
                </Typography>
              </View>
              
              <Typography variant="h1" align="center" className="mb-2">
                Welcome Back
              </Typography>
              <Typography variant="body" color="muted" align="center">
                Sign in to your account
              </Typography>
            </View>

            <View className="w-full space-y-4">
              <Button 
                title="Login as Student" 
                onPress={() => handleRoleSelection('STUDENT')} 
                className="mb-3 bg-blue-600"
              />
              <Button 
                title="Login as Alumni" 
                onPress={() => handleRoleSelection('ALUMNI')} 
                className="mb-3 bg-purple-600"
              />
              <Button 
                title="Login as Institution" 
                onPress={() => handleRoleSelection('INSTITUTION')} 
                className="mb-3 bg-green-600"
              />

            </View>
            
            <View className="w-full flex-row justify-center mt-8">
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
      </View>

      {/* Right side: Cover Image (visible on larger screens) */}
      {isLargeScreen && (
        <View className="flex-1 relative bg-primary/5 border-l border-border/20">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop' }} 
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}
