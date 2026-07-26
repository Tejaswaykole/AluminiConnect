import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Student } from '../../types';

export const useCurrentUser = () => {
  return useQuery<Student>({
    queryKey: queryKeys.users.current(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: Student }>('/users/me');
        if (response.data) {
          return response.data;
        }
      } catch (e) {
        console.warn("Backend unavailable, using local mock data...");
      }
      
      // Fallback to local storage if backend call fails (e.g. no token)
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email) {
          return parsedUser as Student;
        }
      }
      throw new Error("No user found");
    },
  });
};
