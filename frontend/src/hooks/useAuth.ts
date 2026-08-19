import { create } from 'zustand';
import { Platform } from 'react-native';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// Helper to get initial token
const getInitialToken = () => {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem('token');
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const useAuth = create<AuthState>((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (Platform.OS === 'web') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
    set({ token });
  },
  logout: () => {
    if (Platform.OS === 'web') localStorage.removeItem('token');
    set({ token: null });
  }
}));
