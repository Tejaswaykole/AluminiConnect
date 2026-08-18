import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Student } from '../../types';

export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: queryKeys.users.students(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/users/');
      return (response as any).data.filter((u: any) => u.role === 'STUDENT' || u.role === 'student') as unknown as Student[];
    },
  });
};
