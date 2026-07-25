import { Student, Alumni, PlacementDrive, BaseUser } from '../../types';

export const CURRENT_USER: Student = {
  id: 'u1',
  name: 'Alex Johnson',
  role: 'student',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  college: 'College of Engineering',
  department: 'Computer Science',
  graduationYear: '2026',
  bio: 'Passionate about AI and full-stack development. Looking for mentorship in system design.',
  skills: ['React', 'TypeScript', 'Python', 'Node.js'],
  interests: ['Machine Learning', 'Open Source', 'Hackathons'],
  connections: 42,
};

export const ALUMNI_USER: Alumni = {
  id: 'a0',
  name: 'Jane Doe',
  role: 'alumni',
  avatar: 'https://i.pravatar.cc/150?u=a0',
  company: 'Global Tech',
  position: 'Product Manager',
  industry: 'Technology',
  experience: '5 years',
  education: 'B.S. in Computer Science',
  graduationYear: '2021',
  location: 'Seattle, WA',
  skills: ['Product Strategy', 'Agile', 'UI/UX Design'],
  bio: 'Passionate about building products that make a difference. Always open to helping students.',
  availableForMentorship: true,
  socialLinks: {
    linkedin: 'linkedin.com/in/janedoe',
    twitter: '@janedoe',
  },
  contact: 'jane.doe@example.com',
};

export const PLACEMENT_USER: BaseUser = {
  id: 'p1',
  name: 'Placement Coordinator',
  role: 'placement',
  avatar: 'https://i.pravatar.cc/150?u=p1',
};

export const ADMIN_USER: BaseUser = {
  id: 'ad1',
  name: 'System Admin',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?u=ad1',
};
