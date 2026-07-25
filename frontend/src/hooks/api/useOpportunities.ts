import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

export const useOpportunities = (filters?: any) => {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => apiClient.get('/opportunities', { params: filters }),
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOpp: any) => apiClient.post('/opportunities', newOpp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};
