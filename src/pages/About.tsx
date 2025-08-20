import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Award, Users, Shield, Target, Globe, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FluxTerra Simworks</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pioneering the future of simulation technology with innovative hardware and software solutions 
            that bridge the gap between virtual training and real-world performance.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-8 h-8 text-primary mr-3" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To revolutionize training and education across motorsports, aviation, and rail transport 
                through cutting-edge simulation technology that delivers unparalleled realism and accessibility.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="w-8 h-8 text-primary mr-3" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the global leader in immersive simulation experiences, empowering professionals 
                and enthusiasts worldwide to achieve excellence through safe, cost-effective training solutions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  Constantly pushing boundaries with cutting-edge technology and creative solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Excellence</h3>
                <p className="text-muted-foreground">
                  Delivering the highest quality products and services that exceed expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  Building strong relationships and fostering collaboration across our global network.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Integrity</h3>
                <p className="text-muted-foreground">
                  Operating with transparency, honesty, and ethical practices in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Founded in Austin, Texas, FluxTerra Simworks emerged from a shared passion for technology 
                  and a vision to transform how professionals train in high-stakes environments. Our founders, 
                  veterans of the aerospace and automotive industries, recognized the need for more accessible, 
                  cost-effective, and realistic training solutions.
                </p>
                <p>
                  What started as a small team of engineers and designers has grown into a leading provider 
                  of simulation hardware and software. We've built our reputation on delivering products that 
                  not only meet but exceed the demanding requirements of our clients in motorsports, aviation, 
                  and rail transport.
                </p>
                <p>
                  Today, FluxTerra Simworks continues to innovate at the intersection of hardware and software, 
                  creating immersive experiences that prepare professionals for real-world challenges while 
                  providing enthusiasts with unparalleled entertainment value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FluxTerra Simworks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cutting-Edge Technology</h3>
                  <p className="text-muted-foreground">
                    State-of-the-art hardware and software that delivers unmatched realism and precision.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                  <p className="text-muted-foreground">
                    Dedicated technical support and training services to maximize your simulation experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Serving clients worldwide with localized support and customized solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proven Reliability</h3>
                  <p className="text-muted-foreground">
                    Trusted by industry leaders for mission-critical training and certification programs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
                  <p className="text-muted-foreground">
                    Every solution is tailored to meet the unique needs and goals of our clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Industry Recognition</h3>
                  <p className="text-muted-foreground">
                    Award-winning products recognized for innovation and excellence in simulation technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Awards & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ISO 9001:2015 Certified
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Best Innovation Award 2023
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Industry Excellence Recognition
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Safety Training Excellence
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;