import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { STUDENT_MOCKS } from '../../mocks';
import { Student } from '../../types';

export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: queryKeys.users.students(),
    // Temporary cast until API integration
    queryFn: () => Promise.resolve(STUDENT_MOCKS as unknown as Student[]),
  });
};
