import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunities, joinCommunity, getCommunityPosts, createPost } from '../../api/services/community';

export const useCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: getCommunities,
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
};

export const useCommunityPosts = (communityId: string) => {
  return useQuery({
    queryKey: ['communities', communityId, 'posts'],
    queryFn: () => getCommunityPosts(communityId),
    enabled: !!communityId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ communityId, content }: { communityId: string; content: string }) => 
      createPost(communityId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['communities', variables.communityId, 'posts'] });
    },
  });
};
