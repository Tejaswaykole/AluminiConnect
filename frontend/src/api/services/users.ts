import { apiClient } from '../client';

export const getMe = async () => {
  const data: any = await apiClient.get('/users/me');
  return {
    ...data,
    name: data.first_name + ' ' + data.last_name,
    avatar: data.avatar_url || 'https://ui-avatars.com/api/?name=' + data.first_name + '+' + data.last_name
  };
};
