import { apiClient } from '../client';

export interface Mentor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  role: string;
  profession?: string;
  company?: string;
  expertise?: string[];
  bio?: string;
}

export const getMentors = async (): Promise<Mentor[]> => {
  const response = await apiClient.get('/users/alumni'); // Assuming alumni endpoint for mentors
  return response.data;
};

export const requestMentorship = async (mentorId: string, message?: string) => {
  const response = await apiClient.post('/mentorship/request', {
    mentor_id: mentorId,
    message,
  });
  return response.data;
};
