// Global shared types

export interface BaseApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export * from './common';
export * from './student';
export * from './alumni';
export * from './event';
export * from './opportunity';
export * from './community';
export * from './notification';
export * from './placement';
