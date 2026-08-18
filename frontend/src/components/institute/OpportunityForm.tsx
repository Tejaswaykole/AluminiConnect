import { View, TextInput, TouchableOpacity } from 'react-native';
import { Typography } from '../Typography';
import { Card } from '../Card';

interface OpportunityFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function OpportunityForm({ onSubmit, onCancel }: OpportunityFormProps) {
  return (
    <Card className="bg-surface border border-border p-6 mt-4">
      <Typography variant="h3" className="mb-4">Create New Opportunity</Typography>
      
      <View className="mb-4">
        <Typography variant="caption" className="font-medium mb-1">Opportunity Type</Typography>
        <View className="flex-row">
            <TouchableOpacity className="px-4 py-2 border border-primary bg-primary/10 rounded-md mr-2">
                <Typography variant="body" className="font-medium text-primary">Job</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 border border-border bg-background rounded-md mr-2">
                <Typography variant="body" className="font-medium text-muted">Internship</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 border border-border bg-background rounded-md">
                <Typography variant="body" className="font-medium text-muted">Referral</Typography>
            </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4">
        <Typography variant="caption" className="font-medium mb-1">Job Title</Typography>
        <TextInput 
          placeholder="e.g. Software Engineer"
          className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
        />
      </View>

      <View className="mb-4">
        <Typography variant="caption" className="font-medium mb-1">Company</Typography>
        <TextInput 
          placeholder="e.g. Tech Innovations Inc."
          className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
        />
      </View>

      <View className="mb-4">
        <Typography variant="caption" className="font-medium mb-1">Location</Typography>
        <TextInput 
          placeholder="e.g. Remote, New York, etc."
          className="bg-background border border-border rounded-md px-3 py-2 font-medium" 
        />
      </View>

      <View className="mb-6">
        <Typography variant="caption" className="font-medium mb-1">Description</Typography>
        <TextInput 
          placeholder="Job description and requirements..."
          multiline
          numberOfLines={4}
          className="bg-background border border-border rounded-md px-3 py-2 font-medium h-24" 
        />
      </View>

      <View className="flex-row justify-end space-x-2">
        <TouchableOpacity onPress={onCancel} className="px-4 py-2 bg-surface border border-border rounded-md mr-2">
            <Typography variant="body" className="font-medium">Cancel</Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSubmit({})} className="px-4 py-2 bg-primary rounded-md">
            <Typography variant="body" color="inverse" className="font-medium">Publish Opportunity</Typography>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
