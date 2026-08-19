import { useQuery } from '@tanstack/react-query';
import { getOpportunities } from '../api/services/opportunities';

export const useOpportunities = (filters?: { search?: string, company?: string, status?: string }) => {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => getOpportunities(filters),
  });
};
