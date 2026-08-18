import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const API_URL = 'http://192.168.43.103:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const USE_MOCK_BACKEND = false; // Set to true to prevent browser CORS/Network errors when backend is offline

apiClient.interceptors.request.use(async (config) => {
  if (USE_MOCK_BACKEND) {
    throw new axios.Cancel("Backend mock mode active");
  }
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
