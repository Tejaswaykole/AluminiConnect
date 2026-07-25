import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { DRIVE_MOCKS } from '../../../mocks';

export default function PlacementDriveDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const isNew = id === 'new';
  const existingDrive = DRIVE_MOCKS.find(d => d.id === id);
  
  const [isEditing, setIsEditing] = useState(isNew);
  const [formData, setFormData] = useState({
    title: existingDrive?.title || '',
    company: existingDrive?.company || '',
    date: existingDrive?.date || '',
    status: existingDrive?.status || 'Upcoming',
    description: existingDrive?.description || '',
  });

  if (!isNew && !existingDrive) {
    return (
      <ScreenContainer>
        <Typography>Drive not found.</Typography>
      </ScreenContainer>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    if (isNew) {
      router.back();
    }
  };

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Typography variant="body" color="primary" className="font-medium">
            ← Back
          </Typography>
        </TouchableOpacity>
        {!isNew && !isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Typography variant="body" color="primary" className="font-medium">Edit</Typography>
          </TouchableOpacity>
        )}
      </View>

      <Typography variant="h1" className="mb-6">
        {isNew ? 'Create Drive' : existingDrive?.title}
      </Typography>

      {isEditing ? (
        <View className="space-y-4">
          <Input 
            label="Drive Title" 
            value={formData.title} 
            onChangeText={(t) => setFormData(prev => ({...prev, title: t}))} 
          />
          <Input 
            label="Company/Companies" 
            value={formData.company} 
            onChangeText={(t) => setFormData(prev => ({...prev, company: t}))} 
          />
          <Input 
            label="Date" 
            value={formData.date} 
            onChangeText={(t) => setFormData(prev => ({...prev, date: t}))} 
            placeholder="YYYY-MM-DD"
          />
          <Input 
            label="Description" 
            value={formData.description} 
            onChangeText={(t) => setFormData(prev => ({...prev, description: t}))} 
            multiline 
            numberOfLines={4}
          />
          <Button title="Save Drive" onPress={handleSave} className="mt-4" />
        </View>
      ) : (
        <View>
          <Card className="mb-6">
            <Typography variant="h3" className="mb-4">Details</Typography>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Company: </Typography>{formData.company}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Date: </Typography>{formData.date}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Status: </Typography>{formData.status}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Registered Students: </Typography>{existingDrive?.registeredCount}</Typography></View>
          </Card>
          
          <Card className="mb-6">
            <Typography variant="h3" className="mb-4">Description</Typography>
            <Typography variant="body">{formData.description}</Typography>
          </Card>

          <Button title="View Registered Students" variant="outline" className="mt-2" />
        </View>
      )}
    </ScreenContainer>
  );
}
