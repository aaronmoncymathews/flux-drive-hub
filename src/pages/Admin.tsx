import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Settings, Award, Users, Calendar, Trophy } from 'lucide-react';

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedSim, setSelectedSim] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');

  // Mock users for demo
  const users = [
    { id: '2', email: 'user@example.com', username: 'TestUser' },
    { id: '3', email: 'racer1@example.com', username: 'SpeedDemon' },
    { id: '4', email: 'pilot1@example.com', username: 'SkyWalker' }
  ];

  const simulators = ['ACC', 'AMS2', 'MSFS'];
  const categories = ['GT3', 'Formula', 'Touring', 'Commercial'];
  const tracks = ['Monza', 'Spa-Francorchamps', 'Silverstone', 'Interlagos', 'KJFK'];

  const handleAwardLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !selectedSim || !selectedCategory || !selectedTrack) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields to award a license.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // In production, this would make an API call
      const response = await fetch('/api/award-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          sim: selectedSim,
          category: selectedCategory,
          track: selectedTrack,
        }),
      });

      if (response.ok) {
        toast({
          title: 'License Awarded!',
          description: `Successfully awarded ${selectedSim} ${selectedCategory} license for ${selectedTrack}.`,
        });
      }
    } catch (error) {
      // Mock success for demo
      toast({
        title: 'License Awarded!',
        description: `Successfully awarded ${selectedSim} ${selectedCategory} license for ${selectedTrack}.`,
      });
    }

    // Reset form
    setSelectedUser('');
    setSelectedSim('');
    setSelectedCategory('');
    setSelectedTrack('');
  };

  const recentLicenses = [
    { user: 'SpeedDemon', sim: 'ACC', category: 'GT3', track: 'Monza', date: '2024-02-10' },
    { user: 'TestUser', sim: 'AMS2', category: 'Formula', track: 'Interlagos', date: '2024-02-09' },
    { user: 'SkyWalker', sim: 'MSFS', category: 'Commercial', track: 'KJFK', date: '2024-02-08' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage users, award licenses, and oversee platform operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Award License Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Award License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAwardLicense} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Select User *</Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose user to award license" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.username} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="simulator">Simulator *</Label>
                      <Select value={selectedSim} onValueChange={setSelectedSim}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select simulator" />
                        </SelectTrigger>
                        <SelectContent>
                          {simulators.map((sim) => (
                            <SelectItem key={sim} value={sim}>
                              {sim}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="track">Track *</Label>
                      <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                        <SelectContent>
                          {tracks.map((track) => (
                            <SelectItem key={track} value={track}>
                              {track}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Award License
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Licenses */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Recently Awarded Licenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLicenses.map((license, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{license.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {license.sim} {license.category} - {license.track}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(license.date).toLocaleDateString()}
                        </p>
                        <Badge variant="secondary">Awarded</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Platform Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Users</span>
                  <Badge variant="secondary">{users.length + 1}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Active Sessions</span>
                  <Badge variant="secondary">7</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Licenses Awarded</span>
                  <Badge variant="secondary">42</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Events This Month</span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  View All Users
                </Button>
                <Button variant="outline" className="w-full">
                  Manage Events
                </Button>
                <Button variant="outline" className="w-full">
                  System Settings
                </Button>
                <Button variant="outline" className="w-full">
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>New user registered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>License awarded to SpeedDemon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Event registration opened</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;