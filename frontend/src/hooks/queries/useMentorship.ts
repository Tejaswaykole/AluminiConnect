import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMentors, requestMentorship } from '../../api/services/mentorship';

export const useMentors = () => {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: getMentors,
  });
};

export const useRequestMentorship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, message }: { mentorId: string; message?: string }) => 
      requestMentorship(mentorId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorshipRequests'] });
    },
  });
};
