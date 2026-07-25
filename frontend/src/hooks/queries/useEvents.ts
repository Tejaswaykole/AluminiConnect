import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { EVENT_MOCKS } from '../../mocks';
import { Event } from '../../types';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: queryKeys.events.list(),
    queryFn: () => Promise.resolve(EVENT_MOCKS),
  });
};
