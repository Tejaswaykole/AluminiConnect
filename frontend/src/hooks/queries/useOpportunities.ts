import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Opportunity } from '../../types';

export const useOpportunities = () => {
  return useQuery<Opportunity[]>({
    queryKey: queryKeys.opportunities.list(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: Opportunity[] }>('/opportunities/');
        return response.data;
      } catch (error) {
        console.warn("Backend unavailable, using mock opportunities...");
        const { MOCK_OPPORTUNITIES } = await import('../../mocks');
        return MOCK_OPPORTUNITIES;
      }
    },
  });
};
