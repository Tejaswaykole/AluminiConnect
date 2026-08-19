import { apiClient } from '../client';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  created_by: string;
}

export const getOpportunities = async (params?: { search?: string, company?: string, status?: string }) => {
  const data: any = await apiClient.get('/opportunities/', { params });
  return data.data as Opportunity[];
};
