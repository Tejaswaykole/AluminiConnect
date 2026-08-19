import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/services/events';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents
  });
}
