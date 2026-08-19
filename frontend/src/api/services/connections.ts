import { apiClient } from '../client';

export interface Connection {
  id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string;
    profession?: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export const getConnections = async (): Promise<Connection[]> => {
  const response = await apiClient.get('/connections');
  return response.data;
};

export const getPendingRequests = async (): Promise<Connection[]> => {
  const response = await apiClient.get('/connections/requests');
  return response.data;
};

export const sendConnectionRequest = async (userId: string) => {
  const response = await apiClient.post(`/connections/request`, {
    target_user_id: userId
  });
  return response.data;
};

export const acceptConnectionRequest = async (connectionId: string) => {
  const response = await apiClient.post(`/connections/${connectionId}/accept`);
  return response.data;
};
