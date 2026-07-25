import { Notification } from '../../types';

export const NOTIFICATION_MOCKS: Notification[] = [
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
