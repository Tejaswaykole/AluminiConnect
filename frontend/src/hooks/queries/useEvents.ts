import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Event } from '../../types';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: queryKeys.events.list(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Event[] }>('/events/');
      return (response as any).data;
    },
  });
};
