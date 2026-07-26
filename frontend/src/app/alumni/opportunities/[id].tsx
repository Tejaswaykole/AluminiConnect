import { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { OPPORTUNITY_MOCKS } from '../../../mocks';

export default function AlumniOpportunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const isNew = id === 'new';
  const existingOpp = OPPORTUNITY_MOCKS.find(o => o.id === id);
  
  const [isEditing, setIsEditing] = useState(isNew);
  const [formData, setFormData] = useState({
    title: existingOpp?.title || '',
    company: existingOpp?.company || '',
    location: existingOpp?.location || '',
    type: existingOpp?.type || '',
    deadline: existingOpp?.deadline || '',
    description: existingOpp?.description || '',
  });

  if (!isNew && !existingOpp) {
    return (
      <ScreenContainer>
        <Typography>Opportunity not found.</Typography>
      </ScreenContainer>
    );
  }

  const handleSave = () => {
    // Frontend only save
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
        {isNew ? 'Post Opportunity' : existingOpp?.title}
      </Typography>

      {isEditing ? (
        <View className="space-y-4">
          <Input 
            label="Job Title" 
            value={formData.title} 
            onChangeText={(t) => setFormData(prev => ({...prev, title: t}))} 
            placeholder="e.g. Software Engineer Intern"
          />
          <Input 
            label="Company" 
            value={formData.company} 
            onChangeText={(t) => setFormData(prev => ({...prev, company: t}))} 
            placeholder="e.g. Acme Corp"
          />
          <Input 
            label="Location" 
            value={formData.location} 
            onChangeText={(t) => setFormData(prev => ({...prev, location: t}))} 
            placeholder="e.g. Remote, or City, Country"
          />
          <Input 
            label="Job Type" 
            value={formData.type} 
            onChangeText={(t) => setFormData(prev => ({...prev, type: t}))} 
            placeholder="e.g. Full-time, Internship"
          />
          <Input 
            label="Application Deadline" 
            value={formData.deadline} 
            onChangeText={(t) => setFormData(prev => ({...prev, deadline: t}))} 
            placeholder="YYYY-MM-DD"
          />
          <Input 
            label="Description" 
            value={formData.description} 
            onChangeText={(t) => setFormData(prev => ({...prev, description: t}))} 
            multiline 
            numberOfLines={6}
            placeholder="Detailed job description..."
          />
          
          <Button title="Save Opportunity" onPress={handleSave} className="mt-4" />
        </View>
      ) : (
        <View>
          <Card className="mb-6">
            <Typography variant="h3" className="mb-4">Details</Typography>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Company: </Typography>{formData.company}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Location: </Typography>{formData.location}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Type: </Typography>{formData.type}</Typography></View>
            <View className="mb-2"><Typography variant="body"><Typography className="font-medium">Deadline: </Typography>{formData.deadline}</Typography></View>
          </Card>
          
          <Card>
            <Typography variant="h3" className="mb-4">Description</Typography>
            <Typography variant="body">{formData.description}</Typography>
          </Card>
        </View>
      )}
    </ScreenContainer>
  );
}
