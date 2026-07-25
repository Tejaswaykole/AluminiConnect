import os

frontend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\frontend"
os.makedirs(os.path.join(frontend_dir, "src", "api"), exist_ok=True)
os.makedirs(os.path.join(frontend_dir, "src", "providers"), exist_ok=True)
os.makedirs(os.path.join(frontend_dir, "src", "hooks", "api"), exist_ok=True)

# 1. API Client
client_ts = """import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  // Logic to inject token from secure storage
  // const token = await SecureStore.getItemAsync('userToken');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Logic to trigger logout or token refresh
    }
    return Promise.reject(error);
  }
);
"""
with open(os.path.join(frontend_dir, "src", "api", "client.ts"), "w", encoding="utf-8") as f: f.write(client_ts)

# 2. Query Provider
provider_tsx = """import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const AppQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
"""
with open(os.path.join(frontend_dir, "src", "providers", "QueryProvider.tsx"), "w", encoding="utf-8") as f: f.write(provider_tsx)

# 3. Custom Hooks (e.g., useOpportunities)
hooks_ts = """import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

export const useOpportunities = (filters?: any) => {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => apiClient.get('/opportunities', { params: filters }),
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOpp: any) => apiClient.post('/opportunities', newOpp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};
"""
with open(os.path.join(frontend_dir, "src", "hooks", "api", "useOpportunities.ts"), "w", encoding="utf-8") as f: f.write(hooks_ts)

print("Phase 11 Frontend API hooks scaffold created.")
