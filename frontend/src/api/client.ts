import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'web' 
  ? 'http://127.0.0.1:8000/api/v1' 
  : 'http://192.168.43.103:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const USE_MOCK_BACKEND = false;

apiClient.interceptors.request.use(async (config) => {
  if (USE_MOCK_BACKEND) {
    throw new axios.Cancel("Backend mock mode active");
  }
  
  if (Platform.OS === 'web') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Mobile logic placeholder
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (Platform.OS === 'web') {
         localStorage.removeItem('token');
      }
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
