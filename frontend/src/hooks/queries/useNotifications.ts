import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { NOTIFICATION_MOCKS } from '../../mocks';
import { Notification } from '../../types';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: queryKeys.notifications.list(),
    queryFn: () => Promise.resolve(NOTIFICATION_MOCKS),
  });
};
