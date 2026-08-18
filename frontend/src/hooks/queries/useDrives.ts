import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { apiClient } from '../../api/client';
import { PlacementDrive } from '../../types';

export const useDrives = () => {
  return useQuery<PlacementDrive[]>({
    queryKey: queryKeys.placement.drives(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: PlacementDrive[] }>('/drives/');
      return (response as any).data;
    },
  });
};
