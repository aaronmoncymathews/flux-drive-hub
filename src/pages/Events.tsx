import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Users, Clock, MapPin, Car } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Monza Hotlap Contest',
      date: '2024-02-15',
      time: '19:00 IST',
      simulator: 'ACC',
      track: 'Monza',
      category: 'GT3',
      prize: '₹5,000',
      participants: 24,
      maxParticipants: 50,
      description: 'Show your skills on the legendary Monza circuit. Fastest single lap wins!'
    },
    {
      id: 2,
      title: 'Endurance Championship Round 1',
      date: '2024-02-22',
      time: '20:00 IST',
      simulator: 'ACC',
      track: 'Spa-Francorchamps',
      category: 'GT3',
      prize: '₹15,000',
      participants: 45,
      maxParticipants: 60,
      description: '3-hour endurance race around the challenging Spa-Francorchamps circuit.'
    },
    {
      id: 3,
      title: 'Rookie Challenge',
      date: '2024-02-28',
      time: '18:00 IST',
      simulator: 'AMS2',
      track: 'Interlagos',
      category: 'Formula',
      prize: '₹3,000',
      participants: 12,
      maxParticipants: 30,
      description: 'Perfect for newcomers! Learn the basics in a friendly competition.'
    }
  ];

  const pastResults = [
    {
      id: 1,
      title: 'Silverstone Speed Challenge',
      date: '2024-01-28',
      winner: 'SpeedDemon',
      time: '1:26.543',
      prize: '₹7,500',
      participants: 42
    },
    {
      id: 2,
      title: 'GT3 Championship Final',
      date: '2024-01-21',
      winner: 'RaceKing',
      time: '2:15:34.123',
      prize: '₹20,000',
      participants: 48
    },
    {
      id: 3,
      title: 'New Year Grand Prix',
      date: '2024-01-01',
      winner: 'FastLane',
      time: '1:42.891',
      prize: '₹10,000',
      participants: 56
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Events & Competitions</h1>
          <p className="text-lg text-muted-foreground">
            Join exciting racing events and compete with drivers from around the world
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Calendar className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.track}
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">{event.prize}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{event.simulator}</Badge>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.participants}/{event.maxParticipants} participants</span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>

                  <Button className="w-full">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Results */}
        <section>
          <div className="flex items-center mb-8">
            <Trophy className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Past Results</h2>
          </div>

          <div className="space-y-4">
            {pastResults.map((result) => (
              <Card key={result.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{result.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(result.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
                      <div className="text-center">
                        <p className="font-semibold text-lg">{result.winner}</p>
                        <p className="text-sm text-muted-foreground">Winner</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono font-bold text-lg">{result.time}</p>
                        <p className="text-sm text-muted-foreground">Best Time</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg text-green-600">{result.prize}</p>
                        <p className="text-sm text-muted-foreground">Prize</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg">{result.participants}</p>
                        <p className="text-sm text-muted-foreground">Participants</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Results
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;