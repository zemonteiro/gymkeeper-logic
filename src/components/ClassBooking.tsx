
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Filter, RefreshCw } from 'lucide-react';
import ClassCard, { GymClass } from './ui/ClassCard';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { fetchClassPassBookings, getClassPassConfig, registerClassWithClassPass } from '@/utils/classpassUtils';
import { Badge } from './ui/badge';

// Sample class data
const sampleClasses: GymClass[] = [
  {
    id: '1',
    name: 'Morning Yoga',
    instructor: 'Jane Smith',
    date: '2023-05-20',
    time: '8:00 AM',
    duration: 60,
    capacity: 20,
    enrolled: 15,
    description: 'Start your day with a refreshing yoga session focusing on flexibility and mindfulness.'
  },
  {
    id: '2',
    name: 'HIIT Training',
    instructor: 'Mike Johnson',
    date: '2023-05-20',
    time: '5:30 PM',
    duration: 45,
    capacity: 15,
    enrolled: 8,
    description: 'High-intensity interval training to boost metabolism and improve cardiovascular health.'
  },
  {
    id: '3',
    name: 'Pilates',
    instructor: 'Sarah Brown',
    date: '2023-05-21',
    time: '10:00 AM',
    duration: 50,
    capacity: 12,
    enrolled: 10,
    description: 'Strengthen your core and improve posture with this comprehensive Pilates class.'
  },
  {
    id: '4',
    name: 'Zumba',
    instructor: 'David Wilson',
    date: '2023-05-21',
    time: '6:00 PM',
    duration: 60,
    capacity: 25,
    enrolled: 22,
    description: 'Dance your way to fitness with this high-energy Zumba class featuring Latin and international music.'
  },
  {
    id: '5',
    name: 'Spin Class',
    instructor: 'Lisa Chen',
    date: '2023-05-22',
    time: '7:00 AM',
    duration: 45,
    capacity: 15,
    enrolled: 12,
    description: 'Get your cardio in with this intense indoor cycling session suitable for all fitness levels.'
  },
  {
    id: '6',
    name: 'Strength Training',
    instructor: 'Jake Thomas',
    date: '2023-05-22',
    time: '4:00 PM',
    duration: 50,
    capacity: 10,
    enrolled: 6,
    description: 'Build muscle and improve overall strength through focused resistance training exercises.'
  },
];

const ClassBooking = () => {
  const [classes, setClasses] = useState<GymClass[]>(sampleClasses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newClass, setNewClass] = useState<Partial<GymClass>>({
    name: '',
    instructor: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    duration: 60,
    capacity: 15,
    enrolled: 0,
    description: '',
  });
  const [classPassBookings, setClassPassBookings] = useState<{[classId: string]: number}>({});
  const [isLoadingClassPass, setIsLoadingClassPass] = useState(false);
  
  // Fetch ClassPass bookings when the component mounts
  useEffect(() => {
    fetchClassPassBookingsForAllClasses();
  }, []);
  
  const fetchClassPassBookingsForAllClasses = async () => {
    const config = getClassPassConfig();
    if (!config.isEnabled) return;
    
    setIsLoadingClassPass(true);
    
    try {
      const bookingCounts: {[classId: string]: number} = {};
      
      // Fetch ClassPass bookings for each class
      for (const gymClass of classes) {
        const bookings = await fetchClassPassBookings(gymClass.id);
        if (bookings.length > 0) {
          bookingCounts[gymClass.id] = bookings.length;
        }
      }
      
      setClassPassBookings(bookingCounts);
    } catch (error) {
      console.error('Error fetching ClassPass bookings:', error);
    } finally {
      setIsLoadingClassPass(false);
    }
  };
  
  const handleAddClass = async () => {
    if (!newClass.name || !newClass.instructor || !newClass.date || !newClass.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const gymClass: GymClass = {
      id: Date.now().toString(),
      name: newClass.name,
      instructor: newClass.instructor,
      date: newClass.date,
      time: newClass.time,
      duration: newClass.duration || 60,
      capacity: newClass.capacity || 15,
      enrolled: newClass.enrolled || 0,
      description: newClass.description,
    };
    
    setClasses([...classes, gymClass]);
    setNewClass({
      name: '',
      instructor: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00',
      duration: 60,
      capacity: 15,
      enrolled: 0,
      description: '',
    });
    setIsAddDialogOpen(false);
    toast.success('Class added successfully');
    
    // Register the class with ClassPass if integration is enabled
    const classPassConfig = getClassPassConfig();
    if (classPassConfig.isEnabled) {
      await registerClassWithClassPass(gymClass);
    }
  };
  
  const handleEditClass = (id: string) => {
    toast(`Editing class with ID: ${id}`);
  };
  
  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast.success('Class deleted successfully');
  };
  
  const filteredClasses = activeTab === 'all' 
    ? classes 
    : classes.filter(c => {
        const classDate = new Date(c.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (activeTab === 'today') {
          return classDate.getTime() === today.getTime();
        } else if (activeTab === 'upcoming') {
          return classDate.getTime() > today.getTime();
        } else if (activeTab === 'past') {
          return classDate.getTime() < today.getTime();
        }
        return true;
      });
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Class Schedule</h1>
          <p className="text-gym-muted">Manage fitness classes and schedules</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchClassPassBookingsForAllClasses} disabled={isLoadingClassPass}>
            <RefreshCw size={16} className={`mr-2 ${isLoadingClassPass ? 'animate-spin' : ''}`} />
            Sync ClassPass Bookings
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Schedule New Class</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="class-name">Class Name</Label>
                  <Input
                    id="class-name"
                    placeholder="Enter class name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    placeholder="Enter instructor name"
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      step="5"
                      value={newClass.duration}
                      onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter class description"
                    rows={3}
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  />
                </div>
                
                <div className="mt-2">
                  <p className="text-sm mb-2">
                    ClassPass Integration: <span className="font-medium">{getClassPassConfig().isEnabled ? 'Enabled' : 'Disabled'}</span>
                  </p>
                  {getClassPassConfig().isEnabled && (
                    <p className="text-xs text-muted-foreground">This class will be automatically registered with ClassPass</p>
                  )}
                </div>
                
                <Button type="button" className="mt-4" onClick={handleAddClass}>
                  Schedule Class
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Classes</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar size={16} className="mr-2" />
              Calendar View
            </Button>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((gymClass, index) => (
              <div key={gymClass.id} className="relative">
                {classPassBookings[gymClass.id] && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-purple-500">
                    {classPassBookings[gymClass.id]} ClassPass
                  </Badge>
                )}
                <ClassCard 
                  gymClass={{
                    ...gymClass,
                    // Add ClassPass bookings to the enrolled count for display
                    enrolled: gymClass.enrolled + (classPassBookings[gymClass.id] || 0)
                  }} 
                  onEdit={handleEditClass}
                  onDelete={handleDeleteClass}
                  delay={100 * index}
                />
              </div>
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No classes found</h3>
                <p className="text-gym-muted mb-6">There are no classes scheduled for this period.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Class
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="today" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((gymClass, index) => (
              <ClassCard 
                key={gymClass.id} 
                gymClass={gymClass} 
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                delay={100 * index}
              />
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No classes today</h3>
                <p className="text-gym-muted mb-6">There are no classes scheduled for today.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Class
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((gymClass, index) => (
              <ClassCard 
                key={gymClass.id} 
                gymClass={gymClass} 
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                delay={100 * index}
              />
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming classes</h3>
                <p className="text-gym-muted mb-6">There are no classes scheduled for the future.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Class
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((gymClass, index) => (
              <ClassCard 
                key={gymClass.id} 
                gymClass={gymClass} 
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                delay={100 * index}
              />
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No past classes</h3>
                <p className="text-gym-muted mb-6">There are no classes from previous days.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Class
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassBooking;
