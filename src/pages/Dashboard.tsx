import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Award, Users, Clock, Trophy, User, Plus, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock data for demo purposes
  const mockUsers = [
    {
      id: '3',
      email: 'racer1@example.com',
      username: 'SpeedDemon',
      licenses: [
        { sim: 'ACC', category: 'GT3', track: 'Monza', earned: '2024-01-10' },
        { sim: 'ACC', category: 'GT3', track: 'Spa-Francorchamps', earned: '2024-01-20' }
      ],
      hoursDriven: 120,
      friends: [],
      role: 'user'
    },
    {
      id: '4',
      email: 'pilot1@example.com',
      username: 'SkyWalker',
      licenses: [
        { sim: 'MSFS', category: 'Commercial', track: 'KJFK', earned: '2024-02-01' }
      ],
      hoursDriven: 200,
      friends: [],
      role: 'user'
    }
  ];

  const userFriends = mockUsers.filter(u => user?.friends?.includes(u.id));

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Mock search functionality
    const results = mockUsers.filter(u => 
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddFriend = (userId: string) => {
    // In production, this would make an API call
    console.log('Adding friend:', userId);
  };

  const getLicenseBadgeColor = (sim: string) => {
    switch (sim) {
      case 'ACC': return 'bg-red-500';
      case 'AMS2': return 'bg-blue-500';
      case 'MSFS': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.email}
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Licenses</TabsTrigger>
            <TabsTrigger value="search">Find Users</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.licenses?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all simulators
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Driven</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.hoursDriven || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Total simulation time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Friends</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.friends?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Connected users
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">License earned: ACC GT3 Monza</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed 2-hour practice session</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New personal best at Spa-Francorchamps</p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Licenses Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Your Licenses & Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.licenses && user.licenses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.licenses.map((license, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={cn('text-white', getLicenseBadgeColor(license.sim))}>
                            {license.sim}
                          </Badge>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="font-semibold">{license.category}</h3>
                        <p className="text-sm text-muted-foreground">{license.track}</p>
                        <p className="text-xs text-muted-foreground">
                          Earned: {new Date(license.earned).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Licenses Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete practice sessions to earn your first license!
                    </p>
                    <Button>Book a Session</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Users Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Find Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Search by username or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Search Results</h3>
                    {searchResults.map((searchUser) => (
                      <Card key={searchUser.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback>
                                  <User className="w-5 h-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{searchUser.username}</h4>
                                <p className="text-sm text-muted-foreground">{searchUser.email}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {searchUser.licenses.length} licenses
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {searchUser.hoursDriven}h driven
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {searchUser.licenses.map((license: any, idx: number) => (
                                  <Badge 
                                    key={idx} 
                                    variant="secondary" 
                                    className="text-xs"
                                  >
                                    {license.sim}
                                  </Badge>
                                ))}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAddFriend(searchUser.id)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Friend
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Your Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userFriends.length > 0 ? (
                  <div className="space-y-4">
                    {userFriends.map((friend) => (
                      <Card key={friend.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback>
                                  <User className="w-5 h-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{friend.username}</h4>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {friend.licenses.length} licenses
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {friend.hoursDriven}h driven
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {friend.licenses.map((license: any, idx: number) => (
                                <Badge 
                                  key={idx} 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {license.sim}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Friends Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Use the search function to find and add friends!
                    </p>
                    <Button>Find Users</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;