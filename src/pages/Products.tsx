import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Plane, Train, Monitor, Gamepad2, Settings, Zap, Shield } from 'lucide-react';

const Products = () => {
  const racingFeatures = [
    'Force Feedback Steering Wheel',
    'Professional Pedal Set',
    'Triple Monitor Support',
    'Motion Platform Compatible',
    'VR Headset Integration',
    'Telemetry Analysis',
  ];

  const aviationFeatures = [
    'Realistic Cockpit Controls',
    'Multi-Engine Aircraft Support',
    'Weather Simulation',
    'ATC Communication',
    'Navigation Systems',
    'Emergency Scenarios',
  ];

  const railFeatures = [
    'Cab Control Simulation',
    'Signal System Training',
    'Route Familiarization',
    'Emergency Procedures',
    'Multi-Train Operations',
    'Safety Compliance',
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade simulation hardware and software solutions designed for training, 
            education, and entertainment across multiple industries.
          </p>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="racing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="racing" className="flex items-center space-x-2">
              <Car className="w-4 h-4" />
              <span>Racing</span>
            </TabsTrigger>
            <TabsTrigger value="aviation" className="flex items-center space-x-2">
              <Plane className="w-4 h-4" />
              <span>Aviation</span>
            </TabsTrigger>
            <TabsTrigger value="rail" className="flex items-center space-x-2">
              <Train className="w-4 h-4" />
              <span>Rail</span>
            </TabsTrigger>
          </TabsList>

          {/* Racing Simulators */}
          <TabsContent value="racing" id="racing">
            <div className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Racing Simulators</h2>
                <p className="text-lg text-muted-foreground">
                  Professional motorsports training and entertainment systems
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Car className="w-24 h-24 text-accent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Pro Racing Rig</CardTitle>
                    <div className="flex space-x-2">
                      <Badge>Professional</Badge>
                      <Badge variant="outline">GT3 Ready</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Our flagship racing simulator featuring professional-grade components, 
                      force feedback systems, and support for the latest racing titles including 
                      Assetto Corsa Competizione and Automobilista 2.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {racingFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹15,000/session</p>
                          <p className="text-sm text-muted-foreground">Professional training rates available</p>
                        </div>
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Gamepad2 className="w-24 h-24 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Compact Racing</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Entry Level</Badge>
                      <Badge variant="outline">Plug & Play</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Perfect for beginners and casual enthusiasts, offering an authentic 
                      racing experience with simplified setup and operation.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm">Single Monitor Setup</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm">Quick Setup</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm">Basic Force Feedback</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm">Multiple Game Support</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹8,000/session</p>
                          <p className="text-sm text-muted-foreground">Perfect for beginners</p>
                        </div>
                        <Button variant="outline">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aviation Simulators */}
          <TabsContent value="aviation" id="aviation">
            <div className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Aviation Simulators</h2>
                <p className="text-lg text-muted-foreground">
                  Professional flight training and certification systems
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Plane className="w-24 h-24 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Flight Deck Pro</CardTitle>
                    <div className="flex space-x-2">
                      <Badge>Commercial Grade</Badge>
                      <Badge variant="outline">FAA Approved</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Full-scale cockpit replica with authentic controls and instruments, 
                      designed for professional pilot training and certification programs.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {aviationFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹25,000/session</p>
                          <p className="text-sm text-muted-foreground">Instructor-led training available</p>
                        </div>
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                    <Monitor className="w-24 h-24 text-secondary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Flight Trainer</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Training</Badge>
                      <Badge variant="outline">Multi-Aircraft</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Versatile flight training system supporting multiple aircraft types, 
                      perfect for flight schools and individual pilot development.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">Multi-Aircraft Support</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">Scenario Training</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">Progress Tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-sm">Flight Planning</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹18,000/session</p>
                          <p className="text-sm text-muted-foreground">Flexible training packages</p>
                        </div>
                        <Button variant="outline">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Rail Simulators */}
          <TabsContent value="rail" id="rail">
            <div className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Rail Transport Simulators</h2>
                <p className="text-lg text-muted-foreground">
                  Professional railway operator training and certification systems
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                    <Train className="w-24 h-24 text-secondary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Rail Master</CardTitle>
                    <div className="flex space-x-2">
                      <Badge>Professional</Badge>
                      <Badge variant="outline">Multi-Route</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Comprehensive railway simulation system for professional train operator 
                      certification and ongoing safety training programs.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {railFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Settings className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹20,000/session</p>
                          <p className="text-sm text-muted-foreground">Certification programs available</p>
                        </div>
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Monitor className="w-24 h-24 text-accent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">FluxTerra Rail Explorer</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Educational</Badge>
                      <Badge variant="outline">Route Learning</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Interactive railway exploration system perfect for route familiarization 
                      and educational programs for transportation enthusiasts.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-primary" />
                          <span className="text-sm">Route Exploration</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-primary" />
                          <span className="text-sm">Educational Content</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-primary" />
                          <span className="text-sm">Historical Routes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-primary" />
                          <span className="text-sm">Interactive Learning</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">Starting at ₹12,000/session</p>
                          <p className="text-sm text-muted-foreground">Educational group rates</p>
                        </div>
                        <Button variant="outline">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Software Solutions */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Software Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Intuitive interface software that powers our simulation experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="w-6 h-6 text-primary mr-2" />
                  FluxOS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our proprietary operating system designed specifically for simulation environments, 
                  providing seamless integration and optimal performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-6 h-6 text-primary mr-2" />
                  FluxControl
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced configuration and control software allowing instructors and users 
                  to customize scenarios, track progress, and analyze performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 text-primary mr-2" />
                  FluxAnalytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive analytics platform providing detailed insights into training 
                  progress, performance metrics, and certification readiness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;