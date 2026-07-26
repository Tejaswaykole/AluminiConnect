import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { useState } from 'react';

export default function InstitutionSettingsScreen() {
  const router = useRouter();
  
  const [autoApproval, setAutoApproval] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const SETTINGS_SECTIONS = [
    {
      title: "Institution Profile & Branding",
      items: [
        { label: "Institution Details & Logo", route: "/settings/profile", type: "link" },
        { label: "Departments & Faculties", route: "/settings/departments", type: "link" },
        { label: "Academic Sessions", route: "/settings/sessions", type: "link" },
      ]
    },
    {
      title: "Platform Administration",
      items: [
        { label: "Role & Permission Matrix", route: "/settings/roles", type: "link" },
        { label: "Audit Logs", route: "/audit", type: "link" },
        { label: "Auto-Approve Verified Alumni", type: "toggle", value: autoApproval, onToggle: setAutoApproval },
      ]
    },
    {
      title: "System Configuration",
      items: [
        { label: "Storage & Integrations", route: "/settings/integrations", type: "link" },
        { label: "API Keys", route: "/settings/api-keys", type: "link" },
        { label: "System Maintenance Mode", type: "toggle", value: maintenanceMode, onToggle: setMaintenanceMode },
      ]
    }
  ];

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <Typography variant="h1">Institution Settings</Typography>
      </View>

      {SETTINGS_SECTIONS.map((section, idx) => (
        <View key={idx} className="mb-6">
          <Typography variant="h3" className="mb-3 px-2">{section.title}</Typography>
          <Card className="p-0 overflow-hidden bg-surface border border-border">
            {section.items.map((item, itemIdx) => (
              <View 
                key={itemIdx} 
                className={`flex-row justify-between items-center p-4 ${itemIdx !== section.items.length - 1 ? 'border-b border-border' : ''}`}
              >
                <Typography variant="body" className="font-medium">{item.label}</Typography>
                
                {item.type === 'link' && (
                  <TouchableOpacity onPress={() => item.route && router.push(item.route as any)} className="flex-row items-center">
                    <Typography className="text-muted text-lg">›</Typography>
                  </TouchableOpacity>
                )}

                {item.type === 'toggle' && (
                  <Switch 
                    value={item.value} 
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#e1dfdf', true: '#154539' }}
                    thumbColor={'#ffffff'}
                  />
                )}
              </View>
            ))}
          </Card>
        </View>
      ))}
    </ScreenContainer>
  );
}
