import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    type: 'Upcoming',
    title: 'Annual Grand Felicitation Ceremony',
    date: 'August 15, 2024',
    location: 'Ravindra Bharathi, Hyderabad',
    description: 'Celebrating our annual scholarship winners and top performers from the past year. An evening of awards, cultural programs, and guest lectures.',
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
  },
  {
    type: 'Upcoming',
    title: 'Tech & Robotics Quiz Workshop',
    date: 'July 25, 2024',
    location: 'Online Webinar',
    description: 'A special workshop in collaboration with Innovate Tech Solutions to prepare students for the upcoming Robotics Olympiad. Free for all registered users.',
    icon: <Users className="w-6 h-6 text-blue-500" />,
  },
  {
    type: 'Past',
    title: 'Monthly Championship - May 2024',
    date: 'May 31, 2024',
    location: 'St. Ann\'s College, Secunderabad',
    description: 'The monthly finale for May saw fierce competition. Congratulations to all the winners and participants for their incredible performance.',
    icon: <Trophy className="w-6 h-6 text-gray-500" />,
  },
    {
    type: 'Past',
    title: 'State Science Olympiad',
    date: 'April 10, 2024',
    location: 'Regional Science Centre, Warangal',
    description: 'Our first-ever Science Olympiad was a massive success, with over 5,000 participants from across the state.',
    icon: <Trophy className="w-6 h-6 text-gray-500" />,
  },
];

export default function EventsPage() {
  return (
    <div className="p-4 md:p-8">
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <CardTitle>Events Calendar</CardTitle>
            </div>
          <CardDescription>
            Join our workshops, competitions, and ceremonies.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {events.filter(e => e.type === 'Upcoming').map((event) => (
              <Card key={event.title}>
                <CardHeader className="flex-row gap-4 items-center">
                    {event.icon}
                    <div>
                        <CardTitle>{event.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4"/> {event.location}
                    </div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4"/> {event.date}
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Past Events</h2>
          <div className="space-y-4">
             {events.filter(e => e.type === 'Past').map((event) => (
              <Card key={event.title} className="bg-muted/40">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            {event.icon}
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                        </div>
                        <Badge variant="outline">{event.date}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}