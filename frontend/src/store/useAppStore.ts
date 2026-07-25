import { create } from 'zustand';

// Foundation for global app state (e.g. theme preference, general app UI flags)
interface AppState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));
