import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const SETTINGS_SECTIONS = [
    {
      title: "Account",
      items: [
        { label: "Personal Information", route: "/student/profile", type: "link" },
        { label: "Security & Password", route: "/settings/security", type: "link" },
        { label: "Connected Accounts", route: "/settings/connected", type: "link" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { label: "Push Notifications", type: "toggle", value: notifications, onToggle: setNotifications },
        { label: "Dark Mode", type: "toggle", value: darkMode, onToggle: setDarkMode },
        { label: "Language", type: "link", route: "/settings/language", rightText: "English (US)" },
      ]
    },
    {
      title: "Privacy",
      items: [
        { label: "Public Profile Visibility", type: "toggle", value: publicProfile, onToggle: setPublicProfile },
        { label: "Active Sessions", route: "/settings/sessions", type: "link" },
      ]
    }
  ];

  return (
    <ScreenContainer scrollable>
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <Typography variant="h1">Settings</Typography>
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
                    {item.rightText && <Typography variant="caption" color="muted" className="mr-2">{item.rightText}</Typography>}
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

      <View className="mb-8 px-2">
        <TouchableOpacity className="py-3 border-t border-border mt-4">
            <Typography variant="body" color="status-error" className="font-semibold text-center">Log Out</Typography>
        </TouchableOpacity>
      </View>

    </ScreenContainer>
  );
}
