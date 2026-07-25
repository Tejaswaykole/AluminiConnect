// Global shared types

export interface BaseApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
