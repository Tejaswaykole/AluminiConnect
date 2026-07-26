import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Notification } from '../../types';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: queryKeys.notifications.list(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Notification[] }>('/notifications/');
      return response.data;
    },
  });
};
