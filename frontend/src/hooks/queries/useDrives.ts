import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { DRIVE_MOCKS } from '../../mocks';
import { PlacementDrive } from '../../types';

export const useDrives = () => {
  return useQuery<PlacementDrive[]>({
    queryKey: queryKeys.placement.drives(),
    queryFn: () => Promise.resolve(DRIVE_MOCKS),
  });
};
