import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, Shield, Award, Zap } from 'lucide-react';

const Leaderboards = () => {
  const [selectedSim, setSelectedSim] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock leaderboard data
  const leaderboardData = {
    fastest: [
      { rank: 1, name: 'SpeedDemon', time: '1:42.123', track: 'Monza', sim: 'ACC' },
      { rank: 2, name: 'RaceKing', time: '1:42.456', track: 'Monza', sim: 'ACC' },
      { rank: 3, name: 'FastLane', time: '1:42.789', track: 'Monza', sim: 'ACC' },
    ],
    licenses: [
      { rank: 1, name: 'SpeedDemon', count: 15, sim: 'ACC' },
      { rank: 2, name: 'RaceKing', count: 12, sim: 'AMS2' },
      { rank: 3, name: 'FastLane', count: 10, sim: 'ACC' },
    ],
    hours: [
      { rank: 1, name: 'SpeedDemon', hours: 245, sim: 'ACC' },
      { rank: 2, name: 'RaceKing', hours: 198, sim: 'AMS2' },
      { rank: 3, name: 'FastLane', hours: 176, sim: 'ACC' },
    ],
    consistency: [
      { rank: 1, name: 'SteadyDriver', variance: '0.125s', sim: 'ACC' },
      { rank: 2, name: 'Consistent', variance: '0.234s', sim: 'AMS2' },
      { rank: 3, name: 'Reliable', variance: '0.345s', sim: 'ACC' },
    ]
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Leaderboards</h1>
          <p className="text-lg text-muted-foreground">
            See how you stack up against other drivers worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedSim} onValueChange={setSelectedSim}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select simulator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Simulators</SelectItem>
              <SelectItem value="ACC">Assetto Corsa Competizione</SelectItem>
              <SelectItem value="AMS2">Automobilista 2</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="GT3">GT3</SelectItem>
              <SelectItem value="Formula">Formula</SelectItem>
              <SelectItem value="Touring">Touring Car</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fastest Lap Times */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Fastest Lap Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.fastest.map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold">{entry.rank}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{entry.track}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold">{entry.time}</p>
                          <Badge variant="secondary" className="text-xs">{entry.sim}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Licenses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-500" />
                    Most Track Licenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.licenses.map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold">{entry.rank}</span>
                          </div>
                          <p className="font-semibold">{entry.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.count} licenses</p>
                          <Badge variant="secondary" className="text-xs">{entry.sim}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Hours Driven */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-500" />
                    Most Hours Driven
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.hours.map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold">{entry.rank}</span>
                          </div>
                          <p className="font-semibold">{entry.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.hours}h</p>
                          <Badge variant="secondary" className="text-xs">{entry.sim}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Consistent */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-500" />
                    Most Consistent Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.consistency.map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold">{entry.rank}</span>
                          </div>
                          <p className="font-semibold">{entry.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold">{entry.variance}</p>
                          <Badge variant="secondary" className="text-xs">{entry.sim}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Weekly Leaderboards</h3>
              <p className="text-muted-foreground">
                Weekly rankings reset every Monday. Check back to see this week's champions!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboards;