import { BaseUser } from './common';

export interface Student extends BaseUser {
  role: 'student';
  college: string;
  department: string;
  graduationYear: string;
  bio?: string;
  skills: string[];
  interests: string[];
  connections?: number;
  projects?: string[];
  careerGoals?: string;
}
