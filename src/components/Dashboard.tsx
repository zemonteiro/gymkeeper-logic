
import React, { useState } from 'react';
import { Users, Calendar, TrendingUp, Clock, HelpCircle } from 'lucide-react';
import StatsCard from './ui/StatsCard';
import StatChart from './ui/StatChart';
import ClassCard from './ui/ClassCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Sample data
const recentClasses = [
  {
    id: '1',
    name: 'Morning Yoga',
    instructor: 'Jane Smith',
    date: 'Today',
    time: '8:00 AM',
    duration: 60,
    capacity: 20,
    enrolled: 18,
    description: 'Start your day with a refreshing yoga session focusing on flexibility and mindfulness.'
  },
  {
    id: '2',
    name: 'HIIT Training',
    instructor: 'Mike Johnson',
    date: 'Today',
    time: '5:30 PM',
    duration: 45,
    capacity: 15,
    enrolled: 8,
    description: 'High-intensity interval training to boost metabolism and improve cardiovascular health.'
  },
];

const memberActivityData = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 280 },
  { name: 'Thu', value: 320 },
  { name: 'Fri', value: 350 },
  { name: 'Sat', value: 380 },
  { name: 'Sun', value: 250 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [supportIssue, setSupportIssue] = useState('');
  const [supportContact, setSupportContact] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSupportRequest = () => {
    if (supportIssue.trim() && supportContact.trim()) {
      toast({
        title: "Support Request Submitted",
        description: "A technical support specialist will contact you shortly.",
      });
      setSupportIssue('');
      setSupportContact('');
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gym-muted">Welcome back to GymKeeper</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center">
              <HelpCircle size={16} />
              <span>Request Tech Support</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Technical Support Request</DialogTitle>
              <DialogDescription>
                Describe the issue you're experiencing and our technical team will assist you.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="issue">Issue Description</Label>
                <Textarea
                  id="issue"
                  placeholder="Please describe the technical issue you're experiencing..."
                  value={supportIssue}
                  onChange={(e) => setSupportIssue(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input
                  id="contact"
                  placeholder="Your email or phone number"
                  value={supportContact}
                  onChange={(e) => setSupportContact(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSupportRequest}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Members" 
          value="1,248"
          icon={<Users />}
          trend={{ value: 12, isPositive: true }}
          delay={100}
        />
        <StatsCard 
          title="Active Classes" 
          value="32"
          icon={<Calendar />}
          trend={{ value: 8, isPositive: true }}
          delay={200}
        />
        <StatsCard 
          title="Revenue" 
          value="$24,500"
          icon={<TrendingUp />}
          trend={{ value: 5, isPositive: true }}
          delay={300}
        />
        <StatsCard 
          title="Avg. Session" 
          value="63 min"
          icon={<Clock />}
          trend={{ value: 2, isPositive: false }}
          delay={400}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatChart
            title="Member Activity"
            subtitle="Weekly gym visits"
            data={memberActivityData}
            type="bar"
            dataKey="value"
            delay={500}
          />
        </div>
        
        <div>
          <StatChart
            title="Class Attendance"
            subtitle="By category"
            data={[
              { name: 'Cardio', value: 35 },
              { name: 'Strength', value: 25 },
              { name: 'Yoga', value: 20 },
              { name: 'HIIT', value: 15 },
              { name: 'Others', value: 5 },
            ]}
            type="pie"
            dataKey="value"
            delay={600}
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Today's Classes</h2>
          <Button variant="outline" size="sm">View All Classes</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentClasses.map((gymClass, index) => (
            <ClassCard 
              key={gymClass.id} 
              gymClass={gymClass}
              delay={700 + (index * 100)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
