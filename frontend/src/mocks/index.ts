export const CURRENT_USER = {
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

export const ALUMNI_MOCKS = [
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

export const OPPORTUNITY_MOCKS = [
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

export const EVENT_MOCKS = [
  {
    id: 'e1',
    title: 'Annual Tech Summit 2026',
    date: 'August 15, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Computer Science Department',
    description: 'Join industry leaders and alumni for a day of tech talks and networking.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'e2',
    title: 'Resume Review Workshop',
    date: 'August 22, 2026',
    time: '2:00 PM - 4:00 PM',
    venue: 'Virtual (Zoom)',
    organizer: 'Placement Cell',
    description: 'Get your resume reviewed by top alumni recruiters.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=60',
  }
];

export const COMMUNITY_MOCKS = [
  {
    id: 'c1',
    name: 'Web Developers Guild',
    description: 'A community for discussing the latest in frontend and backend web technologies.',
    members: 1240,
    recentActivity: '2 hours ago',
  },
  {
    id: 'c2',
    name: 'Data Science Enthusiasts',
    description: 'Sharing resources, datasets, and career advice for data science.',
    members: 856,
    recentActivity: '5 mins ago',
  }
];

export const NOTIFICATION_MOCKS = [
  {
    id: 'n1',
    title: 'New Mentorship Match',
    message: 'Sarah Chen has accepted your mentorship request!',
    time: '2 hours ago',
    read: false,
    type: 'mentorship',
  },
  {
    id: 'n2',
    title: 'Upcoming Event Reminder',
    message: 'Annual Tech Summit 2026 starts tomorrow at 10:00 AM.',
    time: '1 day ago',
    read: true,
    type: 'event',
  }
];

export const ALUMNI_USER = {
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

export const STUDENT_MOCKS = [
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

export const PLACEMENT_USER = {
  id: 'p1',
  name: 'Placement Coordinator',
  role: 'placement',
  avatar: 'https://i.pravatar.cc/150?u=p1',
};

export const ADMIN_USER = {
  id: 'ad1',
  name: 'System Admin',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?u=ad1',
};

export const DRIVE_MOCKS = [
  {
    id: 'd1',
    title: 'Tech Giants Recruitment Drive',
    company: 'Multiple Companies',
    date: '2026-09-10',
    status: 'Upcoming',
    registeredCount: 150,
    description: 'Annual placement drive featuring top tech companies.',
  },
  {
    id: 'd2',
    title: 'Fintech Hiring Marathon',
    company: 'FinCorp',
    date: '2026-08-25',
    status: 'Ongoing',
    registeredCount: 85,
    description: 'Exclusive hiring for finance and engineering students.',
  }
];
