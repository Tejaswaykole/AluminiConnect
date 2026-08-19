import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '../api/client';
import '../../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="admin" />
          <Stack.Screen name="student" />
          <Stack.Screen name="alumni" />
          <Stack.Screen name="institute" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
