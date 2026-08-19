import { View, Text } from 'react-native';

export default function PlaceholderScreen() {
  return (
    <View className="flex-1 bg-student-background items-center justify-center p-4">
      <Text className="text-[24px] font-bold text-student-on-surface mb-2">Coming Soon</Text>
      <Text className="text-[16px] text-student-on-surface-variant text-center">This feature is currently being migrated to the new backend.</Text>
    </View>
  );
}
