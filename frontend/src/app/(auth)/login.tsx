import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { devLogin } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoleLogin = async (role: 'student' | 'alumni' | 'institute' | 'admin') => {
    setLoadingRole(role);
    setError(null);
    
    try {
      const response = await devLogin(role);
      
      if (response && (response.access_token || response.token)) {
        setToken(response.access_token || response.token);
        
        // Route based on role
        if (role === 'student') router.replace('/student');
        else if (role === 'alumni') router.replace('/alumni');
        else if (role === 'admin') router.replace('/admin');
        else if (role === 'institute') router.replace('/institution');
        else router.replace('/student');
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check backend server.');
    } finally {
      setLoadingRole(null);
    }
  };

  const RoleButton = ({ role, title, icon, color, description }: any) => (
    <TouchableOpacity 
      onPress={() => handleRoleLogin(role)}
      disabled={loadingRole !== null}
      className={`w-full bg-student-surface-container-low rounded-xl p-6 border border-student-outline-variant shadow-sm hover:shadow-md transition-all flex-row items-center gap-4 group mb-4 ${loadingRole === role ? 'opacity-70' : ''}`}
    >
      <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-[18px] font-semibold text-student-on-surface">{title}</Text>
        <Text className="text-[14px] text-student-on-surface-variant mt-1">{description}</Text>
      </View>
      {loadingRole === role ? (
        <ActivityIndicator color={color} size="small" />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color={color} />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-student-background items-center justify-center p-4 md:p-8">
      <View className="w-full max-w-[500px] bg-student-surface rounded-2xl shadow-sm border border-student-outline-variant p-8 md:p-10">
        
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-[#3525cd] rounded-2xl items-center justify-center mb-4 transform rotate-3">
             <MaterialIcons name="code" size={32} color="#ffffff" />
          </View>
          <Text className="text-[28px] font-bold text-student-on-surface mb-2 tracking-tight">Developer Login</Text>
          <Text className="text-[16px] text-student-on-surface-variant text-center">Select a role below to instantly log in and test the application flows.</Text>
        </View>

        {error && (
          <View className="bg-student-error-container p-4 rounded-xl mb-6 flex-row items-center gap-3">
            <MaterialIcons name="error-outline" size={20} color="#ba1a1a" />
            <Text className="text-[14px] text-[#ba1a1a] flex-1">{error}</Text>
          </View>
        )}

        <View className="space-y-4">
          <RoleButton 
            role="student" 
            title="Student" 
            description="View jobs, connect with mentors, RSVP to events"
            icon="school" 
            color="#3525cd" 
          />
          <RoleButton 
            role="alumni" 
            title="Alumni" 
            description="Post jobs, mentor students, network"
            icon="workspace-premium" 
            color="#006c4b" 
          />
          <RoleButton 
            role="institute" 
            title="Institution" 
            description="Manage users, view analytics, broadcast"
            icon="account-balance" 
            color="#7a5200" 
          />
          <RoleButton 
            role="admin" 
            title="System Admin" 
            description="Global settings, moderation, system health"
            icon="admin-panel-settings" 
            color="#ba1a1a" 
          />
        </View>
      </View>
    </View>
  );
}
