import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { CURRENT_USER } from '../../mocks';
import { Student } from '../../types';

export const useCurrentUser = () => {
  return useQuery<Student>({
    queryKey: queryKeys.users.current(),
    queryFn: () => Promise.resolve(CURRENT_USER as Student),
  });
};
