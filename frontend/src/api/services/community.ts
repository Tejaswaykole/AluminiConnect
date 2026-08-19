import { apiClient } from '../client';

export interface Community {
  id: string;
  name: string;
  description: string;
  member_count: number;
  tags?: string[];
}

export interface Post {
  id: string;
  community_id: string;
  author: {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  content: string;
  created_at: string;
  likes: number;
  comments: number;
}

export const getCommunities = async (): Promise<Community[]> => {
  const response = await apiClient.get('/communities');
  return response.data;
};

export const joinCommunity = async (communityId: string) => {
  const response = await apiClient.post(`/communities/${communityId}/join`);
  return response.data;
};

export const getCommunityPosts = async (communityId: string): Promise<Post[]> => {
  const response = await apiClient.get(`/communities/${communityId}/posts`);
  return response.data;
};

export const createPost = async (communityId: string, content: string) => {
  const response = await apiClient.post(`/communities/${communityId}/posts`, {
    content
  });
  return response.data;
};
