import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import MemberStore from './MemberStore';

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
        <TabsTrigger value="store">Store</TabsTrigger>
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
      
      <TabsContent value="store" className="space-y-6">
        <MemberStore />
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

export default MemberDashboard;
