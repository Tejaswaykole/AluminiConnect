import { Student } from '../../types';

export const STUDENT_MOCKS: Omit<Student, 'role'>[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?u=u1',
    college: 'College of Engineering',
    department: 'Computer Science',
    graduationYear: '2026',
    skills: ['React', 'TypeScript', 'Python'],
    interests: ['Machine Learning', 'Open Source'],
    projects: ['AI Chatbot', 'Portfolio Website'],
    careerGoals: 'To become a full-stack developer at a top tech company.',
  },
  {
    id: 's2',
    name: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?u=u2',
    college: 'College of Design',
    department: 'Graphic Design',
    graduationYear: '2025',
    skills: ['Figma', 'Adobe CC', 'UI/UX'],
    interests: ['User Research', 'Typography'],
    projects: ['App Redesign', 'Brand Identity'],
    careerGoals: 'Lead product designer focusing on accessibility.',
  },
  {
    id: 's3',
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?u=u3',
    college: 'Business School',
    department: 'Finance',
    graduationYear: '2024',
    skills: ['Financial Modeling', 'Excel', 'Data Analysis'],
    interests: ['Investment Banking', 'Fintech'],
    projects: ['Market Analysis Report', 'Startup Valuation'],
    careerGoals: 'Financial analyst in the tech sector.',
  }
];
