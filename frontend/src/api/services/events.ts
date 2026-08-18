import { apiClient } from '../client';

export async function getEvents() {
  const response = await apiClient.get('/events/');
  // Mock image for now since backend doesn't have images
  return (response.data || []).map((event: any) => ({
    id: event.id,
    title: event.title,
    date: new Date(event.event_date).toLocaleDateString(),
    time: new Date(event.event_date).toLocaleTimeString(),
    organizer: 'Institute',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: event.description
  }));
}
