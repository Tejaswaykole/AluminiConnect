import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function DeveloperPortal() {
  const router = useRouter();

  const roles = [
    {
      name: 'Student UI',
      description: 'Access the network, mentorship, and opportunities as a student.',
      icon: 'school',
      route: '/student',
      color: '#3525cd',
      bg: '#eff4ff',
    },
    {
      name: 'Alumni UI',
      description: 'Mentor students, post jobs, and manage your profile.',
      icon: 'business-center',
      route: '/alumni',
      color: '#3525cd',
      bg: '#dad7ff',
    },
    {
      name: 'Institute UI',
      description: 'Verify users, view network analytics, and manage drives.',
      icon: 'account-balance',
      route: '/institution',
      color: '#0b1c30',
      bg: '#f2f3f9',
    },
    {
      name: 'Admin UI',
      description: 'Manage platform settings, user roles, and system logs.',
      icon: 'admin-panel-settings',
      route: '/admin',
      color: '#5b598c',
      bg: '#f2f3f9',
    }
  ];

  return (
    <ScrollView 
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}
    >
      <View className="w-full max-w-2xl">
        <View className="items-center mb-10">
          <View className="bg-[#eff4ff] p-4 rounded-2xl mb-4">
             <MaterialIcons name="bug-report" size={40} color="#3525cd" />
          </View>
          <Text className="text-[32px] font-bold text-[#0b1c30] mb-2 text-center">Development Testing Portal</Text>
          <Text className="text-[16px] text-[#464555] text-center max-w-lg">
            Authentication is temporarily bypassed for testing. Select a role below to jump directly into its respective dashboard.
          </Text>
        </View>

        <View className="flex-col gap-4">
          {roles.map((role) => (
            <TouchableOpacity
              key={role.name}
              onPress={() => router.push(role.route as any)}
              className="flex-row items-center bg-white border border-[#e1e2e8] p-6 rounded-2xl hover:border-[#3525cd] transition-colors shadow-sm"
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mr-6"
                style={{ backgroundColor: role.bg }}
              >
                <MaterialIcons name={role.icon as any} size={28} color={role.color} />
              </View>
              
              <View className="flex-1">
                <Text className="text-[20px] font-bold text-[#0b1c30] mb-1">{role.name}</Text>
                <Text className="text-[14px] text-[#464555]">{role.description}</Text>
              </View>
              
              <MaterialIcons name="chevron-right" size={28} color="#777587" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
              onPress={() => router.push('/login')}
              className="mt-6 flex-row items-center justify-center bg-white border border-[#e1e2e8] p-4 rounded-xl hover:bg-[#f2f3f9] transition-colors"
          >
              <MaterialIcons name="login" size={20} color="#464555" />
              <Text className="text-[14px] font-semibold text-[#464555] ml-2">View Login Screen Flow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
