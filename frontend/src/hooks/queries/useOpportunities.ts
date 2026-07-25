import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { OPPORTUNITY_MOCKS } from '../../mocks';
import { Opportunity } from '../../types';

export const useOpportunities = () => {
  return useQuery<Opportunity[]>({
    queryKey: queryKeys.opportunities.list(),
    queryFn: () => Promise.resolve(OPPORTUNITY_MOCKS),
  });
};
