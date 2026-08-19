import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConnections, getPendingRequests, sendConnectionRequest, acceptConnectionRequest } from '../../api/services/connections';

export const useConnections = () => {
  return useQuery({
    queryKey: ['connections'],
    queryFn: getConnections,
  });
};

export const usePendingRequests = () => {
  return useQuery({
    queryKey: ['connections', 'requests'],
    queryFn: getPendingRequests,
  });
};

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => sendConnectionRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });
};

export const useAcceptConnectionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId: string) => acceptConnectionRequest(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });
};
