import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { ALUMNI_MOCKS } from '../../mocks';
import { Alumni } from '../../types';

export const useAlumni = () => {
  return useQuery<Alumni[]>({
    queryKey: queryKeys.users.alumni(),
    queryFn: () => Promise.resolve(ALUMNI_MOCKS as unknown as Alumni[]),
  });
};
