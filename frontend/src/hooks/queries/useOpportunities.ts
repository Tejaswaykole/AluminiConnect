import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Opportunity } from '../../types';

export const useOpportunities = () => {
  return useQuery<Opportunity[]>({
    queryKey: queryKeys.opportunities.list(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Opportunity[] }>('/opportunities/');
      return response.data;
    },
  });
};
