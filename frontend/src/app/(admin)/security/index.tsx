import { View, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_ALERTS = [
  { id: 1, type: 'Failed Login', description: 'Multiple failed login attempts from IP 192.168.1.50', target: 'admin@system.com', date: 'Oct 15, 2026 14:30', severity: 'Critical' },
  { id: 2, type: 'Suspicious Activity', description: 'Mass data export attempt detected', target: 'Student Directory', date: 'Oct 14, 2026 09:15', severity: 'High' },
  { id: 3, type: 'New Device', description: 'Login from unrecognized device', target: 'alice@alumni.com', date: 'Oct 14, 2026 03:00', severity: 'Medium' },
];

export default function SecurityMonitoring() {
  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Platform Protection</Typography>
          <Typography variant="h1">Security Alerts</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-surface border border-border px-4 py-2 rounded-md">
          <MaterialIcons name="security-update-good" size={20} color="#1e293b" />
          <Typography variant="body" className="ml-2 font-medium">Run Security Scan</Typography>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] md:w-[23%] bg-status-error/10 border border-status-error/20 p-4 mb-4">
          <Typography variant="caption" className="text-status-error font-bold mb-1">Critical Alerts</Typography>
          <Typography variant="h2" className="text-status-error mb-1">2</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Failed Logins (24h)</Typography>
          <Typography variant="h2" className="text-primary mb-1">45</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">Active Blocks</Typography>
          <Typography variant="h2" className="text-primary mb-1">12</Typography>
        </Card>
        <Card className="w-[48%] md:w-[23%] bg-surface border border-border p-4 mb-4">
          <Typography variant="caption" color="muted" className="mb-1">System Firewall</Typography>
          <Typography variant="h2" className="text-status-success mb-1">Active</Typography>
        </Card>
      </View>

      <Typography variant="h3" className="mb-4">Recent Security Events</Typography>
      <View className="w-full">
        {MOCK_ALERTS.map(alert => (
          <Card key={alert.id} className="mb-3 p-4 bg-surface border border-border flex-col md:flex-row justify-between md:items-center">
            <View className="flex-row items-start md:items-center mb-3 md:mb-0 flex-1">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${alert.severity === 'Critical' ? 'bg-status-error/10' : alert.severity === 'High' ? 'bg-status-warning/10' : 'bg-primary/10'}`}>
                    <MaterialIcons name={alert.severity === 'Critical' ? 'gavel' : 'warning'} size={20} color={alert.severity === 'Critical' ? '#ef4444' : alert.severity === 'High' ? '#f59e0b' : '#2563eb'} />
                </View>
                <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-1">
                        <Typography variant="h3" className="mr-2">{alert.type}</Typography>
                        <Badge variant={alert.severity === 'Critical' ? 'error' : alert.severity === 'High' ? 'warning' : 'outline'} label={alert.severity} />
                    </View>
                    <Typography variant="body" className="font-medium mb-1">{alert.description}</Typography>
                    <Typography variant="caption" color="muted">Target: {alert.target}</Typography>
                </View>
            </View>
            <View className="flex-row items-center justify-between md:flex-col md:items-end border-t border-border pt-3 md:border-t-0 md:pt-0">
                <Typography variant="caption" color="muted" className="mb-2">{alert.date}</Typography>
                <TouchableOpacity className="px-4 py-1.5 bg-surface border border-border rounded-md">
                    <Typography variant="caption" className="font-medium">Investigate</Typography>
                </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
