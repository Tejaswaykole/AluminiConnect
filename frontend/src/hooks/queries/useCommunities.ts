import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { COMMUNITY_MOCKS } from '../../mocks';
import { Community } from '../../types';

export const useCommunities = () => {
  return useQuery<Community[]>({
    queryKey: queryKeys.communities.list(),
    queryFn: () => Promise.resolve(COMMUNITY_MOCKS),
  });
};
