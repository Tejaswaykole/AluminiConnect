import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

export default function SystemHealth() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Infrastructure</Typography>
          <Typography variant="h1">System Health</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-surface border border-border px-4 py-2 rounded-md">
          <MaterialIcons name="refresh" size={20} color="#1e293b" />
          <Typography variant="body" className="ml-2 font-medium">Refresh Status</Typography>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <MaterialIcons name="dns" size={24} color="#64748b" className="mr-3" />
                    <Typography variant="h3">Main Database</Typography>
                </View>
                <Badge variant="success" label="Operational" />
            </View>
            <View className="space-y-2">
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Load</Typography>
                    <Typography variant="caption" className="font-medium">45%</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Connections</Typography>
                    <Typography variant="caption" className="font-medium">1,240 / 5,000</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Last Backup</Typography>
                    <Typography variant="caption" className="font-medium">2 hours ago</Typography>
                </View>
            </View>
        </Card>

        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <MaterialIcons name="cloud" size={24} color="#64748b" className="mr-3" />
                    <Typography variant="h3">File Storage</Typography>
                </View>
                <Badge variant="success" label="Operational" />
            </View>
            <View className="space-y-2">
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Capacity Used</Typography>
                    <Typography variant="caption" className="font-medium">68% (3.4TB / 5TB)</Typography>
                </View>
                <View className="bg-background h-2 w-full rounded-full overflow-hidden mt-1 mb-2 border border-border">
                    <View className="bg-primary h-full" style={{ width: '68%' }} />
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Bandwidth (24h)</Typography>
                    <Typography variant="caption" className="font-medium">120 GB</Typography>
                </View>
            </View>
        </Card>

        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <MaterialIcons name="api" size={24} color="#64748b" className="mr-3" />
                    <Typography variant="h3">API Services</Typography>
                </View>
                <Badge variant="success" label="Operational" />
            </View>
            <View className="space-y-2">
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Uptime (30d)</Typography>
                    <Typography variant="caption" className="font-medium">99.99%</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Avg Response Time</Typography>
                    <Typography variant="caption" className="font-medium">124ms</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Error Rate</Typography>
                    <Typography variant="caption" className="font-medium">0.02%</Typography>
                </View>
            </View>
        </Card>

        <Card className="w-full md:w-[48%] bg-surface border border-border p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <MaterialIcons name="email" size={24} color="#64748b" className="mr-3" />
                    <Typography variant="h3">Email Delivery</Typography>
                </View>
                <Badge variant="warning" label="Degraded" />
            </View>
            <View className="space-y-2">
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Queue Status</Typography>
                    <Typography variant="caption" className="font-medium text-status-warning">450 pending</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Delivery Rate</Typography>
                    <Typography variant="caption" className="font-medium">92%</Typography>
                </View>
                <View className="flex-row justify-between">
                    <Typography variant="caption" color="muted">Provider Status</Typography>
                    <Typography variant="caption" className="font-medium">API Rate Limited</Typography>
                </View>
            </View>
        </Card>
      </View>
    </ScreenContainer>
  );
}
