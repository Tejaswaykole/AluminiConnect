export type UserRole = 'student' | 'alumni' | 'placement' | 'admin';

export interface BaseUser {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
