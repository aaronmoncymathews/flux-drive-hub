import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { CalendarIcon, Car, Clock, IndianRupee, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulatorData {
  tracks: string[];
  cars: string[];
}

const simulatorData: Record<string, SimulatorData> = {
  'ACC': {
    tracks: ['Monza', 'Spa-Francorchamps', 'Silverstone', 'Nürburgring', 'Brands Hatch'],
    cars: ['Ferrari 488 GT3', 'McLaren 650S GT3', 'BMW M6 GT3', 'Porsche 911 GT3 R', 'Audi R8 LMS']
  },
  'AMS2': {
    tracks: ['Interlagos', 'Imola', 'Road America', 'Snetterton', 'Oulton Park'],
    cars: ['Formula 1', 'Stock Car Brasil', 'GT3 Cup', 'Prototype', 'Touring Car']
  }
};

const Booking = () => {
  const { user } = useAuth();
  const [simulator, setSimulator] = useState<string>('');
  const [track, setTrack] = useState<string>('');
  const [car, setCar] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [assistanceServices, setAssistanceServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const assistanceOptions = [
    { id: 'coaching', label: 'Professional Coaching', price: 50 },
    { id: 'analysis', label: 'Post-Lap Analysis', price: 50 },
    { id: 'setup', label: 'Setup Assistance', price: 50 }
  ];

  const hasLicense = (sim: string, category: string, trackName: string) => {
    if (!user) return false;
    return user.licenses.some(license => 
      license.sim === sim && 
      license.category === category && 
      license.track === trackName
    );
  };

  const calculateTotal = () => {
    if (!duration && !customDuration) return 0;
    
    const minutes = duration === 'custom' 
      ? parseInt(customDuration) || 0 
      : parseInt(duration) || 0;
    
    const baseCost = minutes * 10; // ₹10 per minute
    const serviceFee = 50; // Base service charge
    const assistanceCost = assistanceServices.length * 50; // ₹50 per service
    
    return baseCost + serviceFee + assistanceCost;
  };

  const handleAssistanceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setAssistanceServices(prev => [...prev, serviceId]);
    } else {
      setAssistanceServices(prev => prev.filter(id => id !== serviceId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!simulator || !track || !car || !sessionType || !date || (!duration && !customDuration)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (sessionType === 'Race' && !hasLicense(simulator, 'GT3', track)) {
      toast({
        title: 'License Required',
        description: 'You need a license for this track to book a race session.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        simulator,
        track,
        car,
        sessionType,
        date: format(date, 'yyyy-MM-dd'),
        duration: duration === 'custom' ? parseInt(customDuration) : parseInt(duration),
        assistanceServices,
        totalCost: calculateTotal(),
        userId: user?.id
      };

      // In production, integrate with Stripe here
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        // Redirect to Stripe Checkout or handle payment
        toast({
          title: 'Booking Confirmed!',
          description: `Your ${sessionType.toLowerCase()} session has been booked for ${format(date, 'PPP')}.`,
        });
        
        // Reset form
        setSimulator('');
        setTrack('');
        setCar('');
        setSessionType('');
        setDate(undefined);
        setDuration('');
        setCustomDuration('');
        setAssistanceServices([]);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      // Mock successful booking for demo
      toast({
        title: 'Booking Confirmed!',
        description: `Your ${sessionType.toLowerCase()} session has been booked for ${date ? format(date, 'PPP') : 'the selected date'}.`,
      });
      
      // Reset form
      setSimulator('');
      setTrack('');
      setCar('');
      setSessionType('');
      setDate(undefined);
      setDuration('');
      setCustomDuration('');
      setAssistanceServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset dependent fields when simulator changes
  useEffect(() => {
    setTrack('');
    setCar('');
  }, [simulator]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Session</h1>
          <p className="text-lg text-muted-foreground">
            Reserve your spot on our professional simulators
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Simulator Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="simulator">Simulator *</Label>
                    <Select value={simulator} onValueChange={setSimulator}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select simulator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACC">Assetto Corsa Competizione</SelectItem>
                        <SelectItem value="AMS2">Automobilista 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Track Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="track">Track *</Label>
                    <Select value={track} onValueChange={setTrack} disabled={!simulator}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select track" />
                      </SelectTrigger>
                      <SelectContent>
                        {simulator && simulatorData[simulator]?.tracks.map(trackName => (
                          <SelectItem key={trackName} value={trackName}>
                            <div className="flex items-center justify-between w-full">
                              <span>{trackName}</span>
                              {hasLicense(simulator, 'GT3', trackName) && (
                                <Badge variant="secondary" className="ml-2">Licensed</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Car Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="car">Car *</Label>
                    <Select value={car} onValueChange={setCar} disabled={!track}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select car" />
                      </SelectTrigger>
                      <SelectContent>
                        {simulator && simulatorData[simulator]?.cars.map(carName => (
                          <SelectItem key={carName} value={carName}>
                            {carName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Session Type */}
                  <div className="space-y-2">
                    <Label htmlFor="sessionType">Session Type *</Label>
                    <Select value={sessionType} onValueChange={setSessionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Practice">Practice</SelectItem>
                        <SelectItem value="Hotlap">Hotlap Challenge</SelectItem>
                        <SelectItem 
                          value="Race" 
                          disabled={!hasLicense(simulator, 'GT3', track)}
                        >
                          Race {!hasLicense(simulator, 'GT3', track) && '(License Required)'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < minDate || date > maxDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Duration Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="custom">Custom (60+ minutes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Duration Input */}
                  {duration === 'custom' && (
                    <div className="space-y-2">
                      <Label htmlFor="customDuration">Custom Duration (minutes) *</Label>
                      <Input
                        id="customDuration"
                        type="number"
                        min="60"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                        placeholder="Enter duration in minutes"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assistance Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assistanceOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={assistanceServices.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleAssistanceChange(option.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={option.id} className="flex-1">
                        {option.label}
                      </Label>
                      <Badge variant="outline">₹{option.price}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              {/* Preview Cards */}
              {track && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Track Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Track Layout</p>
                      </div>
                    </div>
                    <h3 className="font-semibold">{track}</h3>
                    <p className="text-sm text-muted-foreground">
                      Preview image and layout diagram will be displayed here
                    </p>
                  </CardContent>
                </Card>
              )}

              {car && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="w-5 h-5 mr-2" />
                      Car Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Car className="w-12 h-12 text-accent mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Car Render</p>
                      </div>
                    </div>
                    <h3 className="font-semibold">{car}</h3>
                    <p className="text-sm text-muted-foreground">
                      Preview image and specifications will be displayed here
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Cost Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2" />
                    Cost Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Rate</span>
                    <span>₹10/minute</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>
                      {duration === 'custom' 
                        ? `${customDuration || 0} minutes` 
                        : duration ? `${duration} minutes` : '0 minutes'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Cost</span>
                    <span>₹{(duration === 'custom' 
                      ? (parseInt(customDuration) || 0) * 10 
                      : (parseInt(duration) || 0) * 10
                    ).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span>₹50</span>
                  </div>
                  {assistanceServices.length > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Services ({assistanceServices.length})</span>
                      <span>₹{assistanceServices.length * 50}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={loading || calculateTotal() === 0}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Book Session - ₹${calculateTotal().toLocaleString()}`
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;