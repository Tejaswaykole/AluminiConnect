import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Event } from '../../types';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: queryKeys.events.list(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: Event[] }>('/events/');
        return response.data;
      } catch (error) {
        const { EVENT_MOCKS } = await import('../../mocks');
        return EVENT_MOCKS;
      }
    },
  });
};
