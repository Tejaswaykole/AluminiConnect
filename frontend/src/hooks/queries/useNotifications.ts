import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { Notification } from '../../types';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: queryKeys.notifications.list(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ success: boolean; data: Notification[] }>('/notifications/');
        return response.data;
      } catch (error) {
        const { NOTIFICATION_MOCKS } = await import('../../mocks');
        return NOTIFICATION_MOCKS;
      }
    },
  });
};
