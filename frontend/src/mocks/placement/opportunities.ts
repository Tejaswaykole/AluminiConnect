import { Opportunity } from '../../types';

export const OPPORTUNITY_MOCKS: Opportunity[] = [
  {
    id: 'o1',
    title: 'Software Engineering Intern',
    company: 'CloudScale',
    location: 'Remote',
    type: 'Internship',
    deadline: '2026-10-15',
    postedAt: '2026-07-20',
    description: 'Join our core infrastructure team to build highly available distributed systems.',
  },
  {
    id: 'o2',
    title: 'Junior UX Designer',
    company: 'Creative Studio',
    location: 'London, UK',
    type: 'Full-time',
    deadline: '2026-09-01',
    postedAt: '2026-07-22',
    description: 'Looking for a passionate designer to help shape our next generation of mobile apps.',
  }
];
