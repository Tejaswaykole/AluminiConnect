import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Alumni } from '../../types';

export const useAlumni = () => {
  return useQuery<Alumni[]>({
    queryKey: queryKeys.users.alumni(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: any[] }>('/users/');
        return response.data.filter((u: any) => u.role === 'ALUMNI' || u.role === 'alumni') as unknown as Alumni[];
      } catch (error) {
        console.warn("Backend unavailable, using mock alumni...");
        const { MOCK_ALUMNI } = await import('../../mocks');
        return MOCK_ALUMNI;
      }
    },
  });
};
