import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Avatar } from '../../../components/Avatar';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { ALUMNI_MOCKS } from '../../../mocks';

export default function MentorshipRequestScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const alumni = ALUMNI_MOCKS.find(a => a.id === id);

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!alumni) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Typography variant="h3" color="error">Alumni not found.</Typography>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </ScreenContainer>
    );
  }

  const handleRequest = () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Typography variant="body" color="primary" className="font-medium">
            ← Back to Profile
          </Typography>
        </TouchableOpacity>

        <View className="mb-8">
          <Typography variant="h1" className="mb-2">Request Mentorship</Typography>
          <Typography variant="body" color="muted">
            Send a request to connect with this mentor.
          </Typography>
        </View>

        <Card className="mb-8 bg-secondary/5 border-secondary/20 flex-row items-center">
          <Avatar url={alumni.avatar} fallbackInitials={alumni.name.charAt(0)} size="md" className="mr-4" />
          <View className="flex-1">
            <Typography variant="h3">{alumni.name}</Typography>
            <Typography variant="caption" color="muted">{alumni.position} at {alumni.company}</Typography>
          </View>
        </Card>

        {isSuccess ? (
          <View className="items-center py-8">
            <View className="w-16 h-16 bg-status-success/10 rounded-full items-center justify-center mb-4">
              <Typography className="text-3xl text-status-success">✓</Typography>
            </View>
            <Typography variant="h2" className="mb-2">Request Sent!</Typography>
            <Typography variant="body" color="muted" className="text-center mb-8">
              We'll notify you once {alumni.name} responds to your mentorship request.
            </Typography>
            <Button title="Return to Directory" onPress={() => router.replace('/discover')} />
          </View>
        ) : (
          <View>
            <Input
              label="Why do you want this person as your mentor?"
              placeholder="Introduce yourself and share what you hope to achieve..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              className="mb-6"
              textAlignVertical="top"
            />
            <Button 
              title="Send Request" 
              onPress={handleRequest} 
              isLoading={isSubmitting} 
              disabled={!message.trim()}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
