import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/services/users';

export function useUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe
  });
}
