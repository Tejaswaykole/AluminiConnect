import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Community } from '../../types';

export const useCommunities = () => {
  return useQuery<Community[]>({
    queryKey: queryKeys.communities.list(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Community[] }>('/communities/');
      return (response as any).data;
    },
  });
};
