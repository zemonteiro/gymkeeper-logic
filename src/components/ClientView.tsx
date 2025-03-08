import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, Users, Calendar, ChevronRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const ClientView = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: "Logged In",
        description: "You have successfully logged in",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client View</h1>
          <p className="text-gym-muted">Preview the website as seen by gym members</p>
        </div>
        <div>
          {isLoggedIn ? (
            <Button variant="outline" onClick={handleLogout}>
              Exit Client View (Log Out)
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Member Login</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Member Login</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to access your account
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Log In</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {isLoggedIn ? (
        <MemberDashboard />
      ) : (
        <PublicView />
      )}
    </div>
  );
};

const PublicView = () => {
  const { toast } = useToast();
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Your message has been sent to our staff",
    });
  };
  
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="membership">Membership</TabsTrigger>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      
      <TabsContent value="home" className="space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden h-80 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gym-primary to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-10">
            <h2 className="text-4xl font-bold text-white mb-4">Transform Your Life at GymKeeper</h2>
            <p className="text-white text-lg mb-6 max-w-md">Join our state-of-the-art facility with expert trainers and premium equipment to achieve your fitness goals.</p>
            <Button size="lg" className="w-fit">
              Join Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Dumbbell className="h-8 w-8" />}
            title="Premium Equipment"
            description="State-of-the-art machines and free weights for every fitness level."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8" />}
            title="Expert Trainers"
            description="Certified trainers to help you achieve your fitness goals safely."
          />
          <FeatureCard 
            icon={<Calendar className="h-8 w-8" />}
            title="Varied Classes"
            description="From yoga to HIIT, we offer classes for every interest and ability."
          />
        </div>
        
        {/* Testimonials */}
        <div className="py-8">
          <h3 className="text-2xl font-bold mb-6">What Our Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-subtle">
              <p className="italic mb-4">"GymKeeper transformed my fitness journey. The trainers are knowledgeable and the equipment is always well-maintained."</p>
              <p className="font-semibold">- Sarah Johnson</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-subtle">
              <p className="italic mb-4">"I've been a member for over a year and the community here is amazing. The classes are challenging and fun!"</p>
              <p className="font-semibold">- Michael Chen</p>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="membership" className="space-y-8">
        <h2 className="text-3xl font-bold mb-6">Membership Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-subtle border-t-4 border-gym-accent">
            <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
            <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gym-muted font-normal">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Gym access (6AM-10PM)</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Basic equipment</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Locker room access</li>
            </ul>
            <Button className="w-full">Select Plan</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-elevated border-t-4 border-gym-primary transform scale-105">
            <div className="bg-gym-primary text-white text-xs px-2 py-1 rounded absolute -top-2 right-4">POPULAR</div>
            <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
            <p className="text-3xl font-bold mb-4">$49<span className="text-sm text-gym-muted font-normal">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 24/7 gym access</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> All equipment</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Group classes included</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 1 personal training session</li>
            </ul>
            <Button className="w-full">Select Plan</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-subtle border-t-4 border-gym-accent">
            <h3 className="text-xl font-bold mb-2">Elite Plan</h3>
            <p className="text-3xl font-bold mb-4">$89<span className="text-sm text-gym-muted font-normal">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 24/7 gym access</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> All premium features</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Unlimited classes</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> 4 personal training sessions</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-gym-success mr-2" /> Nutrition consultation</li>
            </ul>
            <Button className="w-full">Select Plan</Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="classes" className="space-y-8">
        <h2 className="text-3xl font-bold mb-6">Our Classes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Morning Yoga",
              instructor: "Jane Smith",
              time: "Mon, Wed, Fri • 8:00 AM",
              description: "Start your day with a refreshing yoga session focusing on flexibility and mindfulness."
            },
            {
              title: "HIIT Training",
              instructor: "Mike Johnson",
              time: "Tue, Thu • 5:30 PM",
              description: "High-intensity interval training to boost metabolism and improve cardiovascular health."
            },
            {
              title: "Strength Fundamentals",
              instructor: "Chris Davis",
              time: "Mon, Wed, Fri • 6:00 PM",
              description: "Learn proper form and technique for all major strength exercises."
            },
            {
              title: "Spin Class",
              instructor: "Sarah Wilson",
              time: "Tue, Thu, Sat • 9:00 AM",
              description: "Indoor cycling workout that focuses on endurance, strength, and high intensity."
            }
          ].map((cls, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-subtle">
              <h3 className="text-xl font-bold mb-1">{cls.title}</h3>
              <p className="text-gym-muted mb-2">Instructor: {cls.instructor}</p>
              <p className="text-sm text-gym-accent mb-4">{cls.time}</p>
              <p className="mb-4">{cls.description}</p>
              <Button variant="outline" className="w-full">
                Book Class
              </Button>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="contact" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={4} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
            <div className="bg-white p-6 rounded-lg shadow-subtle mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>123 Fitness Street, Gymtown, GT 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>info@gymkeeper.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-subtle">
              <h3 className="font-semibold mb-2">Hours of Operation</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>5:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const MemberDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleBookClass = () => {
    toast({
      title: "Class Booked",
      description: "You have successfully booked this class",
    });
  };
  
  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  return (
    <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="classes">My Classes</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <h2 className="text-xl font-bold mb-4">Welcome back, Member!</h2>
          <p>Your membership is active until: <strong>December 31, 2023</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gym-secondary p-4 rounded">
              <h3 className="font-semibold">Classes Attended</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-gym-secondary p-4 rounded">
              <h3 className="font-semibold">Upcoming Classes</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-gym-secondary p-4 rounded">
              <h3 className="font-semibold">Loyalty Points</h3>
              <p className="text-2xl font-bold">350</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Morning Yoga", date: "Tomorrow, 8:00 AM" },
              { name: "HIIT Training", date: "Friday, 5:30 PM" }
            ].map((cls, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-subtle flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{cls.name}</h3>
                  <p className="text-sm text-gym-muted">{cls.date}</p>
                </div>
                <Button variant="outline" size="sm">Cancel</Button>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="classes" className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Available Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Morning Yoga", instructor: "Jane Smith", date: "Mon, Wed, Fri • 8:00 AM" },
              { name: "HIIT Training", instructor: "Mike Johnson", date: "Tue, Thu • 5:30 PM" },
              { name: "Strength Fundamentals", instructor: "Chris Davis", date: "Mon, Wed, Fri • 6:00 PM" },
              { name: "Spin Class", instructor: "Sarah Wilson", date: "Tue, Thu, Sat • 9:00 AM" }
            ].map((cls, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-subtle">
                <h3 className="font-semibold">{cls.name}</h3>
                <p className="text-sm">Instructor: {cls.instructor}</p>
                <p className="text-sm text-gym-muted mb-3">{cls.date}</p>
                <Button size="sm" onClick={handleBookClass}>Book Class</Button>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <h2 className="text-xl font-bold mb-4">My Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="(123) 456-7890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="123 Main St, Anytown, AT 12345" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Change Password</Label>
              <Input id="password" type="password" placeholder="New Password" />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </TabsContent>
      
      <TabsContent value="subscription" className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <h2 className="text-xl font-bold mb-4">Current Subscription</h2>
          <div className="p-4 bg-gym-secondary rounded mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Premium Plan</h3>
                <p className="text-gym-muted">$49/month</p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
          </div>
          <p>Next billing date: <strong>January 1, 2024</strong></p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex items-center p-3 border rounded">
              <div className="h-8 w-12 bg-gray-200 rounded mr-3"></div>
              <div>
                <p className="font-semibold">•••• •••• •••• 4242</p>
                <p className="text-sm text-gym-muted">Expires 12/25</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">Update Payment Method</Button>
              <Button variant="outline" size="sm" className="text-gym-error">Cancel Subscription</Button>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="support" className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <h2 className="text-xl font-bold mb-4">Contact Support</h2>
          <form onSubmit={(e) => { e.preventDefault(); toast({ title: "Support Request Submitted" }); }} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help you?" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="support-message">Message</Label>
              <Textarea 
                id="support-message" 
                placeholder="Describe your issue or question" 
                rows={5} 
              />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-subtle hover:shadow-elevated transition-all">
    <div className="mb-4 text-gym-accent">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gym-muted">{description}</p>
  </div>
);

export default ClientView;
