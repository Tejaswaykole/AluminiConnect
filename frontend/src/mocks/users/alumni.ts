import { Alumni } from '../../types';

export const ALUMNI_MOCKS: Omit<Alumni, 'role'>[] = [
  {
    id: 'a1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=a1',
    company: 'Tech Innovators Inc.',
    position: 'Senior Frontend Engineer',
    graduationYear: '2020',
    location: 'San Francisco, CA',
    skills: ['React Native', 'GraphQL', 'UI/UX'],
    about: 'I build scalable web applications and love mentoring junior developers.',
    availableForMentorship: true,
  },
  {
    id: 'a2',
    name: 'Michael Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=a2',
    company: 'DataFlow Systems',
    position: 'Data Scientist',
    graduationYear: '2018',
    location: 'New York, NY',
    skills: ['Python', 'TensorFlow', 'SQL'],
    about: 'Focused on predictive analytics and natural language processing.',
    availableForMentorship: false,
  },
];
