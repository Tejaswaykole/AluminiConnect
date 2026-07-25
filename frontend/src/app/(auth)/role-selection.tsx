import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';

type Role = 'student' | 'alumni' | 'placement';

const ROLES = [
  { id: 'student', title: 'Student', description: 'Currently enrolled at the university.' },
  { id: 'alumni', title: 'Alumni', description: 'Graduated from the university.' },
  { id: 'placement', title: 'Placement Cell', description: 'University placement coordinator.' },
] as const;

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    // Simulate finalizing registration
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to respective dashboard
      router.replace(`/(${selectedRole})` as any);
    }, 1000);
  };

  return (
    <ScreenContainer scrollable>
      <View className="flex-1 justify-center w-full max-w-md mx-auto py-8">
        <View className="mb-8">
          <Typography variant="h2" className="mb-2">Select Your Role</Typography>
          <Typography variant="body" color="muted">
            How will you be using the platform? You cannot change this later.
          </Typography>
        </View>

        <View className="space-y-4 mb-8">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <TouchableOpacity 
                key={role.id} 
                onPress={() => setSelectedRole(role.id)}
                activeOpacity={0.8}
                className="mb-4"
              >
                <Card className={`border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <Typography variant="h3" color={isSelected ? 'primary' : 'default'} className="mb-1">
                    {role.title}
                  </Typography>
                  <Typography variant="caption" color="muted">
                    {role.description}
                  </Typography>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button 
          title="Complete Registration" 
          onPress={handleComplete} 
          isLoading={isLoading} 
          disabled={!selectedRole}
        />
      </View>
    </ScreenContainer>
  );
}
