import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/Typography';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Card } from '../../../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Badge } from '../../../components/Badge';

const MOCK_EVENTS = [
  { id: 1, title: 'Annual Alumni Meet 2026', type: 'Alumni Meet', date: 'Dec 15, 2026', time: '10:00 AM', location: 'Main Auditorium', registrations: 350, status: 'Upcoming' },
  { id: 2, title: 'Tech Industry Webinar', type: 'Webinar', date: 'Oct 28, 2026', time: '02:00 PM', location: 'Online', registrations: 120, status: 'Upcoming' },
  { id: 3, title: 'Startup Networking', type: 'Networking Event', date: 'Sep 10, 2026', time: '04:00 PM', location: 'Innovation Hub', registrations: 85, status: 'Past' },
];

export default function EventsManagement() {
  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Typography variant="body" color="muted">Engagement</Typography>
          <Typography variant="h1">Events</Typography>
        </View>
        <TouchableOpacity className="flex-row items-center bg-primary px-4 py-2 rounded-md">
          <MaterialIcons name="add" size={20} color="white" />
          <Typography variant="body" color="inverse" className="ml-2 font-medium">Create Event</Typography>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border mb-6">
        <TouchableOpacity className="px-4 py-2 border-b-2 border-primary">
          <Typography variant="body" className="font-semibold text-primary">Upcoming</Typography>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2">
          <Typography variant="body" color="muted" className="font-medium">Past Events</Typography>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <View className="w-full">
        {MOCK_EVENTS.map(event => (
          <Card key={event.id} className="mb-4 bg-surface border border-border p-4 flex-col md:flex-row justify-between items-start md:items-center">
            
            <View className="flex-row items-center flex-1 mb-4 md:mb-0">
              <View className="w-16 h-16 bg-surface border border-border rounded-lg items-center justify-center mr-4">
                <Typography variant="caption" className="font-bold text-primary text-xs uppercase">{event.date.split(' ')[0]}</Typography>
                <Typography variant="h2" className="leading-tight">{event.date.split(' ')[1].replace(',', '')}</Typography>
              </View>
              <View>
                <View className="flex-row items-center mb-1">
                    <Typography variant="h3" className="mr-2">{event.title}</Typography>
                    <Badge variant={event.status === 'Upcoming' ? 'success' : 'outline'} label={event.status} />
                </View>
                <Typography variant="caption" color="muted">{event.type} • {event.location}</Typography>
                <View className="flex-row items-center mt-1">
                  <MaterialIcons name="schedule" size={14} color="#64748b" className="mr-1" />
                  <Typography variant="caption" color="muted" className="mr-3">{event.time}</Typography>
                  <MaterialIcons name="people" size={14} color="#64748b" className="mr-1" />
                  <Typography variant="caption" color="muted">{event.registrations} Registrations</Typography>
                </View>
              </View>
            </View>

            <View className="flex-row items-center border-t border-border md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end space-x-2">
                <TouchableOpacity className="px-3 py-1.5 border border-border bg-surface rounded-md">
                    <Typography variant="caption" className="font-medium">Manage</Typography>
                </TouchableOpacity>
                {event.status === 'Upcoming' && (
                  <TouchableOpacity className="p-2 border border-border bg-surface rounded-md">
                      <MaterialIcons name="more-vert" size={20} color="#1e293b" />
                  </TouchableOpacity>
                )}
            </View>

          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}
