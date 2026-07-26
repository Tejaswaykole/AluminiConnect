import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { CURRENT_USER } from '../../mocks';
import { Student } from '../../types';

export const useCurrentUser = () => {
  return useQuery<Student>({
    queryKey: queryKeys.users.current(),
    queryFn: () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Only return it if it looks like a valid user object
          if (parsedUser && parsedUser.id && parsedUser.email) {
            return Promise.resolve(parsedUser as Student);
          }
        }
      } catch (e) {
        console.error("Failed to parse currentUser from localStorage", e);
      }
      
      // Fallback to mock data if not logged in or invalid
      return Promise.resolve(CURRENT_USER as Student);
    },
  });
};
