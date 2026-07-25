import { BaseUser } from './common';

export interface Alumni extends BaseUser {
  role: 'alumni';
  company: string;
  position: string;
  graduationYear: string;
  location: string;
  skills: string[];
  about?: string;
  bio?: string;
  availableForMentorship: boolean;
  industry?: string;
  experience?: string;
  education?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  contact?: string;
}
