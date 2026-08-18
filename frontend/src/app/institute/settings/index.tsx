import { View, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';

export default function InstituteSettings() {
  return (
    <ScreenContainer scrollable>
      <View className="mb-6 mt-2">
        <Typography variant="body" color="muted">Configuration</Typography>
        <Typography variant="h1">Institute Settings</Typography>
      </View>

      <Card className="p-6 mb-6 bg-surface border border-border">
        <Typography variant="h3" className="mb-4">College Profile</Typography>
        
        <View className="mb-4">
            <Typography variant="caption" className="font-medium mb-1">College Name</Typography>
            <TextInput 
                value="Tech University" 
                className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
                editable={false} 
            />
        </View>

        <View className="mb-4">
            <Typography variant="caption" className="font-medium mb-1">Website</Typography>
            <TextInput 
                value="https://techuniversity.edu" 
                className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
                editable={false} 
            />
        </View>

        <View className="mb-4">
            <Typography variant="caption" className="font-medium mb-1">Description</Typography>
            <TextInput 
                value="A premier institution for engineering and technology." 
                multiline
                numberOfLines={3}
                className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
                editable={false} 
            />
        </View>
      </Card>

      <Card className="p-6 mb-6 bg-surface border border-border">
        <Typography variant="h3" className="mb-4">Academic Structure</Typography>
        
        <View className="flex-row justify-between items-center border-b border-border py-3">
            <Typography variant="body" className="font-medium">Departments</Typography>
            <Typography variant="body" color="muted">12 Active</Typography>
        </View>
        <View className="flex-row justify-between items-center border-b border-border py-3">
            <Typography variant="body" className="font-medium">Branches</Typography>
            <Typography variant="body" color="muted">24 Active</Typography>
        </View>
        <View className="flex-row justify-between items-center py-3">
            <Typography variant="body" className="font-medium">Batches</Typography>
            <Typography variant="body" color="muted">2010 - 2028</Typography>
        </View>
      </Card>

    </ScreenContainer>
  );
}
