import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Alumni } from '../../types';

export const useAlumni = () => {
  return useQuery<Alumni[]>({
    queryKey: queryKeys.users.alumni(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/users/');
      return response.data.filter((u: any) => u.role === 'ALUMNI' || u.role === 'alumni') as unknown as Alumni[];
    },
  });
};
