import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Student } from '../../types';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.users.current(),
    queryFn: async (): Promise<Student> => {
      try {
        const user = await apiClient.get<any, Student>('/users/me');
        if (user) {
          return user;
        }
      } catch (e) {
        // Silent fallback
      }
      
      // Fallback to local storage if backend call fails (e.g. no token)
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email) {
          return parsedUser as Student;
        }
      }
      
      // Fallback to mock user if backend is offline and no user in storage
      const { STUDENT_MOCKS } = await import('../../mocks');
      return { ...STUDENT_MOCKS[0], role: 'student', email: 'alex@example.com' } as unknown as Student;
    },
  });
};
