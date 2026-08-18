import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function InstituteAnalytics() {
  return (
    <ScrollView 
      className="flex-1 bg-institute-background"
      contentContainerStyle={{ 
        paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
        paddingTop: 32,
        paddingBottom: 96,
        maxWidth: 1280,
        alignSelf: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center justify-between mb-8">
        <View>
          <Text className="text-[32px] md:text-[48px] font-bold text-institute-on-surface tracking-tight mb-2">Analytics & Reports</Text>
          <Text className="text-[18px] text-institute-on-surface-variant">Deep dive into platform engagement and alumni distribution.</Text>
        </View>
        <TouchableOpacity className="bg-institute-surface border border-institute-outline-variant px-4 py-2 rounded-lg flex-row items-center gap-2 shadow-sm hover:bg-institute-surface-container-high transition-colors hidden md:flex">
          <MaterialIcons name="download" size={20} color="#0b1c30" />
          <Text className="text-[14px] font-medium text-institute-on-surface">Export CSV</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-institute-surface rounded-xl border border-institute-outline-variant p-6 md:p-8 shadow-sm flex-col items-center justify-center min-h-[400px]">
        <MaterialIcons name="insert-chart-outlined" size={64} color="#c7c4d8" className="mb-4" />
        <Text className="text-[20px] font-semibold text-institute-on-surface mb-2">Interactive Charts</Text>
        <Text className="text-[16px] text-institute-on-surface-variant text-center max-w-md">
          This section contains data visualization components displaying Alumni geographic distribution, employment sectors, and yearly engagement trends.
        </Text>
      </View>
    </ScrollView>
  );
}
